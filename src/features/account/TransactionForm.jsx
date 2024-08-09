/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useGetCategories } from "../../api/category";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const schema = z.object({
  amount: z.preprocess((a) => parseInt(z.string().parse(a),10),
  z.number().gte(0,"You must put in positive number")),
  categoryId: z.coerce.number().min(1),
  transactionDate: z.preprocess((val) => dayjs(val), z.custom((val) => dayjs.isDayjs(val) && val.isValid(), {
    message: "Invalid date",
  }))
});

export const TransactionForm = ({ createTransaction, accountId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { data, error, isError, isLoading } = useGetCategories();

  const submit = (transactionData) => {
    createTransaction({...transactionData, accountId });
    reset();
  };
  
  return (
    <Container
      style={{ border: "1px solid #ff8906", backgroundColor: "white" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
          mb: 5,
        }}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#ff8906" }}>
          Create Transaction
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submit)}
          sx={{ mt: 3, width: "100%" }}
        >
          <Controller
            name="amount"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.amount}
                helperText={
                  errors.amount ? errors.amount.message?.toString() : ""
                }
              />
            )}
          />
          <Controller
            name="categoryId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.type}>
                <InputLabel>Category</InputLabel>
                <Select {...field} label="Category" defaultValue="">
                  {data?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name} - {category.type}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.category ? errors.category.message?.toString() : ""}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="transactionDate"
            control={control}
            defaultValue={dayjs(new Date())}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date picker"
                  inputFormat="MM/DD/YYYY"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.transactionDate}
                      helperText={errors.transactionDate ? errors.transactionDate.message?.toString() : ""}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 5 }}
            style={{ backgroundColor: "#ff8906" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
