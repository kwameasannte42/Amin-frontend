import React, { useState } from "react";
import axios from "axios";
import TripTable from "./components/TripTable";

const App = () => {
    const [driverName, setDriverName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [trips, setTrips] = useState([]);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const fetchTrips = async () => {
        try {
            const response = await axios.get("https://amin-backend.onrender.com/trips", {
                params: {
                    driverName,
                    startDate,
                    endDate,
                    status
                }
            });
            setTrips(response.data);
        } catch (error) {
            console.error("Error fetching trips:", error);
            alert("Failed to fetch trip data.");
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) {
            alert("Please select a CSV file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("https://amin-backend.onrender.com/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(response.data.message);
            setFile(null);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary">Amin Logistics Driver Trips</h1>

            {/* Upload CSV */}
            <div className="card p-4 my-4 shadow-sm">
                <input type="file" accept=".csv" onChange={handleFileChange} className="form-control mb-2" />
                <button onClick={uploadFile} className="btn btn-primary">Upload CSV</button>
                {message && <p className="text-success mt-2">{message}</p>}
            </div>

            {/* Search Filters */}
            <div className="card p-4 my-4 shadow-sm">
                <div className="mb-3">
                    <input type="text" placeholder="Enter driver name" value={driverName} onChange={(e) => setDriverName(e.target.value)}
                        className="form-control" />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                            className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                            className="form-control" />
                    </div>
                </div>
                <select onChange={(e) => setStatus(e.target.value)} className="form-select mb-3">
                    <option value="">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                    <option value="NoShow">NoShow</option>
                </select>
                <button onClick={fetchTrips} className="btn btn-success w-100">Search</button>
            </div>

            <TripTable trips={trips} />
        </div>
    );
};

export default App;
