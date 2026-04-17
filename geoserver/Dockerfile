FROM docker.osgeo.org/geoserver:2.28.0

ENV SKIP_DEMO_DATA=true \
    ENABLE_JSONP=true \
    RUN_UNPRIVILEGED=true

# Copy your prepared GeoServer data directory into the image
COPY data/ /opt/geoserver_data/