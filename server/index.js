const express = require("express");
const vivaRouter = require("./routes/Viva");
const questionPaperRouter = require("./routes/QuestionPaper");
const answerSheetRouter = require("./routes/AnswerSheet");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// const DB_HOSTNAME = "0.0.0.0";
// const DB_NAME = "spicejet";
mongoose
  // .connect("mongodb://" + DB_HOSTNAME + "/" + DB_NAME)
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@viva.kkyb8.mongodb.net/spicejet`
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Failed to connect to the database... " + error);
    console.log(process.env.DB_USER, process.env.DB_PASS);
  });

const app = express();
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/viva", vivaRouter);
app.use("/questionpaper", questionPaperRouter);
app.use("/answersheet", answerSheetRouter);

app.listen(process.env.PORT || "8080", () =>
  console.log("Listening on http://localhost:8080")
);
