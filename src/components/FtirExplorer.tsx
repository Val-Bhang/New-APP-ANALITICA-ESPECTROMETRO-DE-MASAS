import React, { useState, useEffect } from 'react';
import { FTIR_PARTS } from '../data/ftirData';
import { FtirPartMicroAnimation } from './FtirPartMicroAnimation';
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

interface FtirExplorerProps {
  onOpenSimulator: () => void;
}

export const FtirExplorer: React.FC<FtirExplorerProps> = ({ onOpenSimulator }) => {
  const [selectedPartId, setSelectedPartId] = useState<string | null>('beamsplitter_michelson');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'photo' | 'vector'>('photo');
  const [isPanoramic, setIsPanoramic] = useState<boolean>(true);
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

  const selectedPart = FTIR_PARTS.find((p) => p.id === selectedPartId) || null;

  const handleSelectPart = (partId: string) => {
    setSelectedPartId(partId);
    const part = FTIR_PARTS.find((p) => p.id === partId);
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
    const currentIndex = FTIR_PARTS.findIndex((p) => p.id === selectedPartId);
    const nextIndex = (currentIndex + 1) % FTIR_PARTS.length;
    handleSelectPart(FTIR_PARTS[nextIndex].id);
  };

  const handlePrevPart = () => {
    const currentIndex = FTIR_PARTS.findIndex((p) => p.id === selectedPartId);
    const prevIndex = (currentIndex - 1 + FTIR_PARTS.length) % FTIR_PARTS.length;
    handleSelectPart(FTIR_PARTS[prevIndex].id);
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
    { id: 'globar_source', short: '1. Fuente Globar SiC', x: 18, y: 40 },
    { id: 'collimator_jstop', short: '2. Colimador y J-Stop', x: 28, y: 64 },
    { id: 'beamsplitter_michelson', short: '3. Divisor KBr Michelson', x: 40, y: 56 },
    { id: 'hene_moving_mirror', short: '4. Espejo Móvil y He-Ne', x: 48, y: 24 },
    { id: 'sample_atr_kbr', short: '5. Cristal ATR Diamante', x: 63, y: 56 },
    { id: 'detector_dtgs', short: '6. Detector DTGS', x: 82, y: 52 },
    { id: 'fft_processor', short: '7. Espectro FFT cm⁻¹', x: 76, y: 22 },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Subheader and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Explorador Anatómico Infrarrojo Medio (FTIR)</span>
            <span aria-hidden="true">·</span>
            <span>Michelson · Láser He-Ne · ATR Diamante</span>
            <span aria-hidden="true">·</span>
            <span>Estándares Bruker · Shimadzu · Agilent</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Anatomía del Espectrómetro FTIR (4,000–400 cm⁻¹)
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Recorre el tren óptico reflectivo bañado en oro desde el emisor cerámico Globar y el interferómetro de Michelson hasta el cristal ATR de diamante y el detector piroeléctrico DLATGS.
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
              if (!selectedPartId) handleSelectPart('globar_source');
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
                  ? 'MODELO REAL 3D: ESPECTRÓMETRO FTIR (MICHELSON · DIAMOND ATR · DLATGS)'
                  : 'ESQUEMA ÓPTICO DINÁMICO: GLOBAR · KBr/Ge · HE-NE · ATR · FFT'}
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
                  src={IMAGES.ftirCutawayUltra3d}
                  alt="Corte Transversal 3D Espectrómetro Infrarrojo Medio FTIR"
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
                  <div className="text-[#EFC4BF] font-bold">BANCO ÓPTICO REFLECTIVO FTIR</div>
                  <div className="text-[#A9C2D2] text-[10px]">Globar SiC (1,250 K) · Espejos Cúbicos RockSolid™ · Láser He-Ne 632.8 nm · Diamond ATR</div>
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
                  <linearGradient id="ftirChassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1C3947" />
                    <stop offset="100%" stopColor="#122630" />
                  </linearGradient>
                  <filter id="ftirGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <pattern id="ftirGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162E3B" strokeWidth="0.7" />
                </pattern>
                <rect width="1050" height="600" fill="url(#ftirGridPattern)" opacity="0.6" />

                {/* Main Chassis */}
                <rect x="35" y="45" width="980" height="460" rx="20" fill="url(#ftirChassisGrad)" stroke="#1C3947" strokeWidth="2" />

                {/* 1. GLOBAR SOURCE (cx=115, cy=215) */}
                <g
                  onClick={() => handleSelectPart('globar_source')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'globar_source' ? 0.45 : 1}
                >
                  <rect x="52" y="145" width="126" height="140" rx="10" fill="#0C1A22" stroke="#EFC4BF" strokeWidth={selectedPartId === 'globar_source' ? 3.5 : 1.5} />
                  <circle cx="115" cy="215" r="28" fill="#8E3742" fillOpacity="0.35" stroke="#EFC4BF" strokeWidth="2" filter="url(#ftirGlow)" />
                  <path d="M 103 230 L 103 198 Q 115 186 127 198 L 127 230" fill="none" stroke="#FAF7EE" strokeWidth="5" strokeLinecap="round" />
                  <text x="64" y="302" fill="#EFC4BF" fontSize="10" fontFamily="monospace" fontWeight="bold">1. GLOBAR SiC</text>
                </g>

                {/* 2. COLLIMATOR & J-STOP (cx=245, cy=300) */}
                <g
                  onClick={() => handleSelectPart('collimator_jstop')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'collimator_jstop' ? 0.45 : 1}
                >
                  <line x1="178" y1="215" x2="225" y2="295" stroke="#8E3742" strokeWidth="3" />
                  <rect x="190" y="245" width="110" height="110" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'collimator_jstop' ? 3.5 : 1.5} />
                  <path d="M 218 272 Q 204 300 228 326" fill="none" stroke="#EFC4BF" strokeWidth="5" strokeLinecap="round" />
                  <rect x="262" y="270" width="8" height="22" fill="#A9C2D2" />
                  <rect x="262" y="308" width="8" height="22" fill="#A9C2D2" />
                  <text x="194" y="372" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">2. COLIMADOR Y J-STOP</text>
                </g>

                {/* 3. MICHELSON BEAMSPLITTER (cx=410, cy=225) */}
                <g
                  onClick={() => handleSelectPart('beamsplitter_michelson')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'beamsplitter_michelson' ? 0.45 : 1}
                >
                  <line x1="270" y1="300" x2="345" y2="225" stroke="#8E3742" strokeWidth="3.5" />
                  <rect x="342" y="155" width="136" height="140" rx="10" fill="#0C1A22" stroke="#EFC4BF" strokeWidth={selectedPartId === 'beamsplitter_michelson' ? 3.5 : 1.5} />
                  {/* 45 deg KBr beamsplitter */}
                  <line x1="382" y1="255" x2="438" y2="195" stroke="#A9C2D2" strokeWidth="6" />
                  {/* Fixed mirror at bottom of Michelson */}
                  <rect x="386" y="276" width="48" height="8" fill="#EFC4BF" rx="2" />
                  {/* IR beams inside Michelson */}
                  <line x1="342" y1="225" x2="540" y2="225" stroke="#EFC4BF" strokeWidth="2.5" strokeDasharray="5,3" />
                  <line x1="410" y1="276" x2="410" y2="165" stroke="#7C957D" strokeWidth="2.5" />
                  <text x="352" y="314" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">3. DIVISOR KBr / Ge</text>
                </g>

                {/* 4. HE-NE LASER & MOVING MIRROR (cx=410, cy=115) */}
                <g
                  onClick={() => handleSelectPart('hene_moving_mirror')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'hene_moving_mirror' ? 0.45 : 1}
                >
                  <rect x="342" y="64" width="136" height="96" rx="10" fill="#0C1A22" stroke="#8E3742" strokeWidth={selectedPartId === 'hene_moving_mirror' ? 3.5 : 1.5} />
                  {/* Cube-corner retroreflector */}
                  <polyline points="385,124 410,94 435,124" fill="none" stroke="#EFC4BF" strokeWidth="4" />
                  {/* Red He-Ne reference beam */}
                  <rect x="488" y="88" width="48" height="22" rx="4" fill="#8E3742" stroke="#EFC4BF" />
                  <text x="494" y="103" fill="#FAF7EE" fontSize="9" fontFamily="monospace" fontWeight="bold">He-Ne</text>
                  <line x1="488" y1="99" x2="418" y2="108" stroke="#EFC4BF" strokeWidth="2" strokeDasharray="3,2" filter="url(#ftirGlow)" />
                  <text x="348" y="56" fill="#EFC4BF" fontSize="10" fontFamily="monospace" fontWeight="bold">4. ESPEJO MÓVIL &amp; HE-NE</text>
                </g>

                {/* 5. ATR DIAMOND & KBR SAMPLE CHAMBER (cx=615, cy=225) */}
                <g
                  onClick={() => handleSelectPart('sample_atr_kbr')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'sample_atr_kbr' ? 0.45 : 1}
                >
                  <rect x="540" y="155" width="150" height="140" rx="10" fill="#0C1A22" stroke="#7C957D" strokeWidth={selectedPartId === 'sample_atr_kbr' ? 3.5 : 1.5} />
                  {/* Diamond ATR prism */}
                  <polygon points="592,245 638,245 628,220 602,220" fill="#A9C2D2" fillOpacity="0.45" stroke="#FAF7EE" strokeWidth="2" />
                  {/* Anvil press */}
                  <rect x="605" y="175" width="20" height="36" rx="2" fill="#EFC4BF" />
                  <line x1="540" y1="225" x2="615" y2="232" stroke="#8E3742" strokeWidth="2.5" />
                  <line x1="615" y1="232" x2="725" y2="225" stroke="#8E3742" strokeWidth="2.5" />
                  <text x="556" y="314" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">5. CRISTAL ATR DIAMANTE</text>
                </g>

                {/* 6. DTGS PYROELECTRIC DETECTOR (cx=790, cy=225) */}
                <g
                  onClick={() => handleSelectPart('detector_dtgs')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'detector_dtgs' ? 0.45 : 1}
                >
                  <rect x="725" y="155" width="130" height="140" rx="10" fill="#0C1A22" stroke="#EFC4BF" strokeWidth={selectedPartId === 'detector_dtgs' ? 3.5 : 1.5} />
                  <path d="M 744 195 Q 765 225 744 255" fill="none" stroke="#EFC4BF" strokeWidth="4" />
                  <rect x="782" y="202" width="52" height="46" rx="6" fill="#122630" stroke="#7C957D" strokeWidth="2.5" />
                  <text x="792" y="229" fill="#7C957D" fontSize="10" fontFamily="monospace" fontWeight="bold">DLATGS</text>
                  <text x="738" y="314" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">6. DETECTOR DTGS</text>
                </g>

                {/* 7. FFT PROCESSOR & SPECTRUM (cx=925, cy=225) */}
                <g
                  onClick={() => handleSelectPart('fft_processor')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'fft_processor' ? 0.45 : 1}
                >
                  <line x1="855" y1="225" x2="862" y2="225" stroke="#7C957D" strokeWidth="2.5" />
                  <rect x="862" y="155" width="128" height="140" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'fft_processor' ? 3.5 : 1.5} />
                  <rect x="874" y="172" width="104" height="82" rx="4" fill="#081218" stroke="#1C3947" />
                  {/* Classic downward FTIR %T spectrum */}
                  <path
                    d="M 880 185 L 892 185 L 898 228 L 904 185 L 920 185 L 925 236 L 930 185 L 944 185 L 948 214 L 952 185 L 962 222 L 968 185 L 972 185"
                    fill="none"
                    stroke="#7C957D"
                    strokeWidth="2.2"
                    filter="url(#ftirGlow)"
                  />
                  <text x="875" y="314" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">7. FFT %T vs cm⁻¹</text>
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
                    filter="url(#ftirGlow)"
                    className="animate-pulse"
                  />
                )}
              </svg>
            )}

            {/* Quick Part Carousel */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 overflow-x-auto p-1.5 bg-[#122630]/90 backdrop-blur-md rounded-xl border border-[#1C3947] z-20">
              {FTIR_PARTS.map((part, idx) => {
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
            <span>Usa las flechas (← / →) para recorrer el tren óptico FTIR o Esc para restablecer vista.</span>
            <button
              onClick={onOpenSimulator}
              className="text-[#EFC4BF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Abrir en Simulador FTIR</span>
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
                    <span className="font-bold">Etapa {FTIR_PARTS.findIndex((p) => p.id === selectedPart.id) + 1} de 7</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#7C957D] font-bold">★ Fundamento Vibracional Integrado</span>
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
                    <FtirPartMicroAnimation type={selectedPart.interactiveSimulationType} />
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
                        Interferometría &amp; Vibración
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
                Selecciona cualquier módulo del espectrómetro FTIR
              </h3>
              <p className="text-xs text-[#1C3947]/70 max-w-sm mx-auto">
                Haz clic en la fuente Globar, el colimador J-Stop, el interferómetro de Michelson, el láser He-Ne, el cristal ATR de diamante o el detector DTGS.
              </p>
              <button
                onClick={() => handleSelectPart('globar_source')}
                className="px-5 py-2 text-xs font-semibold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Comenzar con Fuente Globar SiC
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
              <span>Corte Transversal 3D Espectrómetro FTIR - Vista Ultra Grande</span>
              <button
                onClick={() => setIsFullscreenModal(false)}
                className="px-2.5 py-1 bg-[#8E3742] hover:bg-[#742B34] rounded-lg text-xs font-bold text-[#FAF7EE] cursor-pointer"
              >
                Cerrar (Esc)
              </button>
            </div>
            <div className="relative flex-1 overflow-auto flex items-center justify-center p-2">
              <img
                src={IMAGES.ftirCutawayUltra3d}
                alt="Espectrómetro FTIR en pantalla completa"
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
