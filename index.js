import App from "./src/App.js";

const app = new App();

function update() {
    app.browseZones()
        .then(zones => app.getZoneId(zones.result, process.env.ZONE))
        .then(zoneId => zoneId)
        .catch(err => {
            console.log(err)
        });
}