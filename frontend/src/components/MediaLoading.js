import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function Media() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {Array.from(new Array(4)).map((_, index) => {
        return (
          <Grid key={index} size={{ xs: 2, sm: 3, md: 3 }}>
            <Box sx={{ width: 250, marginRight: 0.5, my: 5 }}>
              <Skeleton variant="rectangular" width={250} height={118} />

              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default function MediaLoading() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading />
      <Media />
    </Box>
  );
}
