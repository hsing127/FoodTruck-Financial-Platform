"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

const LibraryModal: React.FC<LibraryModalProps> = ({ isOpen, onClose }) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-[500px] shadow-lg relative"
              variants={modalVariants}
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                aria-label="Close modal"
              >
                ✖
              </button>
              <h2 className="text-lg font-semibold mb-4">Library</h2>
              <p className="text-gray-600">
                Your uploaded images and documents will appear here.
              </p>
              {/* library content to be added */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  
  export default LibraryModal;