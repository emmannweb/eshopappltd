import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword) {
      navigate(`/search/${encodeURIComponent(trimmedKeyword)}`);
      return;
    }

    navigate("/");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: 500, maxWidth: "100%", display: "flex", gap: 1 }}
    >
      <TextField
        fullWidth
        label="Search"
        id="search-input"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        sx={{ bgcolor: "white" }}
      />
      <Button type="submit" variant="contained" sx={{ bgcolor: "#5b83c0" }}>
        Search
      </Button>
    </Box>
  );
}
