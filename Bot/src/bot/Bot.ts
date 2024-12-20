import { Telegraf, Context } from 'telegraf';
import { MessageHandler } from './handlers/MessageHandler';

export class Bot {
    private bot: Telegraf<Context>;
    private messageHandler: MessageHandler;

    constructor(token: string) {
        this.bot = new Telegraf<Context>(token);
        this.messageHandler = new MessageHandler(this.bot.context as Context);
        this.messageHandler.handleCommands(this.bot);
    }

    public launch() {
        this.bot.launch().then();
    }
}
