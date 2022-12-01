# KomPare 2.0
## Blaine Hill and Lihui Liu, Fall 2022
### IDEA Lab, UIUC

## How to Run

To launch the frontend, first download Node.js from [here](https://nodejs.org/en/download/).

Then, run npm i in the root project folder to install all necessary node packages. cd into kompare_backend and kompare_frontend and do the same.

Then, cd into kompare_backend. Create a .env file with a value for MONGODB_URL as per their documentation [here](https://www.mongodb.com/docs/manual/reference/connection-string/). To get a valid url, you might have to be added as a Database User in MongoDB. (TODO for later: ensure that the access IP Addresses accessible to the DB is *not* 0.0.0.0/0.0.0 - namely add whatever private IPs as exclusive users.)

Feel free to edit the .env in ./kompare_backend for the server with other environment variables such as NODE_ENV to distinguish between prod and dev, PORT to distinguish which port the server will be on, etc.

To run on your local machine, enter 'npm run start' from the root directory. This will run both the frontend and backend on their development scripts as defined in their respective package.json.

## Frontend

To be filled out later - Blaine Nov 4th

## Backend

To be filled out later - Blaine Nov 4th

## Helpful Resources Used
* [Particles JS](https://marcbruederlin.github.io/particles.js/)
* [Postman](https://www.postman.com/downloads/)
* [React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)
* [Organizing Express Routes](https://blog.devsharma.live/how-to-use-redis-with-express)
* [Example of Amazing React + Express project](https://github.com/oldboyxx/jira_clone)
* [Examples of Routes and Controllers](https://lo-victoria.com/build-a-rest-api-with-nodejs-routes-and-controllers)
* [MongoDB REST Tutorial](https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial)
* [Managing NodeJS Child Processes](https://alexzywiak.github.io/managing-multiple-child-processes-in-nodejs/index.html)
* [MongoDB Cheatsheet](https://webdevsimplified.com/mongodb-cheat-sheet.html)
* [Mongoose Tutorial](https://www.youtube.com/watch?v=DZBGEVgL2eE&ab_channel=WebDevSimplified)
* [Calling Python Script with NodeJS Express Server](https://stackoverflow.com/questions/44423931/calling-python-script-with-node-js-express-server)
* [How to Access Return Value of a Promise](https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck)