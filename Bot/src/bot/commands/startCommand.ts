import { Context } from 'telegraf';
import { httpPostRequest } from '../../utils/api';
import { getMainMenuButtons } from '../components/buttons';
import { userProfile, IClient } from '../components/userProfile';
import i18n from '../../utils/i18n';

export const startCommand = async (ctx: Context) => {
    const clientLanguage: string = ctx.from?.language_code ?? 'en';
    i18n.setLocale(i18n.getLocales().includes(clientLanguage) ? clientLanguage : 'en');

    await ctx.reply(i18n.__('welcome'));

    const telegramId = ctx.from?.id.toString();
    if (telegramId) {
        try {
            const response = await httpPostRequest('/client', { telegramId: telegramId });

            if (response.ok) {
                const clientData: IClient = await response.json();

                await ctx.reply(userProfile(clientData), getMainMenuButtons());
            } else {
                await ctx.reply(i18n.__('error') + response.statusText);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                await ctx.reply(i18n.__('error') + error.message);
            } else {
                await ctx.reply('error');
            }
        }
    } else {
        await ctx.reply(i18n.__('no_telegram_id'));
    }
};