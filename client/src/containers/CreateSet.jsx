import CopySetScroll from "../components/CopySetScroll";
import QuesBody from "../components/CreatesetQuesbody";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const CreateSet = ({ questionPaper, setquestionPaper, courseId, token }) => {
  const [isPaper, setIsPaper] = useState(false);
  const [copyCourseids, setCopycourseids] = useState();
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
      .post("https://viva-module.herokuapp.com/questionpaper/", quesPaper)
      .then(() => setIsPaper(true))
      .catch((error) => console.log(error));
  };

  // !for copying the existing set
  // * function to get the set number clicked by the trainer...
  const getSet = (set, id) => {
    const temp = questionPaper.filter(
      (paper) => paper.set === set && paper.courseId === id
    );
    setQuesPaper(temp[0]);
  };

  // * function to get the list of copy course id's
  useEffect(() => {
    axios
      .get(
        `https://spicelearnweb.xrcstaging.in/webservice/rest/server.php?wstoken=${token}&wsfunction=local_api_get_originalcourseid&moodlewsrestformat=json&courseid=${courseId}`
      )
      .then((res) => {
        // console.log(res.data.courseids);
        setCopycourseids(res.data.courseids);
      });
  }, [courseId]);

  // *function to add questions of the copy question papers into the main question state
  useEffect(() => {
    copyCourseids?.map((id) => {
      axios
        .get(`https://viva-module.herokuapp.com/questionpaper/${id.id}`)
        .then((res) => {
          console.log(res.data);
          const temp3 = [...questionPaper];
          // temp3.push(...res.data);
          res.data.map((quesPaper) => {
            const hasQp = temp3.find((qPaper) => {
              if (
                quesPaper.courseId == qPaper.courseId &&
                quesPaper.set == qPaper.set
              )
                return true;
            });
            if (hasQp == undefined) temp3.push(quesPaper);
          });
          setquestionPaper(temp3);
          console.log(questionPaper);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [copyCourseids]);
  console.log(questionPaper);

  return (
    <div className="trainer1 row">
      <div className="copyset-contain">
        <div className="createSetheading ">
          <h2>use existing set</h2>
        </div>
        <div className="copyset-contain_card">
          <CopySetScroll
            questionPaper={questionPaper}
            getSet={getSet}
            courseId={courseId}
          />
        </div>
      </div>

      <div className="divider createSetheading">
        <h2>or</h2>
      </div>

      {!isPaper ? (
        <div className="createSet_contain">
          <div className="createSetheading">
            <h2>create a new set</h2>
          </div>
          <div className="createSet_contain--set trainer2">
            <div className="createSet-inputs">
              <input
                type="text"
                placeholder={
                  quesPaper.questions[0].questionStatement === ""
                    ? "Set Number"
                    : quesPaper.set
                }
                value={
                  quesPaper.questions[0].questionStatement === ""
                    ? undefined
                    : quesPaper.set
                }
                onChange={(e) =>
                  updateData(e.target.value, quesPaper.trainingType)
                }
              />
              <input
                type="text"
                placeholder={
                  quesPaper.questions[0].questionStatement === ""
                    ? "Training Type"
                    : quesPaper.trainingType
                }
                value={
                  quesPaper.questions[0].questionStatement === ""
                    ? undefined
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
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateSet;
