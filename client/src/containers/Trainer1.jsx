import { useEffect, useRef, useState } from "react";
import { SearchDropEmp, SearchDropSet } from "../components/SearchDrop";
import getDate from "../Methods/getDate";
import { Link } from "react-router-dom";
import axios from "axios";
import { faLariSign } from "@fortawesome/free-solid-svg-icons";
const Trainer1 = ({ courseId, userId, token }) => {
  //! States
  //* all users with their basic details
  const [users, setUsers] = useState([]);

  //* user's along with thier roles
  const [userRoles, setuserRoles] = useState([]);

  //* filerted array of trainee's
  const [trainee, setTrainee] = useState([]);

  //* Loading States
  const [isLoading1, setisLoading1] = useState(true);
  const [isLoading2, setisLoading2] = useState(true);

  //! API Call's

  function getUsers() {
    axios
      .get(
        `https://spicelearnweb.xrcstaging.in/webservice/rest/server.php?wstoken=${token}&wsfunction=local_api_enrolled_user&moodlewsrestformat=json&courseid=${courseId}}`
      )
      .then((data) => {
        setUsers(data.data.users);
      });
  }

  function getRoles() {
    //* getting the roles from the api and then making a new array of user with their role in the specified course
    let roles = [];
    let k = 0;
    users?.map((user) => {
      setTimeout(() => {
        axios
          .get(
            `https://spicelearnweb.xrcstaging.in/webservice/rest/server.php?wstoken=${token}&wsfunction=local_api_user_role&moodlewsrestformat=json&courseid=${courseId}&username=${user.username}`
          )
          .then((data) => {
            roles.push(data.data.roles[0].shortname);
            // setuserRoles((prev) => [
            //   ...prev,
            //   { ...user, role: data.data.roles[0].shortname },
            // ]);
            setisLoading1(false);
          })
          .catch((err) => console.log(err));
      }, 5 + k);
      k += 5;
    });

    setTimeout(() => {
      console.log(roles);
    }, 5 * users.length);
  }

  function filterTrainee() {
    setTrainee(userRoles?.filter((user) => user.role === "student"));
  }

  //! Use Effect hooks
  //* get all the users(including trainers and trainees) present in the current course
  useEffect(() => {
    getUsers();
  }, []);

  // //* get all the users along with the roles property in them
  useEffect(() => {
    getRoles();
  }, [users]);

  // //* get all the trainees(excluding trainers)
  useEffect(() => {
    filterTrainee();
  }, [userRoles]);

  //! global variables for name and email (passed via props)
  const input_name = useRef();
  const input_email = useRef();

  //! importing date from the Date method
  const date = getDate();

  //! component to render
  return (
    <>
      <div className="trainer1 row">
        {isLoading1 ? (
          <h3>Loading..</h3>
        ) : (
          <div>
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
              <SearchDropEmp
                input_name={input_name}
                input_email={input_email}
                trainee={trainee}
              />
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
                <SearchDropSet courseId={courseId} />
                <div className="trainer1_form-dropdownContainer-child2">
                  <p>or</p>
                  <Link to="/createSet">
                    <button className="btn btn-light">Create A set</button>
                  </Link>
                </div>
              </div>
              <div className="trainer1_form-btns">
                <Link to="/viva">
                  <button className="btn btn-primary">Start Viva</button>
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
