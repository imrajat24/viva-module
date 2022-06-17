import { useState } from "react";
import getDate from "../Methods/getDate";
import rightSelected from "../images/tick.png";
import right from "../images/tick-select.png";
import { useEffect } from "react";
import axios from "axios";
const Trainee1 = ({ status, setStatus, trainerId, traineeId, courseId }) => {
  // !-------------------------------------------------------------------------------------------------------------------------------
  // ? Functions and methods required for the LMS

  // * get the userid of the user using the application (hardcoding it for testing purposes..)

  // !-------------------------------------------------------------------------------------------------------------------------------

  //! States
  const [tick, setTick] = useState(false);

  // !-------------------------------------------------------------------------------------------------------------------------------

  // ! functions and methods

  // * function to get the status of the current user
  useEffect(() => {
    axios
      .get(`http://localhost:8080/viva/${courseId}/${trainerId}/${traineeId}`)
      .then((data) => {
        setStatus(data.data.status);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.data.message === "Entity does not exist") setStatus(0);
      });
  }, []);

  // * method to get the currrent date
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
        ) : (
          <>
            <p className="status_para">your viva is completed.</p>
            <div className="trainee_viva-details">
              <p className="trainee_viva-marks">Marks Obtained: 15/20</p>
              <p className="trainee_viva-status">
                <img
                  src={tick ? right : rightSelected}
                  alt=""
                  onClick={() => {
                    setTick(!tick);
                  }}
                />
                <span>
                  I acknowledge that i have understood the assesment conducted
                  and accept the same.
                </span>
              </p>
              <button className="trainee_viva-btn btn btn-primary">
                continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Trainee1;
