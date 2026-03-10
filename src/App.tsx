import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routers } from "./routes/routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route>
          {routers.map((route) => (
            <Route key={route.id} path={route.href} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
