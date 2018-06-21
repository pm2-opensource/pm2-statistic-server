import {Logger} from "@libs/log/Logger";
import {LogLevel} from "@libs/log/types";

export class App {
    private logger: Logger;

    public constructor() {
        this.logger = new Logger({});
    }

    private static $self: App;

    /**
     * Singleton realization
     * @returns {App}
     */
    public static instance(): App {
        if (App.$self === undefined) {
            App.$self = new App();
        }

        return App.$self;
    }

    public static info(message: string, data?: any, category: string = 'application', tags?: string[]) {
        App.instance().logger.log(message, LogLevel.INFO, data, category, tags);
    }
    public static fatal(message: string, data?: any, category: string = 'application', tags?: string[]) {
        App.instance().logger.log(message, LogLevel.FATAL, data, category, tags);
    }
    public static error(message: string, data?: any, category: string = 'application', tags?: string[]) {
        App.instance().logger.log(message, LogLevel.ERROR, data, category, tags);
    }
    public static debug(message: string, data?: any, category: string = 'application', tags?: string[]) {
        App.instance().logger.log(message, LogLevel.DEBUG, data, category, tags);
    }
    public static warn(message: string, data?: any, category: string = 'application', tags?: string[]) {
        App.instance().logger.log(message, LogLevel.WARN, data, category, tags);
    }
    public static trace(message: string, data?: any, category: string = 'application', tags?: string[]) {
        App.instance().logger.log(message, LogLevel.TRACE, data, category, tags);
    }
}