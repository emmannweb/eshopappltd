import { Box, Container, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useMemo, useState } from "react";
import img from "../images/header4.jpg";
import SearchBox from "../components/SearchBox";
import Layout from "./layout/Layout";
import { ProductItem } from "../components/ProductItem";
import useFetchData from "../hooks/useFetchData";
import MediaLoading from "../components/MediaLoading";

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useFetchData(`/api/products?pageNumber=${page}`);
  const { products, count, pages } = data;

  const pageCount = useMemo(() => Math.max(1, pages || 1), [pages]);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  //console.log("data", data);
  return (
    <>
      <Layout>
        <Box
          sx={{
            bgcolor: "#212121",
            height: "50vh",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchBox />
          </Box>
        </Box>
        <Box sx={{ bgcolor: "#f9fafb", pt: 7, pb: 7 }}>
          <Container>
            {loading ? (
              <MediaLoading />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {products &&
                    products?.map((product, index) => (
                      <Grid key={index} size={{ xs: 2, sm: 3, md: 3 }}>
                        <ProductItem product={product} />
                      </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(_, value) =>
                      setPage(Math.min(Math.max(1, value), pageCount))
                    }
                    color="primary"
                  />
                </Box>
              </Box>
            )}
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default Home;
