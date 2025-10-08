import { s3, S3_CONFIG } from "../../config/aws";
import { S3UploadResult, FileMetadata } from "../../types";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export class S3Service {
  private bucketName: string;

  constructor() {
    this.bucketName = S3_CONFIG.bucketName;
  }

  /**
   * Upload file to S3
   */
  async uploadFile(
    fileBuffer: Buffer,
    metadata: FileMetadata,
    userId: string
  ): Promise<S3UploadResult> {
    try {
      const fileExtension = path.extname(metadata.originalName);
      const fileName = `${uuidv4()}${fileExtension}`;
      const key = `${S3_CONFIG.uploadPath}/${userId}/${fileName}`;

      const uploadParams = {
        Bucket: this.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: metadata.mimeType,
        Metadata: {
          originalName: metadata.originalName,
          userId,
          category: metadata.category || "document",
          description: metadata.description || "",
          uploadedAt: new Date().toISOString(),
        },
        ServerSideEncryption: "AES256",
      };

      const result = await s3.upload(uploadParams).promise();

      return {
        key: result.Key,
        url: result.Location,
        bucket: result.Bucket,
        location: result.Location,
      };
    } catch (error) {
      console.error("S3 upload error:", error);
      throw new Error(`Failed to upload file to S3: ${error.message}`);
    }
  }

  /**
   * Download file from S3
   */
  async downloadFile(key: string): Promise<Buffer> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: key,
      };

      const result = await s3.getObject(params).promise();
      return result.Body as Buffer;
    } catch (error) {
      console.error("S3 download error:", error);
      throw new Error(`Failed to download file from S3: ${error.message}`);
    }
  }

  /**
   * Delete file from S3
   */
  async deleteFile(key: string): Promise<void> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: key,
      };

      await s3.deleteObject(params).promise();
    } catch (error) {
      console.error("S3 delete error:", error);
      throw new Error(`Failed to delete file from S3: ${error.message}`);
    }
  }

  /**
   * Move file to archive folder
   */
  async archiveFile(key: string): Promise<string> {
    try {
      const fileName = path.basename(key);
      const archiveKey = `${S3_CONFIG.archivePath}/${fileName}`;

      // Copy to archive location
      const copyParams = {
        Bucket: this.bucketName,
        CopySource: `${this.bucketName}/${key}`,
        Key: archiveKey,
        ServerSideEncryption: "AES256",
        MetadataDirective: "COPY",
      };

      await s3.copyObject(copyParams).promise();

      // Delete original file
      await this.deleteFile(key);

      return archiveKey;
    } catch (error) {
      console.error("S3 archive error:", error);
      throw new Error(`Failed to archive file in S3: ${error.message}`);
    }
  }

  /**
   * Generate presigned URL for file access
   */
  async getPresignedUrl(
    key: string,
    expiresIn: number = 3600
  ): Promise<string> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: key,
        Expires: expiresIn,
      };

      return s3.getSignedUrl("getObject", params);
    } catch (error) {
      console.error("S3 presigned URL error:", error);
      throw new Error(`Failed to generate presigned URL: ${error.message}`);
    }
  }

  /**
   * Check if file exists in S3
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      await s3
        .headObject({
          Bucket: this.bucketName,
          Key: key,
        })
        .promise();
      return true;
    } catch (error) {
      if (error.code === "NotFound") {
        return false;
      }
      throw error;
    }
  }

  /**
   * Get file metadata from S3
   */
  async getFileMetadata(key: string): Promise<any> {
    try {
      const result = await s3
        .headObject({
          Bucket: this.bucketName,
          Key: key,
        })
        .promise();

      return {
        size: result.ContentLength,
        lastModified: result.LastModified,
        contentType: result.ContentType,
        metadata: result.Metadata,
        etag: result.ETag,
      };
    } catch (error) {
      console.error("S3 metadata error:", error);
      throw new Error(`Failed to get file metadata: ${error.message}`);
    }
  }

  /**
   * List files in user directory
   */
  async listUserFiles(userId: string, prefix?: string): Promise<any[]> {
    try {
      const listParams = {
        Bucket: this.bucketName,
        Prefix: `${S3_CONFIG.uploadPath}/${userId}/${prefix || ""}`,
        MaxKeys: 1000,
      };

      const result = await s3.listObjectsV2(listParams).promise();
      return result.Contents || [];
    } catch (error) {
      console.error("S3 list files error:", error);
      throw new Error(`Failed to list user files: ${error.message}`);
    }
  }

  /**
   * Get bucket information
   */
  async getBucketInfo(): Promise<any> {
    try {
      const location = await s3
        .getBucketLocation({
          Bucket: this.bucketName,
        })
        .promise();

      const versioning = await s3
        .getBucketVersioning({
          Bucket: this.bucketName,
        })
        .promise();

      return {
        name: this.bucketName,
        region: location.LocationConstraint || "us-east-1",
        versioning: versioning.Status,
      };
    } catch (error) {
      console.error("S3 bucket info error:", error);
      throw new Error(`Failed to get bucket information: ${error.message}`);
    }
  }

  /**
   * Validate file before upload
   */
  validateFile(file: Express.Multer.File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > S3_CONFIG.maxFileSize) {
      return {
        valid: false,
        error: `File size ${file.size} exceeds maximum allowed size ${S3_CONFIG.maxFileSize}`,
      };
    }

    // Check file type
    if (!S3_CONFIG.allowedFileTypes.includes(file.mimetype)) {
      return {
        valid: false,
        error: `File type ${
          file.mimetype
        } is not allowed. Allowed types: ${S3_CONFIG.allowedFileTypes.join(
          ", "
        )}`,
      };
    }

    return { valid: true };
  }

  /**
   * Cleanup old files (older than specified days)
   */
  async cleanupOldFiles(daysOld: number = 90): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const listParams = {
        Bucket: this.bucketName,
        Prefix: S3_CONFIG.uploadPath,
      };

      const objects = await s3.listObjectsV2(listParams).promise();
      let deletedCount = 0;

      for (const obj of objects.Contents || []) {
        if (obj.LastModified && obj.LastModified < cutoffDate) {
          await this.deleteFile(obj.Key!);
          deletedCount++;
        }
      }

      return deletedCount;
    } catch (error) {
      console.error("S3 cleanup error:", error);
      throw new Error(`Failed to cleanup old files: ${error.message}`);
    }
  }
}

export default new S3Service();
