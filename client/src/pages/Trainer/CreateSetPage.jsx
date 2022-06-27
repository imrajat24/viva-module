import Header from "../../containers/Header";
import CreateSet from "../../containers/CreateSet";
const CreateSetPage = ({ questionPaper, courseId }) => {
  return (
    <div>
      <Header />
      <CreateSet questionPaper={questionPaper} courseId={courseId} />
    </div>
  );
};

export default CreateSetPage;
