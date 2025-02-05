FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:latest

WORKDIR /app

RUN apt-get update && \
    apt-get install -y zsh curl vim && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app /app

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 3000

CMD ["/start.sh"]
