#!/usr/bin/env bash

cd "$(dirname $0)"
CMD="$1"

case "$CMD" in
  "init")
    cat "$(pwd)"/../sql/testData.sql | docker exec -i -e MYSQL_PWD=password songs-db mysql --default-character-set=utf8 --host=127.0.0.1 --database=songsdb --user=user
    ;;
   "clear")
    cat "$(pwd)"/../sql/clearData.sql | docker exec -i -e MYSQL_PWD=password songs-db mysql --default-character-set=utf8 --host=127.0.0.1 --database=songsdb --user=user
    ;;
  "start")
    docker-compose -f ./docker/docker-compose.yml up -d
    ;;
  "stop")
    docker-compose -f ./docker/docker-compose.yml down
    ;;
  "clean")
    docker-compose -f ./docker/docker-compose.yml down && rm -rf ./docker/.docker
    ;;
  *)
    >&2 echo "usage $0 start |  stop | clean | init | clear "
    ;;
esac