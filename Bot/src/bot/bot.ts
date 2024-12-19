import { Telegraf } from 'telegraf';
import {httpPostRequest} from '../utils/api';

interface IClient {
    telegramId: string;
    balance: string;
    orders: IOrder[];
}

interface IOrder {
    id: string;
    createdAt: string;
    quantity: number;
}

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start(async (ctx) => {
    ctx.reply('Welcome! I will create your account using your Telegram ID if it not exist.');

    const telegramId = ctx.from?.id.toString();
    if (telegramId) {
        try {
            const response = await httpPostRequest('/client', {telegramId: telegramId});

            if (response.ok) {
                const data: IClient = await response.json();

                const formattedResult = `
                Your id:    ${data.telegramId}
Your balance:   ${data.balance} €
Orders count:   ${data.orders?.length ?? 0}

Orders: 
${data.orders?.length > 0 ? data.orders?.map((order: IOrder) => order.id).join('\n') : 'No orders'}
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