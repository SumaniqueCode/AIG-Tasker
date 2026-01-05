import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterUserData } from "../../interface/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { registerUser } from "../../apis/auth";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(false);
  const initialValues: RegisterUserData = {
    name: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Enter your full name"),
    username: Yup.string().required("Username is required field"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      try {
        setIsLoading(true);
        const res = await registerUser(data);
        console.log("register response", res)
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/tasks");
      } catch (error: any) {
        setIsLoading(false);
        formik.resetForm();
        toast.error("Error occured while registering");
      }
    },
  });

  const { errors, getFieldProps, touched } = formik;

  return (
      <Container component="main" maxWidth="xs" sx={{bgcolor: 'white', py:2, borderRadius: 3, boxShadow:6,}}>
        <Box sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center", }} >
          <Avatar sx={{ m: 1, bgcolor: "primary.dark" }} />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }} >
            <TextField margin="normal" required fullWidth id="name" label="Full Name" autoComplete="name"
              {...getFieldProps("name")} color="primary" size="small" />
            {errors.name && touched.name && (
              <span color="textSecondary" style={{ color: "red" }}>
                {errors.name}
              </span>
            )}
            <TextField margin="normal" required fullWidth id="username" label="Username"
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
                "Register"
              )}
            </Button>
            <Link to="/login">Already have an account? Login</Link>
          </Box>
        </Box>
      </Container>
  );
};

export default Register;