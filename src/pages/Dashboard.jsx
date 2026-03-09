import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await API.get("/api/bikes/");
      setBikes(response.data);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  const bookBike = async (bikeId) => {
    try {
      const startDate = prompt("Enter start date (YYYY-MM-DD)");
      const endDate = prompt("Enter end date (YYYY-MM-DD)");

      await API.post("/api/bookings/", {
        bike: bikeId,
        start_date: startDate,
        end_date: endDate,
      });

      alert("Bike booked successfully!");
    } catch (error) {
      console.error("Booking error:", error.response?.data || error);
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {bikes.length === 0 ? (
        <p>No bikes available</p>
      ) : (
        bikes.map((bike) => (
          <div
            key={bike.id}
            style={{
              border: "1px solid white",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h3>{bike.title}</h3>

            <p>Location: {bike.location}</p>

            <p>Price per day: ₹{bike.price_per_day}</p>

            <p>Status: {bike.available ? "Available" : "Not Available"}</p>

            {bike.available && (
              <button onClick={() => bookBike(bike.id)}>
                Book Bike
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;