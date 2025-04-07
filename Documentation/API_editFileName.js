// import { S3Client, CopyObjectCommand, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({ region: "ca-central-1" });
// const BUCKET_NAME = "foodtruck-userfiles";

// const handler = async (event) => {
//     try {
//         const { username, oldFileName, newFileName } = event;

//         if (!username || !oldFileName || !newFileName) {
//             return response(400, "Username, oldFileName, and newFileName are required.");
//         }

//         const oldKey = `${username}/${oldFileName}`;
//         const newKey = `${username}/${newFileName}`;

//         // Check if the original file exists
//         try {
//             await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: oldKey }));
//         } catch (err) {
//             return response(404, "Original file does not exist.");
//         }

//         // Copy the file to the new key
//         await s3.send(
//             new CopyObjectCommand({
//                 Bucket: BUCKET_NAME,
//                 CopySource: `${BUCKET_NAME}/${oldKey}`,
//                 Key: newKey,
//             })
//         );

//         // Delete the original file
//         await s3.send(
//             new DeleteObjectCommand({
//                 Bucket: BUCKET_NAME,
//                 Key: oldKey,
//             })
//         );

//         return response(200, "File renamed successfully.", {
//             oldFileName,
//             newFileName,
//         });
//     } catch (error) {
//         console.error("Error renaming file:", error);
//         return response(500, "Error renaming file", { error: error.message });
//     }
// };

// const response = (statusCode, message, data = {}) => ({
//     statusCode,
//     body: JSON.stringify({ message, ...data }),
// });

// export { handler };
