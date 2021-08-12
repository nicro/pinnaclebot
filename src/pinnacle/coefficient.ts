
export default class Coefficient { // in api: matchup
    public timestamp: Date;
    public type: string;
    public homePoints: number;
    public awayPoints: number;
    public homePrice: number;
    public awayPrice: number;
    public period: number


    constructor(timestamp: Date, type: string, period: number,
        homePoints: number, awayPoints: number, homePrice: number, awayPrice: number) 
    {
        this.timestamp = timestamp;
        this.type = type;
        this.period = period;
        this.homePoints = homePoints ? homePoints : 0;
        this.awayPoints = awayPoints ? awayPoints : 0;
        this.homePrice = this.to_n_digits(this.us_coefficient_to_eu(homePrice), 3);
        this.awayPrice = this.to_n_digits(this.us_coefficient_to_eu(awayPrice), 3);
    }

    to_n_digits(number: number, cnt: number) : number {
        return Number(number.toFixed(cnt));
    }

    map_name() : string {
        return this.period > 0 ? "map " + this.period : "main";
    }
    type_name() : string {
        if (this.type === "moneyline")
            return "Money Line";
        if (this.type === "spread")
            return "Handicap";
        if (this.type === "total")
            return "Total";
        if (this.type === "team_total")
            return "Team Total";
        return `[! Unknown type: ${this.type} !]`;
    }

    us_coefficient_to_eu(us: number) : number {
        // https://go-sport.ru/knowledge/betting_odds/
        if (us > 0)
            return us / 100.0 + 1.0;
        else
            return 100 / -us + 1.0;
    }
}