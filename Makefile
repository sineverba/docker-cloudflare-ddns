include .env

IMAGE_NAME=sineverba/cloudflare-ddns
CONTAINER_NAME=cloudflare-ddns
APP_VERSION=0.1.0

build:
	docker build --tag $(IMAGE_NAME):$(APP_VERSION) --tag $(IMAGE_NAME):latest .

spin:
	docker run --name cloudflare-ddns --rm -e API_KEY=${CF_TOKEN} -e ZONE=${ZONE} -e SUBDOMAIN=subdomain -e PROXIED=${PROXIED} $(IMAGE_NAME):$(APP_VERSION)

destroy:
	docker image rm $(IMAGE_NAME):$(APP_VERSION) $(IMAGE_NAME):latest