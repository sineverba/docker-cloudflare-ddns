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
    level: process.env.LOG_LEVEL || "debug",
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
        utilFormatter(),
        winston.format.colorize(),
        winston.format.printf(({level, message, label, timestamp}) => `\n==========\n${timestamp} ${label || '-'} ${level}: ${message}\n==========\n`)
      ),
      transports: [
        new winston.transports.Stream({
          stream: process.stderr,
          level: process.env.LOG_LEVEL || "debug",
        })
      ],
});

const app = new App();

const ip = await getPublicIp();
logger.info("Got public IP: %s", ip);

const zoneId = await getZoneId();
logger.debug("Got zone ID: %s", zoneId);

const subdomain = await getSubdomain(zoneId);
logger.debug("Got subdomain: %s", subdomain);

if (app.isIpDifferent(ip, subdomain)) {
    const record = {
        content: ip,
        type: "A",
        name: process.env.SUBDOMAIN,
        proxied: process.env.PROXIED && process.env.PROXIED === "true" ? true : false
    };
    logger.info("Updating record");
    logger.debug("%s", record);

    const updatedRecord = await updateRecord(zoneId, subdomain.id, record);
    if (updateRecord) {
        logger.info("Update succeeded");
    }

} else {
    logger.info("No update is required");
}


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

async function updateRecord(zoneId, subdomainId, record) {
    return new Promise((resolve, reject) => {
        app.updateRecord(zoneId, subdomainId, record)
        .then(result => resolve(result.success));
    });
}