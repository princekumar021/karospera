import { z } from "zod";

export const recurringExpenseSchema = z.object({
  name: z.string().min(1, "Expense name is required."),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0."),
  frequency: z.enum(["Monthly", "Quarterly", "Yearly"]),
  dueDay: z.coerce.number().min(1).max(31).optional(),
});

export const transactionSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  type: z.enum(['income', 'expense']),
  category: z.string(),
  date: z.date(),
  note: z.string().optional(),
});

export const goalSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Goal name is required."),
  targetAmount: z.coerce.number().min(1, "Target amount is required."),
  currentAmount: z.coerce.number().default(0),
  targetDate: z.date().optional(),
  category: z.string().optional(),
});

export const setupSchema = z.object({
  // Step 1
  fullName: z.string().min(2, "Please enter a name with at least 2 characters."),
  
  // Step 2
  goals: z.array(goalSchema).default([]),
  
  // Step 3
  currency: z.string().default("INR"),
  monthlyIncome: z.coerce.number().min(1, "Please enter your monthly income."),
  payCycle: z.enum(["Monthly", "Bi-weekly", "Weekly", "Custom"]),
  
  // Step 4
  recurringExpenses: z.array(recurringExpenseSchema).default([]),
  
  // Step 5 & Settings
  budgetMethod: z.enum(["balanced", "50_30_20", "envelope", "zero_based"]).default("balanced"),
  notifications: z.boolean().default(true),
  budgetAlerts: z.boolean().default(true),
  goalReminders: z.boolean().default(true),
  monthlySummary: z.boolean().default(false),
  biometrics: z.boolean().default(false),
  bankSyncOptIn: z.boolean().default(false),
  theme: z.enum(['light', 'dark']).default('dark'),
  accentColor: z.string().default('blue'),
  avatar: z.string().optional(),
  
  // App Data
  transactions: z.array(transactionSchema).default([]),
});

export type SetupFormData = z.infer<typeof setupSchema>;
export type RecurringExpense = z.infer<typeof recurringExpenseSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type Goal = z.infer<typeof goalSchema>;
