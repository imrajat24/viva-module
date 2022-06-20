import Header from "../../containers/Header";
import VivaSummary from "../../containers/VivaSummary";
const VivaSummaryPage = ({
  courseId,
  currentUser,
  currentSet,
  trainerId,
  questionPaper,
}) => {
  return (
    <div>
      <Header />
      <VivaSummary
        courseId={courseId}
        currentUser={currentUser}
        currentSet={currentSet}
        trainerId={trainerId}
        questionPaper={questionPaper}
      />
    </div>
  );
};

export default VivaSummaryPage;
