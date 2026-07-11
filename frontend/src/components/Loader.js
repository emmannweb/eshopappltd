import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress sx={{ color: "#00689d" }} />
    </Box>
  );
};

export default Loader;
