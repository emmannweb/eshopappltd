import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import Grid from "@mui/material/Grid2";
import useFetchData from "../hooks/useFetchData";
import { Box, Typography } from "@mui/material";
import ChartOne from "../components/ChartOne";
import ChartTwo from "../components/ChartTwo";

const Dashboard = () => {
  const { data } = useFetchData("/api/orders/summary");

  return (
    <>
      <Layout>
        <>
          <h2>Dashboard</h2>
          <Grid
            container
            spacing={2}
            columns={12}
            sx={{ mb: (theme) => theme.spacing(4) }}
          >
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard
                icon={"LocalGroceryStore"}
                value={
                  data?.orders && data?.orders[0]?.nbOrders
                    ? data?.orders[0]?.nbOrders
                    : 0
                }
                interval="Total Orders"
                trend="up"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard
                icon={"MonetizationOn"}
                value={
                  data?.orders && data?.orders[0]?.totalSales
                    ? data?.orders[0]?.totalSales?.toFixed(2)
                    : 0
                }
                interval="Total Sales"
                trend="up"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard
                icon={"People"}
                value={
                  data?.users && data?.users[0]?.nbUsers
                    ? data?.users[0]?.nbUsers
                    : 0
                }
                interval="Total Users"
                trend="up"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard
                icon={"Inventory"}
                value={
                  data?.products && data?.products[0]?.nbProducts
                    ? data?.products[0]?.nbProducts
                    : 0
                }
                interval="Total Products"
                trend="up"
              />
            </Grid>
          </Grid>

          {/* second row */}
          <Grid
            container
            spacing={2}
            columns={12}
            sx={{ mb: (theme) => theme.spacing(1) }}
          >
            <Grid size={{ xs: 12, sm: 12, lg: 8 }}>
              <Box
                sx={{
                  height: "400px",
                  width: "100%",
                  background: (theme) => theme.palette.background.paper,
                  mb: (theme) => theme.spacing(3),
                  boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
                  pb: 6,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ display: "flex", alignItems: "center", pl: 4 }}>
                    <Box
                      component="span"
                      sx={{
                        height: "1rem",
                        margin: "0.25rem",
                        width: "1rem",
                        border: "1px solid #32cd32", //42a5f5
                        padding: "3px 3px 1px",
                        borderRadius: "50%",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          height: "9px",
                          width: "9px",
                          maxWidth: "10px",
                          bgcolor: "#00e396",
                          borderRadius: "50%",
                          display: "block",
                        }}
                      ></Box>
                    </Box>
                    <Box>
                      <p>Orders</p>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", pl: 4 }}>
                    <Box
                      component="span"
                      sx={{
                        height: "1rem",
                        margin: "0.25rem",
                        width: "1rem",
                        border: "1px solid #42a5f5", //42a5f5
                        padding: "3px 3px 1px",
                        borderRadius: "50%",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          height: "9px",
                          width: "9px",
                          maxWidth: "10px",
                          bgcolor: "#42a5f5",
                          borderRadius: "50%",
                          display: "block",
                        }}
                      ></Box>
                    </Box>
                    <Box>
                      <p>Sales</p>
                    </Box>
                  </Box>
                </Box>
                <ChartOne
                  data={data && data?.daylyOrders ? data?.daylyOrders : []}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
              <Box
                sx={{
                  height: "400px",
                  width: "100%",
                  background: (theme) => theme.palette.background.paper,
                  mb: (theme) => theme.spacing(3),
                  boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
                  pb: 5,
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ pl: 4, pt: 1 }}>
                    Orders
                  </Typography>
                </Box>
                <ChartTwo
                  data={data && data?.daylyOrders ? data?.daylyOrders : []}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      </Layout>
    </>
  );
};

export default Dashboard;
