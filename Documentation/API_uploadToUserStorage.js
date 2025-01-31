// import AWS from 'aws-sdk';
// const s3 = new AWS.S3();

// const handler = async (event) => {
//     try {
//         const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
//         const { fileName, fileData } = body;

//         if (!fileName.endsWith('.pdf') && !fileName.endsWith('.txt')) {
//             return { 
//                 statusCode: 400, 
//                 body: JSON.stringify({ message: 'Only PDF and TXT files are allowed' }) };
//         }

//         const buffer = Buffer.from(fileData, 'base64');

//         const uploadParams = {
//             Bucket: bucketName,
//             Key: fileName,
//             Body: buffer,
//             ContentType: fileName.endsWith('.pdf') ? 'application/pdf' : 'text/plain',
//         };

//         await s3.upload(uploadParams).promise();

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
