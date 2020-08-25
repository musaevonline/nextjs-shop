FROM node:12.16.2 as builder
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG API_URI
ENV API_URI ${API_URI:-http://localhost:8000/graphql/}
RUN API_URI=${API_URI} npm run build

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /app/