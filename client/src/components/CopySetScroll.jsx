import { useEffect, useState } from "react";

const CopySetScroll = ({ questionPaper, getSet, courseId }) => {
  // const [sets, setSets] = useState();
  // useEffect(() => {
  //   let temp = [];
  //   questionPaper.map((paper) => {
  //     temp.push(paper.set);
  //   });
  //   setSets(temp);
  // }, [questionPaper]);
  return questionPaper.length ? (
    <>
      {questionPaper?.map((paper, index) => {
        return (
          <div className="copy-card" key={index}>
            <h4>Set {paper.set}</h4>
            <h5>Course Id: {paper.courseId}</h5>
            <button
              className="btn btn-secondary btn-copy"
              onClick={() => getSet(paper.set, paper.courseId)}
            >
              copy set
            </button>
          </div>
        );
      })}
    </>
  ) : (
    <h2 className="noSet">No Sets Found</h2>
  );
};

export default CopySetScroll;
