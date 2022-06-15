import Header from "../../containers/Header";
import Viva from "../../containers/Viva";
const VivaPage = ({ currentUser, currentSet, questionPaper, trainerId }) => {
  return (
    <div>
      <Header />
      <Viva
        currentUser={currentUser}
        currentSet={currentSet}
        questionPaper={questionPaper}
        trainerId={trainerId}
      />
    </div>
  );
};

export default VivaPage;
