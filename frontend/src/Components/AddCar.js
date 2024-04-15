import React, { useState } from "react";
import { ethers } from "ethers";
import UserABI from "../ABI.json";

const contractABI = UserABI;
const contractAddress = "0xEF15A3F93E8D281afbb727928882A62Ceb0f6aa8";

export default function AddCar() {
  const [formData, setFormData] = useState({
    countryOrigin: "",
    registrationPlate: "",
    carMake: "",
    model: "",
    typeOfCar: "",
    color: "",
    year: 0,
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function addCarToUserHandler(event) {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.addCarToUser(
      formData.countryOrigin,
      formData.registrationPlate,
      formData.carMake,
      formData.model,
      formData.typeOfCar,
      formData.color,
      formData.year
    );
    await tx.wait();
    console.log("added car");
  }

  return (
    <div>
      <h1 className="addCar__header">Add Car</h1>
      <form onSubmit={addCarToUserHandler}>
        <input
          type="text"
          name="countryOrigin"
          value={formData.countryOrigin}
          placeholder="Origin country of Car"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="registrationPlate"
          value={formData.registrationPlate}
          placeholder="Reg Plate of Car"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="carMake"
          value={formData.carMake}
          placeholder="Car Make"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="model"
          value={formData.model}
          placeholder="Model of Car"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="typeOfCar"
          value={formData.typeOfCar}
          placeholder="Type of Car"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="color"
          value={formData.color}
          placeholder="color of Car"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="year"
          value={formData.year}
          placeholder="Year"
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
