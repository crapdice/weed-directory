import { useState, useMemo } from 'react';
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

function App() {
  const [searchTerm, setSearchTerm] = useState('');

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
      items: filteredCultivators.filter(c => c.license_type === type)
    }));
  }, [filteredCultivators]);

  const totalStats = {
    cultivators: marketData.cultivators.length,
    brands: new Set(marketData.cultivators.flatMap(c => c.brands)).size,
    partners: marketData.cultivators.flatMap(c => c.brands).filter(b => b.includes('(Partner)')).length
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[1200px] mx-auto px-4 py-2 font-mono selection:bg-hot-pink selection:text-black">
      {/* Header Row */}
      <header className="flex flex-row justify-between items-center border-b border-neo-gray pb-2 mb-2">
        <h1 className="text-2xl font-black text-lime-green leading-none uppercase">
          Illinois Cannabis Directory
        </h1>
        <div className="flex items-center gap-6">
          <Link to="/breeders" className="text-hot-pink text-[10px] hover:underline uppercase font-bold">
            Genetic Archives &gt;&gt;
          </Link>
          <div className="flex gap-2">
            <button className="text-[10px] text-neo-gray hover:text-white uppercase font-bold border border-neo-gray px-2 py-1">Submit Site</button>
            <Link to="/sources" className="text-[10px] text-neo-gray hover:text-white uppercase font-bold border border-neo-gray px-2 py-1">Data Sources</Link>
          </div>
        </div>
      </header>

      {/* Compact Search Bar */}
      <nav className="directory-box h-10 mb-4 flex items-center px-3">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs text-hot-pink font-bold uppercase">Search:</span>
          <input
            type="text"
            className="bg-black border-none text-lime-green px-2 py-0.5 text-xs w-full focus:outline-none"
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
                      className="text-lime-green font-bold text-sm hover:text-hot-pink hover:underline"
                    >
                      {item.name}
                    </Link>
                    <span className="text-neo-gray ml-2">
                      - {Array.isArray(item.facility_location) ? item.facility_location[0] : item.facility_location}, IL
                    </span>
                  </div>

                  <div className="text-white mb-2">
                    <span className="text-neo-gray uppercase font-bold text-[9px] mr-2">Brands:</span>
                    {item.brands.map((brand, bi) => {
                      const isPartner = brand.includes('(Partner)');
                      const cleanBrand = brand.replace(' (Partner)', '');
                      return (
                        <span key={bi}>
                          <span
                            className={`text-[11px] font-bold ${isPartner ? 'text-hot-pink italic cursor-help' : 'text-white'}`}
                            title={isPartner ? `Regulatory Disclosure: Produced by ${item.name}` : undefined}
                          >
                            {cleanBrand}
                          </span>
                          {bi < item.brands.length - 1 && <span className="text-neo-gray mx-1">/</span>}
                        </span>
                      );
                    })}
                  </div>

                  {item.head_grower !== "Not Publicly Listed" && (
                    <div className="text-neo-gray">
                      <span className="uppercase font-bold text-[9px] mr-2">Lead:</span>
                      <span className="text-white/80">{item.head_grower}</span>
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
