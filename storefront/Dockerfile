FROM node:12 as builder
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
ARG API_URI
ENV API_URI ${API_URI:-http://localhost:8000/graphql/}
RUN API_URI=${API_URI} GTM_ID=${GTM_ID} yarn run build

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /app/