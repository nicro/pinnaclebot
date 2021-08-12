
export default class Coefficient {
    public timestamp: Date;
    public type: string;
    public homePoints: number;
    public awayPoints: number;
    public homePrice: number;
    public awayPrice: number;


    constructor(timestamp: Date, type: string, 
        homePoints: number, awayPoints: number, homePrice: number, awayPrice: number) 
    {
        this.timestamp = timestamp;
        this.type = type;
        this.homePoints = homePoints ? homePoints : 0;
        this.awayPoints = awayPoints ? awayPoints : 0;
        this.homePrice = this.to_n_digits(this.us_coefficient_to_eu(homePrice), 3);
        this.awayPrice = this.to_n_digits(this.us_coefficient_to_eu(awayPrice), 3);
    }

    to_n_digits(number: number, cnt: number) : number {
        return Number(number.toFixed(cnt));
    }

    us_coefficient_to_eu(us: number) : number {
        // https://go-sport.ru/knowledge/betting_odds/
        if (us > 0)
            return us / 100.0 + 1.0;
        else
            return 100 / -us + 1.0;
    }
}