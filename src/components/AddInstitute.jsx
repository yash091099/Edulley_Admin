import React, { useEffect, useState } from "react";
import Overview from "./overviewInstute";
import UniversityStats from "./university-stats";
import Ranking from "./ranking";
import UniqueUniversityInfo from "./unique-university-info";
import { data } from "autoprefixer";
import { addInstitute, editInstitute } from "../context/services/client";
import toaster from "../Shared/toaster";
// import "./addInstitute.css";

const AddInstituteForm = ({ initialFormData = null , openAddForm }) => {
  const [resetVersion, setResetVersion] = useState(0);
  const [formData, setFormData] = useState( {
    overviewData: {},
    universityStatsData: {},
    uniqueUniversityInfoData: {},
    rankingData: {},
  });


  
  const handleDataChange = (type, newData) => {
    setFormData(prev => ({
      ...prev,
      [type]: newData
    }));
  };
  

  const saveAllData = async (event) => {
    event.preventDefault();
    const payload = {
      universityName: formData?.overviewData?.universityName,
      universityLogo: formData?.overviewData?.logo,
      country: formData?.overviewData?.country,
      city: formData?.overviewData?.city,
      bannerImage: formData?.overviewData?.banner,
      brochure: formData?.overviewData?.brochure,
      overview: formData?.overviewData?.overview,
      admissionReq: formData?.overviewData?.requirements,
      universityStats: formData?.universityStatsData,
      uniqueUniversityInfo: formData?.uniqueUniversityInfoData,
      ranking: formData?.rankingData,
    };

    const action = initialFormData ? editInstitute : addInstitute;
    action(payload)
      .then(() => {
        toaster.success(
          initialFormData
            ? "Institute updated successfully!"
            : "Institute added successfully!"
        );
        resetFormData();
        openAddForm();
      })
      .catch((error) => {
        toaster.error(`Error: ${error.message}`);
      });
  };

  const resetFormData = () => {
    setFormData({
      overviewData: {},
      universityStatsData: {},
      uniqueUniversityInfoData: {},
      rankingData: {},
    });
    setResetVersion(v => v + 1);
  };

  return (
    <>
      <Overview onDataChange={data => handleDataChange('overviewData', data)} initialData={initialFormData} resetVersion={resetVersion} /> 
      <UniversityStats onDataChange={data => handleDataChange('universityStatsData', data)} initialData={initialFormData?.universityStats} resetVersion={resetVersion} />
      <UniqueUniversityInfo onDataChange={data => handleDataChange('uniqueUniversityInfoData', data)} initialData={initialFormData?.uniqueUniversityInfo} resetVersion={resetVersion} />
      <Ranking onDataChange={data => handleDataChange('rankingData', data)} initialData={initialFormData?.ranking} resetVersion={resetVersion} />
      <div className="button-container">
        <button  style={{backgroundColor:"#FF6477" ,padding:"10px",borderRadius:"4px",color:"#fff",minWidth:"100px"}}  className="saveButton" onClick={saveAllData}>
          Save
        </button>
      </div>
    </>
  );
};

export default AddInstituteForm;
