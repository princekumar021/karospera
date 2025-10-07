'use server';

/**
 * @fileOverview Provides personalized financial tips and suggestions based on user spending habits and financial goals.
 *
 * - getPersonalizedTips - A function that returns personalized financial tips.
 * - PersonalizedTipsInput - The input type for the getPersonalizedTips function.
 * - PersonalizedTipsOutput - The return type for the getPersonalizedTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTipsInputSchema = z.object({
  spendingHabits: z
    .string()
    .describe('Description of the user\'s spending habits.'),
  financialGoals: z.string().describe('The user\'s financial goals.'),
  monthlyIncome: z.number().describe('The user\'s monthly income.'),
});
export type PersonalizedTipsInput = z.infer<typeof PersonalizedTipsInputSchema>;

const PersonalizedTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('An array of personalized financial tips.'),
});
export type PersonalizedTipsOutput = z.infer<typeof PersonalizedTipsOutputSchema>;

export async function getPersonalizedTips(input: PersonalizedTipsInput): Promise<PersonalizedTipsOutput> {
  return personalizedTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTipsPrompt',
  input: {schema: PersonalizedTipsInputSchema},
  output: {schema: PersonalizedTipsOutputSchema},
  prompt: `You are a financial advisor providing personalized tips.

  Based on the user's spending habits, financial goals, and monthly income, provide a list of actionable tips to improve their financial health. The tips should be concise and easy to understand.

  Spending Habits: {{{spendingHabits}}}
  Financial Goals: {{{financialGoals}}}
  Monthly Income: {{{monthlyIncome}}}

  Format the output as a numbered list of tips.
  `,
});

const personalizedTipsFlow = ai.defineFlow(
  {
    name: 'personalizedTipsFlow',
    inputSchema: PersonalizedTipsInputSchema,
    outputSchema: PersonalizedTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
