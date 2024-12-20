import { BotContext } from "../Bot";
import { MessageHandler } from "./MessageHandler";

export const handleError = async (ctx: BotContext, error: unknown) => {
    const messageHandle = new MessageHandler(ctx);
    console.error('Error occurred:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    await messageHandle.sendMessageAndDeletePrevious(`Error: ${errorMessage}`);
};