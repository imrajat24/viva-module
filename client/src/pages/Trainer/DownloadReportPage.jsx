import Header from "../../containers/Header";
import DownloadReport from "../../containers/DownloadReports";
const DownloadReportPage = ({ users, courseId }) => {
  return (
    <div>
      <Header />
      <DownloadReport users={users} courseId={courseId} />
    </div>
  );
};

export default DownloadReportPage;
