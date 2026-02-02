import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const sources = [
    {
        category: "REGULATORY_RECORDS",
        items: [
            {
                title: "Cannabis Licensee Directory",
                author: "Illinois Dept of Agriculture",
                url: "https://agr.illinois.gov/cannabis.html",
                license: "Public Record",
                description: "Primary authority for license status and facility locations."
            }
        ]
    },
    {
        category: "MARKET_INTELLIGENCE",
        items: [
            {
                title: "Cultivator Database",
                author: "IL Cannabis Training Center",
                url: "https://www.illinoiscannabistrainingcenter.com/cultivators-database",
                license: "Educational",
                description: "Authoritative mapping of brand labels to licensed entities."
            },
            {
                title: "Real-Time Market Data",
                author: "Headset.io",
                url: "https://www.headset.io/markets/illinois",
                license: "Commercial",
                description: "Market analytics used to verify brand activity."
            }
        ]
    },
    {
        category: "DISTRIBUTION_LOGS",
        items: [
            {
                title: "Wholesale Marketplace",
                author: "Leaf Trade",
                url: "https://leaf.trade/",
                license: "B2B Platform",
                description: "Verification for white-label and guest brand partnerships."
            }
        ]
    }
];

export default function Sources() {
    const lastUpdated = "2026-02-01 10:45:00";

    return (
        <div className="min-h-screen flex flex-col max-w-[1000px] mx-auto px-4 py-6 font-mono selection:bg-hot-pink selection:text-black">
            {/* Header */}
            <header className="border-b border-neo-gray mb-12 pb-4 flex justify-between items-end">
                <div>
                    <div className="text-[10px] text-neo-gray mb-1 uppercase tracking-tight">
                        Index / Illinois / Documentation / Sources
                    </div>
                    <h1 className="text-3xl font-black text-lime-green leading-none uppercase">
                        Data Attributions
                    </h1>
                </div>
                <div className="text-right">
                    <Link to="/" className="text-hot-pink text-sm flex items-center gap-2 hover:underline uppercase font-bold">
                        <ArrowLeft size={14} /> Back to Directory
                    </Link>
                </div>
            </header>

            <main className="space-y-12">
                <section className="directory-box p-4 bg-black/40 border-dashed border-neo-gray">
                    <div className="flex items-center gap-2 text-hot-pink mb-2">
                        <span className="text-xs font-bold uppercase">[STATUS_REPORT]</span>
                    </div>
                    <p className="text-[11px] text-neo-gray leading-relaxed">
                        The Illinois Cannabis Directory is a consolidated synthesis of official state records and real-time market tracking.
                        Data integrity is verified against the TASL standard.
                    </p>
                    <div className="mt-4 text-[10px] text-lime-green font-bold">
                        SYSTEM_LAST_SYNC: {lastUpdated}
                    </div>
                </section>

                <div className="space-y-8">
                    {sources.map((section, idx) => (
                        <div key={idx} className="directory-box">
                            <div className="directory-header">
                                {section.category}
                            </div>
                            <div className="p-4 grid gap-6">
                                {section.items.map((item, i) => (
                                    <div key={i} className="border-b border-neo-gray/20 last:border-0 pb-6 last:pb-0">
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="space-y-2">
                                                <h3 className="text-white font-bold text-sm tracking-tight">{item.title}</h3>
                                                <p className="text-[10px] text-neo-gray leading-relaxed max-w-xl">
                                                    {item.description}
                                                </p>

                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                                                    <div>
                                                        <span className="text-[9px] text-hot-pink uppercase font-bold block">Author:</span>
                                                        <span className="text-[10px] text-white/80">{item.author}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[9px] text-hot-pink uppercase font-bold block">License:</span>
                                                        <span className="text-[10px] text-white/80">{item.license}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[9px] text-hot-pink uppercase font-bold block">Verification:</span>
                                                        <span className="text-[9px] text-lime-green font-bold">√ VERIFIED</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-end">
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] bg-neo-gray/10 border border-neo-gray/30 px-3 py-1 text-white hover:bg-lime-green hover:text-black transition-colors font-bold uppercase"
                                                >
                                                    Open_Source &gt;&gt;
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="mt-20 pt-8 border-t border-neo-gray">
                <div className="directory-box p-4 bg-black/60">
                    <h4 className="text-[10px] font-bold text-hot-pink uppercase mb-2">Legal Disclaimer</h4>
                    <p className="text-[9px] text-neo-gray leading-relaxed">
                        Information provided is for aggregate market research purposes only. While we verify data weekly, licensing status is subject to rapid change.
                        Always refer to the Illinois Department of Agriculture for legal standing.
                    </p>
                </div>
                <div className="mt-4 text-[9px] text-neo-gray text-center font-bold tracking-widest uppercase">
                    TASL_VERIFIED_DATASET // 2026.02.01
                </div>
            </footer>
        </div>
    );
}

