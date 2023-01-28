# KomPare 2.0
## Blaine Hill and Lihui Liu, Fall 2022
### IDEA Lab, UIUC

#### Frontend: Built using React, TailwindCSS, DaisyUI, Material Tailwind, ParticlesJS, and NodeJS.
#### Backend: Built using Express.js, MongoDB, and NodeJS.

## How to Run

To launch locally, first download NodeJS from [here](https://nodejs.org/en/download/). Ensure you have the latest version of NodeJS that this project supports. At the time of writing, it is **8.19.2**. Test that NodeJS is installed correctly with `npm --v` to check the version.

Then, run `npm ci` in the root project folder to install all necessary node packages (npm clean install). `cd` into `kompare_backend` and `kompare_frontend` and do the run `npm ci` again in each directory.

We need to now create a MongoDB account to cache queries and their results in a database. Reference [this](https://www.mongodb.com/docs/manual/reference/connection-string/) resource to get a *MongoDB Connection String in URI Format*. Once you have this string, create a .env file in /kompare_backend and enter `MONGODB_URI=<your MongoDB URI string here>` to set that environment variable. Ensure that the IP Addresses that are using/deploying your app are denoted inside your database's **Network Access** settings. If you wish to allow any IP address to connect to your MongoDB database, set this to be `0.0.0.0/0.0.0` . See [this](https://www.mongodb.com/docs/atlas/connect-to-database-deployment/) resource for more information.

Additionally, you will need to set your default target for your frontend to send API requests to. If you wish to set it to be localhost and at port 8080, create a .env file in /kompare_frontend and enter `REACT_APP_DEFAULT_BACKEND=http://localhost:8080`.

To run on your local machine, enter 'npm run dev' from the root directory. This will run both the frontend and backend on their development scripts as defined in their respective package.json.

You will need to set four other environment variables to run this platform in a production setting (not on a local machine): two in /kompare_backend/.env (`NODE_ENV` and `PORT`) and one in /kompare_frontend/.env (`REACT_APP_BACKEND` and `REACT_APP_NODE_ENV`). Set `NODE_ENV=prod` in a new line in /kompare_backend/.env to let the backend app know you are in production. Set `PORT=XXXX` in a new line in /kompare_backend/.env to let the backend app know you wish to run the application on a different port (the default is port 8080). Set `REACT_APP_BACKEND=yourBackendURL` in a new line in /kompare_frontend/.env to let the frontend app know you wish to send API requests to a different URL (your deployed API/your backend app) than than your DEFAULT_BACKEND value. Set `REACT_APP_NODE_ENV=prod`in a new line in /kompare_frontend/.env to let the frontend app know you are in production.

To deploy, we recommend an infrastructure as a service (IaaS) service such as [Render](render.com). Follow a tutorial such as [this](https://www.youtube.com/watch?v=l134cBAJCuc&ab_channel=DaveGray) to familiarize yourself with how to deploy a MERN stack app to Render.

## How to add new Knowledge Graph Algorithms to the API

First, write and test an algorithm and add it to /kompare_backend/algorithm_scripts/ (you can access data and add new data to the /kompare_backend/datasets folder). Then, add the title of the script and its language initializer to /kompare_backend/algorithm_scripts. (E.g. `test_script.py` and `python` since I would run `python test_script.py` in my terminal.)

Test your new algorithm using a resource such as [Postman](https://www.postman.com/downloads/) sending data to the API in the form of a body like so:

```json
{
    "language": "python",
    "script": "test_script.py",
    "query": "My test query to see if my test script is running properly!"
}
```

If you get back a response as expected, then your algorithm is implemented properly. Check out [this link](https://nodejs.org/api/child_process.html) for more resources on how to interact with a NodeJS child process. Two noteworthy hints are that data can be passed to a script via `sys argvs` in Python and to receive data from the script, simply `print` it in Python.

## How to display results from new Knowledge Graph Algorithms using d3



## Helpful Resources Used
* [Material Tailwind](https://www.material-tailwind.com/)
* [DaisyUI](https://daisyui.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Particles JS](https://particles.js.org/)
* [Postman](https://www.postman.com/downloads/)
* [React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)
* [Example of Amazing React + Express project](https://github.com/oldboyxx/jira_clone)
* [Examples of Routes and Controllers](https://lo-victoria.com/build-a-rest-api-with-nodejs-routes-and-controllers)
* [MongoDB REST Tutorial](https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial)
* [Managing NodeJS Child Processes](https://alexzywiak.github.io/managing-multiple-child-processes-in-nodejs/index.html)
* [MongoDB Cheatsheet](https://webdevsimplified.com/mongodb-cheat-sheet.html)
* [Mongoose Tutorial](https://www.youtube.com/watch?v=DZBGEVgL2eE&ab_channel=WebDevSimplified)
* [Calling Python Script with NodeJS Express Server](https://stackoverflow.com/questions/44423931/calling-python-script-with-node-js-express-server)
* [How to Access Return Value of a Promise](https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck)
* [How to Use Redis With Express and MongoDB/Mongoose](https://blog.devsharma.live/how-to-use-redis-with-express)