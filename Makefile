.PHONY: up down build test

up:
	docker-compose up -d

down:
	docker-compose down -v

build:
	docker-compose build

test:
	npm test
