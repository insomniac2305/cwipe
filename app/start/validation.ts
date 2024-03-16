import { z } from "zod";

export const LocalizationSchema = z.object({
  language: z.string().trim().min(1, "Selection is required"),
  region: z.string().trim().min(1, "Selection is required"),
});

export const WatchProvidersSchema = z.object({
  providers: z.union([
    z.coerce.number().gt(0),
    z.array(z.coerce.number().gt(0)).nonempty(),
  ]),
});

export const GenresSchema = z.object({
  genres: z.union([
    z.coerce.number().gt(0),
    z.array(z.coerce.number().gt(0)).nonempty(),
  ]),
});
