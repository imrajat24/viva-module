import { useState } from "react";
import getDate from "../Methods/getDate";
import rightSelected from "../images/tick.png";
import right from "../images/tick-select.png";
import { useEffect } from "react";
import axios from "axios";
import getSignDate from "../Methods/getSignDate";
const Trainee1 = ({ status, setStatus, traineeId, courseId }) => {
  // !-------------------------------------------------------------------------------------------------------------------------------
  // ? Functions and methods required for the LMS

  // * get the userid of the user using the application (hardcoding it for testing purposes..)

  // !-------------------------------------------------------------------------------------------------------------------------------

  //! States
  const [tick, setTick] = useState(false);
  const [viva, setViva] = useState();
  const [marks, setMarks] = useState();
  const [totalmarks, setTotalmarks] = useState();
  let [currentTime, setCurrentTime] = useState();

  // !-------------------------------------------------------------------------------------------------------------------------------

  // ! functions and methods

  // * function to get the status of the current user
  useEffect(() => {
    axios
      .get(`https://viva-module.herokuapp.com/viva/${courseId}/${traineeId}`)
      .then((data) => {
        setViva(data.data);
        setStatus(data.data.status);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.data.message === "Entity does not exist") setStatus(0);
      });
  }, []);

  // * function to set up the marks of the user

  useEffect(() => {
    if (viva) {
      let temp1 = 0;
      viva.answerSheet.answers.map((answer) => {
        answer.steps.map((step) => {
          temp1 += step.givenMarks;
        });
      });
      setMarks(temp1);
      let temp2 = 0;
      viva.questionPaper.questions.map((question) => {
        question.steps.map((step) => {
          temp2 += step.totalMarks;
        });
      });
      setTotalmarks(temp2);
    }
  }, [viva]);

  // * function to handle the acknowledgement of the user
  const acknowledgeHandler = () => {
    if (tick) {
      setStatus(3);
      setCurrentTime(new Date().toLocaleString());
      axios
        .put("https://viva-module.herokuapp.com/viva", {
          courseId: courseId.toString(),
          traineeId: traineeId.toString(),
          status: 3,
          traineeDate: Date.now(),
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const date = getDate();
  return (
    <div className="trainer1 trainee1">
      <div className="trainer1_header trainee1_header--1">
        <div className="trainer1_header--1">
          <p>Trainee Id: {traineeId}</p>
          <p>{date}</p>
        </div>
      </div>
      <div className="trainee1_header--2">
        {status === 0 ? (
          <p className="status_para">your viva is not started yet.</p>
        ) : status === 1 ? (
          <p className="status_para">your viva is in progress.</p>
        ) : status === 2 ? (
          <>
            <p className="status_para">your viva is completed.</p>
            <div className="trainee_viva-details">
              <p className="trainee_viva-marks">
                Marks Obtained: {marks}/{totalmarks}
              </p>
              <p className="trainee_viva-status">
                <img
                  src={tick ? right : rightSelected}
                  alt=""
                  onClick={() => setTick(!tick)}
                />
                <span>
                  I acknowledge that i have understood the assesment conducted
                  and accept the same.
                </span>
              </p>
              <button
                className="trainee_viva-btn btn btn-primary"
                onClick={acknowledgeHandler}
              >
                continue
              </button>
            </div>
          </>
        ) : (
          <div>
            <p className="status_para">
              Thanks for the acknowledgement. You can now exit the activity.
            </p>
            <p className="status_para">
              Date and Time of Acknowledgement:{" "}
              <b>{getSignDate(viva.traineeDate)} </b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trainee1;
