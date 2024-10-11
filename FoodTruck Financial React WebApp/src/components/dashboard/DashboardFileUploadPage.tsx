import React from 'react';
import Link from 'next/link';
import '../../styles/FileUpload.css';

const DashboardFileUploadPage: React.FC = () => {
  return (
    <div className="file-upload-page-body">
      <div className="file-upload-container">
        <h1>Upload anything, from anywhere, with OCR.</h1>
        <p>OCR (Optical Character Recognition) allows you to extract text from images or scanned documents.</p>

        {/* File Upload Section */}
        <div className="file-upload-display">
          <div className="file-preview empty">
            <span className="empty-text">Upload your file here</span>
            <button className="file-upload-icon">
              <i className="fa fa-upload"></i>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="file-upload-buttons">
          <Link href="/dashboard">
            <button className="btn-back">Back to Dashboard</button>
          </Link>
          <button className="btn-add">Add File</button>
          <button className="btn-scan">Scan Page</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardFileUploadPage;
