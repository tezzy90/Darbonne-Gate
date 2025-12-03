import React from 'react';
import { Calendar, Trophy, Fish, Target } from 'lucide-react';
import { HUNTING_SPECIES, FISHING_SPECIES, MARKET_STATS } from '../constants';

const HuntingFishingSection: React.FC = () => {
    return (
        <section id="hunting-fishing" className="py-24 px-6 bg-stone-900 text-stone-200">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
                        The Outdoor Recreation Advantage
                    </h2>
                    <p className="text-xl text-stone-400 font-serif italic max-w-3xl mx-auto">
                        D'Arbonne Gate sits at the epicenter of Louisiana's premier hunting and fishing region,
                        offering year-round outdoor recreation that drives consistent occupancy.
                    </p>
                </div>

                {/* Counter-Cyclical Revenue */}
                <div className="mb-16 bg-gradient-to-r from-bayou-gold/20 to-emerald-900/20 border border-bayou-gold/30 rounded-xl p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <Trophy size={48} className="text-bayou-gold" />
                            <div>
                                <h3 className="font-display text-2xl text-white mb-2">Counter-Cyclical Occupancy Model</h3>
                                <p className="text-stone-300 font-serif">
                                    Hunting (Winter) + Fishing (Spring/Summer/Fall) = Year-Round Revenue
                                </p>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-4xl font-display text-bayou-gold font-bold">12.4%</p>
                            <p className="text-sm text-stone-400 uppercase tracking-wider">Annual Regional Growth</p>
                        </div>
                    </div>
                </div>

                {/* Hunting Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <Target size={32} className="text-bayou-gold" />
                        <h3 className="font-display text-3xl text-white">Hunting Opportunities</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {HUNTING_SPECIES.map((species, idx) => (
                            <div key={idx} className="bg-stone-950 p-6 rounded-lg border border-stone-800 hover:border-bayou-gold/50 transition-all group">
                                <div className="text-5xl mb-4">{species.icon}</div>
                                <h4 className="font-display text-xl text-white mb-2 group-hover:text-bayou-gold transition-colors">
                                    {species.name}
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-stone-500">Seasons:</span>
                                        <ul className="text-stone-300 mt-1 space-y-1">
                                            {species.seasons.map((season, i) => (
                                                <li key={i} className="ml-4">• {season}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="text-stone-500">Popularity:</span>
                                        <span className={`ml-2 font-semibold ${species.popularity === 'Very High' ? 'text-emerald-400' :
                                                species.popularity === 'High' ? 'text-bayou-gold' :
                                                    'text-stone-400'
                                            }`}>
                                            {species.popularity}
                                        </span>
                                    </div>
                                    <p className="text-stone-400 text-xs italic mt-3">{species.notes}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-stone-950 p-6 rounded-lg border border-emerald-900/30">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <Calendar size={20} className="text-emerald-500" />
                            D'Arbonne National Wildlife Refuge Context
                        </h4>
                        <p className="text-stone-300 text-sm leading-relaxed">
                            Located just <strong className="text-white">3 miles</strong> from the property, D'Arbonne NWR is a
                            <strong className="text-emerald-400"> wintering habitat for thousands of waterfowl</strong>, making it one of Louisiana's
                            premier duck hunting destinations. The refuge's proximity provides D'Arbonne Gate guests with exclusive access to
                            world-class hunting while enjoying premium accommodations unavailable at state parks.
                        </p>
                    </div>
                </div>

                {/* Fishing Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <Fish size={32} className="text-emerald-500" />
                        <h3 className="font-display text-3xl text-white">Fishing Opportunities</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {FISHING_SPECIES.map((species, idx) => (
                            <div key={idx} className="bg-stone-950 p-6 rounded-lg border border-stone-800 hover:border-emerald-500/50 transition-all group">
                                <div className="text-5xl mb-4">{species.icon}</div>
                                <h4 className="font-display text-xl text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                    {species.name}
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-stone-500">Rating:</span>
                                        <span className={`ml-2 font-semibold ${species.rating === 'Most Popular' ? 'text-emerald-400' :
                                                species.rating === 'Very Popular' ? 'text-bayou-gold' :
                                                    'text-stone-400'
                                            }`}>
                                            {species.rating}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-stone-500">Season:</span>
                                        <p className="text-stone-300">{species.season}</p>
                                    </div>
                                    <div>
                                        <span className="text-stone-500">Techniques:</span>
                                        <ul className="text-stone-300 mt-1 space-y-1">
                                            {species.techniques.map((tech, i) => (
                                                <li key={i} className="ml-4 text-xs">• {tech}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="text-stone-400 text-xs italic mt-3">{species.notes}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-stone-950 p-6 rounded-lg border border-cyan-900/30">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <Trophy size={20} className="text-cyan-500" />
                            Tournament Economy
                        </h4>
                        <p className="text-stone-300 text-sm leading-relaxed mb-4">
                            Lake D'Arbonne is <strong className="text-emerald-400">widely considered the premier crappie fishing destination</strong> in
                            Louisiana, attracting tournament anglers from across the region. Major bass and crappie tournaments generate
                            <strong className="text-cyan-400"> $50k-100k in economic activity per event</strong>, with participants seeking secure,
                            premium accommodations for their high-value boats and equipment.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-stone-900 p-4 rounded">
                                <p className="text-stone-500 mb-1">Spring Peak (Crappie)</p>
                                <p className="text-white font-semibold">February - May</p>
                            </div>
                            <div className="bg-stone-900 p-4 rounded">
                                <p className="text-stone-500 mb-1">Summer/Fall (Bass)</p>
                                <p className="text-white font-semibold">June - October</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seasonal Revenue Drivers */}
                <div className="bg-gradient-to-br from-stone-950 to-stone-900 p-8 rounded-xl border border-stone-800">
                    <h3 className="font-display text-2xl text-white mb-6 text-center">Year-Round Revenue Drivers</h3>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-bayou-gold font-display text-xl mb-2">Spring</div>
                            <p className="text-stone-300 text-sm">{MARKET_STATS.darbonneRegion.springDriver}</p>
                        </div>
                        <div className="text-center">
                            <div className="text-emerald-400 font-display text-xl mb-2">Summer</div>
                            <p className="text-stone-300 text-sm">{MARKET_STATS.darbonneRegion.summerDriver}</p>
                        </div>
                        <div className="text-center">
                            <div className="text-amber-500 font-display text-xl mb-2">Fall</div>
                            <p className="text-stone-300 text-sm">{MARKET_STATS.darbonneRegion.fallDriver}</p>
                        </div>
                        <div className="text-center">
                            <div className="text-cyan-400 font-display text-xl mb-2">Winter</div>
                            <p className="text-stone-300 text-sm">{MARKET_STATS.darbonneRegion.winterDriver}</p>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-bayou-gold/10 border border-bayou-gold/30 rounded text-center">
                        <p className="text-stone-300 text-sm">
                            <strong className="text-bayou-gold">The D'Arbonne Advantage:</strong> While commodity RV parks experience 30-40% seasonal variance,
                            our hunting/fishing focus delivers consistent occupancy across all four seasons.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HuntingFishingSection;
