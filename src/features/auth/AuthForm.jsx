import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginUser, useSignupUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toast";
import styled from "styled-components";

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

  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    mutate: mutateSignup,
    error: signupError,
    isError: isSignupError,
  } = useSignupUser();
  const {
    mutate: mutateLogin,
    error: loginError,
    isError: isLoginError,
  } = useLoginUser();

  const onSubmit = (data) => {
    if (isSignup) {
      mutateSignup(data, {
        onSuccess: () => {
          setIsSignup(false);
          showToast("You've signed up!");
        },
      });
    } else {
      mutateLogin(data, {
        onSuccess: (data) => {
          sessionStorage.setItem("user", JSON.stringify(data));
          showToast("You've logged in!");
          navigate("/");
        },
      });
    }
  };

  useEffect(() => {
    reset({ username: "", password: "" });
  }, [isSignup, reset]);

  useEffect(() => {
    console.log(errorMessage)
    if (isLoginError) {
      setErrorMessage(loginError.response.data.reason);
    } else if (isSignupError) {
      setErrorMessage(signupError.response.data.reason);
    }
    console.log(errorMessage)

  }, [isLoginError, isSignupError, loginError, signupError]);

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
        <Typography variant="h4" style={{ color: "#ff8906" }} gutterBottom>
          {isSignup ? "Sign Up" : "Log In"}
        </Typography>
        {errorMessage && (
          <Typography color="error">
            {errorMessage}
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
                onClick={setErrorMessage("")}
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
                onClick={setErrorMessage("")}
              />
            )}
          />
          <StyledA
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsSignup(!isSignup);
              setErrorMessage("");
            }}
          >
            {isSignup
              ? "Already have an account? Click here to log in."
              : "Don't have an account yet? Click here to sign up."}
          </StyledA>
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

const StyledA = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

export default AuthForm;
