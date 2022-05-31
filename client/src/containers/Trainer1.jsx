import { useRef } from "react";
import { SearchDropEmp, SearchDropSet } from "../components/SearchDrop";
import getDate from "../Methods/getDate";
const Trainer1 = () => {
  // global variables for name and email
  const input_name = useRef();
  const input_email = useRef();

  // importing date from the Date method
  const date = getDate();
  return (
    <>
      <div className="trainer1 row">
        <div className="trainer1_header">
          <div className="trainer1_header--1">
            <p>Hello Trainer,</p>
            <p>{date}</p>
          </div>
          <div className="trainer1_header--2">
            <p>
              Please enter the following details to Continue with the viva
              assesment
            </p>
          </div>
        </div>
        <form className="trainer1_form">
          <SearchDropEmp input_name={input_name} input_email={input_email} />
          <input
            type="text"
            className="trainer1_form-name"
            placeholder="Name"
            ref={input_name}
            disabled
          />
          <input
            type="email"
            className="trainer1_form-email"
            placeholder="Email"
            ref={input_email}
            disabled
          />
          <div className="trainer1_form-dropdownContainer">
            <SearchDropSet />
            <div className="trainer1_form-dropdownContainer-child2">
              <p>or</p>
              <button className="btn btn-light">Create A set</button>
            </div>
          </div>
          <div className="trainer1_form-btns">
            <button className="btn btn-primary">Start Viva</button>
            <button className="btn btn-secondary">Download Reports</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Trainer1;
