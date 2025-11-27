import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const TimelineSection: React.FC = () => {
    const milestones = [
        {
            phase: "Phase 1",
            title: "Acquisition & Planning",
            date: "Q4 2024",
            status: "completed",
            items: ["Land Acquisition (47 Acres)", "Topographical Survey", "Initial Site Plan"]
        },
        {
            phase: "Phase 2",
            title: "Permitting & Engineering",
            date: "Q1-Q2 2025",
            status: "in-progress",
            items: ["Parish Permits", "Utility Engineering", "SBA/USDA Financing Approval"]
        },
        {
            phase: "Phase 3",
            title: "Construction",
            date: "Q3 2025",
            status: "upcoming",
            items: ["Ground Breaking", "Road Infrastructure", "Utility Installation (Water/Electric)"]
        },
        {
            phase: "Phase 4",
            title: "Soft Launch",
            date: "Q2 2026",
            status: "upcoming",
            items: ["Phase 1 RV Slips (100 Units)", "Pavilion Completion", "First Guest Arrivals"]
        }
    ];

    return (
        <section id="timeline" className="py-24 px-6 bg-stone-950 text-stone-200">
            <div className="max-w-5xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="font-display text-4xl text-white mb-4">Project Roadmap</h2>
                    <p className="text-stone-400">Execution timeline from ground breaking to grand opening.</p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone-800"></div>

                    <div className="space-y-12">
                        {milestones.map((milestone, idx) => (
                            <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Timeline Dot */}
                                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-stone-900 border-4 border-stone-800 z-10 flex items-center justify-center">
                                    {milestone.status === 'completed' ? (
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                    ) : milestone.status === 'in-progress' ? (
                                        <div className="w-3 h-3 bg-bayou-gold rounded-full animate-pulse"></div>
                                    ) : (
                                        <div className="w-3 h-3 bg-stone-600 rounded-full"></div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="ml-12 md:ml-0 md:w-1/2 p-6 bg-stone-900/50 border border-stone-800 rounded-lg hover:border-bayou-gold/30 transition-colors">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${milestone.status === 'completed' ? 'bg-emerald-900/30 text-emerald-400' :
                                                milestone.status === 'in-progress' ? 'bg-bayou-gold/20 text-bayou-gold' :
                                                    'bg-stone-800 text-stone-500'
                                            }`}>
                                            {milestone.date}
                                        </span>
                                        <span className="text-stone-500 text-xs uppercase">{milestone.phase}</span>
                                    </div>

                                    <h3 className="font-display text-xl text-white mb-4">{milestone.title}</h3>

                                    <ul className="space-y-2">
                                        {milestone.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-stone-400">
                                                {milestone.status === 'completed' ? (
                                                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                                ) : (
                                                    <Circle size={16} className="text-stone-600 mt-0.5 shrink-0" />
                                                )}
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Empty Space for alternate side */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
