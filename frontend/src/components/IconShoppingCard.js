import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function IconShoppingCard({ toggleDrawer, color }) {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <IconButton onClick={toggleDrawer("right", true)}>
      <ShoppingCartIcon fontSize="small" sx={{ color: color }} />
      <CartBadge
        badgeContent={Number(cartItems.length)}
        color="primary"
        overlap="circular"
        showZero="true"
      />
    </IconButton>
  );
}
