import { expect, test } from "playwright/test";
import updatedUserData from "../../test-data/update-booking.json";
import { generateToken } from "../generateToken/generateToken";
import createUser from "../../pojo/createUser";
test.describe('update booking',()=>{
    let newUser;
    let updatedUser;
    test.beforeAll(async () => {
        newUser = new createUser();
        newUser.setUserData();
        updatedUser=new createUser();
        updatedUser.setFirstName(updatedUserData.firstname);
        updatedUser.setLastName(updatedUserData.lastname);
        updatedUser.setTotalPrice(updatedUserData.totalprice);
        updatedUser.setDepositPaid(updatedUserData.depositpaid);
        updatedUser.setAdditionalNeeds(updatedUserData.additionalneeds);
        updatedUser.setBookingDates(updatedUserData.bookingdates);
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
        process.env.BOOKING_ID_4 = responseBody.bookingid;
      });
      
      test("Update Booking @put", async ({ request, baseURL }) => {
        let ID = process.env.BOOKING_ID_4;
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

});

