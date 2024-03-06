import { expect, test } from "playwright/test";
import createUser from "../../pojo/createUser";
import { generateToken } from "../generateToken/generateToken";
test.describe('partial update booking', () => {
    let newUser;
    test.beforeAll(async () => {
        newUser = new createUser();
        newUser.setUserData();
    });
    test.beforeEach("Create Booking and generate token", async ({ request, baseURL }) => {
        process.env.authToken = await generateToken({request,baseURL});
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
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        process.env.BOOKING_ID_3 = responseBody.bookingid;
    });

    test("Update Booking Partially - Udpate firstname and lastname @patch", async ({ request, baseURL }) => {
        let ID = process.env.BOOKING_ID_3;
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

});


