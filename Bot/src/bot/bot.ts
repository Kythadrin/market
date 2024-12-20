import { Telegraf } from 'telegraf';
import {httpPostRequest} from '../utils/api';

interface IClient {
    telegramId: string;
    balance: string;
    createdAt: string;
    orders: IOrder[];
}

interface IOrder {
    id: string;
    createdAt: string;
    quantity: number;
    price: string;
    productName: string;
}

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start(async (ctx) => {
    ctx.reply('Welcome! I will create your account using your Telegram ID if it not exist.');

    const telegramId = ctx.from?.id.toString();
    if (telegramId) {
        try {
            const response = await httpPostRequest('/client', {telegramId: telegramId});

            if (response.ok) {
                const clientData: IClient = await response.json();

                const formattedResult = `
Your id:    ${clientData.telegramId}
Your balance:   ${clientData.balance} €
Orders count:   ${clientData.orders?.length ?? 0}
Orders price sum: ${clientData.orders?.reduce((acc, order) => acc + parseFloat(order.price), 0)} € 
Registration date: ${clientData.createdAt}

Orders: 
${clientData.orders?.length > 0 ? clientData.orders?.map((order: IOrder) => `${order.productName} ${order.createdAt}: ${order.quantity} - ${order.price} €`).join('\n') : 'No orders'}
`;
                ctx.replyWithMarkdown(formattedResult);
            } else {
                ctx.reply('Error: ' + response.statusText);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(2);
                ctx.reply('Error: ' + error.message);
            } else {
                console.log(3);
                ctx.reply('error');
            }
        }
    } else {
        ctx.reply('Could not retrieve your Telegram ID. Please try again.');
    }
});

bot.launch().then();