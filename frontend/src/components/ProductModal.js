import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, MenuItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import Dropzone from "react-dropzone";
import useFetchData from "../hooks/useFetchData";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  name: yup
    .string("Add product name")
    .min(4, "minimum 3 letters")
    .required("required"),
  description: yup
    .string("Add product description")
    .min(10, "alt least 10 letters")
    .required("required"),
  price: yup.number("Add product price").required("required"),
  countStock: yup.number("Add product stock quantity").required("required"),
  category: yup.string("Add category").required("required"),
  avatar: yup.string("required").required("required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ProductModal({ open, setOpen, refetch }) {
  const [loading, setLoading] = useState(false);

  const { data } = useFetchData("/api/category");
  //  console.log("category", data);

  function handleClose() {
    setOpen(false);
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      countStock: "",
      avatar: null,
      category: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      await createNewProduct(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const createNewProduct = async (values) => {
    setLoading(true);

    try {
      // eslint-disable-next-line
      const { data } = await axios.post("/api/products/create", values);
      refetch();
      toast("product created");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            sx={{
              mb: 3,
              mt: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },

              input: {
                background: "#eee",
              },
            }}
            fullWidth
            id="name"
            name="name"
            placeholder="Product name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            sx={{
              mb: 3,
              mt: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },

              input: {
                background: "#eee",
              },
            }}
            fullWidth
            id="description"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <TextField
            sx={{
              mb: 3,
              mt: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },

              input: {
                background: "#eee",
              },
            }}
            fullWidth
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
          />
          <TextField
            sx={{
              mb: 3,
              mt: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },

              input: {
                background: "#eee",
              },
            }}
            fullWidth
            type="number"
            id="countStock"
            name="countStock"
            placeholder="Stock quantity"
            value={values.countStock}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.countStock && Boolean(errors.countStock)}
            helperText={touched.countStock && errors.countStock}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            className="px-2 my-2"
            variant="outlined"
            name="category"
            id="category"
            select
            label="Categories"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.category && Boolean(errors.category)}
            helperText={touched.category && errors.category}
          >
            {data?.categories &&
              data.categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
          </TextField>

          <Box border="2px dashed #031d2a" sx={{ p: 1 }}>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              maxFiles={1}
              onDrop={(acceptedFiles) =>
                acceptedFiles.map((file) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setFieldValue("avatar", reader.result);
                  };
                  return reader;
                })
              }
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <Box
                  {...getRootProps()}
                  p="1rem"
                  sx={{
                    "&:hover": { cursor: "pointer" },
                    bgcolor: isDragActive ? "#cceffc" : "#fafafa",
                  }}
                >
                  <input name="image" {...getInputProps()} />
                  {isDragActive ? (
                    <>
                      <p style={{ textAlign: "center" }}>
                        <CloudUploadIcon
                          sx={{ color: "primary.main", mr: 2 }}
                        />
                      </p>
                      <p style={{ textAlign: "center", fontSize: "12px" }}>
                        {" "}
                        Drop here!
                      </p>
                    </>
                  ) : values.avatar === null ? (
                    <>
                      <p style={{ textAlign: "center" }}>
                        <CloudUploadIcon
                          sx={{ color: "primary.main", mr: 2 }}
                        />
                      </p>
                      <p style={{ textAlign: "center", fontSize: "12px" }}>
                        Drag and Drop here or click to choose
                      </p>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <img
                            style={{ maxWidth: "100px" }}
                            src={values.avatar}
                            alt=""
                          />
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>

          <Box sx={{ pt: 2 }}>
            <Button
              type="submit"
              size="large"
              color="primary"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              Criate product
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
