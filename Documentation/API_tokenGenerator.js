// import jwt from "jsonwebtoken";

// export const handler = async (event) => {
//     try {
//         // Log the incoming event
//         console.log('Incoming Event:', JSON.stringify(event, null, 2));

//         // Extract the email from the event body
//         const { email } = JSON.parse(event.body || "{}");
//         if (!email) {
//             console.error("No email provided in the request body");
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Email is required" }),
//             };
//         }

//         console.log('Provided Email:', email);

//         // Secret key for signing and verifying the token
//         const secretKey = process.env.JWT_SECRET || "C23MqKZGEMl0BCurgrH6zBZAK7fXxstk"; 

//         // 1. Create a JWT token
//         const payload = { email };
//         const token = jwt.sign(payload, secretKey, { algorithm: "HS256", expiresIn: "1h" });
//         console.log("Generated Token:", token);

//         // 2. Verify the JWT token
//         let decodedPayload;
//         try {
//             decodedPayload = jwt.verify(token, secretKey, { algorithms: ["HS256"] });
//             console.log("Decoded Payload (Verified):", decodedPayload);
//         } catch (error) {
//             console.error("Token verification failed:", error.message);
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Invalid token" }),
//             };
//         }

//         // 3. Return the created and verified token for confirmation
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: "Token created and verified successfully",
//                 token,
//                 decoded: decodedPayload,
//             }),
//         };

//     } catch (err) {
//         console.error("Unexpected error:", err.message);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Internal server error" }),
//         };
//     }
// };