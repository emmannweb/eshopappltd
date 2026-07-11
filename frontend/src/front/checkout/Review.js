import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function Review() {
  const { shippingAddress, cartItems, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Products"
            secondary={`${cartItems.reduce(
              (a, c) => a + c.quantity,
              0
            )} Unit(s)`}
          />
          <Typography variant="body2">
            ${" "}
            {cartItems
              .reduce((acc, val) => acc + val.price * val.quantity, 0)
              .toFixed(2)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">
            ${(shippingPrice + taxPrice)?.toFixed(2)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice?.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>{shippingAddress?.fullname}</Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {`${shippingAddress?.address}, ${shippingAddress?.city}, ${shippingAddress?.country},  ${shippingAddress?.postalCode}`}
          </Typography>
        </div>
      </Stack>
    </Stack>
  );
}
