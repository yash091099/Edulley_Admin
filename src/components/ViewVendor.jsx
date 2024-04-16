import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import FieldInput from "./FieldInput";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/svg/users.svg";
import documentsIcon from "../assets/svg/documents.svg";
import dollorIcon from "../assets/svg/dollor.svg";
import UserInput from "./UserInput";
export default function ViewVendor() {
  const navigate = useNavigate();
  const [state, setState] = useState(1);
  return (
    <div className="flex flex-col gap-[2rem] h-full bg-white p-[2rem] rounded-[1rem]">
      <h1 className="text-text text-[1.5rem] font-[600] tracking-[0.07813rem]">
        Edgor Jones
      </h1>
      <div className="flex gap-[2.5rem] justify-between p-[1.5rem]">
        <div className="flex-1 flex flex-col gap-[1.5rem] border-r border-[#4B465C]">
          <div className="cursor-pointer flex gap-[1rem] items-center" onClick={()=>setState(1)}>
            <img
              className={`p-[0.5rem] rounded-[0.375rem] ${state === 1 ? 'bg-primary-brand':'bg-[#F1F1F2]'}`}
              src={userIcon}
            />
            <div>
              <h1 className={`text-[0,9375rem] font-[600] leading-[1.3125rem] ${state === 1 ? 'text-[#4B465C]':'text-[#4B465C]/50'}`}>
                Personal Details
              </h1>
              <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
                Name/Email/Contact
              </p>
            </div>
          </div>
          <div className="cursor-pointer flex gap-[1rem] items-center" onClick={()=>setState(2)}>
            <img
              className={`p-[0.5rem] rounded-[0.375rem] ${state === 2 ? 'bg-primary-brand':'bg-[#F1F1F2]'}`}
              src={documentsIcon}
            />
            <div>
              <h1 className={`text-[0,9375rem] font-[600] leading-[1.3125rem] ${state === 2 ? 'text-[#4B465C]':'text-[#4B465C]/50'}`}>
                Documents
              </h1>
              <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
                USA Documents
              </p>
            </div>
          </div>
          <div className="cursor-pointer flex gap-[1rem] items-center" onClick={()=>setState(3)}>
            <img
              className={`p-[0.5rem] rounded-[0.375rem] ${state === 3 ? 'bg-primary-brand':'bg-[#F1F1F2]'}`}
              src={dollorIcon}
            />
            <div>
              <h1 className={`text-[0,9375rem] font-[600] leading-[1.3125rem] ${state === 3 ? 'text-[#4B465C]':'text-[#4B465C]/50'}`}>
                Bank Details
              </h1>
              <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
              Acc No/IFSC Code/Branch
              </p>
            </div>
          </div>
        </div>
        {state === 1 && <div className="flex-1 flex flex-col gap-[1rem]">
          <h1 className="text-text text-[1.5rem] font-[600] tracking-[0.07813rem]">
            Personal Details
          </h1>
          <FieldInput
            label="Full Name"
            boldLabel={true}
            placeholder="Full Name"
            type="text"
          />
          <FieldInput
            label="Email"
            boldLabel={true}
            placeholder="Email"
            type="text"
            scanner={true}
          />
          <FieldInput
              label="Phone Number"
              boldLabel={true}
              placeholder="+912345678920"
              type="text"
            />
          <FieldInput
            label="Srore ID"
            boldLabel={true}
            placeholder="+912345678920"
            type="text"
          />
          <FieldInput
            label="Clover ID"
            boldLabel={true}
            placeholder="+912345678920"
            type="text"
          />
          <UserInput
            label="Passport Size Photo"
            boldLabel={true}
            placeholder="abc.jpg"
            type="file"
          />
          <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[1rem] font-[600] leading-[1.25rem]">
              Address of your store
            </label>
            <div
              className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
            >
              <input
                className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]"
                type="text"
                placeholder="Address line 1"
              />
            </div>
            <div
              className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
            >
              <input
                className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]"
                type="text"
                placeholder="Address line 2"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-[0.5rem] w-full">
              <div
                className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
              >
                <select className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]">
                  <option>Country</option>
                </select>
              </div>
              <div
                className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
              >
                <select className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]">
                  <option>State</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-[0.5rem] w-full">
              <div
                className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
              >
                <select className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]">
                  <option>City</option>
                </select>
              </div>
              <div
                className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
              >
                <select className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]">
                  <option>Pincode</option>
                </select>
              </div>
            </div>
          </div>
          {/* <div className='w-1/2'><PrimaryButton label="Update" action={()=>{setSuccessModal(true)}} /></div> */}
        <UserInput
            label="Image fo your store"
            boldLabel={true}
            placeholder="abc.jpg"
            type="file"
          />
        </div>}
        {state === 2 && <div className="flex-1 flex flex-col gap-[1rem]">
        <h1 className="text-text text-[1.5rem] font-[600] tracking-[0.07813rem]">
            Documents
          </h1>
          <UserInput
            label="Add image of your Driver License"
            boldLabel={true}
            placeholder="abc.jpeg"
            type="file"
          />
          <UserInput
            label="Add image of your EIN certificate"
            boldLabel={true}
            placeholder="abc.jpeg"
            type="file"
          />
          <UserInput
            label="Add image of your State Tax ID"
            boldLabel={true}
            placeholder="abc.jpeg"
            type="file"
          />
          <UserInput
            label="Add image of your Address Proof"
            boldLabel={true}
            placeholder="abc.jpeg"
            type="file"
          />
          <UserInput
            label="Add image of your Business Address Proof"
            boldLabel={true}
            placeholder="abc.jpeg"
            type="file"
          />
          

        </div>}
        {state === 3 && <div className="flex-1 flex flex-col gap-[1rem]">
        <h1 className="text-text text-[1.5rem] font-[600] tracking-[0.07813rem]">
            Bank Details
          </h1>
          <FieldInput
            label="Bank Name"
            boldLabel={true}
            placeholder="Bank Name"
            type="text"
          />
          <FieldInput
            label="Account Number"
            boldLabel={true}
            placeholder="Account Number"
            type="text"
          />
          <FieldInput
            label="Routing Number"
            boldLabel={true}
            placeholder="Routing Number"
            type="text"
          />
          <UserInput
            label="Bank Statement/Void Checks"
            boldLabel={true}
            placeholder="abc.jpeg"
            type="file"
          />
        </div>}
      </div>
    </div>
  );
}
