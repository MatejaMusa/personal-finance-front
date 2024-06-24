import AccountForm from "./AccountForm";

export const Home = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(11, 1fr)",
        height: "100vh",
      }}
    >
      <div
        style={{
          gridColumn: "1 / span 4",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Welcome to Accounts dashboard</h1>
        <div style={{ border: "1px solid #ff8906", backgroundColor: "white" }}>
          <AccountForm />
        </div>
      </div>
    </div>
  );
};
