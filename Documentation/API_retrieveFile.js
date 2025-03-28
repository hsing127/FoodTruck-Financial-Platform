//import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({ region: "ca-central-1" });
// const bucketName = "foodtruck-userfiles";

// const handler = async (event) => {
//     try {
//         const { username, fileName } = event;

//         if (!username || !fileName) {
//             return createResponse(400, "Username and file name are required.");
//         }

//         const fileKey = `${username}/${fileName}`;
//         const data = await s3.send(new GetObjectCommand({ Bucket: bucketName, Key: fileKey }));

//         if (!data.Body) {
//             return createResponse(404, "File not found or empty.");
//         }
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
//         return createResponse(500, "Error retrieving file", { error: error.message });
//     }
// };

// const streamToString = async (stream) => {
//     const chunks = [];
//     for await (const chunk of stream) {
//         chunks.push(chunk);
//     }
//     return Buffer.concat(chunks).toString("utf-8");
// };

// const createResponse = (statusCode, message, data = {}) => {
//     return {
//         statusCode,
//         body: JSON.stringify({ message, ...data }),
//     };
// };

// export { handler };
