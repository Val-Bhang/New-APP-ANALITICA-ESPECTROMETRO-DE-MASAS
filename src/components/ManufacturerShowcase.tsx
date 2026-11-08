import React, { useState } from 'react';
import { 
  LEADING_MANUFACTURERS, 
  INSTRUMENT_GALLERY, 
  InstrumentGalleryItem, 
  ManufacturerTech 
} from '../data/spectrometryData';
import { 
  Building2, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Maximize2, 
  Layers, 
  Zap, 
  Compass, 
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';

export const ManufacturerShowcase: React.FC = () => {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<InstrumentGalleryItem>(INSTRUMENT_GALLERY[0]);
  const [activeManufacturerId, setActiveManufacturerId] = useState<string>('agilent');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const activeManufacturer = LEADING_MANUFACTURERS.find((m) => m.id === activeManufacturerId) || LEADING_MANUFACTURERS[0];

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Modelo Real de Laboratorio</span>
            <span aria-hidden="true">·</span>
            <span>Estándares Industriales Bruker · Shimadzu · Agilent</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Modelo Real: Arquitectura Instrumental y Fabricantes
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Inspecciona el modelo real del espectrómetro mediante cortes transversales 3D, patentes de ingeniería y tecnologías de vanguardia de Bruker, Shimadzu y Agilent.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono text-[#8E3742]">
          <span className="w-2 h-2 rounded-full bg-[#7C957D] animate-pulse" />
          <span>Norma ISO/IEC 17025 &amp; NIST 2026</span>
        </div>
      </div>

      {/* SECTION 1: High-Fidelity Industrial Imagery & Cross-Section Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#122630] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8E3742]" />
            Galería Técnica de Cortes Transversales y Subcomponentes
          </h3>
          <span className="text-xs text-[#1C3947]/70">
            Haz clic en una imagen para inspeccionar sus especificaciones de ingeniería
          </span>
        </div>

        {/* Selected Gallery Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 shadow-sm items-stretch">
          {/* Left: Big Image Viewport */}
          <div className="lg:col-span-7 relative group rounded-xl overflow-hidden border border-[#E2D7BB] bg-[#0C1A22] aspect-[16/10] flex items-center justify-center">
            <img
              src={selectedGalleryItem.imageSrc}
              alt={selectedGalleryItem.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Manufacturer Tag overlay */}
            <div className="absolute top-3 left-3 bg-[#122630]/90 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-mono text-[#FAF7EE] border border-[#1C3947]">
              {selectedGalleryItem.manufacturerRef}
            </div>

            {/* Expand button */}
            <button
              onClick={() => setFullscreenImage(selectedGalleryItem.imageSrc)}
              className="absolute bottom-3 right-3 bg-[#122630]/80 hover:bg-[#8E3742] text-[#FAF7EE] p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer border border-[#1C3947]"
              title="Ver en pantalla completa"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Bottom Title on Image */}
            <div className="absolute bottom-3 left-3 right-14 text-[#FAF7EE]">
              <h4 className="font-bold text-base sm:text-lg leading-tight drop-shadow-md">
                {selectedGalleryItem.title}
              </h4>
              <p className="text-xs text-[#EFC4BF] opacity-90 drop-shadow">
                {selectedGalleryItem.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Technical Specs and Engineering Features */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-mono font-semibold text-[#8E3742] uppercase tracking-wider">
                  Especificaciones de Diseño
                </span>
                <h4 className="text-lg font-bold text-[#122630]">
                  {selectedGalleryItem.title}
                </h4>
                <p className="text-xs text-[#1C3947] leading-relaxed">
                  {selectedGalleryItem.subtitle}
                </p>
              </div>

              {/* Key Features Bullet List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#122630] block">
                  Innovaciones Clave de Ingeniería:
                </span>
                <ul className="space-y-1.5 text-xs text-[#1C3947]">
                  {selectedGalleryItem.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7C957D] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metric Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-[#E2D7BB]">
              {selectedGalleryItem.specs.map((s, idx) => (
                <div key={idx} className="bg-[#FFFDF9] p-2.5 rounded-lg border border-[#E2D7BB] text-center">
                  <div className="text-[10px] text-[#1C3947]/70 uppercase font-mono">{s.label}</div>
                  <div className="text-xs font-bold text-[#8E3742] mt-0.5 font-mono">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {INSTRUMENT_GALLERY.map((item) => {
            const isSelected = selectedGalleryItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className={`p-2 rounded-xl text-left transition-all cursor-pointer border flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#122630] text-[#FAF7EE] border-[#8E3742] shadow-md'
                    : 'bg-[#FAF7EE] text-[#122630] border-[#E2D7BB] hover:bg-[#F7F3E7]'
                }`}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-14 h-12 object-cover rounded-lg shrink-0 border border-black/20"
                />
                <div className="min-w-0">
                  <div className="font-bold text-xs truncate">{item.title}</div>
                  <div className="text-[10px] opacity-75 truncate">{item.manufacturerRef.split(' ')[2] || 'Fabricante'}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Manufacturer Technological Comparison (Bruker vs Shimadzu vs Agilent) */}
      <div className="space-y-4 pt-4 border-t border-[#E2D7BB]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#122630] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#8E3742]" />
              Comparativa de Fabricantes: Bruker, Shimadzu y Agilent
            </h3>
            <p className="text-xs text-[#1C3947]/70">
              Analiza en detalle cómo cada empresa resuelve los desafíos de transmisión iónica, resolución y velocidad de escaneo.
            </p>
          </div>

          {/* Manufacturer Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF7EE] rounded-xl border border-[#E2D7BB] self-start sm:self-auto">
            {LEADING_MANUFACTURERS.map((m) => {
              const isSelected = activeManufacturerId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveManufacturerId(m.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#8E3742] text-[#FAF7EE] shadow-sm'
                      : 'text-[#1C3947] hover:text-[#122630] hover:bg-[#EFE8D3]'
                  }`}
                >
                  {m.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Manufacturer Deep-Dive Card */}
        <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-6 space-y-6 shadow-sm">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E2D7BB] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#8E3742]">
                <span className="font-bold">{activeManufacturer.country}</span>
                <span aria-hidden="true">·</span>
                <span>Serie Insignia: {activeManufacturer.flagshipSeries}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#122630] mt-1">
                {activeManufacturer.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#7C957D] font-medium">
                {activeManufacturer.specialty}
              </p>
            </div>

            <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] text-xs font-mono max-w-sm">
              <span className="text-[#8E3742] font-bold">Filosofía de Diseño: </span>
              <span className="text-[#1C3947]">
                {activeManufacturerId === 'agilent' && 'Robustez para análisis de rutina a ultra trazas con cuadrupolos de cuarzo inertes a alta temperatura.'}
                {activeManufacturerId === 'shimadzu' && 'Velocidad sin precedentes (UFms) con barridos de 30,000 u/s y eliminación total de crosstalk en celdas de colisión.'}
                {activeManufacturerId === 'bruker' && 'Máximo poder de resolución y precisión isotópica multidimensional mediante TIMS y FT-ICR superconductor.'}
              </span>
            </div>
          </div>

          {/* Innovations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeManufacturer.keyInnovations.map((inv, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF9] rounded-xl p-4 border border-[#E2D7BB] space-y-2 hover:border-[#8E3742] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#FAEEEE] text-[#8E3742] flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                    {idx + 1}
                  </div>
                  <h5 className="font-bold text-sm text-[#122630]">{inv.title}</h5>
                </div>
                <p className="text-xs text-[#1C3947]/90 leading-relaxed">
                  {inv.description}
                </p>
                <div className="p-2 bg-[#F2F6F2] rounded-lg border border-[#DFE8DF] text-[11px] text-[#4F6450] flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C957D] shrink-0 mt-0.5" />
                  <span>
                    <strong>Impacto Analítico:</strong> {inv.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="max-w-5xl max-h-[90vh] relative">
            <img
              src={fullscreenImage}
              alt="Detalle en alta resolución"
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl border border-white/20"
            />
            <div className="text-center text-xs text-[#FAF7EE] font-mono mt-2">
              Haz clic en cualquier parte para cerrar la vista ampliada
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
