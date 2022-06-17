import VivaQuesBody from "../containers/VivaQuesBody";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Viva = ({ currentUser, currentSet, questionPaper, trainerId }) => {
  // ! variables and states
  const navigate = useNavigate();
  const [marks, setMarks] = useState();
  const [remarks, setRemarks] = useState([]);
  const [score, setScore] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  // * variables to store the answer object so that it can be passed in the DB through API
  const answerObject = [];
  let stepsObject = [];

  // ! selecting the current question paper from the list of question papers present in a course id..
  let selectedQuestionPaper = questionPaper?.find(
    (paper) => paper.set === currentSet
  );
  // ! functions and useeffect
  useEffect(() => {
    if (selectedQuestionPaper) {
      const newState = [];
      selectedQuestionPaper.questions.map((question) => {
        // * function to set the total marks of the selected question paper
        question.steps.map((step) => {
          setTotalMarks((prev) => prev + step.totalMarks);
        });
        // * function to set the marks scored by the user in the given question paper
        const emptyArray = [];
        for (let i = 0; i < question.steps.length; i++) {
          emptyArray.push(false);
        }
        newState.push(emptyArray);
      });
      setMarks(newState);
    }
  }, []);

  // * useeffect function to make the answer object
  useEffect(() => {
    if (selectedQuestionPaper) {
      selectedQuestionPaper.questions.map((question) => {
        let temp3 = {};
        let temp1 = [];
        question.steps.map((step) => {
          let temp2 = {};
          temp2.description = step.description;
          temp2.givenMarks = null;
          temp1.push(temp2);
        });
        stepsObject = temp1;
        temp3.steps = stepsObject;
        temp3.remarks = null;
        answerObject.push(temp3);
      });
    }
  }, []);

  //* function to set the state of the answers(passed in the vivaQues component via props)
  const setQues = (index, ques) => {
    let newAllQues = [];
    newAllQues = [...marks];
    newAllQues[index] = ques;
    setMarks(newAllQues);
  };

  // *function to redirect the app to the root page incase the questions are not loaded !
  const navigateHandler = () => {
    navigate("/");
  };

  // // !function to generate the answer sheet of the seleceted user when the continue button is pressed...
  // const generateAnswersheet = () => {
  //   axios.post("http://localhost:8080/answersheet", {
  //     courseId: "",
  //     set: "",
  //   });
  // };

  return selectedQuestionPaper ? (
    marks ? (
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
                key={index}
                question={question.questionStatement}
                steps={question.steps}
                index={index}
                marks={marks}
                setQues={setQues}
                score={score}
                setScore={setScore}
                answerObject={answerObject}
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
    ) : null
  ) : (
    navigateHandler()
  );
};
export default Viva;
