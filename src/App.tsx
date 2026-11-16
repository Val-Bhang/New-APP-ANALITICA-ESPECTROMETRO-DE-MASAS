import React, { useState } from 'react';
import { Header } from './components/Header';
import { MachineExplorer } from './components/MachineExplorer';
import { MassSimulator } from './components/MassSimulator';
import { AssemblyPuzzle } from './components/AssemblyPuzzle';
import { ManufacturerShowcase } from './components/ManufacturerShowcase';
import { UvVisExplorer } from './components/UvVisExplorer';
import { UvVisSimulator } from './components/UvVisSimulator';
import { UvVisPuzzle } from './components/UvVisPuzzle';
import { HplcExplorer } from './components/HplcExplorer';
import { HplcSimulator } from './components/HplcSimulator';
import { HplcPuzzle } from './components/HplcPuzzle';
import { FtirExplorer } from './components/FtirExplorer';
import { FtirSimulator } from './components/FtirSimulator';
import { FtirPuzzle } from './components/FtirPuzzle';
import { NmrExplorer } from './components/NmrExplorer';
import { NmrSimulator } from './components/NmrSimulator';
import { NmrPuzzle } from './components/NmrPuzzle';
import { GcExplorer } from './components/GcExplorer';
import { GcSimulator } from './components/GcSimulator';
import { GcPuzzle } from './components/GcPuzzle';
import { InstrumentAssemblyTimelapse } from './components/InstrumentAssemblyTimelapse';
import {
  Compass,
  Activity,
  Puzzle,
  Building2,
  Atom,
  Sun,
  FlaskConical,
  Waves,
  Magnet,
  Wind,
  Wrench
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'simulator' | 'assembly' | 'puzzle' | 'real_model'>('explorer');
  const [instrument, setInstrument] = useState<'ms' | 'uvvis' | 'hplc' | 'ftir' | 'nmr' | 'gc'>('ms');

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-[#122630] flex flex-col font-sans selection:bg-[#EFC4BF] selection:text-[#122630]">
      {/* 3-Zone Top Bar Contract */}
      <Header activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Instrument Switcher Bar (Masas vs UV-Vis vs HPLC) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 bg-[#122630] text-[#FAF7EE] rounded-2xl border border-[#1C3947] shadow-sm">
          <div className="flex items-center gap-2.5 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EFC4BF] animate-pulse shrink-0" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#A9C2D2]">
                Instrumento Activo en Easy Spectroscopy
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#FAF7EE]">
                {instrument === 'ms'
                  ? 'Espectrómetro de Masas (EI-MS · Cuadrupolo / Sector)'
                  : instrument === 'uvvis'
                  ? 'Espectrofotómetro UV-Vis (Doble Haz · Czerny-Turner)'
                  : instrument === 'hplc'
                  ? 'Cromatógrafo Líquido HPLC / UHPLC (Fase Reversa C18 · 1,300 bar)'
                  : instrument === 'ftir'
                  ? 'Espectrómetro Infrarrojo Medio FTIR (Michelson · ATR Diamante)'
                  : instrument === 'nmr'
                  ? 'Espectrómetro de Resonancia Magnética Nuclear (RMN · ¹H · Superconductor)'
                  : 'Cromatógrafo de Gases Capilar GC (EPC · Split/Splitless · FID/TCD)'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0C1A22] rounded-xl border border-[#1C3947] self-start lg:self-auto">
            <button
              onClick={() => setInstrument('ms')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                instrument === 'ms'
                  ? 'bg-[#8E3742] text-[#FAF7EE] shadow-sm'
                  : 'text-[#A9C2D2] hover:text-[#FAF7EE] hover:bg-[#1C3947]'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>Espectrometría de Masas (MS)</span>
            </button>
            <button
              onClick={() => setInstrument('uvvis')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                instrument === 'uvvis'
                  ? 'bg-[#8E3742] text-[#FAF7EE] shadow-sm'
                  : 'text-[#A9C2D2] hover:text-[#FAF7EE] hover:bg-[#1C3947]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Espectrofotometría UV-Vis</span>
            </button>
            <button
              onClick={() => setInstrument('hplc')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                instrument === 'hplc'
                  ? 'bg-[#8E3742] text-[#FAF7EE] shadow-sm'
                  : 'text-[#A9C2D2] hover:text-[#FAF7EE] hover:bg-[#1C3947]'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Cromatografía Líquida (HPLC)</span>
            </button>
            <button
              onClick={() => setInstrument('ftir')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                instrument === 'ftir'
                  ? 'bg-[#8E3742] text-[#FAF7EE] shadow-sm'
                  : 'text-[#A9C2D2] hover:text-[#FAF7EE] hover:bg-[#1C3947]'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Infrarrojo Medio (FTIR)</span>
            </button>
            <button
              onClick={() => setInstrument('nmr')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                instrument === 'nmr'
                  ? 'bg-[#8E3742] text-[#FAF7EE] shadow-sm'
                  : 'text-[#A9C2D2] hover:text-[#FAF7EE] hover:bg-[#1C3947]'
              }`}
            >
              <Magnet className="w-3.5 h-3.5" />
              <span>Resonancia Magnética (RMN)</span>
            </button>
            <button
              onClick={() => setInstrument('gc')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                instrument === 'gc'
                  ? 'bg-[#8E3742] text-[#FAF7EE] shadow-sm'
                  : 'text-[#A9C2D2] hover:text-[#FAF7EE] hover:bg-[#1C3947]'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Cromatografía de Gases (GC)</span>
            </button>
          </div>
        </div>

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
              <span>
                {instrument === 'hplc'
                  ? '2. Simulador de Flujo HPLC'
                  : instrument === 'nmr'
                  ? '2. Simulador de Haz RMN'
                  : instrument === 'gc'
                  ? '2. Simulador de Haz GC'
                  : '2. Simulador de Haz'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('assembly')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'assembly'
                  ? 'bg-[#122630] text-[#FAF7EE] shadow-sm'
                  : 'text-[#1C3947] hover:bg-[#EFE8D3]'
              }`}
            >
              <Wrench className="w-4 h-4 text-[#EFC4BF]" />
              <span>3. Ensamble 3D Paso a Paso</span>
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
              <span>4. Rompecabezas Visual</span>
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
              <span>5. Modelo Real (Bruker · Shimadzu · Agilent)</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#8E3742] px-3">
            <span>
              {instrument === 'ms'
                ? 'm/z = (e·B²·r²) / (2·V)'
                : instrument === 'uvvis'
                ? 'A = ε · b · c'
                : instrument === 'hplc'
                ? 'Rₛ = ¼((α-1)/α)·√N·(k/(1+k))'
                : instrument === 'ftir'
                ? 'ν̃ = (1/2πc)·√(k/μ) · I(δ) ⇄ B(ν̃)'
                : instrument === 'nmr'
                ? 'ν₀ = (γ/2π)·B₀ · δ = ((ν−ν_TMS)/ν₀)×10⁶'
                : 'H = B/ū + (C_g+C_s)·ū · RI = 100·[n + Δt/Δt_n]'}
            </span>
          </div>
        </div>

        {/* Tab 1: Giant Machine Explorer */}
        {activeTab === 'explorer' &&
          (instrument === 'ms' ? (
            <MachineExplorer onOpenSimulator={() => setActiveTab('simulator')} />
          ) : instrument === 'uvvis' ? (
            <UvVisExplorer onOpenSimulator={() => setActiveTab('simulator')} />
          ) : instrument === 'hplc' ? (
            <HplcExplorer onOpenSimulator={() => setActiveTab('simulator')} />
          ) : instrument === 'ftir' ? (
            <FtirExplorer onOpenSimulator={() => setActiveTab('simulator')} />
          ) : instrument === 'nmr' ? (
            <NmrExplorer onOpenSimulator={() => setActiveTab('simulator')} />
          ) : (
            <GcExplorer onOpenSimulator={() => setActiveTab('simulator')} />
          ))}

        {/* Tab 2: Physics / Optical / Chromatographic / NMR / GC Simulator */}
        {activeTab === 'simulator' &&
          (instrument === 'ms' ? (
            <MassSimulator />
          ) : instrument === 'uvvis' ? (
            <UvVisSimulator />
          ) : instrument === 'hplc' ? (
            <HplcSimulator />
          ) : instrument === 'ftir' ? (
            <FtirSimulator />
          ) : instrument === 'nmr' ? (
            <NmrSimulator />
          ) : (
            <GcSimulator />
          ))}

        {/* Tab 3: Step-by-Step 3D Mechanical Assembly Timelapse */}
        {activeTab === 'assembly' && (
          <InstrumentAssemblyTimelapse
            instrument={instrument}
            onOpenSimulator={() => setActiveTab('simulator')}
          />
        )}

        {/* Tab 4: Assembly Puzzle Challenge with Real Hardware Images */}
        {activeTab === 'puzzle' &&
          (instrument === 'ms' ? (
            <AssemblyPuzzle onOpenSimulator={() => setActiveTab('simulator')} />
          ) : instrument === 'uvvis' ? (
            <UvVisPuzzle onOpenSimulator={() => setActiveTab('simulator')} />
          ) : instrument === 'hplc' ? (
            <HplcPuzzle onOpenSimulator={() => setActiveTab('simulator')} />
          ) : instrument === 'ftir' ? (
            <FtirPuzzle onOpenSimulator={() => setActiveTab('simulator')} />
          ) : instrument === 'nmr' ? (
            <NmrPuzzle onOpenSimulator={() => setActiveTab('simulator')} />
          ) : (
            <GcPuzzle onOpenSimulator={() => setActiveTab('simulator')} />
          ))}

        {/* Tab 5: Real Model & Manufacturer 3D Industrial Cutaways */}
        {activeTab === 'real_model' && <ManufacturerShowcase instrument={instrument} />}
      </main>

      {/* Elegant Domain-Restrained Footer */}
      <footer className="mt-16 border-t border-[#E2D7BB] bg-[#FAF7EE] text-[#1C3947] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-sm text-[#122630] tracking-tight">
              Easy Spectroscopy
            </div>
            <p className="text-[#1C3947]/70">
              Plataforma didáctica de espectrometría de masas, UV-Vis, HPLC, FTIR, resonancia magnética nuclear RMN y cromatografía de gases GC.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#1C3947]/80">
            <button onClick={() => setActiveTab('explorer')} className="hover:text-[#8E3742] transition-colors cursor-pointer">
              Anatomía de Componentes
            </button>
            <button onClick={() => setActiveTab('simulator')} className="hover:text-[#8E3742] transition-colors cursor-pointer">
              Simulador de Haz
            </button>
            <button onClick={() => setActiveTab('assembly')} className="hover:text-[#8E3742] transition-colors cursor-pointer">
              Ensamble 3D Paso a Paso
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

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-[#E2D7BB]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#122630]">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#8E3742] block">
              Creadoras:
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 font-medium text-[#122630]">
              <span>Valery Gutierrez Blanco</span>
              <span aria-hidden="true" className="text-[#8E3742]">·</span>
              <span>Andrea Guanipa Delgado</span>
              <span aria-hidden="true" className="text-[#8E3742]">·</span>
              <span>Valerie Estrada Antequera</span>
            </div>
          </div>
          <div className="text-center sm:text-right font-semibold text-[#1C3947]">
            Universidad del Atlantico
          </div>
        </div>
      </footer>
    </div>
  );
}

