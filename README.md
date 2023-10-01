# Ginkgo-P
## General Illustrations of Networks and Knowledge Graphs for Openness as a Platform
### Blaine Hill, Lihui Liu and Hanghang Tong
#### IDEA Lab, UIUC

#### Frontend: Built using React, TailwindCSS, DaisyUI, Material Tailwind, ParticlesJS, and NodeJS.
#### Backend: Built using Express.js, MongoDB, and NodeJS.

## Visit the Website: https://ginkgo-p.onrender.com/

## Quick Start

In order to visualize a graph generated by your algorithms on your own environment, simply copy paste JSON to Ginkgo-P through the Quick Start option. It must follow this example in order to be visualized:

```json
{
    "status": "Consistent",
    "highlighted_path": [ //this represents a list of links to be highlighted if you wish to
        {
            "source": "1",
            "type": "isLocatedIn",
            "target": "2"
        },
        {
            "source": "1",
            "type": "happenedIn",
            "target": "3"
        }
    ],
    "highlighted_nodes": [
            {
                "id": "1",
                "name": "Hawaii"
            }
    ],
    "graph": {
        "nodes": [
            {
                "id": "1",
                "name": "Hawaii"
            },
            {
                "id": "2",
                "name": "Hawaii_State_Capitol"
            },
            {
                "id": "3",
                "name": "Black_Week_(Hawaii)"
            },
            {
                "id": "4",
                "name": "Aloha_Stadium"
            }
        ],
        "links": [
            {
                "source": "1",
                "type": "isLocatedIn",
                "target": "2"
            },
            {
                "source": "1",
                "type": "happenedIn",
                "target": "3"
            },
            {
                "source": "1",
                "type": "isLocatedIn",
                "target": "4"
            },

            {
                "source": "4",
                "type": "contains",
                "target": "3"
            },
        ]
    }
}
```

See [here](#section-1) for an example of how this JSON can be filled out.

## How to Run

To launch locally, first download NodeJS from [here](https://nodejs.org/en/download/). Ensure you have the latest version of NodeJS that this project supports. At the time of writing, it is **8.19.2**. Test that NodeJS is installed correctly with `npm --v` to check the version.

Then, run `npm ci` in the root project folder to install all necessary node packages (npm clean install). `cd` into `ginkgo_backend` and `ginkgo_frontend` and do the run `npm ci` again in each directory.

We need to now create a MongoDB account to cache queries and their results in a database. Reference [this](https://www.mongodb.com/docs/manual/reference/connection-string/) resource to get a *MongoDB Connection String in URI Format*. Once you have this string, create a `.env` file in `/ginkgo_backend` and enter `MONGODB_URI=<your MongoDB URI string here>` to set that environment variable. Ensure that the IP Addresses that are using/deploying your app are denoted inside your database's **Network Access** settings. If you wish to allow any IP address to connect to your MongoDB database, set this to be `0.0.0.0/0.0.0` . See [this](https://www.mongodb.com/docs/atlas/connect-to-database-deployment/) resource for more information.

Additionally, you will need to set your default target for your frontend to send API requests to. If you wish to set it to be localhost and at port 8080, create a `.env` file in `/ginkgo_frontend` and enter `REACT_APP_DEFAULT_BACKEND=http://localhost:8080`.

To run on your local machine, enter 'npm run dev' from the root directory. This will run both the frontend and backend on their development scripts as defined in their respective package.json.

You will need to set environment variables to run this platform. See `getting_started_with_ginkgo-p/README.md` for more details and some example inputs.

To deploy, we recommend an infrastructure as a service (IaaS) service such as [Render](render.com). Follow a tutorial such as [this](https://www.youtube.com/watch?v=l134cBAJCuc&ab_channel=DaveGray) to familiarize yourself with how to deploy a MERN stack app to Render.

## How to add new Knowledge Graph Algorithms to the API

First, write and test an algorithm and add it to /ginkgo_backend/algorithm_scripts/ (you can access data and add new data to the /ginkgo_backend/datasets folder). Then, add the title of the script and its language initializer to /ginkgo_backend/algorithm_scripts. (E.g. `test_script.py` and `python` since I would run `python test_script.py` in my terminal.)

The frontend **must** specific two things in the body of its API request to the backend:
* "language": a string specifying which language the script is written in (written down as the string that is a part of the call)
* "script": a string that is the file name of the script in `/ginkgo_backend/algorithm_scripts` to run

However, the frontend can add more objects to the API call to be used in running the script. In fact, this is encouraged. 

Test your new algorithm using a resource such as [Postman](https://www.postman.com/downloads/) sending data to the API in the form of a body like so:

```json
{
    "language": "python3",
    "script": "test_script.py",
    "arg1": "My test query to see",
    "arg2": "if my test script is running properly!"
}
```

By sending a POST request with this body, the backend will run `python test_script.py` with parameters `"My test query to see"` and  `"if my test script is running properly!"`. If you make the above request, you should expect back the following json:

```json

{
    "message": "some helpful logging",
    "algocall_result": {
        "script": "test_script.py",
        "language": "python3",
        "result": "My test query to see\nif my test script is running properly!\n",
        "_id": "a randomly generated id to be used as a unique identifier in MongoDB"
    }
}

```



If you get back a response as expected, then your algorithm is implemented properly. Check out [NodeJS documentation](https://nodejs.org/api/child_process.html) for more resources on how to interact with a NodeJS child process. Two noteworthy hints are that data can be passed to a script via `sys argvs` in Python and to receive data from the script, simply `print` it in Python. Check out `/ginkgo_backend/algorithm_scripts/test_script.py` to see what we mean.

## How to display results from new Knowledge Graph Algorithms using d3

### Interact with an example
Go to `/ginkgo_frontend/src/components/App/App.js` and uncomment line `{/* <Route path="Example" element={<ExampleCategory />} /> */}`. Then navigate to `insert_website_url/Example` to display the component.

Check out `/ginkgo_frontend/src/components/ExampleCategory` folder to see how to create a category (for a task such as question answering) of algorithms. Specifically, check out `ExampleTab1` in the folder for an example of how to create a form component. Check out `ExampleTab2` in the folder for an example of how a hardcoded result would be displayed using d3.

### Render an interactive d3 graph with results from new Knowledge Graph Algorithms

If you wish to add a new algorithm that returns an **interactive d3 graph** as shown in `ExampleTab2`, make sure your component makes a request to the API which **must** return a JSON object in this form:

```json

{
    "message": "...some logging message",
    "algocall_result": {
        "script": "...name of your script",
        "language": "...language of your script",
        "result": "VERY IMPORTANT GRAPH REPRESENTATION"
    }
}

```
where `VERY IMPORTANT GRAPH REPRESENTATION` is a collection of `<head, relation, tail>` relationships which define a graph. See below for an example of how the representation **must** be returned from your script:

<a name="section-1"></a>


```json
{
    "status": "..return some status here (we use `Good` or `Bad` depending on your custom algorithm and error handling)",
    "highlighted_path": [ //this represents a list of links to be highlighted if you wish to
        {
            "source": "1",
            "type": "isLocatedIn",
            "target": "2"
        },
        {
            "source": "1",
            "type": "happenedIn",
            "target": "3"
        }
    ],
    "graph": {
        "nodes": [
            {
                "id": "1",
                "name": "Hawaii"
            },
            {
                "id": "2",
                "name": "Hawaii_State_Capitol"
            },
            {
                "id": "3",
                "name": "Black_Week_(Hawaii)"
            },
            {
                "id": "4",
                "name": "Aloha_Stadium"
            }
        ],
        "links": [
            {
                "source": "1",
                "type": "isLocatedIn",
                "target": "2"
            },
            {
                "source": "1",
                "type": "happenedIn",
                "target": "3"
            },
            {
                "source": "1",
                "type": "isLocatedIn",
                "target": "4"
            },

            {
                "source": "4",
                "type": "contains",
                "target": "3"
            },
        ]
    }
}
```

If your script returns this type of JSON object, you are almost done!

### Add a new component to frontend

First make a copy of `/ginkgo_frontend/src/components/ExampleCategory` and place it in `/ginkgo_frontend/src/components`. To add it to the frontend, we must add it to our main App.js.

Navigate to `/ginkgo_frontend/src/components/App/App.js` and edit the return function to be like this:

```javascript
  return (
    <>
      <div className="App">
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="Example" element={<ExampleCategory />} /> */}

            <Route path="...insert your path" element={<YourExampleCategoryCopy />}/> 

            <Route path="multihopreasoning" />
            <Route path="pointwisereasoning" />
            <Route path="kgcompletion" element={<KGCompletionCategory />} />
            <Route path="kgquestionanswering" />
          </Routes>
        </div>
        <Particles id="tsparticles" />
      </div>
    </>
  );
```


Now we add it to our NavBar (`/ginkgo_frontend/src/components/NavBar/NavBar.js`) and add a new `<li>` element like so:

```javascript
    <li>
        <Link to="kgquestionanswering" className="text-purple-500">
        KG Question Answering
        </Link>
    </li>
    <li>
        <Link to="multihopreasoning" className="text-purple-500">
        Multi-Hop Reasoning
        </Link>
    </li>
    <li>
        <Link to="pointwisereasoning" className="text-purple-500">
        Node Recommendation
        </Link>
    </li>
    <li>
        <Link to="...insert your path from App.js" className="text-purple-500">
        Your Example Category Copy
        </Link>
    </li>
```

Finally, we are ready to customize our `ExampleTab2Copy` file. In your new copy, we must edit the POST request to our backend. Replace the following:

```javascript
const params = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify({
        "language": "python3",
        "script": "script1.py",
        ...data_sent
      })
    };

```

with

```javascript
const params = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify({
        "language": "...language of your script",
        "script": "...name of your script",
        ...data_sent
      })
    };
```

and we're done! As long as your script does not require any parameters, you should see your interactive d3 graph as soon as you submit any string in the "Query" field! 

If your script does require parameters (most do), you must either specify it hardcoded in the POST request body via `params` above or you must edit the rest of `ExampleTab2Copy` like so for an example parameter:

For Form Validation:
```javascript
//check out yup form validation here: https://www.sanity.io/guides/form-validation-with-npm-yup
const schema = yup.object().shape({
    // language: yup.string().required(),
    // script: yup.string().required(),
    query: yup.string().required()
    yourParamter: yup.insertYourDataType().required() // if your parameter isn't required but is optional, remove the last ".required()"
  });
```

To add to your form:

```javascript
            //       <p className="text-red-500 text-sm mt-2">
            //         A valid query is required.
            //       </p>
            //     )}
            //   </div>
            <div className="mb-8">
                <label
                  htmlFor="yourParameter"
                  className={`block font-bold text-sm mb-2 ${
                    errors.yourParameter ? "text-red-400" : "text-purple-500"
                  }`}
                >
                  Your Parameter Label
                </label>
                <input
                  {...register("yourParameter")} //creates a register to label your user's input
                  type="text"
                  id="yourParameter"
                  placeholder="enter anything - this is to demo the example result"
                  autoComplete="off"
                  className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-300 focus:bg-purple-100 ${
                    errors.yourParameter
                      ? "text-red-300 border-red-400"
                      : "text-purple-500 border-purple-400"
                  }`}
                />
                {errors.yourParameter && (
                  <p className="text-red-500 text-sm mt-2">
                   Say something if your user doesn't input your Parameter correctly!
                  </p>
                )}
              </div>
```

Finally, test your new component by entering some test data and looking at your new beautiful interactive d3 graph!


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