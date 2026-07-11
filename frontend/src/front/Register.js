import Layout from "./layout/Layout";
import { Box, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRegisterMutation } from "../redux/slices/userApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  name: yup
    .string("Enter your complete name")
    .min(3, "complete name must have at least 3 characters")
    .required("complete name is required"),
  email: yup
    .string("Enter your e-mail")
    .email("Enter a valid e-mail")
    .required("E-mail is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password must have at least 6 characters")
    .required("password is required"),
});

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const createUserHandler = async (values) => {
    try {
      const val = await register(values);
      console.log("register front", val);
      toast("user created");
    } catch (error) {
      console.log(error);
      //toast(`${error}`);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    // isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      createUserHandler(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  // handle input show off password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //end of handle input show off password
  return (
    <>
      <Layout>
        <Box
          sx={{
            bgcolor: "#01326a",
            minHeight: "calc(100vh - 60px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#c1c1c1",
          }}
        >
          <Box
            sx={{
              bgcolor: "#113f73",
              p: "20px 40px",
              border: "1px solid oklch(0.382774 0.071686 233.169)",
              maxWidth: "500px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#c1c1c1",
                textTransform: "uppercase",
                fontWeight: "bold",
                textAlign: "center",
                pb: 2,
              }}
            >
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                slotProps={{
                  input: {
                    style: {
                      background: "#eee",
                    },
                  },
                  autoComplete: "off",
                  formHelperText: {
                    style: { backgroundColor: "transparent" },
                  },
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  },
                }}
                fullWidth
                id="name"
                name="name"
                placeholder="Complete Name"
                autoFocus
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <TextField
                slotProps={{
                  input: {
                    style: {
                      background: "#eee",
                    },
                  },
                  autoComplete: "off",
                  formHelperText: {
                    style: { backgroundColor: "transparent" },
                  },
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  },
                }}
                fullWidth
                id="email"
                name="email"
                placeholder="E-mail"
                autoFocus
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  },
                }}
                fullWidth
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    style: {
                      background: "#eee",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                  formHelperText: {
                    style: {
                      margin: 0,
                      paddingLeft: "15px",
                    },
                  },
                }}
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                elevation={0}
                sx={{
                  mt: 3,
                  p: 2,
                  mb: 2,
                  borderRadius: "10px",
                  bgcolor: "#5b83c0",
                  // color: palette.primary.main,
                  transition: "all ease 1s",
                  "&:hover": { bgcolor: "#fsd", opacity: 0.8 },
                }}
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Register"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    to="/login"
                    variant="body2"
                    style={{
                      color: "oklch(0.382774 0.071686 233.169)",
                      textDecoration: "none",
                    }}
                  >
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Register;
