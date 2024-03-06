import { faker } from "@faker-js/faker";
export default class createUser {
    private firstName: string;
    private lastName: string;
    private totalPrice: number;
    private depositPaid: boolean;
    private bookingDates: {
        checkin: string;
        checkout: string;
    };
    private additionalNeeds: string;

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
        return this.bookingDates.checkin;
    }

    public getAdditionalNeeds(): string {
        return this.additionalNeeds;
    }

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

    public setUserData() {
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