import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import IconMui from "./Icons";

export default function StatCard({ icon, value, interval, trend }) {
  const labelColors = {
    up: "primary",
    down: "secondary",
    neutral: "default",
  };

  const color = labelColors[trend];

  const trendValues = { up: "+25%", down: "-25%", neutral: "+5%" };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        flexGrow: 1,
        boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
      }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          <IconButton
            aria-label="delete"
            size="large"
            sx={{
              bgcolor: "#f1f5f9",
            }}
          >
            <IconMui iconName={icon} sx={{ color: "#42a5f5" }} />
          </IconButton>
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
        >
          <Stack sx={{ justifyContent: "space-between" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography variant="h4" component="p">
                {value}
              </Typography>
              <Chip size="small" color={color} label={trendValues[trend]} />
            </Stack>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {interval}
            </Typography>
          </Stack>
          <Box sx={{ width: "100%", height: 0 }}></Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
