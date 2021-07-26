FROM node:lts

# Set work directory
WORKDIR /usr

COPY ../node-web-app .

# Set entrypoint script
COPY conf/docker/development/entrypoint.sh /usr/local/bin/
RUN chmod u+x,g+x /usr/local/bin/entrypoint.sh\
  && ln -s /usr/local/bin/entrypoint.sh /

# run entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
