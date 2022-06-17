import TrainerPage from "./pages/Trainer/TrainerPage";
import CreateSetPage from "./pages/Trainer/CreateSetPage";
import DownloadReportPage from "./pages/Trainer/DownloadReportPage";
import VivaPage from "./pages/Trainer/VivaPage";
import VivaSummary from "./pages/Trainer/VivaSummaryPage";
import TraineePage from "./pages/Trainee/TraineePage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  // !-------------------------------------------------------------------------------------------------------------------------------
  // ? Functions and methods required for the LMS
  //! getting the course id from mooddle (proper lms wala part could be done in future, abhi k liye we have hardcoded it...)
  const courseId = 546;

  //! getting the trainerid and trainer name from the system (proper lms wala part could be done in future, abhi k liye we have hardcoded it...)
  const trainerId = "12345";
  const traineeId = "bhavya";

  //! getting the admin token for API access
  const token = process.env.REACT_APP_ADMIN_TOKEN;

  //! to get the role of the user accessing the activity (proper lms wala part could be done in future, abhi k liye we have hardcoded it...)
  const role = "teacher";
  // useEffect(() => {
  //   axios
  //     .get(
  //       `spicelearnweb.xrcstaging.in/webservice/rest/server.php?wstoken=${token}&wsfunction=local_api_user_role&moodlewsrestformat=json&courseid=${courseId}&username=130281`
  //     )
  //     .then((data) => {
  //       console.log(data);
  //     });
  // });

  // !-------------------------------------------------------------------------------------------------------------------------------

  // ? Trainee 1 Component

  // ! States
  // * state to store the status of the trainee viva (Not Started: 0 , Inprogress:1, Waiting for Acknowledgement:2 and Completed:3)
  const [status, setStatus] = useState(0);

  // !-------------------------------------------------------------------------------------------------------------------------------

  // ? Trainer 1 Component

  //! States of the Trainer1 component
  //* all users with their basic details
  const [users, setUsers] = useState(null);

  //* Loading State
  const [isLoading, setisLoading] = useState(true);

  //! Functions and API Call's
  function getUsers() {
    axios
      .get(
        `https://spicelearnweb.xrcstaging.in/webservice/rest/server.php?wstoken=${token}&wsfunction=local_api_enrolled_user&moodlewsrestformat=json&courseid=${courseId}}`
      )
      .then((data) => {
        getRoles(data.data.users);
      });
  }

  function getRoles(users) {
    //* getting the roles from the api and then updating the array of users with their role in the specified course
    let trainees = [];
    let promises = [];
    let k = 0;
    let i = 1;
    users.map((user) => {
      const p = new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .get(
              `https://spicelearnweb.xrcstaging.in/webservice/rest/server.php?wstoken=${token}&wsfunction=local_api_user_role&moodlewsrestformat=json&courseid=${courseId}&username=${user.username}`
            )
            .then((data) => {
              resolve(null);
              if (data.data.roles[0].shortname === "student") {
                const trainee = {
                  name: user.username,
                  firstname: user.firstname,
                  email: user.email,
                  role: data.data.roles[0].shortname,
                };
                trainees.push(trainee);
              }
            })
            .catch((err) => console.log(err));
        }, k + 5);
      });
      promises.push(p);
      k += 5;
    });

    Promise.all(promises).then(() => {
      setUsers(trainees);
      setisLoading(false);
    });
  }

  // !-------------------------------------------------------------------------------------------------------------------------------

  // ? Search Drop Component

  // ! States of the SearchDrop Component
  // * state to store the total question papers that has been made in a given course id
  const [questionPaper, setquestionPaper] = useState([]);

  // * state to hold the current selected user ..
  const [currentUser, setcurrentUser] = useState();

  // * state to hold the selected set ..
  const [currentSet, setcurrentSet] = useState();

  // ! Functions and API calls

  function getQuestionPaper() {
    axios
      .get(`http://localhost:8080/questionpaper/${courseId}`)
      .then((data) => {
        setquestionPaper(data.data);
      })
      .catch((err) => console.log(err.response.data));
  }

  //! Use Effect hooks
  //* get all the users(including trainers and trainees) present in the current course
  useEffect(() => {
    getUsers();
    //* get the number of question papers in a course id (if exists)
    getQuestionPaper();
  }, []);

  return (
    <div className="App">
      <Routes>
        {role === "student" ? (
          <Route
            path="/"
            exact
            element={
              <TraineePage
                status={status}
                setStatus={setStatus}
                trainerId={trainerId}
                traineeId={traineeId}
                courseId={courseId}
              />
            }
          />
        ) : (
          <Route
            path="/"
            exact
            element={
              <TrainerPage
                users={users}
                isLoading={isLoading}
                courseId={courseId}
                trainerId={trainerId}
                token={token}
                questionPaper={questionPaper}
                currentUser={currentUser}
                setcurrentUser={setcurrentUser}
                currentSet={currentSet}
                setcurrentSet={setcurrentSet}
              />
            }
          />
        )}
        <Route path="/createSet" exact element={<CreateSetPage />} />
        <Route path="/downloadReport" exact element={<DownloadReportPage />} />
        <Route
          path="/viva"
          exact
          element={
            <VivaPage
              currentUser={currentUser}
              currentSet={currentSet}
              questionPaper={questionPaper}
              trainerId={trainerId}
            />
          }
        />
        <Route
          path="/summary"
          exact
          element={
            <VivaSummary currentUser={currentUser} currentSet={currentSet} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
