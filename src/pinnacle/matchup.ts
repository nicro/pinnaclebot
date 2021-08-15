import { beautiful_date } from "../utils";

export {
    Matchup,
    Coefficient
}

class Coefficient {
    public designation: string;
    public price: number;
    public points: number;

    constructor(designation: string, price: number, points: number)
    {
        this.designation = designation;
        this.price = this.to_n_digits(this.us_coefficient_to_eu(price), 3);
        this.points = points;
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

class Matchup {
    public timestamp: Date;
    public type: string;
    public period: number
    public coefficients: Array<Coefficient> = []


    constructor(timestamp: Date, type: string, period: number, coefs: Array<Coefficient>) 
    {
        this.timestamp = new Date(timestamp);
        this.type = type;
        this.period = period;
        this.coefficients = coefs;
    }

    map_name() : string {
        return this.period > 0 ? "map " + this.period : "main";
    }

    date_name() : string {
        return beautiful_date(this.timestamp);
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
}