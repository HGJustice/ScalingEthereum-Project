import React, { useState } from "react";
import { ethers } from "ethers";
import "../Styles/BookRide.css";
import UserABI from "../ABI2.json";

const contractABI = UserABI;

const contractAddress = "0x16b4Be50A03a1EBaA6fa8BE3c7b806D9962be4be";

export default function BookRide() {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    destination: "",
    date: "",
    time: "",
    passengers: "",
    price: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const createRideHandel = async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.createRide(
      formData.pickupAddress,
      formData.destination,
      formData.date,
      formData.time,
      formData.passengers,
      formData.price
    );
    await tx.wait();
    console.log("created ride");
  };
  return (
    <div>
      <h1 className="BookRide__header">BookRide</h1>
      <form onSubmit={createRideHandel}>
        <input
          type="text"
          name="pickupAddress"
          value={formData.pickupAddress}
          placeholder="Pickup Address"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="destination"
          value={formData.destination}
          placeholder="Destination"
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          placeholder="Date"
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          placeholder="Pick up time"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="passengers"
          value={formData.passengers}
          placeholder="Passengers"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          placeholder="Price £$"
          onChange={handleInputChange}
        />
        <button type="submit">Publish Ride</button>
      </form>
    </div>
  );
}
