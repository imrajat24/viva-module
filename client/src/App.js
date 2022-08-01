import TrainerPage from "./pages/Trainer/TrainerPage";
import CreateSetPage from "./pages/Trainer/CreateSetPage";
import DownloadReportPage from "./pages/Trainer/DownloadReportPage";
import VivaPage from "./pages/Trainer/VivaPage";
import VivaSummaryPage from "./pages/Trainer/VivaSummaryPage";
import TraineePage from "./pages/Trainee/TraineePage";
import AnswerSheet from "./components/AnswerSheet";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// import { scormLogic } from "./Methods/scromLogic";
import axios from "axios";
function App() {
  //! getting the admin token for API access
  const token = process.env.REACT_APP_ADMIN_TOKEN;
  // !-------------------------------------------------------------------------------------------------------------------------------
  // ? Functions and methods required for the LMS

  //! getting the course id from mooddle (proper lms wala part could be done in future, abhi k liye we have hardcoded it...)
  // let [userId, scormId] = scormLogic(471);
  let [userId, scormId] = ["deptadmin_inf", 471];
  const [role, setRole] = useState(null);
  const [courseId, setCourseId] = useState(546);
  const [traineeId, settraineeId] = useState("bhavya");
  const [trainerId, settrainerId] = useState("deptadmin_inf");
  console.log(courseId, userId);
  useEffect(() => {
    axios
      .get(
        `https://spicelearnweb.xrcstaging.in/webservice/rest/server.php?wstoken=${token}&wsfunction=local_api_get_courseid&moodlewsrestformat=json&scormid=${scormId}`
      )
      .then((data) => {
        console.log(data.data);
        setCourseId(data.data.courseid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    tryFunc();
  }, [courseId]);

  const tryFunc = () => {
    console.log(courseId, userId);
    if (courseId) {
      axios
        .get(
          `https://spicelearnweb.xrcstaging.in/webservice/rest/server.php?wstoken=${token}&wsfunction=local_api_user_role&moodlewsrestformat=json&courseid=${courseId}&username=${userId}`
        )
        .then((data) => {
          console.log(data.data);
          if (data.data.roles[0].shortname === "student") {
            settraineeId(userId);
            setRole("student");
            console.log(role);
          } else {
            settrainerId(userId);
            setRole("teacher");
            console.log(role);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    tryFunc2();
  }, [role]);
  const tryFunc2 = () => {
    console.log(role, traineeId, trainerId);
    getUsers();
    //* get the number of question papers in a course id (if exists)
    getQuestionPaper();
    console.log(role, traineeId, trainerId);
  };

  //! getting the trainerid and trainer name from the system (proper lms wala part could be done in future, abhi k liye we have hardcoded it...)
  // let role;
  // let traineeId;
  // let trainerId;
  // console.log(courseId);
  // useEffect(() => {
  //   if (courseId) {
  //     axios
  //       .get(
  //         `https://spicelearnweb.xrcstaging.in/webservice/rest/server.php?wstoken=${token}&wsfunction=local_api_user_role&moodlewsrestformat=json&courseid=${courseId}&username=${userId}`
  //       )
  //       .then((data) => {
  //         console.log(data.data);
  //         if (data.data.roles[0].shortname === "student") {
  //           traineeId = userId;
  //           role = "student";
  //         } else {
  //           trainerId = userId;
  //           role = "teacher";
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [courseId]);

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

  // !-------------------------------------------------------------------------------------------------------------------------------

  // ? AnswerSheet Component

  const [getUserAnswer, setGetuseranswer] = useState();

  // !-------------------------------------------------------------------------------------------------------------------------------

  function getRoles(users) {
    //* getting the roles from the api and then updating the array of users with their role in the specified course
    let trainees = [];
    let promises = [];
    let k = 0;
    let i = 1;
    users?.map((user) => {
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

  // * function to get the question papers present in a particular course id..
  function getQuestionPaper() {
    axios
      .get(`https://viva-module.herokuapp.com/questionpaper/${courseId}`)
      .then((data) => {
        setquestionPaper(data.data);
      })
      .catch((err) => console.log(err.response.data));
  }

  //! Use Effect hooks
  //* get all the users(including trainers and trainees) present in the current course
  // useEffect(() => {
  //   getUsers();
  //   //* get the number of question papers in a course id (if exists)
  //   getQuestionPaper();
  // }, []);

  return role ? (
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
        <Route
          path="/createSet"
          exact
          element={
            <CreateSetPage
              questionPaper={questionPaper}
              setquestionPaper={setquestionPaper}
              courseId={courseId}
              token={token}
            />
          }
        />
        <Route
          path="/downloadReport"
          exact
          element={
            <DownloadReportPage
              courseId={courseId}
              setGetuseranswer={setGetuseranswer}
            />
          }
        />
        <Route
          path="/viva"
          exact
          element={
            <VivaPage
              currentUser={currentUser}
              currentSet={currentSet}
              questionPaper={questionPaper}
              trainerId={trainerId}
              courseId={courseId}
            />
          }
        />
        <Route
          path="/summary"
          exact
          element={
            <VivaSummaryPage
              courseId={courseId}
              currentUser={currentUser}
              currentSet={currentSet}
              trainerId={trainerId}
              questionPaper={questionPaper}
            />
          }
        />
        <Route
          path="/answerSheet"
          exact
          element={
            <AnswerSheet
              getUserAnswer={getUserAnswer}
              trainerId={trainerId}
              courseId={courseId}
            />
          }
        />
      </Routes>
    </div>
  ) : (
    <h2 className="roleLoading">User Role Not Found....</h2>
  );
}

export default App;
