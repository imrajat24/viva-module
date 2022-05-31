import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const DownloadReports = () => {
  const [employees, SetEmployees] = useState([
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

  return (
    <div className="trainer1 row">
      <div className="createSetheading">
        <h2>Download Reports</h2>
      </div>

      <div className="createSet_contain--set trainer2 table-contain">
        <div className="createSet-inputs searchContainer">
          <input type="text" placeholder="Search Emp Code" />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <table className="ques_body table">
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>name</th>
              <th>viva status</th>
              <th>marks</th>
              <th>download report</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>user 1</td>
              <td> test 1</td>
              <td>Complete</td>
              <td>20</td>
              <td>
                <button className="btn btn-light btn-report">download</button>
              </td>
            </tr>
            <tr>
              <td>user 2</td>
              <td>test 2</td>
              <td>Complete</td>
              <td>17</td>
              <td>
                <button className="btn btn-light btn-report">download</button>
              </td>
            </tr>
            <tr>
              <td>user 3</td>
              <td>test 3</td>
              <td>Incomplete</td>
              <td>NA</td>
              <td>na </td>
            </tr>
            <tr>
              <td>user 4</td>
              <td>test 4</td>
              <td>complete</td>
              <td>15</td>
              <td>
                <button className="btn btn-light btn-report">download</button>
              </td>
            </tr>
            <tr>
              <td>user 5</td>
              <td>test 5</td>
              <td>incomplete</td>
              <td>Na</td>
              <td>na</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DownloadReports;
