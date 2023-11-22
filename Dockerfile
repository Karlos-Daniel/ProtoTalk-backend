FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN pip install -r requirements.txt

CMD [ "npm", "start" ]