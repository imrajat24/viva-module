import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const VivaSummary = ({
  courseId,
  currentUser,
  currentSet,
  trainerId,
  questionPaper,
}) => {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  // !useeffects and functions

  // * state to store the total marks of the selected question paper
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (currentUser) {
      // * get the total score from the questionpapers
      const selectedQuestionPaper = questionPaper.find((paper) => {
        return paper.set === currentSet;
      });
      console.log(questionPaper);
      console.log(selectedQuestionPaper);
      if (selectedQuestionPaper) {
        selectedQuestionPaper.questions.map((question) => {
          question.steps.map((step) => {
            setTotalScore((prev) => prev + step.totalMarks);
          });
        });
      }

      console.log(courseId, trainerId, currentUser.name);
      // * get the score from the answersheet
      setTimeout(() => {
        axios
          .get(
            `http://localhost:8080/answersheet/${courseId}/${trainerId}/${currentUser.name}`
          )
          .then((data) => {
            data.data.answers.map((answer) => {
              answer.steps.map((step) => {
                setScore((prev) => prev + step.givenMarks);
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }, 100);
    } else navigate("/");
  }, []);

  return currentUser ? (
    <div className="trainer1 row">
      <div className="viva_heading viva_summaryHeading">
        <h3>Viva summary</h3>
      </div>
      <div className="viva_contain trainer2">
        <div className="summary ques_body">
          <div className="summary_point">
            <span className="summary_point-heading">Employee code</span>
            <span className="summary_point-value">{currentUser.name}</span>
          </div>

          <div className="summary_point">
            <span className="summary_point-heading">name</span>
            <span className="summary_point-value">{currentUser.firstname}</span>
          </div>

          <div className="summary_point">
            <span className="summary_point-heading">email id </span>
            <span className="summary_point-value">{currentUser.email}</span>
          </div>

          <div className="summary_point">
            <span className="summary_point-heading">set number</span>
            <span className="summary_point-value">{currentSet}</span>
          </div>

          <div className="summary_point">
            <span className="summary_point-heading">marks obtained</span>
            <span className="summary_point-value">
              {score}/{totalScore}
            </span>
          </div>
        </div>
        <div className="viva_btn">
          <Link to="/trainee">
            <button className="btn btn-primary">Complete Viva</button>
          </Link>
        </div>
      </div>
    </div>
  ) : null;
};

export default VivaSummary;
