import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import db from "./config/Database.js";
import router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;
// import Users from "./models/UserModel.js";

// Database connection Configuration
try {
  await db.authenticate();
  console.log("Database connection Success ");
  // Jika tidak ada table User, maka sequelize akan generate secara otomatis
  // Jika sudah di generate table maka hapus await User.sync()
  // await Users.sync();
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Router
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
