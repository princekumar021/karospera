'use server';
/**
 * @fileOverview Provides personalized financial insights based on user data.
 *
 * - getFinancialInsights - A function that returns personalized financial insights.
 * - FinancialInsightsInput - The input type for the getFinancialInsights function.
 * - FinancialInsightsOutput - The return type for the getFinancialInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { recurringExpenseSchema, goalSchema, transactionSchema } from '@/lib/setup-schema';

const FinancialInsightsInputSchema = z.object({
  monthlyIncome: z.number().describe("The user's monthly take-home income."),
  recurringExpenses: z.array(recurringExpenseSchema).describe("A list of the user's recurring expenses."),
  goals: z.array(goalSchema.extend({ targetDate: z.string().optional() })).describe("The user's financial goals."),
  transactions: z.array(transactionSchema.extend({ date: z.string() })).describe("A list of recent transactions."),
});
export type FinancialInsightsInput = z.infer<typeof FinancialInsightsInputSchema>;

const FinancialInsightsOutputSchema = z.object({
  insights: z.array(z.string()).describe("An array of 2-3 short, actionable financial insights."),
});
export type FinancialInsightsOutput = z.infer<typeof FinancialInsightsOutputSchema>;

export async function getFinancialInsights(
  input: any
): Promise<FinancialInsightsOutput> {
  return financialInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialInsightsPrompt',
  input: {schema: FinancialInsightsInputSchema},
  output: {schema: FinancialInsightsOutputSchema},
  prompt: `You are a helpful and friendly financial assistant. Your goal is to provide 2-3 clear, actionable, and encouraging insights based on the user's financial data.

  Analyze the following data:
  - Monthly Income: {{{monthlyIncome}}}
  - Recurring Expenses: {{json recurringExpenses}}
  - Financial Goals: {{json goals}}
  - Recent Transactions: {{json transactions}}

  Based on this data, identify interesting patterns, potential savings, progress towards goals, or areas for improvement.

  For example:
  - "Your spending on 'Food' was 20% higher this month. Consider setting a specific budget for dining out."
  - "You're 75% of the way to your 'New Laptop' goal! Keep up the great work."
  - "You have a recurring subscription for 'Streaming Service' that you haven't used recently. Could you save money by pausing it?"
  - "Great job keeping your entertainment spending low this month!"

  Focus on being encouraging and providing concrete, easy-to-understand advice. Keep each insight to a single sentence.
  `,
});

const financialInsightsFlow = ai.defineFlow(
  {
    name: 'financialInsightsFlow',
    inputSchema: z.any(),
    outputSchema: FinancialInsightsOutputSchema,
  },
  async input => {
    // Ensure there's some data to analyze
    if (input.transactions.length === 0 && input.recurringExpenses.length === 0) {
      return {
        insights: ["Start by adding some expenses or transactions to get personalized insights!"],
      };
    }
    
    // The AI flow expects dates as strings, but they are Date objects. Convert them.
    const sanitizedInput = {
      ...input,
      transactions: input.transactions.map((t: any) => ({...t, date: t.date.toISOString()})),
      goals: input.goals.map((g: any) => ({...g, targetDate: g.targetDate?.toISOString()}))
    }

    const {output} = await prompt(sanitizedInput);
    return output!;
  }
);
