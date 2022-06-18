import right from "../images/right.png";
import rightSelected from "../images/right-selected.png";
import { v4 as uuidv4 } from "uuid";

const VivaQuesBody = ({
  question,
  steps,
  index,
  marks,
  setQues,
  temp1,
  getRemarks,
}) => {
  return marks ? (
    <div className="viva_ques">
      <div className="ques_body viva-quesBody">
        <div className="ques_body-ques">
          <p className="ques">{question}</p>
        </div>

        <div className="ques_body-answers">
          {steps?.map((step, stepIndex) => {
            let temp2 = {};
            temp2.description = step.description;
            if (marks[index][stepIndex]) temp2.givenMarks = step.totalMarks;
            else temp2.givenMarks = 0;
            temp1.push(temp2);

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
            getRemarks(index, e.target.value);
          }}
        />
      </div>
    </div>
  ) : null;
};

export default VivaQuesBody;
