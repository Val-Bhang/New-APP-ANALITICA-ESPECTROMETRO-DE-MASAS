import React from 'react';
import {
  Wind,
  Flame,
  Thermometer,
  Sliders,
  Activity,
  X,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface GcOnboardingGuideProps {
  onClose: () => void;
}

export const GcOnboardingGuide: React.FC<GcOnboardingGuideProps> = ({ onClose }) => {
  const steps = [
    {
      num: '01',
      title: 'Elige Analito y Gas Portador (He · H₂ · N₂)',
      desc: 'Selecciona cualquiera de los 120 volátiles/semivolátiles y compara cómo la difusividad del Hidrógeno acelera la elución frente al Helio o Nitrógeno según Golay.',
      icon: Wind
    },
    {
      num: '02',
      title: 'Configura Inyección Split / Splitless y Detecta Fugas',
      desc: 'Compara el tapón fino de Split (alta resolución) contra Splitless (trazas amplificadas) o provoca una fuga en el septum para observar la oxidación y deriva de línea base.',
      icon: Sliders
    },
    {
      num: '03',
      title: 'Alterna Columna Apolar (DB-5ms) vs Polar (DB-Wax)',
      desc: 'En DB-5ms domina el punto de ebullición; al cambiar a DB-Wax (PEG), los compuestos polares (alcoholes, ácidos, cetonas) quedan retenidos detrás de los hidrocarburos.',
      icon: Activity
    },
    {
      num: '04',
      title: 'Compara Horno Isotérmico vs Rampa Térmica Programada',
      desc: 'Observa el problema general de elución a 120 °C fijos frente a una rampa lineal (45 → 315 °C) que resuelve volátiles y pesados en picos gaussianos igual de estrechos.',
      icon: Thermometer
    },
    {
      num: '05',
      title: 'Compara Detector FID (C–H) vs TCD (Universal)',
      desc: 'Verifica cómo la llama de ionización FID apenas responde ante CCl₄, CS₂ o ácido fórmico, mientras que el TCD los detecta universalmente por conductividad térmica.',
      icon: Flame
    }
  ];

  return (
    <div className="bg-[#122630] text-[#FAF7EE] rounded-2xl border border-[#8E3742]/60 p-5 shadow-xl space-y-4">
      <div className="flex items-start justify-between gap-4 border-b border-[#1C3947] pb-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#EFC4BF] font-bold">
            Paso a Paso Inicial · Simulador de Cromatografía de Gases (GC)
          </span>
          <h3 className="text-lg font-bold text-[#FAF7EE] mt-0.5">
            Cómo operar el cromatógrafo capilar en 5 decisiones críticas
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-[#0C1A22] text-[#A9C2D2] hover:text-[#FAF7EE] cursor-pointer border border-[#1C3947]"
          title="Ocultar guía"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {steps.map((st) => {
          const IconComp = st.icon;
          return (
            <div
              key={st.num}
              className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8E3742] font-bold">{st.num}</span>
                  <IconComp className="w-4 h-4 text-[#7C957D]" />
                </div>
                <h4 className="text-xs font-bold text-[#EFC4BF] leading-snug">{st.title}</h4>
                <p className="text-[11px] text-[#A9C2D2] leading-relaxed">{st.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-1 text-xs">
        <span className="text-[#7C957D] flex items-center gap-1.5 font-mono text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Meta analítica USP/EPA: lograr Rₛ ≥ 1.50 entre el analito y su acompañante cercano.
        </span>
        <button
          onClick={onClose}
          className="px-4 py-1.5 rounded-xl bg-[#8E3742] hover:bg-[#742B34] text-[#FAF7EE] font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <span>Comenzar Simulación GC</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
