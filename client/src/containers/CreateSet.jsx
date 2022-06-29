import CopySetScroll from "../components/CopySetScroll";
import QuesBody from "../components/CreatesetQuesbody";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const CreateSet = ({ questionPaper, courseId }) => {
  const [isPaper, setIsPaper] = useState(false);
  const [tempKey, setTempKey] = useState(1);
  const navigate = useNavigate();
  // ! for creating a new question paper
  const [quesPaper, setQuesPaper] = useState({
    courseId: courseId.toString(),
    set: "",
    trainingType: "",
    questions: [
      {
        questionStatement: "",
        steps: [
          {
            description: "",
            totalMarks: 0,
          },
        ],
      },
    ],
  });
  // * function to add a new question in the UI
  const addNewQuestion = () => {
    const tempQues = { ...quesPaper };
    tempQues.questions.push({
      questionStatement: "",
      steps: [
        {
          description: "",
          totalMarks: 0,
        },
      ],
    });
    setQuesPaper(tempQues);
  };

  // * function to update the data in the question state
  const updateData = (data1, data2) => {
    const temp = { ...quesPaper };
    temp.set = data1;
    temp.trainingType = data2;
    setQuesPaper(temp);
  };

  // * function to add the set in the DB
  const addSet = () => {
    axios
      .post("http://localhost:8080/questionpaper/", quesPaper)
      .then(() => setIsPaper(true))
      .catch((error) => console.log(error));
  };

  // !for copying the existing set
  // * function to get the set number clicked by the trainer...
  const getSet = (x) => {
    const temp = questionPaper.filter((paper) => paper.set === x);
    setQuesPaper(temp[0]);
    console.log(temp[0]);
  };

  return (
    <div className="trainer1 row">
      <div className="copyset-contain">
        <div className="createSetheading ">
          <h2>use existing set</h2>
        </div>
        <div className="copyset-contain_card">
          <CopySetScroll questionPaper={questionPaper} getSet={getSet} />
        </div>
      </div>

      <div className="divider createSetheading">
        <h2>or</h2>
      </div>

      {!isPaper ? (
        <div className="createSet_contain" key={uuidv4()}>
          <div className="createSetheading">
            <h2>create a new set</h2>
          </div>
          <div className="createSet_contain--set trainer2">
            <div className="createSet-inputs">
              <input
                type="text"
                defaultValue={
                  quesPaper.questions[0].questionStatement === ""
                    ? "Set Name"
                    : quesPaper.set
                }
                onChange={(e) =>
                  updateData(e.target.value, quesPaper.trainingType)
                }
              />
              <input
                type="text"
                defaultValue={
                  quesPaper.questions[0].questionStatement === ""
                    ? "Type of Training"
                    : quesPaper.trainingType
                }
                onChange={(e) => updateData(quesPaper.set, e.target.value)}
              />
            </div>
            {quesPaper.questions.map((x, i) => (
              <QuesBody
                key={i}
                quesNum={i + 1}
                quesPaper={quesPaper}
                setQuesPaper={setQuesPaper}
                x={x}
              />
            ))}
            <div className="createSet_closing-btns">
              <button className="btn btn-secondary" onClick={addNewQuestion}>
                Add new question
              </button>
              <button className="btn btn-primary" onClick={addSet}>
                Create Set
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="creationSuccess trainer2">
          <p>
            You have successfully created the question paper. Click continue to
            go to the homepage.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateSet;
