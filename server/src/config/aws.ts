import AWS from "aws-sdk";

// AWS Configuration
AWS.config.update({
  region: process.env.AWS_REGION || "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// S3 Configuration
export const s3 = new AWS.S3({
  region: process.env.S3_REGION || process.env.AWS_REGION || "us-east-1",
  signatureVersion: "v4",
});

// SES Configuration
export const ses = new AWS.SES({
  region: process.env.SES_REGION || process.env.AWS_REGION || "us-east-1",
});

// Textract Configuration
export const textract = new AWS.Textract({
  region: process.env.TEXTRACT_REGION || process.env.AWS_REGION || "us-east-1",
});

// S3 Bucket Configuration
export const S3_CONFIG = {
  bucketName: process.env.S3_BUCKET_NAME || "foodtruck-receipts",
  region: process.env.S3_REGION || "us-east-1",
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "10485760"), // 10MB in bytes
  allowedFileTypes: (
    process.env.ALLOWED_FILE_TYPES ||
    "image/jpeg,image/png,image/jpg,application/pdf"
  ).split(","),
  uploadPath: "uploads",
  archivePath: "archive",
};

// SES Configuration
export const SES_CONFIG = {
  fromEmail: process.env.SES_FROM_EMAIL || "noreply@yourfoodtruck.com",
  region: process.env.SES_REGION || "us-east-1",
  charset: "UTF-8",
};

// Textract Configuration
export const TEXTRACT_CONFIG = {
  region: process.env.TEXTRACT_REGION || "us-east-1",
  featureTypes: ["TABLES", "FORMS"],
  outputConfig: {
    S3Bucket: process.env.S3_BUCKET_NAME || "foodtruck-receipts",
    S3Prefix: "textract-output/",
  },
};

// AWS Service Health Check
export const checkAWSServices = async () => {
  const checks = {
    s3: false,
    ses: false,
    textract: false,
  };

  try {
    // Check S3
    await s3.listBuckets().promise();
    checks.s3 = true;
  } catch (error) {
    console.error("S3 health check failed:", error);
  }

  try {
    // Check SES
    await ses.getAccountSendingEnabled().promise();
    checks.ses = true;
  } catch (error) {
    console.error("SES health check failed:", error);
  }

  try {
    // Check Textract
    await textract.listAdapterVersions({ AdapterId: "test" }).promise();
    checks.textract = true;
  } catch (error) {
    // Textract will error on invalid adapter, but service is available
    if (error.code === "InvalidParameterException") {
      checks.textract = true;
    } else {
      console.error("Textract health check failed:", error);
    }
  }

  return checks;
};

export default {
  s3,
  ses,
  textract,
  S3_CONFIG,
  SES_CONFIG,
  TEXTRACT_CONFIG,
  checkAWSServices,
};
