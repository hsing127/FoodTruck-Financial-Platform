// import React, { useState } from 'react';
// import axios from 'axios';

// const EchoComponent: React.FC = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [responseMessage, setResponseMessage] = useState('');

//   const handleSubmit = async () => {
//     try {
//       const apiUrl = 'https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/auth';
//       console.log('Sending request to:', apiUrl); // Log the URL being called
//       console.log('Message being sent:', inputValue); // Log the input value
  
//       const response = await axios.post(apiUrl, {
//         message: inputValue,
//       });
  
//       console.log('Response received:', response); // Log the entire response object
//       console.log('Response data:', response.data); //Log data
//       const responseBody = JSON.parse(response.data.body); //Parse the body
//       console.log('Message: ', responseBody.echoedMessage); //Print the body
//       setResponseMessage(responseBody.echoedMessage);
//     } catch (error) {
//       console.error('Error sending request:', error);
//       setResponseMessage('Error: Could not echo message.');
//     }
//   };
  

//   return (
//     <div>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Enter a message"
//       />
//       <button onClick={handleSubmit}>Echo Message</button>
      
//       {responseMessage && (
//         <p>Echoed Message: {responseMessage}</p>
//       )}
//     </div>
//   );
  
// };

// export default EchoComponent;

// export const handler = async (event) => {
//     // Extract the message from the event directly
//     const message = event.message; // Assuming the message is at the top level now

//     // Check if the message exists
//     if (!message) {
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: "Request body is missing." }),
//         };
//     }

//     // Return the response
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify({
//             echoedMessage: message
//         }),
//     };

//     return response;
// };
