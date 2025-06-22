import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MDBContainer, MDBCardImage } from 'mdb-react-ui-kit';
import { FaCheckCircle, FaRegCircle, FaStar } from 'react-icons/fa';
import axios from 'axios';

export default function OrderProductDetails() {
  const { id } = useParams(); // orderId
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const stages = ['Order Placed', 'Processing', 'Shipping', 'Delivered'];
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/order/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    const mockStatus = 'Shipping'; // This should ideally come from order.status
    const index = stages.findIndex(stage => stage === mockStatus);
    setCurrentStageIndex(index !== -1 ? index : 0);
  }, []);

  const handleRatingClick = (index) => setRating(index);
  const handleReviewSubmit = async () => {
  const token = localStorage.getItem('token');
  const productId = item.productId;

  try {
    // Post rating
    await axios.post(
      `http://localhost:8080/api/rating/product/${productId}`,
      { value: rating },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Post review
    await axios.post(
      `http://localhost:8080/api/review/product/${productId}`,
      { comment: review,
        userName:localStorage.getItem("user")
       },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    alert('Thank you for your review!');
    setRating(0);
    setReview('');
  } catch (error) {
    console.error('Failed to submit review and rating:', error);
    alert('Failed to submit review.');
  }
};


  if (loading) {
    return (
      <MDBContainer className="py-5 text-center">
        <h4>Loading order details...</h4>
      </MDBContainer>
    );
  }

  if (!order || !order.orderItems?.length) {
    return (
      <MDBContainer className="py-5 text-center">
        <h2>Order Not Found</h2>
        <p>No order found with ID {id}.</p>
      </MDBContainer>
    );
  }

  const item = order.orderItems[0]; // assuming one item per order
  const img = item.imgpath || 'https://via.placeholder.com/200';

  return (
    <MDBContainer className="py-5">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/orders" style={{ textDecoration: 'none', fontSize: '32px', fontWeight: 'bold', color: '#000' }}>
          ←
        </Link>
      </div>

      {/* Order Product Display */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        background: '#1e1e1e',
        color: '#f0f0f0',
        padding: '20px',
        borderRadius: '12px',
        gap: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        {/* Left Section */}
        <div style={{ flex: '3 1 60%', minWidth: '300px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <MDBCardImage
              src={img}
              alt={`Product ${item.productId}`}
              style={{ width: '160px', height: '200px', borderRadius: '10px', objectFit: 'cover' }}
            />
            <div>
              <h4 style={{ marginBottom: '8px' }}>Product ID: {item.productId}</h4>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <p><strong>Order ID:</strong> {order.orderId}</p>
            </div>
          </div>

          {/* Review Section */}
          <div style={{ marginTop: '30px' }}>
            <h5 className="mb-3">Rate & Review</h5>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  color={(hoverRating || rating) >= star ? '#ffc107' : '#ccc'}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              rows="3"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                color: '#000'
              }}
            />
            <button
              onClick={handleReviewSubmit}
              style={{
                backgroundColor: '#ffc107',
                color: '#000',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Submit Review
            </button>
          </div>

          {/* Tracking Progress */}
          <div style={{ marginTop: '40px' }}>
            <h5 className="mb-4">Track Product</h5>
            <div style={{ position: 'relative', paddingTop: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 1, position: 'relative' }}>
                {stages.map((stage, index) => (
                  <div key={index} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      margin: '0 auto',
                      borderRadius: '50%',
                      backgroundColor: index <= currentStageIndex ? '#28a745' : '#777',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {index <= currentStageIndex ? (
                        <FaCheckCircle color="#fff" size={18} />
                      ) : (
                        <FaRegCircle color="#ccc" size={18} />
                      )}
                    </div>
                    <small style={{ marginTop: '8px', fontSize: '12px' }}>{stage}</small>
                  </div>
                ))}
              </div>
              <div style={{
                position: 'absolute',
                top: '58px',
                left: '0',
                right: '0',
                height: '4px',
                backgroundColor: '#28a745',
                zIndex: 0
              }} />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div style={{
          flex: '2 1 35%',
          backgroundColor: '#2b2b2b',
          padding: '20px',
          borderRadius: '12px',
          color: '#e1e1e1',
          minWidth: '250px'
        }}>
          <h5 className="mb-3">Shipping Details</h5>
          <p>
            <strong>Shipping Address:</strong><br />
            {order.shippingAddress}
          </p>
          <hr style={{ borderColor: '#444' }} />
          <h5 className="mb-2">Total Amount</h5>
          <p style={{ fontWeight: 'bold', fontSize: '18px' }}>₹{order.totalAmount}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        </div>
      </div>
    </MDBContainer>
  );
}
