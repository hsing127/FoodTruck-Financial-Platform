"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiTrash } from "react-icons/fi";
import { MdArchive } from "react-icons/md"; // Import archive icon

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
            body: JSON.stringify({ username: email }),
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) throw new Error("Network response failed");
          const data = await response.json();
          const parsedBody = JSON.parse(data.body);

          const formattedItems = (parsedBody.files || []).map(
            (item: any, index: any) => ({
              id: index,
              fileName: item.fileName,
              expirationDate: new Date(
                Date.now() + item.expirationTime * 60000
              ).toLocaleDateString(),
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

  const handleDelete = async (fileName: string) => {
    try {
      const response = await fetch(
        "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/deleteFile",
        {
          method: "POST",
          body: JSON.stringify({ username: email, filename: fileName }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to delete file");
      setLibraryItems((prevItems) =>
        prevItems.filter((item) => item.fileName !== fileName)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
      setError("Failed to delete file");
    }
  };

  const handleRedownload = async (fileName: string) => {
    try {
      const response = await fetch(
        "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/retreiveFile",
        {
          method: "POST",
          body: JSON.stringify({ username: email, filename: fileName }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to retrieve file");

      const data = await response.json();
      const parsedBody = JSON.parse(data.body);

      if (!parsedBody.fileData) {
        throw new Error("Invalid response: Missing file data");
      }

      // Decode Base64 file data
      const byteCharacters = atob(parsedBody.fileData);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: "application/octet-stream" });

      // Create a temporary download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName; // Set correct file name
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error redownloading file:", error);
      setError("Failed to redownload file");
    }
  };

  const handleArchive = async (fileName: string) => {
    // TODO: Implement archiving logic
    console.log(`Archiving file: ${fileName}`);
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
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRedownload(item.fileName)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiDownload size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.fileName)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash size={18} />
                        </button>
                        <button
                          onClick={() => handleArchive(item.fileName)}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <MdArchive size={18} />
                        </button>
                      </div>
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
