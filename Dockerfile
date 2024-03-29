FROM node:20.10.0-alpine

WORKDIR /web

# set timezone
RUN --mount=type=cache,target=/var/cache/apk,sharing=locked \
    apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    echo "Asia/Tokyo" > /etc/timezone

# install dependencies
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/ ./.yarn/
RUN --mount=type=cache,target=/var/cache/yarn \
    YARN_CACHE_FOLDER=/var/cache/yarn yarn --immutable

COPY . .

RUN yarn build:server

ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["yarn"]
CMD ["serve"]
