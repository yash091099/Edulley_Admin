import React from "react";
import TableButton from "./TableButton";
import upDark from "../assets/svg/up-icon-dark.svg";
import downLight from "../assets/svg/down-icon-light.svg";
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
  const displayStart = Math.min(startIndex + 1, data.length);
  const displayEnd = Math.min(startIndex + perPage, data.length);

  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="flex flex-col w-full h-full border border-[#DBDADE] overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#DBDADE]">
                {columns.map((column, index) => (
                  <th key={index}>
                    <div className="w-fit flex gap-8 items-center px-[0.7rem] py-[0.62rem]">
                      <p className="text-[#4B465C] text-[0.71563rem] font-[600] tracking-[0.07813rem]">
                        {column?.name}
                      </p>
                      <div>
                        <img
                          className="cursor-pointer w-[1rem] h-[14px] object-cover"
                          src={upDark}
                          alt={`Sort Ascending for ${column?.name}`}
                        />
                        <img
                          className="cursor-pointer w-[1rem] h-[14px] object-cover"
                          src={downLight}
                          alt={`Sort Descending for ${column?.name}`}
                        />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`cursor-pointer h-[5rem] border-y border-[#DBDADE]`}
                >
                  {mapping.map((key, keyIndex) => (
                    <td key={keyIndex} onClick={() => fun(row, key)}>
                      <div className="w-fit flex gap-8 items-center px-[0.7rem] py-[0.62rem]">
                        {renderField(row, key)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              {!selectedData.length && (
                <tr>
                  <td colSpan={mapping.length}> 
                    <p className="text-[#4B465C]/50 text-[1rem] font-[400] text-center p-3 leading-[1.4675rem]">
                      No data found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
     
          
       
      </div>
      {data.length > 0 && (
        <div className="w-full flex justify-between items-center">
          <p className="text-[#4B465C]/50 text-[1rem] font-[400] leading-[1.4675rem]">
            Showing {displayStart} to {displayEnd} of {data.length}
          </p>
          <div className="flex gap-[0.31rem]">
            <TableButton
              label="Previous"
              action={() => setCurrentPage(Math.max(1, currentPage - 1))}
            />
            {[...Array(totalPages)].map((_, index) => (
              <TableButton
                key={index}
                label={index + 1}
                activeButton={currentPage === index + 1}
                action={() => setCurrentPage(index + 1)}
              />
            ))}
            <TableButton
              label="Next"
              action={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

function renderField(row, key) {
  switch (key) {
    case "Status":
      return <StatusField label={row[key]} />;
    case "Name":
      return <NameField name={row[key]} />;
    case "date": 
      const date = new Date(row[key]); 
      const formattedDate = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`; 
      return (
        <p className="text-[#4B465C] text-[1.125rem] font-[400]">
          {formattedDate}
        </p>
      );
    case "University Name":
      return <NameField name={row[key]} />;
      case "tags":
        return (
          <div className="flex gap-2">
            {row[key].map((tag, index) => (
              <p key={index} className="text-[#4B465C] text-[1.125rem] font-[400]">
                {index === row[key].length - 1 ? tag : `${tag}, `}
              </p>
            ))}
          </div>
        );
    default:
      return (
        <p className="text-[#4B465C] text-[1.125rem] font-[400]">{row[key]}</p>
      );
  }
}
