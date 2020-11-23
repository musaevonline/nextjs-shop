#!/bin/bash

container=shop_api

docker exec ${container} python3 manage.py generate_sitemap

echo "Sitemap generated successful"