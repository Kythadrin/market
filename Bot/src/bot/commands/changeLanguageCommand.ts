import i18n from '../../utils/i18n';
import { CallbackQuery } from "@telegraf/types";
import { getLanguageButtons, getMainMenuButtons } from "../components/buttons";
import { BotContext } from "../Bot";
import { MessageHandler } from '../handlers/MessageHandler';

export const changeLanguageCommand = async (ctx: BotContext) => {
    const messageHandler = new MessageHandler(ctx);
    await messageHandler.sendMessageAndDeletePrevious(i18n.__("choose_language"), getLanguageButtons());
};

export const handleLanguageChange = async (ctx: BotContext) => {
    const messageHandler = new MessageHandler(ctx);
    const callbackQuery = ctx.callbackQuery as CallbackQuery.DataQuery;
    const langCode = callbackQuery.data?.split('_')[2];
    if (langCode) {
        i18n.setLocale(langCode);
        await ctx.answerCbQuery();
        await messageHandler.sendMessageAndDeletePrevious(i18n.__("language_changed", { language: i18n.__("language") }), getMainMenuButtons());
    }
};
