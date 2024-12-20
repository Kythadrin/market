import { Context } from 'telegraf';
import { httpGetRequest } from '../../utils/api';
import {getMenuButtons} from '../components/buttons';
import { userProfile, IClient } from '../components/userProfile';
import i18n from '../../utils/i18n';

export const accountCommand = async (ctx: Context) => {
    const telegramId = ctx.from?.id.toString();
    if (telegramId) {
        try {
            const response = await httpGetRequest(`/client/${telegramId}`);

            if (response.ok) {
                const clientData: IClient = await response.json();

                await ctx.reply(userProfile(clientData), getMenuButtons());
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