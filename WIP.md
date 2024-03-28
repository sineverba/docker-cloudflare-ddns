+ Got Subdomain, new to do

1. create a create record utility
2. return the record

```js
const record = {
  content: ip,
  type: "A",
  name: process.env.SUBDOMAIN ? process.env.SUBDOMAIN : "@",
  proxied: process.env.PROXIED && process.env.PROXIED === "true" ? true : false,
};

if (typeof subdomain === "undefined") {
  /**
   * New subdomain, need to create it
   */
  const createdRecord = await createRecord(zoneId, record);
  if (createdRecord) {
    logger.info(
      "Create new record %s succeeded",
      process.env.SUBDOMAIN ? process.env.SUBDOMAIN : "root"
    );
  }
} else {
  if (app.isIpDifferent(ip, subdomain)) {
    logger.info("Updating record");
    logger.debug("%s", record);

    const updatedRecord = await updateRecord(zoneId, subdomain.id, record);
    if (updatedRecord) {
      logger.info("Update succeeded");
    }
  } else {
    logger.info("No update is required");
  }
}
```

and need to check for `if (typeof subdomain === "undefined") {`