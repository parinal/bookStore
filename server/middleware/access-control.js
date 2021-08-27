module.exports = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Origin", "https://lazdoit.co.uk"); // restrict it to the required domain
  // res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // restrict it to the required domain
  // res.header("Access-Control-Allow-Origin", "http://localhost:8100"); // restrict it to the required domain
  // res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, X-Access-Token, X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
}
