import App from "../App.js";

const zones = {
    "success": true,
    "errors": [],
    "messages": [],
    "result": [
        {
            "id": "023e105f4ecef8ad9ca31a8372d0c353",
            "name": "example.com",
            "development_mode": 7200,
            "original_name_servers": [
                "ns1.originaldnshost.com",
                "ns2.originaldnshost.com"
            ],
            "original_registrar": "GoDaddy",
            "original_dnshost": "NameCheap",
            "created_on": "2014-01-01T05:20:00.12345Z",
            "modified_on": "2014-01-01T05:20:00.12345Z",
            "activated_on": "2014-01-02T00:01:00.12345Z",
            "owner": {
                "id": {},
                "email": {},
                "type": "user"
            },
            "account": {
                "id": "01a7362d577a6c3019a474fd6f485823",
                "name": "Demo Account"
            },
            "permissions": [
                "#zone:read",
                "#zone:edit"
            ],
            "plan": {
                "id": "e592fd9519420ba7405e1307bff33214",
                "name": "Pro Plan",
                "price": 20,
                "currency": "USD",
                "frequency": "monthly",
                "legacy_id": "pro",
                "is_subscribed": true,
                "can_subscribe": true
            },
            "plan_pending": {
                "id": "e592fd9519420ba7405e1307bff33214",
                "name": "Pro Plan",
                "price": 20,
                "currency": "USD",
                "frequency": "monthly",
                "legacy_id": "pro",
                "is_subscribed": true,
                "can_subscribe": true
            },
            "status": "active",
            "paused": false,
            "type": "full",
            "name_servers": [
                "tony.ns.cloudflare.com",
                "woz.ns.cloudflare.com"
            ]
        },
        {
            "id": "thisistheidofexampleit",
            "name": "example.it",
            "development_mode": 7200,
            "original_name_servers": [
                "ns1.originaldnshost.com",
                "ns2.originaldnshost.com"
            ],
            "original_registrar": "GoDaddy",
            "original_dnshost": "NameCheap",
            "created_on": "2014-01-01T05:20:00.12345Z",
            "modified_on": "2014-01-01T05:20:00.12345Z",
            "activated_on": "2014-01-02T00:01:00.12345Z",
            "owner": {
                "id": {},
                "email": {},
                "type": "user"
            },
            "account": {
                "id": "01a7362d577a6c3019a474fd6f485823",
                "name": "Demo Account"
            },
            "permissions": [
                "#zone:read",
                "#zone:edit"
            ],
            "plan": {
                "id": "e592fd9519420ba7405e1307bff33214",
                "name": "Pro Plan",
                "price": 20,
                "currency": "USD",
                "frequency": "monthly",
                "legacy_id": "pro",
                "is_subscribed": true,
                "can_subscribe": true
            },
            "plan_pending": {
                "id": "e592fd9519420ba7405e1307bff33214",
                "name": "Pro Plan",
                "price": 20,
                "currency": "USD",
                "frequency": "monthly",
                "legacy_id": "pro",
                "is_subscribed": true,
                "can_subscribe": true
            },
            "status": "active",
            "paused": false,
            "type": "full",
            "name_servers": [
                "tony.ns.cloudflare.com",
                "woz.ns.cloudflare.com"
            ]
        },
        {
            "id": "anotheronebutfornet",
            "name": "example.net",
            "development_mode": 7200,
            "original_name_servers": [
                "ns1.originaldnshost.com",
                "ns2.originaldnshost.com"
            ],
            "original_registrar": "GoDaddy",
            "original_dnshost": "NameCheap",
            "created_on": "2014-01-01T05:20:00.12345Z",
            "modified_on": "2014-01-01T05:20:00.12345Z",
            "activated_on": "2014-01-02T00:01:00.12345Z",
            "owner": {
                "id": {},
                "email": {},
                "type": "user"
            },
            "account": {
                "id": "01a7362d577a6c3019a474fd6f485823",
                "name": "Demo Account"
            },
            "permissions": [
                "#zone:read",
                "#zone:edit"
            ],
            "plan": {
                "id": "e592fd9519420ba7405e1307bff33214",
                "name": "Pro Plan",
                "price": 20,
                "currency": "USD",
                "frequency": "monthly",
                "legacy_id": "pro",
                "is_subscribed": true,
                "can_subscribe": true
            },
            "plan_pending": {
                "id": "e592fd9519420ba7405e1307bff33214",
                "name": "Pro Plan",
                "price": 20,
                "currency": "USD",
                "frequency": "monthly",
                "legacy_id": "pro",
                "is_subscribed": true,
                "can_subscribe": true
            },
            "status": "active",
            "paused": false,
            "type": "full",
            "name_servers": [
                "tony.ns.cloudflare.com",
                "woz.ns.cloudflare.com"
            ]
        }
    ]
};

const dnsRecords = {
    "success": true,
    "errors": [],
    "messages": [],
    "result": [
        {
            "id": "372e67954025e0ba6aaa6d586b9e0b59",
            "type": "A",
            "name": "example.com",
            "content": "198.51.100.4",
            "proxiable": true,
            "proxied": false,
            "ttl": 3600,
            "locked": false,
            "zone_id": "023e105f4ecef8ad9ca31a8372d0c353",
            "zone_name": "example.com",
            "created_on": "2014-01-01T05:20:00.12345Z",
            "modified_on": "2014-01-01T05:20:00.12345Z",
            "data": {},
            "meta": {
                "auto_added": true,
                "source": "primary"
            }
        },
        {
            "id": "58787879487569e0b59",
            "type": "A",
            "name": "subdomain.example.com",
            "content": "192.168.1.1",
            "proxiable": true,
            "proxied": false,
            "ttl": 3600,
            "locked": false,
            "zone_id": "023e105f4ecef8ad9ca31a8372d0c353",
            "zone_name": "example.com",
            "created_on": "2014-01-01T05:20:00.12345Z",
            "modified_on": "2014-01-01T05:20:00.12345Z",
            "data": {},
            "meta": {
                "auto_added": true,
                "source": "primary"
            }
        }
    ]
};

describe('Test Cloudflare class support', () => {
    it('Test can get token from file .env', () => {
        const app = new App();
        expect(app.getToken()).toBe("abcde12345");
    });

    it('Test can extract id from zones list', () => {
        const app = new App();
        expect(app.getZoneId(zones.result, "example.com")).toBe("023e105f4ecef8ad9ca31a8372d0c353");
        expect(app.getZoneId(zones.result, "example.it")).toBe("thisistheidofexampleit");
        expect(app.getZoneId(zones.result, "example.net")).toBe("anotheronebutfornet");
    });

    it('Test can extract subdomain record from dns records list', () => {
        const app = new App();
        const expectedSubDomain = {
            "id": "58787879487569e0b59",
            "type": "A",
            "name": "subdomain.example.com",
            "content": "192.168.1.1",
        };
        expect(app.getSubdomain(dnsRecords.result, "example.com", "subdomain")).toStrictEqual(expectedSubDomain);
    });

    it('Test can return true if public ip is different from IP stored in cloudflare', () => {
        const app = new App();
        const subdomain = {
            "id": "58787879487569e0b59",
            "type": "A",
            "name": "subdomain.example.com",
            "content": "192.168.1.1",
        };
        expect(app.isIpDifferent("10.20.30.40", subdomain)).toBeTruthy();
    });

    it('Test can return false if public ip is NOT different from IP stored in cloudflare', () => {
        const app = new App();
        const subdomain = {
            "id": "58787879487569e0b59",
            "type": "A",
            "name": "subdomain.example.com",
            "content": "192.168.1.1",
        };
        expect(app.isIpDifferent("192.168.1.1", subdomain)).toBeFalsy();
    });


});