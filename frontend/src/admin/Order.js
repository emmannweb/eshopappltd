import Layout from "../components/Layout";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
//import { useState } from "react";
import useFetchData from "../hooks/useFetchData";
//import { toast } from "react-toastify";

const Order = () => {
  const { data, loading } = useFetchData("/api/orders");
  //console.log("orders ", data);

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
      field: "isPaid",
      headerName: "isPaid",
      sortable: false,
      width: 160,
    },
    {
      field: "isDelivered",
      headerName: "isDelivered",
      sortable: false,
      width: 160,
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
              //onClick={() => submit(values.row._id)}
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
        <h2>Orders</h2>
        <Box sx={{ height: 450, width: "100%", bgcolor: "white" }}>
          <DataGrid
            getRowId={(row) => row?._id}
            rows={data && data?.orders}
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

export default Order;
