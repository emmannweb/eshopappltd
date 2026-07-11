import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import Layout from "./layout/Layout";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/products/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    if (!product) return;

    setQty((currentQty) =>
      Math.max(1, Math.min(product.countStock, currentQty + delta)),
    );
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product?.avatar?.url,
        countStock: product.countStock,
        quantity: qty,
      }),
    );
    toast("Added to cart");
    //navigate("/checkout");
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    if (!product) return;
    if (!userInfo) {
      navigate("/login?redirect=/product/" + product._id);
      return;
    }
    setReviewLoading(true);
    try {
      const response = await fetch(`/api/products/${product._id}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, comment }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to submit review");
      }
      toast.success("Review added");
      setRating(0);
      setComment("");
      const refreshed = await fetch(`/api/products/${product._id}`);
      const refreshedData = await refreshed.json();
      setProduct(refreshedData.product);
    } catch (err) {
      toast.error(err.message || "Review submission failed");
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          bgcolor: "#eeeeee",
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // color: "#c1c1c1",
        }}
      >
        <Container sx={{ py: 12 }}>
          <Box sx={{ bgcolor: "#ebebeb", p: 2, mb: 3 }}>
            {loading ? (
              <Typography>Loading product...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : product ? (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Box
                      component="img"
                      src={product?.avatar?.url}
                      alt={product?.name}
                      sx={{ width: "100%", objectFit: "contain" }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Rating
                      value={product.rating || 0}
                      readOnly
                      precision={0.5}
                    />
                    <Typography sx={{ ml: 2 }}>
                      {product.numReviews || 0} review
                      {product.numReviews === 1 ? "" : "s"}
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Category: {product.category?.name || "Uncategorized"}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Status:{" "}
                    {product.countStock > 0 ? "In stock" : "Out of stock"}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 3,
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={qty <= 1}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <Typography>{qty}</Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleQuantityChange(1)}
                      disabled={qty >= product.countStock}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Box>
                  <Button
                    variant="contained"
                    disabled={product.countStock === 0}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                      Reviews
                    </Typography>
                    {product.reviews?.length === 0 ? (
                      <Typography>No reviews yet.</Typography>
                    ) : (
                      product.reviews.map((review) => (
                        <Box key={review._id || review.user} sx={{ mb: 2 }}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {review.name?.charAt(0)}
                            </Avatar>
                            <Typography fontWeight={700}>
                              {review.name}
                            </Typography>
                          </Box>
                          <Rating
                            value={review.rating}
                            readOnly
                            precision={0.5}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </Typography>
                          <Typography>{review.comment}</Typography>
                        </Box>
                      ))
                    )}
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                      Leave a review
                    </Typography>
                    {userInfo ? (
                      <Box component="form" onSubmit={handleSubmitReview}>
                        <Rating
                          name="rating"
                          value={rating}
                          onChange={(_, value) => setRating(value || 0)}
                          precision={1}
                        />
                        <TextField
                          fullWidth
                          label="Comment"
                          multiline
                          rows={4}
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          sx={{ mt: 2, mb: 2 }}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          endIcon={<SendIcon />}
                          disabled={
                            reviewLoading ||
                            rating === 0 ||
                            comment.trim() === ""
                          }
                        >
                          Submit review
                        </Button>
                      </Box>
                    ) : (
                      <Typography>
                        Please <Link to="/login">sign in</Link> to add a review.
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            ) : null}
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default ViewProduct;
