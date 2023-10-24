import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, decoded) => {
      if (err) return res.sendStatus(403);

      //   Jika berhasil
      const name = user.name;
      const email = user.email;
      const accessToken = jwt.sign({ name, email }, process.env.SECRET_TOKEN, { expiresIn: "15s" });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
