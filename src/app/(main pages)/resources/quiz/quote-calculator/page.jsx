"use client";
import React from "react";
import QuoteCalculator from "@/components/Quizes/QuoteCalculator/QuoteCalculator";
import { redirect } from "next/navigation";

const page = ({ searchParams }) => {
  const params = React.use(searchParams) || {};
  if (params.category === "") {
    redirect("/resources/quiz/quote-calculator?category=birthday");
  }
  return <QuoteCalculator category={params.category} />;
};

export default page;
