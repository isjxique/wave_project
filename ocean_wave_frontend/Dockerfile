FROM node:8

COPY . .

EXPOSE 3000

RUN npm run build --production
RUN npm install -g serve

CMD serve -s build
