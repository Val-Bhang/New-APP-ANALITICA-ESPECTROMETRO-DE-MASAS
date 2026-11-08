import React, { useState } from 'react';
import { Header } from './components/Header';
import { MachineExplorer } from './components/MachineExplorer';
import { MassSimulator } from './components/MassSimulator';
import { AssemblyPuzzle } from './components/AssemblyPuzzle';
import { ManufacturerShowcase } from './components/ManufacturerShowcase';
import { 
  Compass, 
  Activity, 
  Puzzle, 
  BookOpen, 
  Building2,
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'simulator' | 'puzzle' | 'real_model'>('explorer');

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-[#122630] flex flex-col font-sans selection:bg-[#EFC4BF] selection:text-[#122630]">
      {/* 3-Zone Top Bar Contract */}
      <Header activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Workspace Mode Bar / Sub-Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB]">
          <div className="flex items-center gap-1.5 overflow-x-auto p-1">
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'explorer'
                  ? 'bg-[#122630] text-[#FAF7EE] shadow-sm'
                  : 'text-[#1C3947] hover:bg-[#EFE8D3]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#EFC4BF]" />
              <span>1. Explorador Anatómico</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'simulator'
                  ? 'bg-[#122630] text-[#FAF7EE] shadow-sm'
                  : 'text-[#1C3947] hover:bg-[#EFE8D3]'
              }`}
            >
              <Activity className="w-4 h-4 text-[#7C957D]" />
              <span>2. Simulador de Haz</span>
            </button>

            <button
              onClick={() => setActiveTab('puzzle')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'puzzle'
                  ? 'bg-[#122630] text-[#FAF7EE] shadow-sm'
                  : 'text-[#1C3947] hover:bg-[#EFE8D3]'
              }`}
            >
              <Puzzle className="w-4 h-4 text-[#8E3742]" />
              <span>3. Rompecabezas Visual</span>
            </button>

            <button
              onClick={() => setActiveTab('real_model')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'real_model'
                  ? 'bg-[#122630] text-[#FAF7EE] shadow-sm'
                  : 'text-[#1C3947] hover:bg-[#EFE8D3]'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#A9C2D2]" />
              <span>4. Modelo Real (Bruker · Shimadzu · Agilent)</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#8E3742] px-3">
            <span>m/z = (e·B²·r²) / (2·V)</span>
          </div>
        </div>

        {/* Tab 1: Giant Machine Vector & Photo Explorer (With integrated theoretical foundation) */}
        {activeTab === 'explorer' && (
          <MachineExplorer onOpenSimulator={() => setActiveTab('simulator')} />
        )}

        {/* Tab 2: Mass Spectrometry Physics Simulator */}
        {activeTab === 'simulator' && <MassSimulator />}

        {/* Tab 3: Assembly Puzzle Challenge with Real Hardware Images */}
        {activeTab === 'puzzle' && (
          <AssemblyPuzzle onOpenSimulator={() => setActiveTab('simulator')} />
        )}

        {/* Tab 4: Real Model & Manufacturer 3D Industrial Cutaways */}
        {activeTab === 'real_model' && <ManufacturerShowcase />}
      </main>

      {/* Elegant Domain-Restrained Footer */}
      <footer className="mt-16 border-t border-[#E2D7BB] bg-[#FAF7EE] text-[#1C3947] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-sm text-[#122630] tracking-tight">
              Easy Spectroscopy
            </div>
            <p className="text-[#1C3947]/70">
              Plataforma didáctica de espectrometría de masas para química analítica y física experimental.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#1C3947]/80">
            <button onClick={() => setActiveTab('explorer')} className="hover:text-[#8E3742] transition-colors cursor-pointer">
              Anatomía de Componentes
            </button>
            <button onClick={() => setActiveTab('simulator')} className="hover:text-[#8E3742] transition-colors cursor-pointer">
              Simulador de Trayectoria
            </button>
            <button onClick={() => setActiveTab('puzzle')} className="hover:text-[#8E3742] transition-colors cursor-pointer">
              Desafío de Ensamble 5★
            </button>
            <button onClick={() => setActiveTab('real_model')} className="hover:text-[#8E3742] transition-colors cursor-pointer">
              Modelo Real (Bruker · Shimadzu · Agilent)
            </button>
          </div>

          <div className="text-center md:text-right font-mono text-[11px] text-[#8E3742]">
            Paleta: Vanilla Cream · Blush Petal · Rosewood · Sage Leaf · Misty Sky · Midnight Lagoon
          </div>
        </div>
      </footer>
    </div>
  );
}
