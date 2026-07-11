import { Box } from "@mui/material";
import Layout from "./layout/Layout";

const NotFound = () => {
  return (
    <>
      <Layout>
        <Box
          sx={{
            bgcolor: "#01326a",
            minHeight: "calc(100vh - 60px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#c1c1c1",
          }}
        >
          <h1 style={{ color: "white", textAlign: "cemter" }}>
            Page not found!
          </h1>
        </Box>
      </Layout>
    </>
  );
};

export default NotFound;
