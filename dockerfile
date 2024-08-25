FROM node:18-alpine

WORKDIR /app

COPY . . 

RUN npm install
RUN npx tsc

CMD ["node", "./output/main.js"]