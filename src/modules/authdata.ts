
export default class AuthData {
    public xapikey: string;
    public xdeviceuuid: string;
    public xsession: string = "";

    constructor(xapikey: string, xdeviceuuid: string) {
        this.xapikey = xapikey;
        this.xdeviceuuid = xdeviceuuid;
    }
}