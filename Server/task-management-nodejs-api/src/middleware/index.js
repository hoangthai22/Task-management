import jwt from "jsonwebtoken";

export function authenToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  // Beaer [token]

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
  } else {
    jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET, (err, data) => {
      if (err) res.sendStatus(403);
      next();
    });
  }
}
