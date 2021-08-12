import fs from "fs";
import axios from "axios";
import Client from "./modules/client"

let configRaw = fs.readFileSync('config.json');
let config = JSON.parse(configRaw as any as string);

var client = new Client(config);

(async () => {
    await client.get_token();
    console.log(`x-session retrieved: ${client.auth.xsession}\n`);
    await client.get_dota_matches();
    client.matches[0].print_coefficients();
})()

