var spawn = require("child_process").spawn;
var bbPromise = require("bluebird");
const AlgorithmCall = require("../schemas/algorithm.model");
const _ = require("lodash");

function loadProcess(script_type, script_name, ...args) {
  /*
        Inputs:
            script_type: String => which language our script is
            script_name: String => title of script with file extension (e.g. "script1.py" not "script1")
            ...args: String => values of the rest of the parsed JSON object passed to api call
    */

  return new bbPromise(function (resolve, reject) {
    var process = spawn(`${script_type}`, [
      `./algorithm_scripts/${script_name}`,
      ...args,
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

function returnData(data) {
  return data;
}

const getAlgoResult = async (req, res, next) => {
  //check redis for AlgorithmCall object as key
  //if it is in cache
  //return object.result
  //if it is not in cache
  // check mongodb using mongoose queries and await
  const mongo_check = searchMongo(req.body);
  //if it is in mongodb
  if (typeof is_in_mongodb !== "undefined") {
    //return object.result
    return mongo_check.result;
  } else {
    //if it is not in mongodb, call loadProcess;
  }

  const algocall_result = await loadProcess(...Object.values(req.body)).then(
    (x) => x,
    console.log
  );

  //store answer in cache
  let finished_algocall = new AlgorithmCall(
    _.merge(req.body, { result: algocall_result })
  );
  //store finished_algocall in cache

  //store answer in mongodb
  //   finished_algocall.save();
  res.json({
    message:
      "GET request receieved. Check console log for test of spawned process.",
    algocall_result: finished_algocall,
  });
  next();
};

const postAlgoResult = (req, res, next) => {
  res.json({ message: "POST request receieved." });
  next();
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
  deleteAlgoResult,
};
