import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Download, PieChart } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { logEvent } from '../lib/analytics';

const ROICalculator: React.FC = () => {
    const [investment, setInvestment] = useState<number>(100000);
    const [exitYear, setExitYear] = useState<number>(7);
    const [equityShare, setEquityShare] = useState<number>(0);

    // Constants based on Financial Data
    const TOTAL_PROJECT_COST = 6100000; // $6.1M
    const YEAR_5_NOI = 1210000; // $1.21M
    const DEBT_AMOUNT = 4500000; // USDA loan
    const TOTAL_EQUITY_RAISE = TOTAL_PROJECT_COST - DEBT_AMOUNT; // ~$1.6M
    const CAP_RATE = 0.09; // 9%
    const ANNUAL_GROWTH_RATE = 0.03; // 3% NOI growth after Year 5

    useEffect(() => {
        const share = investment / TOTAL_EQUITY_RAISE;
        setEquityShare(share);
    }, [investment]);

    // Calculate NOI for any year
    const getNOI = (year: number): number => {
        if (year <= 5) {
            // Use actual projections for years 1-5
            const projections = [700000, 850000, 980000, 1100000, 1210000];
            return projections[year - 1] || 1210000;
        }
        // After year 5, apply growth rate
        const yearsAfter5 = year - 5;
        return YEAR_5_NOI * Math.pow(1 + ANNUAL_GROWTH_RATE, yearsAfter5);
    };

    // Calculate exit valuation for selected year
    const getExitValuation = (year: number): number => {
        const noi = getNOI(year);
        return noi / CAP_RATE;
    };

    // Calculate IRR using Newton's method
    const calculateIRR = (): number => {
        const cashFlows: { date: Date; amount: number }[] = [];

        // Initial investment (negative)
        cashFlows.push({ date: new Date('2026-01-01'), amount: -investment });

        // Annual distributions (Years 1-5)
        for (let year = 1; year <= Math.min(exitYear, 5); year++) {
            const noi = getNOI(year);
            const distribution = noi * equityShare;
            const date = new Date(`${2026 + year}-12-31`);
            cashFlows.push({ date, amount: distribution });
        }

        // Exit proceeds
        const exitValuation = getExitValuation(exitYear);
        const exitProceeds = (exitValuation - DEBT_AMOUNT) * equityShare;
        const exitDate = new Date(`${2026 + exitYear}-12-31`);
        cashFlows.push({ date: exitDate, amount: exitProceeds });

        // Simple IRR approximation using XIRR logic
        return calculateXIRR(cashFlows);
    };

    // XIRR calculation (simplified Newton's method)
    const calculateXIRR = (cashFlows: { date: Date; amount: number }[]): number => {
        let guess = 0.1; // Start with 10%
        const maxIterations = 100;
        const tolerance = 0.0001;

        for (let i = 0; i < maxIterations; i++) {
            const { npv, derivative } = calculateNPVAndDerivative(cashFlows, guess);

            if (Math.abs(npv) < tolerance) {
                return guess * 100; // Convert to percentage
            }

            guess = guess - npv / derivative;

            // Prevent negative or extreme values
            if (guess < -0.99) guess = -0.99;
            if (guess > 10) guess = 10;
        }

        return guess * 100;
    };

    const calculateNPVAndDerivative = (cashFlows: { date: Date; amount: number }[], rate: number) => {
        const baseDate = cashFlows[0].date.getTime();
        let npv = 0;
        let derivative = 0;

        cashFlows.forEach(cf => {
            const years = (cf.date.getTime() - baseDate) / (365.25 * 24 * 60 * 60 * 1000);
            const discountFactor = Math.pow(1 + rate, -years);
            npv += cf.amount * discountFactor;
            derivative -= cf.amount * years * discountFactor / (1 + rate);
        });

        return { npv, derivative };
    };

    // Calculations
    const annualCashFlow = getNOI(5) * equityShare;
    const exitValuation = getExitValuation(exitYear);
    const exitProceeds = (exitValuation - DEBT_AMOUNT) * equityShare;

    // Total profit = sum of distributions + exit proceeds - initial investment
    let totalProfit = -investment;
    for (let year = 1; year <= exitYear; year++) {
        totalProfit += getNOI(Math.min(year, 5)) * equityShare;
    }
    totalProfit += exitProceeds;

    const equityMultiple = (totalProfit + investment) / investment;
    const cashOnCash = (annualCashFlow / investment) * 100;
    const irr = calculateIRR();



    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvestment(Number(e.target.value));
        // Debounce tracking would be better, but simple log for now
        if (Math.random() > 0.9) { // Sample 10% of moves to avoid spam
            logEvent('Engagement', 'ROI Slider Adjusted', `Amount: ${e.target.value}`);
        }
    };

    const handleExitYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setExitYear(Number(e.target.value));
    };

    // PDF Download Function
    const downloadPDF = () => {
        logEvent('Conversion', 'PDF Downloaded', 'Investment Summary');
        const doc = new jsPDF();
        // ... rest of function

        // Header
        doc.setFontSize(20);
        doc.setTextColor(212, 175, 55); // Bayou gold
        doc.text("D'ARBONNE GATE", 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text('Investment Summary', 105, 28, { align: 'center' });

        // Investment Details
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text('Investment Details', 20, 45);

        doc.setFontSize(10);
        doc.text(`Investment Amount: $${investment.toLocaleString()}`, 20, 55);
        doc.text(`Equity Share: ${(equityShare * 100).toFixed(2)}%`, 20, 62);
        doc.text(`Exit Year: Year ${exitYear}`, 20, 69);

        // Returns
        doc.setFontSize(11);
        doc.text('Projected Returns', 20, 85);

        doc.setFontSize(10);
        doc.text(`Annual Cash Flow (Year 5): $${Math.round(annualCashFlow).toLocaleString()}`, 20, 95);
        doc.text(`Cash-on-Cash Return: ${cashOnCash.toFixed(1)}%`, 20, 102);
        doc.text(`Exit Proceeds (Year ${exitYear}): $${Math.round(exitProceeds).toLocaleString()}`, 20, 109);
        doc.text(`Total Profit: $${Math.round(totalProfit).toLocaleString()}`, 20, 116);
        doc.text(`Equity Multiple: ${equityMultiple.toFixed(2)}x`, 20, 123);
        doc.text(`IRR: ${irr.toFixed(1)}%`, 20, 130);

        // Assumptions
        doc.setFontSize(11);
        doc.text('Key Assumptions', 20, 146);

        doc.setFontSize(10);
        doc.text(`Total Project Cost: $${(TOTAL_PROJECT_COST / 1000000).toFixed(1)}M`, 20, 156);
        doc.text(`Total Equity Raise: $${(TOTAL_EQUITY_RAISE / 1000000).toFixed(1)}M`, 20, 163);
        doc.text(`Year 5 NOI: $${(YEAR_5_NOI / 1000000).toFixed(2)}M`, 20, 170);
        doc.text(`Exit Cap Rate: ${(CAP_RATE * 100).toFixed(1)}%`, 20, 177);
        doc.text(`Post-Year 5 Growth: ${(ANNUAL_GROWTH_RATE * 100).toFixed(0)}% annually`, 20, 184);

        // Disclaimer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        const disclaimer = 'This is a projection only and not an offer to sell securities. Actual results may vary based on market conditions, occupancy rates, and other factors. Consult with your financial advisor before making any investment decisions.';
        const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
        doc.text(splitDisclaimer, 20, 200);

        // Footer
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('Generated: ' + new Date().toLocaleDateString(), 105, 280, { align: 'center' });

        doc.save('darbonne-gate-investment-summary.pdf');
    };

    return (
        <section id="roi" className="py-24 px-6 bg-stone-900 border-t border-stone-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-bayou-gold rounded text-bayou-dark">
                            <Calculator size={24} />
                        </div>
                        <div>
                            <h2 className="font-display text-3xl md:text-4xl text-white">Investment Calculator</h2>
                            <p className="text-stone-400">Estimate your potential returns with dynamic exit scenarios</p>
                        </div>
                    </div>
                    <button
                        onClick={downloadPDF}
                        className="hidden md:flex items-center gap-2 bg-bayou-gold/20 hover:bg-bayou-gold text-bayou-gold hover:text-bayou-dark border border-bayou-gold px-4 py-2 rounded transition-all"
                    >
                        <Download size={18} />
                        <span className="text-sm font-semibold">Download PDF</span>
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-stone-950 p-6 rounded-xl border border-stone-800">
                            <label className="block text-stone-400 text-sm uppercase tracking-wider mb-4">Investment Amount</label>
                            <div className="flex items-center text-4xl font-display text-white mb-6">
                                <span className="text-stone-600 mr-2">$</span>
                                {investment.toLocaleString()}
                            </div>
                            <input
                                type="range"
                                min="25000"
                                max="500000"
                                step="5000"
                                value={investment}
                                onChange={handleSliderChange}
                                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-bayou-gold"
                            />
                            <div className="flex justify-between text-xs text-stone-500 mt-2">
                                <span>$25k</span>
                                <span>$500k</span>
                            </div>
                        </div>

                        <div className="bg-stone-950 p-6 rounded-xl border border-stone-800">
                            <label className="block text-stone-400 text-sm uppercase tracking-wider mb-4">Exit Year</label>
                            <select
                                value={exitYear}
                                onChange={handleExitYearChange}
                                className="w-full bg-stone-900 text-white border border-stone-700 rounded px-4 py-3 focus:outline-none focus:border-bayou-gold"
                            >
                                <option value={5}>Year 5</option>
                                <option value={6}>Year 6</option>
                                <option value={7}>Year 7 (Recommended)</option>
                                <option value={8}>Year 8</option>
                                <option value={9}>Year 9</option>
                                <option value={10}>Year 10</option>
                            </select>
                            <p className="text-xs text-stone-500 mt-2">
                                Exit valuation: ${(exitValuation / 1000000).toFixed(2)}M
                            </p>
                        </div>

                        <div className="bg-stone-950 p-6 rounded-xl border border-stone-800">
                            <p className="text-sm text-stone-400 mb-3">Your Equity Share</p>
                            <p className="text-3xl font-display text-bayou-gold mb-4">{(equityShare * 100).toFixed(2)}%</p>
                            <div className="space-y-2 text-xs text-stone-500">
                                <div className="flex justify-between">
                                    <span>Total Raise:</span>
                                    <span className="text-white">$1.6M</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Your Investment:</span>
                                    <span className="text-white">${(investment / 1000).toFixed(0)}k</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Key Metrics Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-emerald-900/20 to-stone-950 p-6 rounded-xl border border-emerald-900/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <DollarSign size={18} className="text-emerald-500" />
                                    <span className="text-stone-400 text-xs uppercase tracking-wider">Annual Cash Flow (Year 5)</span>
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">${Math.round(annualCashFlow).toLocaleString()}</p>
                                <p className="text-emerald-500 text-sm font-bold">{cashOnCash.toFixed(1)}% Cash-on-Cash</p>
                            </div>

                            <div className="bg-gradient-to-br from-bayou-gold/20 to-stone-950 p-6 rounded-xl border border-bayou-gold/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp size={18} className="text-bayou-gold" />
                                    <span className="text-stone-400 text-xs uppercase tracking-wider">Total Profit ({exitYear}-Year Hold)</span>
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">${Math.round(totalProfit).toLocaleString()}</p>
                                <p className="text-bayou-gold text-sm font-bold">{equityMultiple.toFixed(2)}x Equity Multiple</p>
                            </div>

                            <div className="bg-gradient-to-br from-cyan-900/20 to-stone-950 p-6 rounded-xl border border-cyan-900/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <PieChart size={18} className="text-cyan-500" />
                                    <span className="text-stone-400 text-xs uppercase tracking-wider">Exit Proceeds (Year {exitYear})</span>
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">${Math.round(exitProceeds).toLocaleString()}</p>
                                <p className="text-cyan-500 text-sm">Exit Valuation: ${(exitValuation / 1000000).toFixed(2)}M</p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-900/20 to-stone-950 p-6 rounded-xl border border-purple-900/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp size={18} className="text-purple-500" />
                                    <span className="text-stone-400 text-xs uppercase tracking-wider">Internal Rate of Return (IRR)</span>
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">{irr.toFixed(1)}%</p>
                                <p className="text-purple-500 text-sm">Annualized return over {exitYear} years</p>
                            </div>
                        </div>

                        {/* Cash Flow Breakdown */}
                        <div className="bg-stone-950 p-6 rounded-xl border border-stone-800">
                            <h3 className="font-display text-xl text-white mb-4">Cash Flow Breakdown</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-stone-900 rounded">
                                    <span className="text-stone-400">Initial Investment</span>
                                    <span className="text-red-400 font-semibold">-${investment.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-stone-900 rounded">
                                    <span className="text-stone-400">Cumulative Distributions (Years 1-{exitYear})</span>
                                    <span className="text-emerald-400 font-semibold">
                                        +${Math.round(Array.from({ length: exitYear }, (_, i) => getNOI(Math.min(i + 1, 5)) * equityShare).reduce((a, b) => a + b, 0)).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-stone-900 rounded">
                                    <span className="text-stone-400">Exit Proceeds (Year {exitYear})</span>
                                    <span className="text-emerald-400 font-semibold">+${Math.round(exitProceeds).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-bayou-gold/10 border border-bayou-gold/30 rounded">
                                    <span className="text-white font-semibold">Net Profit</span>
                                    <span className="text-bayou-gold font-bold text-xl">${Math.round(totalProfit).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Download Button (Mobile) */}
                        <button
                            onClick={downloadPDF}
                            className="md:hidden w-full flex items-center justify-center gap-2 bg-bayou-gold/20 hover:bg-bayou-gold text-bayou-gold hover:text-bayou-dark border border-bayou-gold px-6 py-3 rounded transition-all"
                        >
                            <Download size={18} />
                            <span className="font-semibold">Download Investment Summary PDF</span>
                        </button>

                        {/* Disclaimer */}
                        <p className="text-xs text-stone-600 italic text-center px-4">
                            *Projections based on current financial models. Not an offer to sell securities. Actual results may vary based on market conditions, occupancy rates, construction costs, and other factors. Consult your financial advisor before making investment decisions.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
