include .env

IMAGE_NAME=sineverba/cloudflare-ddns
CONTAINER_NAME=cloudflare-ddns
APP_VERSION=1.6.0-dev
NODE_VERSION=20.11.0
NPM_VERSION=10.4.0
SONARSCANNER_VERSION=5.0.1
BUILDX_VERSION=0.12.1

sonar:
	docker run --rm -it \
		--name sonarscanner \
		-v $(PWD):/usr/src \
		-e SONAR_HOST_URL=$(SONAR_HOST_URL) \
		-e SONAR_TOKEN=$(SONAR_TOKEN) \
		sonarsource/sonar-scanner-cli:$(SONARSCANNER_VERSION)

fixnodesass:
	npm rebuild node-sass

upgrade:
	npx ncu -u -x dotenv-flow -x msw
	npx update-browserslist-db@latest
	npm install
	npm audit fix

preparemulti:
	mkdir -vp ~/.docker/cli-plugins
	curl \
		-L \
		"https://github.com/docker/buildx/releases/download/v$(BUILDX_VERSION)/buildx-v$(BUILDX_VERSION).linux-amd64" \
		> \
		~/.docker/cli-plugins/docker-buildx
	chmod a+x ~/.docker/cli-plugins/docker-buildx
	docker buildx version
	docker buildx ls
	docker buildx create --name multiarch --use
	docker buildx inspect --bootstrap --builder multiarch

build:
	docker build \
		--build-arg NODE_VERSION=$(NODE_VERSION) \
		--build-arg NPM_VERSION=$(NPM_VERSION) \
		--tag $(IMAGE_NAME):$(APP_VERSION) \
		--file dockerfiles/production/build/docker/Dockerfile \
		"."

multi:
	docker buildx build \
		--build-arg NODE_VERSION=$(NODE_VERSION) \
		--build-arg NPM_VERSION=$(NPM_VERSION) \
		--platform linux/arm64/v8,linux/amd64,linux/arm/v6,linux/arm/v7 \
		--tag $(IMAGE_NAME):$(APP_VERSION) \
		--file dockerfiles/production/build/docker/Dockerfile \
		--push \
		"."

test:
	docker run -it --rm --entrypoint cat --name $(CONTAINER_NAME) $(IMAGE_NAME):$(APP_VERSION) /etc/os-release | grep "Alpine Linux v3.19"
	docker run -it --rm --entrypoint npm --name $(CONTAINER_NAME) $(IMAGE_NAME):$(APP_VERSION) -v | grep $(NPM_VERSION)
	docker run -it --rm --name $(CONTAINER_NAME) $(IMAGE_NAME):$(APP_VERSION) -v | grep v$(NODE_VERSION)

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
	docker image rm node:20.11.0-alpine3.19
	docker image rm $(IMAGE_NAME):$(APP_VERSION)