FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install 

COPY tsconfig.json .

COPY src ./src

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache curl

USER node 

COPY --chown=node:node --from=builder /app/package.json ./

COPY --chown=node:node --from=builder /app/dist ./dist

USER node

EXPOSE 3000 

CMD ["node", "dist/index.js"]