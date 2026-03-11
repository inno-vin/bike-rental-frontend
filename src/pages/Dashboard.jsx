import { useState } from "react";
import API from "../api";

function Dashboard() {
  const [bikes, setBikes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchBikes = async () => {
    if (!startDate || !endDate) {
      alert("Please select dates first");
      return;
    }

    try {
      const response = await API.get(
        `/api/bikes/?start_date=${startDate}&end_date=${endDate}`
      );

      setBikes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const bookBike = async (bikeId) => {
    try {
      await API.post("/api/bookings/", {
        bike: bikeId,
        start_date: startDate,
        end_date: endDate,
      });

      alert("Bike booked successfully");

      fetchBikes(); // refresh list
    } catch (error) {
      console.error(error.response);
      alert("Booking failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <button onClick={logout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      <div style={{ marginBottom: "30px" }}>
        <h3>Select Booking Dates</h3>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button
          onClick={fetchBikes}
          style={{ marginLeft: "15px" }}
        >
          Search Bikes
        </button>
      </div>

      {bikes.length === 0 ? (
        <p>No bikes found for selected dates</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {bikes.map((bike) => (
            <div
              key={bike.id}
              style={{
                border: "1px solid white",
                padding: "20px",
                width: "260px",
              }}
            >
              <h3>{bike.title}</h3>

              <p>Location: {bike.location}</p>

              <p>Price per day: ₹{bike.price_per_day}</p>

              {bike.available ? (
                <>
                  <p style={{ color: "lightgreen" }}>
                    Status: Available
                  </p>

                  <button onClick={() => bookBike(bike.id)}>
                    Book Bike
                  </button>
                </>
              ) : (
                <p style={{ color: "red" }}>
                  Status: Not Available
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;