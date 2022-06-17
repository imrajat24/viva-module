import Header from "../../containers/Header";
import Trainee1 from "../../containers/Trainee1";
const TraineePage = ({ status, setStatus, trainerId, traineeId, courseId }) => {
  return (
    <div>
      <Header />
      <Trainee1
        status={status}
        setStatus={setStatus}
        trainerId={trainerId}
        traineeId={traineeId}
        courseId={courseId}
      />
    </div>
  );
};

export default TraineePage;
