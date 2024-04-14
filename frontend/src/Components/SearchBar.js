import React from "react";
import "../Styles/SearchBar.css";

export default function SearchBar() {
  return (
    <div>
      <h1 className="Searchbar__header">Search for Ride</h1>
      <form>
        <input type="text" placeholder="Leaving from" />
        <input type="text" placeholder="Going to" />
        <input type="date" placeholder="Date" />
        <input type="text" placeholder="Passengers" />
        <button>Search</button>
      </form>
    </div>
  );
}
