import { useState } from "react";
import getDate from "../Methods/getDate";
import rightSelected from "../images/tick.png";
import right from "../images/tick-select.png";
const Trainee1 = () => {
  const date = getDate();
  const [status, setStatus] = useState(2);
  const [tick, setTick] = useState(false);
  return (
    <div className="trainer1 trainee1">
      <div className="trainer1_header trainee1_header--1">
        <div className="trainer1_header--1">
          <p>Hello Trainee,</p>
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
