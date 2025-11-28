import React, { useState, useRef } from 'react';
import { FileText, Map, BarChart3, Download, Upload, Plus, Sparkles, X, Terminal } from 'lucide-react';
// Server-side proxy will perform AI requests; do not use API keys in client code.
import { DownloadItem } from '../types';
import { FINANCIAL_DATA, OWNER_LETTER } from '../constants';

const INITIAL_DOCUMENTS: DownloadItem[] = [
  { name: "Executive Business Plan v4.0", size: "4.2 MB", type: "PDF" },
  { name: "Site Survey & Engineering", size: "12.8 MB", type: "PDF" },
  { name: "USDA/SBA Financial Models", size: "1.5 MB", type: "XLSX" },
  { name: "Market Feasibility Study", size: "3.1 MB", type: "PDF" },
];

const DataRoom: React.FC = () => {
  const [documents, setDocuments] = useState<DownloadItem[]>(INITIAL_DOCUMENTS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDoc: DownloadItem = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        url: URL.createObjectURL(file)
      };
      setDocuments([newDoc, ...documents]);
    }
    // Reset input value to allow selecting the same file again if needed
    if (event.target) {
        event.target.value = '';
    }
  };

  const handleDownload = (doc: DownloadItem) => {
    if (doc.url) {
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
            // Static asset; no URL available in this demo. In production, serve files from a secure origin.
    }
  };

  const handleAnalyze = async (index: number) => {
    const doc = documents[index];
    
    // Toggle off if already open
    if (doc.analysis) {
        const newDocs = [...documents];
        newDocs[index] = { ...doc, analysis: undefined };
        setDocuments(newDocs);
        return;
    }

    // Set loading state
    const newDocs = [...documents];
    newDocs[index] = { ...doc, isAnalyzing: true };
    setDocuments(newDocs);

    try {
        let prompt = "";
        
        // Contextual Prompting Logic
        if (!doc.url) {
            // It's a static mock file, inject app context to hallucinate accurately
            if (doc.name.includes("Business Plan")) {
                prompt = `Analyze the D'Arbonne Gate RV Resort business plan based on this context: 
                - Location: Downsville, LA. 
                - 47 Acres. 
                - 165 RV Slips. 
                - 1,100 Acre Hunting Lease Synergy. 
                - Owner Philosophy: "${OWNER_LETTER}". 
                
                Provide 3 critical "Investor Highlights" and 1 "Risk Factor" in a concise bulleted list.`;
            } else if (doc.name.includes("Financial")) {
                prompt = `Analyze these projected financials for D'Arbonne Gate RV Resort: ${JSON.stringify(FINANCIAL_DATA)}. 
                The total project cost is $6.1M. 
                Evaluate the ROI trajectory and mention the 7-Year Exit Strategy valuation of $14.3M. Is this aggressive or conservative?`;
            } else {
                prompt = `I am a real estate investor performing due diligence. I am looking at a document named "${doc.name}". 
                List 5 specific red flags or key data points I should verify in this specific type of document.`;
            }
        } else {
            // It's a user uploaded file.
            // Attempt to read it if it's text/json
            try {
                const response = await fetch(doc.url);
                const blob = await response.blob();
                
                if (blob.type.startsWith('text/') || blob.type === 'application/json') {
                    const text = await blob.text();
                    prompt = `Analyze this uploaded document content for an investor: \n\n ${text.substring(0, 5000)}`; // Truncate for safety
                } else {
                    // Fallback for binaries (PDFs/Images) in this frontend-only demo
                    prompt = `I have uploaded a file named "${doc.name}" of type ${doc.type}. 
                    As an AI analyst, I cannot read the binary content of this file directly in the browser yet. 
                    However, please provide a comprehensive "Due Diligence Checklist" of what an investor SHOULD look for in this specific document.`;
                }
            } catch (e) {
                prompt = `I am reviewing a file named "${doc.name}". What are the standard industry benchmarks I should look for?`;
            }
        }

        // Forward the prompt to a secure server-side proxy which holds the API key.
        const resp = await fetch('/api/ai-proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        const json = await resp.json();
        const analysisText = json.result || json.error || 'No response from AI proxy.';

        const updatedDocs = [...documents];
        updatedDocs[index] = { 
            ...doc, 
            isAnalyzing: false, 
            analysis: analysisText 
        };
        setDocuments(updatedDocs);

    } catch (error) {
        console.error("AI Error:", error);
        const updatedDocs = [...documents];
        updatedDocs[index] = { 
            ...doc, 
            isAnalyzing: false, 
            analysis: "⚠️ Connection to AI Analyst failed. Please verify API configuration." 
        };
        setDocuments(updatedDocs);
    }
  };

  return (
    <section className="py-24 bg-stone-900 border-t border-stone-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-center md:text-left">
                <h2 className="font-display text-3xl text-white mb-4">Investor Data Room</h2>
                <p className="text-stone-400">Secure access to diligence materials.</p>
            </div>
            
            {/* Upload Button */}
            <div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange} 
                />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 bg-stone-800 hover:bg-bayou-gold hover:text-bayou-dark text-bayou-gold border border-bayou-gold/50 px-5 py-2 rounded transition-all duration-300 text-sm font-bold uppercase tracking-wider group"
                >
                    <Plus size={16} className="group-hover:scale-110 transition-transform" />
                    Upload Asset
                </button>
            </div>
        </div>

        <div className="grid gap-4">
          {documents.map((doc, idx) => (
            <div key={idx} className="flex flex-col bg-stone-950 rounded border border-stone-800 hover:border-stone-600 transition-all group overflow-hidden">
                <div className="flex items-center justify-between p-4 md:p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-stone-900 rounded text-stone-400 group-hover:text-bayou-gold transition-colors">
                        {doc.type === 'XLSX' ? <BarChart3 size={24} /> : (doc.name.includes('Survey') ? <Map size={24} /> : <FileText size={24} />)}
                        </div>
                        <div>
                        <h4 className="text-stone-200 font-medium group-hover:text-white transition-colors">{doc.name}</h4>
                        <p className="text-stone-500 text-xs">{doc.type} • {doc.size}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {/* AI Analyze Button */}
                        <button
                            onClick={() => handleAnalyze(idx)}
                            disabled={doc.isAnalyzing}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all
                                ${doc.analysis 
                                    ? 'bg-bayou-gold text-bayou-dark' 
                                    : 'bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/50 hover:text-indigo-300 border border-indigo-800'
                                }
                            `}
                        >
                            {doc.isAnalyzing ? (
                                <span className="animate-pulse">Thinking...</span>
                            ) : (
                                <>
                                    <Sparkles size={14} />
                                    {doc.analysis ? 'Close Insight' : 'AI Analyze'}
                                </>
                            )}
                        </button>

                        <button 
                            onClick={() => handleDownload(doc)}
                            className="p-2 text-stone-500 hover:text-bayou-gold transition-colors hover:bg-stone-900 rounded-full"
                            title="Download"
                        >
                            <Download size={20} />
                        </button>
                    </div>
                </div>

                {/* AI Analysis Panel */}
                {doc.analysis && (
                    <div className="bg-[#0c0a09] border-t border-indigo-900/30 p-6 animate-fadeIn relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-bayou-gold"></div>
                        <div className="flex items-start gap-3 mb-4">
                            <Terminal size={18} className="text-bayou-gold mt-1" />
                            <span className="text-bayou-gold font-mono text-xs uppercase tracking-widest">Gemini 2.5 Flash • Analyst Report</span>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none font-sans text-stone-300 leading-relaxed">
                            <div className="whitespace-pre-wrap text-sm">{doc.analysis}</div>
                        </div>
                    </div>
                )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center pt-12 border-t border-stone-800">
            <p className="font-display text-2xl text-white mb-2">D'ARBONNE GATE</p>
            <p className="text-stone-600 text-sm">© 2025 Akerfields LLC. All Rights Reserved.</p>
            <p className="text-stone-700 text-xs mt-2 max-w-md mx-auto">
                This presentation contains forward-looking statements. Investments involve risk. 
                Please consult the full offering memorandum.
            </p>
        </div>
      </div>
    </section>
  );
};

export default DataRoom;