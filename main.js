const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  mysql = require("mysql"),
  router = require("./router"),
  contentTypes = require("./contentTypes"),
  utils = require("./utils"),
  qs = require("querystring"),
  connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "safiair",
  });

router.get("/", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("views/index.html", res);
});

router.post("/bookings", (req, res) => {
  let body = "";
  req
    .on("data", (data) => {
      body += data;
    })

    .on("end", async () => {
      // console.log(body);
      var data = qs.parse(body);
      connexion.query("INSERT INTO bookings SET ?", data, (err, res) => {
        if (err) throw err;

        console.log("Last insert ID:", res.insertId);
      });

      console.log(data);
    });
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("views/myBookings.html", res);
  // res.end();
  // console.log(req.params);
});

router.get("/BG1.png", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.png);
  utils.getFile("public/assets/BG1.png", res);
});
router.get("/LOGO1.png", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.png);
  utils.getFile("public/assets/LOGO1.png", res);
});
router.get("/rightArrow1.png", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.png);
  utils.getFile("public/assets/rightArrow1.png", res);
});
router.get("/worldMap.png", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.png);
  utils.getFile("public/assets/worldMap.png", res);
});

router.get("/app.css", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.css);
  utils.getFile("public/css/app.css", res);
});

router.get("/app.js", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.js);
  utils.getFile("public/js/app.js", res);
});

http.createServer(router.handle).listen(port);
connexion.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

console.log(`The server is listening on port number: ${port}`);
