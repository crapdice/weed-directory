import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import marketData from './data/market-data.json';

interface SocialMedia {
  instagram?: string;
  website?: string;
  linkedin?: string;
}

interface Cultivator {
  name: string;
  license_type: string;
  facility_location: string | string[];
  head_grower: string;
  brands: string[];
  social_media: SocialMedia;
}

const SIDEBAR_IMAGES = [
  {
    url: '/sidebar-cola.png',
    label: 'ARCHIVE // ID-420-COLA',
    desc: 'HIGH-RESOLUTION GENETIC CHARACTERIZATION.'
  },
  {
    url: '/sidebar-trichomes.png',
    label: 'ARCHIVE // ID-710-TRICHOME',
    desc: 'MICROSCOPIC CRYSTALLINE ANALYSIS. PURITY: MAX.'
  },
  {
    url: '/sidebar-rosin.png',
    label: 'ARCHIVE // ID-888-EXTRACT',
    desc: 'TERPENE VOLATILITY STATUS: STABLE.'
  },
  {
    url: '/sidebar-leaf.png',
    label: 'ARCHIVE // ID-101-MORPHOLOGY',
    desc: 'MORPHOLOGICAL WIREFRAME VALIDATED.'
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % SIDEBAR_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredCultivators = useMemo((): Cultivator[] => {
    return (marketData.cultivators as Cultivator[]).filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.brands.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.head_grower !== "Not Publicly Listed" && c.head_grower.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [searchTerm]);

  const categories = useMemo(() => {
    const types = Array.from(new Set(marketData.cultivators.map(c => c.license_type)));
    return types.map(type => ({
      name: type,
      items: filteredCultivators
        .filter(c => c.license_type === type)
        .sort((a, b) => a.name.localeCompare(b.name))
    }));
  }, [filteredCultivators]);

  const totalStats = {
    cultivators: marketData.cultivators.length,
    brands: new Set(marketData.cultivators.flatMap(c => c.brands)).size,
    partners: marketData.cultivators.flatMap(c => c.brands).filter(b => b.includes('(Partner)')).length
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[1200px] mx-auto px-4 py-2 font-mono selection:bg-pink-vibrant selection:text-black">
      {/* Header Row */}
      <header className="flex flex-row justify-between items-center border-b border-border-muted pb-2 mb-2">
        <h1 className="text-2xl font-black text-lime-vibrant leading-none uppercase">
          Illinois Cannabis Directory
        </h1>
        <div className="flex items-center gap-6">
          <Link to="/archives" className="text-pink-vibrant text-[10px] hover:underline uppercase font-bold tracking-tighter">
            Genetic Archives &amp; Lineage &gt;&gt;
          </Link>
          <Link to="/breeders" className="text-pink-vibrant text-[10px] hover:underline uppercase font-bold tracking-tighter">
            Breeders List &gt;&gt;
          </Link>
          <div className="flex gap-2">
            <button className="text-[10px] text-pink-vibrant hover:text-white uppercase font-bold border border-pink-vibrant/30 px-2 py-1">Submit Site</button>
            <Link to="/sources" className="text-[10px] text-pink-vibrant hover:text-white uppercase font-bold border border-pink-vibrant/30 px-2 py-1">Data Sources</Link>
          </div>
        </div>
      </header>

      {/* Compact Search Bar */}
      <nav className="directory-box h-10 mb-4 flex items-center px-3">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs text-pink-vibrant font-bold uppercase">Search:</span>
          <input
            type="text"
            className="bg-black border-none text-lime-vibrant px-2 py-0.5 text-xs w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>

      {/* Main Directory List */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {categories.map((cat, idx) => (
          <div key={idx} className="directory-box">
            <div className="directory-header">
              {cat.name} ({cat.items.length})
            </div>
            <div className="p-4 space-y-8">
              {cat.items.map((item, i) => (
                <div key={i} className="text-[11px] leading-relaxed">
                  <div className="mb-1">
                    <Link
                      to={`/cultivators/${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      className="text-lime-vibrant font-black text-sm hover:text-pink-vibrant hover:underline neon-text-lime"
                    >
                      {item.name}
                    </Link>
                    <span className="text-lime-muted/60 ml-2">
                      - {Array.isArray(item.facility_location) ? item.facility_location[0] : item.facility_location}, IL
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="text-pink-muted/60 uppercase font-extrabold text-[8px] mr-2 tracking-widest">Brands:</span>
                    {item.brands.map((brand, bi) => {
                      const isPartner = brand.includes('(Partner)');
                      const cleanBrand = brand.replace(' (Partner)', '');
                      return (
                        <span key={bi}>
                          <span
                            className={`text-[10px] ${isPartner ? 'text-pink-vibrant font-black italic cursor-help' : 'text-lime-muted/85 font-medium'}`}
                            title={isPartner ? `Regulatory Disclosure: Produced by ${item.name}` : undefined}
                          >
                            {cleanBrand}
                          </span>
                          {bi < item.brands.length - 1 && <span className="text-border-muted mx-1.5">/</span>}
                        </span>
                      );
                    })}
                  </div>

                  {item.head_grower !== "Not Publicly Listed" && (
                    <div className="text-lime-muted/50">
                      <span className="uppercase font-extrabold text-[8px] mr-2 tracking-widest">Architect:</span>
                      <span className="text-lime-muted/80 font-medium">{item.head_grower}</span>
                    </div>
                  )}
                </div>
              ))}
              {cat.items.length === 0 && (
                <div className="text-xs italic text-neo-gray">No entries in this category.</div>
              )}
            </div>
          </div>
        ))}

        {/* 3rd Column: Visual Archive */}
        <div className="directory-box hidden lg:flex flex-col h-[700px] overflow-hidden group relative">
          <div className="directory-header flex justify-between">
            <span>{SIDEBAR_IMAGES[imgIndex].label}</span>
            <div className="flex gap-2">
              <span className="text-[8px] text-border-muted">{imgIndex + 1}/{SIDEBAR_IMAGES.length}</span>
              <span className="animate-pulse text-lime-vibrant">● CONNECTED</span>
            </div>
          </div>
          <div className="flex-1 bg-black relative overflow-hidden">
            <img
              key={imgIndex}
              src={SIDEBAR_IMAGES[imgIndex].url}
              alt="Cannabis Visual Archive"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 animate-digital-fade"
            />
            {/* Retro UI Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            <div className="absolute top-4 left-4 p-2 bg-black/60 border border-lime-vibrant/30 backdrop-blur-sm">
              <div className="text-[8px] text-lime-vibrant uppercase tracking-tighter">Scan Progress</div>
              <div className="w-16 h-1 bg-lime-vibrant/20 mt-1">
                <div className="h-full bg-lime-vibrant w-3/4 animate-[pulse_2s_infinite]"></div>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-[10px] text-pink-vibrant font-black uppercase mb-1 drop-shadow-lg">Biometric Data Log</div>
              <p className="text-[11px] text-white/90 leading-tight font-bold drop-shadow-md">
                {SIDEBAR_IMAGES[imgIndex].desc}
              </p>
            </div>

            {/* Scanning Line Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-[1px] bg-lime-vibrant/40 absolute top-0 animate-[scan_4s_linear_infinite]"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Stats */}
      <footer className="mt-auto pt-12">
        <div className="directory-box bg-black p-4 stats-bar flex flex-col md:flex-row justify-between items-center text-[10px]">
          <div>
            TOTALS: {totalStats.cultivators} CULTIVATORS / {totalStats.brands} BRANDS / {totalStats.partners} PARTNER_BRANDS
          </div>
          <div>
            CREATED BY WEED-DIRECTORY // (C) 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
