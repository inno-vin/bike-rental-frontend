import API from "./api";

function App() {

  const testLogin = async () => {
    try {
      const res = await API.post("/api/token/", {
        username: "admin",
        password: "admin123"
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Bike Rental Frontend</h1>
      <button onClick={testLogin}>Test Login</button>
    </div>
  );
}

export default App;