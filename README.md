# Welcome to rick and morty app

This is a project that has the idea of using an external API(that I use [TheRickAndMortyAPI](https://rickandmortyapi.com/)), and a users session. Basically the idea is that a user need to log in in app to find and pick the favorite characters of rick and morty. Besides that, there' a list of users and their favorite characters to see.

The main idea is consolidate the knowledgs about:
 - How to consume an external API;
 - How create an aplication with sessions and users;
 - How save and persist data in the cloud;
 - How deploy an application;

## Tech Stack
---
- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Material-Ui](https://mui.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [React-Hook-Form +  YUP](https://react-hook-form.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MongoDb Atlas](https://www.mongodb.com/atlas/database)

I choose a Nextjs because I think that (how documentation page says) it's "ready for production", the routing file system and the possibility to create api routes with single files, the possibility of create pages server side rendering, so I thought that is the greatest aproach for this project.

Typescript is to guarantee a type safe for the project and a better readibility. Material-UI I've chosen because I was curious about a ui library and decide to learn it. Axios is a great library to fetch data, simplifies when compared with natively fetch API.

React hook form was a test to use a library to validate a form, and I think that besides add lots of complexity in a form there are some advantages like do not need to worry about state of form.

MongoDb Atlas is the way I choose to save data in cloud, and when I deploy the aplication the data persists.

### Features
---
🚧Rick and morty app 🚀 in progress... 🚧

 - [X] Page with all the characters of Rick And Morty
 - [X] Search for specific character
 - [X] Pagination of characters
 - [X] Possibility to create an user
 - [X] Possibility to favorite a character and persists in Database
 - [X] List of User with favorite characters
 - [ ] User Session and authenticate
 - [ ] Link the favorite character to user of session
 - [ ] Unit tests


## How run the project after clone it

First, install the dependencies:

```bash
npm install
# or
yarn
```

After, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


