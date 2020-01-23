const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

const index = require("./routes/index");
app.use("/", index);

let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("server is running on port " + port);
});
