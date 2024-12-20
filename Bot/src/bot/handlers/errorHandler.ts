import { MessageHandler } from "./MessageHandler";
import {Context} from "telegraf";

export const handleError = async (ctx: Context, error: unknown) => {
    const messageHandle = new MessageHandler(ctx);
    console.error('Error occurred:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    await messageHandle.sendMessageAndDeletePrevious(`Error: ${errorMessage}`);
};