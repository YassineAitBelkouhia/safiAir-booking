const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  mysql = require("mysql"),
  router = require("./router"),
  contentTypes = require("./contentTypes"),
  utils = require("./utils"),
  qs = require("querystring"),
  nodemailer = require("nodemailer"),
  connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "safiair",
  }),
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
      user: "safiairyourbestchoice@gmail.com",
      pass: "testPasswordSafiAir",
    },
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

      console.log(data.flightType);
      let template = `Dear ${data.fullName},\n 
      We are pleased to inform you that your booking is confirmed.\n
      \n
      Flight Type : ${data.flightType}
      Your Departure : ${data.departureDate}
      Your Return : ${data.returnDate} 
      \n
      Booking details:
      \n
      Number Of Passengers : ${data.numberOfPassengers}
      Departure : ${data.from}
      Destination : ${data.to}
      
      Have a safe flight, 
      `,
        mailOptions = {
          from: "safiairyourbestchoice@gmail.com",
          to: `${data.email}`,
          subject: "Safi Air Booking Confirmation",
          text: template,
        };
      //Send Email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
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
