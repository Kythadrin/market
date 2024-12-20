import { Context } from 'telegraf';
import i18n from '../../utils/i18n';
import { CallbackQuery } from "@telegraf/types";
import {getMainMenuButtons} from "../components/buttons";

export const changeLanguageCommand = async (ctx: Context) => {
    const languageButtons = i18n.getLocales().map((locale) => ({
        text: i18n.__(String(i18n.getCatalog(locale).language)),
        callback_data: `set_lang_${locale}`,
    }));

    await ctx.reply(i18n.__("choose_language"), {
        reply_markup: {
            inline_keyboard: [languageButtons]
        }
    });
};

export const handleLanguageChange = async (ctx: Context) => {
    const callbackQuery = ctx.callbackQuery as CallbackQuery.DataQuery;
    const langCode = callbackQuery.data?.split('_')[2];
    if (langCode) {
        i18n.setLocale(langCode);
        await ctx.answerCbQuery();
        await ctx.reply(i18n.__("language_changed", { language: i18n.__("language") }), getMainMenuButtons());
    }
};
