import {AnoxConfig} from "@libs/Anox";
let anox:AnoxConfig = {
    host:'0.0.0.0',
    port:8080
};
let NsSocket:object = {

};
let db:object = {

};
export const DefaultConfig = {
    components: {
        anox,
        NsSocket
    }
};