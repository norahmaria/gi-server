# Gi (server)

![Thumbnail](https://github.com/norahmaria/gi-client/blob/main/public/thumbnail.png?raw=true)

> Gi is a mini social network built with the MERN stack and Socket.IO for live updates.

## Creation of routes and sockets

This NodeJS backend does not follow the standard MVP structure, but rather uses the **routes and sockets folders** to create the routes and sockets dynamically.

###### Example structure:

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

**🤓 Routes:** Sending a request to _domain.com/feed_ will run the feed.ts file, and a request to _domain.com/sign/in_ will run the in.ts file.

**🥳 Sockets:** Emitting a 'online' event will run the online.ts file, while emitting a 'post/reaction' event will run the reaction.ts file.

## To install and run the app locally:

Add a _.env_ file in the _src/env_ folder with the url to your own [Gi Client](https://github.com/norahmaria/gi-client), a JWT Secret and your MongoDB URI, with the same names as shown in _.env.example_. When deployed - you need the .env **ENVIRONMENT** variable to be set to LIVE.

```
npm install
npm run dev
```

When hosting to Heroku, you need to enable [Session Affinity](https://devcenter.heroku.com/articles/session-affinity) for the sockets to work properly.
