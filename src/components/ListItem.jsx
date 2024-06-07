import React, { useState } from "react";
import iconImg from "../assets/svg/list-details-icon.svg";
import RighttArrowIcon from "../assets/svg/right-arrow-light-icon.svg";
export default function ListItem(props) {
  const [showChild, setShowChild] = useState(false);
  return (
    <div className="flex flex-col w-full">
      <div
        className={`cursor-pointer flex justify-between items-center px-[1rem] py-[0.56rem] rounded-[0.375rem] hover:bg-primary-brand ${
          props.activeOption === props.label ? "bg-primary-brand" : ""
        }`}
        onClick={() => {
          props.setActive(props.label);
          props.isParent ? setShowChild((prev) => !prev) : props.action();
        }}
      >
        <div className="flex gap-[0.5rem] items-center">
          <img src={props.image ? props.image : iconImg} alt="icon" />
          <div className="text-[#4B465C] text-[1rem] font-[600] leading-[1.71875rem] " style={{ fontFamily:"Gilroy-Bold" }}>
            {props.label}
          </div>
        </div>
        <img src={RighttArrowIcon} alt="Go" />
      </div>
      {showChild && <div style={{fontFamily:"Gilroy-Medium"}} className="flex flex-col pl-[2.75rem]">{props.children}</div>}
    </div>
  );
}
