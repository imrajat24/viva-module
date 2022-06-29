import Header from "../../containers/Header";
import DownloadReport from "../../containers/DownloadReports";
const DownloadReportPage = ({ users, courseId, setGetuseranswer }) => {
  return (
    <div>
      <Header />
      <DownloadReport
        users={users}
        courseId={courseId}
        setGetuseranswer={setGetuseranswer}
      />
    </div>
  );
};

export default DownloadReportPage;
