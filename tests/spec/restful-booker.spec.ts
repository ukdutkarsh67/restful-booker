import { test, expect } from '@playwright/test'
import createUser from '../pojo/createUser';
import { generateToken } from '../generateToken/generateToken';
import { Request } from '../request/Request';
test.describe.serial(() => {
    let newUser;
    let updatedUser;
    test.beforeAll(async ({ request, baseURL }) => {
        newUser = new createUser();
        newUser.setUserData();
        updatedUser = new createUser();
        updatedUser.setUserData();
        process.env.authToken = await generateToken({ request, baseURL });
    });
    test("Create Booking", async ({ request, baseURL }) => {
        const response = await Request.postRequest(request, baseURL, newUser);
        const responseBody = await response.json();
        process.env.BOOKING_ID = responseBody.bookingid;
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        expect(responseBody.booking).toHaveProperty(
            "firstname",
            newUser.getFirstName()
        );
        expect(responseBody.booking).toHaveProperty(
            "lastname",
            newUser.getLastName()
        );
        expect(responseBody.booking).toHaveProperty(
            "totalprice",
            newUser.getTotalPrice()
        );
        expect(responseBody.booking).toHaveProperty(
            "depositpaid",
            newUser.getDepositPaid()
        );
        expect(responseBody.booking).toHaveProperty(
            "additionalneeds",
            newUser.getAdditionalNeeds()
        );
    });

    test("Get Booking By Lastname @get", async ({ request, baseURL }) => {
        const queryParameters = {
            lastname: "Brown",
        }
        const response = await Request.getRequestByParam(request, baseURL, queryParameters);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test("Get Booking By Firstname @get", async ({ request, baseURL }) => {
        const queryParameters = {
            firstname: "Sally",
        }
        const response = await Request.getRequestByParam(request, baseURL, queryParameters);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test("Get Booking By Checkin Date @get", async ({ request, baseURL }) => {
        const queryParameters = {
            checkin: "2013-02-23",
        }
        const response = await Request.getRequestByParam(request, baseURL, queryParameters);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test("Get Booking By Checkout Date @get", async ({ request, baseURL }) => {
        const queryParameters = {
            checkout: "2014-10-23",
        }
        const response = await Request.getRequestByParam(request, baseURL, queryParameters);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test("Get Booking By ID @get", async ({ request, baseURL }) => {
        let ID = process.env.BOOKING_ID;
        const response = await Request.getRequestByID(request, baseURL, ID);
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toHaveProperty("firstname", newUser.getFirstName());
        expect(responseBody).toHaveProperty("lastname", newUser.getLastName());
        expect(responseBody).toHaveProperty("totalprice", newUser.getTotalPrice());
        expect(responseBody).toHaveProperty("depositpaid", newUser.getDepositPaid());
    });

    test("Update Booking Partially - Udpate firstname and lastname @patch", async ({ request, baseURL }) => {
        let ID = process.env.BOOKING_ID;
        const response2 = await Request.getRequestByID(request, baseURL, ID);
        expect(response2.status()).toBe(200);

        const response = await Request.patchRequest(request, baseURL, ID, updatedUser);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();

        expect(responseBody).toHaveProperty("firstname", updatedUser.getFirstName());
        expect(responseBody).toHaveProperty("lastname", updatedUser.getLastName());
        expect(responseBody).toHaveProperty("totalprice", newUser.getTotalPrice());
        expect(responseBody).toHaveProperty("depositpaid", newUser.getDepositPaid());
        expect(responseBody).toHaveProperty(
            "additionalneeds",
            newUser.getAdditionalNeeds()
        );
    });
    test("Update Booking @put", async ({ request, baseURL }) => {
        let ID = process.env.BOOKING_ID;
        const response2 = await Request.getRequestByID(request, baseURL, ID);
        expect(response2.status()).toBe(200);

        const response = await Request.putRequest(request, baseURL, updatedUser, ID);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty(
            "firstname",
            updatedUser.getFirstName()
        );
        expect(responseBody).toHaveProperty(
            "lastname",
            updatedUser.getLastName()
        );
        expect(responseBody).toHaveProperty(
            "totalprice",
            updatedUser.getTotalPrice()
        );
        expect(responseBody).toHaveProperty(
            "depositpaid",
            updatedUser.getDepositPaid()
        );
        expect(responseBody).toHaveProperty(
            "additionalneeds",
            updatedUser.getAdditionalNeeds()
        );
    });
    test("Delete Booking @delete", async ({ request, baseURL }) => {
        let ID = process.env.BOOKING_ID;
        const response2 = await Request.getRequestByID(request, baseURL, ID);
        expect(response2.status()).toBe(200);

        const response = await Request.deleteRequest(request, baseURL, ID);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe("Created");

        const getResponse = await Request.getRequestByID(request, baseURL, ID);
        expect(getResponse.status()).toBe(404);
        expect(getResponse.statusText()).toBe("Not Found");
    });


});