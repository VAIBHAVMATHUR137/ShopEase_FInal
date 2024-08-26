import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import CartContext from "../context/CartContext";
import { useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Product() {
  const { products, addToCart, updateQuantity, getItemQuantity } =
    useContext(CartContext);
  const { id } = useParams();
  const numericId = parseInt(id, 10);

  const product = products.find((product) => product.id === numericId);

  if (!product) {
    return (
      <div>
        <Navbar />
        <Typography variant="h5" align="center">
          Product not found
        </Typography>
      </div>
    );
  }

  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    if (quantity === 0) {
      addToCart({ ...product, quantity: 1 });
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ maxWidth: 1000, margin: "auto", marginTop: 4 }}>
        <Card>
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="100%"
                image={product.Image}
                alt={product.Name}
                sx={{ objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography gutterBottom variant="h4" component="div">
                    {product.Name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {product.Description}
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Price: INR {product.Price}
                  </Typography>
                  {product.RAM && (
                    <Typography variant="body1">
                      RAM: {product.RAM} GB
                    </Typography>
                  )}
                  {product.Internal_Storage && (
                    <Typography variant="body1">
                      Internal Storage: {product.Internal_Storage} GB
                    </Typography>
                  )}
                  {product.Battery && (
                    <Typography variant="body1">
                      Battery: {product.Battery} MaH
                    </Typography>
                  )}
                  {product.Front_Camera && (
                    <Typography variant="body1">
                      Front Camera: {product.Front_Camera} Pixels
                    </Typography>
                  )}
                  {product.Rear_Camera && (
                    <Typography variant="body1">
                      Rear Camera: {product.Rear_Camera} Pixels
                    </Typography>
                  )}
                  {product.Screen_Size && (
                    <Typography variant="body1">
                      Screen Size: {product.Screen_Size} inches
                    </Typography>
                  )}
                  {product.Processor && (
                    <Typography variant="body1">
                      Processor: {product.Processor}
                    </Typography>
                  )}
                  {product.Storage_Type && (
                    <Typography variant="body1">
                      Storage Type: {product.Storage_Type}
                    </Typography>
                  )}
                  {product.Language && (
                    <Typography variant="body1">
                      Language: {product.Language}
                    </Typography>
                  )}
                  {product.Publishing_House && (
                    <Typography variant="body1">
                      Publishers: {product.Publishing_House}
                    </Typography>
                  )}
                  {product.Author && (
                    <Typography variant="body1">
                      Author: {product.Author}
                    </Typography>
                  )}
                  {product.Author_Name && (
                    <Typography variant="body1">
                      Author: {product.Author_Name}
                    </Typography>
                  )}
                  {product.Pages && (
                    <Typography variant="body1">
                      No. of Pages: {product.Pages}
                    </Typography>
                  )}
                  {product.Genre && (
                    <Typography variant="body1">
                      Genre: {product.Genre}
                    </Typography>
                  )}
                  {product.Material && (
                    <Typography variant="body1">
                      Material: {product.Material}
                    </Typography>
                  )}
                  {product.Colour && (
                    <Typography variant="body1">
                      Colour: {product.Colour}
                    </Typography>
                  )}
                  {product.Size && (
                    <Typography variant="body1">
                      Size: {product.Size}
                    </Typography>
                  )}
                  {product.Polish_Applicable && (
                    <Typography variant="body1">
                      Polish Used: {product.Polish_Applicable}
                    </Typography>
                  )}
                </div>
                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                >
                  <IconButton
                    onClick={handleDecreaseQuantity}
                    disabled={quantity === 0}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ margin: "0 10px" }}>{quantity}</Typography>
                  <IconButton onClick={handleAddToCart}>
                    <AddIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    sx={{ marginLeft: 2 }}
                  >
                    Add To Cart
                  </Button>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </div>
  );
}

export default Product;
