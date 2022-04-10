Docker CloudFlare DDNS
======================

> This Docker image will allow you to use the free [CloudFlare DNS Service](https://www.cloudflare.com/dns/) as a Dynamic DNS Provider ([DDNS](https://en.wikipedia.org/wiki/Dynamic_DNS)).

CREDITS: Forked from [https://github.com/oznu/docker-cloudflare-ddns](https://github.com/oznu/docker-cloudflare-ddns).

Available architectures:

+ linux/arm64/v8
+ linux/amd64
+ linux/arm/v6
+ linux/arm/v7

## Docker

Quick Setup:

__WORK IN PROGRESS_:

## Docker Compose

If you prefer to use [Docker Compose](https://docs.docker.com/compose/):

```yml
version: '3.8'
services:
  cloudflare-ddns:
    image: sineverba/cloudflare-ddns:0.1.0
    restart: always
    environment:
      - API_KEY=xxxxxxx
      - ZONE=example.com
      - SUBDOMAIN=subdomain
      - PROXIED=false
```


## Parameters

* `--restart=always` - ensure the container restarts automatically after host reboot.
* `-e API_KEY` - Your CloudFlare scoped API token. See the [Creating a Cloudflare API token](#creating-a-cloudflare-api-token) below. **Required**
* `-e ZONE` - The DNS zone that DDNS updates should be applied to. **Required**
* `-e SUBDOMAIN` - A subdomain of the `ZONE` to write DNS changes to. If this is not supplied the root zone will be used.
* `-e PROXIED` - Set to `true` to make traffic go through the CloudFlare CDN. Defaults to `false`.

## Creating a Cloudflare API token

To create a CloudFlare API token for your DNS zone go to https://dash.cloudflare.com/profile/api-tokens and follow these steps:

1. Click Create Token
2. Click on "custom"
3. Provide the token a name, for example, `cloudflare-ddns`
4. Grant the token the following permissions:
    * Zone - Zone Settings - Read
    * Zone - Zone - Read
    * Zone - DNS - Edit
5. Set the zone resources to:
    * Include - All zones
6. Complete the wizard and copy the generated token into the `API_KEY` variable for the container
