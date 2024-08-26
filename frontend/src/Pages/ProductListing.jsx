import React, { useContext, useState, useEffect } from "react";
import SuccessDialog from "../components/SuccessDialog";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartContext from "../context/CartContext";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Products = () => {
  const navigate = useNavigate();
  const { addToCart, products } = useContext(CartContext);
  const [filterCategory, setFilterCategory] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSortDialogOpen, setIsSortDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    priceLowToHigh: false,
    priceHighToLow: false,
    byRAM: false,
    byStorage: false,
    byBattery: false,
    byCamera: false, // Combined sorting by Front and Rear Camera
    byScreenSize: false,
  });

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsDialogOpen(true);
    setTimeout(() => setIsDialogOpen(false), 3000);
  };

  const handleSortChange = (event) => {
    setSortOptions({
      ...sortOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const applySort = (filteredProducts) => {
    let sortedProducts = [...filteredProducts];

    if (sortOptions.priceLowToHigh) {
      sortedProducts.sort((a, b) => a.Price - b.Price);
    }

    if (sortOptions.priceHighToLow) {
      sortedProducts.sort((a, b) => b.Price - a.Price);
    }

    if (sortOptions.byRAM) {
      sortedProducts.sort((a, b) => b.RAM - a.RAM);
    }

    if (sortOptions.byStorage) {
      sortedProducts.sort((a, b) => b.Internal_Storage - a.Internal_Storage);
    }

    if (sortOptions.byBattery) {
      sortedProducts.sort((a, b) => b.Battery - a.Battery);
    }

    if (sortOptions.byCamera) {
      sortedProducts.sort(
        (a, b) =>
          b.Front_Camera + b.Rear_Camera - (a.Front_Camera + a.Rear_Camera)
      );
    }

    if (sortOptions.byScreenSize) {
      sortedProducts.sort((a, b) => b.Screen_Size - a.Screen_Size);
    }

    return sortedProducts;
  };

  const applyFilter = () => {
    let filteredProducts = products;

    if (filterCategory) {
      filteredProducts = products.filter(
        (product) => product.Category === filterCategory
      );
    }

    const finalProducts = applySort(filteredProducts);
    setDisplayedProducts(finalProducts);
    setIsFilterDialogOpen(false);
  };

  const productCard = displayedProducts.map((product) => (
    <React.Fragment key={product.id}>
      <br />
      <Card sx={{ maxWidth: 345, margin: 2, marginBottom: 4 }} >
        <CardMedia
          sx={{ height: 140 }}
          image={product.Image}
          title={product.Name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {product.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {product.Description}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            align="center"
            component="div"
            sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            INR {product.Price}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size="small"
            onClick={() => handleAddToCart(product)}
            variant="contained"
            color="primary"
            sx={{
              marginRight: 1,
              paddingX: 2,
              paddingY: 1,
              fontWeight: "bold",
            }}
          >
            Add To Cart
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            sx={{ paddingX: 2, paddingY: 1, fontWeight: "bold" }}
            onClick={() => navigate(`/ProductListing/Product/${product.id}`)}
          >
            Know More
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  ));

  return (
    <>
      <Navbar />

      <div className="p-2">
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button variant="contained" onClick={() => setIsSortDialogOpen(true)}>
            Sort
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsFilterDialogOpen(true)}
          >
            Filter
          </Button>
        </Box>

        <Box display="flex" flexWrap="wrap" justifyContent="space-around">
          {productCard}
        </Box>
      </div>
      <SuccessDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        message="Item added to cart successfully!"
      />

      <Dialog
        open={isSortDialogOpen}
        onClose={() => setIsSortDialogOpen(false)}
      >
        <DialogTitle>Sort Options</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortOptions.priceLowToHigh}
                  onChange={handleSortChange}
                  name="priceLowToHigh"
                />
              }
              label="Price: Low to High"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortOptions.priceHighToLow}
                  onChange={handleSortChange}
                  name="priceHighToLow"
                />
              }
              label="Price: High to Low"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortOptions.byRAM}
                  onChange={handleSortChange}
                  name="byRAM"
                />
              }
              label="By RAM"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortOptions.byStorage}
                  onChange={handleSortChange}
                  name="byStorage"
                />
              }
              label="By Storage"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortOptions.byBattery}
                  onChange={handleSortChange}
                  name="byBattery"
                />
              }
              label="By Battery"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortOptions.byCamera}
                  onChange={handleSortChange}
                  name="byCamera"
                />
              }
              label="By Camera"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortOptions.byScreenSize}
                  onChange={handleSortChange}
                  name="byScreenSize"
                />
              }
              label="By Screen Size"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSortDialogOpen(false)}>Cancel</Button>
          <Button onClick={applyFilter}>Apply</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
      >
        <DialogTitle>Filter by Category</DialogTitle>
        <DialogContent>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            fullWidth
          >
            {Array.from(new Set(products.map((p) => p.Category))).map(
              (category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              )
            )}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFilterDialogOpen(false)}>Cancel</Button>
          <Button onClick={applyFilter}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Products;
