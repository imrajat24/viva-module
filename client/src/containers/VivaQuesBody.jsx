import { useEffect, useState } from "react";
import right from "../images/right.png";
import rightSelected from "../images/right-selected.png";
import { v4 as uuidv4 } from "uuid";

const VivaQuesBody = ({ question, steps, setQues, index, allQues }) => {
  return allQues ? (
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
                    src={allQues[index][stepIndex] ? rightSelected : right}
                    alt="right"
                    onClick={() => {
                      const emptyArray = [...allQues[index]];
                      emptyArray[stepIndex] = !emptyArray[stepIndex];
                      setQues(index, emptyArray);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ques_body ques_body-remarks">
        <input type="text" name="" id="" placeholder="Remarks" />
      </div>
    </div>
  ) : null;
};

export default VivaQuesBody;
