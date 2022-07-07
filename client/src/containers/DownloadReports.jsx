import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DownloadReports = ({ courseId, setGetuseranswer }) => {
  const [userViva, setUserviva] = useState();
  const [marks, setMarks] = useState([]);
  let navigate = useNavigate();
  const [userVivaCopy, setUservivaCopy] = useState();
  // * function to get the viva of the users
  useEffect(() => {
    axios
      .get(`https://viva-module.herokuapp.com/viva/${courseId}`)
      .then((data) => {
        setUservivaCopy(data.data);
        setUserviva(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // * function to get the marks scored by the users in the viva
  useEffect(() => {
    if (userViva) {
      let temp = [];
      let score;
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

  // * function to get the filtered users from the list of all users

  const filterData = (e) => {
    let input = e.target.value;
    let temp1 = [];
    if (input !== "") {
      temp1 = userViva.filter((user) => user.traineeId.includes(input));
      setUserviva(temp1);
    } else {
      console.log(userVivaCopy);
      setUserviva(userVivaCopy);
    }
  };

  return userViva ? (
    <div className="trainer1 row">
      <div className="createSetheading">
        <h2>Download Reports</h2>
      </div>

      <div className="createSet_contain--set trainer2 table-contain">
        <div className="createSet-inputs searchContainer">
          <input
            type="text"
            placeholder="Search Emp Code"
            onChange={(e) => filterData(e)}
          />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <table className="table ques_body">
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>viva status</th>
              <th>set number</th>
              <th>marks</th>
              <th>View report</th>
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
                      <button
                        className="btn btn-light btn-report"
                        onClick={(e) => {
                          setGetuseranswer(user.traineeId);
                          navigate("/answerSheet");
                        }}
                      >
                        View
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
