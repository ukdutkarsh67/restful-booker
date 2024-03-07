# restful-booker

# Project Overview

This project implements an API test suite using Playwright, a Node.js library for browser automation. The test suite includes various test cases for CRUD operations on a booking system API named "restful-booker".

## Installation

To run the tests, follow these steps:

1. Clone this repository to your local machine.
2. Install Node.js if you haven't already.
3. Install dependencies by running `npm install`.

## Requirements

- Node.js
- npm
- Playwright
- faker-js




## Test Flow

1. **Generate Authentication Token**:
   - The `generateToken.ts` script sends a POST request to the authentication endpoint to obtain an authentication token. It imports authentication data from the `authentication.json` file.

2. **Create User Data**:
   - The `createUser.ts` script defines a TypeScript class for creating user data using the faker-js library. It generates mock user data such as first name, last name, total price, deposit paid, booking dates, and additional needs.

3. **HTTP Requests**:
   - The `Request.ts` module contains methods for making HTTP requests (GET, POST, DELETE, PUT, PATCH) to interact with the booking system API. Each method handles a specific type of request and includes appropriate data payloads and headers.

4. **Test Cases**:
   - The `restful-booker.spec.ts` file contains the main test suite with test cases for CRUD operations on the booking API. It utilizes the generated authentication token and user data to perform various API operations such as creating, updating, retrieving, and deleting bookings.

## Conclusion

This project demonstrates how to implement an API test suite using Playwright in TypeScript. It covers various aspects such as generating mock data, making HTTP requests, handling authentication, and validating responses.

## Learning

Through this project, I gained practical experience in:

- Setting up and configuring Playwright for API testing.
- Writing test cases for CRUD operations on RESTful APIs.
- Handling authentication and authorization in API testing.
- Validating API responses and asserting expected behavior.




