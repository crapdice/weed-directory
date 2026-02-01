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
        <div className="min-h-screen flex flex-col max-w-[1200px] mx-auto px-4 py-6 font-mono">
            {/* Header */}
            <header className="border-b border-neo-gray mb-8 pb-4 flex justify-between items-end">
                <div>
                    <div className="text-[10px] text-neo-gray mb-1 uppercase tracking-tight">
                        Index / Illinois / Marijuana Cultivators / Genetic Archives
                    </div>
                    <h1 className="text-3xl font-black text-hot-pink leading-none uppercase">
                        Genetic Archives
                    </h1>
                </div>
                <div className="text-right">
                    <Link to="/" className="text-lime-green text-xs hover:underline uppercase font-bold">
                        &lt;&lt; BACK TO DIRECTORY
                    </Link>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {marketData.famous_growers_spotlight.map((breeder: Breeder, idx) => (
                    <div key={idx} className="directory-box p-4 space-y-4">
                        <div className="border-b border-neo-gray pb-2 mb-2">
                            <h2 className="text-lime-green font-black text-lg uppercase">{breeder.name}</h2>
                            <div className="text-[10px] text-neo-gray uppercase font-bold">Facility: {breeder.cultivator}</div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <span className="text-hot-pink font-bold text-[9px] uppercase mr-2">Specialization:</span>
                                <span className="text-[11px] text-white">{breeder.specialization}</span>
                            </div>

                            <div>
                                <span className="text-hot-pink font-bold text-[9px] uppercase mr-2">Strain Portfolio:</span>
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {breeder.legendary_strains.map((strain, i) => (
                                        <span key={i} className="text-[10px] text-lime-green border border-neo-gray px-1 bg-black">
                                            {strain}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2 border-t border-neo-gray/30 text-[10px] text-neo-gray italic leading-relaxed">
                                {breeder.profile}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Info Box */}
                <div className="directory-box p-6 bg-black/50 border-dashed border-neo-gray">
                    <h3 className="text-hot-pink font-bold text-xs uppercase mb-2">ARCHIVE INFORMATION</h3>
                    <p className="text-[10px] text-neo-gray leading-relaxed mb-4">
                        Genetic data is sourced from Illinois Department of Agriculture licensee records and public genetic whitepapers.
                    </p>
                    <Link to="/sources" className="text-lime-green text-[10px] font-bold hover:underline">VIEW VERIFICATION LOGS</Link>
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
