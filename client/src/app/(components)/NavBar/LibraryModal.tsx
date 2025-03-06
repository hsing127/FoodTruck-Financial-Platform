"use client";

import React, { useEffect, useState } from "react";
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

  const apiUrl =
    "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/viewLibrary";
  const email = "ajwitt2@asu.edu";

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify({
              username: email,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Network response failed");
          }
          const data = await response.json();
          const parsedBody = JSON.parse(data.body);

          const formattedItems = (parsedBody.files || []).map(
            (item: any, index: any) => ({
              id: index, // Generating an ID
              fileName: item.fileName,
              expirationDate: item.expirationTime,
            })
          );

          setLibraryItems(formattedItems);
        } catch (error) {
          console.error("Error: ", error);
          setError("Failed to load library items");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen]);

  const handleDelete = async (id: number) => {
    try {
      // TODO: Implement API call to delete the file from the backend
      // const response = await fetch(apiDeleteUrl, {
      //   method: "POST",
      //   body: JSON.stringify({ fileId: id, username: email }),
      //   headers: { "Content-Type": "application/json" },
      // });

      // if (!response.ok) throw new Error("Failed to delete file");

      // Remove item from state after successful deletion
      setLibraryItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
      setError("Failed to delete file");
    }
  };

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
                    <div
                      key={item.id}
                      className="p-2 border-b border-gray-200 flex justify-between items-center"
                    >
                      <div>
                        <span>{item.fileName}</span>
                        <span className="text-gray-500 text-sm block">
                          {item.expirationDate}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
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
