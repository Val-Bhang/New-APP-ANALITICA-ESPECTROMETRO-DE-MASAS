import React, { useState, useEffect } from 'react';
import { 
  LEADING_MANUFACTURERS, 
  INSTRUMENT_GALLERY, 
  InstrumentGalleryItem, 
  ManufacturerTech 
} from '../data/spectrometryData';
import { UVVIS_MANUFACTURERS, UVVIS_GALLERY } from '../data/uvVisData';
import { HPLC_MANUFACTURERS, HPLC_GALLERY } from '../data/hplcData';
import { FTIR_MANUFACTURERS, FTIR_GALLERY } from '../data/ftirData';
import { NMR_MANUFACTURERS, NMR_GALLERY } from '../data/nmrData';
import { GC_MANUFACTURERS, GC_GALLERY } from '../data/gcData';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Maximize2, 
  Layers
} from 'lucide-react';

interface ManufacturerShowcaseProps {
  instrument?: 'ms' | 'uvvis' | 'hplc' | 'ftir' | 'nmr' | 'gc';
}

export const ManufacturerShowcase: React.FC<ManufacturerShowcaseProps> = ({ instrument = 'ms' }) => {
  const galleryList =
    instrument === 'uvvis'
      ? UVVIS_GALLERY
      : instrument === 'hplc'
      ? HPLC_GALLERY
      : instrument === 'ftir'
      ? FTIR_GALLERY
      : instrument === 'nmr'
      ? NMR_GALLERY
      : instrument === 'gc'
      ? GC_GALLERY
      : INSTRUMENT_GALLERY;
  const manufacturerList: ManufacturerTech[] =
    instrument === 'uvvis'
      ? UVVIS_MANUFACTURERS
      : instrument === 'hplc'
      ? HPLC_MANUFACTURERS
      : instrument === 'ftir'
      ? FTIR_MANUFACTURERS
      : instrument === 'nmr'
      ? NMR_MANUFACTURERS
      : instrument === 'gc'
      ? GC_MANUFACTURERS
      : LEADING_MANUFACTURERS;

  const [selectedGalleryItem, setSelectedGalleryItem] = useState<InstrumentGalleryItem>(galleryList[0]);
  const [activeManufacturerId, setActiveManufacturerId] = useState<string>('agilent');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedGalleryItem(galleryList[0]);
    setFullscreenImage(null);
  }, [instrument]);

  const activeManufacturer = manufacturerList.find((m) => m.id === activeManufacturerId) || manufacturerList[0];

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
            {instrument === 'uvvis'
              ? 'Modelo Real UV-Vis: Arquitectura Óptica y Fabricantes'
              : instrument === 'hplc'
              ? 'Modelo Real HPLC / UHPLC: Ingeniería Fluídica y Fabricantes'
              : instrument === 'ftir'
              ? 'Modelo Real IR Medio (FTIR): Interferometría y Fabricantes'
              : instrument === 'nmr'
              ? 'Modelo Real RMN: Superconductividad, Sonda RF y Fabricantes'
              : instrument === 'gc'
              ? 'Modelo Real GC Capilar: Control Neumático, Horno y Detectores'
              : 'Modelo Real: Arquitectura Instrumental y Fabricantes'}
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            {instrument === 'uvvis'
              ? 'Inspecciona el modelo real del espectrofotómetro UV-Vis mediante cortes transversales 3D, óptica Czerny-Turner y patentes fotónicas de Agilent, Shimadzu y Bruker.'
              : instrument === 'hplc'
              ? 'Inspecciona el modelo real del cromatógrafo líquido UHPLC hasta 1,300 bar mediante cortes transversales 3D, bombas de zafiro y celdas DAD de Agilent, Shimadzu y Bruker.'
              : instrument === 'ftir'
              ? 'Inspecciona el modelo real del espectrómetro FTIR mediante cortes transversales 3D, retroreflectores cúbicos RockSolid™, cristal ATR de diamante y sensores DLATGS de Bruker, Shimadzu y Agilent.'
              : instrument === 'nmr'
              ? 'Inspecciona el modelo real del espectrómetro RMN superconductor mediante cortes transversales 3D de criostato LHe/LN₂, sondas criogénicas CryoProbe™ y consolas digitales RF de Bruker, Agilent/Varian y Shimadzu.'
              : instrument === 'gc'
              ? 'Inspecciona el modelo real del cromatógrafo de gases capilar mediante cortes transversales 3D de módulos EPC/AFC, inyector Split/Splitless, horno de convección WCOT y detector FID de Agilent, Shimadzu y Bruker.'
              : 'Inspecciona el modelo real del espectrómetro mediante cortes transversales 3D, patentes de ingeniería y tecnologías de vanguardia de Bruker, Shimadzu y Agilent.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono text-[#8E3742]">
          <span className="w-2 h-2 rounded-full bg-[#7C957D] animate-pulse" />
          <span>
            {instrument === 'uvvis'
              ? 'Norma USP/EP & NIST 935a'
              : instrument === 'hplc'
              ? 'USP <621> & Ph. Eur. UHPLC'
              : instrument === 'ftir'
              ? 'USP <854> & ASTM E1421'
              : instrument === 'nmr'
              ? 'USP <761> & ISO 17025 qNMR'
              : instrument === 'gc'
              ? 'USP <621> · EPA 8000 / ASTM GC'
              : 'Norma ISO/IEC 17025 & NIST 2026'}
          </span>
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
          {galleryList.map((item) => {
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
              {instrument === 'uvvis'
                ? 'Analiza en detalle cómo cada fabricante resuelve el rango UV profundo, la luz parásita y la velocidad de barrido óptico.'
                : instrument === 'hplc'
                ? 'Analiza en detalle cómo cada fabricante domina presiones de 1,300 bar, desgasificación y dispersión extra-columna.'
                : instrument === 'ftir'
                ? 'Analiza en detalle cómo cada fabricante estabiliza el interferómetro de Michelson, protege la óptica KBr/ZnSe y optimiza la SNR del detector.'
                : instrument === 'nmr'
                ? 'Analiza en detalle cómo cada fabricante estabiliza el campo superconductor B₀, enfría criosondas RF a 20 K y automatiza cuantificación qNMR.'
                : instrument === 'gc'
                ? 'Analiza en detalle cómo cada fabricante controla la neumática EPC/AFC a 0.001 psi, acelera rampas de horno capilar e innova en detección FID/BID/GC-MS.'
                : 'Analiza en detalle cómo cada empresa resuelve los desafíos de transmisión iónica, resolución y velocidad de escaneo.'}
            </p>
          </div>

          {/* Manufacturer Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF7EE] rounded-xl border border-[#E2D7BB] self-start sm:self-auto">
            {manufacturerList.map((m) => {
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
                {instrument === 'uvvis' ? (
                  <>
                    {activeManufacturerId === 'agilent' && 'Lámparas Flash de Xenón a 80 Hz sin precalentamiento e inmunidad total a la luz ambiental con arquitectura multicelda Peltier.'}
                    {activeManufacturerId === 'shimadzu' && 'Rejillas holográficas Lo-Ray-Ligh® de luz parásita ultrabaja (<0.0005% a 220 nm) y barridos ultrarrápidos de 29,000 nm/min.'}
                    {activeManufacturerId === 'bruker' && 'Óptica reflexiva asférica recubierta en oro/SiO₂ libre de aberración cromática con arreglos PDA termostatizados y validación NIST.'}
                  </>
                ) : instrument === 'hplc' ? (
                  <>
                    {activeManufacturerId === 'agilent' && 'Bombas InfinityLab hasta 1,300 bar con emulación ISET, doble aguja Dual-Needle y celda Max-Light de 60 mm.'}
                    {activeManufacturerId === 'shimadzu' && 'Analytical Intelligence con FlowPilot anti-choque, desgasificador Teflon AF y detector PDA con deconvolución i-D2.'}
                    {activeManufacturerId === 'bruker' && 'Arquitectura Elute UHPLC de volumen muerto cero con pistones de zafiro y sincronización directa HyStar para LC-DAD-MS.'}
                  </>
                ) : instrument === 'ftir' ? (
                  <>
                    {activeManufacturerId === 'agilent' && 'Interferómetro ultracompacto Cary 630 de trayectoria corta y módulos Snap-in DialPath™ resistentes a humedad con óptica ZnSe opcional.'}
                    {activeManufacturerId === 'shimadzu' && 'Relación señal-ruido líder 60,000:1 con sensor DLATGS, deshumidificador sólido electrónico y alineación dinámica ADA a 5,000 ajustes/s.'}
                    {activeManufacturerId === 'bruker' && 'Retroreflectores cúbicos sin desgaste RockSolid™, fuente ceramica CenterGlow™ y referencia láser He-Ne con exactitud <0.0005 cm⁻¹.'}
                  </>
                ) : instrument === 'nmr' ? (
                  <>
                    {activeManufacturerId === 'bruker' && 'Liderazgo mundial en imanes Ascend™ hasta 1.2 GHz (28.2 T), consolas Avance Neo y sondas criogénicas CryoProbe™ con SNR ×4.'}
                    {activeManufacturerId === 'agilent' && 'Herencia Varian DirectDrive™ 2 con sintonización robótica ProTune™, sondas OneNMR™ multinucleares e imanes ultracompactos PremiumCOMPACT™.'}
                    {activeManufacturerId === 'shimadzu' && 'Plataformas acopladas LC-SPE-NMR-MS y protocolos de Resonancia Cuantitativa (qNMR) trazable con estándares internos LabSolutions.'}
                  </>
                ) : instrument === 'gc' ? (
                  <>
                    {activeManufacturerId === 'agilent' && 'Precisión neumática EPC ±0.001 psi, placas capilares CFT para backflush, Retention Time Locking y FID digital de 7 décadas.'}
                    {activeManufacturerId === 'shimadzu' && 'Controlador AFC con ahorro inteligente de helio (65%), conectores ClickTek™ sin herramientas y detector universal de plasma frío BID-2030.'}
                    {activeManufacturerId === 'bruker' && 'Arquitectura SCION de rampas ultrarrápidas (120 °C/min), inyectores fríos PTV de gran volumen y acoplamiento directo sin lentes a GC-TQ.'}
                  </>
                ) : (
                  <>
                    {activeManufacturerId === 'agilent' && 'Robustez para análisis de rutina a ultra trazas con cuadrupolos de cuarzo inertes a alta temperatura.'}
                    {activeManufacturerId === 'shimadzu' && 'Velocidad sin precedentes (UFms) con barridos de 30,000 u/s y eliminación total de crosstalk en celdas de colisión.'}
                    {activeManufacturerId === 'bruker' && 'Máximo poder de resolución y precisión isotópica multidimensional mediante TIMS y FT-ICR superconductor.'}
                  </>
                )}
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
              referrerPolicy="no-referrer"
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
