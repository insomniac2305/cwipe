"use client";
import { createContext } from "react";
import { FlattenedValidationErrors } from "@/app/lib/definitions";

export default createContext<{
  currentStep: number;
  validationErrors?: FlattenedValidationErrors;
}>({ currentStep: 0, validationErrors: undefined });
