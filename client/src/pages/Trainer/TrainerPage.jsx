import Header from "../../containers/Header";
import Trainer1 from "../../containers/Trainer1";
const TrainerPage = ({
  users,
  isLoading,
  courseId,
  trainerId,
  token,
  questionPaper,
  currentUser,
  setcurrentUser,
  currentSet,
  setcurrentSet,
}) => {
  return (
    <div>
      <Header />
      <Trainer1
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
    </div>
  );
};

export default TrainerPage;
