import axios from "axios";
import { useState, useEffect } from "react";
import rightSelected from "../images/tick.png";
import right from "../images/tick-select.png";
import getDate from "../Methods/getDate";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
const DgcaAns = ({ getUserAnswer, courseId }) => {
  const [userAnswer, setUseranswer] = useState();
  const [remarks, setRemarks] = useState();
  const [scoredMarks, setScoredMarks] = useState();
  // * state to store the total marks of the selected question paper
  const [totalScore, setTotalScore] = useState(0);
  const [score, setScore] = useState(0);

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

  //! importing date from the Date method
  const date = getDate();

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

  // ! function to store the total score of the given answersheet
  useEffect(() => {
    let temp = 0;
    userAnswer?.questionPaper.questions.map((question) => {
      question.steps.map((step) => {
        // setTotalScore((prev) => prev + step.totalMarks);
        temp += step.totalMarks;
      });
    });
    setTotalScore(temp);
  }, [userAnswer]);

  // ! function to get the scored marks of the given answersheet
  useEffect(() => {
    let temp = 0;
    scoredMarks?.map((marks) => {
      console.log(marks);
      marks.map((score) => {
        console.log(score);
        // setScore((prev) => prev + score);
        temp += score;
      });
    });
    setScore(temp);
  }, [scoredMarks]);

  // ! take screenshot anf convert it to pdf
  const generateAnswersheet = () => {
    let id = document.getElementById("dgcaAnswer");
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

  return userAnswer ? (
    <div className="row" id="dgcaAnswer">
      <div className="ansHeader">
        <div className="ansHeader-logo">
          <img
            src="https://res.cloudinary.com/imrajat24/image/upload/v1659415535/SpiceJet-Logo-2048x1288_ppzelv.png"
            alt="spicejet-logo"
          />
        </div>
        <div className="ansHeader-2">
          <div className="ansHeader-2--heading">Viva Voice Assessment</div>
          <div className="ansHeader-2--trainingType">
            Type of Training: {userAnswer.questionPaper.trainingType}
          </div>
        </div>
        <div className="ansHeader-set">
          Set Number: {userAnswer.questionPaper.set}
        </div>
      </div>
      <table className="ansBody">
        <thead>
          <tr className="heading-1">
            <th width="70%" colSpan={2}>
              E.Code: {userAnswer.traineeId}
            </th>
            <th colSpan={2} style={{ textAlign: "center" }}>
              Date: {date}
            </th>
          </tr>
          <tr className="empty">
            <td colSpan={4} height="20"></td>
          </tr>
          <tr className="heading-2">
            <th colSpan={4} style={{ textAlign: "center" }}>
              Questions
            </th>
          </tr>
        </thead>
        <tbody>
          {userAnswer.questionPaper.questions.map((question, qindex) => {
            return (
              <>
                <tr className="questions">
                  <td colSpan={2} style={{ textAlign: "left" }}>
                    {question.questionStatement}
                  </td>
                  <td style={{ textAlign: "center" }}>Marks Scored</td>
                  <td style={{ textAlign: "center" }}>Total Marks</td>
                </tr>
                {userAnswer.answerSheet.answers.map((answer, aindex) => {
                  return qindex === aindex ? (
                    <>
                      {answer.steps.map((step, astepindex) => {
                        console.log(step);
                        return (
                          <tr className="answers">
                            <td>{step.description}</td>
                            <td colSpan={2} style={{ textAlign: "center" }}>
                              {step.givenMarks}
                            </td>
                            {question.steps.map((qstep, qstepindex) => {
                              console.log(qstep);
                              console.log(qstepindex);
                              return astepindex === qstepindex ? (
                                <td style={{ textAlign: "center" }}>
                                  {qstep.totalMarks}
                                </td>
                              ) : null;
                            })}
                          </tr>
                        );
                      })}
                      <tr
                        style={{
                          backgroundColor: "#F79646",
                          fontWeight: "600",
                        }}
                      >
                        <td colSpan={4}>Remarks: {answer.remarks}</td>
                      </tr>
                      <tr>
                        <td colSpan={4} height="20"></td>
                      </tr>
                    </>
                  ) : null;
                })}
              </>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="traineeAcknowledge">
            <td colSpan={4}>
              I acknowledge that i have understood the assesment conducted and
              accept the same on date <br />
              <img src={userAnswer.status ? right : rightSelected} alt="" />
            </td>
          </tr>
          <tr className="trainerAcknowledge">
            <td>
              <p>
                I Trainer Name accept that I have evaluated the same on date.
              </p>
              <div className="images">
                <img src={rightSelected} alt="" /> Pass
                <img src={rightSelected} alt="" /> Fail
              </div>
            </td>
            <td colSpan={3}>
              Marks Obtained: {score}/{totalScore}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="downloadAns">
        <button
          className="btn btn-primary"
          onClick={() => generateAnswersheet()}
        >
          Download
        </button>
      </div>
    </div>
  ) : null;
};

export default DgcaAns;
