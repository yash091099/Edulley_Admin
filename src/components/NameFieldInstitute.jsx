import React from "react";
import tempImg from "../assets/images/Avatar.png";
export default function NameFieldInstiture(props) {
  return (
    <div  className="flex gap-[0.62rem] items-center">
      <div>
        {/* get image from props */}
        <img style={{ width: "35px", height: "35px" , borderRadius:"50%" }} src={props?.universityLogo} alt="img" />
      </div>
      <div className="flex flex-col items-start">
        <p style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C]  font-[600] leading-[1.375rem]">
          {props.name}
        </p>
        <span style={{fontFamily:"Gilroy-Medium"}} className="text-[#4B465C]  font-[400] leading-[1.25rem]">
          {props.occupation}
        </span>
      </div>
    </div>
  );
}
