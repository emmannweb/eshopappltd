import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";

const validationSchema = yup.object({
  name: yup
    .string("Add category name")
    .min(4, "minimum 3 letters")
    .required("required"),
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

export default function CategoryModal({ open, setOpen, refetch }) {
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
      },

      validationSchema: validationSchema,
      onSubmit: async (values, actions) => {
        await createNewCategory(values);
        //alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      },
    });

  const createNewCategory = async (values) => {
    setLoading(true);

    try {
      // eslint-disable-next-line
      const { data } = await axios.post("/api/category/create", values);
      refetch();
      //toast.success("post created");
    } catch (error) {
      console.log(error);
      //toast.error(error);
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
            placeholder="Category name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />

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
              Criate category
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
