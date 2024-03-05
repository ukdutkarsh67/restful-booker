import { expect, test } from "playwright/test";
import bookingData from "../../test-data/booking.json";
import createUser from "../../pojo/createUser";

test.describe('get Booking', () => {
  let newUser;
  test.beforeAll(async ({ }) => {
    newUser = new createUser();
    newUser.setUserData();

  });
  test.beforeEach("Create Booking", async ({ request, baseURL }) => {
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
    let ID = process.env.BOOKING_ID_3;
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

});

