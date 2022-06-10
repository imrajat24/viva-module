import Header from "../../containers/Header";
import Trainee1 from "../../containers/Trainee1";
const TraineePage = ({ courseId, userId, token }) => {
  return (
    <div>
      <Header />
      <Trainee1 />
    </div>
  );
};

export default TraineePage;
