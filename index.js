import App from "./src/App.js";

const app = new App();

update();

function update() {
    app.browseZones()
        .then(zones => app.getZoneId(zones.result, process.env.ZONE))
        .then(zoneId => console.log(zoneId))
        .catch(err => {
            console.log(err)
        });
}