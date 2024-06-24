import React from "react";
import TableButton from "./TableButton";
import StatusField from "./StatusField";
import NameField from "./NameField";

export default function Table({
  columns,
  data,
  mapping,
  fun,
  viewDetails,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const perPage = 10;
  const startIndex = (currentPage - 1) * perPage;
  const selectedData = data?.slice(startIndex, startIndex + perPage);
  const displayStart = Math.min(startIndex + 1, data?.length);
  const displayEnd = Math.min(startIndex + perPage, data?.length);

  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="flex flex-col w-full h-full border border-[#DBDADE] rounded-lg overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-3 text-left">
                  <div className="flex items-center gap-2">
                    <p style={{fontFamily:"Gilroy-Bold"}} className="text-[#4B465C] text-sm font-semibold truncate" title={column?.name}>
                      {column?.name}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedData?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-[#DBDADE] hover:bg-gray-50 transition-colors"
              >
                {mapping.map((key, keyIndex) => (
                  <td key={keyIndex} className="px-4 py-3" onClick={() => fun(row, key)}>
                    <div className="truncate" title={getTooltipContent(row, key)}>
                      {renderField(row, key)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {!selectedData?.length && (
              <tr>
                <td colSpan={mapping.length} className="px-4 py-3 text-center">
                  <p style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C]/50 text-sm">
                    No data found
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data.length > 0 && (
        <div className="flex justify-between items-center">
          <p style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C]/50 text-sm">
            Showing {displayStart} to {displayEnd} of {data.length}
          </p>
          <div className="flex gap-1">
            {currentPage > 1 && (
              <TableButton
                label="<"
                action={() => setCurrentPage(Math.max(1, currentPage - 1))}
              />
            )}
            {[...Array(totalPages)].map((_, index) => (
              <TableButton
                key={index}
                label={index + 1}
                activeButton={currentPage === index + 1}
                action={() => setCurrentPage(index + 1)}
              />
            ))}
            {currentPage < totalPages && (
              <TableButton
                label=">"
                action={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const Badge = ({ text }) => (
  <span style={{fontFamily:"Gilroy-Medium"}} className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 text-[#4B465C] rounded-full truncate max-w-[150px]" title={text}>
    {text}
  </span>
);

function getTooltipContent(row, key) {
  switch (key) {
    case "tags":
      return row[key].join(", ");
    case "coursesName":
      return row[key].join(", ");
    default:
      return row[key] || "--";
  }
}

function renderField(row, key) {
  switch (key) {
    case "Status":
      return <StatusField label={row[key] || '--'} />;
    case "Name":
    case "fullName":
      return <NameField name={row[key] || '--'} />;
    case "date":
      const date = new Date(row[key]);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      return (
        <p style={{fontFamily:"Gilroy-Medium"}} className="text-sm text-[#4B465C]">
          {formattedDate || "--"}
        </p>
      );
    case "createdAt":
      return (
        <p style={{fontFamily:"Gilroy-Medium"}} className="text-sm text-[#4B465C]">
          {new Date(row[key]).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      );
    case "University Name":
      return <NameField name={row[key] || "--"} />;
    case "tags":
      return (
        <div className="flex flex-wrap gap-1 max-w-full">
          {row[key].map((tag, index) => (
            <Badge key={index} text={tag || "--"} />
          ))}
        </div>
      );
    case "coursesName":
      return (
        <div className="flex flex-wrap gap-1 max-w-full">
          {row[key].map((courseName, index) => (
            <p style={{fontFamily:"Gilroy-Medium"}}
              key={index}
              className="text-sm text-[#4B465C] truncate"
            >
              {index === row[key].length - 1 ? (courseName || '--') : `${courseName || '--'},`}
            </p>
          ))}
          {!row[key].length && <p style={{fontFamily:"Gilroy-Medium"}} className="text-sm text-[#4B465C]">--</p>}
        </div>
      );
    default:
      return (
        <p style={{fontFamily:"Gilroy-Medium"}} className="text-sm text-[#4B465C]">{row[key] || "--"}</p>
      );
  }
}