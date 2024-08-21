/* eslint-disable react/prop-types */
import { Card, CardContent, Chip, Typography } from "@mui/material";

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
    <Card
      onClick={onClick}
      style={{ background: "#a7a9be", maxWidth: "300px", cursor: "pointer" }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px 50px",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body">{description}</Typography>
        <Chip
          label={priority}
          sx={{
            backgroundColor: resolveColor(priority),
          }}
        />
        <Typography variant="body">Balance : {balance} eur</Typography>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
