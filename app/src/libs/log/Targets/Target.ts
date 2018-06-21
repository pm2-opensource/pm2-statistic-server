import {MessageEntity} from "@libs/log/Entityes/MessageEntity";

export class Target {
    categories: string[] = [];
    enabled: boolean = true;
    exportInterval: number = 1000;
    messages: MessageEntity[] = [];
    prefix: string;
}