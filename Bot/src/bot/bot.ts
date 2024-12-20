import { Telegraf } from 'telegraf';
import { startCommand } from "./commands/startCommand";
import { accountCommand } from "./commands/accountCommand";
import { changeLanguageCommand, handleLanguageChange } from "./commands/changeLanguageCommand";
import i18n from '../utils/i18n';

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start(startCommand);

bot.on('callback_query', async (ctx) => {
    await handleLanguageChange(ctx);

    bot.hears(i18n.__("buttons.account"), accountCommand);
    bot.hears(i18n.__("buttons.shop"), () => {});
    bot.hears(i18n.__("buttons.language"), changeLanguageCommand);
});

bot.launch().then();