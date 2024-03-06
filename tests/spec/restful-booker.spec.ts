import { test, expect } from '@playwright/test'
import createUser from '../pojo/createUser';
import updatedUserData from "../test-data/update-booking.json";
import { generateToken } from '../generateToken/generateToken';
test.describe.serial(() => {
    let newUser;
    let updatedUser;
    test.beforeAll(async ({ request, baseURL }) => {
        newUser = new createUser();
        newUser.setUserData();
        updatedUser = new createUser();
        updatedUser.setFirstName(updatedUserData.firstname);
        updatedUser.setLastName(updatedUserData.lastname);
        updatedUser.setTotalPrice(updatedUserData.totalprice);
        updatedUser.setDepositPaid(updatedUserData.depositpaid);
        updatedUser.setAdditionalNeeds(updatedUserData.additionalneeds);
        updatedUser.setBookingDates(updatedUserData.bookingdates);
        process.env.authToken = await generateToken({ request, baseURL });
    });
    test("Create Booking", async ({ request, baseURL }) => {
        const response = await request.post(`${baseURL}/booking`, {
            data: {
                "firstname": newUser.getFirstName(),
                "lastname": newUser.getLastName(),
                "totalprice": newUser.getTotalPrice(),
                "depositpaid": newUser.getDepositPaid(),
                "bookingdates": {
                    "checkin": newUser.getCheckInDates(),
                    "checkout": newUser.getCheckOutDates()
                },
                "additionalneeds": newUser.getAdditionalNeeds()
            },
        });

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
        const response = await request.get(`${baseURL}/booking`, {
            params: {
                lastname: "Brown",
            },
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test("Get Booking By Firstname @get", async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/booking`, {
            params: {
                firstname: "Sally",
            },
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test("Get Booking By Checkin Date @get", async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/booking`, {
            params: {
                checkin: "2013-02-23",
            },
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test("Get Booking By Checkout Date @get", async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/booking`, {
            params: {
                checkout: "2014-10-23",
            },
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test("Get Booking By ID @get", async ({ request, baseURL }) => {
        let ID = process.env.BOOKING_ID;
        const url = `${baseURL}/booking/`;
        const response = await request.get(url + ID, {});
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
        const url = `${baseURL}/booking/`;
        const response2 = await request.get(url + ID, {});
        expect(response2.status()).toBe(200);

        const response = await request.patch(url + ID, {
            headers: {
                Cookie: `token=${process.env.authToken}`,
                Accept: "application/json",
            },
            data: {
                firstname: "James",
                lastname: "Brown",
            },
        });
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();

        expect(responseBody).toHaveProperty("firstname", "James");
        expect(responseBody).toHaveProperty("lastname", "Brown");
        expect(responseBody).toHaveProperty("totalprice", newUser.getTotalPrice());
        expect(responseBody).toHaveProperty("depositpaid", newUser.getDepositPaid());
        expect(responseBody).toHaveProperty(
            "additionalneeds",
            newUser.getAdditionalNeeds()
        );
    });
    test("Update Booking @put", async ({ request, baseURL }) => {
        let ID = process.env.BOOKING_ID;
        const url = `${baseURL}/booking/`;
        const response2 = await request.get(url + ID, {});
        expect(response2.status()).toBe(200);

        const response = await request.put(url + ID, {
            headers: {
                Cookie: `token=${process.env.authToken}`,
                Accept: "*/*",
            },
            data: {
                "firstname": updatedUser.getFirstName(),
                "lastname": updatedUser.getLastName(),
                "totalprice": updatedUser.getTotalPrice(),
                "depositpaid": updatedUser.getDepositPaid(),
                "bookingdates": {
                    "checkin": updatedUser.getCheckInDates(),
                    "checkout": updatedUser.getCheckOutDates()
                },
                "additionalneeds": updatedUser.getAdditionalNeeds()
            }

        });
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
        const url = `${baseURL}/booking/`;
        const response2 = await request.get(url + ID, {});
        expect(response2.status()).toBe(200);

        const response = await request.delete(url + ID, {
            headers: {
                Cookie: `token=${process.env.authToken}`,
                Accept: "application/json",
            },
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe("Created");

        const getUrl = `${baseURL}/booking/`;
        const getResponse = await request.get(getUrl + ID, {});
        expect(getResponse.status()).toBe(404);
        expect(getResponse.statusText()).toBe("Not Found");
    });


});