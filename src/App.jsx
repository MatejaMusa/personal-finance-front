import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./features/home/Home";
import { Categories } from "./features/categories/Categories";
import GlobalStyle from "./styles/GlobalStyle";
import { Auth } from "./features/auth/Auth";
import LayoutWithoutNavbar from "./features/LayoutWithoutNavbar";
import LayoutWithNavbar from "./features/LayoutWithNavbar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, setupGlobalExceptionHandler } from "./api/api";
import ProtectedRoute from "./features/ProtectRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Account } from "./features/account/Account";
import { useEffect } from "react";

function AppContent() {
  const navigate = useNavigate();
  
  useEffect(() => {
    setupGlobalExceptionHandler(navigate);
  }, [navigate]);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<LayoutWithoutNavbar />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutWithNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/account/:accountId" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;

