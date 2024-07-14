import "./App.css";
import { Routes, Route } from "react-router-dom";
import Reels from "./pages/Reels";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/reels" element={<Reels />} />
      </Routes>
    </div>
  );
}

export default App;
