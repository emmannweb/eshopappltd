import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const DEFAULT_LOCALE = { code: "en-US", currency: "USD" };

function processInput(inputValue) {
  if (inputValue == null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

// import { fCurrency } from 'src/utils/format-number';
function fCurrency(inputValue) {
  const locale = DEFAULT_LOCALE;

  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat(locale.code, {
    style: "currency",
    currency: locale.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    // ...options,
  }).format(number);

  return fm;
}
// import { Label } from 'src/components/label';
// import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
export function ProductItem({ product }) {
  const dispatch = useDispatch();
  const addToCardAction = (product) => {
    const payload = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product?.avatar?.url,
      countStock: product.countStock,
    };
    dispatch(addToCart(payload));
    toast("Added to shopping cart");
  };

  //   const renderStatus = (
  //     <Label
  //       variant="inverted"
  //       color={(status === "sale" && "error") || "info"}
  //       sx={{
  //         zIndex: 9,
  //         top: 16,
  //         right: 16,
  //         position: "absolute",
  //         textTransform: "uppercase",
  //       }}
  //     >
  //       {status}
  //     </Label>
  //   );

  const renderImg = (
    <Box
      component="img"
      alt={product?.name}
      src={product?.avatar?.url}
      sx={{
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: "text.disabled",
          textDecoration: "line-through",
        }}
      >
        {product?.priceSale && fCurrency(product?.priceSale)}
      </Typography>
      &nbsp;
      {fCurrency(product?.price)}
    </Typography>
  );

  return (
    <Item>
      <Box sx={{ pt: "50%", height: "auto", position: "relative" }}>
        {/* {status && renderStatus} */}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Rating
          name="half-rating"
          defaultValue={product?.rating}
          precision={0.5}
        />
        <Box sx={{ textAlign: "left", pl: 1 }}>
          <Link to={`/product/${product?._id}`}>{product?.name}</Link>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={product?.colors} /> */}
          {renderPrice}
        </Box>
      </Stack>
      <Button
        onClick={() => addToCardAction(product)}
        variant="outlined"
        startIcon={<DeleteIcon />}
        disabled={product?.countStock === 0}
      >
        add to card
      </Button>
    </Item>
  );
}
