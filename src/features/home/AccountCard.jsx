/* eslint-disable react/prop-types */
import { Card, CardContent, Chip, Typography } from "@mui/material";
import styled from "styled-components";

const AccountCard = ({ name, description, priority, balance, onClick }) => {
  const resolveColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "red";
      case "MEDIUM":
        return "yellow";
      case "LOW":
        return "green";
      default:
        return "green";
    }
  };
  return (
    <StyledCard onClick={onClick}>
      <StyledCardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body">{description}</Typography>
        <Chip
          label={priority}
          sx={{
            backgroundColor: resolveColor(priority),
          }}
        />
        <Typography variant="body">Balance : {balance} eur</Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default AccountCard;

const StyledCard = styled(Card)`
  background: #a7a9be;
  max-width: 300px;
  cursor: pointer;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
