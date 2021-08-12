import axios from "axios";
import Match from "./match";
import AuthData from "./authdata"
import { StringLiteralLike } from "typescript";

export default class Client {
    public auth: AuthData;
    public password: string;
    public username: string;
    public trustcode: string;
    public url: string;

    public matches: Array<Match> = [];

    constructor(config: any) {
        this.auth = new AuthData(config.xapikey, config.xdeviceuuid);
        this.password = config.password;
        this.username = config.username;
        this.password = config.password;
        this.trustcode = config.trustcode;
        this.url = config.url;
    }

    get_token() {
        let postData = {
            "username": this.username,
            "password": this.password,
            "captchaToken": "",
            "trustCode": this.trustcode
        };
        
        let params = {
            headers: {
                "x-api-key": this.auth.xapikey,
                "x-device-uuid": this.auth.xdeviceuuid
            }
        };

        return axios.post(this.url + "/sessions", postData, params)
        .then((res : any) => { this.auth.xsession = res.data.token })
        .catch((error : Error) => { return error.name });
    }

    get_dota_matches() {
        this.matches = [];

        let params = {
            headers: {
                "x-api-key": this.auth.xapikey,
                "x-device-uuid": this.auth.xdeviceuuid,
                "x-session": this.auth.xsession
            }
        };

        return axios.get(this.url + "/sports/12/matchups?withSpecials=false", params)
        .then(async (res : any) => { 
            for (let i = 0; i < Math.min(res.data.length, 10); i++)
            {
                var match = new Match(
                    this.url, this.auth,
                    res.data[i].id,
                    res.data[i].participants[0].name,
                    res.data[i].participants[1].name);
                this.matches.push(match);
                //console.log(res.data[i]);
                await match.get_coefficients();
            }
            //this.matches.forEach(el => el.coefficients.forEach(console.log));
         })
        .catch((error : Error) => { return error.name });
    }

    print_single_match_coefficients(id: number) {
            let m = new Match(this.url, this.auth, id, "team1", "team2");
            m.get_coefficients().then(() => m.print_coefficients());
    }

};