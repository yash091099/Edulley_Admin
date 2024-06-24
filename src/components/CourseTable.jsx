import React from 'react';
import TableButton from "./TableButton";
import StatusField from './StatusField';
import NameFieldCourse from "./CourseNameField";

export default function CourseTable({ component, columns, data, mapping, fun, viewDetails, currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="w-full overflow-x-auto border border-[#DBDADE] rounded-lg">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-12 pl-4 pr-2 py-3"></th>
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-3 text-left">
                  <p style={{fontFamily:"Gilroy-Bold"}} className="text-[#4B465C] text-sm font-semibold truncate" title={column?.name}>
                    {column?.name}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} style={{fontFamily:"Gilroy-Bold"}} className="text-center py-4 text-[#4B465C] text-sm">No {component} found</td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-[#DBDADE] hover:bg-gray-50 transition-colors">
                  <td className="w-12 pl-4 pr-2 py-3"></td>
                  {mapping.map((key, keyIndex) => (
                    <td key={keyIndex} className="px-4 py-3" onClick={() => fun(row, keyIndex)}>
                      <div className="truncate" title={getTooltipContent(row, key)}>
                        {renderField(row, key, keyIndex)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
        <p style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C]/50 text-sm">
          {data.length > 0 ? (
            `Showing 1 to ${Math.min(data?.length, currentPage * 10)} of ${totalPages * 10}`
          ) : (
            `No data found`
          )}
        </p>
        <div className="flex flex-wrap justify-center gap-1">
          {currentPage > 1 && <TableButton label="<" action={() => setCurrentPage(currentPage - 1)} />}
          {[...Array(totalPages)].map((_, index) => (
            <TableButton key={index} label={index + 1} activeButton={currentPage === index + 1} action={() => setCurrentPage(index + 1)} />
          ))}
          {currentPage < totalPages && <TableButton label=">" action={() => setCurrentPage(currentPage + 1)} />}
        </div>
      </div>
    </div>
  );
}

function getTooltipContent(row, key) {
  return row[key]?.toString() || '';
}

function renderField(row, key, keyIndex) {
  switch (key) {
    case "Status":
      return <StatusField label={row[key]} />;
    case "Course Name":
    case "Name":
      return <NameFieldCourse name={row[key]} />;
    case "name":
      return <p style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C] text-sm">{row[key]}</p>;
    case "duration":
      return <p style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C] text-sm">{row[key]} years</p>;
    case "deadline":
      return <p style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C] text-sm">{row[key]?.split("T")[0]}</p>;
    default:
      return <p style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C] text-sm">{row[key]}</p>;
  }
}