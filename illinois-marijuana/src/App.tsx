import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  MapPin,
  Search,
  ChevronRight,
  Info,
  Instagram,
  Sparkles,
  Globe
} from 'lucide-react';
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

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCultivators = useMemo(() => {
    return marketData.cultivators.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.brands.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.head_grower !== "Not Publicly Listed" && c.head_grower.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [searchTerm]);


  return (
    <div className="min-h-screen bg-luxe-midnight text-slate-200 font-sans selection:bg-weird-lime/50">
      {/* Hero Section */}
      <header className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b-8 border-weird-lime/20">
        <div className="absolute inset-0">
          <img
            src="/hero-bg.png"
            alt="Deep Space Resin"
            className="w-full h-full object-cover scale-110 animate-slow-zoom blur-[2px] brightness-50"
          />
          <div className="absolute inset-0 hero-overlay opacity-95" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-6 mb-12">
            <Link to="/breeders" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-trippy-pink/10 border-2 border-trippy-pink/30 text-trippy-pink text-xs font-black uppercase tracking-[0.2em] hover:bg-trippy-pink/20 transition-all group hover:scale-110 hover:-rotate-2">
              <Sparkles size={16} className="group-hover:animate-pulse" />
              <span>Genetic Archives</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <h1 className="text-7xl md:text-9xl font-serif font-black mb-6 gold-gradient-text tracking-tighter leading-[0.85] uppercase">
            Deep <br />
            <span className="italic text-weird-lime">Resin</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed italic opacity-80">
            The 2026 Metaphysical Directory of Illinois Cannabis.
          </p>
          <div className="flex items-center justify-center gap-6 text-weird-lime/50 text-sm font-black uppercase tracking-widest">
            <span className="flex items-center gap-2 border-b border-weird-lime/20 pb-1">Data Hash: {marketData.data_as_of}</span>
          </div>
        </div>
      </header>

      {/* Directory Section */}
      <main className="max-w-7xl mx-auto px-6 py-24 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-b-4 border-weird-lime/10 pb-12">
          <div className="max-w-xl">
            <h2 className="text-5xl font-serif font-black text-white mb-6 italic transform -skew-x-12">The Vault</h2>
            <p className="text-slate-500 text-xl font-light leading-relaxed">
              Industrial giants and boutique wizards. Categorized by lineage, license, and collective energy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-weird-lime/40 group-focus-within:text-weird-lime transition-colors" size={20} />
              <input
                type="text"
                placeholder="Find Your Pulse..."
                className="bg-weird-lime/5 border-2 border-weird-lime/20 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-weird-lime focus:ring-4 focus:ring-weird-lime/10 transition-all w-full sm:w-64 lg:w-96 text-weird-lime font-bold placeholder:text-weird-lime/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-2 gap-8 space-y-8">
          {filteredCultivators.map((cultivator, idx) => (
            <div key={idx} className="break-inside-avoid">
              <CultivatorCard cultivator={cultivator as Cultivator} index={idx} />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-8 border-trippy-pink/10 py-32 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-weird-lime mb-12">
            <Leaf size={64} className="animate-pulse" />
            <div className="text-left">
              <span className="block text-4xl font-serif font-black tracking-tighter uppercase leading-none">Stay</span>
              <span className="block text-4xl font-serif font-black tracking-tighter uppercase leading-none text-trippy-pink">Weird.</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-xs font-black uppercase tracking-[0.3em] text-slate-600">
            <Link to="/sources" className="hover:text-weird-lime transition-colors">Origins</Link>
            <Link to="/breeders" className="hover:text-trippy-pink transition-colors">Archives</Link>
            <p>&copy; 2026 DEEP RESIN OPS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CultivatorCard({ cultivator, index }: { cultivator: Cultivator, index: number }) {
  const isCultivationCenter = cultivator.license_type === 'Cultivation Center';
  const rotation = index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1';

  return (
    <div className={`glass-card rounded-[2rem] overflow-hidden flex flex-col group p-1 ${rotation}`}>
      <div className="p-8 pb-4">
        <div className="flex items-start justify-between mb-8">
          <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border-2 shadow-[2px_2px_0px_white] ${isCultivationCenter
            ? 'bg-weird-lime text-black border-black'
            : 'bg-trippy-pink text-white border-white'
            }`}>
            {cultivator.license_type}
          </div>
          <div className="flex items-center -mr-2">
            {cultivator.social_media?.website && (
              <a href={cultivator.social_media.website} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-weird-lime/40 hover:text-weird-lime transition-all hover:scale-125" title="The Source">
                <Globe size={24} className="filter grayscale group-hover:grayscale-0" />
              </a>
            )}
            {cultivator.social_media?.instagram && (
              <a href={cultivator.social_media.instagram.startsWith('http') ? cultivator.social_media.instagram : `https://instagram.com/${cultivator.social_media.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-weird-lime/40 hover:text-weird-lime transition-all hover:scale-125" title="Visual Feed">
                <Instagram size={24} className="filter grayscale group-hover:grayscale-0" />
              </a>
            )}
            <button className="w-12 h-12 flex items-center justify-center text-trippy-pink/40 hover:text-trippy-pink transition-all hover:scale-125">
              <Sparkles size={24} />
            </button>
          </div>
        </div>

        <h3 className="text-4xl font-serif font-black text-white group-hover:text-weird-lime transition-all mb-2 leading-[0.9] uppercase tracking-tighter">
          {cultivator.name}
        </h3>
        <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-8 opacity-50">
          AUTHORIZED ENTITY_0126
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 text-slate-400 text-sm font-medium italic">
            <MapPin size={18} className="text-weird-lime select-none" />
            <span>{Array.isArray(cultivator.facility_location) ? cultivator.facility_location[0] : cultivator.facility_location} (IL)</span>
          </div>
          {cultivator.head_grower !== "Not Publicly Listed" && (
            <div className="flex items-center gap-4 text-slate-400 text-sm font-medium border-l-2 border-trippy-pink/30 pl-4 py-1">
              <span className="text-trippy-pink font-black text-[10px] uppercase tracking-widest">Architect:</span>
              <span className="text-white">{cultivator.head_grower}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto px-8 pb-8">
        <div className="pt-8 border-t-2 border-white/5">
          <div className="flex flex-wrap gap-3">
            {cultivator.brands.map((brand, i) => {
              const isPartner = brand.includes('(Partner)');
              const cleanBrand = brand.replace(' (Partner)', '');

              return (
                <div key={i} className="group/brand relative">
                  <span
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-default flex items-center gap-2 ${isPartner
                      ? 'qc-stamp'
                      : 'bg-white/5 border border-white/10 text-slate-400 hover:border-weird-lime hover:text-weird-lime'
                      }`}
                  >
                    {cleanBrand}
                    {isPartner && <Info size={12} />}
                  </span>
                  {isPartner && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 p-6 bg-luxe-midnight border-2 border-weird-lime rounded-3xl text-[12px] text-slate-200 shadow-[20px_20px_60px_rgba(0,0,0,1)] opacity-0 group-hover/brand:opacity-100 transition-all duration-300 pointer-events-auto z-50 translate-y-4 group-hover/brand:translate-y-0 backdrop-blur-3xl">
                      <div className="font-black text-weird-lime uppercase tracking-[0.3em] mb-3 text-[10px] flex items-center justify-between">
                        <span>QC_PASSED_1975</span>
                        <div className="h-2 w-2 rounded-full bg-weird-lime animate-pulse" />
                      </div>
                      <p className="mb-4 leading-relaxed italic font-light">"This frequency is broadcasted via <span className="text-weird-lime font-bold">{cultivator.name}</span> under official 2026 partner protocols."</p>
                      <Link to="/sources" className="flex items-center gap-2 text-trippy-pink hover:text-white transition-colors pt-4 border-t border-white/10 font-black uppercase text-[10px] tracking-widest">
                        Protocol Intelligence <ChevronRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
