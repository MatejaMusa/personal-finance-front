import { useCreateCategory, useGetCategories } from "../../api/category";
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
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.response.data.reason}</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "50px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Welcome to Categories Dashboard</h1>
        <CategoriesForm createCategory={handleMutate}/>
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{ color: "red" }}>Expense</h2>
            {expenseCategories.map((category) => (
              <p style={{ fontSize: '20px' }} key={category.id}>{category.name}</p>
            ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{ color: "green" }}>Income</h2>
            {incomeCategories.map((category) => (
              <p style={{ fontSize: '20px' }} key={category.id}>{category.name}</p>
            ))}
        </div>
      </div>
    </div>
  );
};
