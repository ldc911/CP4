/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import CreateSession from "./pages/CreateSession";

import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="" element={<Home />} />
        <Route path="create" element={<CreateSession />} />
      </Routes>
    </Router>
  );
}

export default App;
