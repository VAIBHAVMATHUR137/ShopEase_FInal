import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartContext from "../context/CartContext";
import DialogBox from "../components/Dialog";
import { Card, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { cart, removeFromCart, resetCart, sum, userData } = useContext(CartContext);
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between p-4 flex-grow">
        <div className="w-full md:w-3/5 mb-4 md:mb-0">
          {cart.length === 0 ? (
            <Typography variant="h4" align="center" className="mt-8">
              Cart is empty
            </Typography>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id}>
                  <Card className="w-full">
                    <div className="flex flex-col sm:flex-row">
                      <CardMedia
                        component="img"
                        image={item.Image}
                        alt={item.Name}
                        className="h-48 sm:h-auto sm:w-1/3 object-cover"
                      />
                      <CardContent className="flex-grow p-4">
                        <Typography variant="h6" component="div" className="mb-2">
                          {item.Name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="mb-2">
                          ₹{item.Price} (Qty: {item.quantity})
                        </Typography>
                        <Typography variant="subtitle1" className="mb-2">
                          Total: ₹{(item.Price * item.quantity).toFixed(2)}
                        </Typography>
                        <Button
                          variant="outlined"
                          onClick={() => removeFromCart(item.id)}
                          size="small"
                        >
                          Remove
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="w-full md:w-1/3">
            <Card elevation={3} className="sticky top-4">
              <CardContent>
                <Button
                  fullWidth
                  variant="contained"
                  className="mb-4 rounded-full bg-purple-700 hover:bg-purple-800"
                  onClick={checkoutAuthentication}
                >
                  Proceed to Payment
                </Button>

                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <ul className="mb-4 list-disc pl-5">
                  {cart.map((product) => (
                    <li key={product.id}>
                      {product.Name} x {product.quantity}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center mt-4">
                  <Typography variant="h6" className="font-bold">
                    Order Total:
                  </Typography>
                  <Typography variant="h6" className="font-bold text-red-700">
                    ₹{sum.toFixed(2)}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="text-center mt-6 mb-8">
          <Button
            variant="contained"
            onClick={resetCart}
            className="bg-red-600 hover:bg-red-700"
            startIcon={<DeleteIcon />}
          >
            Clear Cart
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