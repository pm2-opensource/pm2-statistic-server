import {TargetInterface} from "@libs/log/Interface/TargetInterface";
import {MessageEntity} from "@libs/log/Entityes/MessageEntity";

export class FileTarget implements TargetInterface {
    public enabled: boolean = true;
    public categories: string[] = [];
    public prefix: string;
    public exportInterval: number;
    public messages: MessageEntity[] | null;

    public collect(messages: MessageEntity[]): boolean {
        messages.map((item: MessageEntity) => {
            console.log(item.message);
        });
        return true;
    }
}