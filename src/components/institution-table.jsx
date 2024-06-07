import React, { useState } from "react";
import TableButton from "./TableButton";
import upDark from "../assets/svg/up-icon-dark.svg";
import upLight from "../assets/svg/up-icon-light.svg";
import downDark from "../assets/svg/down-icon-dark.svg";
import downLight from "../assets/svg/down-icon-light.svg";
import StatusField from "./StatusField";
import NameFieldInstiture from "./NameFieldInstitute";



export default function InstitutionTable({ columns, data, mapping, fun, viewDetails }) {
  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="flex flex-col w-full h-full border border-[#DBDADE] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#DBDADE]">
              {columns.map((column, index) => (
                <th key={index}>
                  <div className="w-fit flex gap-8 items-center px-[0.7rem] py-[0.62rem]">
                    <p style={{fontFamily:"Gilroy-Bold"}} className="text-[#4B465C] text-[1rem] font-[600] tracking-[0.07813rem]">
                      {column.name}
                    </p>
                    <div>
                      <img
                        className="cursor-pointer w-[1rem] h-[14px] object-cover"
                        src={upDark}
                        alt={`Sort Ascending for ${column.name}`}
                      />
                      <img
                        className="cursor-pointer w-[1rem] h-[14px] object-cover"
                        src={downLight}
                        alt={`Sort Descending for ${column.name}`}
                      />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="cursor-pointer  border-y border-[#DBDADE]"
              >
                {mapping.map((key, keyIndex) => (
                  <td
                    key={keyIndex}
                    onClick={() => {
                      fun(row);
                    }}
                  >
                    <div className="w-fit flex gap-8 items-center px-[0.7rem] py-[0.62rem]">
                      {renderField(row, key, viewDetails, keyIndex , fun)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderField(row, key, viewDetails, keyIndex , fun) {
  if (key === "universityName") {
    return (
      <NameFieldInstiture
        name={row[key]}
        universityLogo={row["universityLogo"]}
        occupation={row["Occupation"]}
      />
    );
  } else if (key === "Status") {
    return <StatusField label={row[key]} />;
  } else if (key.trim() === "Tags") {
    return (
      <div className="flex flex-wrap gap-2">
        {row["Tags"]?.map((tag, tagIndex) => (
          <span style={{fontFamily:"Gilroy-Medium"}}

            key={tagIndex}
            className=" badge rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }
  else if (key ==="brochure") {
    return (
      <a
        href={row[key]}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        className="text-[#4B465C] text-[1.125rem] font-[400]"
        style={{ textDecoration: "underline" , fontFamily:"Gilroy-Medium"}}
      >
        view brochure
      </a>
    );
  }
    
   else {
    return <p style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C] text-[1.125rem] font-[400]">{row[key]}</p>;
  }
}
