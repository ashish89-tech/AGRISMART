import React from "react";
import { Trash2, CreditCard } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  
} from "../store/cartSlice";
import { addOrder } from "../store/Orderslice"
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
 
const Cart = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
 
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
    0,
  );
  const fee   = subtotal * 0.05;
  const total = subtotal + fee;
 
  const payNow = async () => {
    const response = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });
 
    const order = await response.json();
 
    const options = {
      key:         "rzp_test_SmOsP8gPuczQwQ",
      amount:      order.amount,
      currency:    "INR",
      name:        "Farmers Marketplace",
      description: "Order Payment",
      order_id:    order.id,
 
      handler: function (response) {
        // ── Save order to Redux store ──
        dispatch(
          addOrder({
            paymentId:  response.razorpay_payment_id,
            orderedAt:  new Date().toISOString(),
            items:      cartItems.map((item) => ({
              post:     item,
              quantity: item.quantity || 1,
            })),
            total: total,
          }),
        );
 
        // ── Clear cart after successful payment ──
        dispatch(clearCart());
 
        // ── Navigate to Orders page ──
        navigate("/orders");
      },
 
      theme: { color: "#16a34a" },
    };
 
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
 
  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Your Cart</h1>
 
      <div className="flex" style={{ gap: "3rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 600px" }}>
          <div
            className="glass animate-fade-in-up"
            style={{ borderRadius: "var(--radius-lg)", padding: "2rem" }}
          >
            {cartItems.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "var(--color-text-muted)",
                }}
              >
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={item.$id}
                  className="flex items-center justify-between"
                  style={{
                    paddingBottom:
                      index !== cartItems.length - 1 ? "1.5rem" : 0,
                    borderBottom:
                      index !== cartItems.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                    marginBottom:
                      index !== cartItems.length - 1 ? "1.5rem" : 0,
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.feturedImage
                          ? appwriteService.getFilePreview(item.feturedImage)
                          : item.image
                      }
                      alt={item.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "var(--radius-md)",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h3
                        style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-muted"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {item.farmName}
                      </p>
                      <p
                        style={{
                          fontWeight: 600,
                          color: "var(--color-primary)",
                          marginTop: "0.5rem",
                        }}
                      >
                        ₹{item.price} / {item.category}
                      </p>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-outline"
                        style={{ padding: "0.25rem 0.5rem" }}
                        onClick={() => dispatch(decrementQuantity(item.$id))}
                      >
                        -
                      </button>
                      <span
                        style={{
                          fontWeight: 600,
                          width: "20px",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity || 1}
                      </span>
                      <button
                        className="btn btn-outline"
                        style={{ padding: "0.25rem 0.5rem" }}
                        onClick={() => dispatch(incrementQuantity(item.$id))}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.$id))}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#EF4444",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
 
        <div style={{ flex: "1 1 300px" }}>
          <div
            className="glass animate-fade-in-up md:sticky"
            style={{
              borderRadius: "var(--radius-lg)",
              padding: "2rem",
              top: "100px",
              animationDelay: "0.1s",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
              Order Summary
            </h2>
            <div
              className="flex justify-between"
              style={{
                marginBottom: "1rem",
                color: "var(--color-text-muted)",
              }}
            >
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div
              className="flex justify-between"
              style={{
                marginBottom: "1.5rem",
                color: "var(--color-text-muted)",
              }}
            >
              <span>Platform Fee (5%)</span>
              <span>₹{fee.toFixed(2)}</span>
            </div>
            <div
              className="flex justify-between"
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: "1.5rem",
                marginBottom: "2rem",
                fontSize: "1.25rem",
                fontWeight: 600,
              }}
            >
              <span>Total</span>
              <span className="text-primary">₹{total.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "100%", padding: "1rem" }}
              onClick={payNow}
              disabled={cartItems.length === 0}
            >
              <CreditCard size={20} />
              Proceed to Checkout
            </button>
            <p
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "var(--color-text-muted)",
                marginTop: "1rem",
              }}
            >
              Secure checkout. Farmers get paid directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Cart;