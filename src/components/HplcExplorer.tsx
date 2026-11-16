import React, { useState, useEffect } from 'react';
import { HPLC_PARTS } from '../data/hplcData';
import { HplcPartMicroAnimation } from './HplcPartMicroAnimation';
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

interface HplcExplorerProps {
  onOpenSimulator: () => void;
}

export const HplcExplorer: React.FC<HplcExplorerProps> = ({ onOpenSimulator }) => {
  const [selectedPartId, setSelectedPartId] = useState<string | null>('column');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'photo' | 'vector'>('photo');
  const [isPanoramic, setIsPanoramic] = useState<boolean>(true);
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

  const selectedPart = HPLC_PARTS.find((p) => p.id === selectedPartId) || null;

  const handleSelectPart = (partId: string) => {
    setSelectedPartId(partId);
    const part = HPLC_PARTS.find((p) => p.id === partId);
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
    const currentIndex = HPLC_PARTS.findIndex((p) => p.id === selectedPartId);
    const nextIndex = (currentIndex + 1) % HPLC_PARTS.length;
    handleSelectPart(HPLC_PARTS[nextIndex].id);
  };

  const handlePrevPart = () => {
    const currentIndex = HPLC_PARTS.findIndex((p) => p.id === selectedPartId);
    const prevIndex = (currentIndex - 1 + HPLC_PARTS.length) % HPLC_PARTS.length;
    handleSelectPart(HPLC_PARTS[prevIndex].id);
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
    { id: 'mobile_phase', short: '1. Fase Móvil y Vacío', x: 17, y: 42 },
    { id: 'gradient_controller', short: '2. Mezclador Gradiente', x: 36, y: 28 },
    { id: 'pump', short: '3. Bomba 1,300 bar', x: 36, y: 66 },
    { id: 'injector', short: '4. Inyector 6 Vías', x: 55, y: 55 },
    { id: 'column', short: '5. Columna C18 & Horno', x: 70, y: 50 },
    { id: 'detector', short: '6. Detector DAD Celda Z', x: 83, y: 50 },
    { id: 'datasystem', short: '7. Cromatograma t_R', x: 83, y: 20 },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Subheader and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Explorador Anatómico HPLC / UHPLC</span>
            <span aria-hidden="true">·</span>
            <span>Alta Presión, Reparto C18 &amp; Van Deemter</span>
            <span aria-hidden="true">·</span>
            <span>Estándares Agilent · Shimadzu · Bruker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Anatomía del Cromatógrafo Líquido (HPLC)
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Recorre el flujo de alta presión desde los reservorios A/B y el desgasificador hasta la columna C18 termostatizada y la celda óptica DAD. Haz clic en cualquier módulo para hacer zoom y explorar su micro-simulación.
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
              if (!selectedPartId) handleSelectPart('mobile_phase');
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
                  ? 'MODELO REAL 3D: SISTEMA UHPLC BINARIO (HASTA 1,300 BAR)'
                  : 'ESQUEMA FLUÍDICO DINÁMICO: GRADIENTE · 6 VÍAS · COLUMNA C18 · DAD'}
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
                  src={IMAGES.hplcCutawayUltra3d}
                  alt="Corte Transversal 3D Cromatógrafo Líquido UHPLC"
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
                  <div className="text-[#EFC4BF] font-bold">TREN FLUÍDICO UHPLC DE ALTA PRESIÓN</div>
                  <div className="text-[#A9C2D2] text-[10px]">Desgasificador Teflon AF · Zafiro 1,300 bar · C18 Sub-2 µm · DAD 190–640 nm</div>
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
                  <linearGradient id="hplcChassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1C3947" />
                    <stop offset="100%" stopColor="#122630" />
                  </linearGradient>
                  <filter id="hplcGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <pattern id="hplcGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162E3B" strokeWidth="0.7" />
                </pattern>
                <rect width="1050" height="600" fill="url(#hplcGridPattern)" opacity="0.6" />

                {/* Main Chassis */}
                <rect x="35" y="75" width="980" height="430" rx="20" fill="url(#hplcChassisGrad)" stroke="#1C3947" strokeWidth="2" />

                {/* 1. MOBILE PHASE & DEGASSER (cx=115, cy=210) */}
                <g
                  onClick={() => handleSelectPart('mobile_phase')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'mobile_phase' ? 0.45 : 1}
                >
                  <rect x="55" y="135" width="120" height="150" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'mobile_phase' ? 3.5 : 1.5} />
                  {/* Bottle A */}
                  <rect x="70" y="160" width="32" height="58" rx="4" fill="#A9C2D2" fillOpacity="0.28" stroke="#A9C2D2" strokeWidth="2" />
                  <text x="80" y="192" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">A</text>
                  {/* Bottle B */}
                  <rect x="115" y="160" width="32" height="58" rx="4" fill="#8E3742" fillOpacity="0.35" stroke="#EFC4BF" strokeWidth="2" />
                  <text x="125" y="192" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">B</text>
                  {/* Degasser block */}
                  <rect x="68" y="232" width="84" height="32" rx="4" fill="#122630" stroke="#7C957D" strokeWidth="2" />
                  <text x="76" y="252" fill="#7C957D" fontSize="9" fontFamily="monospace" fontWeight="bold">VACÍO TEFLON</text>
                  <text x="58" y="305" fill="#EFC4BF" fontSize="10" fontFamily="monospace" fontWeight="bold">1. FASE MÓVIL</text>
                </g>

                {/* 2. GRADIENT CONTROLLER & MIXER (cx=265, cy=155) */}
                <g
                  onClick={() => handleSelectPart('gradient_controller')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'gradient_controller' ? 0.45 : 1}
                >
                  <path d="M 152 248 L 210 155" fill="none" stroke="#A9C2D2" strokeWidth="3" />
                  <rect x="208" y="108" width="115" height="92" rx="10" fill="#0C1A22" stroke="#EFC4BF" strokeWidth={selectedPartId === 'gradient_controller' ? 3.5 : 1.5} />
                  <circle cx="242" cy="152" r="14" fill="#122630" stroke="#A9C2D2" strokeWidth="2" />
                  <circle cx="286" cy="152" r="16" fill="#8E3742" fillOpacity="0.4" stroke="#EFC4BF" strokeWidth="2" />
                  <text x="278" y="156" fill="#FAF7EE" fontSize="9" fontFamily="monospace" fontWeight="bold">MIX</text>
                  <text x="210" y="96" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">2. GRADIENTE %A/%B</text>
                </g>

                {/* 3. BINARY HIGH-PRESSURE PUMP (cx=265, cy=295) */}
                <g
                  onClick={() => handleSelectPart('pump')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'pump' ? 0.45 : 1}
                >
                  <line x1="265" y1="200" x2="265" y2="238" stroke="#EFC4BF" strokeWidth="3.5" />
                  <rect x="200" y="238" width="130" height="114" rx="10" fill="#0C1A22" stroke="#8E3742" strokeWidth={selectedPartId === 'pump' ? 3.5 : 1.5} />
                  <rect x="218" y="258" width="42" height="22" rx="3" fill="#8E3742" stroke="#EFC4BF" strokeWidth="1.5" />
                  <rect x="270" y="258" width="42" height="22" rx="3" fill="#7C957D" stroke="#A9C2D2" strokeWidth="1.5" />
                  <rect x="218" y="294" width="94" height="22" rx="4" fill="#122630" stroke="#7C957D" />
                  <text x="228" y="309" fill="#7C957D" fontSize="9" fontFamily="monospace" fontWeight="bold">1,300 bar ZAFIRO</text>
                  <text x="206" y="370" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">3. BOMBA BINARIA</text>
                </g>

                {/* 4. AUTOSAMPLER & 6-PORT INJECTOR (cx=430, cy=225) */}
                <g
                  onClick={() => handleSelectPart('injector')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'injector' ? 0.45 : 1}
                >
                  <path d="M 330 295 L 368 225" fill="none" stroke="#EFC4BF" strokeWidth="3.5" />
                  <rect x="368" y="155" width="124" height="140" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'injector' ? 3.5 : 1.5} />
                  {/* 6-port rotary valve */}
                  <circle cx="430" cy="215" r="28" fill="#122630" stroke="#EFC4BF" strokeWidth="2.5" />
                  <circle cx="430" cy="187" r="3.5" fill="#7C957D" />
                  <circle cx="454" cy="201" r="3.5" fill="#7C957D" />
                  <circle cx="454" cy="229" r="3.5" fill="#8E3742" />
                  <circle cx="430" cy="243" r="3.5" fill="#A9C2D2" />
                  <circle cx="406" cy="229" r="3.5" fill="#A9C2D2" />
                  <circle cx="406" cy="201" r="3.5" fill="#8E3742" />
                  <rect x="390" y="262" width="80" height="18" rx="4" fill="#1C3947" />
                  <text x="398" y="275" fill="#EFC4BF" fontSize="9" fontFamily="monospace">VIALES &amp; LOOP</text>
                  <text x="372" y="315" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">4. INYECTOR 6 VÍAS</text>
                </g>

                {/* 5. C18 COLUMN & PELTIER OVEN (cx=605, cy=225) */}
                <g
                  onClick={() => handleSelectPart('column')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'column' ? 0.45 : 1}
                >
                  <line x1="492" y1="225" x2="528" y2="225" stroke="#8E3742" strokeWidth="3.5" />
                  <rect x="528" y="155" width="154" height="140" rx="10" fill="#0C1A22" stroke="#7C957D" strokeWidth={selectedPartId === 'column' ? 3.5 : 1.5} />
                  {/* Packed C18 steel cylinder with glowing bands */}
                  <rect x="544" y="205" width="122" height="40" rx="6" fill="#122630" stroke="#A9C2D2" strokeWidth="2.5" />
                  <rect x="562" y="208" width="10" height="34" fill="#8E3742" filter="url(#hplcGlow)" />
                  <rect x="598" y="208" width="10" height="34" fill="#7C957D" filter="url(#hplcGlow)" />
                  <rect x="634" y="208" width="10" height="34" fill="#A9C2D2" filter="url(#hplcGlow)" />
                  <text x="548" y="182" fill="#EFC4BF" fontSize="9" fontFamily="monospace" fontWeight="bold">HORNO PELTIER 35°C</text>
                  <text x="536" y="315" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">5. COLUMNA C18 (N platos)</text>
                </g>

                {/* 6. DAD Z-FLOW DETECTOR (cx=775, cy=225) */}
                <g
                  onClick={() => handleSelectPart('detector')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'detector' ? 0.45 : 1}
                >
                  <line x1="682" y1="225" x2="714" y2="225" stroke="#7C957D" strokeWidth="3.5" />
                  <rect x="714" y="158" width="122" height="134" rx="10" fill="#0C1A22" stroke="#EFC4BF" strokeWidth={selectedPartId === 'detector' ? 3.5 : 1.5} />
                  {/* Z-flow cell */}
                  <polyline points="732,248 754,222 798,222 818,196" fill="none" stroke="#8E3742" strokeWidth="5" strokeLinecap="round" />
                  <line x1="726" y1="222" x2="824" y2="222" stroke="#EFC4BF" strokeWidth="2" strokeDasharray="3,2" />
                  <text x="738" y="182" fill="#A9C2D2" fontSize="9" fontFamily="monospace" fontWeight="bold">CELDA Z · PDA</text>
                  <text x="720" y="315" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">6. DETECTOR DAD</text>
                </g>

                {/* 7. CHROMATOGRAPHY DATA SYSTEM (cx=915, cy=225) */}
                <g
                  onClick={() => handleSelectPart('datasystem')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'datasystem' ? 0.45 : 1}
                >
                  <line x1="836" y1="225" x2="854" y2="225" stroke="#7C957D" strokeWidth="2.5" strokeDasharray="4,3" />
                  <rect x="854" y="155" width="130" height="140" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'datasystem' ? 3.5 : 1.5} />
                  <rect x="866" y="172" width="106" height="80" rx="4" fill="#081218" stroke="#1C3947" />
                  {/* Sharp HPLC chromatogram peaks */}
                  <path
                    d="M 872 242 L 886 242 L 892 214 L 898 242 L 916 242 L 924 192 L 932 242 L 946 242 L 954 182 L 962 242 L 968 242"
                    fill="none"
                    stroke="#7C957D"
                    strokeWidth="2.2"
                    filter="url(#hplcGlow)"
                  />
                  <text x="860" y="315" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">7. CROMATOGRAMA t_R</text>
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
                    filter="url(#hplcGlow)"
                    className="animate-pulse"
                  />
                )}
              </svg>
            )}

            {/* Quick Part Carousel */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 overflow-x-auto p-1.5 bg-[#122630]/90 backdrop-blur-md rounded-xl border border-[#1C3947] z-20">
              {HPLC_PARTS.map((part, idx) => {
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
            <span>Usa las flechas (← / →) para recorrer el flujo cromatográfico o Esc para restablecer vista.</span>
            <button
              onClick={onOpenSimulator}
              className="text-[#EFC4BF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Abrir en Simulador HPLC</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Part Explanation & Theoretical Foundation Deck */}
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
                    <span className="font-bold">Etapa {HPLC_PARTS.findIndex((p) => p.id === selectedPart.id) + 1} de 7</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#7C957D] font-bold">★ Fundamento Cromatográfico Integrado</span>
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
                        Micro-Simulación Fluídica en Tiempo Real:
                      </span>
                    </div>
                    <HplcPartMicroAnimation type={selectedPart.interactiveSimulationType} />
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
                        Hidrodinámica &amp; Reparto
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
                Selecciona cualquier componente del cromatógrafo HPLC
              </h3>
              <p className="text-xs text-[#1C3947]/70 max-w-sm mx-auto">
                Haz clic en el desgasificador de fase móvil, mezclador de gradiente, bomba binaria de zafiro, inyector de 6 vías, columna C18 o detector DAD.
              </p>
              <button
                onClick={() => handleSelectPart('mobile_phase')}
                className="px-5 py-2 text-xs font-semibold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Comenzar con Fase Móvil y Vacío
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
              <span>Corte Transversal 3D Sistema UHPLC - Vista Ultra Grande</span>
              <button
                onClick={() => setIsFullscreenModal(false)}
                className="px-2.5 py-1 bg-[#8E3742] hover:bg-[#742B34] rounded-lg text-xs font-bold text-[#FAF7EE] cursor-pointer"
              >
                Cerrar (Esc)
              </button>
            </div>
            <div className="relative flex-1 overflow-auto flex items-center justify-center p-2">
              <img
                src={IMAGES.hplcCutawayUltra3d}
                alt="Cromatógrafo HPLC en pantalla completa"
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
