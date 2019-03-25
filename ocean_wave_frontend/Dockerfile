FROM node:8


COPY package.json package.json
COPY package-lock.json package-lock.json 

RUN npm install 

COPY . . 

EXPOSE 3000

RUN npm run build --production
RUN npm install -g serve

CMD serve -s build
