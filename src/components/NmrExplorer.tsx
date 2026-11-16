import React, { useState, useEffect } from 'react';
import { NMR_PARTS } from '../data/nmrData';
import { NmrPartMicroAnimation } from './NmrPartMicroAnimation';
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

interface NmrExplorerProps {
  onOpenSimulator: () => void;
}

export const NmrExplorer: React.FC<NmrExplorerProps> = ({ onOpenSimulator }) => {
  const [selectedPartId, setSelectedPartId] = useState<string | null>('superconducting_magnet');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'photo' | 'vector'>('photo');
  const [isPanoramic, setIsPanoramic] = useState<boolean>(true);
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

  const selectedPart = NMR_PARTS.find((p) => p.id === selectedPartId) || null;

  const handleSelectPart = (partId: string) => {
    setSelectedPartId(partId);
    const part = NMR_PARTS.find((p) => p.id === partId);
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
    const currentIndex = NMR_PARTS.findIndex((p) => p.id === selectedPartId);
    const nextIndex = (currentIndex + 1) % NMR_PARTS.length;
    handleSelectPart(NMR_PARTS[nextIndex].id);
  };

  const handlePrevPart = () => {
    const currentIndex = NMR_PARTS.findIndex((p) => p.id === selectedPartId);
    const prevIndex = (currentIndex - 1 + NMR_PARTS.length) % NMR_PARTS.length;
    handleSelectPart(NMR_PARTS[prevIndex].id);
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
    { id: 'sample_spinner_tube', short: '1. Tubo 5mm y Turbina', x: 50, y: 18 },
    { id: 'cryostat_dewar', short: '2. Criostato LN₂ / LHe', x: 42, y: 31 },
    { id: 'superconducting_magnet', short: '3. Imán Nb₃Sn (B₀)', x: 57, y: 45 },
    { id: 'shim_coils', short: '4. Shims y Lock ²H', x: 42, y: 46 },
    { id: 'rf_probe_coil', short: '5. Sonda RF CryoProbe', x: 50, y: 53 },
    { id: 'rf_console_adc', short: '6. Consola RF & FID', x: 48, y: 80 },
    { id: 'fft_nmr_processor', short: '7. Espectro ¹H δ ppm', x: 61, y: 76 },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Subheader and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Explorador Anatómico RMN (Resonancia Magnética Nuclear)</span>
            <span aria-hidden="true">·</span>
            <span>Imán Superconductor · CryoProbe™ · FID &amp; FFT</span>
            <span aria-hidden="true">·</span>
            <span>Estándares Bruker · Agilent · Shimadzu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Anatomía del Espectrómetro de Resonancia Magnética Nuclear (RMN)
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Inspecciona el criostato vertical de helio líquido (4.2 K), el solenoide superconductor Nb₃Sn, las bobinas shim a partes por billón, la sonda RF de silla y la consola transceptora digital.
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
              if (!selectedPartId) handleSelectPart('sample_spinner_tube');
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
                  ? 'MODELO REAL 3D: ESPECTRÓMETRO RMN SUPERCONDUCTOR (400–1,200 MHZ)'
                  : 'ESQUEMA MAGNÉTICO DINÁMICO: CRIOSTATO · B₀ · SHIMS · SONDA RF · FID'}
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
                  src={IMAGES.nmrCutawayUltra3d}
                  alt="Corte Transversal 3D Espectrómetro de Resonancia Magnética Nuclear RMN"
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
                  <div className="text-[#EFC4BF] font-bold">ARQUITECTURA CRIOGÉNICA RMN DE ALTO CAMPO</div>
                  <div className="text-[#A9C2D2] text-[10px]">Helio Líquido 4.2 K · Nb₃Sn 9.4–28.2 T · Lock ²H &amp; Shims 1 ppb · Sonda CryoProbe™</div>
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
                  <linearGradient id="nmrChassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1C3947" />
                    <stop offset="100%" stopColor="#122630" />
                  </linearGradient>
                  <filter id="nmrGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <pattern id="nmrGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162E3B" strokeWidth="0.7" />
                </pattern>
                <rect width="1050" height="600" fill="url(#nmrGridPattern)" opacity="0.6" />

                {/* Main Chassis */}
                <rect x="35" y="60" width="980" height="430" rx="20" fill="url(#nmrChassisGrad)" stroke="#1C3947" strokeWidth="2" />

                {/* 1. SAMPLE TUBE & SPINNER (cx=115, cy=215) */}
                <g
                  onClick={() => handleSelectPart('sample_spinner_tube')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'sample_spinner_tube' ? 0.45 : 1}
                >
                  <rect x="52" y="145" width="126" height="140" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'sample_spinner_tube' ? 3.5 : 1.5} />
                  <rect x="103" y="160" width="24" height="105" rx="3" fill="#081218" stroke="#A9C2D2" strokeWidth="2" />
                  <rect x="105" y="210" width="20" height="53" fill="#7C957D" fillOpacity="0.45" />
                  <rect x="96" y="172" width="38" height="14" rx="2" fill="#EFC4BF" />
                  <text x="64" y="302" fill="#EFC4BF" fontSize="10" fontFamily="monospace" fontWeight="bold">1. TUBO 5mm &amp; LOCK</text>
                </g>

                {/* 2. CRYOSTAT DEWAR (cx=265, cy=145) */}
                <g
                  onClick={() => handleSelectPart('cryostat_dewar')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'cryostat_dewar' ? 0.45 : 1}
                >
                  <rect x="205" y="92" width="120" height="106" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'cryostat_dewar' ? 3.5 : 1.5} />
                  <rect x="220" y="108" width="90" height="72" rx="6" fill="#122630" stroke="#7C957D" strokeWidth="2" />
                  <text x="232" y="135" fill="#A9C2D2" fontSize="10" fontFamily="monospace" fontWeight="bold">LN₂ 77 K</text>
                  <text x="232" y="162" fill="#EFC4BF" fontSize="10" fontFamily="monospace" fontWeight="bold">LHe 4.2 K</text>
                  <text x="214" y="84" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">2. CRIOSTATO DEWAR</text>
                </g>

                {/* 3. SUPERCONDUCTING MAGNET B0 (cx=265, cy=295) */}
                <g
                  onClick={() => handleSelectPart('superconducting_magnet')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'superconducting_magnet' ? 0.45 : 1}
                >
                  <line x1="265" y1="198" x2="265" y2="234" stroke="#EFC4BF" strokeWidth="3" />
                  <rect x="200" y="234" width="130" height="122" rx="10" fill="#0C1A22" stroke="#8E3742" strokeWidth={selectedPartId === 'superconducting_magnet' ? 3.5 : 1.5} />
                  <rect x="218" y="252" width="28" height="84" rx="4" fill="#8E3742" fillOpacity="0.45" stroke="#EFC4BF" strokeWidth="2" />
                  <rect x="284" y="252" width="28" height="84" rx="4" fill="#8E3742" fillOpacity="0.45" stroke="#EFC4BF" strokeWidth="2" />
                  <line x1="265" y1="335" x2="265" y2="255" stroke="#FAF7EE" strokeWidth="2.5" />
                  <text x="255" y="248" fill="#EFC4BF" fontSize="9" fontFamily="monospace" fontWeight="bold">B₀↑</text>
                  <text x="206" y="374" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">3. IMÁN Nb₃Sn B₀</text>
                </g>

                {/* 4. SHIM COILS & DEUTERIUM LOCK (cx=430, cy=225) */}
                <g
                  onClick={() => handleSelectPart('shim_coils')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'shim_coils' ? 0.45 : 1}
                >
                  <path d="M 330 295 L 368 225" fill="none" stroke="#EFC4BF" strokeWidth="3" />
                  <rect x="368" y="155" width="124" height="140" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'shim_coils' ? 3.5 : 1.5} />
                  <circle cx="430" cy="215" r="30" fill="#122630" stroke="#7C957D" strokeWidth="2.5" />
                  <circle cx="430" cy="215" r="18" fill="none" stroke="#EFC4BF" strokeWidth="2" strokeDasharray="4,3" />
                  <text x="394" y="274" fill="#A9C2D2" fontSize="9" fontFamily="monospace" fontWeight="bold">SHIMS X,Y,Z &lt;1ppb</text>
                  <text x="378" y="314" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">4. BOBINAS SHIM</text>
                </g>

                {/* 5. RF CRYOPROBE COIL (cx=605, cy=225) */}
                <g
                  onClick={() => handleSelectPart('rf_probe_coil')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'rf_probe_coil' ? 0.45 : 1}
                >
                  <line x1="492" y1="225" x2="532" y2="225" stroke="#8E3742" strokeWidth="3" />
                  <rect x="532" y="155" width="146" height="140" rx="10" fill="#0C1A22" stroke="#7C957D" strokeWidth={selectedPartId === 'rf_probe_coil' ? 3.5 : 1.5} />
                  {/* Saddle RF coil wrapping sample */}
                  <rect x="582" y="182" width="46" height="72" rx="8" fill="#122630" stroke="#EFC4BF" strokeWidth="3" filter="url(#nmrGlow)" />
                  <rect x="598" y="172" width="14" height="92" rx="3" fill="#A9C2D2" fillOpacity="0.4" stroke="#FAF7EE" strokeWidth="1.5" />
                  <text x="546" y="276" fill="#EFC4BF" fontSize="9" fontFamily="monospace" fontWeight="bold">PULSO B₁ 90° (20 K)</text>
                  <text x="544" y="314" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">5. SONDA CRYOPROBE</text>
                </g>

                {/* 6. RF CONSOLE & QUADRATURE FID (cx=775, cy=225) */}
                <g
                  onClick={() => handleSelectPart('rf_console_adc')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'rf_console_adc' ? 0.45 : 1}
                >
                  <line x1="678" y1="225" x2="714" y2="225" stroke="#7C957D" strokeWidth="3" />
                  <rect x="714" y="155" width="122" height="140" rx="10" fill="#0C1A22" stroke="#EFC4BF" strokeWidth={selectedPartId === 'rf_console_adc' ? 3.5 : 1.5} />
                  {/* Decaying FID wave */}
                  <path
                    d="M 728 220 L 734 188 L 740 250 L 746 196 L 752 242 L 758 205 L 764 234 L 770 212 L 776 227 L 784 218 L 796 221 L 820 220"
                    fill="none"
                    stroke="#A9C2D2"
                    strokeWidth="2.2"
                  />
                  <text x="724" y="275" fill="#7C957D" fontSize="9" fontFamily="monospace" fontWeight="bold">ADC CUADRATURA</text>
                  <text x="720" y="314" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">6. CONSOLA &amp; FID</text>
                </g>

                {/* 7. FFT & 1H SPECTRUM ppm (cx=915, cy=225) */}
                <g
                  onClick={() => handleSelectPart('fft_nmr_processor')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'fft_nmr_processor' ? 0.45 : 1}
                >
                  <line x1="836" y1="225" x2="852" y2="225" stroke="#7C957D" strokeWidth="2.5" />
                  <rect x="852" y="155" width="132" height="140" rx="10" fill="#0C1A22" stroke="#A9C2D2" strokeWidth={selectedPartId === 'fft_nmr_processor' ? 3.5 : 1.5} />
                  <rect x="864" y="172" width="108" height="82" rx="4" fill="#081218" stroke="#1C3947" />
                  {/* Sharp upward 1H NMR quartet/triplet */}
                  <path
                    d="M 870 242 L 888 242 L 891 226 L 894 242 L 897 204 L 900 242 L 903 204 L 906 242 L 909 226 L 912 242 L 932 242 L 936 218 L 940 242 L 944 190 L 948 242 L 952 218 L 956 242 L 966 242"
                    fill="none"
                    stroke="#7C957D"
                    strokeWidth="2"
                    filter="url(#nmrGlow)"
                  />
                  <text x="860" y="314" fill="#FAF7EE" fontSize="10" fontFamily="monospace" fontWeight="bold">7. FFT ¹H δ (ppm)</text>
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
                    filter="url(#nmrGlow)"
                    className="animate-pulse"
                  />
                )}
              </svg>
            )}

            {/* Quick Part Carousel */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 overflow-x-auto p-1.5 bg-[#122630]/90 backdrop-blur-md rounded-xl border border-[#1C3947] z-20">
              {NMR_PARTS.map((part, idx) => {
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
            <span>Usa las flechas (← / →) para recorrer el espectrómetro RMN o Esc para restablecer vista.</span>
            <button
              onClick={onOpenSimulator}
              className="text-[#EFC4BF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Abrir en Simulador RMN</span>
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
                    <span className="font-bold">Etapa {NMR_PARTS.findIndex((p) => p.id === selectedPart.id) + 1} de 7</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#7C957D] font-bold">★ Fundamento Cuántico RMN Integrado</span>
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
                        Micro-Simulación Cuántica en Tiempo Real:
                      </span>
                    </div>
                    <NmrPartMicroAnimation type={selectedPart.interactiveSimulationType} />
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
                        Espín Nuclear &amp; Fourier
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
                Selecciona cualquier módulo del espectrómetro RMN
              </h3>
              <p className="text-xs text-[#1C3947]/70 max-w-sm mx-auto">
                Haz clic en el tubo deuterado de 5 mm, el criostato Dewar de helio líquido, el imán superconductor Nb₃Sn, las bobinas shim, la sonda RF o la consola FID.
              </p>
              <button
                onClick={() => handleSelectPart('sample_spinner_tube')}
                className="px-5 py-2 text-xs font-semibold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Comenzar con Tubo de 5 mm y Turbina
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
              <span>Corte Transversal 3D Espectrómetro RMN Superconductor - Vista Ultra Grande</span>
              <button
                onClick={() => setIsFullscreenModal(false)}
                className="px-2.5 py-1 bg-[#8E3742] hover:bg-[#742B34] rounded-lg text-xs font-bold text-[#FAF7EE] cursor-pointer"
              >
                Cerrar (Esc)
              </button>
            </div>
            <div className="relative flex-1 overflow-auto flex items-center justify-center p-2">
              <img
                src={IMAGES.nmrCutawayUltra3d}
                alt="Espectrómetro RMN en pantalla completa"
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
