FROM node:14 as builder
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
ARG API_URI
ENV API_URI ${API_URI:-http://localhost:8000/graphql/}
ARG GTM_ID
ENV GTM_ID ${GTM_ID}
ARG DASHBOARD_URL
ENV DASHBOARD_URL ${DASHBOARD_URL}
RUN API_URI=${API_URI} GTM_ID=${GTM_ID} DASHBOARD_URL=${DASHBOARD_URL} yarn run build

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /app/
