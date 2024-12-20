import { BotContext } from "../Bot";
import i18n from '../../utils/i18n';
import {Telegraf} from "telegraf";
import {startCommand} from "../commands/startCommand";
import {getMainMenuButtons} from "../components/buttons";
import {changeLanguageCommand, handleLanguageChange} from "../commands/changeLanguageCommand";
import {accountCommand} from "../commands/accountCommand";

export class MessageHandler {
    private ctx: BotContext;

    constructor(ctx: BotContext) {
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

        if (this.ctx.session?.lastMessageId) {
            try {
                await this.ctx.deleteMessage(this.ctx.session.lastMessageId);
            } catch (error) {
                console.error('Failed to delete previous bot message:', error);
            }
        }

        const sentMessage = await this.ctx.reply(text, extra);
        this.ctx.session!.lastMessageId = sentMessage.message_id;
    }

    setLocale() {
        const clientLanguage: string = this.ctx.from?.language_code ?? 'en';
        i18n.setLocale(i18n.getLocales().includes(clientLanguage) ? clientLanguage : 'en');
    }

    handleCommands(bot: Telegraf<BotContext>) {
        bot.start((ctx: BotContext) => {
            ctx.session!.currentPage = 'main';
            startCommand(ctx).then();
            ctx.reply(i18n.__('welcome'), getMainMenuButtons()).then();
        });

        bot.on('callback_query', async (ctx: BotContext) => {
            await handleLanguageChange(ctx);

            bot.hears(i18n.__("buttons.main.account"), (ctx: BotContext) => {
                ctx.session!.currentPage = 'account';
                accountCommand(ctx);
            });

            bot.hears(i18n.__("buttons.main.shop"), (ctx: BotContext) => {
                ctx.session!.currentPage = 'shop';
                ctx.reply('Shop page');
            });

            bot.hears(i18n.__("buttons.main.language"), (ctx: BotContext) => {
                ctx.session!.currentPage = 'language';
                changeLanguageCommand(ctx);
            });

            bot.hears(i18n.__("buttons.main.add_funds"), (ctx: BotContext) => {
                ctx.session!.currentPage = 'add_funds';
                ctx.reply("Add funds page");
            });

            bot.hears(i18n.__("buttons.main.support"), (ctx: BotContext) => {
                ctx.session!.currentPage = "support";
                ctx.reply("Support page");
            });

            bot.hears(i18n.__("buttons.main.reviews"), (ctx: BotContext) => {
                ctx.session!.currentPage = "reviews";
                ctx.reply("Reviews page");
            });

            bot.hears(i18n.__("buttons.main.news"), (ctx: BotContext) => {
                ctx.session!.currentPage = "news";
                ctx.reply("News page");
            });

            bot.hears(i18n.__("buttons.main.faq"), (ctx: BotContext) => {
                ctx.session!.currentPage = "faq";
                ctx.reply("FAQ page");
            });
        });
    };
}