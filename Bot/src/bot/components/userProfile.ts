import {formatDate} from "../../utils/dateFormat";
import dayjs from "dayjs";

export interface IClient {
    telegramId: string;
    balance: number;
    createdAt: Date;
    orders: IOrder[];
}

export interface IOrder {
    id: string;
    createdAt: Date;
    quantity: number;
    price: number;
    productName: string;
}

export const userProfile = (clientData: IClient) => {
    const ordersCount = clientData.orders?.length ?? 0;
    const ordersPriceSum = clientData.orders?.reduce((acc, order) => acc + order.price, 0).toFixed(2);

    return `
Your id:  ${clientData.telegramId}
Your balance:  ${(clientData.balance)} €
Orders count:  ${ordersCount}
Orders price sum:  ${ordersPriceSum} €
Registration date:  ${formatDate(dayjs(clientData.createdAt))}

Orders: 
${ordersCount > 0 ? clientData.orders.map((order: IOrder) => `${order.productName} ${formatDate(dayjs(order.createdAt), true)}: ${order.quantity} - ${order.price.toFixed(2)} €`).join('\n') : 'No orders'}
`;
}