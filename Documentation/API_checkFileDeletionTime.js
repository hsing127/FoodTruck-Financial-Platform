// import AWS from 'aws-sdk';

// const s3 = new AWS.S3();
// const bucketName = process.env.BUCKET_NAME || 'your-s3-bucket-name';

// const handler = async (event) => {
//     try {
//         const { username, fileName } = event;

//         if (!username || !fileName) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ message: "Username and fileName are required." }),
//             };
//         }

//         // Define the prefix where user files are stored (assuming <username>/fileName format)
//         const prefix = `${username}/`;

//         // List objects in the user's directory to find a match
//         const listedObjects = await s3.listObjectsV2({
//             Bucket: bucketName,
//             Prefix: prefix
//         }).promise();

//         // Check if the file exists under the username directory
//         const fileExists = listedObjects.Contents.some(obj => obj.Key === `${prefix}${fileName}`);

//         if (!fileExists) {
//             return {
//                 statusCode: 404,
//                 body: JSON.stringify({ message: "File not found for the specified username." }),
//             };
//         }

//         // Get metadata of the file
//         const metadata = await s3.headObject({
//             Bucket: bucketName,
//             Key: `${prefix}${fileName}`
//         }).promise();

//         // Get last modified time
//         const lastModified = metadata.LastModified;
//         const now = new Date();

//         // Calculate expiration time (1 day after last modified)
//         const expirationTime = new Date(lastModified);
//         expirationTime.setDate(expirationTime.getDate() + 1);

//         // Calculate the time left until expiration
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

// export { handler };
