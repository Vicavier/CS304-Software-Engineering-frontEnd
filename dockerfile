FROM mhart/alpine-node:9

WORKDIR /app
COPY . /app

RUN rm -f package-lock.json \
    ; rm -rf .idea \
    ; rm -rf node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm config set unsafe-perm true && npm install

RUN npm install pm2 -g

EXPOSE 3000
CMD ["pm2-runtime", "start", "app.js", "-n", "uni-docker"]
