// newTea function for get tea route
const getTea = (req, res, next) => {
  //create child process per https://stackoverflow.com/questions/44423931/calling-python-script-with-node-js-express-server
  //call the python code
  //return or do stuff with python results
  res.json({ message: "GET tea" }); // dummy function for now
  next();
};

// newTea function for post tea route
const postTea = (req, res, next) => {
  res.json({ message: "POST new tea" }); // dummy function for now
  next();
};

// newTea function for put tea route
const putTea = (req, res, next) => {
  res.json({ message: "PUT new tea" }); // dummy function for now
  next();
};

// newTea function for delete tea route
const deleteTea = (req, res, next) => {
  res.json({ message: "DELETE new tea" }); // dummy function for now
  next();
};

module.exports = { getTea, postTea, putTea, deleteTea };
