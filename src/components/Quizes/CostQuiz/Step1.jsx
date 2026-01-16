"use client";
import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/GlobalContext";

const options = [
  { id: "quiz-option-1", label: "Adventure activities", value: "adventure" },
  { id: "quiz-option-2", label: "Restaurants/Cafes", value: "restaurants" },
  { id: "quiz-option-3", label: "Nature & Relaxation", value: "nature" },
  { id: "quiz-option-4", label: "Shopping & Entertainment", value: "shopping" },
];

const Step1 = () => {
  const { updateFinderQuizValue, finderQuizValues } = useGlobalContext();

  // Get current value for step1 (may be null or array)
  const selectedValues = finderQuizValues?.step1?.value || [];

  // Handle checkbox change for multiple selections
  const handleChange = (e) => {
    const { value, checked } = e.target;
    let newValues = Array.isArray(selectedValues) ? [...selectedValues] : [];
    if (checked) {
      if (!newValues.includes(value)) {
        newValues.push(value);
      }
    } else {
      newValues = newValues.filter((v) => v !== value);
    }
    updateFinderQuizValue("step1", newValues, null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="quiz-step"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 className="sec-head medium" variants={itemVariants}>
        <span>Q1:</span> What kind of experience are you looking for?
      </motion.h2>
      <div className="quiz-options">
        <motion.div className="row row-gap-25" variants={containerVariants}>
          {options.map((opt) => (
            <motion.div
              className="col-lg-6 col-12"
              variants={itemVariants}
              key={opt.id}
            >
              <div className="quiz-option">
                <input
                  type="checkbox"
                  name="quiz-option"
                  id={opt.id}
                  value={opt.value}
                  checked={
                    Array.isArray(selectedValues) &&
                    selectedValues.includes(opt.value)
                  }
                  onChange={handleChange}
                />
                <label htmlFor={opt.id}>
                  <span>{opt.label}</span>
                </label>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1;
