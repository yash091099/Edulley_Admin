import React, { useEffect, useState } from "react";
import Overview from "./overviewInstute";
import UniversityStats from "./university-stats";
import Ranking from "./ranking";
import UniqueUniversityInfo from "./unique-university-info";
import { data } from "autoprefixer";
import { addInstitute, editInstitute } from "../context/services/client";
import toaster from "../Shared/toaster";
// import "./addInstitute.css";

const AddInstituteForm = ({
  initialFormData,
  openAddForm,
}) => {
  const [resetVersion, setResetVersion] = useState(0);
  const [formData, setFormData] = useState({
    overviewData: {
      universityName: initialFormData?.universityName || "",
      logo: initialFormData?.universityLogo || "",
      country: initialFormData?.country || "",
      city: initialFormData?.city || "",
      banner: initialFormData?.bannerImage || "",
      brochure: initialFormData?.brochure || "",
      overview: initialFormData?.overview || "",
      requirements: initialFormData?.admissionReq || "",
    },
    universityStatsData: {
      studentsPerStaff: initialFormData?.universityStats?.studentsPerStaff || 0,
      fulltimeStudents: initialFormData?.universityStats?.fulltimeStudents || 0,
      internationalStudentPercentage: initialFormData?.universityStats?.internationalStudentPercentage || 0,
      studentSatisfactionRate: initialFormData?.universityStats?.studentSatisfactionRate || 0,
    },
    uniqueUniversityInfoData: {
      image1: initialFormData?.uniqueUniversityInfo?.image1 || "",
      image2: initialFormData?.uniqueUniversityInfo?.image2 || "",
      image3: initialFormData?.uniqueUniversityInfo?.image3 || "",
      image4: initialFormData?.uniqueUniversityInfo?.image4 || "",      
    },
    rankingData: {
      logo: initialFormData?.ranking?.logo || "",
      name: initialFormData?.ranking?.name || "",
      rank: initialFormData?.ranking?.rank || "",
    },
  });

  const handleDataChange = (type, newData) => {
    setFormData((prev) => ({
      ...prev,
      [type]: newData,
    }));
  };

  const saveAllData = async (event) => {
    event.preventDefault();
    let  payload = {
      universityName: formData?.overviewData?.universityName,
      universityLogo: formData?.overviewData?.logo,
      country: formData?.overviewData?.country,
      city: formData?.overviewData?.city,
      bannerImage: formData?.overviewData?.banner,
      brochure: formData?.overviewData?.brochure,
      overview: formData?.overviewData?.overview,
      admissionReq: formData?.overviewData?.requirements,
      uniqueUniversityInfo: formData?.uniqueUniversityInfoData,
      universityStats: formData?.universityStatsData,
      ranking: formData?.rankingData,
    };


    // payload.universityStats.studentsPerStaff = Number(formData.universityStatsData.studentsPerStaff);
    // payload.universityStats.fulltimeStudents = Number(formData.universityStatsData.fulltimeStudents);
    // payload.universityStats.internationalStudentsPercentage = formData.universityStatsData.internationalStudentsPercentage?.toString();
    // payload.universityStats.studentSatisfactionRate = formData.universityStatsData.studentSatisfactionRate?.toString();
    console.log(payload, "payload");

    if (initialFormData) {
      payload.instituteId = initialFormData?._id;
    }


    const action = initialFormData ? editInstitute : addInstitute;
    action(payload)
      .then(() => {
        toaster.success(
          initialFormData
            ? "Institute updated successfully!"
            : "Institute added successfully!"
        );
        openAddForm();
        resetFormData();

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
    setResetVersion((v) => v + 1);
  };

  return (
    <>
      <Overview
        onDataChange={(data) => handleDataChange("overviewData", data)}
        initialData={formData?.overviewData}
        resetVersion={resetVersion}
      />
      <UniversityStats
        onDataChange={(data) => handleDataChange("universityStatsData", data)}
        initialData={formData?.universityStatsData}
        resetVersion={resetVersion}
      />
      <UniqueUniversityInfo
        onDataChange={(data) =>
          handleDataChange("uniqueUniversityInfoData", data)
        }
        initialData={formData?.uniqueUniversityInfoData}
        resetVersion={resetVersion}
      />
      <Ranking
        onDataChange={(data) => handleDataChange("rankingData", data)}
        initialData={formData?.rankingData}
        resetVersion={resetVersion}
      />
      <div className="button-container">
        <button
          style={{
            backgroundColor: "#FF6477",
            padding: "10px",
            borderRadius: "4px",
            color: "#fff",
            minWidth: "100px",
          }}
          className="saveButton"
          onClick={saveAllData}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AddInstituteForm;
