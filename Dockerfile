FROM node:16
WORKDIR /app
COPY package.json package.json
RUN npm i
COPY . .
CMD npm run dev