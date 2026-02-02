import { Link } from 'react-router-dom';
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
        <div className="min-h-screen flex flex-col max-w-[1200px] mx-auto px-4 py-2 font-mono selection:bg-pink-vibrant selection:text-black">
            {/* Header Row */}
            <header className="flex flex-row justify-between items-center border-b border-border-muted pb-2 mb-2">
                <div>
                    <div className="text-[10px] text-lime-muted/60 mb-1 uppercase tracking-tighter">
                        Index / Illinois / Marijuana Cultivators / Genetic Archives
                    </div>
                    <h1 className="text-2xl font-black text-pink-vibrant leading-none uppercase">
                        Breeder Profiles
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-pink-vibrant text-[10px] hover:underline uppercase font-bold tracking-tighter">
                        &lt;&lt; BACK TO DIRECTORY
                    </Link>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start mt-4">
                {marketData.famous_growers_spotlight.map((breeder: Breeder, idx) => (
                    <div key={idx} className="directory-box p-4 space-y-4">
                        <div className="border-b border-border-muted pb-2 mb-2">
                            <h2 className="text-lime-vibrant font-black text-lg uppercase tracking-tight neon-text-lime">{breeder.name}</h2>
                            <div className="text-[10px] text-lime-muted uppercase font-bold">Facility: {breeder.cultivator}</div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <span className="text-pink-vibrant font-bold text-[9px] uppercase mr-2 tracking-widest">Specialization:</span>
                                <span className="text-[11px] text-white/90">{breeder.specialization}</span>
                            </div>

                            <div>
                                <span className="text-pink-vibrant font-bold text-[9px] uppercase mr-2 tracking-widest">Strain Portfolio:</span>
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {breeder.legendary_strains.map((strain, i) => (
                                        <span key={i} className="text-[10px] text-lime-vibrant border border-border-muted px-1 bg-black/50 font-bold">
                                            {strain}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2 border-t border-border-muted/30 text-[10px] text-lime-muted/70 italic leading-relaxed font-medium">
                                {breeder.profile}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Info Box */}
                <div className="directory-box p-6 bg-black/50 border-dashed border-border-muted">
                    <h3 className="text-pink-vibrant font-bold text-xs uppercase mb-2">ARCHIVE INFORMATION</h3>
                    <p className="text-[10px] text-lime-muted/60 leading-relaxed mb-4">
                        Genetic data is sourced from Illinois Department of Agriculture licensee records and public genetic whitepapers.
                    </p>
                    <Link to="/sources" className="text-lime-vibrant text-[10px] font-bold hover:underline">VIEW VERIFICATION LOGS</Link>
                </div>
            </main>

            {/* Footer Stats */}
            <footer className="mt-auto pt-16">
                <div className="directory-box bg-black p-4 stats-bar flex flex-col md:flex-row justify-between items-center text-[10px]">
                    <div>
                        ARCHIVE_STATUS: {marketData.famous_growers_spotlight.length} BREEDERS INDEXED
                    </div>
                    <div>
                        DATA_VERSION: 2.0_BETA // REVISED FEB 2026
                    </div>
                </div>
            </footer>
        </div>
    );
}
