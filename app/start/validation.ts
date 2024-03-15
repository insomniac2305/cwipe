import { z } from "zod";

export const LocalizationSchema = z.object({
  language: z.string().trim().min(1, "Selection is required"),
  region: z.string().trim().min(1, "Selection is required"),
});
