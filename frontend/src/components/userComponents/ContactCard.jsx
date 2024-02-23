import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const ContactCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{scale:1.012}}
      className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 p-6 rounded-md shadow-md text-white mb-4 fixed top-40"
    >
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <div className="flex items-center mb-2">
        <span className="mr-2">&#128231;</span>
        <p>afnanballoor44@gmail.com</p>
      </div>
      <div className="flex items-center mb-2">
        <span className="mr-2">
          <FaFacebook />
        </span>
        <p>https://www.facebook.com/ahammedafnan.ani/</p>
      </div>
      <div className="flex items-center mb-2">
        <span className="mr-2">
          <FaInstagram />
        </span>
        <p>https://www.instagram.com/a.ffn.n/</p>
      </div>
      <div className="flex items-center">
        <span className="mr-2">
          <FaLinkedinIn />
        </span>
        
        <p>https://www.linkedin.com/in/ahammed-afnan-208a88270/</p>
      </div>
    </motion.div>
  );
};

export default ContactCard;