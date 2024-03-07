// Importing the faker function from the "@faker-js/faker" package
import { faker } from "@faker-js/faker";

// Defining a TypeScript class named "createUser"
export default class createBooking {
    // Declaring private properties for user data
    private firstName: string;
    private lastName: string;
    private totalPrice: number;
    private depositPaid: boolean;
    private bookingDates: {
        checkin: string;
        checkout: string;
    };
    private additionalNeeds: string;

    // Getter methods to retrieve the values of private properties
    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public getDepositPaid(): boolean {
        return this.depositPaid;
    }

    public getBookingDates(): { checkin: string; checkout: string } {
        return this.bookingDates;
    }

    public getCheckInDates(): string {
        return this.bookingDates.checkin;
    }

    public getCheckOutDates(): string {
        return this.bookingDates.checkout;
    }

    public getAdditionalNeeds(): string {
        return this.additionalNeeds;
    }

    // Setter methods to set the values of private properties
    public setFirstName(firstname: string): void {
        this.firstName = firstname;
    }

    public setLastName(lastname: string): void {
        this.lastName = lastname;
    }

    public setTotalPrice(totalprice: number): void {
        this.totalPrice = totalprice;
    }

    public setDepositPaid(depositpaid: boolean): void {
        this.depositPaid = depositpaid;
    }

    public setBookingDates(values: { checkin: string, checkout: string }): void {
        this.bookingDates = values;
    }

    public setAdditionalNeeds(additionalneeds: string): void {
        this.additionalNeeds = additionalneeds;
    }

    // Method to set user data using Faker library
    public setUserData() {
        // Setting random values for user properties
        this.setFirstName(faker.person.firstName());
        this.setLastName(faker.person.lastName());
        this.setTotalPrice(+faker.commerce.price());
        this.setDepositPaid(faker.datatype.boolean(1));
        const checkin = faker.date.soon().toISOString().split('T')[0];
        const checkout = faker.date.soon({ days: 5, refDate: checkin }).toISOString().split('T')[0];
        this.setBookingDates({ checkin, checkout });
        this.setAdditionalNeeds(faker.commerce.productName());
    }
}
