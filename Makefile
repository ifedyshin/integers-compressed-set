.PHONY: all

SHELL=bash
NODE_IMAGE=node:22.20.0-bookworm-slim
NODE_CONTAINER_WORKDIR=/home/node/app
CONTAINER_USER=node
DOCKER_RUN_NODE=docker run -it \
	--rm \
	-v ${PWD}:$(NODE_CONTAINER_WORKDIR) \
	-w="$(NODE_CONTAINER_WORKDIR)" \
	-u "$(CONTAINER_USER)"

all: help

help: ## Display this help screen.
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

npm: ## Up nodejs container (debugging).
	$(DOCKER_RUN_NODE) \
	$(NODE_IMAGE) \
	$(SHELL)

tests: ## Run tests in nodejs container.
	$(DOCKER_RUN_NODE) \
	$(NODE_IMAGE) \
	$(SHELL) -c "yarn test"

format: ## Run code formatting in nodejs container.
	$(DOCKER_RUN_NODE) \
	$(NODE_IMAGE) \
	$(SHELL) -c "yarn install && yarn format"
