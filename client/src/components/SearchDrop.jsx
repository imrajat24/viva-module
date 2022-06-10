import SelectSearch from "react-select-search";
import fuzzySearch from "../Methods/fuzzySearch";
import { useEffect, useState } from "react";

// Employee ID's Dropdown
const SearchDropEmp = ({ input_name, input_email, trainee }) => {
  const [emp, setemp] = useState([]);
  const [empCode, setEmpCode] = useState([]);
  function getNames() {
    trainee?.map((user) =>
      setemp([
        ...emp,
        {
          name: user.username,
          value: user.firstname,
          email: user.email,
        },
      ])
    );
  }

  function getEmail() {
    emp?.map((data) => {
      setEmpCode([
        ...empCode,
        {
          name: data.name,
          value: data.value,
          keys: data.name,
        },
      ]);
    });
  }
  useEffect(() => {
    getNames();
  }, [trainee]);

  useEffect(() => {
    getEmail();
  }, [emp]);

  return (
    <div>
      <SelectSearch
        options={empCode}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Employee ID Not found!"
        placeholder="Select Employee ID"
        onChange={(e) => {
          const employee = emp.find((v) => v.value === e);
          input_name.current.value = employee.value;
          input_email.current.value = employee.email;
        }}
      />
    </div>
  );
};

// Set Number's Dropdown
const SearchDropSet = ({ courseId }) => {
  // fetching the number of sets in the particular course
  // useEffect(() => {
  //   axios.get(`http://localhost:8080/questionpaper/320`).then((data) => {
  //     console.log(data.data);
  //   });
  // }, []);

  // 1. random set numbers
  const [setNumbers, setSetNumbers] = useState([
    { name: "Set A", value: 1 },
    { name: "Set B", value: 2 },
    { name: "Set C", value: 3 },
    { name: "Set D", value: 4 },
  ]);

  return (
    <div>
      <SelectSearch
        options={setNumbers}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Set Number Not found!"
        placeholder="Select Set Number"
      />
    </div>
  );
};

export { SearchDropEmp, SearchDropSet };
