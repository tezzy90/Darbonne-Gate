import React from 'react';
import { CheckCircle2, Circle, Clock, Calendar } from 'lucide-react';
import { TIMELINE_2025 } from '../constants';

const TimelineSection: React.FC = () => {
    // Group milestones by phase for better organization
    const groupedMilestones = TIMELINE_2025.reduce((acc, milestone) => {
        if (!acc[milestone.phase]) {
            acc[milestone.phase] = [];
        }
        acc[milestone.phase].push(milestone);
        return acc;
    }, {} as Record<string, typeof TIMELINE_2025>);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Complete':
                return { bg: 'bg-emerald-900/30', text: 'text-emerald-400', dot: 'bg-emerald-500' };
            case 'In Progress':
                return { bg: 'bg-bayou-gold/20', text: 'text-bayou-gold', dot: 'bg-bayou-gold animate-pulse' };
            case 'Pending':
                return { bg: 'bg-amber-900/20', text: 'text-amber-400', dot: 'bg-amber-500' };
            default:
                return { bg: 'bg-stone-800', text: 'text-stone-500', dot: 'bg-stone-600' };
        }
    };

    return (
        <section id="timeline" className="py-24 px-6 bg-stone-950 text-stone-200">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Project Roadmap</h2>
                    <p className="text-xl text-stone-400 font-serif italic">
                        From land acquisition to grand opening: 2024-2027 execution timeline
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-stone-500">
                        <Calendar size={16} />
                        <span>Last Updated: December 2024</span>
                    </div>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone-800"></div>

                    <div className="space-y-12">
                        {TIMELINE_2025.map((milestone, idx) => {
                            const colors = getStatusColor(milestone.status);

                            return (
                                <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Timeline Dot */}
                                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-stone-900 border-4 border-stone-800 z-10 flex items-center justify-center">
                                        <div className={`w-3 h-3 ${colors.dot} rounded-full`}></div>
                                    </div>

                                    {/* Content */}
                                    <div className="ml-12 md:ml-0 md:w-1/2 p-6 bg-stone-900/50 border border-stone-800 rounded-lg hover:border-bayou-gold/30 transition-colors">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded ${colors.bg} ${colors.text}`}>
                                                {milestone.status}
                                            </span>
                                            <span className="text-stone-500 text-xs uppercase">{milestone.phase}</span>
                                        </div>

                                        <h3 className="font-display text-xl text-white mb-2">{milestone.milestone}</h3>

                                        <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
                                            <Clock size={14} />
                                            <span>{milestone.startDate} → {milestone.endDate}</span>
                                        </div>

                                        {milestone.notes && (
                                            <p className="text-sm text-stone-400 bg-stone-950 p-3 rounded border border-stone-800">
                                                {milestone.notes}
                                            </p>
                                        )}
                                    </div>

                                    {/* Empty Space for alternate side */}
                                    <div className="hidden md:block md:w-1/2"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Phase Summary */}
                <div className="mt-16 grid md:grid-cols-4 gap-4">
                    {Object.entries(groupedMilestones).map(([phase, milestones]) => {
                        const completedCount = milestones.filter(m => m.status === 'Complete').length;
                        const totalCount = milestones.length;
                        const percentage = Math.round((completedCount / totalCount) * 100);

                        return (
                            <div key={phase} className="bg-stone-900 p-4 rounded-lg border border-stone-800">
                                <h4 className="font-display text-sm text-white mb-2">{phase}</h4>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-bayou-gold transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-stone-400">{percentage}%</span>
                                </div>
                                <p className="text-xs text-stone-500">{completedCount} of {totalCount} complete</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
