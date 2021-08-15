import axios, { AxiosInstance } from "axios";
import Match from "./match";
import League from "./league";
import { beautiful_date, startsWithOneOf } from "../utils";

export default class Client {
    public http: AxiosInstance;
    public config: any;
    public leagues: Array<League> = [];

    constructor(config: any) {
        this.config = config;
        this.http = axios.create({
            baseURL: this.config.url
        });
    }

    auth() {
        let params = {
            headers: {
                "x-api-key": this.config.xapikey,
                "x-device-uuid": this.config.xdeviceuuid
            }
        }

        let postData = {
            "username": this.config.username,
            "password": this.config.password,
            "trustCode": this.config.trustcode
        };

        return this.http.post("/sessions", postData, params)
        .then((res : any) => {
            this.http.defaults.timeout = 1000;
            this.http.defaults.headers = {
                "x-api-key": this.config.xapikey,
                "x-device-uuid": this.config.xdeviceuuid,
                "x-session": res.data.token,
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            };
            console.log(`Session for user ${res.data.username} found, created at ${beautiful_date(new Date(res.data.createdAt))}`);
            console.log("Session-id: " + res.data.token);
        })
        .catch((error : Error) => { console.log(error) });
    }

    get_all_leagues(id: number = 12, ...filters: string[]) {
        this.leagues = [];
        return this.http.get(`/sports/${id}/leagues?all=false`)
        .then(res => {
            res.data.forEach((l : any) => {
                    if (startsWithOneOf(l.name, filters)) {
                        this.leagues.push(new League(this.http, l.id, l.name));
                    }
                });
        })
        .catch(console.log);
    }

    async get_all_matches()
    {
        let promises : any = [];
        this.leagues.forEach((league : League) => promises.push(league.get_matches()));
        return Promise.allSettled(promises);
    }

    async print_single_match_coefficients(id: number) 
    {
        let match = new Match(this.http, id, "team1", "team2");
        await match.get_matchups();
        match.print_coefficients();
    }

};