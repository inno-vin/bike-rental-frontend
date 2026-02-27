import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await API.get("/api/bikes/");
        setBikes(response.data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchBikes();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {bikes.length === 0 ? (
        <p>No bikes available</p>
      ) : (
        bikes.map((bike) => (
          <div key={bike.id} style={{ border: "1px solid white", padding: "10px", margin: "10px" }}>
            <h3>{bike.name}</h3>
            <p>Price per day: ₹{bike.price_per_day}</p>
            <p>Status: {bike.available ? "Available" : "Not Available"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;