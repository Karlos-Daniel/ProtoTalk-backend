FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install python

RUN pip install -r requirements.txt

CMD [ "npm", "start" ]