import { httpGetRequest } from '../../utils/api';
import { getMainMenuButtons } from '../components/buttons';
import { userProfile, IClient } from '../components/userProfile';
import i18n from '../../utils/i18n';
import { handleError } from "../handlers/errorHandler";
import { MessageHandler } from "../handlers/MessageHandler";
import {Context} from "telegraf";

export const accountCommand = async (ctx: Context) => {
    const messageHandler = new MessageHandler(ctx);

    const telegramId = ctx.from?.id.toString();
    if (telegramId) {
        try {
            const response = await httpGetRequest(`/client/${telegramId}`);

            if (response.ok) {
                const clientData: IClient = await response.json();

                await messageHandler.sendMessageAndDeletePrevious(userProfile(clientData), getMainMenuButtons());
            } else {
                await messageHandler.sendMessageAndDeletePrevious(i18n.__('error') + response.statusText);
            }
        } catch (error) {
            await handleError(ctx, error);
        }
    } else {
        await messageHandler.sendMessageAndDeletePrevious(i18n.__('no_telegram_id'));
    }
};