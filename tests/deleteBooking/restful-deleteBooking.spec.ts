import { expect, test } from "playwright/test";
import createUser from "../../pojo/createUser";
import { generateToken } from "../generateToken/generateToken";
test.describe("delete Booking",()=>{
    let newUser;
    test.beforeAll(async () => {
        newUser = new createUser();
        newUser.setUserData();
    });
    test.beforeEach("Create Booking", async ({ request, baseURL }) => {
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
        process.env.BOOKING_ID_5 = responseBody.bookingid;
      });
      
      test("Delete Booking @delete", async ({ request, baseURL }) => {
        let ID = process.env.BOOKING_ID_5;
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
