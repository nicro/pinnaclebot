import Match from "./match";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class League {
    public id: number;
    public name: string;
    public http: AxiosInstance;
    public matches: Array<Match> = [];

    constructor(http: AxiosInstance, id: number, name: string)
    {
        this.http = http;
        this.id = id;
        this.name = name;
    }

    get_type()
    {
        if (this.name.startsWith("Dota 2"))
            return this.name.substring(9);
        if (this.name.startsWith("League of Legends"))
            return this.name.substring(20);
        if (this.name.startsWith("Valorant"))
            return this.name.substring(11);
        if (this.name.startsWith("CS:GO"))
            return this.name.substring(8);
        return "";
    }

    async get_all_matchups() 
    {
        let promises : any = [];
        this.matches.forEach(match => promises.push(match.get_matchups()));
        return Promise.allSettled(promises);
    }

    get_matches()
    {
        this.matches = [];
        return this.http.get(`/leagues/${this.id}/matchups`)
        .then(res => {
            res.data.forEach((d: any) => {
                this.matches.push(new Match(this.http, d.id, d.participants[0].name, d.participants[1].name));
            })
        });
    }
}