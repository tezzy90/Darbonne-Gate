import { FinancialMetric, ExitStrategyMetric } from './types';

// Move secrets to environment variables. Do NOT hardcode passwords or keys in source.
export const PASSWORD = process.env.PASSWORD || '';

export const FINANCIAL_DATA: FinancialMetric[] = [
  { year: 'Year 1', revenue: 1.76, netProfit: 0.70 },
  { year: 'Year 2', revenue: 2.05, netProfit: 0.85 },
  { year: 'Year 3', revenue: 2.40, netProfit: 0.98 },
  { year: 'Year 4', revenue: 2.75, netProfit: 1.10 },
  { year: 'Year 5', revenue: 3.02, netProfit: 1.21 },
];

export const EXIT_STRATEGY_DATA: ExitStrategyMetric[] = [
  { year: 'Year 5', noi: 1.21, valuation: 13.4 },
  { year: 'Year 6', noi: 1.25, valuation: 13.8 },
  { year: 'Year 7', noi: 1.29, valuation: 14.3 },
  { year: 'Year 8', noi: 1.33, valuation: 14.7 },
  { year: 'Year 9', noi: 1.38, valuation: 15.3 },
  { year: 'Year 10', noi: 1.45, valuation: 16.1 },
];

export const OWNER_LETTER = `
"It’s not just about the land. It’s about what we leave behind.

Growing up, the concept of 'ownership' was the ultimate goal. But as I’ve navigated the hospitality world, from Disney to Harrah's, I've realized that true wealth isn't just in the asset—it's in the experience you create and the legacy you secure for the next generation.

D'Arbonne Gate isn't just an RV park. It is a strategic foothold in a booming outdoor economy. We are securing 47 acres of prime Louisiana soil and wedding it to the lifestyle of the modern hunter and angler. This project builds generational revenue, creates local jobs, and offers a premium sanctuary where there was once only open ground.

We are inviting you to build this legacy with us."
`;
