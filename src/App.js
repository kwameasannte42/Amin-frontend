import React, { useState } from "react";
import axios from "axios";
import TripTable from "./components/TripTable";
import "./App.css";

// ✅ Automatically use the correct backend URL
const API_URL = "https://amin-backend.onrender.com";
// const API_URL = process.env.NODE_ENV === "development"
// ? "http://localhost:5001"
// : "https://amin-backend.onrender.com";

const App = () => {
  const [driverName, setDriverName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [trips, setTrips] = useState([]);

  // ✅ Fetch trips with filters
  const fetchTrips = async () => {
    try {
      const response = await axios.get(`${API_URL}/trips`, {
        params: { driverName, startDate, endDate, status },
      });
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
      alert("Failed to fetch trip data.");
    }
  };

  return (
    <div className="position-relative" style={{ zIndex: 1 }}>
      <div className="container mt-5">
        <div className="text-center my-4">
          <img
            src="/logo.png"
            alt="Amin Logistics Logo"
            style={{ maxHeight: "80px" }}
          />
        </div>

        {/* Search Filters */}
        <div className="card p-4 my-4 shadow-sm">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter driver name"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="form-select mb-3"
          >
            <option value="">All</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Cancelled</option>
            <option value="NoShow">No Show</option>
          </select>
          <button onClick={fetchTrips} className="btn btn-primary w-100">
            Search
          </button>
        </div>
      </div>

      <TripTable trips={trips} />
    </div>
  );
};

export default App;
