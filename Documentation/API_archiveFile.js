// import { S3Client, ListObjectsV2Command, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({ region: "ca-central-1" });
// const BUCKET_NAME = "foodtruck-userfiles";
// const ARCHIVE_PREFIX = "archive/";

// const handler = async (event) => {
//     try {
//         const { username } = event;
//         if (!username) {
//             return response(400, "Username is required.");
//         }

//         const prefix = `${username}/`;
//         const listedObjects = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: prefix }));
//         if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
//             return response(404, "No files found for the specified user.");
//         }

//         const archivedFiles = await Promise.all(listedObjects.Contents.map(archiveFile));
//         return response(200, "Files archived successfully.", { files: archivedFiles });
//     } catch (error) {
//         console.error("Error archiving files:", error);
//         return response(500, "Error archiving files", { error: error.message });
//     }
// };

// const archiveFile = async (obj) => {
//     try {
//         const sourceKey = obj.Key;
//         const archiveKey = `${ARCHIVE_PREFIX}${sourceKey}`;

//         await s3.send(new CopyObjectCommand({ Bucket: BUCKET_NAME, CopySource: `${BUCKET_NAME}/${sourceKey}`, Key: archiveKey }));
//         await s3.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: sourceKey }));

//         return { fileName: sourceKey, status: "Archived" };
//     } catch (error) {
//         console.error(`Error archiving file: ${obj.Key}`, error);
//         return { fileName: obj.Key, status: "Failed" };
//     }
// };

// const response = (statusCode, message, data = {}) => ({
//     statusCode,
//     body: JSON.stringify({ message, ...data }),
// });

// export { handler };
