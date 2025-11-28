import { google } from 'googleapis';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEETS_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;

export interface FinancialProjection {
    year: string;
    revenue: number;
    operatingExpenses: number;
    netProfit: number;
    noi: number;
    notes?: string;
}

export interface ExitStrategyData {
    year: string;
    noi: number;
    capRate: number;
    valuation: number;
    notes?: string;
}

export interface TimelineMilestone {
    phase: string;
    milestone: string;
    startDate: string;
    endDate: string;
    status: 'Complete' | 'In Progress' | 'Pending' | 'Upcoming';
    notes?: string;
}

export interface ProjectUpdate {
    date: string;
    category: string;
    update: string;
    author: string;
}

/**
 * Fetch financial projections from Google Sheets
 */
export async function fetchFinancialProjections(): Promise<FinancialProjection[]> {
    try {
        const sheets = google.sheets({ version: 'v4', auth: GOOGLE_API_KEY });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_ID,
            range: 'Projections!A2:F10', // Adjust range as needed
        });

        const rows = response.data.values || [];
        return rows.map(row => ({
            year: row[0] || '',
            revenue: parseFloat(row[1]) || 0,
            operatingExpenses: parseFloat(row[2]) || 0,
            netProfit: parseFloat(row[3]) || 0,
            noi: parseFloat(row[4]) || 0,
            notes: row[5],
        }));
    } catch (error) {
        console.error('Error fetching financial projections:', error);
        return [];
    }
}

/**
 * Fetch exit strategy data from Google Sheets
 */
export async function fetchExitStrategy(): Promise<ExitStrategyData[]> {
    try {
        const sheets = google.sheets({ version: 'v4', auth: GOOGLE_API_KEY });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_ID,
            range: 'Exit Strategy!A2:E10',
        });

        const rows = response.data.values || [];
        return rows.map(row => ({
            year: row[0] || '',
            noi: parseFloat(row[1]) || 0,
            capRate: parseFloat(row[2]) || 0,
            valuation: parseFloat(row[3]) || 0,
            notes: row[4],
        }));
    } catch (error) {
        console.error('Error fetching exit strategy:', error);
        return [];
    }
}

/**
 * Fetch timeline milestones from Google Sheets
 */
export async function fetchTimeline(): Promise<TimelineMilestone[]> {
    try {
        const sheets = google.sheets({ version: 'v4', auth: GOOGLE_API_KEY });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_ID,
            range: 'Timeline!A2:F30',
        });

        const rows = response.data.values || [];
        return rows.map(row => ({
            phase: row[0] || '',
            milestone: row[1] || '',
            startDate: row[2] || '',
            endDate: row[3] || '',
            status: (row[4] as any) || 'Upcoming',
            notes: row[5],
        }));
    } catch (error) {
        console.error('Error fetching timeline:', error);
        return [];
    }
}

/**
 * Fetch project updates from Google Sheets
 */
export async function fetchProjectUpdates(): Promise<ProjectUpdate[]> {
    try {
        const sheets = google.sheets({ version: 'v4', auth: GOOGLE_API_KEY });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_ID,
            range: 'Project Updates!A2:D50',
        });

        const rows = response.data.values || [];
        return rows.map(row => ({
            date: row[0] || '',
            category: row[1] || '',
            update: row[2] || '',
            author: row[3] || '',
        }));
    } catch (error) {
        console.error('Error fetching project updates:', error);
        return [];
    }
}

/**
 * Fetch ROI calculator inputs from Google Sheets
 */
export async function fetchROIInputs(): Promise<{
    totalEquityRaise: number;
    year5NetProfit: number;
    year7ExitValuation: number;
    debtAmount: number;
}> {
    try {
        const sheets = google.sheets({ version: 'v4', auth: GOOGLE_API_KEY });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_ID,
            range: 'ROI Calculator Inputs!B2:B5',
        });

        const values = response.data.values || [];
        return {
            totalEquityRaise: parseFloat(values[0]?.[0]) || 1600000,
            year5NetProfit: parseFloat(values[1]?.[0]) || 1210000,
            year7ExitValuation: parseFloat(values[2]?.[0]) || 14300000,
            debtAmount: parseFloat(values[3]?.[0]) || 4500000,
        };
    } catch (error) {
        console.error('Error fetching ROI inputs:', error);
        return {
            totalEquityRaise: 1600000,
            year5NetProfit: 1210000,
            year7ExitValuation: 14300000,
            debtAmount: 4500000,
        };
    }
}
