import { useEffect, useRef, useState } from "react";
import { SearchDropEmp, SearchDropSet } from "../components/SearchDrop";
import { useNavigate } from "react-router-dom";
import getDate from "../Methods/getDate";
import axios from "axios";
import { Link } from "react-router-dom";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
const Trainer1 = ({
  users,
  isLoading,
  courseId,
  trainerId,
  token,
  questionPaper,
  currentUser,
  setcurrentUser,
  currentSet,
  setcurrentSet,
}) => {
  //! global variables for name and email (passed via props)
  const input_name = useRef();
  const input_email = useRef();
  const navigate = useNavigate();

  // ! Funtion to handle the form validation
  const inputHandler = (e) => {
    //* form validation
    e.preventDefault();
    console.log(input_name, input_email);
    console.log(currentUser);
    if (input_name.current.value === "" || input_email.current.value === "")
      alert("Please select the id of the trainer");
    if (!currentSet) alert("Please select the set number from the dropdown");
    else {
      // navigate("/viva");
      // * creating the viva for the user of which details are selected
      axios
        .post("http://localhost:8080/viva", {
          courseId: courseId.toString(),
          trainerId: trainerId.toString(),
          traineeId: currentUser.name.toString(),
          status: 1,
        })
        .then((data) => {
          if (data.data.message === "Entity already exists") {
            const check =
              "Viva is already created for the selected user. Click OK to update or Cancel to ignore.";
            if (window.confirm(check)) navigate("/viva");
            else navigate("/");
          } else navigate("/viva");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
                <p>Trainer Id: {trainerId}</p>
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
                {/* <Link to=""> */}
                <button onClick={inputHandler} className="btn btn-primary">
                  Start Viva
                </button>
                {/* </Link> */}
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
