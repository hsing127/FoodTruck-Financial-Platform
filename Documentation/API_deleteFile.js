// import { S3Client, HeadObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({ region: "ca-central-1" });
// const bucketName = "foodtruck-userfiles";

// const handler = async (event) => {
//     try {
//         const { username, filename } = event;

//         if (!username || !filename) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ message: "Username and filename are required." }),
//             };
//         }

//         // Construct the full object key
//         const fileKey = `${username}/${filename}`;

//         // Check if the file exists
//         try {
//             await s3.send(
//                 new HeadObjectCommand({
//                     Bucket: bucketName,
//                     Key: fileKey,
//                 })
//             );
//         } catch (error) {
//             if (error.name === "NotFound") {
//                 return {
//                     statusCode: 404,
//                     body: JSON.stringify({ message: "File not found.", file: fileKey }),
//                 };
//             }
//             throw error; 
//         }

//         // Delete the file from S3
//         await s3.send(
//             new DeleteObjectCommand({
//                 Bucket: bucketName,
//                 Key: fileKey,
//             })
//         );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "File deleted successfully.", deletedFile: fileKey }),
//         };
//     } catch (error) {
//         console.error("Error deleting file:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ message: "Error deleting file", error: error.message }),
//         };
//     }
// };

// export { handler };
