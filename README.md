## Requirements
1. [Docker](https://docs.docker.com/install/)
2. [Docker Compose](https://docs.docker.com/compose/install/)

## How to run it?

1. Clone the repository:

```
$ git clone https://github.com/vladkoblynsky/shop.git
```

2. We are using shared folders to enable live code reloading. Without this, Docker Compose will not start:
    - Windows/MacOS: Add the cloned `shop` directory to Docker shared directories (Preferences -> Resources -> File sharing).
    - Windows/MacOS: Make sure that in Docker preferences you have dedicated at least 5 GB of memory (Preferences -> Resources -> Advanced).
    - Linux: No action required, sharing already enabled and memory for Docker engine is not limited.

3. Go to the cloned directory:
```
$ cd shop
```

4. Build the application:
```
$ docker-compose build
```

5. Apply Django migrations:
```
$ docker-compose run --rm api python3 manage.py migrate
```

6. Collect static files:
```
$ docker-compose run --rm api python3 manage.py collectstatic --noinput
```

7. Populate the database with example data and create the admin user:
```
$ docker-compose run --rm api python3 manage.py populatedb --createsuperuser
```
*Note that `--createsuperuser` argument creates an admin account for `admin@example.com` with the password set to `admin`.*
```
8. Create extension:
  CREATE EXTENSION pg_trgm; 
```
9. Run the application:
```
$ docker-compose up
```

Dump DB: manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission --indent 4 > db.json
psql -h localhost -p 5432 -d DB_NAME -U USER_NAME --password
