import React from "react";
import { Globe } from "lucide-react";
import SectionCard from "./sectionCard";

const Language: React.FC = () => {
  return (
    <SectionCard icon={Globe} title="Language & Currency">
      <div className="text-gray-700">

        {/* Language Selection Row */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-black">Language</span>
          <select className="max-w-[200px] border border-gray-300 rounded-lg p-2 w-full sm:w-1/2 bg-white text-black">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        {/* Currency Selection Row */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-medium text-black">Currency</span>
          <select className="max-w-[200px] border border-gray-300 rounded-lg p-2 w-full sm:w-1/2 bg-white text-black">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>JPY</option>
          </select>
        </div>
      </div>
    </SectionCard>
  );
};

export default Language;
