import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DownloadReports = ({ courseId }) => {
  const [userViva, setUserviva] = useState();
  const [marks, setMarks] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/viva/${courseId}`)
      .then((data) => {
        setUserviva(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (userViva) {
      let score;
      let temp = [];
      userViva.map((user) => {
        score = 0;
        user.answerSheet.answers.map((answer) => {
          answer.steps.map((step) => {
            score += step.givenMarks;
          });
        });
        temp.push(score);
      });
      setMarks(temp);
    }
  }, [userViva]);

  return userViva ? (
    <div className="trainer1 row">
      <div className="createSetheading">
        <h2>Download Reports</h2>
      </div>

      <div className="createSet_contain--set trainer2 table-contain">
        <div className="createSet-inputs searchContainer">
          <input type="text" placeholder="Search Emp Code" />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <table className="table ques_body">
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>viva status</th>
              <th>set number</th>
              <th>marks</th>
              <th>download report</th>
            </tr>
          </thead>
          <tbody>
            {userViva.map((user, index) => {
              return (
                <tr key={user.traineeId}>
                  <td>{user.traineeId}</td>
                  <td>
                    {user.status === 2
                      ? "acknowledgment pending"
                      : user.status === 3
                      ? "completed"
                      : null}
                  </td>
                  <td> {user.answerSheet.set}</td>
                  <td>{marks[index]}</td>
                  <td>
                    {user.status === 2 ? (
                      "Pending"
                    ) : user.status === 3 ? (
                      <button className="btn btn-light btn-report">
                        download
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="downloadReport-btn">
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Take Next Viva
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="trainer1 row">
        <div className="createSetheading">
          <h2>No Viva's taken</h2>
        </div>
      </div>
    </div>
  );
};

export default DownloadReports;
