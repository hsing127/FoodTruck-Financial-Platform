// import {
//     S3Client,
//     ListObjectsV2Command,
//     CopyObjectCommand,
//     DeleteObjectCommand,
//   } from "@aws-sdk/client-s3";
  
//   const s3 = new S3Client({ region: "ca-central-1" });
//   const BUCKET_NAME = "foodtruck-userfiles";
//   const ARCHIVE_PREFIX = "archive/";
  
//   /**
//    * Lambda handler for archiving all files under a user's S3 folder.
//    */
//   export const handler = async (event) => {
//     try {
//       const { username } = event;
  
//       if (!username) {
//         return createResponse(400, "Username is required.");
//       }
  
//       const userPrefix = `${username}/`;
//       const listParams = {
//         Bucket: BUCKET_NAME,
//         Prefix: userPrefix,
//       };
  
//       const { Contents } = await s3.send(new ListObjectsV2Command(listParams));
  
//       if (!Contents || Contents.length === 0) {
//         return createResponse(404, "No files found for the specified user.");
//       }
  
//       const results = await Promise.all(Contents.map(archiveFile));
//       return createResponse(200, "Files archived successfully.", { files: results });
//     } catch (error) {
//       console.error("Error archiving files:", error);
//       return createResponse(500, "Internal server error", { error: error.message });
//     }
//   };
  
//   /**
//    * Archives a single S3 object by copying it to an archive folder and deleting the original.
//    */
//   const archiveFile = async (obj) => {
//     const sourceKey = obj.Key;
//     const archiveKey = `${ARCHIVE_PREFIX}${sourceKey}`;
  
//     try {
//       await s3.send(
//         new CopyObjectCommand({
//           Bucket: BUCKET_NAME,
//           CopySource: `${BUCKET_NAME}/${sourceKey}`,
//           Key: archiveKey,
//         })
//       );
  
//       await s3.send(
//         new DeleteObjectCommand({
//           Bucket: BUCKET_NAME,
//           Key: sourceKey,
//         })
//       );
  
//       return { fileName: sourceKey, status: "Archived" };
//     } catch (error) {
//       console.error(`Failed to archive file: ${sourceKey}`, error);
//       return { fileName: sourceKey, status: "Failed", error: error.message };
//     }
//   };
  
//   /**
//    * Utility to construct consistent HTTP responses.
//    */
//   const createResponse = (statusCode, message, data = {}) => ({
//     statusCode,
//     body: JSON.stringify({ message, ...data }),
//   });
  