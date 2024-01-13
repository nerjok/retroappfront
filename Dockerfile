# Stage 1: Compile and Build angular codebase

FROM node:lts-alpine as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

RUN rm -rf node_modules
RUN rm -rf src


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

COPY --from=build /usr/local/app/dist/retrofront /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf


EXPOSE 80

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
