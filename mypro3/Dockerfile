FROM node:17.9.1

RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install --legacy-peer-deps

ENV NODE_ENV development

EXPOSE 3000

CMD ["npm", "start"]