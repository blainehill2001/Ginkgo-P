var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlgorithmCallSchema = new Schema({
  script: {
    type: String,
    enum: [
      "test_script.py",
      "Hawaii_example.py",
      "transE.py",
      "ComplEx.py",
      "rotatE.py",
      "multihopkg.py",
      "embedkgqa.py",
      "pagerank.py",
      "runcustom.py",
      "DistMult.py"
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
  query: {
    type: String
  },
  result: {
    type: String,
    default: JSON.stringify({ error: "error" })
  }
});

module.exports = mongoose.model("AlgorithmCall", AlgorithmCallSchema);
