import {TargetInterface} from "@libs/log/Interface/TargetInterface";
import {MessageEntity} from "@libs/log/Entityes/MessageEntity";
import {Target} from "@libs/log/Targets/Target";

export class ConsoleTarget extends Target implements TargetInterface {

    public collect(messages: MessageEntity[]): boolean {
        messages.map((item: MessageEntity) => {
            console.log('['+item.time.toUTCString()+']['+item.category+'] '+item.message);
        });
        return true;
    }
}