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
  //! getting the course id from mooddle (proper lms wala part could be done in future, abhi k liye we have hardcoded it...)
  const courseId = 52;

  //! getting the userId from the system (proper lms wala part could be done in future, abhi k liye we have hardcoded it...)
  const userId = 12345;

  //! getting the admin token for API access
  const token = process.env.REACT_APP_ADMIN_TOKEN;

  //! to get the role of the user accessing the activity
  // useEffect(() => {
  //   axios
  //     .get(
  //       `spicelearnweb.xrcstaging.in/webservice/rest/server.php?wstoken=${token}&wsfunction=local_api_user_role&moodlewsrestformat=json&courseid=${courseId}&username=130281`
  //     )
  //     .then((data) => {
  //       console.log(data);
  //     });
  // });

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <TrainerPage courseId={courseId} userId={userId} token={token} />
          }
        />
        <Route path="/createSet" exact element={<CreateSetPage />} />
        <Route path="/downloadReport" exact element={<DownloadReportPage />} />
        <Route path="/viva" exact element={<VivaPage />} />
        <Route path="/summary" exact element={<VivaSummary />} />
        <Route path="/trainee" exact element={<TraineePage />} />
      </Routes>
    </div>
  );
}

export default App;
