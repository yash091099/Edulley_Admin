import React, { useState } from "react";
import UserInput from "./UserInput";
import PrimaryButton from "./PrimaryButton";
import axios from "axios"; // Ensure axios is installed
import { changePassword } from "../context/services/client";

export default function ProfileManagement() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password do not match.");
      return;
    }

    setLoading(true);
    const payload = {
      currentPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    try {
      const response = await changePassword(payload);
      // Handle success response
      // This might include updating the UI or redirecting the user
      setLoading(false);
    } catch (err) {
      // Handle error response
      setError(err.response ? err.response.data.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-[2.19rem] bg-white p-[2rem] rounded-[1rem] pr-[40%] min-h-screen">
      <div className="flex-1 flex flex-col gap-[1.5rem]">
        <div style={{fontFamily:"Gilroy-Medium"}} className="text-text text-[1.5rem] font-[600] w-fit">
          Change Password
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <UserInput
          label="Old Password"
          placeholder="**************"
          type="password"
          value={oldPassword}
          onChange={setOldPassword}
        />
        <UserInput
          label="New Password"
          placeholder="**************"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
        />
        <UserInput
          label="Confirm Password"
          placeholder="**************"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <PrimaryButton
          label={loading ? "Updating..." : "Update Password"}
          action={updatePassword}
          disabled={loading}
        />
      </div>
    </div>
  );
}
