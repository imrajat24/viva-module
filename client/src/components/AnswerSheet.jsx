import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../containers/Header";
import right from "../images/right.png";
import rightSelected from "../images/right-selected.png";
import { Link, useNavigate } from "react-router-dom";
const AnswerSheet = ({ getUserAnswer, trainerId, courseId }) => {
  const [userAnswer, setUseranswer] = useState();
  const [remarks, setRemarks] = useState();
  const [scoredMarks, setScoredMarks] = useState();
  const [updatedAnswers, setupdatedAnswers] = useState();
  const [updatedRemarks, setupdatedRemarks] = useState([]);
  const [showAnswersheet, setShowanswersheet] = useState(false);
  const navigate = useNavigate();
  // * variables to store the updted answer object so that it can be passed in the DB through API
  const updatedAnswerObject = [];

  useEffect(() => {
    setupdatedAnswers(scoredMarks);
    setupdatedRemarks(remarks);
  }, [scoredMarks, remarks]);
  // *function to get the updated marks
  const setUpdatedQues = (index, ques) => {
    let newAllQues = [];
    console.log(ques);
    newAllQues = [...updatedAnswers];
    newAllQues[index] = ques;
    setupdatedAnswers(newAllQues);
  };

  //* function to get the updated remarks
  const getUpdatedRemarks = (index, remarksObject) => {
    let newRemarks = [];
    newRemarks = [...remarks];
    newRemarks[index] = remarksObject;
    setupdatedRemarks(newRemarks);
  };
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

  // ! function to update the answersheet in the db
  // //* function to generate the answer sheet of the selected user when the continue button is pressed...
  const updateAnswersheet = () => {
    axios
      .put("https://viva-module.herokuapp.com/answersheet", {
        courseId: courseId.toString(),
        set: userAnswer.answerSheet.set.toString(),
        trainerId: trainerId.toString(),
        traineeId: getUserAnswer.toString(),
        answers: updatedAnswerObject,
      })
      .then((data) => navigate("/"))
      .catch((err) => console.log(err.response));
  };
  console.log(updatedAnswerObject);

  return (
    <div>
      <Header />
      {userAnswer && updatedRemarks ? (
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
              let temp3 = {};
              let temp1 = [];
              temp3.steps = temp1;
              temp3.remarks = updatedRemarks[quesIndex];
              updatedAnswerObject.push(temp3);
              if (scoredMarks) {
                return (
                  <AnsSheetQuesBody
                    key={quesIndex}
                    question={question}
                    quesIndex={quesIndex}
                    remarks={remarks}
                    scoredMarks={scoredMarks}
                    setUpdatedQues={setUpdatedQues}
                    updatedAnswers={updatedAnswers}
                    getUpdatedRemarks={getUpdatedRemarks}
                    temp1={temp1}
                  />
                );
              }
            })}
            <div className="viva_btn">
              <button className="btn btn-primary" onClick={updateAnswersheet}>
                Update Answersheet
              </button>
              <Link to="/downloadAns">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowanswersheet(!showAnswersheet)}
                >
                  View Answersheet
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default AnswerSheet;

const AnsSheetQuesBody = ({
  question,
  quesIndex,
  remarks,
  scoredMarks,
  setUpdatedQues,
  updatedAnswers,
  getUpdatedRemarks,
  temp1,
}) => {
  const [quesTotal, setQuesTotal] = useState();
  //! function to add the marks of each step
  useEffect(() => {
    const addMarks = () => {
      let temp = 0;
      question.steps?.map((step) => {
        temp += step.totalMarks;
      });
      setQuesTotal(temp);
    };
    addMarks();
  }, [question.steps]);
  return remarks ? (
    <div className="viva_ques">
      <div className="ques_body viva-quesBody">
        <div className="ques_body-ques">
          <p className="ques">{question.questionStatement}</p>
          <span>{quesTotal}</span>
        </div>

        <div className="ques_body-answers">
          {question.steps?.map((step, stepIndex) => {
            let temp2 = {};
            temp2.description = step.description;
            if (updatedAnswers) {
              if (updatedAnswers[quesIndex][stepIndex])
                temp2.givenMarks = step.totalMarks;
              else temp2.givenMarks = 0;
            }
            temp1.push(temp2);
            return (
              <div className="ques_body-answerss" key={stepIndex}>
                <p className="ans">{step.description}</p>
                <div className="viva-quesBody-answer-step">
                  <img
                    src={
                      updatedAnswers
                        ? updatedAnswers[quesIndex][stepIndex]
                          ? rightSelected
                          : right
                        : null
                    }
                    alt="right"
                    onClick={() => {
                      const emptyArray = [...updatedAnswers[quesIndex]];
                      emptyArray[stepIndex] = !emptyArray[stepIndex];
                      setUpdatedQues(quesIndex, emptyArray);
                    }}
                  />
                  <span className="viva-quesBody-answer-step--marks">
                    {step.totalMarks}
                  </span>
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
          onBlur={(e) => {
            getUpdatedRemarks(quesIndex, e.target.value);
          }}
        />
      </div>
    </div>
  ) : null;
};
