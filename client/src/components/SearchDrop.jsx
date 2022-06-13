import SelectSearch from "react-select-search";
import fuzzySearch from "../Methods/fuzzySearch";
import uniqueRandom from "unique-random";
import { useEffect, useState } from "react";

// Employee ID's Dropdown
const SearchDropEmp = ({ input_name, input_email, users }) => {
  //* state to store the details of the selected user from the user list
  const [currentEmp, setcurrentEmp] = useState([]);

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
    setcurrentEmp(newEmpCode);
  }

  useEffect(() => {
    getEmail();
  }, [users]);

  return (
    <div>
      <SelectSearch
        options={currentEmp}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Employee ID Not found!"
        placeholder="Select Employee ID"
        onChange={(e) => {
          const employee = users.find((v) => v.name === e);
          input_name.current.value = employee.firstname;
          input_email.current.value = employee.email;
        }}
      />
    </div>
  );
};

// Set Number's Dropdown
const SearchDropSet = ({ questionPaper }) => {
  // ! addding a random number for value key
  const random = uniqueRandom(1, 10);

  // * state to store the sets from the question paper object in a specified format
  const [setNumber, setsetNumber] = useState([]);

  // *
  useEffect(() => {
    // ! extract the data from the question paper object to the set object
    questionPaper?.map((paper) => {
      setsetNumber((prev) => [...prev, { name: paper.set, value: random() }]);
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
      />
    </div>
  );
};

export { SearchDropEmp, SearchDropSet };
