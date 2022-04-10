import * as http from 'http';
import App from "./src/App.js";

const app = new App();

const ip = await getPublicIp();
console.log(ip);
//update();


async function getPublicIp() {
    return new Promise((resolve, reject) => {
        http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, response => {
            response.on('data', data => {
                resolve(data.toString());
            })
        })
    });
}

function update() {
    app.browseZones()
        .then(zones => app.getZoneId(zones.result, process.env.ZONE))
        .then(zoneId => console.log(zoneId))
        .catch(err => {
            console.log(err)
        });
}