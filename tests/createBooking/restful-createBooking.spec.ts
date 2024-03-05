import { expect, test } from "playwright/test";
import createUser from "../../pojo/createUser";

test.describe.serial('Create Booking',()=>{
    let newUser;
    test.beforeAll(async () => {
        newUser=new createUser();
        newUser.setUserData();
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
      process.env.BOOKING_ID_1 = responseBody.bookingid;
      console.log(newUser);
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
    
});
