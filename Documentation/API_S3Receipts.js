// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

// exports.handler = async (event) => {
//   try {
//     // Parse the incoming event
//     const { fileName, fileContent } = JSON.parse(event.body);

//     if (!fileName || !fileContent) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ error: 'File name and content are required.' }),
//       };
//     }

//     // Decode the file content from base64
//     const decodedFile = Buffer.from(fileContent, 'base64');

//     // Define the parameters for the S3 upload
//     const params = {
//       Bucket: 'ocrreceipts', // Replace with your bucket name
//       Key: fileName, // The file name to save
//       Body: decodedFile, // File content
//       ContentType: 'application/octet-stream', // Set appropriate content type if known
//     };

//     // Upload the file to S3
//     await s3.upload(params).promise();

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: 'File uploaded successfully!' }),
//     };
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ error: 'Failed to upload file.' }),
//     };
//   }
// };
