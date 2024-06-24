import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";

export const NavBar = () => {
  const userDataString = sessionStorage.getItem("user");
  const user = userDataString ? JSON.parse(userDataString) : null;
  const navigate = useNavigate();
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0f0e17",
        padding: "0 30px 0 10px",
      }}
    >
      <StyledTitle>Personal Finance App</StyledTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <ul
          style={{
            display: "flex",
            listStyleType: "none",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <li>
            <Button
              size="large"
              onClick={() => navigate("/")}
              variant="contained"
              style={{ backgroundColor: "#ff8906" }}
            >
              Home
            </Button>
          </li>
          <li>
            <Button
              size="large"
              onClick={() => navigate("/categories")}
              variant="contained"
              style={{ backgroundColor: "#ff8906" }}
            >
              Categories
            </Button>
          </li>
        </ul>

        <p>{user.username}</p>
      </div>
    </nav>
  );
};

const StyledTitle = styled.h1`
  color: #ff8906;
`;
