"use client";
import PlusIcon from "../../../assets/icons/plus.svg";
import MinusIcon from "../../../assets/icons/minus.svg";
import React from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    question: "How does the service work for teams?",
    answer:
      "Our service is completely free, regardless of the number of team members you have. Whether you're a small team or a larger organization, everyone can access it without any costs.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "You don’t have to worry about changing plans because all features are available for free. You can start, scale, or make adjustments without any extra fees.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is our top priority. We use state-of-the-art encryption and comply with the best industry practices to ensure that your data is stored securely and accessed only by authorized users.",
  },
  {
    question: "What is the cost of this service?",
    answer: "Our service is 100% free. You can use all features at no charge.",
  },
];

const AccordianItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      key={question}
      className="py-7 border-b border-customWhite/30"
      onClick={() => setIsOpen(!isOpen)}
      id="help"
    >
      <div className="flex items-center">
        <span className="flex-1 text-lg font-bold">{question}</span>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: "16px",
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQs = () => {
  return (
    <div className="bg-customBlack text-customWhite bg-gradient-to-b from-[#5D2CA8] to-customBlack py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tighter sm:text-6xl sm:max-w-[648px] mx-auto">
          Frequency Asked Questions
        </h2>
        <div className="mt-12 max-w-[648px] mx-auto">
          {items.map(({ question, answer }) => (
            <AccordianItem question={question} answer={answer} key={question} />
          ))}
        </div>
      </div>
    </div>
  );
};
