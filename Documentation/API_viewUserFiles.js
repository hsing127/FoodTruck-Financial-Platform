// import AWS from 'aws-sdk';

// const s3 = new AWS.S3();
// const bucketName = BUCKET_NAME;

// const handler = async (event) => {
//     try {
//         const { userId } = event; // Unique identifier for the user (could be email, userID, etc.)

//         if (!userId) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ message: "Missing userId parameter" }),
//             };
//         }

//         // List objects in S3 that belong to the user
//         const params = {
//             Bucket: bucketName,
//             Prefix: `${userId}/`, // Assumes files are stored under a folder named after the userId
//         };

//         const data = await s3.listObjectsV2(params).promise();
//         const files = data.Contents.map(file => ({
//             fileName: file.Key,
//             lastModified: file.LastModified,
//             size: file.Size
//         }));

//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: `Found ${files.length} files for user: ${userId}`,
//                 files,
//             }),
//         };
//     } catch (error) {
//         console.error("Error listing user's files:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ message: "Error retrieving files", error: error.message }),
//         };
//     }
// };
