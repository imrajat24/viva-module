import { useState } from "react";
import right from "../images/right.png";
import rightSelected from "../images/right-selected.png";
import wrong from "../images/wrong.png";
import wrongSelected from "../images/wrong-selected.png";
const QuesBody = () => {
  const [rightImg, setRightImg] = useState([true, true, true]);
  const [wrongImg, setWrongImg] = useState([true, true, true]);
  return (
    <div className="viva_ques">
      <div className="ques_body viva-quesBody">
        <div className="ques_body-ques">
          <p className="ques">Question 1</p>
        </div>

        <div className="ques_body-answers">
          <div className="ques_body-answer">
            <p className="ans">Step 1</p>
            <div className="viva-quesBody-answer-step">
              <img
                src={rightImg[0] ? right : rightSelected}
                alt="right"
                onClick={() =>
                  setRightImg([!rightImg[0], rightImg[1], rightImg[2]])
                }
              />
              <img
                src={wrongImg[0] ? wrong : wrongSelected}
                alt="wrong"
                onClick={() =>
                  setWrongImg([!wrongImg[0], wrongImg[1], wrongImg[2]])
                }
              />
            </div>
          </div>

          <div className="ques_body-answer">
            <p className="ans">Step 2</p>
            <div className="viva-quesBody-answer-step">
              <img
                src={rightImg[1] ? right : rightSelected}
                alt="right"
                onClick={() =>
                  setRightImg([rightImg[0], !rightImg[1], rightImg[2]])
                }
              />
              <img
                src={wrongImg[1] ? wrong : wrongSelected}
                alt="wrong"
                onClick={() =>
                  setWrongImg([wrongImg[0], !wrongImg[1], wrongImg[2]])
                }
              />
            </div>
          </div>
          <div className="ques_body-answer">
            <p className="ans">Step 3</p>
            <div className="viva-quesBody-answer-step">
              <img
                src={rightImg[2] ? right : rightSelected}
                alt="right"
                onClick={() =>
                  setRightImg([rightImg[0], rightImg[1], !rightImg[2]])
                }
              />
              <img
                src={wrongImg[2] ? wrong : wrongSelected}
                alt="wrong"
                onClick={() =>
                  setWrongImg([wrongImg[0], wrongImg[1], !wrongImg[2]])
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ques_body ques_body-remarks">
        <input type="text" name="" id="" placeholder="Remarks" />
      </div>
    </div>
  );
};

export default QuesBody;
