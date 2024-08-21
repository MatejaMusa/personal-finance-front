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
    <StyledNav>
      <StyledTitle>Personal Finance App</StyledTitle>
      <NavContentContainer>
        <StyledUl>
          <li>
            <StyledButton
              size="large"
              onClick={() => navigate("/")}
              variant="contained"
            >
              Home
            </StyledButton>
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
        </StyledUl>

        <Link
          component="button"
          variant="body2"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "white", textDecoration: "none" }}
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
      </NavContentContainer>
    </StyledNav>
  );
};

const StyledTitle = styled.h1`
  color: #ff8906;
  margin-left: 10px;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0f0e17;
  padding: 0 30px 0 10px;
`;

const NavContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const StyledUl = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: center;
  gap: 20px;
`;
