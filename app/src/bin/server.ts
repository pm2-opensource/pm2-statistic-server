import ActionsPm2 from '@core/const/actions-pm2'

let axon = require('axon');
let sock = axon.socket('sub');
let nssocket = require('nssocket');


sock.on('message', function(msg){
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




let server = nssocket.createServer(function(_socket) {

    console.log('Got new connection [REVERSE INTERACTOR]');

    server.on('cmd', function(data) {
        if(_socket.connected) {
            console.log('Sending command %j', data);
            _socket.send(data._type, data);
        } else {
            console.log('Not found socket');
        }

    });
});

server.on('error', function(e) {
    console.error('Disconected!');
    console.error(e);
});
//server.once('trigger:action:success', success);

server.once('trigger:action:success', function(e) {
    console.error('trigger:action:success!');
    console.error(e);
});


server.on('listening', function() {
    console.log('Listening start on:4322');
    //action(null, server);
});


function action() {
    setInterval(function () {
        //console.log('!');
        //"logrotate"
        sendPM2Command("logrotate", ActionsPm2.ACTION_PM2_RESTART)


        /*_server.emit('cmd', {
            _type : 'trigger:action',
            process_id : 0,
            action_name : 'ping'
        });*/
    }, 5000);

}

function sendPM2Command(name, action, parameters = {}) {
    server.emit('cmd', {
        _type : 'trigger:pm2:action',
        parameters  : {"name": name},
        method_name : action
    });
}


function sendCommand(processId, action, parameters = {}) {
    server.emit('cmd', {
        _type : 'trigger:action',
        process_id  : processId,
        action_name : action
    });
}


//monitor.


server.listen(4322);
sock.bind(8080);
