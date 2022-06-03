import TrainerPage from "./pages/Trainer/TrainerPage";
import CreateSetPage from "./pages/Trainer/CreateSetPage";
import DownloadReportPage from "./pages/Trainer/DownloadReportPage";
import VivaPage from "./pages/Trainer/VivaPage";
import VivaSummary from "./pages/Trainer/VivaSummaryPage";
import TraineePage from "./pages/Trainee/TraineePage";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<TrainerPage />} />
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
