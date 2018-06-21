import {LogLevel} from './types';
import {MessageEntity} from './Entityes/MessageEntity';
import {ConsoleTarget} from './Targets/ConsoleTraget';
import {TargetInterface} from './Interface/TargetInterface';

export class Logger {

    public flushInterval: number = 1000;

    public traceLevel: number = 0;

    private messages: MessageEntity[] = [];

    public targets: TargetInterface[] = [];

    public constructor(options: {flushInterval?: number, traceLevel?: number}) {
        // TODO in config!
        this.targets.push(new ConsoleTarget());
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
