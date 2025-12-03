import React from 'react';
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';
import { CASE_STUDIES, MARKET_STATS } from '../constants';

const CaseStudiesSection: React.FC = () => {
    return (
        <section id="case-studies" className="py-24 px-6 bg-stone-950 text-stone-200">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
                        Proven Models, Validated Returns
                    </h2>
                    <p className="text-xl text-stone-400 font-serif italic max-w-3xl mx-auto">
                        D'Arbonne Gate combines the best of themed camping, luxury RV resorts, and outdoor recreation destinations.
                    </p>
                </div>

                {/* Case Study Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {CASE_STUDIES.map((study, idx) => (
                        <div key={idx} className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden hover:border-bayou-gold/50 transition-all group">

                            {/* Header */}
                            <div className="bg-gradient-to-r from-bayou-gold/20 to-stone-900 p-6 border-b border-stone-800">
                                <h3 className="font-display text-2xl text-white mb-2 group-hover:text-bayou-gold transition-colors">
                                    {study.name}
                                </h3>
                                <p className="text-stone-400 text-sm">{study.location}</p>
                                <div className="mt-3 inline-block bg-stone-950 px-3 py-1 rounded text-xs text-bayou-gold border border-bayou-gold/30">
                                    {study.focus}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h4 className="text-stone-500 text-xs uppercase tracking-wider mb-2">Business Model</h4>
                                    <p className="text-stone-300 text-sm">{study.model}</p>
                                </div>

                                {/* Stats */}
                                <div className="space-y-3 mb-4">
                                    <h4 className="text-stone-500 text-xs uppercase tracking-wider">Key Metrics</h4>
                                    {Object.entries(study.stats).map(([key, value], i) => (
                                        <div key={i} className="flex justify-between items-center p-3 bg-stone-950 rounded">
                                            <span className="text-stone-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <span className="text-white font-semibold">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Relevance */}
                                <div className="pt-4 border-t border-stone-800">
                                    <h4 className="text-emerald-500 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Award size={14} />
                                        Relevance to D'Arbonne Gate
                                    </h4>
                                    <p className="text-stone-300 text-sm italic">{study.relevance}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Performance Comparison */}
                <div className="bg-gradient-to-br from-stone-900 to-stone-950 p-8 rounded-xl border border-stone-800">
                    <h3 className="font-display text-2xl text-white mb-8 text-center">
                        Themed vs. Commodity Park Performance
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">

                        {/* ADR Premium */}
                        <div className="text-center">
                            <div className="mb-4">
                                <DollarSign size={40} className="text-bayou-gold mx-auto" />
                            </div>
                            <div className="text-4xl font-display text-bayou-gold mb-2">
                                {MARKET_STATS.themedVsCommodity.adrPremium}
                            </div>
                            <h4 className="text-white font-semibold mb-2">ADR Premium</h4>
                            <p className="text-stone-400 text-sm">
                                Themed parks command significantly higher average daily rates than basic commodity parks
                            </p>
                        </div>

                        {/* Occupancy Increase */}
                        <div className="text-center">
                            <div className="mb-4">
                                <TrendingUp size={40} className="text-emerald-500 mx-auto" />
                            </div>
                            <div className="text-4xl font-display text-emerald-400 mb-2">
                                {MARKET_STATS.themedVsCommodity.occupancyIncrease}
                            </div>
                            <h4 className="text-white font-semibold mb-2">Occupancy Boost</h4>
                            <p className="text-stone-400 text-sm">
                                Superior amenities and theming drive higher occupancy rates year-round
                            </p>
                        </div>

                        {/* Guest Loyalty */}
                        <div className="text-center">
                            <div className="mb-4">
                                <Users size={40} className="text-cyan-500 mx-auto" />
                            </div>
                            <div className="text-4xl font-display text-cyan-400 mb-2">
                                {MARKET_STATS.themedVsCommodity.guestLoyalty}
                            </div>
                            <h4 className="text-white font-semibold mb-2">Repeat Rate</h4>
                            <p className="text-stone-400 text-sm">
                                Memorable experiences create loyal guests who return season after season
                            </p>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-8 p-6 bg-bayou-gold/10 border border-bayou-gold/30 rounded-lg text-center">
                        <p className="text-stone-300 leading-relaxed">
                            <strong className="text-bayou-gold">The D'Arbonne Gate Strategy:</strong> By combining Disney-inspired theming,
                            luxury amenities, and a unique hunting/fishing focus, we position ourselves to capture the premium pricing,
                            occupancy, and loyalty demonstrated by these successful models—while serving an underserved niche in rural Louisiana.
                        </p>
                    </div>
                </div>

                {/* Regional Context */}
                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <div className="bg-stone-900 p-6 rounded-xl border border-emerald-900/30">
                        <h4 className="font-display text-xl text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="text-emerald-500" size={24} />
                            D'Arbonne Region Drivers
                        </h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between p-3 bg-stone-950 rounded">
                                <span className="text-stone-400">Spring:</span>
                                <span className="text-emerald-400 font-semibold">{MARKET_STATS.darbonneRegion.springDriver}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-stone-950 rounded">
                                <span className="text-stone-400">Summer:</span>
                                <span className="text-emerald-400 font-semibold">{MARKET_STATS.darbonneRegion.summerDriver}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-stone-950 rounded">
                                <span className="text-stone-400">Fall:</span>
                                <span className="text-amber-400 font-semibold">{MARKET_STATS.darbonneRegion.fallDriver}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-stone-950 rounded">
                                <span className="text-stone-400">Winter:</span>
                                <span className="text-cyan-400 font-semibold">{MARKET_STATS.darbonneRegion.winterDriver}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-stone-900 p-6 rounded-xl border border-cyan-900/30">
                        <h4 className="font-display text-xl text-white mb-4 flex items-center gap-2">
                            <Award className="text-cyan-500" size={24} />
                            Success Parallels
                        </h4>
                        <ul className="space-y-3 text-sm text-stone-300">
                            <li className="flex items-start gap-2">
                                <span className="text-bayou-gold mt-1">•</span>
                                <span><strong>Lake Fork, TX:</strong> Bass fishing drives 90%+ occupancy—D'Arbonne Lake offers similar crappie/bass appeal</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-bayou-gold mt-1">•</span>
                                <span><strong>Reelfoot Lake, TN:</strong> Waterfowl hunting creates premium demand—D'Arbonne NWR hosts thousands of ducks</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-bayou-gold mt-1">•</span>
                                <span><strong>Jellystone Parks:</strong> Theming commands 30-50% premiums—our Disney-inspired approach targets same uplift</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CaseStudiesSection;
