import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import Users from "./pages/Users";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/users/*" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
