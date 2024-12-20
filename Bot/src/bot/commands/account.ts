import { Context } from 'telegraf';
import { httpGetRequest } from '../../utils/api';
import { shopButtons } from '../buttons';
import { userProfile, IClient } from '../components/userProfile';

export const accountCommand = async (ctx: Context) => {
    const telegramId = ctx.from?.id.toString();
    if (telegramId) {
        try {
            const response = await httpGetRequest(`/client/${telegramId}`);

            if (response.ok) {
                const clientData: IClient = await response.json();

                ctx.reply(userProfile(clientData), shopButtons);
            } else {
                ctx.reply('Error: ' + response.statusText);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                ctx.reply('Error: ' + error.message);
            } else {
                ctx.reply('error');
            }
        }
    } else {
        ctx.reply('Could not retrieve your Telegram ID. Please try again.');
    }
};