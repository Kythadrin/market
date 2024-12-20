import { Context } from 'telegraf';
import { httpPostRequest } from '../../utils/api';
import { getMainMenuButtons } from '../components/buttons';
import { userProfile, IClient } from '../components/userProfile';
import { MessageHandler } from '../handlers/MessageHandler';
import { handleError } from "../handlers/errorHandler";

export const startCommand = async (ctx: Context) => {
    const messageHandler = new MessageHandler(ctx);
    messageHandler.setLocale();

    await messageHandler.sendMessageAndDeletePrevious('welcome', getMainMenuButtons());

    const telegramId = ctx.from?.id.toString();
    if (telegramId) {
        try {
            const response = await httpPostRequest('/client', {telegramId: telegramId});

            if (response.ok) {
                const clientData: IClient = await response.json();
                await messageHandler.sendMessageAndDeletePrevious(userProfile(clientData), getMainMenuButtons());
            } else {
                await messageHandler.sendMessageAndDeletePrevious('error' + response.statusText);
            }
        } catch (error) {
            await handleError(ctx, error);
        }
    } else {
        await messageHandler.sendMessageAndDeletePrevious('no_telegram_id');
    }
}