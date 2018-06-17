/**
 * Copyright 2013 the PM2 project authors. All rights reserved.
 * Use of this source code is governed by a license that
 * can be found in the LICENSE file.
 *
 * Porter to TS by Wir_Wolf
 *
 */

import * as crypto from 'crypto'

const CIPHER_ALGORITHM = 'aes256';

//var Cipher = module.exports = {};


export default class Cipher {
    public static decipherMessage(msg:string, key:string):any {
        let ret = {};

        try {
            let decipher = crypto.createDecipher(CIPHER_ALGORITHM, key);
            let decipheredMessage = decipher.update(msg, 'hex', 'utf8');
            decipheredMessage += decipher.final('utf8');
            ret = JSON.parse(decipheredMessage);
        } catch(e) {
            return null;
        }

        return ret;
    }

    public static cipherMessage(data, key):string|null {
        try {
            let cipher       = crypto.createCipher(CIPHER_ALGORITHM, key);
            let cipheredData = cipher.update(data, 'utf8', 'hex');
            cipheredData += cipher.final('hex');
            return cipheredData;
        } catch(e) {
            return null;
        }
    }

}
