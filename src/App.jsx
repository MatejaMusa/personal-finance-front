import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./features/home/Home";
import { Categories } from "./features/categories/Categories";
import GlobalStyle from "./styles/GlobalStyle";
import { Auth } from "./features/auth/Auth";
import LayoutWithoutNavbar from "./features/LayoutWithoutNavbar";
import LayoutWithNavbar from "./features/LayoutWithNavbar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/api";
import ProtectedRoute from "./features/ProtectRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route element={<LayoutWithoutNavbar />}>
            <Route path="/auth" element={<Auth />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<LayoutWithNavbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;

