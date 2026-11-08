import React, { useState, useEffect } from 'react';
import { SpectrometryPart, SPECTROMETRY_PARTS } from '../data/spectrometryData';
import { PartMicroAnimation } from './PartMicroAnimation';
import { IMAGES } from '../assets/images';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Compass, 
  Info, 
  BookOpen, 
  Zap, 
  Maximize2,
  Minimize2,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Columns,
  Square
} from 'lucide-react';

interface MachineExplorerProps {
  onOpenSimulator: () => void;
}

export const MachineExplorer: React.FC<MachineExplorerProps> = ({ onOpenSimulator }) => {
  const [selectedPartId, setSelectedPartId] = useState<string | null>('ionizer');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'photo' | 'vector'>('photo');
  const [isPanoramic, setIsPanoramic] = useState<boolean>(true);
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

  const selectedPart = SPECTROMETRY_PARTS.find((p) => p.id === selectedPartId) || null;

  // Handle zooming to a specific part
  const handleSelectPart = (partId: string) => {
    setSelectedPartId(partId);
    const part = SPECTROMETRY_PARTS.find((p) => p.id === partId);
    if (part) {
      if (viewMode === 'vector') {
        const scale = part.svgRegion.zoomLevel;
        setZoomScale(scale);
        const targetX = 500 - part.svgRegion.cx * scale;
        const targetY = 300 - part.svgRegion.cy * scale;
        setPanOffset({ x: targetX, y: targetY });
      }
    }
  };

  const handleResetView = () => {
    setSelectedPartId(null);
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleNextPart = () => {
    const currentIndex = SPECTROMETRY_PARTS.findIndex((p) => p.id === selectedPartId);
    const nextIndex = (currentIndex + 1) % SPECTROMETRY_PARTS.length;
    handleSelectPart(SPECTROMETRY_PARTS[nextIndex].id);
  };

  const handlePrevPart = () => {
    const currentIndex = SPECTROMETRY_PARTS.findIndex((p) => p.id === selectedPartId);
    const prevIndex = (currentIndex - 1 + SPECTROMETRY_PARTS.length) % SPECTROMETRY_PARTS.length;
    handleSelectPart(SPECTROMETRY_PARTS[prevIndex].id);
  };

  // Keyboard navigation
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

  // Specific 3D cutaway photo hotspot pins
  const PHOTO_PINS = [
    { id: 'inlet', label: '1. Inyección de Muestra', short: '1. Inyector', x: 18, y: 44, desc: 'Vaporización en régimen Knudsen' },
    { id: 'ionizer', label: '3. Fuente EI (70 eV)', short: '3. Fuente EI', x: 29, y: 42, desc: 'Impacto electrónico cuántico' },
    { id: 'accelerator', label: '4. Óptica y Acelerador', short: '4. Óptica', x: 38, y: 42, desc: 'Equipartición Ek = qV' },
    { id: 'analyzer', label: '5. Analizador de Masas', short: '5. Analizador', x: 54, y: 43, desc: 'Fuerza de Lorentz r = mv / qB' },
    { id: 'detector', label: '6. Detector TAD', short: '6. Detector', x: 78, y: 64, desc: 'Cascada de dínodos 10⁶ e⁻' },
    { id: 'vacuum', label: '2. Bomba Turbomolecular', short: '2. Turbo Bomba', x: 35, y: 73, desc: '60,000 RPM · P < 10⁻⁶ Torr' },
    { id: 'datasystem', label: '7. Consola de Datos', short: '7. Cómputo', x: 82, y: 26, desc: 'Digitalización y espectro m/z' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Subheader and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Explorador Anatómico Interactivo</span>
            <span aria-hidden="true">·</span>
            <span>Fundamento Físico Integrado</span>
            <span aria-hidden="true">·</span>
            <span>Estándares Bruker · Shimadzu · Agilent</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Anatomía del Espectrómetro de Masas
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Inspecciona cada subsistema de la máquina. Haz clic en cualquier parte o pin interactivo para hacer zoom, examinar su micro-simulación y aprender el razonamiento físico y leyes teóricas que gobiernan su diseño.
          </p>
        </div>

        {/* View mode toggle and quick controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Segmented control for view mode: Photo Cutaway vs Vector Blueprint */}
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
              onClick={() => setViewMode('vector')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === 'vector'
                  ? 'bg-[#122630] text-[#FAF7EE] shadow-sm'
                  : 'text-[#1C3947] hover:text-[#122630]'
              }`}
            >
              Esquema Interactivo
            </button>
          </div>

          {/* Layout mode toggle: Panoramic (Large) vs Split */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-[#FAF7EE] rounded-xl border border-[#E2D7BB]">
            <button
              onClick={() => setIsPanoramic(true)}
              title="Vista Panorámica (la máquina ocupa todo el ancho de pantalla)"
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
            title="Ver máquina completa"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8E3742]" />
            <span className="hidden sm:inline">Vista General</span>
          </button>

          <button
            onClick={() => {
              if (!selectedPartId) handleSelectPart('inlet');
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
        {/* Machine Viewport (occupies full width in Panoramic mode, or 7 cols in Split mode) */}
        <div
          className={`${
            isPanoramic ? 'w-full' : 'lg:col-span-7'
          } bg-[#0C1A22] rounded-2xl border border-[#1C3947] p-3 shadow-xl relative overflow-hidden flex flex-col`}
        >
          {/* Machine Header Status */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#1C3947]/80 text-xs font-mono text-[#A9C2D2]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C957D] animate-pulse" />
              <span className="font-semibold tracking-wide text-[#FAF7EE]">
                {viewMode === 'photo'
                  ? 'MODELO REAL 3D: CORTE TRANSVERSAL INDUSTRIAL (EI-MS SECTOR / CUADRUPOLO)'
                  : 'ESQUEMA DINÁMICO: TÚNEL DE VUELO Y DEFLEXIÓN BALÍSTICA DE LORENTZ'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#A9C2D2]">
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

          {/* Large Canvas / Image Viewport Container */}
          <div
            className={`relative w-full ${
              isPanoramic ? 'h-[460px] sm:h-[540px] lg:h-[620px]' : 'h-[400px] sm:h-[460px]'
            } overflow-hidden rounded-xl bg-[#081218] select-none transition-all duration-300`}
          >
            {viewMode === 'photo' ? (
              <div className="relative w-full h-full bg-[#0C1A22] group">
                <img
                  src={IMAGES.spectrometerCutawayUltra3d}
                  alt="Corte Transversal 3D Espectrómetro de Masas - Modelo Real"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Hotspot Pins on Ultra 3D Cutaway Photo */}
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

                {/* Floating telemetry legend on bottom-left of photo */}
                <div className="absolute bottom-14 left-3 bg-[#122630]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#1C3947] text-[11px] font-mono text-[#FAF7EE] space-y-1 hidden sm:block pointer-events-none">
                  <div className="text-[#EFC4BF] font-bold">CÁMARA TRANSPARENTE ULTRA ALTO VACÍO</div>
                  <div className="text-[#A9C2D2] text-[10px]">P &lt; 10⁻⁶ Torr · Haz 70 eV · Varillas Cuadrupolares de Oro</div>
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
                  <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1C3947" />
                    <stop offset="100%" stopColor="#122630" />
                  </linearGradient>
                  <linearGradient id="magnetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8E3742" />
                    <stop offset="100%" stopColor="#571F26" />
                  </linearGradient>
                  <linearGradient id="vacuumTubeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1C3947" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#0C1A22" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#1C3947" stopOpacity="0.7" />
                  </linearGradient>
                  <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Blueprint grid */}
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162E3B" strokeWidth="0.7" />
                </pattern>
                <rect width="1050" height="600" fill="url(#gridPattern)" opacity="0.6" />

                {/* Machine Foundation Chassis */}
                <rect x="50" y="80" width="950" height="470" rx="20" fill="url(#chassisGrad)" stroke="#1C3947" strokeWidth="2" />
                <rect x="60" y="520" width="930" height="24" rx="4" fill="#0C1A22" />

                {/* 2. VACUUM SYSTEM & TURBOPUMP */}
                <g
                  id="vacuum-system"
                  onClick={() => handleSelectPart('vacuum')}
                  className="cursor-pointer transition-opacity"
                  opacity={selectedPartId && selectedPartId !== 'vacuum' ? 0.45 : 1}
                >
                  <path d="M 280 340 L 280 430 L 480 430 L 480 480" fill="none" stroke="#7696AA" strokeWidth="12" strokeLinecap="round" />
                  <path d="M 680 370 L 680 430 L 480 430" fill="none" stroke="#7696AA" strokeWidth="12" strokeLinecap="round" />
                  <rect x="420" y="440" width="120" height="75" rx="8" fill="#1C3947" stroke="#7C957D" strokeWidth={selectedPartId === 'vacuum' ? 3.5 : 1.5} />
                  <line x1="435" y1="465" x2="525" y2="465" stroke="#7C957D" strokeWidth="2" strokeDasharray="6,4" />
                  <line x1="435" y1="480" x2="525" y2="480" stroke="#7C957D" strokeWidth="2" strokeDasharray="4,6" />
                  <line x1="435" y1="495" x2="525" y2="495" stroke="#7C957D" strokeWidth="2" strokeDasharray="8,3" />
                  <rect x="560" y="460" width="85" height="55" rx="6" fill="#122630" stroke="#7696AA" strokeWidth="1.5" />
                  <circle cx="602" cy="487" r="16" fill="none" stroke="#EFC4BF" strokeWidth="2" strokeDasharray="4,2" />
                  <text x="440" y="508" fill="#FAF7EE" fontSize="10" fontFamily="monospace">TURBO 60k RPM</text>
                  <text x="445" y="430" fill="#7C957D" fontSize="10" fontFamily="monospace" fontWeight="bold">P &lt; 10⁻⁶ Torr</text>
                </g>

                {/* VACUUM ENVELOPE / FLIGHT TUBE */}
                <rect x="180" y="260" width="370" height="60" rx="6" fill="url(#vacuumTubeGrad)" stroke="#7696AA" strokeWidth="2" />
                <path
                  d="M 550 260 L 670 260 A 130 130 0 0 1 800 130 L 800 190 A 70 70 0 0 0 730 260 L 550 320 Z"
                  fill="url(#vacuumTubeGrad)"
                  stroke="#7696AA"
                  strokeWidth="2"
                />

                {/* 1. INLET */}
                <g
                  id="inlet-system"
                  onClick={() => handleSelectPart('inlet')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'inlet' ? 0.45 : 1}
                >
                  <rect x="70" y="275" width="80" height="30" rx="4" fill="#8E3742" stroke="#EFC4BF" strokeWidth={selectedPartId === 'inlet' ? 3.5 : 1} />
                  <path d="M 150 290 L 180 290" stroke="#EFC4BF" strokeWidth="4" />
                  <rect x="135" y="280" width="10" height="20" rx="2" fill="#E2D7BB" />
                  <line x1="85" y1="290" x2="135" y2="290" stroke="#FAF7EE" strokeWidth="2" />
                  <circle cx="100" cy="265" r="4" fill="#D89F99" />
                  <circle cx="115" cy="265" r="4" fill="#D89F99" />
                  <circle cx="130" cy="265" r="4" fill="#D89F99" />
                  <text x="80" y="325" fill="#EFC4BF" fontSize="11" fontFamily="monospace" fontWeight="bold">1. INYECCIÓN</text>
                  <text x="85" y="340" fill="#A9C2D2" fontSize="9" fontFamily="monospace">Vaporización</text>
                </g>

                {/* 3. ION SOURCE EI */}
                <g
                  id="ionizer-system"
                  onClick={() => handleSelectPart('ionizer')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'ionizer' ? 0.45 : 1}
                >
                  <rect x="210" y="265" width="130" height="50" rx="4" fill="#122630" stroke="#EFC4BF" strokeWidth={selectedPartId === 'ionizer' ? 3.5 : 1.5} />
                  <path d="M 260 250 L 270 265 L 280 250 L 290 265" fill="none" stroke="#FAF7EE" strokeWidth="2.5" filter="url(#glowEffect)" />
                  <text x="250" y="242" fill="#EFC4BF" fontSize="9" fontFamily="monospace">Filamento (70 eV)</text>
                  <line x1="275" y1="265" x2="275" y2="315" stroke="#FAF7EE" strokeWidth="2" strokeDasharray="3,3" filter="url(#glowEffect)" />
                  <rect x="265" y="315" width="20" height="6" fill="#7C957D" />
                  <rect x="215" y="272" width="6" height="36" rx="1" fill="#8E3742" />
                  <text x="212" y="260" fill="#8E3742" fontSize="9" fontFamily="monospace">+V Repulsor</text>
                  <text x="225" y="335" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">3. IONIZADOR EI</text>
                </g>

                {/* 4. ACCELERATOR */}
                <g
                  id="accelerator-system"
                  onClick={() => handleSelectPart('accelerator')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'accelerator' ? 0.45 : 1}
                >
                  <line x1="360" y1="265" x2="360" y2="283" stroke="#8E3742" strokeWidth="4" />
                  <line x1="360" y1="297" x2="360" y2="315" stroke="#8E3742" strokeWidth="4" />
                  <line x1="390" y1="265" x2="390" y2="286" stroke="#A9C2D2" strokeWidth="4" />
                  <line x1="390" y1="294" x2="390" y2="315" stroke="#A9C2D2" strokeWidth="4" />
                  <line x1="420" y1="265" x2="420" y2="288" stroke="#7C957D" strokeWidth="4" />
                  <line x1="420" y1="292" x2="420" y2="315" stroke="#7C957D" strokeWidth="4" />
                  <text x="350" y="258" fill="#8E3742" fontSize="9" fontFamily="monospace">+4kV</text>
                  <text x="382" y="258" fill="#A9C2D2" fontSize="9" fontFamily="monospace">+2kV</text>
                  <text x="415" y="258" fill="#7C957D" fontSize="9" fontFamily="monospace">0V</text>
                  <text x="360" y="335" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">4. ACELERADOR</text>
                  <text x="365" y="350" fill="#A9C2D2" fontSize="9" fontFamily="monospace">Ek = q·V</text>
                </g>

                {/* 5. ANALYZER */}
                <g
                  id="analyzer-system"
                  onClick={() => handleSelectPart('analyzer')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'analyzer' ? 0.45 : 1}
                >
                  <path
                    d="M 520 200 L 740 200 L 740 370 L 520 370 Z"
                    fill="url(#magnetGrad)"
                    stroke="#EFC4BF"
                    strokeWidth={selectedPartId === 'analyzer' ? 3.5 : 1.5}
                    opacity="0.85"
                  />
                  <rect x="500" y="215" width="20" height="140" rx="4" fill="#D89F99" stroke="#571F26" />
                  <rect x="740" y="215" width="20" height="140" rx="4" fill="#D89F99" stroke="#571F26" />
                  <g fill="#FAF7EE" fontSize="14" fontFamily="monospace" opacity="0.85">
                    <text x="560" y="240">⊗</text>
                    <text x="610" y="240">⊗</text>
                    <text x="660" y="240">⊗</text>
                    <text x="560" y="340">⊗</text>
                    <text x="610" y="340">⊗</text>
                    <text x="660" y="340">⊗</text>
                  </g>
                  <path d="M 440 290 Q 640 290 730 330" fill="none" stroke="#A9C2D2" strokeWidth="2.5" strokeDasharray="4,2" />
                  <path d="M 440 290 Q 560 290 620 210" fill="none" stroke="#EFC4BF" strokeWidth="2.5" strokeDasharray="4,2" />
                  <path d="M 440 290 Q 620 290 765 140" fill="none" stroke="#7C957D" strokeWidth="4" filter="url(#glowEffect)" />
                  <text x="545" y="388" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">5. ANALIZADOR MAGNÉTICO</text>
                  <text x="555" y="403" fill="#EFC4BF" fontSize="9" fontFamily="monospace">r = mv / qB</text>
                </g>

                {/* 6. DETECTOR */}
                <g
                  id="detector-system"
                  onClick={() => handleSelectPart('detector')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'detector' ? 0.45 : 1}
                >
                  <line x1="755" y1="135" x2="765" y2="135" stroke="#FAF7EE" strokeWidth="4" />
                  <line x1="775" y1="135" x2="785" y2="135" stroke="#FAF7EE" strokeWidth="4" />
                  <path
                    d="M 765 130 C 810 110, 870 120, 890 170 C 895 185, 880 200, 850 190 C 820 180, 800 150, 775 140 Z"
                    fill="#1C3947"
                    stroke="#EFC4BF"
                    strokeWidth={selectedPartId === 'detector' ? 3.5 : 1.5}
                  />
                  <circle cx="800" cy="140" r="3" fill="#8E3742" />
                  <circle cx="830" cy="140" r="3" fill="#8E3742" />
                  <circle cx="860" cy="155" r="3" fill="#8E3742" />
                  <circle cx="865" cy="175" r="3" fill="#8E3742" />
                  <text x="800" y="95" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">6. DETECTOR</text>
                  <text x="800" y="110" fill="#EFC4BF" fontSize="9" fontFamily="monospace">Multiplicador 10⁶ e⁻</text>
                </g>

                {/* 7. DATA SYSTEM */}
                <g
                  id="datasystem-system"
                  onClick={() => handleSelectPart('datasystem')}
                  className="cursor-pointer"
                  opacity={selectedPartId && selectedPartId !== 'datasystem' ? 0.45 : 1}
                >
                  <rect x="860" y="240" width="125" height="100" rx="8" fill="#122630" stroke="#7696AA" strokeWidth={selectedPartId === 'datasystem' ? 3.5 : 1.5} />
                  <rect x="870" y="250" width="105" height="68" rx="4" fill="#081218" stroke="#1C3947" />
                  <rect x="912" y="340" width="20" height="15" fill="#7696AA" />
                  <rect x="895" y="355" width="55" height="6" rx="2" fill="#7696AA" />
                  <line x1="875" y1="305" x2="970" y2="305" stroke="#1C3947" strokeWidth="1" />
                  <line x1="885" y1="305" x2="885" y2="285" stroke="#7C957D" strokeWidth="2" />
                  <line x1="905" y1="305" x2="905" y2="260" stroke="#8E3742" strokeWidth="3" />
                  <line x1="930" y1="305" x2="930" y2="278" stroke="#7C957D" strokeWidth="2" />
                  <line x1="950" y1="305" x2="950" y2="295" stroke="#A9C2D2" strokeWidth="2" />
                  <text x="865" y="380" fill="#FAF7EE" fontSize="11" fontFamily="monospace" fontWeight="bold">7. DATOS &amp; ESPECTRO</text>
                  <text x="875" y="395" fill="#7C957D" fontSize="9" fontFamily="monospace">Señal m/z</text>
                </g>

                {/* Selection pulse marker in vector mode */}
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
                    filter="url(#glowEffect)"
                    className="animate-pulse"
                  />
                )}
              </svg>
            )}

            {/* Quick Part Carousel Strip at bottom of machine */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 overflow-x-auto p-1.5 bg-[#122630]/90 backdrop-blur-md rounded-xl border border-[#1C3947] z-20">
              {SPECTROMETRY_PARTS.map((part, idx) => {
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

          {/* Machine Helper Footer */}
          <div className="flex items-center justify-between text-xs text-[#A9C2D2] pt-2 px-1">
            <span>Usa las flechas del teclado (← / →) para cambiar de parte o Esc para restablecer vista.</span>
            <button
              onClick={onOpenSimulator}
              className="text-[#EFC4BF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Abrir en Simulador Dinámico</span>
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
              {/* Part Header & Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8E3742]">
                    <span className="font-semibold uppercase tracking-wider">{selectedPart.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-bold">Etapa {SPECTROMETRY_PARTS.findIndex(p => p.id === selectedPart.id) + 1} de 7</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#7C957D] font-bold">★ Fundamento Teórico Integrado</span>
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

              {/* 2-Column Responsive Layout for Explanation and Theory when in Panoramic Mode */}
              <div className={`grid grid-cols-1 ${isPanoramic ? 'lg:grid-cols-12 gap-6' : 'gap-5'}`}>
                {/* Column A: Physical Functions & Micro-Animation */}
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

                  {/* Real-Time Micro-Simulation Widget */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#8E3742] font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Micro-Simulación Dinámica en Tiempo Real:
                      </span>
                    </div>
                    <PartMicroAnimation type={selectedPart.interactiveSimulationType} />
                  </div>
                </div>

                {/* Column B: Comprehensive Theoretical Foundation & Mathematical Deduction */}
                <div className={`${isPanoramic ? 'lg:col-span-6' : 'space-y-4'} space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E2D7BB]`}>
                  <div className="bg-[#122630] rounded-xl p-4 text-[#FAF7EE] space-y-3 border border-[#1C3947] shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#1C3947] pb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#EFC4BF] flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        Fundamento Físico-Matemático Riguroso
                      </h4>
                      <span className="text-[10px] font-mono text-[#7C957D]">
                        Deducción de Leyes
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#FAF7EE]">
                      {selectedPart.theoreticalReasoning.headline}
                    </p>

                    {/* Principles Bullet List */}
                    <ul className="space-y-1.5 text-xs text-[#A9C2D2]">
                      {selectedPart.theoreticalReasoning.physicsPrinciples.map((principle, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#7C957D] shrink-0 mt-0.5" />
                          <span className="leading-snug">{principle}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Equations and Formulas */}
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

                  {/* Deep Explanation & Key Takeaway */}
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

              {/* Navigation Controls */}
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
                Selecciona cualquier parte del espectrómetro
              </h3>
              <p className="text-xs text-[#1C3947]/70 max-w-sm mx-auto">
                Haz clic en el inyector, la cámara de ionización a 70 eV, las placas de aceleración, el electroimán o el multiplicador de electrones.
              </p>
              <button
                onClick={() => handleSelectPart('ionizer')}
                className="px-5 py-2 text-xs font-semibold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Comenzar con la Cámara de Ionización
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Ultra 3D Cutaway Photo */}
      {isFullscreenModal && (
        <div
          onClick={() => setIsFullscreenModal(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="max-w-6xl w-full max-h-[92vh] relative bg-[#0C1A22] rounded-2xl overflow-hidden border border-[#1C3947] flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-[#1C3947] text-xs font-mono text-[#FAF7EE]">
              <span>Corte Transversal 3D Arquitectónico de Espectrómetro - Vista Ultra Grande</span>
              <button
                onClick={() => setIsFullscreenModal(false)}
                className="px-2.5 py-1 bg-[#8E3742] hover:bg-[#742B34] rounded-lg text-xs font-bold text-[#FAF7EE] cursor-pointer"
              >
                Cerrar (Esc)
              </button>
            </div>
            <div className="relative flex-1 overflow-auto flex items-center justify-center p-2">
              <img
                src={IMAGES.spectrometerCutawayUltra3d}
                alt="Espectrómetro en pantalla completa"
                className="max-h-[82vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
