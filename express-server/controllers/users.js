import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"], // agar password tidak tampil
    });
    res.json(users);
  } catch (error) {
    res.json(error.message);
  }
};

const register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;

  if (password !== confPassword) {
    return res.status(400).json({
      message: "Password and confirm password not match",
    });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "User created failed",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Password did not match!");

    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const accessToken = jwt.sign({ name, email }, process.env.SECRET_TOKEN, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign({ name, email }, process.env.REFRESH_SECRET_TOKEN, {
      expiresIn: "1d",
    });

    // Menyimpan Refresh token pada database
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    // Menyimpan Refresh token pada Cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      // secure: true, if using https
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(400).json({
      message: "Email not found",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user) return res.sendStatus(204);

  const userId = user.id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  // Clear Cookies
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export { getUsers, register, login, logout };
