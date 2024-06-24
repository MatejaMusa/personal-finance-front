import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginUser, useSignupUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string().min(5, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      "Password must include at least one uppercase and lowercase letter, one number, and one special character"
    ),
});

const AuthForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isSignup, setIsSignup] = useState(true);


  const { mutate: mutateSignup } = useSignupUser();
  const { mutate: mutateLogin, error: loginError, isError } = useLoginUser();

  const onSubmit = (data) => {
    if (isSignup) {
      mutateSignup(data);
      setIsSignup(false);
    } else {
      mutateLogin(data, {
        onSuccess: (data) => {
          sessionStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        },
      });
    }
  };

  useEffect(() => {
    reset({ username: "", password: "" });
  }, [isSignup, reset]);

  return (
    <Container maxWidth="sm">
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
          {isSignup ? "Sign Up" : "Log In"}
        </Typography>
        {isError && (
          <Typography color="error">
            {loginError.response.data.reason}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3, width: "100%" }}
        >
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                fullWidth
                margin="normal"
                error={isSignup && !!errors.username}
                helperText={
                  isSignup && errors.username
                    ? errors.username.message?.toString()
                    : ""
                }
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={isSignup && !!errors.password}
                helperText={
                  isSignup && errors.password
                    ? errors.password.message?.toString()
                    : ""
                }
              />
            )}
          />
          <a
            href="#"
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              setIsSignup(!isSignup);
            }}
          >
            {isSignup
              ? "Already have an account? Click here to log in."
              : "Don't have an account yet? Click here to sign up."}
          </a>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 5 }}
            style={{ backgroundColor: "#ff8906" }}
          >
            {isSignup ? "Sign Up" : "Log In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
