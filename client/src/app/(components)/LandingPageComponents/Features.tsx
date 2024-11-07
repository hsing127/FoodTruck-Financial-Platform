import EcosystemIcon from "../../assets/icons/ecosystem.svg";
import { Feature } from "./Feature";
const features = [
  {
    title: "Receipt and Document Processing",
    description:
      "Leverage Optical Character Recognition (OCR) technology for automated receipt and document processing.",
  },
  {
    title: "Profit Optimization",
    description:
      "Optimize costs and maximize profits with data-driven strategies tailored to food truck operators.",
  },
  {
    title: "Real-Time Financial Insights",
    description:
      "Access real-time financial insights and detailed reports to monitor business performance.",
  },
];

export const Features = () => {
  return (
    <div id="features" className="bg-customBlack text-customWhite py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
          Everything you need
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mt-5 text-xl text-customWhite/70">
            Our platform equips you with the tools to streamline daily
            operations, optimize expenses, and drive profitability in a
            fast-paced industry.
          </p>
        </div>
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center max-w-6xl mx-auto">
          {features.map(({ title, description }) => (
            <Feature title={title} description={description} key={title} />
          ))}
        </div>
      </div>
    </div>
  );
};
