import { Telegraf } from 'telegraf';
import {startCommand} from "./commands/start";
import {accountCommand} from "./commands/account";

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start(startCommand);

bot.hears("Account", accountCommand);

bot.launch().then();