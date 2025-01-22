import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import Users from "./pages/Users";
import { Provider } from "react-redux";
import store from "./redux/store";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="/404" element={<NotFound />} />{" "}
          {/* Route cho trang lỗi 404 */}
          <Route path="*" element={<NotFound />} />{" "}
          {/* Route cho các đường dẫn không hợp lệ */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
