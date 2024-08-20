import styled from "styled-components";
import AuthForm from "./AuthForm";

export const Auth = () => {
  return (
    <StyledWrapper>
      <StyledMain>
        <StyledHeading>Personal Finance App</StyledHeading>
        <StyledAccountWrapper>
          <AuthForm />
        </StyledAccountWrapper>
      </StyledMain>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const StyledHeading = styled.h1`
  color: #ff8906;
`;

const StyledAccountWrapper = styled.div`
  width: 100%;
  border: 1px solid #ff8906;
  background-color: white;
`;
