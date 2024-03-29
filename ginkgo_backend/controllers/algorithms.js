var spawn = require("child_process").spawn;
var bbPromise = require("bluebird");
const AlgorithmCall = require("../schemas/algorithm.model");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");

function loadProcess(script_language, script_name, ...args) {
  /*
        Inputs:
            script_language: String => which language our script is
            script_name: String => title of script with file extension (e.g. "script1.py" not "script1")
            ...args: String => values of the rest of the parsed JSON object passed to api call
    */
  return new Promise(function (resolve, reject) {
    console.log("got to loadProcess return statement");
    console.log(script_language, script_name, ...args);
    var process = spawn(`${script_language}`, [
      `./algorithm_scripts/${script_name}`,
      ...args
    ]);
    let process_result = "";
    process.stdout.on("data", (data) => {
      process_result += data.toString();
    });

    process.stderr.on("error", (err) => {
      reject(err.toString());
    });

    process.on("close", () => {
      console.log("process_result: ", process_result);
      resolve(process_result);
    });
  });
}

async function searchMongo(body) {
  console.log("\n\n\n\nthis is searchMongo!!!");
  console.log(body);
  const doc = await AlgorithmCall.findOne(body).exec();
  console.log(doc);
  return doc;
}
const getAlgoResult = (req, res, next) => {
  res.json({ message: "GET request receieved." });
  next();
};
const postAlgoResult = async (req, res, next) => {
  //check redis for AlgorithmCall object as key
  //if it is in cache
  //TODO
  //return object.result
  //if it is not in cache
  let mongo_check;
  mongo_check = await searchMongo(req.body);

  //if it is in mongodb
  if (mongo_check !== null) {
    console.log("fetch from mongo");
    console.log(mongo_check);
    //return object.result
    return res.status(201).json({
      algocall_result: mongo_check,
      message:
        "GET request receieved. Found algorithm result for inputs in MongoDB."
    });
    // next();
  } else {
    //if it is not in mongodb, call loadProcess;
    const algocall_result = await loadProcess(...Object.values(req.body));

    let finished_algocall = new AlgorithmCall({
      ...req.body,
      result: algocall_result
    });

    return finished_algocall
      .save()
      .then(() => {
        res.status(201).json({
          message:
            "GET request receieved. Ran algorithm and stored results in MongoDB.",
          algocall_result: finished_algocall
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: `GET request receieved. Ran algorithm and but did not store results in MongoDB. See error: \n${err}`,
          algocall_result: finished_algocall
        });
      });
    // next();
  }
};

const postCustomAlgoResult = async (req, res, next) => {
  // Construct the absolute path by joining the current working directory and the relative path
  const relativePath = path.resolve("custom");
  console.log(`directory: ${relativePath}`);

  fs.mkdir(relativePath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating folder: ${err.message}`);
    }
  });
  // Create an array to store the file paths
  const filePaths = [];

  // Iterate over the files and write them to /custom
  for (const file of req.files.script_file) {
    const filePath = relativePath + `/${file.originalname}`;
    filePaths.push(filePath);
    fs.writeFileSync(filePath, file.buffer);
  }
  for (const file of req.files.data_files) {
    const filePath = relativePath + `/${file.originalname}`;
    filePaths.push(filePath);
    fs.writeFileSync(filePath, file.buffer);
  }

  //assign filePaths to req.body to pass it into spawned Python process
  req.body.filepaths = filePaths;
  req.body.smtb = [
    process.env.SMTP_USERNAME,
    process.env.SMTP_PASSWORD,
    process.env.SMTP_SERVER,
    process.env.SMTP_PORT
  ];
  //check redis for AlgorithmCall object as key

  var mongo_check;
  searchMongo(req.body).then((res) => {
    mongo_check = res;
  });
  //if it is in mongodb
  if (typeof mongo_check !== "undefined") {
    //return object.result
    return res.status(201).json({
      algocall_result: mongo_check,
      message:
        "GET request receieved. Found algorithm result for inputs in MongoDB."
    });
    // next();
  } else {
    //if it is not in mongodb, call loadProcess;
    const algocall_result = await loadProcess(...Object.values(req.body)).then(
      (x) => x,
      console.log
    );
    let finished_algocall = new AlgorithmCall(
      _.merge(req.body, { result: algocall_result })
    );

    //store finished_algocall in cache
    //TODO
    //store answer in mongodb
    return finished_algocall
      .save()
      .then(() => {
        res.status(201).json({
          message:
            "GET request receieved. Ran algorithm and stored results [in cache] AND MongoDB.",
          algocall_result: finished_algocall
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: `GET request receieved. Ran algorithm and stored results [in cache] but NOT MongoDB. See error: \n${err}`,
          algocall_result: finished_algocall
        });
      })
      .finally(() => {
        fs.readdirSync(relativePath).forEach((fileName) => {
          fs.unlinkSync(path.join(relativePath, fileName));
        });
      });
  }
};

const putAlgoResult = (req, res, next) => {
  res.json({ message: "PUT request receieved." });
  next();
};

const deleteAlgoResult = (req, res, next) => {
  res.json({ message: "DELETE request receieved." });
  next();
};

module.exports = {
  getAlgoResult,
  postAlgoResult,
  postCustomAlgoResult,
  putAlgoResult,
  deleteAlgoResult
};
