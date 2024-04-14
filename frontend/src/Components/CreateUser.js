import React, { useState } from "react";
import { ethers } from "ethers";

const contractABI = [
  // ABI content here (only the relevant functions you need, for example `createUser`)
];
const contractAddress = "0xF9dB9F3a01D6Ec7e0BE0732Cc6F598A0A853FB59";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    username: "",
  });

  const createUserHandel = async (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1 className="User__header">Create User</h1>
      <form onSubmit={createUserHandel}>
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="username"
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
