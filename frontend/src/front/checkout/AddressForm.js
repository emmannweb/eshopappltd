import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function AddressForm({ step }) {
  const navigate = useNavigate();

  const { shippingAddress: shippingInfoStorage, cartItems } = useSelector(
    (state) => state.cart
  );
  useEffect(() => {
    if (cartItems?.length === 0) {
      setTimeout(navigate("/"), 500);
    }
  });

  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: shippingInfoStorage ? shippingInfoStorage.fullName : "",
    address: shippingInfoStorage ? shippingInfoStorage.address : "",
    cellPhone: shippingInfoStorage ? shippingInfoStorage.cellPhone : "",
    city: shippingInfoStorage ? shippingInfoStorage.city : "",
    country: shippingInfoStorage ? shippingInfoStorage.country : "",
    postalCode: shippingInfoStorage ? shippingInfoStorage.postalCode : "",
  });

  const shippingAddressMethod = (e) => {
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const { fullName, address, cellPhone, city, postalCode, country } =
      shippingAddress;
    if (step === 1) {
      if (
        fullName !== "" &&
        address !== "" &&
        cellPhone !== "" &&
        city !== "" &&
        country !== "" &&
        postalCode !== ""
      ) {
        dispatch(saveShippingAddress(shippingAddress));
      }
    }
  }, [step, shippingAddress, dispatch]);

  return (
    <>
      <h2>Shipping form</h2>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          required
          id="fullName"
          name="fullName"
          onChange={shippingAddressMethod}
          value={shippingAddress.fullName}
          label="fullName"
          variant="filled"
          error={null}
          helperText={true ? "Please enter your fullName" : ""}
        />
        <TextField
          id="address"
          name="address"
          onChange={shippingAddressMethod}
          value={shippingAddress.address}
          label="address"
          variant="filled"
        />
        <TextField
          id="cellPhone"
          name="cellPhone"
          onChange={shippingAddressMethod}
          value={shippingAddress.cellPhone}
          label="cellPhone"
          variant="filled"
        />
        <TextField
          id="city"
          name="city"
          onChange={shippingAddressMethod}
          value={shippingAddress.city}
          label="city"
          variant="filled"
        />
        <TextField
          id="country"
          name="country"
          onChange={shippingAddressMethod}
          value={shippingAddress.country}
          label="country"
          variant="filled"
        />
        <TextField
          id="postalCode"
          name="postalCode"
          onChange={shippingAddressMethod}
          value={shippingAddress.postalCode}
          label="postalCode"
          variant="filled"
        />
      </Box>
    </>
  );
}
