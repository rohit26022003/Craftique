// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDtJNquRFlZzOWRrLwtAeJD6Fv6lRhspqE'; // ⚠️ Replace with your actual key

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
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
            'Hi! 👋 I am CRAFTI-ROBO powered by Gemini. Ask me anything related to crafts, orders, or even general questions!',
        },
      ]);
    }
  }, [isOpen]);

  const sendToGemini = async (text) => {
    setIsTyping(true);
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text }] }],
        }
      );

      const reply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I didn’t quite get that.';

      setMessages((prev) => [...prev, { type: 'bot', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: '⚠️ Gemini API Error: ' + err.message },
      ]);
    }
    setIsTyping(false);
  };

  const handleUserSubmit = async () => {
    if (!userInput.trim()) return;
    const message = userInput.trim();
    setMessages((prev) => [...prev, { type: 'user', content: message }]);
    setUserInput('');
    await sendToGemini(message);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleUserSubmit();
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
      transition: { duration: 0.5 },
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
    <div className="fixed bottom-4 right-4 z-50 w-full sm:w-auto">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-black text-white rounded-full p-4 shadow-lg flex items-center gap-2"
          >
            <motion.div
              variants={robotLogoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <FaRobot size={24} />
            </motion.div>
            <span className="hidden sm:inline text-sm font-medium">CRAFTBOT</span>
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md h-[500px] flex flex-col border border-gray-300"
          >
            {/* Header */}
            <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaRobot size={24} />
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className={`flex ${
                    msg.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.type === 'user'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1 px-2 py-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.span
                      key={i}
                      variants={dotVariants}
                      initial="initial"
                      animate="animate"
                      className="w-2 h-2 bg-black rounded-full"
                    />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-3 border-t border-gray-200 flex gap-2 items-center">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Ask anything..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleUserSubmit}
                className="bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-gray-900"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
