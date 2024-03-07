export class Request {
    // Method for making a POST request
    public static async postRequest(request, baseURL, bookingData) {
        const response = await request.post(`${baseURL}/booking`, {
            // Data payload for the POST request
            data: {
                "firstname": bookingData.getFirstName(),
                "lastname": bookingData.getLastName(),
                "totalprice": bookingData.getTotalPrice(),
                "depositpaid": bookingData.getDepositPaid(),
                "bookingdates": {
                    "checkin": bookingData.getCheckInDates(),
                    "checkout": bookingData.getCheckOutDates()
                },
                "additionalneeds": bookingData.getAdditionalNeeds()
            },
        });
        return response;
    }

    // Method for making a GET request with parameters
    public static async getRequestByParam(request, baseURL, paramData) {
        const response = await request.get(`${baseURL}/booking`, {
            // Parameters for the GET request
            params: {
                paramData,
            },
        });
        return response;
    }

    // Method for making a GET request by ID
    public static async getRequestByID(request, baseURL, ID) {
        const url = `${baseURL}/booking/`;
        const response = await request.get(url + ID, {});
        return response;
    }

    // Method for making a PATCH request
    public static async patchRequest(request, baseURL, ID, partialData) {
        const url = `${baseURL}/booking/`;
        const response = await request.patch(url + ID, {
            // Headers and data payload for the PATCH request
            headers: {
                Cookie: `token=${process.env.authToken}`,
                Accept: "application/json",
            },
            data: {
                "firstname": partialData.getFirstName(),
                "lastname": partialData.getLastName(),
            },
        });
        return response;
    }

    // Method for making a PUT request
    public static async putRequest(request, baseURL, updatedUser, ID) {
        const url = `${baseURL}/booking/`;
        const response = await request.put(url + ID, {
            // Headers and data payload for the PUT request
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
        return response;
    }

    // Method for making a DELETE request
    public static async deleteRequest(request, baseURL, ID) {
        const url = `${baseURL}/booking/`;
        const response = await request.delete(url + ID, {
            // Headers for the DELETE request
            headers: {
                Cookie: `token=${process.env.authToken}`,
                Accept: "application/json",
            },
        });
        return response;
    }
}
