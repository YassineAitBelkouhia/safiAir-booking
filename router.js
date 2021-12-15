const httpStatus = require("http-status-codes"),
  contentTypes = require("./contentTypes"),
  utils = require("./utils");

//ROUTES OBJECT TO HOLD ROUTE FUNCTIONS
const routes = {
  GET: {},
  POST: {},
};

//HANDLE REQUESTS
exports.handle = (req, res) => {
  try {
    routes[req.method][req.url](req, res);
  } catch (e) {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/error.html", res);
  }
};

//CREATE GET ADN POST FUNCTIONS TO MAP ROUTE FUNCTIONS
exports.get = (url, action) => {
  routes["GET"][url] = action;
};

exports.post = (url, action) => {
  routes["POST"][url] = action;
};
