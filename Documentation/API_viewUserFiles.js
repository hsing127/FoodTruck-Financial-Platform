// import { S3Client, ListObjectsV2Command, HeadObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({ region: "ca-central-1" });
// const bucketName = "foodtruck-userfiles"

// const handler = async (event) => {
//     try {
//         const username = event.username;
//         const fileName = event.fileName;

//         if (!username || !fileName) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ message: "Username and file name are required." }),
//             };
//         }

//         // Define the prefix where user files are stored (assuming <username>/fileName format)
//         const prefix = `${username}/`;

//         // List objects in the user's directory to find a match
//         const listedObjects = await s3.send(
//             new listObjectsV2Command({
//                 Bucket: bucketName,
//                 Prefix: prefix,
//             })
//         );

//         // Check if user has files
//         if (!listedObjects.Contents || listedObjects.length === 0) {
//             return {
//                 statusCode: 404,
//                 body: JSON.stringify({ message: "No fieles found for the specified user"}),
//             }
//         }

//         const now = new Date();
//         const filesWithExpiration = await Promise.all(
//             listedObjects.Contents.map(async (obj) => {
//                 try {
//                     // Get metadata of the file
//                     const metadata = await s3.send(
//                         new HeadObjectCommand({
//                             Bucket: bucketName,
//                             Key: obj.Key,
//                         })
//                     );

//                     // Calculate expiration time (1 day after last modified)
//                     const lastModified = metadata.LastModified;
//                     const expirationTime = new Date(lastModified);
//                     expirationTime.setDate(expirationTime.getDate() + 1);

//                     // Calculate time left
//                     const timeLeft = expirationTime - now;
//                     const minutesLeft = timeLeft > 0 ? Math.floor(timeLeft / 1000 / 60) : 0;

//                     return {
//                         fileName: obj.Key.replace(prefix, ""), // Remove the prefix to get just the filename
//                         expirationTime: minutesLeft > 0 ? `${minutesLeft} minutes` : "Expired",
//                     };
//                 } catch (error) {
//                     console.error(`Error retrieving metadata for file: ${obj.Key}`, error);
//                     return { fileName: obj.Key.replace(prefix, ""), expirationTime: "Unknown (Error)" };
//                 }
//             })
//         );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: "Files retreived Successfully.",
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
