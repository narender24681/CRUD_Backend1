const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "randomSecretKey");
      console.log(decoded);

      if (decoded) {
        req.body.author = decoded.author;
        req.body.authorId = decoded.authorId;

        next();
      }
      else {
        res.send({ "msg": "Login to see page" });
      }
    }
    catch (err) {
      res.send({ "err": err.message });
    }
  }
  else {
    res.send({ "msg": "Login to see page" });
  }
}


module.exports = {
  auth
}