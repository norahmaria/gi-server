# Gi (server)
![Thumbnail](https://github.com/norahmaria/gi-client/blob/main/public/thumbnail.png?raw=true)

> Gi is a mini social network built with the MERN stack and Socket.IO for live updates.

## Creation of routes and sockets
This NodeJS backend does not follow the standard MVP structure, but rather uses the **routes and sockets folders** to create the routes and sockets dynamically.

###### Imagine this structure
```
directory/
━ routes/
  ━ feed.ts
  ━ sign/
    ━ in.ts
━ sockets
  ━ online.ts
  ━ post/
    ━ reaction.ts
```
**🏎 Routes:** Sending a request to *domain.com/feed* will run the feed.ts file, and a request to *domain.com/sign/in* will run the in.ts file.
**🧨 Sockets:** Emitting a 'online' event will run the online.ts file, while emitting a 'post/reaction' event will run the reaction.ts file.

## To install and run the app locally:
```
npm install
npm run dev
```