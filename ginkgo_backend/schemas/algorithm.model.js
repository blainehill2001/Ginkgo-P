var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlgorithmCallSchema = new Schema({
  script: {
    type: String,
    enum: [
      "test_script.py",
      "script1.py",
      "script2.cpp",
      "transE.py",
      "ComplEx.py",
      "rotatE.py",
      "multihopkg.py",
      "embedkgqa.py",
      "pagerank.py",
      "runcustom.py"
    ],
    required: true,
    unique: false
  },
  language: {
    type: String,
    enum: ["python3"],
    required: true,
    unique: false
  },
  result: {
    type: String,
    default: "default result"
  }
});

module.exports = mongoose.model("AlgorithmCall", AlgorithmCallSchema);
