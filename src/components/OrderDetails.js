import React, { useEffect, useState } from 'react';
import {
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBContainer
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OrderDetails() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userid');

        const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setOrders(response.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <MDBContainer className="py-4">
      {/* Back Button */}
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#000',
            fontSize: '30px',
            fontWeight: 'bold',
            cursor: 'pointer',
            lineHeight: '1',
            padding: 0
          }}
          aria-label="Back"
        >
          ←
        </button>
      </div>

      {/* Page Title */}
      <h3
        className="mb-5"
        style={{
          fontWeight: '600',
          fontFamily: 'Poppins, sans-serif',
          color: '#000',
          borderBottom: '3px solid #000',
          display: 'inline-block'
        }}
      >
        Order Summary
      </h3>

      {/* Orders Content */}
      {loading ? (
        <p>Loading order details...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1000px'
          }}
        >
          {orders.map((order) =>
            order.orderItems.map((item, index) => (
              <div
                key={`${order.orderId}-${item.itemId}-${index}`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  border: '2px solid #000',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  background: '#f9f9f9',
                  padding: '10px'
                }}
              >
                {/* Product Image */}
                <div
                  style={{
                    flex: '1 1 300px',
                    minWidth: '300px',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                >
                  <MDBCardImage
                    src={item.imgpath || 'https://via.placeholder.com/300'}
                    alt={`Product ${item.productId}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                </div>

                {/* Product Details */}
                <MDBCardBody
                  style={{
                    flex: '2 1 400px',
                    color: '#000',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '25px',
                    minWidth: '250px',
                    borderRadius: '10px',
                    backgroundColor: '#fff',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 30px'
                  }}
                >
                  <MDBCardTitle className="mb-3" style={{ fontSize: '1.5rem' }}>
                    Product ID: {item.productId}
                  </MDBCardTitle>

                  <MDBCardText
                    className="mb-4"
                    style={{
                      fontSize: '1rem',
                      backgroundColor: '#f0f0f0',
                      padding: '16px',
                      borderRadius: '10px',
                      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 10px'
                    }}
                  >
                    <strong>Quantity:</strong> {item.quantity} <br />
                    <strong>Price:</strong> ₹{item.price} <br />
                    <strong>Order ID:</strong> {order.orderId} <br />
                    <strong>Order Date:</strong>{' '}
                    {new Date(order.orderDate).toLocaleDateString()} <br />
                    <strong>Payment Method:</strong> {order.paymentMethod} <br />
                    <strong>Payment Status:</strong> {order.paymentStatus} <br />
                    <strong>Shipping Address:</strong> {order.shippingAddress}
                  </MDBCardText>

                  <Link
                    to={`/order-product/${order.orderId}`}
                    style={{
                      display: 'inline-block',
                      border: '2px solid #000',
                      color: '#fff',
                      backgroundColor: '#000',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      fontWeight: '600',
                      fontSize: '16px',
                      textDecoration: 'none',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      width: 'fit-content',
                      marginTop: '15px'
                    }}
                  >
                    View Order Details
                  </Link>
                </MDBCardBody>
              </div>
            ))
          )}
        </div>
      )}

      {/* Style Overrides */}
      <style>{`
        a:hover {
          background-color: #222;
          color: #fff;
          border-color: #222;
        }

        a:focus {
          outline: none;
        }

        @media (max-width: 768px) {
          a {
            width: 100%;
          }
        }
      `}</style>
    </MDBContainer>
  );
}
