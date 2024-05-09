const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
    const authToken = req.headers["authorization"];
    if (authToken) {
      const bearer = authToken.split(' ');
      const token = bearer.pop();
      jwt.verify(token, '-%Mh!XD@Q!jiN#0s1W%#tA1Z', (err, data) => {
        if (err) {
          res.status(401).json({ err: 'Invalid token' });
        } else {
          req.token = token;
          req.loggedUser = { id: data.id, email: data.email };
          next();
        }
      });
    } else {
      res.status(401).json({ err: 'Token not provided' });
    }
}

module.exports = authentication;
