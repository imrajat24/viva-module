import { useState } from "react";
import { useRef } from "react";

const CreatesetQuesbody = ({ quesNum, quesPaper, setQuesPaper }) => {
  // ! useeffects and functions
  const getQuesRef = useRef();
  const [quesMarks, setquesMarks] = useState(0);

  //* function to add a new step in the UI
  const addNewStep = () => {
    const tempQues = { ...quesPaper };
    tempQues.questions[quesNum - 1].steps.push({
      description: "",
      totalMarks: 0,
    });
    setQuesPaper(tempQues);
  };

  // * function to delete the step from the UI
  const delStep = (i) => {
    const tempQues = { ...quesPaper };
    let temp = quesMarks;
    temp -= tempQues.questions[quesNum - 1].steps[i].totalMarks;
    tempQues.questions[quesNum - 1].steps.splice(i, 1);
    setQuesPaper(tempQues);
    setquesMarks(temp);
  };

  // * function to add the steps in the state
  const updateStep = (i, des, marks) => {
    const tempQues = { ...quesPaper };
    tempQues.questions[quesNum - 1].steps[i].description = des;
    tempQues.questions[quesNum - 1].steps[i].totalMarks = marks;
    setQuesPaper(tempQues);
  };

  // * function to update the ques statement in the state
  const updateQues = (i, statement) => {
    const tempQues = { ...quesPaper };
    tempQues.questions[quesNum - 1].questionStatement = statement;
    tempQues.questions[quesNum - 1].steps[i].totalMarks = quesMarks;
    setQuesPaper(tempQues);
  };

  // *function to calculate the total marks of the question by adding the marks of the all steps
  const addMarks = (x) => {
    let temp = quesMarks;
    temp += x;
    setquesMarks(temp);
  };

  // *function to delete the ques from the UI
  const deleteQues = () => {
    const tempQues = { ...quesPaper };
    tempQues.questions.splice(quesNum - 1, 1);
    setQuesPaper(tempQues);
  };

  return (
    <div className="ques_body">
      <div className="ques_body-ques">
        <div className="ques">
          <span> {quesNum}</span>
          <input
            type="text"
            placeholder="Enter Question Statement"
            ref={getQuesRef}
            onChange={(e) => updateQues(quesNum - 1, e.target.value)}
          />
        </div>
        <p className="marks">{quesMarks}</p>
      </div>
      {quesPaper.questions[quesNum - 1].steps.map((step, index) => (
        <div className="ques_body-answers " key={index}>
          <div className="answer">
            <input
              type="text"
              placeholder={`Enter Step-${index + 1}`}
              className="ans"
              onChange={(e) =>
                updateStep(
                  index,
                  e.target.value,
                  quesPaper.questions[quesNum - 1].steps[index].totalMarks
                )
              }
            />
            <input
              type="number"
              placeholder="Enter Marks"
              className="marks"
              onChange={(e) => {
                updateStep(
                  index,
                  quesPaper.questions[quesNum - 1].steps[index].description,
                  parseInt(e.target.value)
                );
              }}
              onBlur={(e) => {
                if (e.target.value !== "") addMarks(parseInt(e.target.value));
              }}
            />
          </div>
          {index === quesPaper.questions[quesNum - 1].steps.length - 1 ? (
            <div className="answer-btns">
              <button className="btn btn-light" onClick={addNewStep}>
                Add step
              </button>
              {index !== 0 ? (
                <button
                  className="btn btn-light"
                  onClick={() => delStep(index)}
                  key={index}
                >
                  delete step
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
      {quesNum - 1 === quesPaper.questions.length - 1 ? (
        <div className="ques_body-btns">
          {quesNum - 1 !== 0 ? (
            <button className="btn btn-secondary btn-copy" onClick={deleteQues}>
              delete Question
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default CreatesetQuesbody;

const Step = () => {
  return (
    <div className="ques_body-answer">
      <p className="ans">Step 1</p>
      <input type="number" placeholder="Marks" />
    </div>
  );
};
