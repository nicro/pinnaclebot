import SpreadSheet from "./sheet/spreadsheet";
import Client from "./pinnacle/client";

const config = require('../config.json');

//let ss = new SpreadSheet(config.google);
let client = new Client(config.pinnacle);

(async () => {
    await client.auth();
    await client.get_all_leagues(12, "CS:GO", "League of Legends", "Valorant", "Dota 2");
    await client.get_all_matches();
    console.log("matches fetched");
    await client.leagues[1].get_all_matchups();
    console.log("matchups fetched");
})()