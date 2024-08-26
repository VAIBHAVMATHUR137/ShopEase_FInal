import React, { useState, useContext } from "react";

import Navbar from "../components/Navbar";

import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function FinalCheckout() {
  const{userData,loading}=useContext(CartContext)
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  let { sum,resetCart } = useContext(CartContext);
  const navigate = useNavigate();



  const PaymentHandler = async (e) => {
    e.preventDefault();

    let amount;
    let currency;
    let order;
    try {
      amount = sum * 100; 
      currency = "INR";
      const receipt = "qwsaq1"; 

      const response = await fetch("https://shopeasebackend-g9dq646ub-vaibhav-mathurs-projects.vercel.app/order", {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      order = await response.json();
      
    } catch (error) {
      console.error("Error:", error);
    }

    var options = {
      key: "rzp_test_SSCU2UVKUcwlt1", 
      amount, 
      currency,
      name: "Shopease E commerce pvt ltd ",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, 
      handler: async function (response) {
        setPaymentDetails({
          orderId: order.id,
          paymentId: response.razorpay_payment_id,
        });
        setModalVisible(true);
      },
      prefill: {
        name: userData?.name || `${userData.name}`, 
        email: userData?.email || `${userData.email}`,
        contact: userData?.mobile || `${userData.mobile}`, 
      },
      notes: {
        address: userData?.address || `${userData.email}`,
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert("Payment failed: " + response.error.description);
    });
    rzp1.open();
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      resetCart()
      navigate("/");
    }, 1000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {userData && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-600">
                    Customer Name
                  </span>
                  <span className="text-lg text-gray-800">{userData.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-600">
                    Email
                  </span>
                  <span className="text-lg text-gray-800">
                    {userData.email}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-600">
                    Phone
                  </span>
                  <span className="text-lg text-gray-800">
                    {userData.mobile}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-600">
                    Address
                  </span>
                  <span className="text-lg text-gray-800">
                    {userData.address}
                  </span>
                </div>
              </div>
              <button
                onClick={PaymentHandler}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                Make Payment
              </button>
            </>
          )}
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Payment Successful
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Order ID:</strong> {paymentDetails.orderId}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Payment ID:</strong> {paymentDetails.paymentId}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalCheckout;
