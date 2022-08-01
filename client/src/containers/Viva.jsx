import VivaQuesBody from "../containers/VivaQuesBody";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Viva = ({
  currentUser,
  currentSet,
  questionPaper,
  trainerId,
  courseId,
}) => {
  // ! variables and states
  const navigate = useNavigate();
  const [marks, setMarks] = useState();
  const [remarks, setRemarks] = useState([]);

  // * variables to store the answer object so that it can be passed in the DB through API
  const answerObject = [];
  // ! selecting the current question paper from the list of question papers present in a course id..
  let selectedQuestionPaper = questionPaper?.find(
    (paper) => paper.set === currentSet
  );

  // ! functions and useeffect
  useEffect(() => {
    if (selectedQuestionPaper) {
      const newState = [];
      selectedQuestionPaper.questions.map((question) => {
        // * function to set the marks scored by the user in the given question paper
        const emptyArray = [];
        for (let i = 0; i < question.steps.length; i++) {
          emptyArray.push(false);
        }
        newState.push(emptyArray);
      });
      setMarks(newState);
    } else navigate("/");
  }, []);

  // ! functions to get the values of the answer object in each question

  //* function to set the state of the answers(passed in the vivaQues component via props)
  const setQues = (index, ques) => {
    let newAllQues = [];
    newAllQues = [...marks];
    newAllQues[index] = ques;
    setMarks(newAllQues);
  };

  //* function to set the remarks of the answers(passed in the vivaQues component via props)
  const getRemarks = (index, remarksObject) => {
    let newRemarks = [];
    newRemarks = [...remarks];
    newRemarks[index] = remarksObject;
    setRemarks(newRemarks);
  };

  // //* function to generate the answer sheet of the selected user when the continue button is pressed...
  const generateAnswersheet = () => {
    axios
      .post("https://viva-module.herokuapp.com/answersheet", {
        courseId: courseId.toString(),
        set: currentSet.toString(),
        trainerId: trainerId.toString(),
        traineeId: currentUser.name.toString(),
        answers: answerObject,
      })
      .then((data) => navigate("/summary"))
      .catch((err) => console.log(err.response));
  };

  return marks ? (
    <div className="trainer1 row">
      <div className="viva_heading">
        <h3>
          Trainer Id: <span>{trainerId}</span>
        </h3>
        <h3>
          Employee Id: <span>{currentUser ? currentUser.name : ""}</span>
        </h3>
      </div>
      <div className="viva_contain trainer2">
        {selectedQuestionPaper.questions?.map((question, index) => {
          let temp3 = {};
          let temp1 = [];
          temp3.steps = temp1;
          temp3.remarks = remarks[index];
          answerObject.push(temp3);

          return (
            <VivaQuesBody
              question={question.questionStatement}
              steps={question.steps}
              key={index}
              index={index}
              marks={marks}
              setQues={setQues}
              temp1={temp1}
              getRemarks={getRemarks}
            />
          );
        })}
        <div className="viva_btn">
          <button className="btn btn-primary" onClick={generateAnswersheet}>
            continue
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
export default Viva;
