import { useEffect, useRef, useState } from "react";
import { SearchDropEmp, SearchDropSet } from "../components/SearchDrop";
import getDate from "../Methods/getDate";
import { Link } from "react-router-dom";
const Trainer1 = ({
  users,
  isLoading,
  courseId,
  trainerId,
  trainerName,
  token,
  questionPaper,
  currentUser,
  setcurrentUser,
  setcurrentSet,
}) => {
  //! global variables for name and email (passed via props)
  const input_name = useRef();
  const input_email = useRef();

  //! importing date from the Date method
  const date = getDate();

  //! component to render
  return (
    <>
      <div className="trainer1 row">
        {isLoading ? (
          <h3>Loading..</h3>
        ) : (
          <div>
            <div className="trainer1_header">
              <div className="trainer1_header--1">
                <p>Hello {trainerName},</p>
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
              <SearchDropEmp
                input_name={input_name}
                input_email={input_email}
                users={users}
                currentUser={currentUser}
                setcurrentUser={setcurrentUser}
              />
              <input
                type="text"
                className="trainer1_form-name"
                placeholder="Name"
                ref={input_name}
                disabled
                required
              />
              <input
                type="email"
                className="trainer1_form-email"
                placeholder="Email"
                ref={input_email}
                disabled
                required
              />
              <div className="trainer1_form-dropdownContainer">
                <SearchDropSet
                  questionPaper={questionPaper}
                  setcurrentSet={setcurrentSet}
                />
                <div className="trainer1_form-dropdownContainer-child2">
                  <p>or</p>
                  <Link to="/createSet">
                    <button className="btn btn-light">Create A set</button>
                  </Link>
                </div>
              </div>
              <div className="trainer1_form-btns">
                <Link to="/viva">
                  <button type="submit" className="btn btn-primary">
                    Start Viva
                  </button>
                </Link>
                <Link to="/downloadReport">
                  <button className="btn btn-secondary">
                    Download Reports
                  </button>
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Trainer1;
