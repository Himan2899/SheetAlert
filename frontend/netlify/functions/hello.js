// frontend/netlify/functions/hello.js

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: "Backend is running!"
  };
}; 