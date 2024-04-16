import React, { useState } from "react";
import TableButton from "./TableButton";
import upDark from "../assets/svg/up-icon-dark.svg";
import upLight from "../assets/svg/up-icon-light.svg";
import downDark from "../assets/svg/down-icon-dark.svg";
import downLight from "../assets/svg/down-icon-light.svg";
import StatusField from "./StatusField";
import NameFieldInstiture from "./NameFieldInstitute";

export default function InstitutionTable({ columns, data, mapping ,fun , viewDetails   }) {

  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="flex flex-col w-full h-full border border-[#DBDADE] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#DBDADE]">
              <th className="cursor-pointer pl-[1.25rem] pr-[0.62rem] py-[0.94rem]">
                <input type="checkbox" />
              </th>
              {columns && columns?.map((column, index) => (
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
            {data && data?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="cursor-pointer h-[5rem] border-y border-[#DBDADE]"
              >
                <td className="cursor-pointer pl-[1.25rem] pr-[0.62rem] py-[0.94rem]">
                  <input type="checkbox" />
                </td>
                {mapping && mapping?.map((key, keyIndex) => (
                  <td
                    key={keyIndex}
                    onClick={() => {
                      fun(row);
                    }}
                  >
                    <div className="w-fit flex gap-8 items-center px-[0.7rem] py-[0.62rem]">
                      {key === "universityName" ? (
                        <NameFieldInstiture
                          name={row[key]}
                          universityLogo={row["universityLogo"]}
                          occupation={row["Occupation"]}
                        />
                      ) : key === "Status" ? (
                        <StatusField label={row[key]} />
                      ) : key.trim() === "Tags" ? (
                        <div className='flex flex-wrap gap-2'>
                          {row["Tags"]?.map((tag, tagIndex) => (
                            <span key={tagIndex}  className=" rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : key.trim()=="ViewProfile" ? (<>
                      <span onClick={viewDetails(keyIndex)} className="text-[#FF6477] text-[1.125rem] font-[400]" >View Profile </span>

                      </>): (
                        <p className="text-[#4B465C] text-[1.125rem] font-[400]">
                          {row[key]}
                        </p>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="w-full flex justify-between items-center">
        <p className="text-[#4B465C]/50 text-[1rem] font-[400] leading-[1.4675rem]">
          Showing 1 to 7 of 100
        </p>
        <div className="flex gap-[0.31rem]">
          <TableButton label="Previous" />
          {[...Array(5)].map((_, index) => (
            <TableButton
              key={index}
              label={index + 1}
              activeButton={currentPage}
              action={() => setCurrentPage(index + 1)}
            />
          ))}
          <TableButton label="Next" />
        </div>
      </div> */}
    </div>
  );
}
