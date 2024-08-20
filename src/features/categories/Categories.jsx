import styled from "styled-components";
import { useCreateCategory, useGetCategories } from "../../api/category";
import Spinner from "../../components/Spinner";
import { showToast } from "../../utils/toast";
import { CategoriesForm } from "./CategoriesForm";

export const Categories = () => {
  const { data, error, isError, isLoading, refetch } = useGetCategories();
  const { mutate } = useCreateCategory();

  const handleMutate = (categoryData) => {
    mutate(categoryData, {
      onSuccess: () => {
        refetch();
        showToast("You've created a category!");
      },
    });
  };

  const expenseCategories = data
    ? data.filter((category) => category.type === "EXPENSE")
    : [];
  const incomeCategories = data
    ? data.filter((category) => category.type === "INCOME")
    : [];

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>{error.response.data.reason}</p>;
  }

  return (
    <CategoriesWrapper>
      <CategoriesFormWrapper>
        <h1>Welcome to Categories Dashboard</h1>
        <CategoriesForm createCategory={handleMutate}/>
      </CategoriesFormWrapper>
      <CategoriesLayout>
        <ColumnContainer>
          <RedText>Expense</RedText>
            {expenseCategories.map((category) => (
              <StyledText key={category.id}>{category.name}</StyledText>
            ))}
        </ColumnContainer>
        <ColumnContainer>
          <GreenText>Income</GreenText>
            {incomeCategories.map((category) => (
              <StyledText key={category.id}>{category.name}</StyledText>
            ))}
        </ColumnContainer>
      </CategoriesLayout>
    </CategoriesWrapper>
  );
};

const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  flex-wrap: wrap;
`;

const CategoriesFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoriesLayout = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const GreenText = styled.h2`
  color: green;
`;

const RedText = styled.h2`
  color: red;
`;

const StyledText = styled.p`
  font-size: 20px;
`