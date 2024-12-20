import { Telegraf } from 'telegraf';
import { startCommand } from "./commands/startCommand";
import { accountCommand } from "./commands/accountCommand";
import { changeLanguageCommand, handleLanguageChange } from "./commands/changeLanguageCommand";
import i18n from '../utils/i18n';

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start(startCommand);

bot.on('callback_query', async (ctx) => {
    await handleLanguageChange(ctx);

    bot.hears(i18n.__("buttons.main.account"), accountCommand);
    bot.hears(i18n.__("buttons.main.shop"), () => {console.log("shop")});
    bot.hears(i18n.__("buttons.main.language"), changeLanguageCommand);
    bot.hears(i18n.__("buttons.main.add_funds"), () => {console.log("add funds")});
    bot.hears(i18n.__("buttons.main.support"), () => {console.log("support")});
    bot.hears(i18n.__("buttons.main.reviews"), () => {console.log("reviews")});
    bot.hears(i18n.__("buttons.main.news"), () => {console.log("news")});
    bot.hears(i18n.__("buttons.main.faq"), () => {console.log("faq")});
});

bot.launch().then();