import React from "react";

interface FormLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  description,
  children,
}) => (
  <div className="flex justify-center items-center h-screen bg-cover bg-fixed bg-center bg-gray-950">
    <div className="bg-customWhite/5 backdrop-blur-lg rounded-xl shadow-lg p-10 max-w-md w-full mx-auto">
      <h2 className="text-customWhite text-2xl text-center mb-10">{title}</h2>
      {description && (
        <p className="text-customWhite text-center mb-6">{description}</p>
      )}
      {children}
    </div>
  </div>
);

export default FormLayout;
