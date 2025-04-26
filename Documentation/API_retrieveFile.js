// import { S3Client, ListObjectsV2Command, HeadObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({ region: "ca-central-1" });
// const bucketName = "foodtruck-userfiles";
// const EXPIRATION_DAYS = 10; // <-- easy to change later

// const handler = async (event) => {
//     try {
//         const username = event.username;

//         if (!username) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ message: "Username is required." }),
//             };
//         }

//         const prefix = `${username}/`;

//         const listedObjects = await s3.send(
//             new ListObjectsV2Command({
//                 Bucket: bucketName,
//                 Prefix: prefix,
//             })
//         );

//         if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
//             return {
//                 statusCode: 404,
//                 body: JSON.stringify({ message: "No files found for the specified user" }),
//             };
//         }

//         const now = new Date();
//         const filesWithExpiration = await Promise.all(
//             listedObjects.Contents
//                 .filter(obj => obj.Key && obj.Key !== prefix)
//                 .map(async (obj) => {
//                     try {
//                         const metadata = await s3.send(
//                             new HeadObjectCommand({
//                                 Bucket: bucketName,
//                                 Key: obj.Key,
//                             })
//                         );

//                         const lastModified = metadata.LastModified;
//                         const expirationTime = new Date(lastModified);
//                         expirationTime.setDate(expirationTime.getDate() + EXPIRATION_DAYS); // <-- uses the constant

//                         const timeLeft = expirationTime.getTime() - now.getTime();
//                         const minutesLeft = timeLeft > 0 ? Math.floor(timeLeft / 1000 / 60) : 0;

//                         return {
//                             fileName: obj.Key.replace(prefix, ""),
//                             expirationTime: minutesLeft > 0 ? minutesLeft : "Expired",
//                         };
//                     } catch (error) {
//                         console.error(`Error retrieving metadata for file: ${obj.Key}`, error);
//                         return { fileName: obj.Key.replace(prefix, ""), expirationTime: "Unknown (Error)" };
//                     }
//                 })
//         );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: "Files retrieved successfully.",
//                 files: filesWithExpiration,
//             }),
//         };

//     } catch (error) {
//         console.error('Error checking time left:', error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ message: 'Error checking time left', error: error.message }),
//         };
//     }
// };

// export { handler };
