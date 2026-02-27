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

  return (
    <div>
      <h1>Bike Rental Frontend</h1>
      <button onClick={testLogin}>Test Login</button>
    </div>
  );
}

export default App;   // 🔥 THIS MUST EXIST