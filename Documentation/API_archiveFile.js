// import { S3Client, ListObjectsV2Command, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({ region: "ca-central-1" });
// const bucketName = "foodtruck-userfiles";
// const archivePrefix = "archive/";

// const handler = async (event) => {
//     try {
//         const username = event.username;

//         if (!username) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ message: "Username is required." }),
//             };
//         }

//         // Define the prefix where user files are stored
//         const prefix = `${username}/`;

//         // List objects in the user's directory
//         const listedObjects = await s3.send(
//             new ListObjectsV2Command({
//                 Bucket: bucketName,
//                 Prefix: prefix,
//             })
//         );

//         if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
//             return {
//                 statusCode: 404,
//                 body: JSON.stringify({ message: "No files found for the specified user." }),
//             };
//         }

//         const archivedFiles = await Promise.all(
//             listedObjects.Contents.map(async (obj) => {
//                 try {
//                     const sourceKey = obj.Key;
//                     const archiveKey = `${archivePrefix}${sourceKey}`;

//                     // Copy the file to the archive folder
//                     await s3.send(
//                         new CopyObjectCommand({
//                             Bucket: bucketName,
//                             CopySource: `${bucketName}/${sourceKey}`,
//                             Key: archiveKey,
//                         })
//                     );

//                     // Delete the original file after copying
//                     await s3.send(
//                         new DeleteObjectCommand({
//                             Bucket: bucketName,
//                             Key: sourceKey,
//                         })
//                     );

//                     return { fileName: sourceKey, status: "Archived" };
//                 } catch (error) {
//                     console.error(`Error archiving file: ${obj.Key}`, error);
//                     return { fileName: obj.Key, status: "Failed" };
//                 }
//             })
//         );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: "Files archived successfully.",
//                 files: archivedFiles,
//             }),
//         };
//     } catch (error) {
//         console.error("Error archiving files:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ message: "Error archiving files", error: error.message }),
//         };
//     }
// };

// export { handler };
