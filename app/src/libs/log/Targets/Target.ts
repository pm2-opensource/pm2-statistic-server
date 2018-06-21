import {TargetInterface} from "@libs/log/Interface/TargetInterface";
import {MessageEntity} from "@libs/log/Entityes/MessageEntity";

export class Target implements TargetInterface {
    categories: string[] = [];
    collect: (messages: MessageEntity[]) => boolean;
    enabled: boolean = true;
    exportInterval: number;
    messages: MessageEntity[] | null;
    prefix: string;

}