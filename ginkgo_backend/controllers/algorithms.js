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
  return new bbPromise(function (resolve, reject) {
    var process = spawn(`${script_language}`, [
      `./algorithm_scripts/${script_name}`,
      ...args
    ]);
    let process_result = "";
    process.stdout.on("data", function (data) {
      process_result += data;
    });

    process.stderr.on("data", function (err) {
      console.log(err.toString());
      reject(err.toString());
    });

    process.on("close", function () {
      //   console.log("done with process");
      resolve(process_result);
    });
  });
}

async function searchMongo(body) {
  const doc = await AlgorithmCall.findOne(body).exec();
  return doc;
}
const getAlgoResult = (req, res, next) => {
  res.json({ message: "GET (blaine wrote this) request receieved." });
  next();
};
const postAlgoResult = async (req, res, next) => {
  //check redis for AlgorithmCall object as key
  //if it is in cache
  //TODO
  //return object.result
  //if it is not in cache
  var mongo_check;
  searchMongo(req.body).then((res) => {
    mongo_check = res;
  });
  //if it is in mongodb
  if (typeof mongo_check !== "undefined") {
    //return object.result
    return res.status(201).json({
      algocall_result: mongo_check.result,
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
      });
    // next();
  }
};

const postCustomAlgoResult = async (req, res, next) => {
  // Extract files from req.files into req.body
  //   req.files.script_file.forEach((file) => {
  //     console.log(
  //       "this is script_file under postCustomAlgoResult for file: " + file
  //     );
  //     console.log("type of file is: " + typeof file);
  //     console.log("the attributes of file are: " + Object.keys(file));
  //   });
  //   req.files.data_files.forEach((file) => {
  //     console.log(
  //       "this is data_files under postCustomAlgoResult for file: " + file
  //     );
  //     console.log("type of file is: " + typeof file);
  //     console.log("the attributes of file are: " + Object.keys(file));
  //   });

  // Create an array to store the file paths
  const filePaths = [];

  // Iterate over the files and write them to /custom

  for (const file of req.files.script_file) {
    const filePath = path.resolve("custom") + `/${file.originalname}`;
    filePaths.push(filePath);
    fs.writeFileSync(filePath, file.buffer);
  }
  for (const file of req.files.data_files) {
    const filePath = path.resolve("custom") + `/${file.originalname}`;
    filePaths.push(filePath);
    fs.writeFileSync(filePath, file.buffer);
  }

  //assign filePaths to req.body to pass it into spawned Python process
  req.body.filepaths = filePaths;
  req.body.smtb = [process.env.SMTB_USERNAME, process.env.SMTB_PASSWORD];
  //check redis for AlgorithmCall object as key
  //if it is in cache
  //TODO
  //return object.result
  //if it is not in cache
  var mongo_check;
  searchMongo(req.body).then((res) => {
    mongo_check = res;
  });
  //if it is in mongodb
  if (typeof mongo_check !== "undefined") {
    //return object.result
    return res.status(201).json({
      algocall_result: mongo_check.result,
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
      });
    // next();
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
