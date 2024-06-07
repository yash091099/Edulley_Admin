import React from 'react';
import TableButton from "./TableButton";
import StatusField from './StatusField';
import NameFieldCourse from "./CourseNameField";

export default function CourseTable({ component , columns, data, mapping, fun, viewDetails, currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="flex flex-col w-full h-full border border-[#DBDADE] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#DBDADE]">
              <th className="cursor-pointer pl-[1.25rem] pr-[0.62rem] py-[0.94rem]">
                {/* <input type="checkbox" /> */}
              </th>
              {columns.map((column, index) => (
                <th key={index}>
                  <div  className="w-fit flex gap-8 items-center px-[1rem] py-[0.62rem]">
                  <p style={{fontFamily:"Gilroy-Bold"}} className="text-[#4B465C] text-[1rem] font-[600] tracking-[0.07813rem]">
                      {column?.name}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} style={{fontFamily:"Gilroy-Bold"}} className="text-center py-4 text-[#4B465C] text-[1rem] font-[400]">No {component} found</td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr  key={rowIndex} className="cursor-pointer h-[50px] border-y border-[#DBDADE]">
                  <td className="pl-[1.25rem] pr-[0.62rem] py-[0.94rem]">
                    {/* <input type="checkbox" /> */}
                  </td>
                  {mapping.map((key, keyIndex) => (
                    <td key={keyIndex} onClick={() => fun(row , keyIndex)}>
                      {renderField(row, key, keyIndex)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between items-center">
        <p style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C]/50 text-[1rem] font-[400] leading-[1.4675rem]">
          {data.length > 0 ? (
            `Showing 1 to ${Math.min(data?.length, currentPage * 10)} of ${totalPages * 10}`
          ) : (
            `No data found`
          )}
        </p>
        <div className="flex gap-[0.31rem]">
        { currentPage > 1 &&  <TableButton label="<" action={() => setCurrentPage(currentPage - 1)} />}
          {[...Array(totalPages)].map((_, index) => (
            <TableButton key={index} label={index + 1} activeButton={currentPage === index + 1} action={() => setCurrentPage(index + 1)} />
          ))}
          <TableButton label=">" action={() => setCurrentPage(currentPage + 1)} />
        </div>
      </div>
    </div>
  );
}

function renderField(row, key, keyIndex) {
  // Define how each field is rendered based on the key
  switch (key) {
    case "Status":
      return <StatusField label={row[key]} />;
    case "Course Name":
      return <NameFieldCourse name={row[key]} />;
    case "name":
      return <p  style={{fontFamily:"Gilroy-Medium"}}  className="text-[#4B465C] text-[1.125rem] font-[400]">{row[key]}</p>;
    case "duration":
      return <p  style={{fontFamily:"Gilroy-Medium"}}  className="text-[#4B465C] text-[1.125rem] font-[400]">{row[key]} years</p>;
    case "Name":
      return <NameFieldCourse name={row[key]} />;
    case "deadline":
      return <p  style={{fontFamily:"Gilroy-Medium"}}  className="text-[#4B465C] text-[1.125rem] font-[400]">{row[key]?.split("T")[0]}</p>;
    default:
      return <p  style={{fontFamily:"Gilroy-Medium"}}  className="text-[#4B465C] text-[1.125rem] font-[400]">{row[key]}</p>;
  }
}
