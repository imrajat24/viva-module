import Header from "../../containers/Header";
import VivaSummary from "../../containers/VivaSummary";
const VivaSummaryPage = ({ currentUser, currentSet }) => {
  return (
    <div>
      <Header />
      <VivaSummary currentUser={currentUser} currentSet={currentSet} />
    </div>
  );
};

export default VivaSummaryPage;
