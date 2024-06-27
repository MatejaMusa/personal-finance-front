import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { Link, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export const NavBar = () => {
  const userDataString = sessionStorage.getItem("user");
  const user = userDataString ? JSON.parse(userDataString) : null;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    window.location.reload();
  };

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

        <Link
          component="button"
          variant="body2"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "white", textDecoration: 'none' }}
        >
          <p>{user.username}</p>
        </Link>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

const StyledTitle = styled.h1`
  color: #ff8906;
`;
