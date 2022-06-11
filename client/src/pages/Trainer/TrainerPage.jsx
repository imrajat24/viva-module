import Header from "../../containers/Header";
import Trainer1 from "../../containers/Trainer1";
const TrainerPage = ({ users, isLoading, courseId, userId, token }) => {
  return (
    <div>
      <Header />
      <Trainer1
        users={users}
        isLoading={isLoading}
        courseId={courseId}
        userId={userId}
        token={token}
      />
    </div>
  );
};

export default TrainerPage;
