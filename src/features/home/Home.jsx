import { useNavigate } from "react-router-dom";
import { useCreateAccount, useGetAccounts } from "../../api/account";
import { showToast } from "../../utils/toast";
import AccountCard from "./AccountCard";
import AccountForm from "./AccountForm";
import Spinner from "../../components/Spinner";
import styled from "styled-components";

export const Home = () => {
  const { data, error, isError, isLoading, refetch } = useGetAccounts();
  const { mutate } = useCreateAccount();
  const navigate = useNavigate();

  const handleMutate = (accountData) => {
    mutate(accountData, {
      onSuccess: () => {
        refetch();
        showToast("You've created an account!");
      },
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>{JSON.stringify(error.response.data, null, 2)}</p>;
  }

  return (
    <StyledContainer>
      <StyledForm>
        <h1>Welcome to Accounts Dashboard</h1>
        <AccountForm
          createAccount={(accountData) => handleMutate(accountData)}
        />
      </StyledForm>
      <StyledCards>
        {data.map((account) => (
          <AccountCard
            onClick={() => navigate(`/account/${account.id}`)}
            key={account.id}
            name={account.name}
            description={account.description}
            priority={account.priority}
            balance={account.balance}
          />
        ))}
      </StyledCards>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 30px;

  @media screen and (max-width: 639px) {
    margin: 0 30px 10px 30px;
  }
`;

const StyledCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 40px;

  @media screen and (max-width: 639px) {
    justify-content: center;
  }
`;

