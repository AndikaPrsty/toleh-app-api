const express = require("express");
const app = express();

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const tokoRouter = require("./routes/toko");

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/toko", tokoRouter);

app.listen(5000, () => {
  console.log("server running on http://localhost:5000");
});
