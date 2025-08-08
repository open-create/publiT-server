FROM node:20

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY ./package.json /myfolder/
COPY ./pnpm-lock.yaml /myfolder/
WORKDIR /myfolder/
RUN pnpm install

COPY . /myfolder/
EXPOSE 8080
CMD pnpm start:dev