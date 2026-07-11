import Layout from "../components/Layout";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import moment from "moment";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useMyOrdersQuery } from "../redux/slices/orderSlice";
// import { toast } from "react-toastify";

const UserOrder = () => {
  const { data, isLoading } = useMyOrdersQuery();
  //console.log("order data", data);

  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      width: 150,
      editable: true,
    },

    {
      field: "fullName",
      headerName: "Full name",
      width: 150,
      renderCell: (params) => params.row?.shippingAddress?.fullName,
    },

    {
      field: "itemsPrice",
      headerName: "Items price",
      width: 150,
      renderCell: (params) => `$${params.row?.itemsPrice?.toFixed(2)}`,
    },
    {
      field: "shippingPrice",
      headerName: "Shipping",
      width: 150,
      renderCell: (params) => `$${params.row?.shippingPrice?.toFixed(2)}`,
    },
    {
      field: "taxPrice",
      headerName: "Tax",
      width: 150,
      renderCell: (params) => `$${params.row?.taxPrice?.toFixed(2)}`,
    },
    {
      field: "totalPrice",
      headerName: "Total",
      width: 150,
      renderCell: (params) => `$${params.row?.totalPrice?.toFixed(2)}`,
    },

    {
      field: "avatar",
      headerName: "Image(s)",
      width: 300,
      renderCell: (params) =>
        params.row?.orderItems?.map((url, i) => (
          <img
            key={i}
            style={{ maxWidth: "80px", height: "auto", marginRight: "13px" }}
            src={url?.image}
            alt={url?.name}
          />
        )),
    },

    {
      field: "createdAt",
      headerName: "Created date",
      sortable: false,
      width: 160,
      renderCell: (params) => params.row.createdAt?.substring(0, 10),
    },
  ];

  return (
    <>
      <Layout>
        <h2>User Order</h2>
        <Box sx={{ height: 400, width: "100%", bgcolor: "white" }}>
          <DataGrid
            sx={{
              button: {
                color: "#fafafa",
              },
            }}
            getRowId={(row) => row._id}
            rows={data?.orders}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            loading={isLoading}
          />
        </Box>
      </Layout>
    </>
  );
};

export default UserOrder;
