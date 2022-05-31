import React from "react";

const QuesBody = () => {
  return (
    <div className="ques_body">
      <div className="ques_body-ques">
        <p className="ques">Question 1</p>
        <p className="marks">0</p>
      </div>

      <div className="ques_body-answers">
        <p className="ans">Step 1</p>
        <p className="marks">0</p>
      </div>
      <div className="ques_body-answers">
        <p className="ans">Step 2</p>
        <p className="marks">0</p>
      </div>
      <div className="ques_body-answers">
        <p className="ans">Step 3</p>
        <p className="marks">0</p>
      </div>

      <div className="ques_body-btns">
        <button className="btn btn-secondary btn-copy">Duplicate</button>
        <button className="btn btn-secondary btn-copy">delete</button>
      </div>
    </div>
  );
};

export default QuesBody;
