import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getDate from "../Methods/getDate";

const DgcaAns = ({ getUserAnswer, courseId }) => {
  const [userAnswer, setUseranswer] = useState();
  const [remarks, setRemarks] = useState();
  const [scoredMarks, setScoredMarks] = useState();
  const navigate = useNavigate();

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

  console.log(userAnswer);
  console.log(remarks);
  console.log(scoredMarks);
  return userAnswer ? (
    <div className="row">
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
            Type of Training: Recurrent
          </div>
        </div>
        <div className="ansHeader-set">Set Number: A</div>
      </div>
      <table className="ansBody">
        <thead>
          <tr className="heading-1">
            <th width="70%" colSpan={2}>
              E.Code: {userAnswer.traineeId}
            </th>
            <th colSpan={2} style={{ textAlign: "left" }}>
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
          {userAnswer.questionPaper.questions.map((question) => {
            return (
              <>
                <tr className="questions">
                  <td style={{ textAlign: "left" }}>
                    {question.questionStatement}
                  </td>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    Total Marks
                  </td>
                </tr>
                {userAnswer.answerSheet.answers.map((answer) => {
                  return (
                    <>
                      {answer.steps.map((step) => {
                        console.log(step);
                        return (
                          <tr className="answers">
                            <td>{step.description}</td>
                            <td colSpan={2} style={{ textAlign: "center" }}>
                              {step.givenMarks}
                            </td>
                            <td style={{ textAlign: "center" }}>Total Marks</td>
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
                  );
                })}
              </>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="traineeAcknowledge">
            <td></td>
          </tr>
          <tr className="traineeAcknowledge"></tr>
        </tfoot>
      </table>
    </div>
  ) : null;
};

export default DgcaAns;
