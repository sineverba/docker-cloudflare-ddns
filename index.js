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

const ip = await getPublicIp();
logger.info("");
logger.info("=============================");
logger.info("");
logger.info("Got public IP");
logger.info("%s", ip);
logger.info("");
logger.info("=============================");
logger.info("");


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

if (app.isIpDifferent(ip, subdomain)) {
    const record = {
        content: ip,
        type: "A",
        name: process.env.SUBDOMAIN,
        proxied: process.env.PROXIED && process.env.PROXIED === "true" ? true : false
    };
    logger.info("");
    logger.info("=============================");
    logger.info("");
    logger.info("Updating record");
    logger.debug("%s", record);
    logger.info("");
    logger.info("=============================");
    logger.info("");

    const updatedRecord = await updateRecord(zoneId, subdomain.id, record);
    if (updateRecord) {
        logger.info("");
        logger.info("=============================");
        logger.info("");
        logger.info("Update succeeded");
        logger.info("");
        logger.info("=============================");
        logger.info("");
    }

} else {
    logger.info("");
    logger.info("=============================");
    logger.info("");
    logger.info("No update is required");
    logger.info("");
    logger.info("=============================");
    logger.info("");
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