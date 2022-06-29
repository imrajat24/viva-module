import { useEffect, useState } from "react";

const CopySetScroll = ({ questionPaper, getSet }) => {
  const [sets, setSets] = useState();
  useEffect(() => {
    let temp = [];
    questionPaper.map((paper) => {
      temp.push(paper.set);
    });
    setSets(temp);
  }, [questionPaper]);

  return (
    <>
      {sets?.map((set, index) => {
        return (
          <div className="copy-card" key={index}>
            <h4>Set {set}</h4>
            <button
              className="btn btn-secondary btn-copy"
              onClick={() => getSet(set)}
            >
              copy set
            </button>
          </div>
        );
      })}
    </>
  );
};

export default CopySetScroll;
