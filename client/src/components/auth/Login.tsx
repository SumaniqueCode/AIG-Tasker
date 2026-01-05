import { useState } from "react";
import { Link } from "react-router-dom";
import type { LoginUserData } from "../../interface/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../apis/auth";
import { toast } from "react-toastify";
import { Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";

const Login = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const initialValues: LoginUserData = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required field"),
    password: Yup.string().required("Please enter your password"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      try {
        setIsLoading(true);
        const res = await loginUser(data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href="/tasks";
      } catch (error: any) {
        setIsLoading(false);
        formik.resetForm();
        toast.error("Username or Password Incorrect");
      }
    },
  });

  const { errors, getFieldProps, touched } = formik;

  return (
      <Container component="main" maxWidth="xs" sx={{bgcolor: 'white', py:2, borderRadius: 3, boxShadow:6,}}>
        <Box sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center", }} >
          <Avatar sx={{ m: 1, bgcolor: "primary.dark" }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }} >
            <TextField margin="normal" required fullWidth id="username" label="username"
              {...getFieldProps("username")} color="primary" size="small" />
            {errors.username && touched.username && (
              <span color="textSecondary" style={{ color: "red" }}>
                {errors.username}
              </span>
            )}
            <TextField margin="normal" required fullWidth label="Password" type="password" id="password"
              {...getFieldProps("password")} autoComplete="current-password" size="small" />

            {errors.password && touched.password && (
              <span color="textSecondary" style={{ color: "red" }}>
                {errors.password}
              </span>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: "primary", borderRadius: "25px", textTransform: "none", }} >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
                <Link to="/register">Don't have an account? Sign Up</Link>
          </Box>
        </Box>
      </Container>
  );
};

export default Login;