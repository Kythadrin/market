import { formatDate } from "../../utils/dateFormat";
import dayjs from "dayjs";
import i18n from '../../utils/i18n';

export interface IClient {
    id: number;
    telegramId: string;
    balance: number;
    createdAt: Date;
    orders: IOrder[];
}

export interface IOrder {
    id: number;
    createdAt: Date;
    quantity: number;
    price: number;
    productName: string;
}

export const userProfile = (clientData: IClient) => {
    const ordersCount = clientData.orders?.length ?? 0;
    const ordersPriceSum = clientData.orders?.reduce((acc, order) => acc + order.price, 0).toFixed(2);

    const orders = ordersCount > 0 ? clientData.orders.map((order: IOrder) => `${order.productName} ${formatDate(dayjs(order.createdAt), true)}: ${order.quantity} - ${order.price.toFixed(2)} €`).join('\n') : i18n.__('no_orders');

    return i18n.__('account_info', {
        telegramId: clientData.telegramId,
        balance: clientData.balance,
        ordersCount: ordersCount,
        ordersPriceSum: ordersPriceSum,
        registrationDate: formatDate(dayjs(clientData.createdAt)),
        orders: orders
    } as any);
}