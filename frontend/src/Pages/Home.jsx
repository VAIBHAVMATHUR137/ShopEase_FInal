import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
function Home() {
  const { products } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div style={{ height: "35vw", width: "100vw" }}>
        {" "}
        <img
          src="https://plus.unsplash.com/premium_photo-1683746792467-c6ae33d06c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Homepage"
          className="object-cover h-full w-full"
        />
      </div>

      <br />
      <div>
        <div className="w-full h-16 bg-gray-500">
          <p className="text-2xl text-center">Season deal on laptops</p>
          <div className="text-2xl text-center">
            {" "}
            <Timer initialTime={86400} />
          </div>
        </div>

        <div className="flex space-x-28 m-12">
          {products
            .filter((product) => product.Category === "Laptop")
            .map((product) => (
              <Card
                sx={{ maxWidth: 225 }}
                key={product.id}
                onClick={() => {
                  navigate("/ProductListing");
                }}
                style={{ cursor: "pointer" }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={product.Image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                  >
                    {product.Name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {product.Description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <div>
        <div className="w-full h-16 bg-gray-500">
          <p className="text-2xl text-center">PayDay Sale on smartphones</p>
          <div className="text-2xl text-center">
            {" "}
            <Timer initialTime={16400} />
          </div>
        </div>
        <div className="flex space-x-28 m-12">
          {products
            .filter((product) => product.Category === "Mobile")
            .map((product) => (
              <Card
                sx={{ maxWidth: 225 }}
                key={product.id}
                onClick={() => {
                  navigate("/ProductListing");
                }}
                style={{ cursor: "pointer" }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={product.Image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                  >
                    {product.Name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {product.Description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
