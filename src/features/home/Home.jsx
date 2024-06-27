import { useCreateAccount, useGetAccounts } from "../../api/account";
import { showToast } from "../../utils/toast";
import AccountCard from "./AccountCard";
import AccountForm from "./AccountForm";

export const Home = () => {

  const { data, error, isError, isLoading, refetch } = useGetAccounts();
  const { mutate } = useCreateAccount();

  const handleMutate = (accountData) => {
    mutate(accountData,{
      onSuccess: () => {
        refetch();
        showToast("You've created an account!")
      }
    })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if( isError) {
    return <p>{JSON.stringify(error.response.data, null, 2)}</p>
  }

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
          alignItems: "flex-start",
          margin: '0 30px'
        }}
      >
        <h1>Welcome to Accounts Dashboard</h1>
        <div style={{ border: "1px solid #ff8906", backgroundColor: "white" }}>
          <AccountForm createAccount={(accountData) => handleMutate(accountData)}/>
        </div>
      </div>
      <div
        style={{
          gridColumn: "5 / span 7",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: '40px'
        }}
      >
        {data.map((account) => (
          <AccountCard
          key={account.id}
          name={account.name}
          description={account.description}
          priority={account.priority}
          balance={account.balance}
        />
        ))}
      </div>
    </div>
  );
};
