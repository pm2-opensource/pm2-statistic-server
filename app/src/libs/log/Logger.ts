import {LogLevel} from './types';
import {MessageEntity} from './Entityes/MessageEntity';
import {ConsoleTarget} from './Targets/ConsoleTraget';
import {TargetInterface} from './Interface/TargetInterface';
import {FileTarget} from "@libs/log/Targets/FileTraget";

export class Logger {

    private flushInterval: number = 1000;

    private traceLevel: number = 0;

    private messages: MessageEntity[] = [];

    public targets: TargetInterface[] = [];

    public constructor(options: LoggerConfig) {
        this.flushInterval = options.flushInterval;
        this.traceLevel = options.traceLevel;
        // TODO in config!
        this.targets.push(new ConsoleTarget());
        this.targets.push(new FileTarget());
    }


    public log(message: string, level: LogLevel, data?: object, category: string = 'application', tags?: string[]) {
        this.messages.push({
            level: level,
            time: new Date(),
            data: data,
            message: message,
            tags: tags,
            category: category
        });

        this.flush(this.messages);
        this.messages = [];
    }

    public flush(messages: MessageEntity[]) {
        this.targets.map((target: TargetInterface) => {
             if (target.enabled) {
                 target.collect(messages);
             }
        });
    }
}
export interface LoggerConfig {
    flushInterval?:number,
    traceLevel?:number
}