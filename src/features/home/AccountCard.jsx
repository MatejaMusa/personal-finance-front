/* eslint-disable react/prop-types */
import { Card, CardContent, Chip, Typography } from "@mui/material";
import styled from "styled-components";

const AccountCard = ({ name, description, priority, balance }) => {
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
    <Card style={{ background: '#a7a9be', maxWidth: '300px' }}>
      <StyledCardContent style={{ padding: "20px 50px", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
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
    </Card>
  );
};

export default AccountCard;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;
