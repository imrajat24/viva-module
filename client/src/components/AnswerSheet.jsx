import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../containers/Header";
import right from "../images/right.png";
import rightSelected from "../images/right-selected.png";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
const AnswerSheet = ({ getUserAnswer, trainerId, courseId }) => {
  const [userAnswer, setUseranswer] = useState();
  const [remarks, setRemarks] = useState();
  const [scoredMarks, setScoredMarks] = useState();
  // * function to get the status of the current user
  useEffect(() => {
    axios
      .get(
        `https://viva-module.herokuapp.com/viva/${courseId}/${getUserAnswer}`
      )
      .then((data) => {
        setUseranswer(data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "Entity does not exist");
      });
  }, [getUserAnswer]);

  // ! function
  useEffect(() => {
    if (userAnswer) {
      // ! extracting remarks
      let temp = [];
      let temp3 = [];
      userAnswer.answerSheet.answers.map((answer) => {
        temp.push(answer.remarks);
        setRemarks(temp);
        // !extracting marks scored
        const temp2 = [];
        answer.steps.map((step) => {
          temp2.push(step.givenMarks);
        });
        temp3.push(temp2);
        setScoredMarks(temp3);
      });
    }
  }, [userAnswer]);

  // ! take screenshot anf convert it to pdf
  const generateAnswersheet = () => {
    let id = document.getElementById("answer-sheet");
    html2canvas(id)
      .then((canvas) => {
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL("img/png", "1.0");
        const pdf = new jsPdf();
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("test.pdf");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      {userAnswer ? (
        <div id="answer-sheet" className="trainer1 row">
          <div className="viva_heading">
            <h3>
              Trainer Id: <span>{trainerId}</span>
            </h3>
            <h3>
              Employee Id: <span>{getUserAnswer}</span>
            </h3>
          </div>
          <div className="viva_contain trainer2">
            {userAnswer.questionPaper.questions.map((question, quesIndex) => {
              if (scoredMarks) {
                return (
                  <AnsSheetQuesBody
                    key={quesIndex}
                    question={question}
                    quesIndex={quesIndex}
                    remarks={remarks}
                    scoredMarks={scoredMarks}
                  />
                );
              }
            })}
            <div className="viva_btn">
              <button className="btn btn-primary" onClick={generateAnswersheet}>
                Download
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default AnswerSheet;

const AnsSheetQuesBody = ({ question, quesIndex, remarks, scoredMarks }) => {
  return remarks ? (
    <div className="viva_ques">
      <div className="ques_body viva-quesBody">
        <div className="ques_body-ques">
          <p className="ques">{question.questionStatement}</p>
        </div>

        <div className="ques_body-answers">
          {question.steps?.map((step, stepIndex) => {
            return (
              <div className="ques_body-answerss" key={stepIndex}>
                <p className="ans">{step.description}</p>
                <div className="viva-quesBody-answer-step">
                  <img
                    src={
                      scoredMarks[quesIndex][stepIndex] !== 0
                        ? rightSelected
                        : right
                    }
                    alt="right"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ques_body ques_body-remarks">
        <input
          type="text"
          placeholder="Remarks"
          defaultValue={remarks[quesIndex]}
        />
      </div>
    </div>
  ) : null;
};
