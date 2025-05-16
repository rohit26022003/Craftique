import React from 'react';
import {
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBContainer
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

export default function OrderDetails() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'Samsung Galaxy',
      color: 'White',
      storage: '64GB',
      qty: 1,
      price: '₹499',
      image:
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp',
      receiptNo: '1KAU9-84UIL'
    },
    // Add more products if needed
  ];

  const handleBack = () => {
    navigate('/');
  };

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

      {/* Product Cards */}
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
        {products.map((product) => (
          <div
            key={product.id}
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
                src={product.image}
                alt={product.name}
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
                {product.name}
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
                <strong>Color:</strong> {product.color} <br />
                <strong>Storage:</strong> {product.storage} <br />
                <strong>Quantity:</strong> {product.qty} <br />
                <strong>Price:</strong> {product.price} <br />
                <strong>Receipt No:</strong> {product.receiptNo}
              </MDBCardText>

              <Link
                to={`/order-product/${product.id}`}
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
        ))}
      </div>

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
