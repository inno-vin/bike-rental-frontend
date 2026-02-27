import React from "react";
import API from "./api";
import { setTokens } from "./auth";

function App() {

  const testLogin = async () => {
    try {
      const response = await API.post("/api/token/", {
        username: "admin",
        password: "admin123",
      });

      setTokens(response.data);
      console.log("Logged in");
    } catch (error) {
      console.error(error);
    }
  };

  const testProtected = async () => {
    try {
      const response = await API.get("/api/bikes/");
      console.log("Bikes:", response.data);
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  return (
    <div>
      <h1>Bike Rental Frontend</h1>
      <button onClick={testLogin}>Test Login</button>
      <button onClick={testProtected}>Test Protected</button>
    </div>
  );
}

export default App;