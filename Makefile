all:
	@echo "Available commands are:"
	@echo "- build_and_start_app - Builds dockernodewebapp image and starts node-web-app docker cluster"
	@echo "- start_app - Starts node-web-app docker cluster"
	@echo "- stop_app - Stops node-web-app docker cluster"
	@echo "- remove_app - Removes node-web-app docker cluster"
	@echo "- create_db - Create _liferafttest db"
	@echo "- run_migrations - Apply MySQL migrations"

build_and_start_app:
	docker-compose up -d --build

start_app:
	docker-compose up

stop_app:
	docker-compose stop

remove_app:
	docker-compose down

create_db:
	mysql -u root -p root CREATE DATABASE _liferafttest

run_migrations:
	docker-compose exec --workdir . npm run migrate
	docker-compose exec --workdir . npm run seed
	#docker-compose exec --workdir /usr/node-web-app/package.json npm run migrate
	#docker-compose exec --workdir /usr/node-web-app/package.json npm run seed
