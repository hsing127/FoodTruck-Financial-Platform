import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { prisma } from "../config/database";

const s3 = new S3Client({
  region: process.env.AWS_REGION || "ca-central-1",
});
const bucketName = process.env.S3_BUCKET_NAME || "foodtruck-userfiles";

export interface UploadFileRequest {
  username: string;
  fileName: string;
  fileData: string;
  overwrite?: boolean;
}

export interface FileRequest {
  username: string;
  fileName: string;
}

export class FileService {
  // From API_uploadToUserStorage.js
  async uploadFile(data: UploadFileRequest) {
    const { username, fileName, fileData, overwrite = false } = data;

    // File type validation
    const allowedExtensions = [".pdf", ".txt", ".PNG", ".jpg", ".jpeg"];
    const hasValidExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!hasValidExtension) {
      throw new Error("Only PDF, TXT, PNG, JPG, and JPEG files are allowed");
    }

    const s3Key = `${username}/${fileName}`;

    // Check if file already exists
    try {
      await s3.send(new HeadObjectCommand({ Bucket: bucketName, Key: s3Key }));

      if (!overwrite) {
        throw new Error(
          `A file with the name "${fileName}" already exists for user "${username}". Choose to overwrite or rename the file.`
        );
      }
    } catch (error: any) {
      if (
        error.name !== "NotFound" &&
        !error.message.includes("already exists")
      ) {
        console.error("S3 Check Error:", error);
        throw new Error("Error checking file existence");
      }
    }

    // Upload the file
    const uploadParams = {
      Bucket: bucketName,
      Key: s3Key,
      Body: Buffer.from(fileData, "base64"),
      ContentType: this.getContentType(fileName),
    };

    try {
      await s3.send(new PutObjectCommand(uploadParams));

      return {
        message: `File "${fileName}" uploaded successfully for user "${username}".`,
        fileKey: s3Key,
      };
    } catch (error) {
      console.error("S3 Upload Error:", error);
      throw new Error("Failed to upload file to S3");
    }
  }

  // From API_retrieveFile.js
  async getFile(data: FileRequest) {
    const { username, fileName } = data;
    const s3Key = `${username}/${fileName}`;

    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
      });

      const response = await s3.send(command);

      if (response.Body) {
        const chunks: Uint8Array[] = [];
        const stream = response.Body as any;

        for await (const chunk of stream) {
          chunks.push(chunk);
        }

        const buffer = Buffer.concat(chunks);
        const base64Data = buffer.toString("base64");

        return {
          fileName,
          fileData: base64Data,
          contentType: response.ContentType,
        };
      } else {
        throw new Error("File not found");
      }
    } catch (error: any) {
      console.error("S3 Retrieve Error:", error);
      if (error.name === "NoSuchKey") {
        throw new Error(`File "${fileName}" not found for user "${username}"`);
      }
      throw new Error("Failed to retrieve file from S3");
    }
  }

  // From API_deleteFile.js
  async deleteFile(data: FileRequest) {
    const { username, fileName } = data;
    const s3Key = `${username}/${fileName}`;

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: s3Key,
        })
      );

      return {
        message: `File "${fileName}" deleted successfully for user "${username}".`,
      };
    } catch (error: any) {
      console.error("S3 Delete Error:", error);
      if (error.name === "NoSuchKey") {
        throw new Error(`File "${fileName}" not found for user "${username}"`);
      }
      throw new Error("Failed to delete file from S3");
    }
  }

  // From API_viewUserFiles.js
  async listUserFiles(username: string) {
    try {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: `${username}/`,
      });

      const response = await s3.send(command);

      const files =
        response.Contents?.map((obj) => ({
          fileName: obj.Key?.replace(`${username}/`, "") || "",
          size: obj.Size || 0,
          lastModified: obj.LastModified,
          key: obj.Key,
        })) || [];

      return {
        username,
        files,
        totalFiles: files.length,
      };
    } catch (error) {
      console.error("S3 List Error:", error);
      throw new Error("Failed to list user files");
    }
  }

  // From API_editFileName.js
  async renameFile(username: string, oldFileName: string, newFileName: string) {
    const oldKey = `${username}/${oldFileName}`;
    const newKey = `${username}/${newFileName}`;

    try {
      // Check if old file exists
      await s3.send(new HeadObjectCommand({ Bucket: bucketName, Key: oldKey }));

      // Check if new file name already exists
      try {
        await s3.send(
          new HeadObjectCommand({ Bucket: bucketName, Key: newKey })
        );
        throw new Error(`File with name "${newFileName}" already exists`);
      } catch (error: any) {
        if (
          error.name !== "NotFound" &&
          !error.message.includes("already exists")
        ) {
          throw error;
        }
      }

      // Copy file to new location
      const copyParams = {
        Bucket: bucketName,
        Key: newKey,
        CopySource: `${bucketName}/${oldKey}`,
      };

      await s3.send(
        new PutObjectCommand({
          ...copyParams,
          Body: undefined, // Will be copied from source
          MetadataDirective: "COPY",
        })
      );

      // Delete old file
      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: oldKey,
        })
      );

      return {
        message: `File renamed from "${oldFileName}" to "${newFileName}" successfully.`,
        oldKey,
        newKey,
      };
    } catch (error: any) {
      console.error("S3 Rename Error:", error);
      if (error.name === "NoSuchKey") {
        throw new Error(
          `Original file "${oldFileName}" not found for user "${username}"`
        );
      }
      throw new Error("Failed to rename file");
    }
  }

  // From API_archiveFile.js
  async archiveFile(data: FileRequest) {
    const { username, fileName } = data;
    const originalKey = `${username}/${fileName}`;
    const archiveKey = `${username}/archived/${fileName}`;

    try {
      // Check if original file exists
      await s3.send(
        new HeadObjectCommand({ Bucket: bucketName, Key: originalKey })
      );

      // Copy to archive folder
      const copyParams = {
        Bucket: bucketName,
        Key: archiveKey,
        CopySource: `${bucketName}/${originalKey}`,
      };

      await s3.send(
        new PutObjectCommand({
          ...copyParams,
          Body: undefined,
          MetadataDirective: "COPY",
        })
      );

      // Delete original
      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: originalKey,
        })
      );

      return {
        message: `File "${fileName}" archived successfully for user "${username}".`,
        archiveKey,
      };
    } catch (error: any) {
      console.error("S3 Archive Error:", error);
      if (error.name === "NoSuchKey") {
        throw new Error(`File "${fileName}" not found for user "${username}"`);
      }
      throw new Error("Failed to archive file");
    }
  }

  // From API_checkFileDeletionTime.js
  async checkFileDeletionTime(username: string) {
    try {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: `${username}/`,
      });

      const response = await s3.send(command);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30); // 30 days ago

      const oldFiles =
        response.Contents?.filter(
          (obj) => obj.LastModified && obj.LastModified < cutoffDate
        ) || [];

      return {
        username,
        oldFiles: oldFiles.map((obj) => ({
          fileName: obj.Key?.replace(`${username}/`, "") || "",
          lastModified: obj.LastModified,
          daysOld: obj.LastModified
            ? Math.floor(
                (Date.now() - obj.LastModified.getTime()) /
                  (1000 * 60 * 60 * 24)
              )
            : 0,
        })),
        totalOldFiles: oldFiles.length,
      };
    } catch (error) {
      console.error("S3 Check Deletion Time Error:", error);
      throw new Error("Failed to check file deletion times");
    }
  }

  // Helper method to get content type
  private getContentType(fileName: string): string {
    const extension = fileName.toLowerCase().split(".").pop();

    switch (extension) {
      case "pdf":
        return "application/pdf";
      case "txt":
        return "text/plain";
      case "png":
        return "image/png";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      default:
        return "application/octet-stream";
    }
  }
}

export const fileService = new FileService();
