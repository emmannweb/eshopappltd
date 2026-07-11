import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import IconShoppingCard from "./IconShoppingCard";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  increaseByQuantity,
  decreaseByQuantity,
  removeItem,
} from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ state, toggleDrawer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice, shippingPrice, taxPrice } = useSelector(
    (state) => state.cart,
  );

  //go to checkout
  const goToCheckout = () => {
    navigate("/login?redirect=/checkout");
  };

  const list = () => (
    <Box
      sx={{
        width: 500,
        bgcolor: "#ebebeb",
        height: "100%",
        p: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      // onClick={toggleDrawer("right", false)}
      onKeyDown={toggleDrawer("right", false)}
    >
      <Box>
        <Box
          sx={{
            bgcolor: "white",
            p: 2,
            mb: 1,
          }}
        >
          <IconShoppingCard toggleDrawer={toggleDrawer} color="black" />{" "}
          <span style={{ paddingLeft: "20px" }}>Your cart</span>
        </Box>
        {cartItems?.length === 0 ? (
          <>
            <h3>Your cart is empty!</h3>
          </>
        ) : (
          cartItems.map((cart, i) => (
            <Box
              key={i}
              sx={{
                bgcolor: "white",
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                mb: 1,
              }}
            >
              <Box>
                <img
                  src={cart.image}
                  alt={cart.name}
                  style={{ with: "60px", height: "60px" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box>{cart.name} </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "80px",
                  }}
                >
                  <AddCircleOutlineIcon
                    sx={{ fontSize: "22px", cursor: "pointer" }}
                    onClick={() => dispatch(increaseByQuantity(cart))}
                  />
                  {cart.quantity}
                  <RemoveCircleOutlineIcon
                    sx={{ fontSize: "22px", cursor: "pointer" }}
                    onClick={() => dispatch(decreaseByQuantity(cart.product))}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                ${`${cart.price?.toFixed(2)}`}{" "}
                <Box>
                  <DeleteIcon
                    onClick={() => dispatch(removeItem(cart.product))}
                    sx={{ color: "red", cursor: "pointer" }}
                  />
                </Box>
              </Box>
            </Box>
          ))
        )}
        <Divider />
      </Box>
      <Box sx={{ bgcolor: "white", p: "0 20px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <h4>Subtotal:</h4>
          </Box>
          <Box>
            <h4>{cartItems.reduce((a, c) => a + c.quantity, 0)} Unit(s)</h4>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <h4>Shipping price:</h4>
          </Box>
          <Box>
            {" "}
            <h4>${shippingPrice?.toFixed(2)}</h4>{" "}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <h4>Tax price:</h4>
          </Box>
          <Box>
            {" "}
            <h4>${taxPrice?.toFixed(2)}</h4>{" "}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <h4>Total price:</h4>
          </Box>
          <Box>
            {" "}
            <h4>${totalPrice?.toFixed(2)}</h4>{" "}
          </Box>
        </Box>

        <Button
          disabled={cartItems.length === 0}
          variant="contained"
          fullWidth
          size="large"
          startIcon={<ShoppingCartIcon />}
          onClick={goToCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
