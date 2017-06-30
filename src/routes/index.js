var express = require("express");

var router  = express.Router();

router.get("/", function (req, res) {
  var streamId = Math.random().toString(36).substring(2);
  res.redirect("/" + streamId);
});

router.get("/:streamId?", function (req, res) {
  res.render("index", {
    host: global.host,
    socketIoJs: global.socketIoJs,
    streamId: req.params.streamId
  });
});

router.post("/:streamId?", function (req, res) {
  var ip = req.headers["x-forwarded-for"]
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || req.connection.socket.remoteAddress
  ;
  if (req.headers["content-type"] === "application/json") {
    global.socket.emit("log", {streamId: req.params.streamId, format: "json", data: req.body, ip: ip});
  }
  res.send("");
});

module.exports = router;
