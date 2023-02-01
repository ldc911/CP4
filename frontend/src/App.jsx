import Home from "./pages/Home";
import NavBar from "./components/NavBar";

import "./index.css";

function App() {
  return (
    <div>
      <NavBar />
      <Home />
      <p className="text-xs text-red-900 md:text-3xl">coucou</p>
    </div>
  );
}

export default App;
