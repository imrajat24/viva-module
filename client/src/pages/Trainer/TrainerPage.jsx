import Header from "../../containers/Header";
import Trainer1 from "../../containers/Trainer1";
const TrainerPage = ({ courseId, userId, token }) => {
  return (
    <div>
      <Header />
      <Trainer1 courseId={courseId} userId={userId} token={token} />
    </div>
  );
};

export default TrainerPage;
