import {default as ActionsPm2} from '@core/const/actions-pm2'
import Actions from "@core/const/actions";
import Socket = NodeJS.Socket;

let events        = require('events');
let axon = require('axon');
let pub_sock = axon.socket('sub');
let nssocket = require('nssocket');


pub_sock.on('message', function(msg){
    console.log('---one---');
    let data = JSON.parse(msg);
    if(data.data['axm:reply']) {
        console.log('!------REPLY----------!');
        console.log(data.data['axm:reply']);
        console.log('!------REPLY----------!');
    } else {
        /*collection.insert(data.data, function (err, result) {
            console.log('Insert into mongo')
        });*/
        console.log(msg);
        //console.log(data.data.monitoring);
        //console.dir(data.data.status.data);
        //console.dir(ProcessModel);


        /*ProcessModel.create({}).then(function(created){
            console.log(created);
        });*/
        //status.data.process[3]
    }

});


let _socket_list:Socket[] = [];

pub_sock.bind(8080);

function createNsSocketServer(cb) {
    pub_sock.server.on('connection', function(socket) {
        _socket_list.push(socket);
        console.log('Got new connection on pub_sock');
    });

    let server = new events.EventEmitter();

    let listener_server = nssocket.createServer(function(_socket) {
        server.on('cmd', function(data) {
            if(_socket.connected) {
                console.log('Sending command %j', data);
                _socket.send(data._type, data);
            } else {
                console.log('Not found socket');
            }
        });

        _socket.data('*', function(data) {
            this.event.forEach(function(ev) {
                server.emit(ev, data);
            });

        });

    });

    listener_server.on('error', function(e) {
        throw new Error(e);
    });

    listener_server.on('listening', function() {
        cb(null, server);
    });

    listener_server.listen(4322, '0.0.0.0');
}




function action() {
    //sendCommand("my-api-php", Actions.ACTION_MONITOR)
    setTimeout(function () {
        //console.log(_socket_list);
        //"logrotate"
        //sendPM2Command("my-api-php", ActionsPm2.ACTION_PM2_RESTART);
        //sendCommand(1, Actions.ACTION_PING)



        /*_server.emit('cmd', {
            _type : 'trigger:action',
            process_id : 0,
            action_name : 'ping'
        });*/
    }, 2000);

}





createNsSocketServer((errors, server) => {
    console.log('NsSocketServer bootstrap done');

    server.on('ask:rep', function(pck) {
        console.log(pck)
    });

    setInterval(() => {
        //server.emit('cmd', { _type : 'ask' });
        sendPM2Command("my-api-php", ActionsPm2.ACTION_PM2_RESTART);
    }, 1000);






    function sendPM2Command(name, action, parameters = {}) {

        server.once('trigger:pm2:result', function (data) {
            console.log('trigger:pm2:result');
            console.log(data);
        });
        let status = server.emit('cmd', {
            _type : 'trigger:pm2:action',
            parameters  : {"name": name},
            method_name : action
        });
        console.log('sendPM2Command: ' + name + ' -> ' + action + ':' + status);

    }


    function sendCommand(processId, action, parameters = {}) {

        let status = server.emit('cmd', {
            _type : 'trigger:action',
            process_id  : processId,
            action_name : action
        });
        console.log('sendCommand: ' + processId + ' -> ' + action + ':' + status);
    }

});


action();