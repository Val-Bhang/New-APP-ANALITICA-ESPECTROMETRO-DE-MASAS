import React from 'react';

interface HeaderProps {
  activeTab: 'explorer' | 'simulator' | 'puzzle' | 'real_model';
  onSelectTab: (tab: 'explorer' | 'simulator' | 'puzzle' | 'real_model') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF7EE]/95 backdrop-blur-md border-b border-[#E8DFCB]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (single text element) */}
        <button
          onClick={() => onSelectTab('explorer')}
          className="text-xl sm:text-2xl font-bold tracking-tight text-[#10242F] whitespace-nowrap shrink-0 text-left cursor-pointer group"
        >
          <span className="text-[#8E3742] group-hover:text-[#742B34] transition-colors">Easy</span>{' '}
          <span>Spectroscopy</span>
        </button>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 sm:gap-8 text-sm font-medium text-[#10242F]">
          <button
            onClick={() => onSelectTab('explorer')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'explorer'
                ? 'text-[#8E3742] font-semibold border-b-2 border-[#8E3742] pb-0.5'
                : 'hover:text-[#8E3742]'
            }`}
          >
            Explorador Anatómico
          </button>
          <button
            onClick={() => onSelectTab('simulator')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'simulator'
                ? 'text-[#8E3742] font-semibold border-b-2 border-[#8E3742] pb-0.5'
                : 'hover:text-[#8E3742]'
            }`}
          >
            Simulador de Haz
          </button>
          <button
            onClick={() => onSelectTab('puzzle')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'puzzle'
                ? 'text-[#8E3742] font-semibold border-b-2 border-[#8E3742] pb-0.5'
                : 'hover:text-[#8E3742]'
            }`}
          >
            Rompecabezas
          </button>
          <button
            onClick={() => onSelectTab('real_model')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'real_model'
                ? 'text-[#8E3742] font-semibold border-b-2 border-[#8E3742] pb-0.5'
                : 'hover:text-[#8E3742]'
            }`}
          >
            Modelo Real
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('simulator')}
            className="px-4 py-2 text-xs font-semibold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            Simulador en Vivo
          </button>
        </div>
      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="flex md:hidden items-center justify-around px-2 py-2 border-t border-[#E8DFCB] text-xs font-medium text-[#10242F] bg-[#FAF7EE]">
        <button
          onClick={() => onSelectTab('explorer')}
          className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'explorer' ? 'text-[#8E3742] font-bold' : ''}`}
        >
          Explorador
        </button>
        <button
          onClick={() => onSelectTab('simulator')}
          className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'simulator' ? 'text-[#8E3742] font-bold' : ''}`}
        >
          Simulador
        </button>
        <button
          onClick={() => onSelectTab('puzzle')}
          className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'puzzle' ? 'text-[#8E3742] font-bold' : ''}`}
        >
          Rompecabezas
        </button>
        <button
          onClick={() => onSelectTab('real_model')}
          className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'real_model' ? 'text-[#8E3742] font-bold' : ''}`}
        >
          Modelo Real
        </button>
      </div>
    </header>
  );
};
