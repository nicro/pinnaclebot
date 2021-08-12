const { GoogleSpreadsheet } = require('google-spreadsheet');

export default class SpreadSheet {
    public doc: any;
    private config: any;

    constructor(config: any)
    {
        this.config = config;
        this.doc = new GoogleSpreadsheet(this.config.spreadsheet_id);
    }

    async auth() {
        await this.doc.useServiceAccountAuth({
            client_email: this.config.client_email,
            private_key: this.config.private_key
        });
        await this.doc.loadInfo();
    }

    async test_request() {
        const sheet = this.doc.sheetsByIndex[0];
        console.log(`Title: ${sheet.title}`);
        await sheet.addRow({ 
            "Student Name": 'Larry Page', 
            "Gender": 'apache helicopter'
        });
    }

    async group(from: number, to: number) {
        let request = {
            addDimensionGroup: {
                range: {
                    dimension: "ROWS",
                    sheetId: 0,
                    startIndex: from,
                    endIndex: to
                }
            }
        };
        return this.doc.axios.post(":batchUpdate", { requests: [request] });
    }

}