import { useParams, Link } from 'react-router-dom';
import marketData from '../data/market-data.json';

interface SocialMedia {
    instagram?: string;
    website?: string;
    linkedin?: string;
}

interface Cultivator {
    name: string;
    license_type: string;
    facility_location: string | string[];
    status?: string;
    head_grower: string;
    brands: string[];
    social_media: SocialMedia;
}

export default function CultivatorDetail() {
    const { id } = useParams();

    const cultivator = (marketData.cultivators as Cultivator[]).find(
        c => c.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === id
    );

    if (!cultivator) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-mono">
                <div className="directory-box p-8 text-center">
                    <h1 className="text-hot-pink text-2xl font-black mb-4 uppercase">404 - NOT FOUND</h1>
                    <p className="text-neo-gray text-xs mb-8">ENTRY NOT IN DATABASE</p>
                    <Link to="/" className="text-lime-green text-sm hover:underline uppercase font-bold">&lt;&lt; RETURN TO INDEX</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col max-w-[1000px] mx-auto px-4 py-6 font-mono selection:bg-hot-pink selection:text-black">
            {/* Header */}
            <header className="border-b border-neo-gray mb-12 pb-4 flex justify-between items-end">
                <div>
                    <div className="text-[10px] text-neo-gray mb-1 uppercase tracking-tight">
                        Index / Illinois / Cultivators / {cultivator.name}
                    </div>
                    <h1 className="text-3xl font-black text-lime-green leading-none uppercase">
                        {cultivator.name}
                    </h1>
                </div>
                <div className="text-right">
                    <Link to="/" className="text-hot-pink text-xs hover:underline uppercase font-bold">
                        &lt;&lt; BACK TO INDEX
                    </Link>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Left Column: Core Data */}
                <div className="md:col-span-2 space-y-8">
                    <section className="directory-box">
                        <div className="directory-header">Operational Profile</div>
                        <div className="p-6 space-y-6">
                            <div>
                                <span className="text-hot-pink font-bold text-[10px] uppercase block mb-1">Entity Name:</span>
                                <span className="text-white text-lg font-black">{cultivator.name}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <span className="text-hot-pink font-bold text-[10px] uppercase block mb-1">License Type:</span>
                                    <span className="text-white text-sm">{cultivator.license_type}</span>
                                </div>
                                <div>
                                    <span className="text-hot-pink font-bold text-[10px] uppercase block mb-1">Status:</span>
                                    <span className="text-lime-green text-sm font-bold uppercase">{cultivator.status || "Operational"}</span>
                                </div>
                            </div>

                            <div>
                                <span className="text-hot-pink font-bold text-[10px] uppercase block mb-1">Physical Location(s):</span>
                                <div className="space-y-2">
                                    {Array.isArray(cultivator.facility_location) ? (
                                        cultivator.facility_location.map((loc, i) => (
                                            <div key={i} className="text-white text-sm bg-black border border-neo-gray/30 p-2">{loc}</div>
                                        ))
                                    ) : (
                                        <div className="text-white text-sm bg-black border border-neo-gray/30 p-2">{cultivator.facility_location}</div>
                                    )}
                                </div>
                            </div>

                            {cultivator.head_grower !== "Not Publicly Listed" && (
                                <div>
                                    <span className="text-hot-pink font-bold text-[10px] uppercase block mb-1">Architect:</span>
                                    <span className="text-white text-sm">{cultivator.head_grower}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="directory-box">
                        <div className="directory-header">Brand Portfolio</div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {cultivator.brands.map((brand, i) => {
                                    const isPartner = brand.includes('(Partner)');
                                    const cleanBrand = brand.replace(' (Partner)', '');
                                    return (
                                        <div key={i} className={`p-3 border border-neo-gray/30 text-center flex flex-col justify-center ${isPartner ? 'bg-hot-pink/5 border-hot-pink/30' : 'bg-black'}`}>
                                            <span className={`text-[11px] font-bold ${isPartner ? 'text-hot-pink italic cursor-help' : 'text-white'}`} title={isPartner ? `Regulatory Disclosure: Produced by ${cultivator.name}` : undefined}>{cleanBrand}</span>
                                            {isPartner && <span className="text-[8px] text-neo-gray mt-1 uppercase">Third-Party Partner</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Connections */}
                <div className="space-y-8">
                    <section className="directory-box">
                        <div className="directory-header">Online Presence</div>
                        <div className="p-6 space-y-4">
                            {cultivator.social_media.website && (
                                <a href={cultivator.social_media.website} target="_blank" rel="noopener noreferrer" className="block text-xs text-lime-green font-bold hover:underline">
                                    Visit Official Website &gt;&gt;
                                </a>
                            )}
                            {cultivator.social_media.instagram && (
                                <a
                                    href={cultivator.social_media.instagram.startsWith('http') ? cultivator.social_media.instagram : `https://instagram.com/${cultivator.social_media.instagram.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-xs text-lime-green font-bold hover:underline"
                                >
                                    Instagram Feed (External)
                                </a>
                            )}
                            {!cultivator.social_media.website && !cultivator.social_media.instagram && (
                                <span className="text-xs text-neo-gray italic">No public links indexed.</span>
                            )}
                        </div>
                    </section>

                    <footer className="directory-box bg-lime-green/5 border-dashed border-lime-green/30 p-6 text-center">
                        <p className="text-[10px] text-neo-gray leading-relaxed mb-4">
                            All data is sourced from IDOA licensee filings and verified by operational manifest logs.
                        </p>
                        <Link to="/sources" className="text-xs text-lime-green font-bold hover:underline uppercase">Full Source Log</Link>
                    </footer>
                </div>
            </main>

            {/* Internal Footer */}
            <footer className="mt-16 pt-8 border-t border-neo-gray text-center">
                <div className="text-[10px] text-neo-gray uppercase tracking-widest">
                    IL_CANNABIS_DIRECTORY // FILE_{id?.toUpperCase()}
                </div>
            </footer>
        </div>
    );
}
