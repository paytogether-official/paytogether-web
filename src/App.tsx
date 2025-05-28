import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Create } from "./pages/Create";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { Join } from "./pages/Join";
import { Journey } from "./pages/Journey";
import { ExpenseSetting } from "./pages/ExpenseSetting";
import { Navigate } from "react-router-dom";
import { JourneyExpense } from "./pages/JourneyExpense";
import { JourneyExpenseEdit } from "./pages/JourneyExpenseEdit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/join" element={<Join />} />
        <Route path="/history" element={<History />} />
        <Route path="/journey" element={<Navigate to="/journey/-1" />} />
        <Route path="/journey/:id" element={<Journey />} />
        <Route
          path="/journey/:id/:journeyExpenseId"
          element={<JourneyExpense />}
        />
        <Route
          path="/journey/:id/:journeyExpenseId/edit"
          element={<JourneyExpenseEdit />}
        />
        <Route path="/journey/expense-setting" element={<ExpenseSetting />} />
      </Routes>
    </div>
  );
}

export default App;
