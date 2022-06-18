import Header from "../../containers/Header";
import VivaSummary from "../../containers/VivaSummary";
const VivaSummaryPage = ({
  courseId,
  currentUser,
  currentSet,
  trainerId,
  totalScore,
}) => {
  return (
    <div>
      <Header />
      <VivaSummary
        courseId={courseId}
        currentUser={currentUser}
        currentSet={currentSet}
        trainerId={trainerId}
        totalScore={totalScore}
      />
    </div>
  );
};

export default VivaSummaryPage;
