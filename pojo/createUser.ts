export default class createUser {
    private firstname: string;
    private lastname: string;
    private totalprice: number;
    private depositpaid: boolean;
    private bookingdates: {
        checkin:string;
        checkout:string;
    };
    private additionalneeds: string;
    
    public getFirstName():string{
        return this.firstname;
    }

    public getLastName():string{
        return this.lastname;
    }

    public getTotalPrice():number{
        return this.totalprice;
    }

    public getDepositPaid():boolean{
        return this.depositpaid;
    }

    public getBookingDates():{checkin:string;checkout:string}{
        return this.bookingdates;
    }

    public getAdditionalNeeds():string{
        return this.additionalneeds;
    }

    public setFirstName(firstname: string):void{
        this.firstname=firstname;
    }

    public setLastName(lastname: string):void{
        this.lastname=lastname;
    }
    
    public setTotalPrice(totalprice: number):void{
        this.totalprice=totalprice;
    }

    public setDepositPaid(depositpaid: boolean):void{
        this.depositpaid=depositpaid;
    }

    public setBookingDates(values:{checkin:string , checkout:string}):void{
        this.bookingdates= values;
    }

    public setAdditionalNeeds(additionalneeds: string):void{
        this.additionalneeds=additionalneeds;
    }
    
}