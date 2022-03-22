FROM node:14 AS builder
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY . .
COPY tsconfig.docker.json tsconfig.json
RUN yarn global add @nestjs/cli rimraf && yarn build


FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["yarn", "start:prod"]

