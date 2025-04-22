// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({ region: "ca-central-1" });
// const bucketName = "foodtruck-userfiles";

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

//         // Construct the S3 key (path) for the file
//         const fileKey = `${username}/${fileName}`;

//         // Retrieve the file from S3
//         const data = await s3.send(
//             new GetObjectCommand({
//                 Bucket: bucketName,
//                 Key: fileKey,
//             })
//         );

//         // Read the file content from the response body (assuming it's text or JSON)
//         const fileContent = await streamToString(data.Body);

//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: "File retrieved successfully.",
//                 fileName: fileName,
//                 fileData: fileContent,
//             }),
//         };
//     } catch (error) {
//         console.error("Error retrieving file:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ message: "Error retrieving file", error: error.message }),
//         };
//     }
// };

// // Helper function to convert the stream to string
// const streamToString = (stream) => {
//     return new Promise((resolve, reject) => {
//         const chunks = [];
//         stream.on("data", (chunk) => {
//             chunks.push(chunk);
//         });
//         stream.on("end", () => {
//             resolve(Buffer.concat(chunks).toString("utf-8"));
//         });
//         stream.on("error", (err) => {
//             reject(err);
//         });
//     });
// };

// export { handler };
