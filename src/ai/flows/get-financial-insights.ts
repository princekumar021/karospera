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
  prompt: `You are a helpful, friendly, and sharp financial assistant. Your goal is to provide 2-3 clear, actionable, and encouraging insights based on the user's financial data. Be analytical and specific.

  Analyze the following data:
  - Monthly Income: {{{monthlyIncome}}}
  - Recurring Expenses: {{json recurringExpenses}}
  - Financial Goals: {{json goals}}
  - Recent Transactions: {{json transactions}}

  Based on this data, identify interesting patterns, potential savings, progress towards goals, or areas for improvement. Be specific and use numbers where possible.

  Here are some examples of the kind of high-quality insights you should generate:
  - "Your spending on 'Food' was 20% higher this month compared to your average. Consider setting a specific budget for dining out to manage this."
  - "You're 75% of the way to your 'New Laptop' goal! At your current savings rate, you could reach it in just 2 more months. Keep up the great work."
  - "You have a recurring subscription for 'Streaming Service' that you haven't used recently. Could you save money by pausing or canceling it?"
  - "Great job keeping your entertainment spending low this month! You spent 30% less than last month."
  - "I noticed a large one-time expense of $500 for 'Car Repair'. Remember to factor unexpected costs like this into your emergency fund."

  Focus on being encouraging and providing concrete, easy-to-understand advice. Keep each insight to a single, impactful sentence. Do not use generic advice. Base every insight on the data provided.
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
