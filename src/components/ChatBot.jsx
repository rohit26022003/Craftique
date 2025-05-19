// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          content:
            'Hello! 👋 I am CRAFTI-ROBO, your friendly craft assistant! How may I help you today?',
          options: [
            'Product Categories',
            'Shipping Information',
            'Return Policy',
            'Payment Methods',
            'How to Order',
            'Contact Support',
          ],
        },
      ]);
    }
  }, [isOpen]);

  const handleOptionClick = (option) => {
    setMessages([...messages, { type: 'user', content: option }]);
    setIsTyping(true);

    let response = '';
    switch (option) {
      case 'Product Categories':
        response = `Discover our exquisite handcrafted collections:

🌿 Natural Craft 
• Eco-friendly products
• Sustainable materials
• Nature-inspired designs

🪚 Wood Craft
• Hand-carved decorations
• Custom furniture pieces
• Wooden utensils and accessories

🎉 Festive Craft
• Seasonal decorations
• Festival-specific items
• Custom celebration pieces

🏺 Clay Craft
• Hand-painted pottery
• Decorative sculptures
• Functional ceramics

Would you like to explore any specific category in detail?`;
        break;
      case 'Shipping Information':
        response = `Our Shipping Details:
• Free delivery within Kolkata
• Standard shipping (3-5 business days) for rest of India
• Express shipping available (1-2 business days)
• Careful packaging to protect your delicate handcrafted items
• Real-time tracking provided
• International shipping available on request

Note: Delivery times may vary for custom orders.`;
        break;
      case 'Return Policy':
        response = `Our Customer-Friendly Return Policy:
• 7-day return window
• Items must be in original condition
• Free returns for damaged items
• Replacement or refund available
• Custom orders are non-returnable
• Contact us before initiating a return`;
        break;
      case 'Payment Methods':
        response = `We offer convenient payment options:
💳 Digital Payments
• UPI (All apps supported)
• Credit/Debit Cards

💵 Traditional Methods
• Cash on Delivery (COD)
• Bank Transfer

All transactions are secure and verified ✅`;
        break;
      case 'How to Order':
        response = `Ordering your handcrafted treasures is easy!

1. Browse our categories and find your perfect piece
2. Select your item and quantity
3. Add to cart
4. Choose delivery location
5. Select payment method (COD/UPI/Card)
6. Place your order

For custom orders:
• Contact us directly
• Discuss your requirements
• Get a custom quote
• Confirm design and proceed

Need help with any step?`;
        break;
      case 'Contact Support':
        response = `We're here to help you! 🤝

📧 Email: shuvamdeb2004@gmail.com
📞 Phone: +91 2110000000

📍 Visit Our Store:
Salt Lake - sector 5
Kolkata, West Bengal
India

🕒 Business Hours:
Monday to Friday: 11:30 AM - 5 PM IST
Saturday & Sunday Closed!!

Connect with us on social media:
• Instagram: @handcraftstore
• Facebook: /handcraftstore`;
        break;
      default:
        response = `I'm not quite sure about that. Would you like to know about our product categories or something else? Feel free to ask!`;
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: response,
          options: [
            'Product Categories',
            'Shipping Information',
            'Return Policy',
            'Payment Methods',
            'How to Order',
            'Contact Support',
          ],
        },
      ]);
    }, 1500);
  };

  const robotLogoVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, -10, 10, -10, 10, 0],
      scale: [1, 1.1, 1, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
    hover: {
      scale: 1.2,
      rotate: [0, -15, 15, -15, 15, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-black text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <motion.div
              variants={robotLogoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <FaRobot size={24} />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium"
            >
              CRAFTBOT
            </motion.span>
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <motion.div
                  variants={robotLogoVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <FaRobot size={24} />
                </motion.div>
                <h3 className="font-semibold">CRAFTBOT</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1"
              >
                <FaTimes size={20} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.type === 'bot' && msg.options && (
                    <div className="mt-2 space-y-2">
                      {msg.options.map((option, idx) => (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left p-2 text-sm text-gray-800 hover:bg-gray-100 rounded border border-gray-200 hover:border-black transition-colors"
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1 p-2">
                  <motion.span
                    variants={dotVariants}
                    initial="initial"
                    animate="animate"
                    className="w-2 h-2 bg-black rounded-full"
                  />
                  <motion.span
                    variants={dotVariants}
                    initial="initial"
                    animate="animate"
                    className="w-2 h-2 bg-black rounded-full"
                  />
                  <motion.span
                    variants={dotVariants}
                    initial="initial"
                    animate="animate"
                    className="w-2 h-2 bg-black rounded-full"
                  />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
