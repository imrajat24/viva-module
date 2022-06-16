import VivaQuesBody from "../containers/VivaQuesBody";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
const Viva = ({ currentUser, currentSet, questionPaper, trainerId }) => {
  // ! selecting the current question paper from the list of question papers present in a course id..
  let selectedQuestionPaper = questionPaper?.find(
    (paper) => paper.set === currentSet
  );
  const [allQues, setallQues] = useState();

  const setQues = (index, ques) => {
    let newAllQues = [];
    newAllQues = [...allQues];
    newAllQues[index] = ques;
    setallQues(newAllQues);
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
    setallQues(newState);
  }, []);
  return allQues ? (
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
              setQues={setQues}
              index={index}
              allQues={allQues}
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
