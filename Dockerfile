<<<<<<< HEAD
FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY package.json /app
=======
FROM node:12.16.1-alpine3.9 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/

>>>>>>> ae85e48b9cf8263bc1c3cfcf1666ebb347c8b2b9
RUN npm install
COPY . /app
RUN npm run build

<<<<<<< HEAD
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
=======
# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
>>>>>>> ae85e48b9cf8263bc1c3cfcf1666ebb347c8b2b9
