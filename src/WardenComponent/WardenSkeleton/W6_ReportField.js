import { useState } from "react";
import Strings from "../../StudentComponent/StudentsScreen/Strings.json";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const api_head = Strings.api;
const W6_ReportField = ({ updateTableData }) => {
  const [wselec, setWselect] = useState("");
  const [wOpen, setWopen] = useState(false);
  const [name, setName] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");

  const Altwardens = ["Student Tenure", "Defaulter", "Blocked"];

  const access_token = Cookies.get("ACCESS_TOKEN");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setSdate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEdate(e.target.value);
  };

  const handleWselect = (option) => {
    setWselect(option);
    setWopen(false);
  };

  const handleButton = async (access_token, user_id, start_date, end_date) => {
    const data = await get_studenet_tenure_wise_report(
      access_token,
      user_id,
      start_date,
      end_date
    );
    console.log(data);
    updateTableData(data);
  };

  const handleDownloadButton = async (
    access_token,
    user_id,
    start_date,
    end_date
  ) => {
    const data = await get_studenet_tenure_wise_report(
      access_token,
      user_id,
      start_date,
      end_date
    );
    generateExcel(data);
  };
  return (
    <div className="bg-background">
      <div className="bg-Items_bg p-4 mt-5 ms-5 me-5 mb-5 rounded-lg items-center ">
        <div>
          <h1 className="font-bold mb-2">Search Student</h1>
        </div>
        <div className="flex items-center flex-col sm:flex-row">
          <h1 className="me-2 font-bold">Student Info:</h1>
          <input
            type="text"
            className="me-2 p-2 rounded-lg"
            placeholder="Search Student"
          />
          <button className="bg-text-2 p-2 me-4 text-white rounded-lg mt-3 sm:mt-0">
            Get Complete Report
          </button>
          <button className="bg-text-2 p-2 text-white rounded-lg mt-3 sm:mt-0">
            Download Excel
          </button>
        </div>
      </div>

      <div className="bg-Items_bg p-4 rounded-lg ms-4 me-4">
        <div className="">
          <select className=" left-0 mt-2 py-2 w-40 bg-Items_bg font-bold  rounded-md shadow-lg z-10">
            {Altwardens.map((warden) => (
              <option
                className="bg-backgorund"
                onClick={() => handleWselect(`${warden}`)}
                key={warden}
              >
                {warden}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className="me-2 p-2 mt-4 rounded-lg"
            placeholder="Student UserID"
            value={name}
            onChange={handleNameChange}
          />

          <input
            type="text"
            className="me-2 p-2 mt-4 rounded-lg"
            placeholder="From Date  yyyy-mm-dd"
            value={sdate}
            onChange={handleStartDateChange}
          />

          <input
            type="text"
            className="me-2 p-2 mt-4 rounded-lg"
            placeholder="To Date yyyy-mm-dd"
            value={edate}
            onChange={handleEndDateChange}
          />

          <input
            type="text"
            className="me-2 p-2 mt-4 rounded-lg"
            placeholder="Select Status"
          />
        </div>
        <div className="mt-4 items-center">
          <button
            className="bg-text-2 p-2 me-4 text-white rounded-lg"
            onClick={() => handleButton(access_token, name, sdate, edate)}
          >
            Get Complete Report
          </button>
          <button
            className="bg-text-2 p-2 text-white rounded-lg"
            onClick={() => handleDownloadButton(access_token, name, sdate, edate)}
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};
export default W6_ReportField;

async function get_studenet_tenure_wise_report(
  access_token,
  user_id,
  start_date,
  end_date
) {
  const route = `/gatepass/v2/admin/tenure_wise_student_report/${user_id}/${start_date}/${end_date}`;
  const combined_api = api_head.concat(route);

  const data = await fetch(
    combined_api,
    {
      headers: {
        Authorization: access_token,
      },
    },
    []
  );
  const response = await data.json();
  return response;
}

function generateExcel(jsonData) {
  console.log(jsonData)
  try {
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "report.xlsx");
  } catch (error) {
    console.error("Error generating Excel:", error);
  }
}
