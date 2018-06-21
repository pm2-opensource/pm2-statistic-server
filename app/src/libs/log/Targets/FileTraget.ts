import {MessageEntity} from "@libs/log/Entityes/MessageEntity";
import {Target} from "@libs/log/Targets/Target";
import {TargetInterface} from "@libs/log/Interface/TargetInterface";

export class FileTarget extends Target implements TargetInterface{

    public collect(messages: MessageEntity[]): boolean {
        messages.map((item: MessageEntity) => {
            //console.log(item.message);
        });
        return true;
    }
}