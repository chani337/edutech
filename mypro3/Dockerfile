FROM node:17.9.1

RUN mkdir -p /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install --legacy-peer-deps
COPY . .

ENV NODE_ENV development

EXPOSE 3000

CMD ["npm", "start"]