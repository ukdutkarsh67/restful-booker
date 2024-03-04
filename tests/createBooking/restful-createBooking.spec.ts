import { expect, test } from "playwright/test";
import bookingData from "../../test-data/post-booking.json";
import createUser from "../../pojo/createUser";

test.describe('create booking',async ()=>{
    let newUser;
    test.beforeAll(async () => {
        newUser=new createUser();
        newUser.setFirstName(bookingData.firstname);
        newUser.setLastName(bookingData.lastname);
        newUser.setTotalPrice(bookingData.totalprice);
        newUser.setDepositPaid(bookingData.depositpaid);
        newUser.setAdditionalNeeds(bookingData.additionalneeds);
        newUser.setBookingDates(bookingData.bookingdates);
    });
    test("Create Booking", async ({ request, baseURL }) => {
      const response = await request.post(`${baseURL}/booking`, {
        data: newUser,
      });
    
      const responseBody = await response.json();
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
      expect(responseBody.booking).toHaveProperty(
        "firstname",
        newUser.getFirstName()
      );
      expect(responseBody.booking).toHaveProperty("lastname", bookingData.lastname);
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
