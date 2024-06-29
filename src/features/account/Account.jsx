import { TransactionForm } from "./TransactionForm";

export const Account = () => {
    
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "50px",
      }}
    >
      <div style={{ display: "flex", maxWidth: '600px' }}>
        <TransactionForm createTransaction={() => {}} />
      </div>
    </div>
  );
};
