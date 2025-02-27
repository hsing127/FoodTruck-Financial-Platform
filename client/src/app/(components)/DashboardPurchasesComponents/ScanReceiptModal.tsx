import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { backdropVariants, modalVariants } from "../Common/Animations";

interface ScanReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (scanData: any) => void;
}

const ScanReceiptModal: React.FC<ScanReceiptModalProps> = ({ isOpen, onClose, onScanComplete }) => {
  const [fileName, setFileName] = useState("");
  const [fileOptions, setFileOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchFileNames();
    }
  }, [isOpen]);

  const fetchFileNames = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/viewLibrary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "ajwitt2@asu.edu" }),
      });

      const data = await response.json();
      if (data.statusCode === 200) {
        const files = JSON.parse(data.body).files
            .map((file: { fileName: string }) => file.fileName)
            .filter((f: string) => f);
        setFileOptions(files);
        if (files.length > 0) {
          setFileName(files[0]); 
        }
      } else {
        setError("Failed to retrieve file names.");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Error retrieving files.");
    }

    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!fileName) {
      alert("Please select a file.");
      return;
    }

    try {
      const response = await fetch("https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/textract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: "ajwitt2@asu.edu/" + fileName }),
      });

      const data = await response.json();
      if (data.statusCode === 200) {
        onScanComplete(data);
      } else {
        onScanComplete(null);
      }
    } catch (error) {
      console.error("Error submitting file:", error);
      alert("There was an error processing the scanned receipt.");
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-96"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Scan Receipt</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading file options...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <select
                className="w-full border border-gray-300 rounded p-2 mb-4"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              >
                {fileOptions.map((file, index) => (
                  <option key={index} value={file}>
                    {file}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              disabled={loading || fileOptions.length === 0}
            >
              Submit
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanReceiptModal;
