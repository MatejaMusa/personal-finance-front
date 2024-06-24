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
const schema = z.object({
  name: z.string().min(8, "Account name has to be at least 8 characters long"),
  description: z
    .string()
    .max(100, "Description must be less than 100 characters"),
  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .refine((val) => ["LOW", "MEDIUM", "HIGH"].includes(val), {
      message: "Priority must be one of LOW, MEDIUM, or HIGH",
    }),
});

const AccountForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
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
          Create Account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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

export default AccountForm;
