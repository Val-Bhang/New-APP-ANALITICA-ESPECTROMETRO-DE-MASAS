import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  HelpCircle, 
  Flame, 
  Zap, 
  FastForward, 
  Compass, 
  Activity, 
  Wind, 
  CheckCircle2, 
  X,
  BookOpen
} from 'lucide-react';

interface SimulatorOnboardingGuideProps {
  onClose?: () => void;
  onStartSimulation: () => void;
}

interface StepInfo {
  stepNumber: number;
  title: string;
  subtitle: string;
  icon: any;
  accentColor: string;
  badge: string;
  whatHappens: string;
  physicsLaw: string;
  userAction: string;
  keyRule: string;
}

const STEPS: StepInfo[] = [
  {
    stepNumber: 1,
    title: '1. Selección de Muestra y Vaporización',
    subtitle: 'La muestra debe entrar como moléculas neutras aisladas',
    icon: Flame,
    accentColor: '#8E3742',
    badge: 'Fase Gaseosa',
    whatHappens: 'Una micro-gota líquida se inyecta en el capilar térmico (250 °C). El calor vence las fuerzas intermoleculares y la convierte en un vapor de moléculas neutras dispersas en régimen molecular libre (Knudsen > 10).',
    physicsLaw: 'Presión de vapor y efusión molecular de Knudsen: Kn = λ / d > 10.',
    userAction: 'En el simulador, selecciona el compuesto en la barra superior (ej. Etanol C₂H₆O, Agua H₂O o Benceno C₆H₆).',
    keyRule: 'La espectrometría de masas solo puede pesar partículas individuales libres en el vacío, nunca gotas compactas.'
  },
  {
    stepNumber: 2,
    title: '2. Ionización por Impacto Electrónico (EI 70 eV)',
    subtitle: 'Carga eléctrica obligatoria: sin carga, no hay deflexión',
    icon: Zap,
    accentColor: '#EFC4BF',
    badge: 'Carga Cuántica',
    whatHappens: 'Un filamento incandescente de tungsteno emite un haz de electrones acelerados a 70 eV. Al cruzar la nube molecular, expulsa un electrón de valencia del analito, generando cationes radicales [M]⁺• y fragmentos catiónicos.',
    physicsLaw: 'Reacción primordial: M + e⁻ (70 eV) ➔ M⁺• + 2 e⁻. Longitud de onda cuántica λ_dB ≈ 1.4 Å.',
    userAction: 'Ajusta el deslizador de "Energía del Filamento (eV)". A 70 eV (estándar NIST) obtendrás el patrón completo de fragmentación; con ionización suave (<25 eV), predomina el ion molecular intacto.',
    keyRule: 'Los campos eléctricos y magnéticos son ciegos e inútiles ante moléculas neutras; solo las cargas sienten fuerza.'
  },
  {
    stepNumber: 3,
    title: '3. Aceleración y Colimación Electrostática',
    subtitle: 'Unificación de la energía cinética de todos los iones',
    icon: FastForward,
    accentColor: '#7C957D',
    badge: 'Cinética',
    whatHappens: 'Las placas paralelas con rendijas colimadoras aplican una caída de potencial V (1,500 - 6,000 V). Todos los iones positivos adquieren exactamente la misma energía cinética electrostática Ek = q·V.',
    physicsLaw: 'Equipartición: Ek = q·V = ½·m·v²  ➔  v = √( 2·q·V / m ).',
    userAction: 'Modifica el "Voltaje de Aceleración (V)". Un voltaje mayor impulsa el haz a mayor velocidad hacia el sector magnético.',
    keyRule: 'A igual energía cinética, los iones más ligeros salen a mayor velocidad que los iones pesados.'
  },
  {
    stepNumber: 4,
    title: '4. Separación por Fuerza de Lorentz en Campo B',
    subtitle: 'La inercia de cada masa describe una curvatura balística única',
    icon: Compass,
    accentColor: '#A9C2D2',
    badge: 'Fuerza de Lorentz',
    whatHappens: 'El haz entra al electroimán perpendicular (B). La fuerza de Lorentz actúa como fuerza centrípeta obligando a cada ion a describir un círculo de radio r = (m·v) / (q·B). Solo los iones cuyo radio coincide con la rendija colectora (r = R) pasan al detector.',
    physicsLaw: 'Ecuación maestra: m/z = (e · B² · r²) / (2 · V).',
    userAction: 'Observa el "Barrido Automático de B" o desactívalo para variar manualmente el campo magnético. Verás cómo iones ligeros, medios y pesados curvan en arcos diferentes.',
    keyRule: 'Los iones ligeros curvan demasiado; los pesados curvan muy poco. Solo la relación m/z sintonizada cruza la rendija.'
  },
  {
    stepNumber: 5,
    title: '5. Multiplicación de Electrones y Espectro en Vivo',
    subtitle: 'Digitalización y normalización al Pico Base (100%)',
    icon: Activity,
    accentColor: '#8E3742',
    badge: 'Detección',
    whatHappens: 'Cada impacto iónico en el detector libera una cascada de 10⁶ a 10⁸ electrones secundarios a través de una cadena de dínodos con ganancia G = δ^N. El conversor digitaliza la corriente y dibuja el espectro de m/z.',
    physicsLaw: 'Abundancia Relativa (%) = ( Intensidad_{m/z} / Intensidad_{Pico Base} ) × 100.',
    userAction: 'Mira cómo las barras del espectrograma inferior acumulan cuentas en tiempo real. Haz clic en cualquier barra para inspeccionar la fórmula química del fragmento.',
    keyRule: 'El pico más alto y estable es el Pico Base (100%), mientras que el ion de mayor masa suele ser el Ion Molecular [M]⁺•.'
  }
];

export const SimulatorOnboardingGuide: React.FC<SimulatorOnboardingGuideProps> = ({ 
  onClose, 
  onStartSimulation 
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const currentStep = STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      onStartSimulation();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  return (
    <div className="bg-[#FAF7EE] rounded-2xl border-2 border-[#E2D7BB] p-6 shadow-xl space-y-6 relative overflow-hidden">
      {/* Top Banner Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB] pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FAEEEE] text-[#8E3742] flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8E3742]">
              <span className="font-bold uppercase tracking-wider">Protocolo de Operación Guiada</span>
              <span aria-hidden="true">·</span>
              <span>Paso {currentStep.stepNumber} de {STEPS.length}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#122630]">
              Cómo Funciona el Simulador de Masas
            </h3>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-[#1C3947]/70 hover:text-[#8E3742] p-1.5 rounded-lg hover:bg-[#EFE8D3] transition-colors cursor-pointer self-start sm:self-auto"
            title="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Step Stepper Progress Indicators */}
      <div className="grid grid-cols-5 gap-2">
        {STEPS.map((step, idx) => {
          const isActive = idx === currentStepIdx;
          const isDone = idx < currentStepIdx;
          return (
            <button
              key={step.stepNumber}
              onClick={() => setCurrentStepIdx(idx)}
              className={`p-2 rounded-xl text-left transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#122630] text-[#FAF7EE] border-[#8E3742] shadow-sm'
                  : isDone
                  ? 'bg-[#F2F6F2] text-[#4F6450] border-[#7C957D]'
                  : 'bg-[#FFFDF9] text-[#1C3947]/60 border-[#E2D7BB] hover:bg-[#F7F3E7]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold">PASO {step.stepNumber}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3 h-3 text-[#7C957D]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                )}
              </div>
              <div className="text-[11px] font-semibold truncate mt-0.5">
                {step.badge}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Step Detail Card */}
      <div className="bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB]/60 pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: currentStep.accentColor === '#8E3742' ? '#FAEEEE' : currentStep.accentColor === '#7C957D' ? '#F2F6F2' : '#F1F6F9',
                color: currentStep.accentColor === '#EFC4BF' ? '#8E3742' : currentStep.accentColor,
                borderColor: '#E2D7BB',
              }}
            >
              <currentStep.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#122630]">
                {currentStep.title}
              </h4>
              <p className="text-xs text-[#7C957D] font-medium">
                {currentStep.subtitle}
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 bg-[#122630] text-[#FAF7EE] rounded-lg self-start sm:self-auto shadow-sm">
            Fase: {currentStep.badge}
          </span>
        </div>

        {/* What happens explanation */}
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#8E3742] uppercase tracking-wider block">
            ¿Qué Ocurre en esta Etapa?
          </span>
          <p className="text-xs sm:text-sm text-[#1C3947] leading-relaxed">
            {currentStep.whatHappens}
          </p>
        </div>

        {/* Physics Law Card */}
        <div className="bg-[#122630] rounded-xl p-3.5 border border-[#1C3947] text-[#FAF7EE] space-y-1">
          <div className="text-[10px] font-mono text-[#A9C2D2] uppercase tracking-wider">
            Ley Física Gobernadora:
          </div>
          <div className="font-mono text-xs sm:text-sm font-bold text-[#EFC4BF]">
            {currentStep.physicsLaw}
          </div>
        </div>

        {/* Interactive Action and Key Takeaway */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-[#FAF7EE] rounded-lg border border-[#E2D7BB] text-xs">
            <span className="font-bold text-[#122630] block mb-1">
              🎮 Lo que tú harás en el simulador:
            </span>
            <span className="text-[#1C3947]/90 leading-relaxed">
              {currentStep.userAction}
            </span>
          </div>

          <div className="p-3 bg-[#FBF0EF] rounded-lg border border-[#F6DCD9] text-xs">
            <span className="font-bold text-[#8E3742] block mb-1">
              💡 Principio Clave a Recordar:
            </span>
            <span className="text-[#1C3947]/90 leading-relaxed">
              {currentStep.keyRule}
            </span>
          </div>
        </div>
      </div>

      {/* Stepper Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentStepIdx === 0}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border ${
            currentStepIdx === 0
              ? 'opacity-40 cursor-not-allowed bg-[#FAF7EE] border-[#E2D7BB] text-[#1C3947]'
              : 'bg-[#FAF7EE] hover:bg-[#EFE8D3] border-[#E2D7BB] text-[#122630]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Paso Anterior
        </button>

        <div className="flex items-center gap-2">
          {currentStepIdx < STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-[#8E3742] hover:bg-[#742B34] text-[#FAF7EE] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Siguiente Paso</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onStartSimulation}
              className="px-6 py-2.5 bg-[#7C957D] hover:bg-[#657D66] text-[#FAF7EE] text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md animate-pulse"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>¡Entendido! Comenzar Simulación</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
