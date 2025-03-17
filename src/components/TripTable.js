import React from "react";

const TripTable = ({ trips }) => {
    const totalMileage = trips.reduce((sum, trip) => sum + parseFloat(trip["Miles"] || 0), 0);

    return (
        <div className="container mt-4">
            <h2 className="text-secondary">Total Mileage: <span className="text-success">{totalMileage.toFixed(2)}</span></h2>
            <div className="table-responsive">
                <table className="table table-bordered table-hover mt-3">
                    <thead className="table-primary">
                        <tr>
                            <th>Date</th>
                            <th>Driver Name</th>
                            <th>Trip Status</th>
                            <th>Miles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.length > 0 ? (
                            trips.map((trip, index) => (
                                <tr key={index}>
                                    <td>{trip.Date}</td>
                                    <td>{trip["Driver Name"]}</td>
                                    <td>{trip.Status}</td>
                                    <td>{trip["Miles"]}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-muted py-3">No trips found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TripTable;
