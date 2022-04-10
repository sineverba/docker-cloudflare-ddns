import * as http from 'http';
import App from "./src/App.js";

const app = new App();

const ip = await getPublicIp();
console.log("===> Got current public ip as ===>", ip);

const zoneId = await getZoneId();
console.log("===> Got zone id as ===>", zoneId);
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

async function getZoneId() {
    return new Promise((resolve, reject) => {
        app.browseZones()
        .then(zones => app.getZoneId(zones.result, process.env.ZONE))
        .then(zoneId => resolve(zoneId))
        .catch(err => {
            console.log(err)
        });
    });
}