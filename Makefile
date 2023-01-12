include .env

IMAGE_NAME=sineverba/cloudflare-ddns
CONTAINER_NAME=cloudflare-ddns
APP_VERSION=1.2.0-dev
SONARSCANNER_VERSION=4.8.0
BUILDX_VERSION=0.10.0
BINFMT_VERSION=qemu-v7.0.0-28

sonar:
	docker run --rm -it \
		--name sonarscanner \
		-v $(PWD):/usr/src \
		-e SONAR_HOST_URL=$(SONAR_HOST_URL) \
		-e SONAR_LOGIN=$(SONAR_LOGIN) \
		sonarsource/sonar-scanner-cli:$(SONARSCANNER_VERSION)

fixnodesass:
	npm rebuild node-sass

upgrade:
	npx ncu -u
	npx browserslist@latest --update-db
	npm install
	npm audit fix

preparemulti:
	mkdir -vp ~/.docker/cli-plugins
	curl -L "https://github.com/docker/buildx/releases/download/v$(BUILDX_VERSION)/buildx-v$(BUILDX_VERSION).linux-amd64" > ~/.docker/cli-plugins/docker-buildx
	chmod a+x ~/.docker/cli-plugins/docker-buildx
	docker buildx version
	docker run --rm --privileged tonistiigi/binfmt:$(BINFMT_VERSION) --install all
	docker buildx ls
	docker buildx rm multiarch
	docker buildx create --name multiarch --driver docker-container --use
	docker buildx inspect --bootstrap --builder multiarch

build:
	docker build --tag $(IMAGE_NAME):$(APP_VERSION) .

multi:
	docker buildx build --platform linux/arm64/v8,linux/amd64,linux/arm/v6,linux/arm/v7 \
		--tag $(IMAGE_NAME):$(APP_VERSION) --tag $(IMAGE_NAME):latest .

test:
	docker run -it --rm --entrypoint cat --name $(CONTAINER_NAME) $(IMAGE_NAME):$(APP_VERSION) /etc/os-release | grep "Alpine Linux v3.17"
	docker run -it --rm --name $(CONTAINER_NAME) $(IMAGE_NAME):$(APP_VERSION) -v | grep "v18.13.0"

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
	docker image rm $(IMAGE_NAME):$(APP_VERSION)