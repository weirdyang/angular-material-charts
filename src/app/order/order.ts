export class Order {
    id: number;
    date: string;
    name: string;
    status: string;
    orderTotal: number;
    paymentMode: string;
    constructor(
        id: number,
        date: string,
        status: string,
        orderTotal: number,
        paymentMode: string,
        name: string) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.orderTotal = orderTotal;
        this.status = status;
        this.paymentMode = paymentMode;

    }
}