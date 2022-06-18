import Header from "../../containers/Header";
import Viva from "../../containers/Viva";
const VivaPage = ({
  currentUser,
  currentSet,
  questionPaper,
  trainerId,
  courseId,
}) => {
  return (
    <div>
      <Header />
      <Viva
        currentUser={currentUser}
        currentSet={currentSet}
        questionPaper={questionPaper}
        trainerId={trainerId}
        courseId={courseId}
      />
    </div>
  );
};

export default VivaPage;
