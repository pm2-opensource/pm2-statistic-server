import *  as env from '@core/envLoader';
import *  as Koa from 'koa'
import *  as json from 'koa-json'
import *  as bodyParser from 'koa-bodyparser';
import *  as Router  from 'koa-router';
import Chiper  from '@libs/Cipher';


const app = new Koa();
const router = new Router();

router.all('/api/node/verifyPM2', (ctx, next) => {
    let  message = Chiper.decipherMessage(ctx.request.body.data, 'k0yplh1i3hgimfs');
    console.log('-----------------------------');
    console.dir(message);
    console.log('-----------------------------');
    ctx.body = {
        "endpoints": {
            "web": "http://localhost:80/socket.io/",
            "reverse": "http://localhost:3000/socket.io/",
            "push": "http://localhost:3000/socket.io/"
        },
        "new": false,
        "active": true,
        "pending": false,
        "disabled": false,
        "name": "local"
    };
    next();
});

app
    .use(json())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(function (ctx) {
        console.log('Request:' + ctx.url);
        console.log('Raw body:' + ctx.request.rawBody);
    });

app.listen(2000, 'localhost', () => {
    console.log('Start  listen server on port 2000');
});