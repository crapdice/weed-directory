import { Link } from 'react-router-dom';
import geneticData from '../data/genetic-archive.json';

const getTerpeneColor = (profile: string) => {
    if (profile.toLowerCase().includes('purple')) return 'text-purple-400 border-purple-900/40';
    if (profile.toLowerCase().includes('blue')) return 'text-blue-400 border-blue-900/40';
    if (profile.toLowerCase().includes('red')) return 'text-red-400 border-red-900/40';
    if (profile.toLowerCase().includes('orange')) return 'text-orange-400 border-orange-900/40';
    return 'text-lime-vibrant border-border-muted';
};

const Archives = () => {
    return (
        <div className="min-h-screen flex flex-col max-w-[1200px] mx-auto px-4 py-2 font-mono selection:bg-pink-vibrant selection:text-black">
            {/* Header Row */}
            <header className="flex flex-row justify-between items-center border-b border-border-muted pb-2 mb-2">
                <Link to="/" className="text-2xl font-black text-lime-vibrant leading-none uppercase hover:text-pink-vibrant transition-colors">
                    Illinois Cannabis Directory
                </Link>
                <div className="flex items-center gap-6">
                    <span className="text-pink-vibrant text-[12px] font-bold uppercase tracking-widest">
                        Genetic Archive &amp; Lineage Map
                    </span>
                    <Link to="/" className="text-[10px] text-pink-vibrant hover:text-white uppercase font-bold border border-pink-vibrant/30 px-2 py-1">
                        Back to Directory
                    </Link>
                </div>
            </header>

            <main className="mt-4">
                <div className="directory-box mb-6 p-4">
                    <div className="text-[10px] text-lime-muted/60 mb-2 uppercase tracking-tighter">
                        System Message: Data bridged from Illinois News Joint &amp; Strain Data Project // Ver: 2026.02.01
                    </div>
                    <p className="text-xs text-white leading-relaxed max-w-3xl">
                        This archive bridges the gap between commercial Illinois brand names and their botanical genetic lineage.
                        Cross-referenced with verified genetic databases (SeedFinder, Phylos) to ensure the 'Source of Truth' integrity.
                    </p>
                </div>

                <div className="directory-box overflow-hidden">
                    <div className="directory-header grid grid-cols-5 gap-4">
                        <span>Strain Name</span>
                        <span>Parent Lineage</span>
                        <span>Primary IL Cultivator</span>
                        <span>Terpene Profile</span>
                        <span>Breeder</span>
                    </div>

                    <div className="divide-y divide-border-muted/30">
                        {geneticData.strains.map((strain, idx) => (
                            <div key={idx} className="grid grid-cols-5 gap-4 p-3 hover:bg-white/5 transition-colors border-l-2 border-l-transparent hover:border-l-pink-vibrant items-center">
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-lime-vibrant uppercase tracking-tight">
                                        {strain.name}
                                    </span>
                                    {strain.status !== "Verified" && (
                                        <span className={`text-[8px] font-bold px-1 w-fit ${strain.status === 'Proprietary' ? 'bg-orange-900/40 text-orange-400' : 'bg-red-900/40 text-red-400'}`}>
                                            [{strain.status.toUpperCase()}]
                                        </span>
                                    )}
                                </div>

                                <div className="text-[11px] text-white/80 font-medium italic">
                                    {strain.lineage}
                                </div>

                                <div className="text-[11px] text-pink-muted font-bold uppercase">
                                    {strain.primary_cultivator}
                                </div>

                                <div className={`text-[10px] font-black uppercase border-b-2 py-1 ${getTerpeneColor(strain.terpene_profile)}`}>
                                    {strain.terpene_profile}
                                </div>

                                <div className="text-[11px] text-neo-gray font-bold">
                                    {strain.breeder}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="mt-8 pt-4 border-t border-border-muted/20">
                <div className="flex justify-between items-center text-[9px] text-border-muted font-bold uppercase">
                    <div>DATA SOURCE: ILLINOIS NEWS JOINT / SEEDFINDER / STRAIN DATA PROJECT</div>
                    <div>CORE_DNA_SEQUENCING: VALIDATED_NODE</div>
                </div>
            </footer>
        </div>
    );
};

export default Archives;
