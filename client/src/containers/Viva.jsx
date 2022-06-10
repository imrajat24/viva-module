import VivaQuesBody from "../containers/VivaQuesBody";
import { Link } from "react-router-dom";
const Viva = () => {
  return (
    <div className="trainer1 row">
      <div className="viva_heading">
        <h3>
          Trainer Name: <span>Test 1</span>
        </h3>
        <h3>
          Employee Code: <span>114402</span>
        </h3>
      </div>
      <div className="viva_contain trainer2">
        <VivaQuesBody />
        {/* <VivaQuesBody />
        <VivaQuesBody />
        <VivaQuesBody /> */}
        <div className="viva_btn">
          <Link to="/summary">
            <button className="btn btn-primary">continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Viva;
