'use server';
/**
 * @fileOverview This file contains the personalized budget suggestions flow.
 *
 * - `getPersonalizedBudgetSuggestions` - A function that returns personalized budget suggestions based on user input.
 * - `PersonalizedBudgetSuggestionsInput` - The input type for the `getPersonalizedBudgetSuggestions` function.
 * - `PersonalizedBudgetSuggestionsOutput` - The return type for the `getPersonalizedBudgetSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedBudgetSuggestionsInputSchema = z.object({
  monthlyIncome: z.number().describe('The user\'s monthly take-home income.'),
  recurringExpenses: z.array(
    z.object({
      name: z.string().describe('The name of the expense.'),
      amount: z.number().describe('The amount of the expense.'),
      frequency: z.enum(['Monthly', 'Quarterly', 'Yearly']).describe('The frequency of the expense.'),
      dueDay: z.number().optional().describe('The day of the month the expense is due.'),
    })
  ).describe('A list of the user\'s recurring expenses.'),
  budgetMethod: z.enum(['balanced', '50_30_20', 'envelope', 'zero_based']).describe('The user\'s preferred budgeting method.'),
  goal: z.string().describe('The user\'s main financial goal.'),
});

export type PersonalizedBudgetSuggestionsInput = z.infer<typeof PersonalizedBudgetSuggestionsInputSchema>;

const PersonalizedBudgetSuggestionsOutputSchema = z.object({
  budgetSuggestions: z.record(z.string(), z.number()).describe('A map of budget categories to suggested amounts.'),
  summary: z.string().describe('A summary of the budget suggestions and how they align with the user\'s goal.'),
});

export type PersonalizedBudgetSuggestionsOutput = z.infer<typeof PersonalizedBudgetSuggestionsOutputSchema>;

export async function getPersonalizedBudgetSuggestions(
  input: PersonalizedBudgetSuggestionsInput
): Promise<PersonalizedBudgetSuggestionsOutput> {
  return personalizedBudgetSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedBudgetSuggestionsPrompt',
  input: {schema: PersonalizedBudgetSuggestionsInputSchema},
  output: {schema: PersonalizedBudgetSuggestionsOutputSchema},
  prompt: `You are a personal finance expert who provides personalized budget suggestions.

  Based on the user's input, suggest budget allocations for various categories such as housing, food, transportation, entertainment, and savings.

  Consider the user's monthly income, recurring expenses, preferred budgeting method, and financial goal when making your suggestions.

  Budget Method: {{{budgetMethod}}}
  Monthly Income: {{{monthlyIncome}}}
  Recurring Expenses: {{#each recurringExpenses}}{{{name}}}: {{{amount}}} ({{{frequency}}}) {{/each}}
  Financial Goal: {{{goal}}}

  Format the output as a JSON object with budgetSuggestions and summary fields.
  The budgetSuggestions field should be a map of budget categories to suggested amounts.
  The summary field should be a short paragraph summarizing the budget suggestions and how they align with the user's goal.

  Make sure that the total suggested budget does not exceed the monthly income minus recurring expenses.
  The keys of the budgetSuggestions should be in camelCase format.
  `,
});

const personalizedBudgetSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedBudgetSuggestionsFlow',
    inputSchema: PersonalizedBudgetSuggestionsInputSchema,
    outputSchema: PersonalizedBudgetSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
