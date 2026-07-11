import { Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
//import Loader from "../../components/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import { useLoginMutation } from "../redux/slices/userApiSlice";
import { setUserInfo } from "../redux/slices/authSlices";
import Layout from "./layout/Layout";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  email: yup
    .string("Enter your e-mail")
    .email("Enter a valid e-mail")
    .required("E-mail is required"),
  password: yup
    .string("Enter a password")
    .min(6, "Password must have at least six(6) characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : `/`;
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [800]);
  }, [userInfo, navigate, redirect]);

  const loginMethod = async (values) => {
    try {
      const res = await login(values).unwrap();
      if (res?.success === true) {
        dispatch(setUserInfo(res));
        toast("Login successfully!");
      }
    } catch (error) {
      toast.error(error?.data?.errors?.map((err) => err?.message)?.join(", "));
      console.log(error?.data?.errors?.map((err) => err?.message)?.join(", "));
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    //isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      loginMethod(values);
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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar sx={{ m: 1, bgcolor: "#hhh", mb: 3 }}>
                <LockClockOutlined sx={{ color: "#hku" }} />
              </Avatar>
            </Box>
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
                  transition: "all ease 1s",
                  "&:hover": { bgcolor: "#fsd", opacity: 0.8 },
                }}
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "Enter"}
              </Button>
              <Grid container>
                <Grid xs>
                  <Link
                    to="/forget-password"
                    variant="body2"
                    style={{
                      transition: "all ease 1s",
                      color: "#c1c1c1",
                      "&:hover": { color: "#c1c1c1!important" },
                      textDecoration: "none",
                    }}
                  >
                    Forget password?
                  </Link>
                </Grid>
                <Grid>
                  <Link
                    to="/register"
                    variant="body2"
                    style={{
                      color: "#c1c1c1",
                      textDecoration: "none",
                    }}
                  >
                    {"Don't have account? create"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Login;
