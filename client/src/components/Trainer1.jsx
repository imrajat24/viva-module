import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
const Trainer1 = () => {
  // dummy states for the app

  // 1. random set numbers
  const [setNumbers, setSetNumbers] = useState([
    { set: "Set A", key: 1 },
    { set: "Set B", key: 2 },
    { set: "Set C", key: 3 },
    { set: "Set D", key: 4 },
  ]);

  // 2. random employee codes
  const [empCode, setEmpCode] = useState([
    {
      empCode: 12345,
      name: "rajat",
      email: "rajat@spicejet.com",
    },
    {
      empCode: 24312,
      name: "kamlesh",
      email: "kamlesh@spicejet.com",
    },
    {
      empCode: 54372,
      name: "binod",
      email: "binod@spicejet.com",
    },
  ]);

  // 3. to check if both the dropdown (empcode and setnumbers) are clicked or not
  const [isOpen, setIsOpen] = useState({ empCode: false, setNum: false });

  // 4. select the first element of the dropdown
  const [firstItem, setFirstItem] = useState(["Select Set Number"]);

  // function to retrieve the present date in the app
  const getDate = () => {
    let dateObj = new Date();
    let month = String(dateObj.getMonth() + 1).padStart(2, "0");
    let year = dateObj.getFullYear();
    let day = String(dateObj.getDate()).padStart(2, "0");
    let output = day + "/" + month + "/" + year;
    return output;
  };
  let date = getDate();

  return (
    <>
      <div className="trainer1">
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
          <input
            type="text"
            className="trainer1_form-empCode"
            placeholder="Employee Code"
          />
          <input
            type="text"
            className="trainer1_form-name"
            placeholder="Name"
          />
          <input
            type="email"
            className="trainer1_form-email"
            placeholder="Email"
          />
          <div className="trainer1_form-dropdownContainer">
            <div className="trainer1_form-dropdownContainer_misc"></div>
            <ul className="trainer1_form-dropdownContainer-child">
              <FontAwesomeIcon
                icon={isOpen.setNum ? faAngleUp : faAngleDown}
                className={isOpen.setNum ? "icn-up" : "icn-down"}
                onClick={() =>
                  setIsOpen({ empCode: isOpen.empCode, setNum: !isOpen.setNum })
                }
              ></FontAwesomeIcon>
              {isOpen.setNum ? (
                setNumbers.map((set) => (
                  <li
                    key={set.key}
                    onClick={(e) => {
                      let parent = e.target.parentNode;
                      let child = e.target;
                      parent.prepend(child);
                      setIsOpen({
                        empCode: isOpen.empCode,
                        setNum: !isOpen.setNum,
                      });
                      // setIsOpen({...isOpen,!isOpen.setNum});
                      setFirstItem([child.innerHTML]);
                    }}
                  >
                    {set.set}
                  </li>
                ))
              ) : (
                <li>{firstItem[0]}</li>
              )}
            </ul>
            <p>or</p>
            <button className="btn btn-light">Create A set</button>
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
