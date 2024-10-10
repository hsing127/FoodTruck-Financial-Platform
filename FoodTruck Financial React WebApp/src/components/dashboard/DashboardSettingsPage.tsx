import React from 'react';
import '../../styles/DashSettings.css';

interface InfoItemProps {
  title: string;
  content: string;
  description?: string;
  buttonLabel: string;
}

const DashboardSettingsPage: React.FC = () => {
  return (
    <div className="settings-container">
      <h1 className="settings-title">Security Settings</h1>
      <div className="info-section">
        <InfoItem title="Name" content="Joe" buttonLabel="Edit" />
        <InfoItem title="Email" content="joe@yahoo.com" buttonLabel="Edit" />
        <InfoItem
          title="Primary mobile number"
          content="123-456-7890"
          description="Quickly sign-in, easily recover passwords, and receive security notifications with this mobile number."
          buttonLabel="Edit"
        />
        <InfoItem title="Password" content="********" buttonLabel="Edit" />
        <InfoItem
          title="2-step verification"
          content="Add a layer of security. Require a code in addition to your password."
          buttonLabel="Turn on"
        />
      </div>
    </div>
  );
};

const InfoItem: React.FC<InfoItemProps> = ({ title, content, description, buttonLabel }) => {
  return (
    <div className="info-item">
      <div className="info-text">
        <h2>{title}</h2>
        <p>{content}</p>
        {description && <p className="info-description">{description}</p>}
      </div>
      <button className="info-button">{buttonLabel}</button>
    </div>
  );
};

export default DashboardSettingsPage;
