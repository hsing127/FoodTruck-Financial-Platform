"use client"; // This directive ensures this component is a Client Component

const texts = [
  "A Common Voice to Government",
  "Access to Information & Training",
  "Market Development and Research",
  "Promotion, Branding and Visibility",
  "Benefits and Group Purchasing",
  "Networking & News You Can Use"
];

export const LogoTicker = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-xl text-center text-white/70">Sponsored by Food Truck Association Of Canada</h2>
        <h2 className="text-lg text-center text-white/70">How we support the industry:</h2>
        <div className="overflow-hidden mt-9 before:content-[''] after:content-[''] before:absolute after:absolute before:h-full after:h-full before:w-5 after:w-5 relative after:right-0 before:left-0 before:top-0 after:top-0 before:bg-[linear-gradient(to_right,#000,rgb(0,0,0,0))] after:bg-[linear-gradient(to_left,#000,rgb(0,0,0,0))]">
          <div className="flex gap-16 justify-center">
            {texts.map((text, index) => (
              <div key={index} className="flex-none text-center">
                <p className="text-lg">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};
