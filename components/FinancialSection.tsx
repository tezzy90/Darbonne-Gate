import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { FINANCIAL_DATA, EXIT_STRATEGY_DATA } from '../constants';

const FinancialSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-stone-950 text-stone-200">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 border-l-4 border-bayou-gold pl-6">
          <h2 className="font-display text-4xl text-white mb-2">Financial Performance</h2>
          <p className="text-xl text-stone-400 font-serif italic">Conservative projections with aggressive upside.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Chart 1: 5-Year Proforma */}
          <div className="bg-stone-900/50 p-6 rounded border border-stone-800 shadow-lg">
            <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-bold text-white">5-Year Proforma</h3>
                <div className="text-right">
                    <p className="text-sm text-stone-500">Year 5 Net Profit</p>
                    <p className="text-2xl font-display text-emerald-400">$1.21 M</p>
                </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FINANCIAL_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#44403c" vertical={false} />
                  <XAxis dataKey="year" stroke="#a8a29e" fontSize={12} />
                  <YAxis stroke="#a8a29e" fontSize={12} unit="M" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1c1917', borderColor: '#d97706', color: '#f5f5f4' }}
                    itemStyle={{ color: '#f5f5f4' }}
                    formatter={(value: number) => [`$${value}M`, '']}
                  />
                  <Bar dataKey="revenue" name="Revenue" fill="#d97706" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="netProfit" name="Net Profit" fill="#064e3b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-bayou-gold rounded-sm"></div>
                    <span>Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-bayou-green rounded-sm"></div>
                    <span>Net Profit</span>
                </div>
            </div>
          </div>

          {/* Chart 2: Exit Strategy */}
          <div className="bg-stone-900/50 p-6 rounded border border-stone-800 shadow-lg">
             <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-bold text-white">7-10 Year Exit Strategy</h3>
                <div className="text-right">
                    <p className="text-sm text-stone-500">Year 7 Valuation</p>
                    <p className="text-2xl font-display text-bayou-gold">$14.3 M</p>
                </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={EXIT_STRATEGY_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#44403c" vertical={false} />
                  <XAxis dataKey="year" stroke="#a8a29e" fontSize={12} />
                  <YAxis stroke="#a8a29e" fontSize={12} unit="M" domain={[10, 20]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1c1917', borderColor: '#d97706', color: '#f5f5f4' }}
                    formatter={(value: number) => [`$${value}M`, 'Valuation']}
                  />
                  <Area type="monotone" dataKey="valuation" stroke="#d97706" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-stone-500 text-center italic">
                *Valuation based on stabilized NOI and 9.0% Cap Rate (Sun Outdoors / ELS Acquisition Models)
            </div>
          </div>

        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-stone-900 p-6 border-t-2 border-stone-700">
                <p className="text-stone-500 text-xs uppercase tracking-wider">Total Cost</p>
                <p className="text-2xl md:text-3xl font-display text-white mt-1">$6.1 M</p>
            </div>
            <div className="bg-stone-900 p-6 border-t-2 border-stone-700">
                <p className="text-stone-500 text-xs uppercase tracking-wider">Target DSCR</p>
                <p className="text-2xl md:text-3xl font-display text-white mt-1">1.85x</p>
            </div>
            <div className="bg-stone-900 p-6 border-t-2 border-stone-700">
                <p className="text-stone-500 text-xs uppercase tracking-wider">Year 5 Rev</p>
                <p className="text-2xl md:text-3xl font-display text-white mt-1">$3.02 M</p>
            </div>
            <div className="bg-stone-900 p-6 border-t-2 border-bayou-gold bg-gradient-to-b from-bayou-gold/10 to-transparent">
                <p className="text-bayou-gold text-xs uppercase tracking-wider font-bold">ROI Year 7</p>
                <p className="text-2xl md:text-3xl font-display text-white mt-1">2.6x</p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default FinancialSection;