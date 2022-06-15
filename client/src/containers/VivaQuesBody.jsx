import { useEffect, useState } from "react";
import right from "../images/right.png";
import rightSelected from "../images/right-selected.png";
import { v4 as uuidv4 } from "uuid";

const VivaQuesBody = ({ question, steps, getQuesStateHandler }) => {
  const [rightImg, setRightImg] = useState();

  useEffect(() => {
    const emptyArray = [];
    for (let i = 0; i < steps.length; i++) {
      emptyArray.push(false);
    }
    setRightImg(emptyArray);
  }, []);

  useEffect(() => {
    getQuesStateHandler(rightImg);
  }, [rightImg]);

  return rightImg ? (
    <div className="viva_ques">
      <div className="ques_body viva-quesBody">
        <div className="ques_body-ques">
          <p className="ques">{question}</p>
        </div>

        <div className="ques_body-answers">
          {steps?.map((step, index) => {
            return (
              <div className="ques_body-answer" key={uuidv4()}>
                <p className="ans">{step.description}</p>
                <div className="viva-quesBody-answer-step">
                  <img
                    src={rightImg[index] ? rightSelected : right}
                    alt="right"
                    onClick={() => {
                      const emptyArray = [...rightImg];
                      emptyArray[index] = !emptyArray[index];
                      setRightImg(emptyArray);
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
