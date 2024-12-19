import { Telegraf } from 'telegraf';
import { createUser } from '../utils/api';

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start(async (ctx) => {
    ctx.reply('Welcome! I will create your account using your Telegram ID.');

    const telegramId = ctx.from?.id.toString();
    if (telegramId) {
        try {
            const result = await createUser(telegramId);
            ctx.reply(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                ctx.reply(error.message);
            } else {
                ctx.reply('error');
            }
            ctx.reply('Failed to create user123. Please try again later.');
        }
    } else {
        ctx.reply('Could not retrieve your Telegram ID. Please try again.');
    }
});

bot.launch().then();