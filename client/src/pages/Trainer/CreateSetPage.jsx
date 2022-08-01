import Header from "../../containers/Header";
import CreateSet from "../../containers/CreateSet";
const CreateSetPage = ({
  questionPaper,
  setquestionPaper,
  courseId,
  token,
}) => {
  return (
    <div>
      <Header />
      <CreateSet
        questionPaper={questionPaper}
        setquestionPaper={setquestionPaper}
        courseId={courseId}
        token={token}
      />
    </div>
  );
};

export default CreateSetPage;
