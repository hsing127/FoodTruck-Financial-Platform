"use client";

import React, { useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface LibraryItem {
  id: number;
  fileName: string;
  expirationDate: string;
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

const LibraryModal: React.FC<LibraryModalProps> = ({ isOpen, onClose }) => {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/viewLibrary";
  const email = "ajwitt2@asu.edu";

  useEffect(() => {
    if (isOpen) {

      const fetchData = async () => {
        setLoading(true);
        try{
          const response = await fetch (apiUrl, {
            method: "POST",
            body: JSON.stringify({
              username: email,
            }),
            headers: {
              "Content-Type": "application/json"
            },
          });
          if (!response.ok) {
            throw new Error("Network response failed");
          }
          const data = await response.json();
          setLibraryItems(data);
        }catch (error) {
          setError("Failed to load library items");
        } finally {
          setLoading(false);
        }

      }
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center z-50"
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
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div>
                {libraryItems.length ? (
                  libraryItems.map((item) => (
                    <div key={item.id} className="p-2 border-b border-gray-200">
                      {item.fileName}
                    </div>
                  ))
                ) : (
                  <p>No items found.</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
  
  export default LibraryModal;