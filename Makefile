include .env

IMAGE_NAME=sineverba/cloudflare-ddns
CONTAINER_NAME=cloudflare-ddns
APP_VERSION=0.3.0

sonar:
	docker-compose up sonarscanner

upgrade:
	npx ncu -u
	npm install
	npm audit fix

build:
	docker build --tag $(IMAGE_NAME):$(APP_VERSION) --tag $(IMAGE_NAME):latest .

test:
	docker run -it --rm --entrypoint cat --name $(CONTAINER_NAME) $(IMAGE_NAME):$(APP_VERSION) /etc/os-release | grep "Alpine Linux v3.15"
	docker run -it --rm --name $(CONTAINER_NAME) $(IMAGE_NAME):$(APP_VERSION) -v | grep "v16.14.2"

spin:
	docker run -it --rm --name $(CONTAINER_NAME) \
	-e CF_TOKEN=${CF_TOKEN} \
	-e ZONE=${ZONE} \
	-e SUBDOMAIN=${SUBDOMAIN} \
	-e PROXIED=${PROXIED} \
	$(IMAGE_NAME):$(APP_VERSION)

detached:
	docker run -d --name $(CONTAINER_NAME) \
	-e CF_TOKEN=${CF_TOKEN} \
	-e ZONE=${ZONE} \
	-e SUBDOMAIN=${SUBDOMAIN} \
	-e PROXIED=${PROXIED} \
	$(IMAGE_NAME):$(APP_VERSION)

logs:
	docker container logs -f $(CONTAINER_NAME)

stop:
	docker container stop $(CONTAINER_NAME)
	docker container rm $(CONTAINER_NAME)

destroy:
	docker image rm $(IMAGE_NAME):$(APP_VERSION) $(IMAGE_NAME):latest