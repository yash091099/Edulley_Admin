import React from "react";
import TableButton from "./TableButton";
import StatusField from "./StatusField";
import NameFieldInstiture from "./NameFieldInstitute";

export default function InstitutionTable({ columns, data, mapping, fun, viewDetails }) {
  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="w-full overflow-x-auto border border-[#DBDADE] rounded-lg">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-3 text-left">
                  <div className="flex items-center gap-2">
                    <p style={{fontFamily:"Gilroy-Bold"}} className="text-[#4B465C] text-sm font-semibold truncate" title={column.name}>
                      {column.name}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-[#DBDADE] hover:bg-gray-50 transition-colors"
              >
                {mapping.map((key, keyIndex) => (
                  <td
                    key={keyIndex}
                    className="px-4 py-3"
                    onClick={() => fun(row)}
                  >
                    <div className="truncate" title={getTooltipContent(row, key)}>
                      {renderField(row, key, viewDetails, keyIndex, fun)}
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

function getTooltipContent(row, key) {
  if (key === "Tags") {
    return row[key]?.join(", ") || "";
  }
  return row[key]?.toString() || "";
}

function renderField(row, key, viewDetails, keyIndex, fun) {
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
      <div className="flex flex-wrap gap-1 max-w-full">
        {row["Tags"]?.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            style={{fontFamily:"Gilroy-Medium"}}
            className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 text-[#4B465C] rounded-full truncate max-w-[150px]"
            title={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    );
  } else if (key ==="brochure") {
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
  