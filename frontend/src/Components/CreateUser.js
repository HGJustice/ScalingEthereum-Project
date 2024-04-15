import React, { useState } from "react";
import { ethers } from "ethers";
import UserABI from "../ABI.json";

const contractABI = UserABI;

const contractAddress = "0xEF15A3F93E8D281afbb727928882A62Ceb0f6aa8";

export default function CreateUser() {
  const [formData, setFormData] = useState({ username: "" });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function createUserHandler(event) {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.registerUser(formData.username);
    await tx.wait();
    console.log("worked");
  }

  return (
    <div>
      <h1 className="User__header">Create User</h1>
      <form onSubmit={createUserHandler}>
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="username"
          onChange={handleInputChange}
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
