import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import CartContext from "../context/CartContext";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";

import DialogBox from "../components/Dialog";

function Cart() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  let { cart, removeFromCart, resetCart, sum, userData } =
    useContext(CartContext);

  const navigate = useNavigate();
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const putTitle = (heading) => setTitle(heading);
  const putMessage = (message) => setMessage(message);

  function checkoutAuthentication() {
    if (userData) {
      navigate("/Checkout");
    } else {
      openDialog();
      putTitle("Kindly Authenticate");
      putMessage("You need to sign-in to purchase");
    }
  }

  return (
    <div>
      <Navbar />
      <Box display="flex" justifyContent="space-around" px={1}>
        <Box width="55%">
          <div className="p-2">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <Box display="flex" flexDirection="column" alignItems="stretch">
                {cart.length === 0 ? (
                  <>
                    <h1 className="text-3xl font-bold mb-4" align='center'>Cart is empty</h1>
                  </>
                ) : (
                  cart.map((item) => (
                    <li
                      key={item.id}
                      style={{ marginBottom: "20px", width: "100%" }}
                    >
                      <Card
                        sx={{ width: "100%", marginBottom: 2 }}
                        onClick={() =>
                          navigate(`/ProductListing/Product/${item.id}`)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <Box display="flex" justifyContent="space-between">
                          <CardMedia
                            sx={{ height: 200, width: "50%" }}
                            image={item.Image}
                            title={item.Name}
                          />
                          <CardContent
                            sx={{
                              width: "30%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {item.Name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                ₹{item.Price} ({item.quantity})
                              </Typography>
                            </div>
                            <Button
                              variant="contained"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(item.id);
                              }}
                            >
                              Remove
                            </Button>
                          </CardContent>
                          <Box
                            sx={{
                              width: "20%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderLeft: "1px solid #e0e0e0",
                            }}
                          >
                            <Typography
                              variant="h6"
                              component="div"
                              align="center"
                            >
                              Total: ₹{(item.Price * item.quantity).toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </li>
                  ))
                )}
              </Box>
            </ul>
          </div>
        </Box>

        {cart.length > 0 && (
          <Box width="30%" mt={2}>
            <Card elevation={3}>
              <CardContent>
                <Button
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#6348a1",
                    color: "#ffffff",
                    marginBottom: "20px",
                    borderRadius: "20px",
                  }}
                  onClick={checkoutAuthentication}
                >
                  Proceed to Payment
                </Button>

                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Items:</Typography>
                  <Typography>
                    {cart.map((product) => (
                      <li key={product.id}>
                        {product.Name} X {product.quantity}
                      </li>
                    ))}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Order Total:
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "#B12704" }}
                  >
                    ₹{sum.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
      {cart.length > 0 && (
        <div style={{ marginTop: "20px" }} align="center">
          <Button
            variant="contained"
            onClick={resetCart}
            style={{ marginRight: "20px", backgroundColor: "#b32222" }}
          >
            Clear Cart
            <DeleteIcon />
          </Button>
        </div>
      )}
      <DialogBox
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={title}
        actionLabel="Close"
        onAction={closeDialog}
      >
        <p>{message}</p>
      </DialogBox>
    </div>
  );
}

export default Cart;
