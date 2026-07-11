import Layout from "../components/Layout";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { useState } from "react";
import CategoryModal from "../components/CategoryModal";
import useFetchData from "../hooks/useFetchData";

const Category = () => {
  //fetch categories
  const { data, loading, refetch } = useFetchData("/api/category");
  //  console.log("data", data);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const columns = [
    {
      field: "_id",
      headerName: "Category ID",
      width: 150,
      editable: true,
    },
    {
      field: "name",
      headerName: "Category name",
      width: 150,
      editable: true,
    },

    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "70px",
          }}
        >
          <Box>
            <EditIcon
              // onClick={() => handleOpenEditForm(values.row._id)}
              sx={{
                color: "oklch(0.218022 0.040901 233.565)",
                cursor: "pointer",
              }}
            />
          </Box>
          <Box>
            <AutoDeleteIcon
              // onClick={() => deleteProduct(values.row._id)}
              sx={{ color: "red", cursor: "pointer" }}
            />
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <h2>Categories</h2>
        <CategoryModal open={open} setOpen={setOpen} refetch={refetch} />
        <Box sx={{ display: "flex", justifyContent: "right", pb: 3 }}>
          <Button
            loadingPosition="start"
            startIcon={<AddCircleIcon />}
            variant="outlined"
            onClick={handleOpen}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ height: 450, width: "100%", bgcolor: "white" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={data?.categories}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 12,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            loading={loading}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Category;
