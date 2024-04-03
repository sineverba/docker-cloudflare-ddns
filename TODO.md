+ Abilitare JUNIT Jenkins Jest XML per Semaphore
+ Aggiungere risposta KO

+ + Got Subdomain, new to do

2. return the record (riga 10 > 14, generato)
3. Use it >>>>>>>>>>>>>>>>>>> THIS!

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


/// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< siamo qui

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


+ Remove type from all records (only A is permitted)