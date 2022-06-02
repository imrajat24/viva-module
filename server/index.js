const express = require("express");
const vivaRouter = require("./routes/Viva");
const questionPaperRouter = require("./routes/QuestionPaper");
const answerSheetRouter = require("./routes/AnswerSheet");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const DB_HOSTNAME = "localhost";
const DB_NAME = "spicejet";
mongoose.connect("mongodb://" + DB_HOSTNAME + "/" + DB_NAME);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

const app = express();
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/viva", vivaRouter);
app.use("/questionpaper", questionPaperRouter);
app.use("/answersheet", answerSheetRouter);

app.listen("8080", () => console.log("Listening on http://localhost:8080"));
