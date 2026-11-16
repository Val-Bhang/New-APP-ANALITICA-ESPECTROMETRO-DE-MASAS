import React, { useState, useEffect } from 'react';
import { GC_PARTS } from '../data/gcData';
import { GcPartMicroAnimation } from './GcPartMicroAnimation';
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

interface GcExplorerProps {
  onOpenSimulator: () => void;
}

export const GcExplorer: React.FC<GcExplorerProps> = ({ onOpenSimulator }) => {
  const [selectedPartId, setSelectedPartId] = useState<string | null>('capillary_column');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'photo' | 'vector'>('photo');
  const [isPanoramic, setIsPanoramic] = useState<boolean>(true);
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

  const selectedPart = GC_PARTS.find((p) => p.id === selectedPartId) || null;

  const handleSelectPart = (partId: string) => {
    setSelectedPartId(partId);
    const part = GC_PARTS.find((p) => p.id === partId);
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
    const currentIndex = GC_PARTS.findIndex((p) => p.id === selectedPartId);
    const nextIndex = (currentIndex + 1) % GC_PARTS.length;
    handleSelectPart(GC_PARTS[nextIndex].id);
  };

  const handlePrevPart = () => {
    const currentIndex = GC_PARTS.findIndex((p) => p.id === selectedPartId);
    const prevIndex = (currentIndex - 1 + GC_PARTS.length) % GC_PARTS.length;
    handleSelectPart(GC_PARTS[prevIndex].id);
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
    { id: 'carrier_gas', short: '1. Gas Portador & Trampas', x: 22, y: 52 },
    { id: 'epc_control', short: '2. Control Neumático EPC', x: 33, y: 59 },
    { id: 'inlet_injector', short: '3. Inyector Split/Splitless', x: 41, y: 40 },
    { id: 'oven_ramp', short: '4. Horno Programable', x: 59, y: 48 },
    { id: 'capillary_column', short: '5. Columna Capilar WCOT', x: 51, y: 58 },
    { id: 'detector_fid', short: '6. Detector FID (Llama)', x: 65, y: 22 },
    { id: 'chromatogram_kovats', short: '7. Cromatograma Kováts', x: 84, y: 42 }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Subheader and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Explorador Anatómico GC Capilar</span>
            <span aria-hidden="true">·</span>
            <span>Golay, Clausius–Clapeyron &amp; Ionización FID</span>
            <span aria-hidden="true">·</span>
            <span>Estándares Agilent · Shimadzu · Bruker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Anatomía del Cromatógrafo de Gases (GC)
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Recorre el trayecto gaseoso desde las trampas O₂/H₂O y el módulo EPC hasta el inyector Split/Splitless, el horno capilar WCOT y la llama de hidrógeno del detector FID. Haz clic en cualquier etapa para explorar su fundamento y micro-simulación.
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
                    y: 300 - selectedPart.svgRegion.cy * scale
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
              title="Vista Panorámica"
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
              title="Vista Dividida"
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
              if (!selectedPartId) handleSelectPart('carrier_gas');
              else handleNextPart();
            }}
            className="px-3.5 py-1.5 text-xs font-medium text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{selectedPartId ? 'Siguiente Parte' : 'Iniciar Recorrido'}</span>
          </button>
        </div>
      </div>

      {/* Main Layout */}
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
                  ? 'MODELO REAL 3D: CROMATÓGRAFO DE GASES CAPILAR (EPC · SPLITLESS · FID)'
                  : 'ESQUEMA NEUMÁTICO-TÉRMICO: He/H₂ · LINER · HORNO WCOT · LLAMA FID'}
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
                  src={IMAGES.gcCutawayUltra3d}
                  alt="Corte Transversal 3D Cromatógrafo de Gases Capilar"
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
                  <div className="text-[#EFC4BF] font-bold">TREN NEUMÁTICO-TÉRMICO GC CAPILAR</div>
                  <div className="text-[#A9C2D2] text-[10px]">UHP He/H₂ · EPC ±0.001 psi · Liner Splitless · 30m WCOT · FID 10⁷</div>
                </div>
              </div>
            ) : (
              <svg
                viewBox="0 0 1050 600"
                className="w-full h-full cursor-crosshair transition-transform duration-700 ease-out"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                  transformOrigin: '0 0'
                }}
              >
                <defs>
                  <linearGradient id="gcChassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1C3947" />
                    <stop offset="100%" stopColor="#122630" />
                  </linearGradient>
                  <filter id="gcGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <pattern id="gcGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162E3B" strokeWidth="0.7" />
                </pattern>
                <rect width="1050" height="600" fill="url(#gcGridPattern)" opacity="0.6" />

                <rect x="35" y="75" width="980" height="430" rx="20" fill="url(#gcChassisGrad)" stroke="#1C3947" strokeWidth="2" />

                {/* 1. CARRIER GAS & TRAPS */}
                <g
                  onClick={() => handleSelectPart('carrier_gas')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'carrier_gas' ? 0.45 : 1}
                >
                  <rect x="52" y="130" width="116" height="170" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'carrier_gas' ? 3.5 : 1.5} />
                  <rect x="68" y="162" width="32" height="118" rx="14" fill="#1C3947" stroke="#7C957D" strokeWidth="2" />
                  <text x="75" y="226" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">He</text>
                  <rect x="116" y="178" width="20" height="82" rx="4" fill="#122630" stroke="#A9C2D2" />
                  <rect x="140" y="178" width="20" height="82" rx="4" fill="#122630" stroke="#EFC4BF" />
                  <text x="58" y="320" fill="#EFC4BF" fontSize="10" fontFamily="monospace" fontWeight="bold">1. GAS &amp; TRAMPAS</text>
                </g>

                {/* 2. EPC CONTROL */}
                <g
                  onClick={() => handleSelectPart('epc_control')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'epc_control' ? 0.45 : 1}
                >
                  <line x1="168" y1="190" x2="202" y2="170" stroke="#A9C2D2" strokeWidth="3" />
                  <rect x="202" y="118" width="116" height="104" rx="10" fill="#0C1A22" stroke="#EFC4BF" strokeWidth={selectedPartId === 'epc_control' ? 3.5 : 1.5} />
                  <rect x="218" y="142" width="36" height="44" rx="4" fill="#122630" stroke="#7C957D" strokeWidth="2" />
                  <rect x="266" y="142" width="36" height="44" rx="4" fill="#122630" stroke="#EFC4BF" strokeWidth="2" />
                  <text x="214" y="206" fill="#7C957D" fontSize="9" fontFamily="monospace" fontWeight="bold">EPC ±0.001 psi</text>
                  <text x="210" y="106" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">2. CONTROL EPC</text>
                </g>

                {/* 3. INLET SPLIT/SPLITLESS */}
                <g
                  onClick={() => handleSelectPart('inlet_injector')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'inlet_injector' ? 0.45 : 1}
                >
                  <line x1="318" y1="170" x2="352" y2="170" stroke="#EFC4BF" strokeWidth="3" />
                  <rect x="352" y="110" width="126" height="132" rx="10" fill="#0C1A22" stroke="#8E3742" strokeWidth={selectedPartId === 'inlet_injector' ? 3.5 : 1.5} />
                  <rect x="404" y="135" width="22" height="82" rx="4" fill="#122630" stroke="#EFC4BF" strokeWidth="2" />
                  <rect x="398" y="128" width="34" height="10" rx="2" fill="#8E3742" />
                  <line x1="415" y1="100" x2="415" y2="152" stroke="#A9C2D2" strokeWidth="2" />
                  <text x="366" y="232" fill="#EFC4BF" fontSize="9" fontFamily="monospace">280°C FLASH LINER</text>
                  <text x="355" y="98" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">3. INYECTOR SPLITLESS</text>
                </g>

                {/* 4. PROGRAMMABLE OVEN */}
                <g
                  onClick={() => handleSelectPart('oven_ramp')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'oven_ramp' ? 0.45 : 1}
                >
                  <rect x="498" y="185" width="176" height="175" rx="12" fill="#0C1A22" stroke="#8E3742" strokeWidth={selectedPartId === 'oven_ramp' ? 3.5 : 2} />
                  <circle cx="586" cy="275" r="56" fill="none" stroke="#1C3947" strokeWidth="4" />
                  <path d="M 555 275 L 617 275 M 586 244 L 586 306" stroke="#7C957D" strokeWidth="3" />
                  <text x="524" y="346" fill="#EFC4BF" fontSize="9" fontFamily="monospace" fontWeight="bold">4. HORNO 45 → 320 °C</text>
                </g>

                {/* 5. CAPILLARY COLUMN WCOT */}
                <g
                  onClick={() => handleSelectPart('capillary_column')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'capillary_column' ? 0.45 : 1}
                >
                  <path d="M 415 217 L 415 268 L 534 268" fill="none" stroke="#EFC4BF" strokeWidth="2.5" />
                  <rect x="510" y="108" width="150" height="106" rx="10" fill="#0C1A22" stroke="#EFC4BF" strokeWidth={selectedPartId === 'capillary_column' ? 3.5 : 1.5} />
                  <circle cx="585" cy="158" r="34" fill="none" stroke="#EFC4BF" strokeWidth="4" filter="url(#gcGlow)" />
                  <circle cx="585" cy="158" r="27" fill="none" stroke="#8E3742" strokeWidth="2.5" />
                  <circle cx="585" cy="158" r="20" fill="none" stroke="#7C957D" strokeWidth="2" />
                  <text x="520" y="96" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">5. COLUMNA CAPILAR 30m</text>
                </g>

                {/* 6. DETECTOR FID */}
                <g
                  onClick={() => handleSelectPart('detector_fid')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'detector_fid' ? 0.45 : 1}
                >
                  <path d="M 638 242 L 696 242" fill="none" stroke="#7C957D" strokeWidth="3" />
                  <rect x="696" y="142" width="128" height="150" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'detector_fid' ? 3.5 : 1.5} />
                  <rect x="745" y="218" width="30" height="50" fill="#122630" stroke="#A9C2D2" />
                  <path d="M 760 218 Q 748 188 760 165 Q 772 188 760 218 Z" fill="#A9C2D2" filter="url(#gcGlow)" />
                  <text x="708" y="312" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">6. DETECTOR FID</text>
                </g>

                {/* 7. CHROMATOGRAM KOVATS */}
                <g
                  onClick={() => handleSelectPart('chromatogram_kovats')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'chromatogram_kovats' ? 0.45 : 1}
                >
                  <line x1="824" y1="215" x2="848" y2="215" stroke="#7C957D" strokeWidth="2.5" strokeDasharray="4,3" />
                  <rect x="848" y="140" width="134" height="154" rx="10" fill="#0C1A22" stroke="#7C957D" strokeWidth={selectedPartId === 'chromatogram_kovats' ? 3.5 : 1.5} />
                  <rect x="860" y="156" width="110" height="92" rx="4" fill="#081218" stroke="#1C3947" />
                  <path
                    d="M 866 238 L 880 238 L 885 202 L 890 238 L 912 238 L 918 175 L 924 238 L 944 238 L 950 166 L 956 238 L 964 238"
                    fill="none"
                    stroke="#7C957D"
                    strokeWidth="2.2"
                    filter="url(#gcGlow)"
                  />
                  <text x="854" y="312" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">7. ÍNDICE KOVÁTS RI</text>
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
                    filter="url(#gcGlow)"
                    className="animate-pulse"
                  />
                )}
              </svg>
            )}

            {/* Quick Part Carousel */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 overflow-x-auto p-1.5 bg-[#122630]/90 backdrop-blur-md rounded-xl border border-[#1C3947] z-20">
              {GC_PARTS.map((part, idx) => {
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
            <span>Usa las flechas (← / →) para recorrer el tren cromatográfico GC o Esc para restablecer vista.</span>
            <button
              onClick={onOpenSimulator}
              className="text-[#EFC4BF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Abrir en Simulador GC</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Part Explanation & Theoretical Foundation */}
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
                    <span className="font-bold">Etapa {GC_PARTS.findIndex((p) => p.id === selectedPart.id) + 1} de 7</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#7C957D] font-bold">★ Fundamento GC Integrado</span>
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
                        Micro-Simulación GC en Tiempo Real:
                      </span>
                    </div>
                    <GcPartMicroAnimation type={selectedPart.interactiveSimulationType} />
                  </div>
                </div>

                <div className={`${isPanoramic ? 'lg:col-span-6' : 'space-y-4'} space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E2D7BB]`}>
                  <div className="bg-[#122630] rounded-xl p-4 text-[#FAF7EE] space-y-3 border border-[#1C3947] shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#1C3947] pb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#EFC4BF] flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        Fundamento Físico-Químico Riguroso
                      </h4>
                      <span className="text-[10px] font-mono text-[#7C957D]">
                        Termodinámica &amp; Golay
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
                      &ldquo;{selectedPart.theoreticalReasoning.deepExplanation}&rdquo;
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
                Selecciona cualquier componente del cromatógrafo GC
              </h3>
              <p className="text-xs text-[#1C3947]/70 max-w-sm mx-auto">
                Haz clic en las trampas del gas portador, módulo EPC, puerto Split/Splitless, horno térmico, columna capilar o detector FID.
              </p>
              <button
                onClick={() => handleSelectPart('carrier_gas')}
                className="px-5 py-2 text-xs font-semibold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Comenzar con Gas Portador y Trampas
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
              <span>Corte Transversal 3D Cromatógrafo de Gases Capilar - Vista Ampliada</span>
              <button
                onClick={() => setIsFullscreenModal(false)}
                className="px-2.5 py-1 bg-[#8E3742] hover:bg-[#742B34] rounded-lg text-xs font-bold text-[#FAF7EE] cursor-pointer"
              >
                Cerrar (Esc)
              </button>
            </div>
            <div className="relative flex-1 overflow-auto flex items-center justify-center p-2">
              <img
                src={IMAGES.gcCutawayUltra3d}
                alt="Cromatógrafo de Gases en pantalla completa"
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
