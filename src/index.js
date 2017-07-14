var express = require("express");
var bodyParser = require("body-parser");
var socketIo = require("socket.io");

var routes = require("./routes/index");
var cors = require("./middlewares/cors");
var config = require("./configs/main");

var app = express();
var server = app.listen(port);
global.socket = socketIo.listen(server);

app.use(express.static("./src/public"));
app.set("views", "./src/views");
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors);
app.use(function(req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});
app.use("/", routes);
