import { useParams } from "react-router-dom";
import { useGetOneAccount } from "../../api/account";
import { TransactionForm } from "./TransactionForm";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  useCorrectTransaction,
  useCreateTransaction,
  useGetGraphs,
  useGetTransactions,
} from "../../api/transaction";
import { showToast } from "../../utils/toast";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Typography,
} from "@mui/material";
import Spinner from "../../components/Spinner";
import styled from "styled-components";

export const Account = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const { accountId } = useParams();
  const { isLoading } = useGetOneAccount(accountId);
  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactions({ accountId, page, size });
  const {
    data: { expense = [], income = [] } = {},
    isLoading: isLoadingGraphs,
    refetch: refetchGraphs,
  } = useGetGraphs({ accountId });
  const { mutate: createTransaction } = useCreateTransaction();
  const { mutate: correctTransaction } = useCorrectTransaction();

  const expenseData = expense.map((item, index) => ({
    id: index,
    value: item.percentage,
    label: item.name,
  }));

  const incomeData = income.map((item, index) => ({
    id: index,
    value: item.percentage,
    label: item.name,
  }));

  const handleCreateTransaction = (transactionData) => {
    createTransaction(transactionData, {
      onSuccess: () => {
        showToast("You've created a transaction!");
      },
    });
  };

  const handleCorrectTransaction = (transactionId) => {
    correctTransaction(transactionId, {
      onSuccess: () => {
        showToast("You've corrected a transaction!");
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading || isLoadingTransactions || isLoadingGraphs) {
    return <Spinner />;
  }

  return (
    <StyleAccountPage>
      <TransactionFormWrapper>
        <TransactionForm
          createTransaction={handleCreateTransaction}
          accountId={accountId}
        />
      </TransactionFormWrapper>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.content.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.categoryName}</TableCell>
                  <TableCell>€{transaction.amount}</TableCell>
                  <TableCell>{transaction.type.toLowerCase()}</TableCell>
                  <TableCell>
                    {new Date(transaction.transactionDate)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .split("/")
                      .join("-")}
                  </TableCell>
                  <TableCell>
                    <StyledButton
                      onClick={() => handleCorrectTransaction(transaction.id)}
                      variant="contained"
                      size="small"
                    >
                      Correct
                    </StyledButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ background: "white" }}
          component="div"
          rowsPerPageOptions={[3, 5, 10]}
          count={transactions.totalElements}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={size}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Expense</Typography>
        <PieChart
          margin={{ bottom: 25 }}
          series={[{ data: expenseData }]}
          width={500}
          height={200}
        />
        <Typography variant="h4">Income</Typography>
        <PieChart
          margin={{ bottom: 25 }}
          series={[{ data: incomeData }]}
          width={500}
          height={200}
        />
      </Paper>
    </StyleAccountPage>
  );
};

const StyleAccountPage = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  margin-left: 50px;
  gap: 5px;
  flex-wrap: wrap;
`;

const TransactionFormWrapper = styled.div`
  display: flex;
  max-width: 600px;
`;

const StyledButton  = styled(Button)`
  background-color: #ff8906;
`;