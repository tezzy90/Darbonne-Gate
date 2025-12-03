import React from 'react';
import { MapPin, Navigation, TrendingUp, Users } from 'lucide-react';
import { PARCEL_COORDINATES, KEY_LOCATIONS, MARKET_STATS } from '../constants';
import InteractiveMap from './InteractiveMap';

const LocationSection: React.FC = () => {
    return (
        <section id="location" className="py-24 px-6 bg-stone-950 text-stone-200">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Why Downsville, Louisiana?</h2>
                    <p className="text-xl text-stone-400 font-serif italic max-w-3xl mx-auto">
                        Strategic location at the intersection of outdoor recreation, infrastructure access, and underserved premium hospitality.
                    </p>
                </div>

                {/* Map Section */}
                <div className="mb-16 bg-stone-900 rounded-xl overflow-hidden border border-stone-800 shadow-2xl">
                    <div className="grid md:grid-cols-2">

                        {/* Interactive Map */}
                        <div className="relative h-[500px] bg-stone-800">
                            <InteractiveMap />
                        </div>

                        {/* Distance Info */}
                        <div className="p-8 bg-stone-900">
                            <h3 className="font-display text-2xl text-white mb-6 flex items-center gap-2">
                                <Navigation className="text-bayou-gold" size={24} />
                                Strategic Proximity
                            </h3>

                            <div className="space-y-4">
                                {KEY_LOCATIONS.map((location, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 bg-stone-950 rounded border border-stone-800 hover:border-bayou-gold/30 transition-colors">
                                        <div className="text-bayou-gold font-display text-2xl min-w-[60px]">
                                            {location.distance} mi
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold mb-1">{location.name}</h4>
                                            <p className="text-stone-400 text-sm">{location.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Market Demographics */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-stone-900 p-8 rounded-xl border border-stone-800">
                        <Users className="text-bayou-gold mb-4" size={32} />
                        <h3 className="font-display text-xl text-white mb-3">Hunter Demographics</h3>
                        <div className="space-y-2 text-stone-300">
                            <p className="flex justify-between">
                                <span className="text-stone-500">Avg. Spending:</span>
                                <span className="font-bold">{MARKET_STATS.unionParish.hunterSpending}</span>
                            </p>
                            <p className="text-sm text-stone-400 mt-3">
                                Union Parish hunters invest heavily in premium accommodations during peak seasons (Nov-Jan).
                            </p>
                        </div>
                    </div>

                    <div className="bg-stone-900 p-8 rounded-xl border border-stone-800">
                        <TrendingUp className="text-emerald-500 mb-4" size={32} />
                        <h3 className="font-display text-xl text-white mb-3">Angler Demographics</h3>
                        <div className="space-y-2 text-stone-300">
                            <p className="flex justify-between">
                                <span className="text-stone-500">Avg. Spending:</span>
                                <span className="font-bold">{MARKET_STATS.unionParish.anglerSpending}</span>
                            </p>
                            <p className="text-sm text-stone-400 mt-3">
                                Tournament anglers with $50k+ boats seek secure, premium facilities near Lake D'Arbonne.
                            </p>
                        </div>
                    </div>

                    <div className="bg-stone-900 p-8 rounded-xl border border-stone-800">
                        <MapPin className="text-cyan-500 mb-4" size={32} />
                        <h3 className="font-display text-xl text-white mb-3">Tournament Economy</h3>
                        <div className="space-y-2 text-stone-300">
                            <p className="flex justify-between">
                                <span className="text-stone-500">Per Event:</span>
                                <span className="font-bold">{MARKET_STATS.unionParish.tournamentEconomy}</span>
                            </p>
                            <p className="text-sm text-stone-400 mt-3">
                                Major crappie and bass tournaments drive significant economic activity Feb-Oct.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Competitive Analysis */}
                <div className="bg-stone-900 p-8 rounded-xl border border-stone-800">
                    <h3 className="font-display text-2xl text-white mb-6">Competitive Landscape</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-stone-700">
                                    <th className="pb-4 text-stone-400 font-semibold">Park Name</th>
                                    <th className="pb-4 text-stone-400 font-semibold">Distance</th>
                                    <th className="pb-4 text-stone-400 font-semibold">Amenities</th>
                                    <th className="pb-4 text-stone-400 font-semibold">Rate</th>
                                    <th className="pb-4 text-stone-400 font-semibold">Gap</th>
                                </tr>
                            </thead>
                            <tbody className="text-stone-300">
                                <tr className="border-b border-stone-800">
                                    <td className="py-4">Poverty Point Reservoir State Park</td>
                                    <td className="py-4">18 miles</td>
                                    <td className="py-4">Basic hookups, primitive</td>
                                    <td className="py-4">$20-30/night</td>
                                    <td className="py-4 text-red-400">No premium option</td>
                                </tr>
                                <tr className="border-b border-stone-800">
                                    <td className="py-4">Lake D'Arbonne State Park</td>
                                    <td className="py-4">8 miles</td>
                                    <td className="py-4">State park, limited services</td>
                                    <td className="py-4">$25-35/night</td>
                                    <td className="py-4 text-red-400">No security, no full hookups</td>
                                </tr>
                                <tr>
                                    <td className="py-4 font-bold text-bayou-gold">D'Arbonne Gate (Proposed)</td>
                                    <td className="py-4">—</td>
                                    <td className="py-4">Full hookups, pavilion, pool, themed</td>
                                    <td className="py-4 text-emerald-400">$55-75/night</td>
                                    <td className="py-4 text-emerald-400">Premium positioning</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-bayou-gold/10 border border-bayou-gold/30 rounded">
                        <p className="text-stone-300 text-sm">
                            <strong className="text-bayou-gold">Market Gap:</strong> High-net-worth hunters and anglers currently forced into primitive state parks.
                            D'Arbonne Gate captures premium segment with Disney-inspired theming and full-service amenities.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LocationSection;
