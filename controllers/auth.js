const db = require("../db/models/index");
const jwt = require("jsonwebtoken");

// My secret key for token
const JWTSecret = "-%Mh!XD@Q!jiN#0s1W%#tA1Z";

// Authentication route
exports.postAuth = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.Users.findOne({
      where: { email: email, password: password },
    });

    if (!user) {
      console.error("Invalid email or password");
      return res.status(400).json({ err: "Invalid email or password" });
    }

    jwt.sign(
      { id: user.id, email: user.email },
      JWTSecret,
      { expiresIn: "24h" },
      (error, token) => {
        if (error) {
          console.error("Internal error:", error);
          res.status(500).json({ err: "Internal failure" });
        } else {
          console.log("Token generated successfully:", token);
          res.status(200).json({ token: token });
        }
      }
    );
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ message: "Internal server error", error: e });
  }
};
