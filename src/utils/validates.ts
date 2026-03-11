import { z } from "zod";

export const validateOption = z.object({
  id: z.string(),
  name: z.string(),
  isCorrect: z.boolean(),
  canDelete: z.boolean(),
});

export const validateQuestion = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  options: z.array(validateOption),
});

export const validateInfo = z.object({
  name: z.string(),
  description: z.string(),
  questions: z.array(validateQuestion),
});
