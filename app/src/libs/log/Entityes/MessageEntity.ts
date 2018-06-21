import {LogLevel} from '../types';

export interface MessageEntity {
    category: string;
    level: LogLevel;
    time: Date;
    message: string;
    tags?: string[];
    data?: object;
}