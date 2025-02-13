import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Create } from "./pages/Create";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { Join } from "./pages/Join";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/join" element={<Join />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
