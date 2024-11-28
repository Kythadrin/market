import express from "express";
import cors from "cors";
import TelegramBot from "node-telegram-bot-api";

const app = express();
const port = process.env.BLOCKCHAIN_PORT || 8082;
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.error('TELEGRAM_BOT_TOKEN is not set in the environment variables!');
    process.exit(1);
}

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Blockchain server running on port ${port}`);
});

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from?.first_name || 'User';
    const userMessage = msg.text;

    console.log(`Message from ${userName}: ${userMessage}`);

    bot.sendMessage(chatId, `Hello, ${userName}! You said: ${userMessage}`);
});

console.log('Telegram bot is running...');