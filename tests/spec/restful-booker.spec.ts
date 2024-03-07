import { test, expect } from '@playwright/test'
import createBooking from '../pojo/createBooking';
import { generateToken } from '../generateToken/generateToken';
import { Request } from '../request/Request';
test.describe.serial(() => {
    let newBooking;
    let updatedBooking;
    test.beforeAll(async ({ request, baseURL }) => {
        // Create a new booking
        newBooking = new createBooking();
        newBooking.setUserData();

        // Create an updated booking
        updatedBooking = new createBooking();
        updatedBooking.setUserData();

        // Generate an authentication token for the tests
        process.env.authToken = await generateToken({ request, baseURL });
    });

    // Test to create a booking
    test("Create Booking", async ({ request, baseURL }) => {
        // Send a POST request to create a booking
        const response = await Request.postRequest(request, baseURL, newBooking);
        // Extract the booking data from the response
        const responseBody = await response.json();
        process.env.BOOKING_ID = responseBody.bookingid;
        // Assert the expected behavior
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        // Assert that the booking data matches the expected values
        expect(responseBody.booking).toHaveProperty(
            "firstname",
            newBooking.getFirstName()
        );
        expect(responseBody.booking).toHaveProperty(
            "lastname",
            newBooking.getLastName()
        );
        expect(responseBody.booking).toHaveProperty(
            "totalprice",
            newBooking.getTotalPrice()
        );
        expect(responseBody.booking).toHaveProperty(
            "depositpaid",
            newBooking.getDepositPaid()
        );
        expect(responseBody.booking).toHaveProperty(
            "additionalneeds",
            newBooking.getAdditionalNeeds()
        );
    });

    // Test to retrieve a booking by last name
    test("Get Booking By Lastname @get", async ({ request, baseURL }) => {
        // Send a GET request to retrieve a booking by last name
        const queryParameters = {
            lastname: newBooking.getLastName(),
        }
        const response = await Request.getRequestByParam(request, baseURL, queryParameters);
        // Assert the expected behavior
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    // Test to retrieve a booking by first name
    test("Get Booking By Firstname @get", async ({ request, baseURL }) => {
        const queryParameters = {
            firstname: newBooking.getFirstName(),
        }
        // Send a GET request to retrieve a booking by first name
        const response = await Request.getRequestByParam(request, baseURL, queryParameters);
        // Assert the expected behavior
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    // Test to retrieve a booking by checkin date
    test("Get Booking By Checkin Date @get", async ({ request, baseURL }) => {
        const queryParameters = {
            checkin: newBooking.getCheckInDates(),
        }
        // Send a GET request to retrieve a booking by checkin date
        const response = await Request.getRequestByParam(request, baseURL, queryParameters);
        // Assert the expected behavior
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    // Test to retrieve a booking by checkout date
    test("Get Booking By Checkout Date @get", async ({ request, baseURL }) => {
        const queryParameters = {
            checkout: newBooking.getCheckOutDates(),
        }
        // Send a GET request to retrieve a booking by checkout date
        const response = await Request.getRequestByParam(request, baseURL, queryParameters);
        // Assert the expected behavior
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    // Test to retrieve a booking by ID
    test("Get Booking By ID @get", async ({ request, baseURL }) => {
        // Get the booking ID from the environment variable
        let ID = process.env.BOOKING_ID;

        // Send a GET request to retrieve a booking by ID
        const response = await Request.getRequestByID(request, baseURL, ID);

        // Extract the booking data from the response
        const responseBody = await response.json();

        // Assert the expected behavior
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        // Assert that the booking data matches the expected values
        expect(responseBody).toHaveProperty(
            "firstname",
            newBooking.getFirstName());
        expect(responseBody).toHaveProperty(
            "lastname",
            newBooking.getLastName());
        expect(responseBody).toHaveProperty(
            "totalprice",
            newBooking.getTotalPrice());
        expect(responseBody).toHaveProperty(
            "depositpaid",
            newBooking.getDepositPaid());
    });

    // Test to update a booking partially
    test("Update Booking Partially - Udpate firstname and lastname @patch", async ({ request, baseURL }) => {
        // Get the booking ID from the environment variable
        let ID = process.env.BOOKING_ID;

        // Send a GET request to retrieve the booking to be updated
        const response2 = await Request.getRequestByID(request, baseURL, ID);
        // Assert the expected behavior
        expect(response2.status()).toBe(200);

        // send a patch updated user request with modified first name and last name
        const response = await Request.patchRequest(request, baseURL, ID, updatedBooking);
        // Assert the expected behavior
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();

        // Assert that the booking updated data matches the expected values
        expect(responseBody).toHaveProperty(
            "firstname",
            updatedBooking.getFirstName());
        expect(responseBody).toHaveProperty(
            "lastname",
            updatedBooking.getLastName());
        expect(responseBody).toHaveProperty(
            "totalprice",
            newBooking.getTotalPrice());
        expect(responseBody).toHaveProperty(
            "depositpaid",
            newBooking.getDepositPaid());
        expect(responseBody).toHaveProperty(
            "additionalneeds",
            newBooking.getAdditionalNeeds()
        );
    });

    // Test to update a booking
    test("Update Booking @put", async ({ request, baseURL }) => {
        // Get the booking ID from the environment variable
        let ID = process.env.BOOKING_ID;

        // Retrieve the booking to be updated
        const response2 = await Request.getRequestByID(request, baseURL, ID);
        expect(response2.status()).toBe(200); // Assert the booking exists

        // Update the booking with the new user data
        const response = await Request.putRequest(request, baseURL, updatedBooking, ID);
        expect(response.status()).toBe(200); // Assert the update was successful
        expect(response.ok()).toBeTruthy(); // Assert the response is OK

        // Verify the updated booking data
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty(
            "firstname",
            updatedBooking.getFirstName()
        );
        expect(responseBody).toHaveProperty(
            "lastname",
            updatedBooking.getLastName()
        );
        expect(responseBody).toHaveProperty(
            "totalprice",
            updatedBooking.getTotalPrice()
        );
        expect(responseBody).toHaveProperty(
            "depositpaid",
            updatedBooking.getDepositPaid()
        );
        expect(responseBody).toHaveProperty(
            "additionalneeds",
            updatedBooking.getAdditionalNeeds()
        );
    });

    // Test to delete a booking
    test("Delete Booking @delete", async ({ request, baseURL }) => {
        // Get the booking ID from the environment variable
        let ID = process.env.BOOKING_ID;

        // Retrieve the booking to be deleted
        const response2 = await Request.getRequestByID(request, baseURL, ID);
        expect(response2.status()).toBe(200); // Assert the booking exists

        // Delete the booking
        const response = await Request.deleteRequest(request, baseURL, ID);
        expect(response.ok()).toBeTruthy(); // Assert the deletion was successful
        expect(response.status()).toBe(201); // Assert the response is Created
        expect(response.statusText()).toBe("Created"); // Assert the response is Created

        // Verify the booking is no longer available
        const getResponse = await Request.getRequestByID(request, baseURL, ID);
        expect(getResponse.status()).toBe(404);
        expect(getResponse.statusText()).toBe("Not Found");
    });
});