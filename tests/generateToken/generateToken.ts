// Import authentication data from a JSON file
import authentication from "../test-data/authentication.json";

// Define an asynchronous function to generate authentication token
export async function generateToken({ request, baseURL }) {
    // Send a POST request to the authentication endpoint
    const authenticateKey = await request.post(`${baseURL}/auth`, {
        // Provide the username and password from the imported JSON data
        data: {
            "username": authentication.username,
            "password": authentication.password
        }
    });

    // Extract the JSON body from the response
    const authBody = await authenticateKey.json();

    // Return the authentication token extracted from the response body
    return `${authBody["token"]}`;
}
