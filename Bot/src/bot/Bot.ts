import { Telegraf, Context } from 'telegraf';
import { MessageHandler } from './handlers/MessageHandler';

interface SessionData {
    currentPage?: string;
    lastMessageId?: number;
}

export interface BotContext extends Context {
    session?: SessionData;
}

export class Bot {
    private bot: Telegraf<BotContext>;
    private messageHandler: MessageHandler;

    constructor(token: string) {
        this.bot = new Telegraf<BotContext>(token);
        this.messageHandler = new MessageHandler(this.bot.context as BotContext);
        this.initialize();
    }

    private initialize() {
        this.bot.use((ctx: BotContext, next) => {
            if (!ctx.session) {
                ctx.session = {};
            }
            return next();
        });

        this.messageHandler.handleCommands(this.bot);
    }

    public launch() {
        this.bot.launch().then();
    }
}
