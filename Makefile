
DOCKER_COMPOSE_PATH=.dev/docker-compose.yml
WP_ROOT ?= /var/www/html/

default: start

build:
	docker compose -f ${DOCKER_COMPOSE_PATH} build $(c)
build-no-cache:
	docker compose -f ${DOCKER_COMPOSE_PATH} build --no-cache $(c)
start:
	docker compose -f ${DOCKER_COMPOSE_PATH} up -d $(c)
stop:
	docker compose -f ${DOCKER_COMPOSE_PATH} stop $(c)
down:
	docker compose -f ${DOCKER_COMPOSE_PATH} down $(c)
restart:
	docker compose -f ${DOCKER_COMPOSE_PATH} stop $(c)
	docker compose -f ${DOCKER_COMPOSE_PATH} up -d $(c)
logs:
	docker logs $$(docker ps -q -f name=dev-wordpress)
shell:
	docker exec -it $$(docker ps -q -f name=dev-wordpress) bash
ps:
	docker compose -f ${DOCKER_COMPOSE_PATH} ps
wp:
	docker exec $$(docker ps -q -f name=dev-wordpress) wp --allow-root --path=$(WP_ROOT) $(filter-out $@,$(MAKECMDGOALS)) $(c)
ssh-prod:
	ssh u797-r4ywtebqzvjc@hansenleadershipinstitute.org -p18765
mysql-prod:
	mysql -u usnlzkoe0w1yj -pxxmycfn8k2uw -h hansenleadershipinstitute.org
download-db-prod:
	ssh u797-r4ywtebqzvjc@hansenleadershipinstitute.org -p18765 'mysqldump -u usnlzkoe0w1yj -pxxmycfn8k2uw dbypbgg3ype72h | gzip -3 -c' > .dev/mysql-dump/prod-db.sql.gz
sync-file-prod-to-local:
	rsync -rvhP -e 'ssh -p 18765' --exclude 'updraft*' u797-r4ywtebqzvjc@hansenleadershipinstitute.org:www/hansenleadershipinstitute.org/public_html/wp-content .
