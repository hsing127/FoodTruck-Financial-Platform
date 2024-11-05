import React from "react";
import { Globe } from "lucide-react";
import SectionCard from "./sectionCard";
import SelectInput from "../DashboardSettingsComponents/selectinput";

const Language: React.FC = () => {
  return (
    <SectionCard icon={Globe} title="Language & Currency">
      <div className="text-gray-700">
        <SelectInput
          label="Language"
          options={["English", "Spanish", "French", "German"]}
        />
        <SelectInput label="Currency" options={["USD", "EUR", "GBP", "JPY"]} />
      </div>
    </SectionCard>
  );
};

export default Language;
