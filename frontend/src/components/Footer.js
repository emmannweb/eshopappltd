import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#5b83c0",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="span" sx={{ color: "white" }}>
          Ecommerce app LTDA.
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
