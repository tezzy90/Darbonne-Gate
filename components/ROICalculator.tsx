import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';

const ROICalculator: React.FC = () => {
    const [investment, setInvestment] = useState<number>(50000);
    const [equityShare, setEquityShare] = useState<number>(0);

    // Constants based on Financial Data
    const TOTAL_PROJECT_COST = 6100000; // $6.1M
    const YEAR_5_NET_PROFIT = 1210000; // $1.21M
    const YEAR_7_EXIT_VALUATION = 14300000; // $14.3M
    const DEBT_AMOUNT = 4500000; // Assumed debt portion
    const TOTAL_EQUITY_RAISE = TOTAL_PROJECT_COST - DEBT_AMOUNT; // ~$1.6M

    useEffect(() => {
        // Calculate equity share based on investment vs total equity raise
        // This is a simplified model assuming straight equity
        const share = (investment / TOTAL_EQUITY_RAISE);
        setEquityShare(share);
    }, [investment]);

    // Projections
    const annualCashFlow = YEAR_5_NET_PROFIT * equityShare;
    const exitProceeds = (YEAR_7_EXIT_VALUATION - DEBT_AMOUNT) * equityShare;
    const totalProfit = (annualCashFlow * 5) + exitProceeds; // Simplified 5 years of cash flow + exit
    const equityMultiple = (totalProfit + investment) / investment;
    const cashOnCash = (annualCashFlow / investment) * 100;

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvestment(Number(e.target.value));
    };

    return (
        <section id="roi" className="py-24 px-6 bg-stone-900 border-t border-stone-800">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-bayou-gold rounded text-bayou-dark">
                        <Calculator size={24} />
                    </div>
                    <div>
                        <h2 className="font-display text-3xl text-white">Investment Calculator</h2>
                        <p className="text-stone-400">Estimate your potential returns.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 bg-stone-950 p-8 rounded-xl border border-stone-800 shadow-2xl">

                    {/* Controls */}
                    <div className="space-y-8">
                        <div>
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

                        <div className="p-4 bg-stone-900 rounded border border-stone-800">
                            <p className="text-sm text-stone-400 mb-2">Based on:</p>
                            <ul className="text-sm text-stone-300 space-y-1">
                                <li className="flex justify-between"><span>Total Raise:</span> <span>$1.6M</span></li>
                                <li className="flex justify-between"><span>Year 5 NOI:</span> <span>$1.21M</span></li>
                                <li className="flex justify-between"><span>Exit Cap Rate:</span> <span>9.0%</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-6">
                        <div className="bg-stone-900/50 p-6 rounded border border-stone-800">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign size={16} className="text-emerald-500" />
                                <span className="text-stone-400 text-xs uppercase tracking-wider">Est. Annual Cash Flow (Year 5)</span>
                            </div>
                            <p className="text-3xl font-bold text-white">${Math.round(annualCashFlow).toLocaleString()}</p>
                            <p className="text-emerald-500 text-sm font-bold mt-1">{cashOnCash.toFixed(1)}% Cash-on-Cash</p>
                        </div>

                        <div className="bg-stone-900/50 p-6 rounded border border-stone-800">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp size={16} className="text-bayou-gold" />
                                <span className="text-stone-400 text-xs uppercase tracking-wider">Est. Total Profit (7 Year Hold)</span>
                            </div>
                            <p className="text-3xl font-bold text-white">${Math.round(totalProfit).toLocaleString()}</p>
                            <p className="text-bayou-gold text-sm font-bold mt-1">{equityMultiple.toFixed(2)}x Equity Multiple</p>
                        </div>

                        <p className="text-xs text-stone-600 italic text-center mt-4">
                            *Projections only. Not an offer to sell securities. Actual results may vary.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
