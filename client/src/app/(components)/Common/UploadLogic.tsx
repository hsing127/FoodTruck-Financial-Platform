import React, { forwardRef, useImperativeHandle, useRef } from "react";

// Define the props for UploadLogic
interface UploadLogicProps {
  onFileUpload: (fileType: string, file: File) => void;
}

// Define the handle interface to expose upload functions
export interface UploadLogicHandle {
  triggerImageUpload: () => void;
  triggerDocumentUpload: () => void;
  triggerSpreadsheetUpload: () => void;
}

const UploadLogic = forwardRef<UploadLogicHandle, UploadLogicProps>(
  ({ onFileUpload }, ref) => {
    // Refs for hidden file inputs
    const imageInputRef = useRef<HTMLInputElement>(null);
    const documentInputRef = useRef<HTMLInputElement>(null);
    const spreadsheetInputRef = useRef<HTMLInputElement>(null);

    // Expose functions to parent via ref
    useImperativeHandle(ref, () => ({
      triggerImageUpload: () => {
        imageInputRef.current?.click();
      },
      triggerDocumentUpload: () => {
        documentInputRef.current?.click();
      },
      triggerSpreadsheetUpload: () => {
        spreadsheetInputRef.current?.click();
      },
    }));

    // Handle file selection and pass the file to the parent
    const handleFileUpload = (
      e: React.ChangeEvent<HTMLInputElement>,
      fileType: string
    ) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        onFileUpload(fileType, file);
        e.target.value = ""; // Reset the input
      }
    };

    return (
      <>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e, "Image")}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          ref={documentInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e, "Document")}
        />
        <input
          type="file"
          accept=".xls,.xlsx,.csv"
          ref={spreadsheetInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e, "Spreadsheet")}
        />
      </>
    );
  }
);

UploadLogic.displayName = "UploadLogic";
export default UploadLogic;
