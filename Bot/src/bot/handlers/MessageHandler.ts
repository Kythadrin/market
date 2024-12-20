import i18n from '../../utils/i18n';
import { Context, Telegraf } from "telegraf";
import { startCommand } from "../commands/startCommand";
import { getMainMenuButtons } from "../components/buttons";
import { changeLanguageCommand, handleLanguageChange } from "../commands/changeLanguageCommand";
import { accountCommand } from "../commands/accountCommand";

export class MessageHandler {
    private ctx: Context;
    private static previousBotMessageId: number | null = null;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    async sendMessageAndDeletePrevious(text: string, extra?: object) {
        if (this.ctx.message) {
            try {
                await this.ctx.deleteMessage(this.ctx.message.message_id);
            } catch (error) {
                console.error('Failed to delete user command message:', error);
            }
        }

        if (MessageHandler.previousBotMessageId) {
            await this.ctx.deleteMessage(MessageHandler.previousBotMessageId).catch(() => {});
        }

        const sentMessage = await this.ctx.reply(text, extra);

        MessageHandler.previousBotMessageId = sentMessage.message_id;
    }

    setLocale() {
        const clientLanguage: string = this.ctx.from?.language_code ?? 'en';
        i18n.setLocale(i18n.getLocales().includes(clientLanguage) ? clientLanguage : 'en');
    }

    handleCommands(bot: Telegraf<Context>) {
        bot.start((ctx: Context) => {
            startCommand(ctx).then();
            ctx.reply(i18n.__('welcome'), getMainMenuButtons()).then();
        });

        bot.on('callback_query', async (ctx: Context) => {
            await handleLanguageChange(ctx);

            bot.hears(i18n.__("buttons.main.account"), (ctx: Context) => {
                accountCommand(ctx);
            });

            bot.hears(i18n.__("buttons.main.shop"), (ctx: Context) => {
                ctx.reply('Shop page');
            });

            bot.hears(i18n.__("buttons.main.language"), (ctx: Context) => {
                changeLanguageCommand(ctx);
            });

            bot.hears(i18n.__("buttons.main.add_funds"), (ctx: Context) => {
                ctx.reply("Add funds page");
            });

            bot.hears(i18n.__("buttons.main.support"), (ctx: Context) => {
                ctx.reply("Support page");
            });

            bot.hears(i18n.__("buttons.main.reviews"), (ctx: Context) => {
                ctx.reply("Reviews page");
            });

            bot.hears(i18n.__("buttons.main.news"), (ctx: Context) => {
                ctx.reply("News page");
            });

            bot.hears(i18n.__("buttons.main.faq"), (ctx: Context) => {
                ctx.reply("FAQ page");
            });
        });
    }
}