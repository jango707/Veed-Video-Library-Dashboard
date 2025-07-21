# Veed-Video-Library-Dashboard

A simple web application for managing and displaying a collection of videos.

[Frontend README](./webapp/README.md)
[Backend API_DOCS](./server/README.md)

## Start here 👋🏼

This is a fullstack video dashboard application. To get started, ensure you have the requirements installed and follow the setup instructions below.

### Requirements (optional for a better experience)

- nvm
- just

### Set up

Before running anything in this repo, ensure you are using the expected node version v22.
You can use the nvm command `nvm use` to ensure you are using the right one.

To install all project dependencies, simply run `just install`.

To run the frontend locally: `just frontend`. This will start a localhost server on port 3000.
To run the backend locally: `just backend`. This will start a localhost server on port 9999.

If for any reason just doesn't work on your machine or you prefer not to use/install it, the frontend and backend can also be run via `yarn start:dev` in their respective directories. Similarly, the instalment of the node packages can be performed by running `yarn install` in their respective directories.

To run the test suites: `just test`. (🔔 remember to be on the right version of node)
To lint-check all files: `just lint`.
To format all files using prettier: `just format`.

### Folder structure

The repo is organised into:

- webapp: the frontend lives here
- server: the backend lives here
- database: a mimic database (read more below in the DATABASE section)
- zod: type validation package

## Tech Stack ⚙️

The frontend is built on `React` and `Typescript`.
The backend is built on `Express` and `Typescript`.

- **Frontend component Library**

[Chakra UI](https://chakra-ui.com/)
having used ChakraUI previously, I find it incredibly intuitive to work with and it has all the components needed for modern website. I used a component library, so I don't need to worry about accessibility or visuals (like border radius, loading button states, etc)

- **Testing & Development:**

`Jest` with `ts-jest` for unit testing
`Prettier` for code formatting
`ESLint` for code linting

- **Build Tools & Package Management:**

`yarn` for package management
`just` for task automation and development workflow
`nvm` for Node.js version management (v22)

- **Type Safety: ZOD**
- 
`zod` was used to create type-safety between the back and frontend
Ideally, this can get extracted into its own package and shipped via npm or some registry
For now it is a local package where any service in the repo can hook into.

## Assumptions & Trade-offs 📘

### Database

I decided to create a mimic database implementing that simulates a real-world database. Given the time constraints, I decided I want to focus my time on the actual features, rather than setting up a database host or ORM.

I considered options like a locally hosted SQL server or connecting to a local GraphQL implementation. They seemed attractive, but did not add value to the end product (which is a local-only website).
I also excluded using a Firebase db (super quick setup) due to key-sharing permissions with whoever wants to run my code in the future.
I also excluded using an ORM like Prisma as I simply did not work with such a technology previously.

In the end I decided for the simplest approach I could think of: creating a mimic database service. (./database). This service acts like a real-world database and supports functions like `findMany` and `createOne`. I have taken inspiration from `MongoDB` to structure and name this service.
The benefit of using this local mimic database is, that you can treat it like a real db from your backend service. In addition, this service is modular, so you can replace it in the future with a full-on production db and no other code needs to be changed in other services.

## Assumptions

These were some of the things I intentionally left out:

**Pageination**

Creating pageination logic on the backend can add complexity quickly. This leads to more unit tests and increase on potential bugs. I considered pageination based on creation date (suitable for infinite scroll) and on fixed numbers (static grid). Both seemed like a quick solution was not feasible.
On the frontend, it requires additional components for the UI, as well as state management. When a page is refreshed, you would like to stay on the same page for example.
Implementing a full-stack pageination wa snot in the time-scope for this exercise as other features were more important.
I justified this choice by assuming that the video grid does not necessarily need to be pageinated. At the moment it shows 50 videos (thumbnails), which a website can easily handle. I assumed that the scale of this website is only for a single user, so the order of magnitude should be fairly small (i.e. not 1000s of uplaods per second). tehrefore it made sense to me to drop the pageination feature.

- **Acceptance / e2e tests**

From experience, setting up Cypress as taken the better part of a whole day, so I quickly de=prioritised any e2e tests testing the entire user flow

- **Advanced Filter and Sorting**

I decided to pick only the most important sorting: based on creation date.
Given the limited time, I wanted to keep it simple and not over-engineer multiple filters and/or sorting. Every new option would require unit tests and more bugs might appear. I also left a date range finder out of the scope, as it required additional UI work to be done including warning states and user inputs.
I decided to focus on search by title and tag. I didn't get to implement the tag on the frontend side, but title search is fully supported.

- **Detailed video view**

I decided to leave this optional feature out, as I could not decide what additional data I would want to show in such a view. The dataset does not include a description or other useful information (like author etc), so having a seperate view just to show the same info as in the grid did not make sense to me.

## Future Improvements 🚀

- **Social features / Account**

I can see such a video dashboard being transformed into a youtube platform where anyone can upload videos. At the moment anyone can upload but you don't know who uploaded what, and you can also not see your own uploads.
This is obviously a huge feature, but as a first step one could implement a browser-based auth session, where a temporary token gets send to the backend to see all your videos from your session. This then can get extended to a simple auth implementation where tokens can get verified and stay persistent.
On the frontend you can then create a "Your page" and a "Global page" to see uploads from other users.

- **Complete CRUD design**

The backend only allows for the C&R (create and read), update and delete functions have not been created yet, making the API uncompleted. Ideally an API allows a user to modify and delete anything they create, so completing such functionality will allow for a better user flow.

- **More thorough testing**

The current testing focuses mostly on input validation and error handling. This is important and I chose to implement these tests first because they prevent teh worst possible user scenarios. If a server route crashes, it can bring the entire app down. In contrast, if a filter function returns the wrong items, it won't be as severe and the user might not even notice it.
With more time, I would have implemented the database search functions.
