const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./routes/userRouter");
require("dotenv").config();
const session = require("express-session");

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server runnig on ${process.env.PORT}`);
});
