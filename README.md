# shop

CREATE EXTENSION pg_trgm; 

docker-compose run --rm api python manage.py migrate

manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission --indent 4 > db.json
psql -h localhost -p 5432 -d stroylux -U stroylux --password