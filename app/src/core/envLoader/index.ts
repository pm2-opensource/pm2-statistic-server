'use strict';

import * as fs from "fs";
import * as dotenv from "dotenv";


const pathCwd: string = <string>process.cwd()+'/.env';

/*Check to load env config file*/
if (fs.existsSync(pathCwd)) {
    let result = dotenv.config({path: pathCwd});

    if (result.error) {
        console.error('Can not parse env file:' + pathCwd);
        throw result.error;
    }
    console.log('Loading env file:' + pathCwd);
}
