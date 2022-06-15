import VivaQuesBody from "../containers/VivaQuesBody";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
const Viva = ({ currentUser, currentSet, questionPaper, trainerId }) => {
  // ! selecting the current question paper from the list of question papers present in a course id..
  let selectedQuestionPaper = questionPaper?.find(
    (paper) => paper.set === currentSet
  );
  const [allQuesState, setAllQuesState] = useState();

  const getQuesStateHandler = (i) => {
    return (quesState) => {
      let newState = [];
      if (allQuesState) {
        newState = [...allQuesState];
        newState[i] = quesState;
        console.log(newState[i]);
        // setAllQuesState(newState);
      }
    };
  };

  // ! useeffect
  useEffect(() => {
    const newState = [];
    selectedQuestionPaper.questions.map((question) => {
      const emptyArray = [];
      for (let i = 0; i < question.steps.length; i++) {
        emptyArray.push(false);
      }
      newState.push(emptyArray);
    });
    setAllQuesState(newState);
  }, []);
  console.log(allQuesState);
  return allQuesState ? (
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
          return (
            <VivaQuesBody
              question={question.questionStatement}
              steps={question.steps}
              key={uuidv4()}
              getQuesStateHandler={getQuesStateHandler(index)}
            />
          );
        })}
        <div className="viva_btn">
          <Link to="/summary">
            <button className="btn btn-primary">continue</button>
          </Link>
        </div>
      </div>
    </div>
  ) : null;
};
export default Viva;
