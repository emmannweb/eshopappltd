import Layout from "../components/Layout";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { useState } from "react";
import ProductModal from "../components/ProductModal";
import useFetchData from "../hooks/useFetchData";
import { useDeleteProductMutation } from "../redux/slices/productApiSlice";
import { toast } from "react-toastify";

const Product = () => {
  const [open, setOpen] = useState(false);
  const { data, loading, refetch } = useFetchData("/api/products");
  const [deleteProduct] = useDeleteProductMutation();

  const handleOpen = () => {
    setOpen(true);
  };

  //delete product
  const submit = (id) => {
    try {
      deleteProduct(id);
      toast("product successfully");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "Product ID",
      width: 150,
      editable: true,
    },
    {
      field: "name",
      headerName: "Product name",
      width: 150,
      editable: true,
    },
    {
      field: "avatar",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img width="40%" src={params.row?.avatar?.url} alt={params.row?.name} />
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 250,
      valueGetter: (data) => data?.name,
    },
    {
      field: "countStock",
      headerName: "Stock",
      width: 250,
    },

    {
      field: "createdAt",
      headerName: "Created date",
      sortable: false,
      width: 160,
      renderCell: (params) => params.row.createdAt?.substring(0, 10),
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
              onClick={() => submit(values.row._id)}
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
        <h2>Products</h2>
        <ProductModal open={open} setOpen={setOpen} refetch={refetch} />
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
            rows={data?.products}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 12,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            loading={loading}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Product;
