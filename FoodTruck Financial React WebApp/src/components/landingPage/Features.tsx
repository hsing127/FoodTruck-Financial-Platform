import EcosystemIcon from "../../assets/icons/ecosystem.svg"

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
  }
];

export const Features = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">Everything you need</h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mt-5 text-xl text-white/70">Our platform equips you with the tools to streamline daily 
          operations, optimize expenses, and drive profitability in a fast-paced industry.
          </p>
        </div>
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          {features.map(({ title, description }) => (
            <div key={title} className="border border-white/30 px-5 py-10 text-center rounded-xl sm:flex-1 max-w-sm">
              <div className="inline-flex h-14 w-14 bg-white text-black justify-center items-center rounded-lg">
                <EcosystemIcon />
              </div>
              <h3 className="mt-6 font-bold">{title}</h3>
              <p className="mt-2 text-white/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
