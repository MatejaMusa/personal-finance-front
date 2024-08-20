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
  name: z.string().min(8, "Account name has to be at least 8 characters long"),
  description: z
    .string()
    .max(100, "Description must be less than 100 characters"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
      errorMap: (issue, _ctx) => {
        if (issue.code === "invalid_enum_value") {
          return { message: "Priority must be one of LOW, MEDIUM, or HIGH" };
        }
        return { message: issue.message };
      },
    }),
});

const AccountForm = ({ createAccount }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = (accountData) => {
    createAccount(accountData);
    reset();
  }

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
          Create Account
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
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                margin="normal"
                error={!!errors.description}
                helperText={
                  errors.description
                    ? errors.description.message?.toString()
                    : ""
                }
              />
            )}
          />
          <Controller
            name="priority"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.priority}
              >
                <InputLabel>Priority</InputLabel>
                <Select {...field} label="Priority" defaultValue="">
                  <MenuItem value="LOW">Low</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.priority
                    ? errors.priority.message?.toString()
                    : ""}
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

const StyledButton = styled(Button)`
  background-color: #ff8906;
`;

const StyledText = styled(Typography)`
  color: #ff8906;
`;

const StyledContainer = styled(Container)`
  border: 1px solid #ff8906;
  background-color: white;
`;

export default AccountForm;
