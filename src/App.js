import logo from "./logo.svg";
import "./App.css";
import ReportList from "./pages/ReportList";
import { SelectedProvider } from "./pages/SelectedContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ReportDetails from "./pages/ReportDetails";

function App() {
  return (
    <div className="App">
      <SelectedProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/ReportList" element={<ReportList />} />
            <Route path="/ReportList/:id" element={<ReportDetails />} />
          </Routes>
        </Router>
      </SelectedProvider>
    </div>
  );
}

export default App;
