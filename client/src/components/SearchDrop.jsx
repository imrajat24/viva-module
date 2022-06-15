import SelectSearch from "react-select-search";
import fuzzySearch from "../Methods/fuzzySearch";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

// !Employee ID's Dropdown
const SearchDropEmp = ({
  input_name,
  input_email,
  users,
  currentUser,
  setcurrentUser,
}) => {
  //* state to store the details of the selected user from the user list
  const [empCode, setempCode] = useState([]);

  function getEmail() {
    const newEmpCode = [];
    users?.map((user) => {
      newEmpCode.push({
        name: user.name,
        value: user.name,
        firstname: user.firstname,
        key: user.name,
      });
    });
    setempCode(newEmpCode);
  }

  useEffect(() => {
    getEmail();
  }, [users]);

  return (
    <div>
      <SelectSearch
        options={empCode}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Employee ID Not found!"
        placeholder="Select Employee ID"
        onChange={(e) => {
          const employee = users.find((v) => v.name === e);
          input_name.current.value = employee.firstname;
          input_email.current.value = employee.email;
          setcurrentUser(employee);
        }}
      />
    </div>
  );
};

// !Set Number's Dropdown
const SearchDropSet = ({ questionPaper, setcurrentSet }) => {
  // * state to store the sets from the question paper object in a specified format
  const [setNumber, setsetNumber] = useState([]);

  // *
  useEffect(() => {
    // ! extract the data from the question paper object to the set object
    questionPaper?.map((paper) => {
      setsetNumber((prev) => [...prev, { name: paper.set, value: uuidv4() }]);
    });
  }, [questionPaper]);

  return (
    <div>
      <SelectSearch
        options={setNumber}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Set Number Not found!"
        placeholder="Select Set Number"
        onChange={(e) => {
          const set = setNumber.find((v) => v.value === e);
          setcurrentSet(set.name);
        }}
      />
    </div>
  );
};

export { SearchDropEmp, SearchDropSet };
