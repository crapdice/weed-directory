import { Link } from 'react-router-dom';
import {
    Leaf,
    Sparkles,
    Dna,
    ShieldCheck,
    ArrowLeft
} from 'lucide-react';
import marketData from '../data/market-data.json';

interface Breeder {
    name: string;
    cultivator: string;
    specialization: string;
    profile: string;
    legendary_strains: string[];
}

export default function Breeders() {
    return (
        <div className="min-h-screen bg-luxe-midnight text-slate-200 font-sans selection:bg-weird-lime/30 pb-24">
            {/* Header */}
            <header className="border-b-4 border-weird-lime/10 bg-black/40 backdrop-blur-3xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-weird-lime/50 hover:text-weird-lime transition-all group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-black uppercase tracking-[0.2em]">Exit to Vault</span>
                    </Link>
                    <div className="flex items-center gap-2 text-trippy-pink font-serif font-black italic uppercase tracking-tighter">
                        <Sparkles size={18} />
                        Genetic Archives
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-20">
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-weird-lime text-black text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-[4px_4px_0px_white]">
                        <Sparkles size={14} />
                        Lineage Protocol
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif font-black text-white mb-6 uppercase tracking-tighter leading-none">
                        Master <span className="gold-gradient-text italic">Breeders</span>
                    </h1>
                    <p className="text-2xl text-slate-500 max-w-2xl font-light leading-relaxed italic border-l-4 border-trippy-pink/20 pl-8">
                        The elite architects shaping the Illinois frequency through rigorous selection and heritage lineage preservation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {marketData.famous_growers_spotlight.map((breeder: Breeder, idx) => (
                        <div key={idx} className="glass-card p-12 rounded-[2.5rem] group relative flex flex-col h-full border-weird-lime/10 hover:rotate-1">
                            <div className="absolute top-12 right-12 text-weird-lime/5 group-hover:text-weird-lime/20 transition-colors">
                                <Dna size={140} />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="text-[10px] font-black text-weird-lime uppercase tracking-[0.3em] mb-4 px-4 py-1.5 rounded-lg bg-weird-lime/10 border-2 border-weird-lime/20 w-fit">
                                    {breeder.specialization}
                                </div>

                                <h3 className="text-4xl font-serif font-black text-white mb-1 group-hover:text-trippy-pink transition-colors uppercase tracking-tighter leading-none">
                                    {breeder.name}
                                </h3>
                                <div className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-10 flex items-center gap-2 opacity-50">
                                    <Leaf size={14} className="text-weird-lime" />
                                    {breeder.cultivator}
                                </div>

                                <p className="text-slate-400 text-lg leading-relaxed mb-12 font-light italic border-l-2 border-white/10 pl-6">
                                    "{breeder.profile}"
                                </p>

                                <div className="mt-auto space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-0.5 flex-1 bg-white/5"></div>
                                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] whitespace-nowrap">Genetic Matrix</div>
                                        <div className="h-0.5 flex-1 bg-white/5"></div>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {breeder.legendary_strains.map((strain, i) => (
                                            <div key={i} className="group/strain relative">
                                                <span className="px-5 py-2.5 rounded-2xl bg-black/40 border-2 border-white/5 text-xs font-black text-weird-lime/70 hover:bg-weird-lime/10 hover:border-weird-lime hover:text-white cursor-help transition-all flex items-center gap-2 shadow-xl">
                                                    <div className="w-2 h-2 rounded-full bg-weird-lime shadow-[0_0_12px_rgba(183,255,0,0.8)]" />
                                                    {strain}
                                                </span>

                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-80 p-6 bg-luxe-midnight border-2 border-trippy-pink rounded-[2.5rem] text-xs text-slate-200 shadow-[30px_30px_80px_rgba(0,0,0,1)] opacity-0 group-hover/strain:opacity-100 transition-all pointer-events-none z-50 translate-y-4 group-hover/strain:translate-y-0 backdrop-blur-3xl">
                                                    <div className="font-black text-trippy-pink uppercase tracking-[0.4em] mb-3 text-[10px] flex items-center justify-between">
                                                        <span>Breeder_Verified</span>
                                                        <Sparkles size={14} />
                                                    </div>
                                                    <p className="leading-relaxed font-light italic mb-6 text-sm">
                                                        "{breeder.profile.split('.')[0]}."
                                                    </p>
                                                    <div className="pt-4 border-t-2 border-white/5 flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-weird-lime">
                                                            <ShieldCheck size={16} />
                                                            <span className="text-[10px] uppercase font-black tracking-widest">Protocol Lock</span>
                                                        </div>
                                                        <span className="text-[9px] text-slate-700 font-black uppercase tracking-tighter">ID: MJ_2026_GEN</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Legal Footer */}
            <footer className="max-w-7xl mx-auto px-6 pt-32 border-t-8 border-weird-lime/10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 text-slate-700 text-[11px] font-black leading-relaxed uppercase tracking-[0.2em]">
                    <div className="max-w-md">
                        All genetic claims and 'Legendary' statuses are attributed based on market reputation and
                        available breeder self-identification. This index is for metaphysical transparency.
                    </div>
                    <div className="flex gap-12">
                        <Link to="/sources" className="hover:text-weird-lime transition-colors">Origins</Link>
                        <Link to="/" className="hover:text-trippy-pink transition-colors">Vault</Link>
                        <span className="opacity-30">Alpha_v2.6</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
