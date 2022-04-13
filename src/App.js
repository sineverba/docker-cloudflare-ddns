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

    browseDNSRecords(id) {
        var cf = new Cloudflare({
            token: this.getToken()
        });

        return cf.dnsRecords.browse(id);
    }

    updateRecord(zoneId, subdomainId, record) {
        var cf = new Cloudflare({
            token: this.getToken()
        });

        return cf.dnsRecords.edit(zoneId, subdomainId, record);
    }

    createRecord(zoneId, record) {
        var cf = new Cloudflare({
            token: this.getToken()
        });

        return cf.dnsRecords.add(zoneId, record);
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
        const filteredZone = zones.filter(zone => zone.name === name);
        return filteredZone[0].id;
    }

    /**
     * Extract the subdomain from the dns record list
     */
    getSubdomain(dnsRecords, domain, subdomain) {

        /**
         * If subdomain is equale to domain, we are looking for
         * root zone.
         * Else, we concatenate
         */
        const filter = domain === subdomain ? domain : `${subdomain}.${domain}`;

        const filteredSubdomain = dnsRecords
            .filter(dns => dns.name === filter)
            .map(record => ({
                id: record.id,
                type: record.type,
                name: record.name,
                content: record.content
            }));
            
        return filteredSubdomain[0];
    }

    /**
     * Check if IP is different
     */
    isIpDifferent(ip, subdomain) {
        return ip.toString() !== subdomain.content.toString();
    }

}