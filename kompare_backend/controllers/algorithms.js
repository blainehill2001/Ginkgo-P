var spawn = require("child_process").spawn;
var bbPromise = require("bluebird");
const AlgorithmCall = require("../schemas/algorithm.model");
const _ = require("lodash");

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
  res.json({ message: "GET request receieved." });
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
  putAlgoResult,
  deleteAlgoResult
};
