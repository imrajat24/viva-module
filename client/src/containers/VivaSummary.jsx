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
  const [ansUser, setAnsuser] = useState();

  // * state to store the total marks of the selected question paper
  const [totalScore, setTotalScore] = useState(0);

  // !useeffects and functions

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
      axios
        .get(
          `https://viva-module.herokuapp.com/answersheet/${courseId}/${currentUser.name}`
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
    } else navigate("/");
  }, [ansUser]);

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
          <Link to="/downloadReport">
            <button className="btn btn-primary">Complete Viva</button>
          </Link>
        </div>
      </div>
    </div>
  ) : null;
};

export default VivaSummary;
