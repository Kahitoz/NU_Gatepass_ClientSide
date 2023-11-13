import { useState } from "react";
import StudentNavbar from "../StudentSkeleton/S1_Navbar";
import StudentSubNavbar from "../StudentSkeleton/S2_SubNavbar";
import LocalFixedForm from "./LocalFixed/localfixedform";
import LocalFlexibleForm from "./LocalFlexible/localflexibleform";
import OutStationForm from "./Outstation/outstationform";
import EmergencyForm from "./Emergency/emergencyForm";
import NonReturnAbleForm from "./NonReturnable/nonreturnableform";
import VisitorForm from "./Visitor/VisitorForm";
const GatepassDropDown = () => {
  const [selectedOption, setSelectedOption] = useState("localfixed");

  const handleSelectedOption = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div>
        <StudentNavbar />
      </div>
      <div>
        <StudentSubNavbar />
      </div>

      <div className="text-center sm:text-left sm:ms-2">
        <select
          id="dropdown"
          name="dropdown"
          value={selectedOption}
          onChange={handleSelectedOption}
          className="p-2 rounded-lg border border-red-100 mt-2 shadow-sm"
        >
          <option value="localfixed">Local Fixed</option>
          <option value="localflexible">Local Flexible</option>
          <option value="outstation">Outstation</option>
          <option value="emergency">Emergency</option>
          <option value="NonReturnable">Non Returnable</option>
          <option value="visitor">Visitor</option>
        </select>
        <div className="mt-4  ">
          {selectedOption == "localfixed" && <LocalFixedForm />}
          {selectedOption == "localflexible" && <LocalFlexibleForm />}
          {selectedOption == "outstation" && <OutStationForm />}
          {selectedOption == "emergency" && <EmergencyForm />}
          {selectedOption == "NonReturnable" && <NonReturnAbleForm/>}
          {selectedOption == "visitor" && <VisitorForm/>}
        </div>
      </div>
    </>
  );
};
export default GatepassDropDown;
