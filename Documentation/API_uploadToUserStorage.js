// import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({ region: "ca-central-1" });
// const bucketName = "foodtruck-userfiles";

// const handler = async (event) => {
//     console.log("Event received:", event); 
//     try {
//         const fileName = event.fileName;
//         const fileData = event.fileData;
//         const overwrite = event.overwrite;

//         console.log("File Name:", fileName);
//         console.log("File Data:", fileData);
//         console.log("Overwrite:", overwrite);

//         if (!fileName.endsWith('.pdf') && !fileName.endsWith('.txt') && !fileName.endsWith('.png') && !fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg')) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ message: 'Only PDF, TXT, PNG, JPG, and JPEG files are allowed' }),
//             };
//         }

//         // Check if the file already exists
//         try {
//             await s3.send(new HeadObjectCommand({ Bucket: bucketName, Key: fileName }));

//             if (!overwrite) {
//                 return {
//                     statusCode: 409, // Conflict
//                     body: JSON.stringify({
//                         message: `A file with the name "${fileName}" already exists.`,
//                         actionRequired: "Choose to overwrite or rename the file.",
//                     }),
//                 };
//             }
//         } catch (error) {
//             if (error.name !== "NotFound") {
//                 console.error("S3 Check Error:", error);
//                 return { statusCode: 500, body: JSON.stringify({ message: 'Error checking file existence', error: error.message }) };
//             }
//         }

//         // // Convert base64 fileData to a buffer
//         // const buffer = Buffer.from(fileData, 'base64');

//         // Upload the file
//         const uploadParams = {
//             Bucket: bucketName,
//             Key: fileName,
//             Body: fileData,
//             ContentType: fileName.endsWith('.pdf') ? 'application/pdf' : 'text/plain',
//         };

//         await s3.send(new PutObjectCommand(uploadParams));

//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: `File uploaded successfully! It will be deleted automatically after 2 minutes.`,
//                 fileName,
//                 expirationTime: "2 minutes",
//             }),
//         };
//     } catch (error) {
//         console.error('Upload Error:', error);
//         return { statusCode: 500, body: JSON.stringify({ message: 'File upload failed', error: error.message }) };
//     }
// };

// export { handler };
