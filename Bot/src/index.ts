import TelegramBot from "node-telegram-bot-api";

const token: string = process.env.TELEGRAM_BOT_TOKEN as string;

if (!token) {
    console.error('TELEGRAM_BOT_TOKEN is not set in the environment variables!');
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg: TelegramBot.Message) => {
    const chatId: number = msg.chat.id;
    bot.sendMessage(chatId, `Hello, ${msg.from?.first_name}! You said: ${msg.text}`).then();
});