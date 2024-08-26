import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  resetItem,
  updateItemQuantity,
} from "../Slice/cartSlice";
import { db } from "../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import CartContext from "./CartContext";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/Firebase";
import { signOut } from "firebase/auth";
function CartContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //This function handles the logout functionality
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          window.location.reload();
          dispatch(resetItem());
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  //Here we are fetching the details of each user which registered at our site.
  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        console.log("No user is signed in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  //Here we are fetching the details of all available products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const sum = cart.reduce((total, item) => {
    const price = parseFloat(item.Price);
    const quantity = parseInt(item.quantity, 10) || 1;
    return total + price * quantity;
  }, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    dispatch(addItem(item));
  };

  const removeFromCart = (id) => {
    dispatch(removeItem(id));
  };

  const resetCart = () => {
    dispatch(resetItem());
  };

  const updateQuantity = (id, quantity) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const getItemQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        resetCart,
        products,
        updateQuantity,
        getItemQuantity,
        sum,
        userData,
        loading,
        handleLogout,
        totalItemsInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
