'use strict';

//import * as conf from "@config/app";
import * as fs from "fs";

const pathCwd: string = <string>process.cwd()+'/.env';

/*Check to load env config file*/
if (fs.existsSync(pathCwd)) {
    let result = require('dotenv').config({path: pathCwd});

    if (result.error) {
        console.error('Can not parse env file:' + pathCwd);
        throw result.error;
    }
    console.log('Loading env file:' + pathCwd);
}

//console.log('Hello '+ conf.base.id +' v'+conf.base.version);
console.log('Env: '+ process.env.APP_ENV);
