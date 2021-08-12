import axios from "axios";
import internal from "stream";
import AuthData from "./authdata";
import Coefficient from "./coefficient";

export default class Match {
    public url: string
    public auth: AuthData

    public id: number;
    public homeParticipant: string;
    public awayParticipant: string;

    public coefficients: Array<Coefficient> = [];

    constructor(url: string, auth: AuthData, 
        id: number, homeParticipant: string, awayParticipant: string) 
    {
        this.url = url;
        this.auth = auth;

        this.id = id;
        this.homeParticipant = homeParticipant;
        this.awayParticipant = awayParticipant;

        //console.log(this.id + " " + this.homeParticipant + " " + this.awayParticipant + "");
    }

    print_coefficients() {
        console.log(`Match ${this.homeParticipant} vs ${this.awayParticipant}: ${this.id}`)
        this.coefficients.forEach(coef => {
            console.log(`${coef.type_name()} - ${coef.map_name()}: 
            ${coef.homePoints} => ${coef.homePrice} 
            ${coef.awayPoints} => ${coef.awayPrice}`)
        });
    }

    get_coefficients() {
        return this.get_related()
        .then(() => this.get_related_straight());
    }

    get_related() {
        let params = {
            headers: {
                "x-api-key": this.auth.xapikey,
                "x-device-uuid": this.auth.xdeviceuuid,
                "x-session": this.auth.xsession
            }
        };

        return axios.get(this.url + `/matchups/${this.id}/related`, params)
        .then((res: any) => {
            //console.log(this.id + " " + res.data.length);
        })
        .catch(e => console.log(e.message));
    }

    get_related_straight() {
        let params = {
            headers: {
                "x-api-key": this.auth.xapikey,
                "x-device-uuid": this.auth.xdeviceuuid,
                "x-session": this.auth.xsession
            }
        };

        return axios.get(this.url + `/matchups/${this.id}/markets/related/straight`, params)
        .then((res: any) => { 
            res.data.forEach((element : any) => {
                this.coefficients.push(new Coefficient(
                    element["cutoffAt"],
                    element["type"],
                    element["period"],
                    element["prices"][0]["points"],
                    element["prices"][1]["points"],
                    element["prices"][0]["price"],
                    element["prices"][1]["price"]
                    )
                );
            });
        })
        .catch(e => console.log(e.message));
    }
}