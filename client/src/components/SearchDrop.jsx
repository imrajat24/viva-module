import SelectSearch from "react-select-search";
import fuzzySearch from "../Methods/fuzzySearch";
import { useState } from "react";

// Employee ID's Dropdown
const SearchDropEmp = ({ input_name, input_email }) => {
  const [emp, setEmp] = useState([
    {
      name: "12345",
      value: "rajat",
      email: "rajat@spicejet.com",
    },
    {
      name: "24312",
      value: "kamlesh",
      email: "kamlesh@spicejet.com",
    },
    {
      name: "54372",
      value: "binod",
      email: "binod@spicejet.com",
    },
    {
      name: "87654",
      value: "rakesh",
      email: "rakesh@spicejet.com",
    },
    {
      name: "56431",
      value: "gaurav",
      email: "gaurav@spicejet.com",
    },
    {
      name: "45361",
      value: "bhappa",
      email: "bhappa@spicejet.com",
    },
    {
      name: "75132",
      value: "prabhakar",
      email: "prabhakar@spicejet.com",
    },
    {
      name: "87654",
      value: "bhappi",
      email: "bhappi@spicejet.com",
    },
  ]);

  const [empCode, setEmpCode] = useState([
    {
      name: "12345",
      value: "12345",
    },
    {
      name: "24312",
      value: "24312",
    },
    {
      name: "54372",
      value: "54372",
    },
    {
      name: "56431",
      value: "56431",
    },
    {
      name: "45361",
      value: "45361",
    },
    {
      name: "75132",
      value: "75132",
    },
    {
      name: "87654",
      value: "87654",
    },
  ]);
  return (
    <div>
      <SelectSearch
        options={empCode}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Employee ID Not found!"
        placeholder="Select Employee ID"
        onChange={(e) => {
          console.log(e);
          const employee = emp.find((v) => v.name === e);
          console.log(employee);
          input_name.current.value = employee.value;
          input_email.current.value = employee.email;
        }}
      />
    </div>
  );
};

// Set Number's Dropdown
const SearchDropSet = ({ input_email }) => {
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
