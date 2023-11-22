FROM python:3.9 as python-stage

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

FROM node:16

WORKDIR /app

COPY --from=python-stage /app /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
