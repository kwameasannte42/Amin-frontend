import React from "react";

const TripTable = ({ trips }) => {
    const calculateDriversPay = (miles) => {
        let payRate;
        if (miles <= 15) {
            payRate = 42;
        } else if (miles > 15 && miles <= 25) {
            payRate = 42 + (miles - 15) * 1.9;
        } else {
            payRate = 42 + (10 * 1.9) + ((miles - 25) * 1.4);
        }
        return payRate * 0.87; // Driver's Pay (87% of Pay Rate)
    };

    const totalMileage = trips.reduce((sum, trip) => sum + parseFloat(trip["Miles"] || 0), 0);
    // const totalDriversPay = trips.reduce((sum, trip) => sum + calculateDriversPay(parseFloat(trip["Miles"] || 0)), 0);

    return (
        <div className="container mt-4">
            <h2 className="text-secondary">Total Mileage: <span className="text-success">{totalMileage.toFixed(2)}</span></h2>
            {/* <h3 className="text-secondary">Total Driver's Pay: <span className="text-success">${totalDriversPay.toFixed(2)}</span></h3> */}

            <div className="table-responsive">
                <table className="table table-bordered table-hover mt-3">
                    <thead className="table-primary">
                        <tr>
                            <th>Date</th>
                            <th>Driver Name</th>
                            <th>Trip Status</th>
                            <th>Miles</th>
                            <th>Driver’s Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.length > 0 ? (
                            trips.map((trip, index) => {
                                const miles = parseFloat(trip["Miles"] || 0);
                                const driversPay = calculateDriversPay(miles);

                                return (
                                    <tr key={index}>
                                        <td>{trip.Date}</td>
                                        <td>{trip["Driver Name"]}</td>
                                        <td>{trip.Status}</td>
                                        <td>{miles.toFixed(2)}</td>
                                        <td>${driversPay.toFixed(2)}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted py-3">No trips found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TripTable;
