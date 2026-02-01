import { ExternalLink, ShieldCheck, BarChart3, ShoppingBag, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const sources = [
    {
        category: "Regulatory",
        items: [
            {
                title: "Cannabis Licensee Directory",
                author: "Illinois Department of Agriculture (IDOA)",
                url: "https://agr.illinois.gov/cannabis.html",
                license: "Public Government Record",
                description: "The primary authority for license status, facility locations, and parent entity names for Cultivation Centers and Craft Growers."
            }
        ]
    },
    {
        category: "Market Research",
        items: [
            {
                title: "Illinois Cultivator Database",
                author: "Illinois Cannabis Training Center (ICTC)",
                url: "https://www.illinoiscannabistrainingcenter.com/cultivators-database",
                license: "Privately Maintained Educational Database",
                description: "Authoritative mapping of consumer brand labels to their respective state-licensed manufacturing entities."
            },
            {
                title: "Illinois Market Real-Time Data",
                author: "Headset.io",
                url: "https://www.headset.io/markets/illinois",
                license: "Commercial Market Analytics",
                description: "Real-time retail performance data used to verify brand activity and categorise product segments."
            }
        ]
    },
    {
        category: "Wholesale & Supply",
        items: [
            {
                title: "Wholesale Marketplace",
                author: "Leaf Trade",
                url: "https://leaf.trade/",
                license: "B2B Industry Platform",
                description: "Primary verification source for current product catalogs and active white-label/guest brand partnerships."
            }
        ]
    }
];

export default function Sources() {
    // Static for demonstration, could be pulled from context/json in production
    const lastUpdated = "February 01, 2026";

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-amber-500/30 selection:text-white">
            {/* Navigation */}
            <nav className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:text-amber-400 transition-colors">
                        <ArrowLeft size={16} />
                        Back to Directory
                    </Link>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Documentation</div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-20">
                {/* Header */}
                <header className="mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-6">
                        <Clock size={12} />
                        Data Accuracy Timestamp: {lastUpdated}
                    </div>
                    <h1 className="text-5xl font-serif font-bold text-white mb-6">Source of Truth & Data Attributions</h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-light max-w-2xl">
                        Our market data is a synthesis of official state records, educational datasets, and real-time market tracking across the Illinois cannabis ecosystem.
                    </p>
                </header>

                {/* Content Structure */}
                <div className="space-y-16">
                    {sources.map((section, idx) => (
                        <section key={idx}>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 rounded-lg bg-slate-900 border border-white/5">
                                    {section.category === "Regulatory" && <ShieldCheck size={20} className="text-emerald-500" />}
                                    {section.category === "Market Research" && <BarChart3 size={20} className="text-amber-500" />}
                                    {section.category === "Wholesale & Supply" && <ShoppingBag size={20} className="text-blue-500" />}
                                </div>
                                <h2 className="text-2xl font-bold text-white">{section.category}</h2>
                            </div>

                            <div className="grid gap-6">
                                {section.items.map((item, i) => (
                                    <div key={i} className="bg-slate-900/40 border border-white/5 rounded-2xl p-8 hover:border-amber-500/20 transition-all group">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                            <div className="space-y-4 max-w-xl">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                                    <div className="text-sm font-medium text-amber-500/70 italic">by {item.author}</div>
                                                </div>
                                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                                    {item.description}
                                                </p>
                                                <div className="pt-4 flex flex-col gap-2 border-t border-white/5">
                                                    <div className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">TASL Metadata</div>
                                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                                        <div>
                                                            <span className="text-slate-600 block mb-0.5">Title</span>
                                                            <span className="text-slate-300">{item.title}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-600 block mb-0.5">Author</span>
                                                            <span className="text-slate-300">{item.author}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-600 block mb-0.5">License</span>
                                                            <span className="text-slate-300">{item.license}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-600 block mb-0.5">Status</span>
                                                            <span className="text-emerald-500 flex items-center gap-1">Verified <ShieldCheck size={10} /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-all group-hover:border-amber-500/30"
                                            >
                                                Visit Source
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Legal Footer */}
                <footer className="mt-32 pt-12 border-t border-white/5">
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/10 text-center">
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-[0.2em]">Legal Disclaimer</h4>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
                            Information provided is for aggregate market research purposes only. While we verify data weekly across multiple indices, cannabis licensing status and brand partnerships are subject to rapid change. Always refer to the Illinois Department of Agriculture for legal standing.
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
