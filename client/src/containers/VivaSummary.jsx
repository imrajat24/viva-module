import { Link } from "react-router-dom";
const VivaSummary = ({ currentUser, currentSet }) => {
  return (
    <div className="trainer1 row">
      <div className="viva_heading viva_summaryHeading">
        <h3>Viva summary</h3>
      </div>
      <div className="viva_contain trainer2">
        <div className="summary ques_body">
          <div className="summary_point">
            <span className="summary_point-heading">Employee code</span>
            <span className="summary_point-value">{currentUser.name}</span>
          </div>

          <div className="summary_point">
            <span className="summary_point-heading">name</span>
            <span className="summary_point-value">{currentUser.firstname}</span>
          </div>

          <div className="summary_point">
            <span className="summary_point-heading">email id </span>
            <span className="summary_point-value">{currentUser.email}</span>
          </div>

          <div className="summary_point">
            <span className="summary_point-heading">set number</span>
            <span className="summary_point-value">{currentSet}</span>
          </div>

          <div className="summary_point">
            <span className="summary_point-heading">marks obtained</span>
            <span className="summary_point-value">15/20</span>
          </div>
        </div>
        <div className="viva_btn">
          <Link to="/trainee">
            <button className="btn btn-primary">Complete Viva</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VivaSummary;
