import 'dotenv-flow/config.js';
import Cloudflare from 'cloudflare/index.js';

export default class App {

    constructor() {
        this.token = process.env.CF_TOKEN;
    }

    getToken() {
        return this.token;
    }

    browseZones() {

        var cf = new Cloudflare({
            token: this.getToken()
        });

        // Return the promise itself
        return cf.zones.browse();
    }

    /**
     * 
     * Extract the id for the zone of interest
     * 
     * @param {*} zones 
     * @param {*} name 
     * @returns 
     */
    getZoneId(zones, name) {
        const zone = zones.filter(zone => zone.name === name);
        return zone[0].id;
    }

}