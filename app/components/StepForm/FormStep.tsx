"use client";
import { ReactNode, useContext } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { StepFormContext } from "@/app/components/StepForm";

export default function FormStep({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const { currentStep } = useContext(StepFormContext);

  const variants = {
    initial: {
      opacity: 0,
      x: 100,
      transitionEnd: {
        display: "none",
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      display: "block",
    },
    done: {
      opacity: 0,
      x: -100,
      transitionEnd: {
        display: "none",
      },
    },
  };

  const animation =
    currentStep === index
      ? "visible"
      : currentStep < index
        ? "initial"
        : "done";

  return (
    <motion.div
      className={clsx(
        "h-full w-full",
        currentStep !== index && "absolute top-0",
      )}
      initial={false}
      variants={variants}
      animate={animation}
    >
      {children}
    </motion.div>
  );
}
