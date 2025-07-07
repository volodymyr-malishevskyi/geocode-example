#!/bin/bash

docker start nominatim &> /dev/null || docker run -it \
  -e PBF_URL=https://download.geofabrik.de/europe/ukraine-latest.osm.pbf \
  -e REPLICATION_URL=https://download.geofabrik.de/europe/ukraine-updates/ \
  -p 8080:8080 \
  --name nominatim \
  mediagis/nominatim:5.1