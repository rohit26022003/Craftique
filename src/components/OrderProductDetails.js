import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MDBContainer, MDBCardImage } from 'mdb-react-ui-kit';
import { FaCheckCircle, FaRegCircle, FaStar } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: 'iPhone 14 Pro Max',
    color: 'White',
    price: '₹255,555',
    image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp',
    phone: ['7044349782'],
    address: 'Kolkata, West Bengal, India',
    receiptNo: '1KAU9-84UIL',
  }
];

export default function OrderProductDetails() {
  const { id } = useParams();
  const product = products.find(item => item.id === parseInt(id));

  const stages = ['Order Placed', 'Processing', 'Shipping', 'Delivered'];
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    const fetchOrderStatus = () => {
      const mockStatus = 'Shipping'; // Simulated API response
      const stageIndex = stages.findIndex(stage => stage === mockStatus);
      setCurrentStageIndex(stageIndex !== -1 ? stageIndex : 0);
    };
    const timer = setTimeout(fetchOrderStatus, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRatingClick = (index) => setRating(index);
  const handleReviewSubmit = () => {
    console.log('Rating:', rating);
    console.log('Review:', review);
    alert('Thank you for your review!');
    setRating(0);
    setReview('');
  };

  if (!product) {
    return (
      <MDBContainer className="py-5 text-center">
        <h2>Product Not Found</h2>
        <p>The product you are trying to view does not exist.</p>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer className="py-5">
      {/* Back Arrow Link */}
      <div className="mb-4">
        <Link
          to="/orders"
          style={{
            textDecoration: 'none',
            background: 'none',
            color: '#000000',
            fontSize: '32px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, color 0.3s ease',
          }}
        >
          ←
        </Link>
      </div>

      {/* Product Details Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1))',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          color: '#f1f1f1',
          padding: '20px',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {/* Left Section */}
        <div style={{ flex: '3 1 60%', minWidth: '300px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <MDBCardImage
              src={product.image}
              alt={product.name}
              style={{
                width: '160px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '10px',
                border: '2px solid #444',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
            />
            <div>
              <h4 style={{ marginBottom: '8px', fontSize: '20px' }}>{product.name}</h4>
              <p style={{ margin: '5px 0' }}><strong>Color:</strong> {product.color}</p>
              <p style={{ margin: '5px 0' }}><strong>Seller:</strong> Flipkart Retail</p>
              <p style={{ fontWeight: 'bold', fontSize: '22px' }}>{product.price}</p>
            </div>
          </div>

          {/* Review and Rating Section */}
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
                color: '#000',
                resize: 'none',
                marginBottom: '10px',
              }}
            />
            <button
              onClick={handleReviewSubmit}
              style={{
                backgroundColor: '#ffc107',
                color: '#000',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Submit Review
            </button>
          </div>

          {/* Tracking Section */}
          <div style={{ marginTop: '40px' }}>
            <h5 className="mb-4">Track Product</h5>
            <div style={{ position: 'relative', paddingTop: '40px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {stages.map((stage, index) => (
                  <div key={index} style={{ textAlign: 'center', flex: 1 }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        margin: '0 auto',
                        borderRadius: '50%',
                        backgroundColor: index <= currentStageIndex ? '#28a745' : '#777',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
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
              <div
                style={{
                  position: 'absolute',
                  top: '58px',
                  left: '0',
                  right: '0',
                  height: '4px',
                  backgroundColor: '#28a745',
                  zIndex: 0,
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: '2 1 35%',
            backgroundColor: 'rgba(43, 43, 43, 0.8)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #555',
            color: '#d3d3d3',
            minWidth: '250px',
          }}
        >
          <h5 className="mb-3">Shipping Details</h5>
          <p>
            <strong>Rohit Shrivastava</strong><br />
            {product.address}<br />
            <strong>Phone:</strong> {product.phone.join(', ')}
          </p>

          <hr style={{ borderColor: '#444' }} />

          <h5 className="mb-2">Total Price</h5>
          <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{product.price}</p>
        </div>
      </div>
    </MDBContainer>
  );
}
