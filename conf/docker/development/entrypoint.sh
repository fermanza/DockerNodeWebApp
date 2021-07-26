#!/bin/bash

(cd /usr/node-web-app && npm install)

sleep 5
npm run migrate
npm run seed

exec "$@"
