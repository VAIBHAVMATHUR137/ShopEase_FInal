import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CartContext from "../context/CartContext";

function Home() {
  const { products } = useContext(CartContext);
  const navigate = useNavigate();

  const ProductList = ({ category, timerDuration }) => (
    <div>
      <div className="w-full py-4 bg-gray-500">
        <p className="text-xl md:text-2xl text-center">
          {category === "Laptop" ? "Season deal on laptops" : "PayDay Sale on smartphones"}
        </p>
        <div className="text-xl md:text-2xl text-center">
          <Timer initialTime={timerDuration} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
        {products
          .filter((product) => product.Category === category)
          .map((product) => (
            <Card
              key={product.id}
              onClick={() => navigate("/ProductListing")}
              style={{ cursor: "pointer" }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image={product.Image}
                title={product.Name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" align="center">
                  {product.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {product.Description}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="w-full h-[35vw] md:h-[25vw]">
        <img
          src="https://plus.unsplash.com/premium_photo-1683746792467-c6ae33d06c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Homepage"
          className="object-cover h-full w-full"
        />
      </div>
      <ProductList category="Laptop" timerDuration={86400} />
      <ProductList category="Mobile" timerDuration={16400} />
    </div>
  );
}

export default Home;