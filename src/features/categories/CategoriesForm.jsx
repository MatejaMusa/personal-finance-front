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
import styled from "styled-components";

const schema = z.object({
  name: z.string().min(3, "Account name has to be at least 3 characters long"),
  type: z.enum(["EXPENSE", "INCOME"], {
    errorMap: (issue, _ctx) => {
      if (issue.code === "invalid_enum_value") {
        return { message: "Type must be INCOME or EXPENSE" };
      }
      return { message: issue.message };
    },
  }),
});

export const CategoriesForm = ({ createCategory }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = (categoryData) => {
    createCategory(categoryData);
    reset();
  };

  return (
    <StyledContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
          mb: 5,
        }}
      >
        <StyledText variant="h4" gutterBottom>
          Create Category
        </StyledText>
        <Box
          component="form"
          onSubmit={handleSubmit(submit)}
          sx={{ mt: 3, width: "100%" }}
        >
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message?.toString() : ""}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.type}>
                <InputLabel>Type</InputLabel>
                <Select {...field} label="Type" defaultValue="">
                  <MenuItem value="EXPENSE">Expense</MenuItem>
                  <MenuItem value="INCOME">Income</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.type ? errors.type.message?.toString() : ""}
                </FormHelperText>
              </FormControl>
            )}
          />
          <StyledButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 5 }}
          >
            Submit
          </StyledButton>
        </Box>
      </Box>
    </StyledContainer>
  );
};

const StyledButton  = styled(Button)`
  background-color: #ff8906;
`;

const StyledContainer = styled(Container)`
  border: 1px solid #ff8906;
  background-color: white;
`;

const StyledText = styled(Typography)`
  color: #ff8906;
`;