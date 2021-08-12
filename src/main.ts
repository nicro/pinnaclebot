import SpreadSheet from "./sheet/spreadsheet";
import Client from "./pinnacle/client";

const config = require('../config.json');

let ss = new SpreadSheet(config.google);
let client = new Client(config.pinnacle);

let synchronize = async () => {
    await client.get_dota_matches();
    client.matches[0].print_coefficients();
    //await ss.group(4, 6);
}

(async () => {
    await client.get_token();
    console.log(`x-session retrieved: ${client.auth.xsession}\n`);

    await ss.auth();
    console.log(`spreadsheet authorized`);

    await synchronize();
    //setInterval(synchronize, 60 * 1000); // 60 * 1000 milsec
})()