import right from "../images/right.png";
import rightSelected from "../images/right-selected.png";
import { v4 as uuidv4 } from "uuid";

const VivaQuesBody = ({
  question,
  steps,
  index,
  marks,
  setQues,
  score,
  setScore,
  answerObject,
}) => {
  console.log(answerObject);
  return marks ? (
    <div className="viva_ques">
      <div className="ques_body viva-quesBody">
        <div className="ques_body-ques">
          <p className="ques">{question}</p>
        </div>

        <div className="ques_body-answers">
          {steps?.map((step, stepIndex) => {
            return (
              <div className="ques_body-answer" key={uuidv4()}>
                <p className="ans">{step.description}</p>
                <div className="viva-quesBody-answer-step">
                  <img
                    src={marks[index][stepIndex] ? rightSelected : right}
                    alt="right"
                    onClick={() => {
                      const emptyArray = [...marks[index]];
                      emptyArray[stepIndex] = !emptyArray[stepIndex];
                      setQues(index, emptyArray);
                      // if (emptyArray[stepIndex])
                      //   setScore((prev) => prev + step.totalMarks);
                      // else if (!emptyArray[stepIndex])
                      //   setScore((prev) => prev - step.totalMarks);
                      answerObject.map((answer) => {
                        answer.steps.map((answerStep) => {
                          emptyArray[stepIndex]
                            ? (answerStep.givenMarks = step.totalMarks)
                            : (answerStep.givenMarks = 0);
                        });
                      });
                    }}
                  />
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
          onBlur={(e) => {
            answerObject.map((answer) => {
              answer.remarks = e.target.value;
            });
          }}
        />
      </div>
    </div>
  ) : null;
};

export default VivaQuesBody;
