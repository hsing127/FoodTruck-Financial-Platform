"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react"; // Using Plus and Minus icons from Lucide

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

const AccordionItem = React.memo(
  ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    return (
      <div
        className="py-7 border-b border-customWhite/30 cursor-pointer"
        onClick={toggleOpen}
        id="help"
      >
        <div className="flex items-center">
          <span className="flex-1 text-lg font-bold">{question}</span>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: {
                  opacity: 1,
                  height: "auto",
                  marginTop: "16px",
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                },
                collapsed: {
                  opacity: 0,
                  height: 0,
                  marginTop: 0,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn",
                  },
                },
              }}
              style={{ overflow: "hidden" }} // Ensures content doesn't spill
            >
              <p className="mt-3 text-customWhite/70">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

export const FAQs = () => {
  const memoizedItems = useMemo(
    () =>
      items.map(({ question, answer }) => (
        <AccordionItem question={question} answer={answer} key={question} />
      )),
    []
  );

  return (
    <div className="bg-customBlack text-customWhite bg-gradient-to-b from-[#5D2CA8] to-customBlack py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tighter sm:text-6xl sm:max-w-[648px] mx-auto">
          Frequently Asked Questions
        </h2>
        <div className="mt-12 max-w-[648px] mx-auto">{memoizedItems}</div>
      </div>
    </div>
  );
};
