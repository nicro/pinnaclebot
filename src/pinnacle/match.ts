import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Matchup, Coefficient } from "./matchup";

export default class Match {
    public http: AxiosInstance
    public id: number;
    public homeParticipant: string;
    public awayParticipant: string;
    public matchups: Array<Matchup> = [];

    constructor(http: AxiosInstance, 
        id: number, homeParticipant: string, awayParticipant: string) 
    {
        this.http = http;
        this.id = id;
        this.homeParticipant = homeParticipant;
        this.awayParticipant = awayParticipant;
    }

    print_coefficients() 
    {
        console.log(`Match ${this.id}: `);
        this.matchups.forEach((mu: Matchup) => {
            mu.coefficients.forEach((coef: Coefficient) => {
                console.log(`[${mu.map_name()} - ${mu.type_name()}] ${coef.designation || ""} ${coef.points || ""}: ${coef.price || ""}`);
            })            
        });
    }

    get_matchups() {
        return this.http.get(`/matchups/${this.id}/markets/related/straight`)
        .then((res: AxiosResponse<any>) => {
            res.data.forEach((element : any) => {
                let coefs: Array<Coefficient> = [];
                element.prices.forEach((price : any) => {
                    coefs.push(new Coefficient(price.designation, price.price, price.points));
                });
                this.matchups.push(new Matchup(element.cutoffAt, element.type, element.period, coefs));
            });
        })
    }
}