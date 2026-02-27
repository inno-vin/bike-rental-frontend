import { setTokens } from "./auth";

const testLogin = async () => {
  try {
    const response = await API.post("/api/token/", {
      username: "admin",
      password: "admin123",
    });

    setTokens(response.data);   // 🔥 THIS IS THE IMPORTANT LINE
    console.log("Logged in successfully");
  } catch (error) {
    console.error(error);
  }
};