import React, { useState } from 'react';
import { createAccessToken } from '../lib/auth';
import { Key, Mail, User, Copy, CheckCircle } from 'lucide-react';

const AdminPanel: React.FC = () => {
    const [email, setEmail] = useState('');
    const [investorName, setInvestorName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerateLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setGeneratedLink('');
        setCopied(false);

        try {
            const token = await createAccessToken(email, investorName, isAdmin);
            const baseUrl = window.location.origin;
            const magicLink = `${baseUrl}/?token=${token}`;
            setGeneratedLink(magicLink);
        } catch (error) {
            console.error('Error generating token:', error);
            alert('Failed to generate magic link. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-stone-950 text-stone-200 py-12 px-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Key className="text-bayou-gold" size={40} />
                        <h1 className="font-display text-4xl text-white">Admin Panel</h1>
                    </div>
                    <p className="text-stone-400">Generate magic links for investor access</p>
                </div>

                {/* Form */}
                <form onSubmit={handleGenerateLink} className="bg-stone-900 rounded-xl p-8 border border-stone-800 shadow-2xl">
                    {/* Email Input */}
                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-300 mb-2">
                            <Mail size={16} className="text-bayou-gold" />
                            Investor Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-bayou-gold transition-colors"
                            placeholder="investor@example.com"
                        />
                    </div>

                    {/* Name Input */}
                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-300 mb-2">
                            <User size={16} className="text-bayou-gold" />
                            Investor Name
                        </label>
                        <input
                            type="text"
                            value={investorName}
                            onChange={(e) => setInvestorName(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-bayou-gold transition-colors"
                            placeholder="John Smith"
                        />
                    </div>

                    {/* Admin Checkbox */}
                    <div className="mb-8">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                className="w-5 h-5 rounded border-stone-700 bg-stone-950 text-bayou-gold focus:ring-bayou-gold focus:ring-offset-stone-900"
                            />
                            <span className="text-stone-300">
                                <strong className="text-white">Admin Access</strong> (Never expires)
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-bayou-gold text-stone-950 font-bold py-4 rounded-lg hover:bg-bayou-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Generating...' : 'Generate Magic Link'}
                    </button>
                </form>

                {/* Generated Link Display */}
                {generatedLink && (
                    <div className="mt-8 bg-emerald-950/30 border border-emerald-800 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="text-emerald-500" size={20} />
                            <h3 className="font-semibold text-white">Magic Link Generated!</h3>
                        </div>

                        <div className="bg-stone-950 rounded-lg p-4 mb-4 break-all text-sm text-stone-300 font-mono">
                            {generatedLink}
                        </div>

                        <button
                            onClick={handleCopyLink}
                            className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            {copied ? (
                                <>
                                    <CheckCircle size={16} className="text-emerald-500" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={16} />
                                    Copy Link
                                </>
                            )}
                        </button>

                        {isAdmin && (
                            <p className="mt-4 text-sm text-emerald-400">
                                ⚠️ This is a permanent admin link that never expires.
                            </p>
                        )}
                    </div>
                )}

                {/* Instructions */}
                <div className="mt-8 bg-stone-900/50 border border-stone-800 rounded-xl p-6 text-sm text-stone-400">
                    <h4 className="text-white font-semibold mb-2">Instructions:</h4>
                    <ul className="space-y-2 list-disc list-inside">
                        <li>Regular investor links expire after 30 days</li>
                        <li>Admin links never expire and bypass all restrictions</li>
                        <li>Send the generated link to investors via email</li>
                        <li>Each link can only be used by one person</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
