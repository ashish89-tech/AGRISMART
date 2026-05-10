import React, { useEffect } from "react";
import { ShoppingBag, CheckCircle } from "lucide-react";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../appwrite/config.js";

/* ── Helpers ── */
function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function shortOrderId(paymentId) {
  // e.g. "pay_PAvBtULMOHHhZX" → "ORD-AVBT"
  return "ORD-" + paymentId.replace("pay_", "").slice(0, 6).toUpperCase();
}

/* ── Timeline Steps ── */
const TIMELINE = [
  { label: "Confirmed", icon: "✓", status: "done" },
  { label: "Packing",   icon: "📦", status: "active" },
  { label: "Shipped",   icon: "🚚", status: "pending" },
  { label: "Delivered", icon: "🏠", status: "pending" },
];

/* ── Component ── */
const Orders = () => {
  const navigate = useNavigate();

  // Read orders from Redux store
  // Shape of each order in the array:
  // { paymentId, orderedAt, items: [{ post, quantity }], total }
  const orders = useSelector((state) => state.orders.orders);

  return (
    <div className="orders-root">

      {/* ── Hero Header ── */}
      <div className="orders-hero">
        <div className="orders-hero-inner">
          <div>
            <div className="orders-eyebrow">
              <span className="orders-eyebrow-dot" />
              Farmer Market
            </div>
            <h1 className="orders-title">
              My <span>Orders</span>
            </h1>
            <p className="orders-subtitle">
              Track your purchases and delivery status 🛍️
            </p>
          </div>

          {/* Order count badge */}
          <div className="orders-count-badge">
            <div className="orders-count-num">{orders.length}</div>
            <div className="orders-count-label">
              Total<br />Orders
            </div>
          </div>
        </div>
      </div>

      <div className="orders-body">

        <div className="orders-section-label">Order History</div>

        {/* ── Empty State ── */}
        {orders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon">🛒</div>
            <div className="orders-empty-title">No orders yet</div>
            <p className="orders-empty-sub">
              Once you complete a purchase, your confirmed orders will appear here.
            </p>
            <button
              className="orders-shop-btn"
              onClick={() => navigate("/all-post")}
            >
              <ShoppingBag size={16} />
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-grid">
            {/* Show newest orders first */}
            {[...orders].reverse().map((order, i) => (
              <div
                className="order-card"
                key={order.paymentId}
                style={{ animationDelay: `${i * 0.07}s` }}
              >

                {/* ── Card Header ── */}
                <div className="order-card-header">
                  <div className="order-header-left">
                    <div className="order-id">
                      {shortOrderId(order.paymentId)}
                    </div>
                    <div className="order-date">
                      {formatDate(order.orderedAt)}
                    </div>
                  </div>

                  <div className="order-header-right">
                    {/* Razorpay tag */}
                    <div className="order-razorpay-tag">
                      <span className="order-razorpay-dot" />
                      Razorpay
                    </div>

                    {/* Confirmed badge */}
                    <div className="order-confirmed-badge">
                      <div className="order-confirmed-check">✓</div>
                      Order Confirmed
                    </div>
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div className="order-card-body">

                  {/* Items */}
                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div className="order-item" key={idx}>

                        {/* Product image */}
                        {item.post.feturedImage ? (
                          <img
                            src={service.getFilePreview(item.post.feturedImage)}
                            alt={item.post.title}
                            className="order-item-img"
                          />
                        ) : (
                          <div className="order-item-img-placeholder">🌾</div>
                        )}

                        {/* Info */}
                        <div className="order-item-info">
                          <div className="order-item-name">
                            {item.post.title}
                          </div>
                          <div className="order-item-meta">
                            {item.post.category && (
                              <span className="order-item-cat">
                                {item.post.category}
                              </span>
                            )}
                            <span className="order-item-qty">
                              Qty: {item.quantity || 1}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="order-item-price">
                          ₹{(item.post.price * (item.quantity || 1)).toFixed(2)}
                        </div>

                      </div>
                    ))}
                  </div>

                  <div className="order-divider" />

                  {/* Footer: total + timeline */}
                  <div className="order-card-footer">
                    <div>
                      <div className="order-total-label">Amount Paid</div>
                      <div className="order-total-value">
                        ₹{order.total.toFixed(2)}
                      </div>
                      <div className="order-payment-id">
                        {order.paymentId}
                      </div>
                    </div>

                    {/* Delivery Timeline */}
                    <div className="order-timeline">
                      {TIMELINE.map((step, idx) => (
                        <React.Fragment key={step.label}>
                          {idx > 0 && (
                            <div
                              className={`order-timeline-line ${
                                TIMELINE[idx - 1].status === "done" ? "done" : ""
                              }`}
                            />
                          )}
                          <div className="order-timeline-step">
                            <div className={`order-timeline-dot ${step.status}`}>
                              {step.icon}
                            </div>
                            <div className="order-timeline-label">
                              {step.label}
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;