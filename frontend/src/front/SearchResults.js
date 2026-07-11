import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./layout/Layout";
import { ProductItem } from "../components/ProductItem";
import MediaLoading from "../components/MediaLoading";

const SearchResults = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `/api/products?keyword=${encodeURIComponent(keyword || "")}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <Layout>
      <Box
        //    sx={{ bgcolor: "#f9fafb", py: 7 }}
        sx={{
          bgcolor: "#01326a",
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c1c1c1",
        }}
      >
        <Container>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Search results for "{keyword}"
          </Typography>

          {loading ? (
            <MediaLoading />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : products.length === 0 ? (
            <Typography>No products found for this search.</Typography>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {products.map((product, index) => (
                  <Grid
                    key={product._id || index}
                    size={{ xs: 2, sm: 3, md: 3 }}
                  >
                    <ProductItem product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export default SearchResults;
