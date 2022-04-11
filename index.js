import * as http from 'http';
import App from "./src/App.js";
import * as winston from "winston";
import * as util from "util";

function transform(info, opts) {
    const args = info[Symbol.for('splat')];
    if (args) { info.message = util.format(info.message, ...args); }
    return info;
  }
  
function utilFormatter() { return {transform}; }

const logger = winston.createLogger({
    level: process.env.DEBUG_LEVEL || "info",
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
        utilFormatter(),
        winston.format.colorize(),
        winston.format.printf(({level, message, label, timestamp}) => `${timestamp} ${label || '-'} ${level}: ${message}`),
      ),
      transports: [
        new winston.transports.Stream({
          stream: process.stderr,
          level: process.env.DEBUG_LEVEL || "info",
        })
      ],
});

const app = new App();

//const ip = await getPublicIp();
//logger.info("Got public IP as %s", ip);

const zoneId = await getZoneId();
logger.debug("");
logger.debug("=============================");
logger.debug("");
logger.debug("Got zone ID");
logger.debug("%s", zoneId);
logger.debug("");
logger.debug("=============================");
logger.debug("");

const subdomain = await getSubdomain(zoneId);
logger.debug("");
logger.debug("=============================");
logger.debug("");
logger.debug("Got subdomain");
logger.debug("%s", subdomain);
logger.debug("");
logger.debug("=============================");
logger.debug("");


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

async function getSubdomain(zoneId) {
    return new Promise((resolve, reject) => {
        app.browseDNSRecords(zoneId)
        .then(dnsRecords => app.getSubdomain(dnsRecords.result, process.env.ZONE, process.env.SUBDOMAIN))
        .then(subdomain => resolve(subdomain));
    });
}