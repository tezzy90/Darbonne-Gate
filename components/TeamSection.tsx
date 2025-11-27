import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

const TeamSection: React.FC = () => {
    const team = [
        {
            name: "Cortez Fields",
            role: "Managing Member",
            bio: "Hospitality veteran with experience at Disney and Harrah's. Expert in guest experience and operational excellence.",
            image: "/owner_atv.jpg" // Reusing the image we know exists or has a fallback
        },
        {
            name: "Choudrant Creek Outfitters",
            role: "Strategic Partner",
            bio: "Premier hunting lease operator managing 1,100+ acres of adjacent land. Provides exclusive access for resort guests.",
            image: "https://picsum.photos/400/400?grayscale&blur=1"
        },
        {
            name: "TBD Construction",
            role: "General Contractor",
            bio: "Regional leader in commercial development and infrastructure. Specializing in rural utility implementation.",
            image: "https://picsum.photos/401/401?grayscale&blur=1"
        }
    ];

    return (
        <section id="team" className="py-24 px-6 bg-stone-900 border-t border-stone-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl text-white mb-4">The Team</h2>
                    <p className="text-stone-400 max-w-2xl mx-auto">
                        A coalition of hospitality experts and local land specialists dedicated to executing the vision.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member, idx) => (
                        <div key={idx} className="group relative bg-stone-950 rounded-lg overflow-hidden border border-stone-800 hover:border-bayou-gold/50 transition-all duration-300">
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name}&background=random`;
                                    }}
                                />
                            </div>

                            <div className="p-6 relative">
                                <div className="absolute -top-6 right-6 bg-bayou-gold text-bayou-dark p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <Linkedin size={20} />
                                </div>

                                <h3 className="font-display text-xl text-white mb-1">{member.name}</h3>
                                <p className="text-bayou-gold text-xs uppercase tracking-wider mb-4">{member.role}</p>
                                <p className="text-stone-400 text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
