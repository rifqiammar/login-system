import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);
  jwt.verify(authorization, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.email;
    next();
  });
};
