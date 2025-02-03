// import AWS from 'aws-sdk';

// const s3 = new AWS.S3();
// const bucketName = BUCKET_NAME || 'your-s3-bucket-name';

// const handler = async (event) => {
//     try {
//         const { fileName } = event;

//         // Get the metadata of the file from S3
//         const metadata = await s3.headObject({
//             Bucket: bucketName,
//             Key: fileName
//         }).promise();

//         // Get the last modified time of the file
//         const lastModified = metadata.LastModified;
//         const now = new Date();

//         // Calculate the time left until the file is deleted (expiration is 1 day)
//         const expirationTime = new Date(lastModified);
//         expirationTime.setDate(expirationTime.getDate() + 1);  // Adding 1 day to last modified time

//         // Calculate the time difference between now and expiration time
//         const timeLeft = expirationTime - now;

//         if (timeLeft > 0) {
//             const minutesLeft = Math.floor(timeLeft / 1000 / 60);
//             return {
//                 statusCode: 200,
//                 body: JSON.stringify({
//                     message: `File will be deleted in ${minutesLeft} minutes.`,
//                     fileName,
//                     expiration_time: `${minutesLeft} minutes`
//                 }),
//             };
//         } else {
//             return {
//                 statusCode: 200,
//                 body: JSON.stringify({
//                     message: `The file has already passed its expiration time.`,
//                     fileName,
//                 }),
//             };
//         }
//     } catch (error) {
//         console.error('Error checking time left:', error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ message: 'Error checking time left', error: error.message }),
//         };
//     }
// };
