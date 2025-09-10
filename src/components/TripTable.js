import React from "react";

const TripTable = ({ trips }) => {
    if (!trips || !trips.trips || !Array.isArray(trips.trips)) {
        return <p className="text-center">No trips to display yet.</p>;
    }

    const { trips: tripList } = trips;

    const calculateRate = (miles) => {
        let totalRate = 0;
        if (miles <= 15) {
            totalRate = 38.5;
        } else if (miles <= 25) {
            totalRate = 38.5 + (miles - 15) * 1.5;
        } else {
            totalRate = 38.5 + 10 * 1.5 + (miles - 25) * 1.3;
        }
        return totalRate * 0.87;
    };

    // ✅ Filter out canceled trips
    const filteredTrips = tripList.filter(
        (t) => t.status?.toLowerCase() !== "canceled" && t.status?.toLowerCase() !== "cancel"
    );

    // ✅ Compute totals
    let totalMileage = 0;
    let totalRate = 0;
    let completedTrips = 0;

    filteredTrips.forEach((t) => {
        const miles = parseFloat(t.miles) || 0;
        const rate = calculateRate(miles);

        totalMileage += miles;
        totalRate += rate;

        const status = t.status?.toLowerCase();
        if (status === "completed" || status === "noshow") {
            completedTrips++;
        }
    });

    return (
        <div className="card p-4 shadow-sm mb-5">
            <h5 className="mb-3">Trip Results</h5>

            <div className="d-flex justify-content-between mb-3">
                <strong>Total Mileage: {totalMileage.toFixed(2)}</strong>
                <strong>Completed Trips: {completedTrips}</strong>
                <strong>Total Rate: ${totalRate.toFixed(2)}</strong>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Date</th>
                            <th>Driver</th>
                            <th>SR Name</th>
                            <th>Miles</th>
                            <th>Status</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrips.map((trip, index) => {
                            const miles = parseFloat(trip.miles) || 0;
                            const rate = calculateRate(miles);
                            return (
                                <tr key={index}>
                                    <td>{trip.trip_date}</td>
                                    <td>{trip.driver_name}</td>
                                    <td>{trip.sr_name}</td>
                                    <td>{miles}</td>
                                    <td>{trip.status}</td>
                                    <td>${rate.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                        {/* Total Row */}
                        <tr className="fw-bold bg-light">
                            <td colSpan="3" className="text-end">Total:</td>
                            <td>{totalMileage.toFixed(2)}</td>
                            <td>{completedTrips} trips</td>
                            <td>${totalRate.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TripTable;
