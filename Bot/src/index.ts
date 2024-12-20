import { config } from "dotenv";
import { Bot } from "./bot/Bot";

config();

const bot = new Bot(process.env.BOT_TOKEN!);
bot.launch();

console.log("Telegram bot is running...");