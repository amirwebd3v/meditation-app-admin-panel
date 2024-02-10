
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
COPY .env.docker .env
RUN apk add curl && curl -L https://unpkg.com/@pnpm/self-installer | node
RUN pnpm install && pnpm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output/ .
COPY .env.docker .env
ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "node", "/app/server/index.mjs" ]