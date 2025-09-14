import "bootstrap/dist/css/bootstrap.min.css";
import { LoadingLayer } from "components/LoadingLayer";
import { ToastLayer } from "components/ToastLayer";
import { JourneyResult } from "pages/JourneyResult";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Create } from "./pages/Create";
import { ExpenseSetting } from "./pages/ExpenseSetting";
import { ExpenseSettingEdit } from "./pages/ExpenseSettingEdit";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { Join } from "./pages/Join";
import { Journey } from "./pages/Journey";
import { JourneyExpense } from "./pages/JourneyExpense";
import { JourneyExpenseEdit } from "./pages/JourneyExpenseEdit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/history" element={<History />} />
        <Route path="/journey/create" element={<Create />} />
        <Route path="/journey" element={<Navigate to="/journey/-1" />} />
        <Route path="/journey/:id" element={<Journey />} />
        <Route path="/journey/:id/result" element={<JourneyResult />} />
        <Route
          path="/journey/:id/expense-setting"
          element={<ExpenseSetting />}
        />
        <Route
          path="/journey/:id/:journeyExpenseId"
          element={<JourneyExpense />}
        />
        <Route
          path="/journey/:id/:journeyExpenseId/edit"
          element={<JourneyExpenseEdit />}
        />
        <Route
          path="/journey/:id/:journeyExpenseId/expense-setting"
          element={<ExpenseSettingEdit />}
        />
      </Routes>
      <LoadingLayer />
      <ToastLayer />
    </div>
  );
}

export default App;
