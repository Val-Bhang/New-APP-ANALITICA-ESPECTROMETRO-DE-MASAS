import React, { useState, useEffect } from 'react';
import { UVVIS_PARTS } from '../data/uvVisData';
import { UvVisPartMicroAnimation } from './UvVisPartMicroAnimation';
import { IMAGES } from '../assets/images';
import {
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Compass,
  Info,
  BookOpen,
  Zap,
  Maximize2,
  CheckCircle2,
  Columns,
  Square
} from 'lucide-react';

interface UvVisExplorerProps {
  onOpenSimulator: () => void;
}

export const UvVisExplorer: React.FC<UvVisExplorerProps> = ({ onOpenSimulator }) => {
  const [selectedPartId, setSelectedPartId] = useState<string | null>('monochromator');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'photo' | 'vector'>('photo');
  const [isPanoramic, setIsPanoramic] = useState<boolean>(true);
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

  const selectedPart = UVVIS_PARTS.find((p) => p.id === selectedPartId) || null;

  const handleSelectPart = (partId: string) => {
    setSelectedPartId(partId);
    const part = UVVIS_PARTS.find((p) => p.id === partId);
    if (part && viewMode === 'vector') {
      const scale = part.svgRegion.zoomLevel;
      setZoomScale(scale);
      const targetX = 500 - part.svgRegion.cx * scale;
      const targetY = 300 - part.svgRegion.cy * scale;
      setPanOffset({ x: targetX, y: targetY });
    }
  };

  const handleResetView = () => {
    setSelectedPartId(null);
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleNextPart = () => {
    const currentIndex = UVVIS_PARTS.findIndex((p) => p.id === selectedPartId);
    const nextIndex = (currentIndex + 1) % UVVIS_PARTS.length;
    handleSelectPart(UVVIS_PARTS[nextIndex].id);
  };

  const handlePrevPart = () => {
    const currentIndex = UVVIS_PARTS.findIndex((p) => p.id === selectedPartId);
    const prevIndex = (currentIndex - 1 + UVVIS_PARTS.length) % UVVIS_PARTS.length;
    handleSelectPart(UVVIS_PARTS[prevIndex].id);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextPart();
      if (e.key === 'ArrowLeft') handlePrevPart();
      if (e.key === 'Escape') {
        if (isFullscreenModal) setIsFullscreenModal(false);
        else handleResetView();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedPartId, isFullscreenModal]);

  const PHOTO_PINS = [
    { id: 'lamps', label: '1. Fuentes D₂ y W', short: '1. Lámparas D₂/W', x: 24, y: 41 },
    { id: 'entrance_slit', label: '2. Rendija Colimadora', short: '2. Rendija SBW', x: 37, y: 54 },
    { id: 'monochromator', label: '3. Monocromador Czerny-Turner', short: '3. Monocromador', x: 47, y: 42 },
    { id: 'chopper', label: '4. Chopper Doble Haz', short: '4. Chopper I₀/I', x: 59, y: 55 },
    { id: 'cuvettes', label: '5. Cubetas de Cuarzo 1 cm', short: '5. Cubetas Cuarzo', x: 70, y: 65 },
    { id: 'detector', label: '6. Detector PMT / PDA', short: '6. Detector PMT', x: 84, y: 40 },
    { id: 'datasystem', label: '7. Espectro Electrónico', short: '7. Datos & Beer', x: 72, y: 20 },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Subheader and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Explorador Anatómico UV-Vis</span>
            <span aria-hidden="true">·</span>
            <span>Óptica de Doble Haz &amp; Ley de Beer-Lambert</span>
            <span aria-hidden="true">·</span>
            <span>Estándares Agilent · Shimadzu · Bruker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Anatomía del Espectrofotómetro UV-Vis
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Recorre el tren óptico completo desde las lámparas de Deuterio y Tungsteno hasta el fotomultiplicador. Haz clic en cualquier módulo para hacer zoom, interactuar con su micro-simulación y comprender su física cuántica y óptica.
          </p>
        </div>

        {/* View mode toggle and quick controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1 p-1 bg-[#FAF7EE] rounded-xl border border-[#E2D7BB]">
            <button
              onClick={() => setViewMode('photo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === 'photo'
                  ? 'bg-[#8E3742] text-[#FAF7EE] shadow-sm'
                  : 'text-[#1C3947] hover:text-[#8E3742]'
              }`}
            >
              Corte Ultra 3D (Modelo Real)
            </button>
            <button
              onClick={() => {
                setViewMode('vector');
                if (selectedPart) {
                  const scale = selectedPart.svgRegion.zoomLevel;
                  setZoomScale(scale);
                  setPanOffset({
                    x: 500 - selectedPart.svgRegion.cx * scale,
                    y: 300 - selectedPart.svgRegion.cy * scale,
                  });
                }
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === 'vector'
                  ? 'bg-[#122630] text-[#FAF7EE] shadow-sm'
                  : 'text-[#1C3947] hover:text-[#122630]'
              }`}
            >
              Esquema Interactivo
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 p-1 bg-[#FAF7EE] rounded-xl border border-[#E2D7BB]">
            <button
              onClick={() => setIsPanoramic(true)}
              title="Vista Panorámica (la máquina ocupa todo el ancho)"
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                isPanoramic
                  ? 'bg-[#122630] text-[#FAF7EE] shadow-sm'
                  : 'text-[#1C3947] hover:bg-[#EFE8D3]'
              }`}
            >
              <Square className="w-3.5 h-3.5 text-[#EFC4BF]" />
              <span>Panorámica</span>
            </button>
            <button
              onClick={() => setIsPanoramic(false)}
              title="Vista Dividida (máquina y explicación lado a lado)"
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                !isPanoramic
                  ? 'bg-[#122630] text-[#FAF7EE] shadow-sm'
                  : 'text-[#1C3947] hover:bg-[#EFE8D3]'
              }`}
            >
              <Columns className="w-3.5 h-3.5 text-[#7C957D]" />
              <span>Dividida</span>
            </button>
          </div>

          <button
            onClick={handleResetView}
            className="px-3 py-1.5 text-xs font-medium text-[#122630] bg-[#FAF7EE] hover:bg-[#EFE8D3] border border-[#E2D7BB] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Ver equipo completo"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8E3742]" />
            <span className="hidden sm:inline">Vista General</span>
          </button>

          <button
            onClick={() => {
              if (!selectedPartId) handleSelectPart('lamps');
              else handleNextPart();
            }}
            className="px-3.5 py-1.5 text-xs font-medium text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{selectedPartId ? 'Siguiente Parte' : 'Iniciar Recorrido'}</span>
          </button>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className={isPanoramic ? 'space-y-6' : 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'}>
        {/* Machine Viewport */}
        <div
          className={`${
            isPanoramic ? 'w-full' : 'lg:col-span-7'
          } bg-[#0C1A22] rounded-2xl border border-[#1C3947] p-3 shadow-xl relative overflow-hidden flex flex-col`}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#1C3947]/80 text-xs font-mono text-[#A9C2D2]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C957D] animate-pulse" />
              <span className="font-semibold tracking-wide text-[#FAF7EE]">
                {viewMode === 'photo'
                  ? 'MODELO REAL 3D: ESPECTROFOTÓMETRO UV-VIS DOBLE HAZ (CZERNY-TURNER)'
                  : 'ESQUEMA ÓPTICO DINÁMICO: DISPERSIÓN HOLOGRÁFICA Y DOBLE HAZ I₀ / I'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#A9C2D2] hidden sm:inline">
                {selectedPart ? selectedPart.name : 'Vista Panorámica Completa'}
              </span>
              <button
                onClick={() => setIsFullscreenModal(true)}
                className="text-[#A9C2D2] hover:text-[#FAF7EE] transition-colors p-1 rounded cursor-pointer"
                title="Ampliar a pantalla completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className={`relative w-full ${
              isPanoramic ? 'h-[460px] sm:h-[540px] lg:h-[620px]' : 'h-[400px] sm:h-[460px]'
            } overflow-hidden rounded-xl bg-[#081218] select-none transition-all duration-300`}
          >
            {viewMode === 'photo' ? (
              <div className="relative w-full h-full bg-[#0C1A22] group">
                <img
                  src={IMAGES.uvvisCutawayUltra3d}
                  alt="Corte Transversal 3D Espectrofotómetro UV-Vis de Doble Haz"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {PHOTO_PINS.map((pin) => {
                  const isSelected = selectedPartId === pin.id;
                  return (
                    <button
                      key={pin.id}
                      onClick={() => handleSelectPart(pin.id)}
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-xl z-20 ${
                        isSelected
                          ? 'bg-[#8E3742] text-[#FAF7EE] border-[#EFC4BF] scale-110 ring-4 ring-[#8E3742]/60 animate-pulse'
                          : 'bg-[#122630]/90 text-[#FAF7EE] border-[#A9C2D2] hover:bg-[#8E3742] hover:scale-105 backdrop-blur-sm'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#FAF7EE]' : 'bg-[#7C957D]'}`} />
                      <span className="whitespace-nowrap">{pin.short}</span>
                    </button>
                  );
                })}

                <div className="absolute bottom-14 left-3 bg-[#122630]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#1C3947] text-[11px] font-mono text-[#FAF7EE] space-y-1 hidden sm:block pointer-events-none">
                  <div className="text-[#EFC4BF] font-bold">BANCADA ÓPTICA HERMÉTICA DOBLE HAZ</div>
                  <div className="text-[#A9C2D2] text-[10px]">190–1100 nm · Conmutación 340 nm · Celdas Cuarzo 1.000 cm</div>
                </div>
              </div>
            ) : (
              <svg
                viewBox="0 0 1050 600"
                className="w-full h-full cursor-crosshair transition-transform duration-700 ease-out"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                  transformOrigin: '0 0',
                }}
              >
                <defs>
                  <linearGradient id="uvChassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1C3947" />
                    <stop offset="100%" stopColor="#122630" />
                  </linearGradient>
                  <linearGradient id="rainbowFanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="25%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="75%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                  <filter id="uvGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <pattern id="uvGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162E3B" strokeWidth="0.7" />
                </pattern>
                <rect width="1050" height="600" fill="url(#uvGridPattern)" opacity="0.6" />

                {/* Optical Bench Enclosure */}
                <rect x="40" y="70" width="970" height="460" rx="20" fill="url(#uvChassisGrad)" stroke="#1C3947" strokeWidth="2" />
                <rect x="60" y="490" width="930" height="24" rx="4" fill="#0C1A22" />

                {/* 1. LAMPS D2 & W */}
                <g
                  id="uvvis-lamps"
                  onClick={() => handleSelectPart('lamps')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'lamps' ? 0.45 : 1}
                >
                  <rect x="65" y="120" width="125" height="155" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'lamps' ? 3.5 : 1.5} />
                  {/* Deuterium UV lamp */}
                  <circle cx="105" cy="160" r="22" fill="#6D28D9" fillOpacity="0.35" stroke="#C4B5FD" strokeWidth="2.5" filter="url(#uvGlow)" />
                  <text x="95" y="164" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">D₂</text>
                  {/* Tungsten Vis lamp */}
                  <circle cx="105" cy="232" r="22" fill="#D97706" fillOpacity="0.35" stroke="#FCD34D" strokeWidth="2.5" filter="url(#uvGlow)" />
                  <text x="98" y="236" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">W</text>
                  {/* Switching mirror */}
                  <line x1="158" y1="175" x2="174" y2="215" stroke="#A9C2D2" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 127 160 L 166 195 L 245 195" fill="none" stroke="#C4B5FD" strokeWidth="3" />
                  <path d="M 127 232 L 166 195" fill="none" stroke="#FCD34D" strokeWidth="2" strokeDasharray="4,3" />
                  <text x="72" y="295" fill="#EFC4BF" fontSize="11" fontFamily="monospace" fontWeight="bold">1. FUENTES D₂ / W</text>
                </g>

                {/* 2. ENTRANCE SLIT & COLLIMATOR */}
                <g
                  id="uvvis-slit"
                  onClick={() => handleSelectPart('entrance_slit')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'entrance_slit' ? 0.45 : 1}
                >
                  <rect x="242" y="140" width="10" height="46" fill="#7696AA" stroke="#FAF7EE" strokeWidth="1" />
                  <rect x="242" y="204" width="10" height="46" fill="#7696AA" stroke="#FAF7EE" strokeWidth="1" />
                  <path d="M 295 145 Q 318 195 295 245" fill="none" stroke="#A9C2D2" strokeWidth="6" strokeLinecap="round" />
                  <line x1="252" y1="195" x2="305" y2="195" stroke="#FAF7EE" strokeWidth="4" />
                  <text x="218" y="268" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">2. RENDIJA SBW</text>
                  <text x="225" y="282" fill="#A9C2D2" fontSize="9" fontFamily="monospace">Colimador M1</text>
                </g>

                {/* 3. MONOCHROMATOR CZERNY-TURNER */}
                <g
                  id="uvvis-monochromator"
                  onClick={() => handleSelectPart('monochromator')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'monochromator' ? 0.45 : 1}
                >
                  <rect x="330" y="120" width="165" height="155" rx="10" fill="#0C1A22" stroke="#EFC4BF" strokeWidth={selectedPartId === 'monochromator' ? 3.5 : 1.5} />
                  {/* Incident beam M1 -> Grating */}
                  <line x1="305" y1="195" x2="395" y2="165" stroke="#FAF7EE" strokeWidth="3.5" />
                  {/* Holographic grating */}
                  <rect x="385" y="138" width="22" height="54" rx="3" transform="rotate(-18 396 165)" fill="#8E3742" stroke="#EFC4BF" strokeWidth="2" />
                  {/* Dispersed rainbow fan */}
                  <polygon points="402,165 468,145 468,235" fill="url(#rainbowFanGrad)" opacity="0.72" />
                  {/* Focusing mirror M2 & exit slit */}
                  <path d="M 465 145 Q 485 195 465 245" fill="none" stroke="#A9C2D2" strokeWidth="5" />
                  <line x1="468" y1="195" x2="545" y2="220" stroke="#10B981" strokeWidth="4" filter="url(#uvGlow)" />
                  <text x="342" y="295" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">3. MONOCROMADOR</text>
                  <text x="345" y="309" fill="#EFC4BF" fontSize="9" fontFamily="monospace">nλ = d(sin α + sin β)</text>
                </g>

                {/* 4. CHOPPER DOUBLE BEAM */}
                <g
                  id="uvvis-chopper"
                  onClick={() => handleSelectPart('chopper')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'chopper' ? 0.45 : 1}
                >
                  <circle cx="560" cy="220" r="38" fill="#122630" stroke="#EFC4BF" strokeWidth={selectedPartId === 'chopper' ? 3.5 : 2} />
                  <path d="M 560 220 L 560 182 A 38 38 0 0 1 598 220 Z" fill="#8E3742" opacity="0.85" />
                  <path d="M 560 220 L 560 258 A 38 38 0 0 1 522 220 Z" fill="#7C957D" opacity="0.85" />
                  {/* Reference Beam (top) */}
                  <line x1="595" y1="205" x2="665" y2="175" stroke="#7C957D" strokeWidth="3.5" />
                  {/* Sample Beam (bottom) */}
                  <line x1="595" y1="232" x2="665" y2="295" stroke="#EFC4BF" strokeWidth="3.5" />
                  <text x="515" y="280" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">4. CHOPPER</text>
                  <text x="515" y="294" fill="#A9C2D2" fontSize="9" fontFamily="monospace">Doble Haz I₀ / I</text>
                </g>

                {/* 5. QUARTZ CUVETTES */}
                <g
                  id="uvvis-cuvettes"
                  onClick={() => handleSelectPart('cuvettes')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'cuvettes' ? 0.45 : 1}
                >
                  <rect x="655" y="135" width="125" height="220" rx="10" fill="#081218" stroke="#7696AA" strokeWidth={selectedPartId === 'cuvettes' ? 3.5 : 1.5} />
                  {/* Reference Cuvette */}
                  <rect x="688" y="150" width="52" height="58" rx="4" fill="#A9C2D2" fillOpacity="0.22" stroke="#7C957D" strokeWidth="2.5" />
                  <line x1="665" y1="175" x2="805" y2="175" stroke="#7C957D" strokeWidth="3.5" />
                  <text x="678" y="222" fill="#7C957D" fontSize="9" fontFamily="monospace" fontWeight="bold">Blanco I₀ (1 cm)</text>

                  {/* Sample Cuvette */}
                  <rect x="688" y="266" width="52" height="58" rx="4" fill="#8E3742" fillOpacity="0.65" stroke="#EFC4BF" strokeWidth="2.5" />
                  <line x1="665" y1="295" x2="688" y2="295" stroke="#EFC4BF" strokeWidth="3.5" />
                  <line x1="740" y1="295" x2="805" y2="295" stroke="#EFC4BF" strokeWidth="2" strokeOpacity="0.65" />
                  <text x="676" y="340" fill="#EFC4BF" fontSize="9" fontFamily="monospace" fontWeight="bold">Muestra I (Cuarzo)</text>
                  <text x="656" y="375" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">5. CUBETAS CUARZO</text>
                </g>

                {/* 6. PMT / PDA DETECTOR */}
                <g
                  id="uvvis-detector"
                  onClick={() => handleSelectPart('detector')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'detector' ? 0.45 : 1}
                >
                  <line x1="805" y1="175" x2="840" y2="200" stroke="#7C957D" strokeWidth="3" />
                  <line x1="805" y1="295" x2="840" y2="215" stroke="#EFC4BF" strokeWidth="2.5" />
                  <rect x="835" y="150" width="90" height="110" rx="10" fill="#122630" stroke="#EFC4BF" strokeWidth={selectedPartId === 'detector' ? 3.5 : 1.5} />
                  <rect x="844" y="165" width="8" height="80" fill="#8E3742" />
                  <circle cx="872" cy="182" r="4" fill="#EFC4BF" />
                  <circle cx="892" cy="205" r="4" fill="#EFC4BF" />
                  <circle cx="872" cy="228" r="4" fill="#EFC4BF" />
                  <circle cx="905" cy="235" r="4" fill="#7C957D" />
                  <text x="834" y="138" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">6. DETECTOR PMT</text>
                </g>

                {/* 7. DATA SYSTEM */}
                <g
                  id="uvvis-datasystem"
                  onClick={() => handleSelectPart('datasystem')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'datasystem' ? 0.45 : 1}
                >
                  <line x1="880" y1="260" x2="880" y2="320" stroke="#7C957D" strokeWidth="2.5" strokeDasharray="4,3" />
                  <rect x="815" y="320" width="145" height="110" rx="8" fill="#122630" stroke="#7696AA" strokeWidth={selectedPartId === 'datasystem' ? 3.5 : 1.5} />
                  <rect x="826" y="332" width="123" height="72" rx="4" fill="#081218" stroke="#1C3947" />
                  {/* Smooth UV-Vis Gaussian absorbance curve */}
                  <path
                    d="M 832 396 C 855 395, 868 345, 882 345 C 896 345, 905 385, 920 375 C 930 368, 938 395, 944 396"
                    fill="none"
                    stroke="#EFC4BF"
                    strokeWidth="2.5"
                    filter="url(#uvGlow)"
                  />
                  <text x="815" y="452" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">7. ESPECTRO A(λ)</text>
                  <text x="825" y="467" fill="#7C957D" fontSize="9" fontFamily="monospace">A = ε · b · c</text>
                </g>

                {selectedPart && (
                  <rect
                    x={selectedPart.svgRegion.cx - selectedPart.svgRegion.width / 2}
                    y={selectedPart.svgRegion.cy - selectedPart.svgRegion.height / 2}
                    width={selectedPart.svgRegion.width}
                    height={selectedPart.svgRegion.height}
                    rx="12"
                    fill="none"
                    stroke="#EFC4BF"
                    strokeWidth="3.5"
                    strokeDasharray="8,6"
                    filter="url(#uvGlow)"
                    className="animate-pulse"
                  />
                )}
              </svg>
            )}

            {/* Quick Part Carousel */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 overflow-x-auto p-1.5 bg-[#122630]/90 backdrop-blur-md rounded-xl border border-[#1C3947] z-20">
              {UVVIS_PARTS.map((part, idx) => {
                const isSelected = selectedPartId === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => handleSelectPart(part.id)}
                    className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 font-medium ${
                      isSelected
                        ? 'bg-[#8E3742] text-[#FAF7EE] shadow-md font-bold'
                        : 'text-[#A9C2D2] hover:text-[#FAF7EE] hover:bg-[#1C3947]'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-80">{idx + 1}.</span>
                    <span>{part.name.split('. ')[1] || part.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#A9C2D2] pt-2 px-1">
            <span>Usa las flechas (← / →) para recorrer el tren óptico o Esc para restablecer vista.</span>
            <button
              onClick={onOpenSimulator}
              className="text-[#EFC4BF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Abrir en Simulador UV-Vis</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Part Explanation & Deep Theoretical Foundation Deck */}
        <div
          className={`${
            isPanoramic ? 'w-full' : 'lg:col-span-5'
          } bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-6 shadow-md space-y-6`}
        >
          {selectedPart ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8E3742]">
                    <span className="font-semibold uppercase tracking-wider">{selectedPart.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-bold">Etapa {UVVIS_PARTS.findIndex((p) => p.id === selectedPart.id) + 1} de 7</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#7C957D] font-bold">★ Fundamento Óptico-Cuántico Integrado</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#122630] mt-1">
                    {selectedPart.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#7C957D]">
                    {selectedPart.shortRole}
                  </p>
                </div>

                <div className="p-2.5 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] text-xs font-mono text-[#8E3742] max-w-xs">
                  <span className="font-bold">Ingeniería Real: </span>
                  <span className="text-[#122630] text-[11px]">{selectedPart.manufacturerInspiration}</span>
                </div>
              </div>

              <div className={`grid grid-cols-1 ${isPanoramic ? 'lg:grid-cols-12 gap-6' : 'gap-5'}`}>
                <div className={`${isPanoramic ? 'lg:col-span-6' : 'space-y-4'} space-y-4`}>
                  <div className="p-4 bg-[#FAF7EE] rounded-xl border border-[#E2D7BB] space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E3742] flex items-center gap-1.5">
                      <Info className="w-4 h-4" />
                      ¿Qué es y qué hace en el equipo?
                    </h4>
                    <p className="text-xs sm:text-sm text-[#122630] leading-relaxed">
                      {selectedPart.whatItIs} {selectedPart.whatItDoes}
                    </p>
                  </div>

                  <div className="p-4 bg-[#F2F6F2] rounded-xl border border-[#DFE8DF] space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C957D] flex items-center gap-1.5">
                      <Zap className="w-4 h-4" />
                      ¿Por qué es indispensable? (Motivo físico)
                    </h4>
                    <p className="text-xs sm:text-sm text-[#1C3947] leading-relaxed">
                      {selectedPart.whyItDoesIt}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#8E3742] font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Micro-Simulación Óptica en Tiempo Real:
                      </span>
                    </div>
                    <UvVisPartMicroAnimation type={selectedPart.interactiveSimulationType} />
                  </div>
                </div>

                <div className={`${isPanoramic ? 'lg:col-span-6' : 'space-y-4'} space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E2D7BB]`}>
                  <div className="bg-[#122630] rounded-xl p-4 text-[#FAF7EE] space-y-3 border border-[#1C3947] shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#1C3947] pb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#EFC4BF] flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        Fundamento Físico-Matemático Riguroso
                      </h4>
                      <span className="text-[10px] font-mono text-[#7C957D]">
                        Óptica &amp; Cuántica
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#FAF7EE]">
                      {selectedPart.theoreticalReasoning.headline}
                    </p>

                    <ul className="space-y-1.5 text-xs text-[#A9C2D2]">
                      {selectedPart.theoreticalReasoning.physicsPrinciples.map((principle, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#7C957D] shrink-0 mt-0.5" />
                          <span className="leading-snug">{principle}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-2.5 pt-2">
                      {selectedPart.theoreticalReasoning.equations.map((eq, idx) => (
                        <div key={idx} className="bg-[#0C1A22] rounded-lg p-3 border border-[#1C3947]">
                          <div className="text-center py-1 border-b border-[#1C3947]/60 mb-2">
                            <span className="font-mono text-sm sm:text-base font-bold text-[#EFC4BF] tracking-wide">
                              {eq.formula}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#A9C2D2] mb-2">{eq.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px] font-mono">
                            {eq.variables.map((v, vIdx) => (
                              <div key={vIdx} className="flex justify-between bg-[#122630] px-2 py-0.5 rounded">
                                <span className="text-[#EFC4BF] font-bold">{v.symbol}:</span>
                                <span className="text-[#A9C2D2] truncate ml-1">{v.name} ({v.unit})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] space-y-2 text-xs leading-relaxed">
                    <p className="text-[#1C3947] italic">
                      "{selectedPart.theoreticalReasoning.deepExplanation}"
                    </p>
                    <div className="pt-2 border-t border-[#E2D7BB] flex items-start gap-1.5">
                      <strong className="text-[#8E3742] shrink-0">Conclusión Clave:</strong>
                      <span className="text-[#122630] font-medium">{selectedPart.theoreticalReasoning.keyTakeaway}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E2D7BB]">
                <button
                  onClick={handlePrevPart}
                  className="px-4 py-2 text-xs font-semibold text-[#122630] hover:bg-[#EFE8D3] border border-[#E2D7BB] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Parte Anterior
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenSimulator}
                    className="px-4 py-2 text-xs font-semibold text-[#8E3742] bg-[#FAF7EE] hover:bg-[#FAEEEE] border border-[#E2D7BB] rounded-xl transition-colors cursor-pointer hidden sm:flex items-center gap-1.5"
                  >
                    <span>Simular este componente</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleNextPart}
                    className="px-5 py-2 text-xs font-bold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    Siguiente Componente
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FAEEEE] flex items-center justify-center text-[#8E3742]">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#122630]">
                Selecciona cualquier componente del espectrofotómetro UV-Vis
              </h3>
              <p className="text-xs text-[#1C3947]/70 max-w-sm mx-auto">
                Haz clic en las lámparas D₂/W, la rendija colimadora, la rejilla holográfica, el chopper, las cubetas de cuarzo o el detector PMT.
              </p>
              <button
                onClick={() => handleSelectPart('lamps')}
                className="px-5 py-2 text-xs font-semibold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Comenzar con las Fuentes D₂ / W
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenModal && (
        <div
          onClick={() => setIsFullscreenModal(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="max-w-6xl w-full max-h-[92vh] relative bg-[#0C1A22] rounded-2xl overflow-hidden border border-[#1C3947] flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-[#1C3947] text-xs font-mono text-[#FAF7EE]">
              <span>Corte Transversal 3D Espectrofotómetro UV-Vis - Vista Ultra Grande</span>
              <button
                onClick={() => setIsFullscreenModal(false)}
                className="px-2.5 py-1 bg-[#8E3742] hover:bg-[#742B34] rounded-lg text-xs font-bold text-[#FAF7EE] cursor-pointer"
              >
                Cerrar (Esc)
              </button>
            </div>
            <div className="relative flex-1 overflow-auto flex items-center justify-center p-2">
              <img
                src={IMAGES.uvvisCutawayUltra3d}
                alt="Espectrofotómetro UV-Vis en pantalla completa"
                referrerPolicy="no-referrer"
                className="max-h-[82vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
