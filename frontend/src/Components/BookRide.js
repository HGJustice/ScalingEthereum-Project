import React, { useState } from "react";
import { ethers } from "ethers";
import "../Styles/BookRide.css";

export default function BookRide() {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    destination: "",
    date: "",
    time: "",
    passengers: "",
    price: "",
  });

  const createRideHandel = async (event) => {};
  return (
    <div>
      <h1 className="BookRide__header">BookRide</h1>
      <form onSubmit={createRideHandel}>
        <input
          type="text"
          name="pickupAddress"
          value={formData.pickupAddress}
          placeholder="Pickup Address"
        />
        <input
          type="text"
          name="destination"
          value={formData.destination}
          placeholder="Destination"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          placeholder="Date"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          placeholder="Pick up time"
        />
        <input
          type="text"
          name="passengers"
          value={formData.passengers}
          placeholder="Passengers"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          placeholder="Price £$"
        />
        <button type="submit">Publish Ride</button>
      </form>
    </div>
  );
}
