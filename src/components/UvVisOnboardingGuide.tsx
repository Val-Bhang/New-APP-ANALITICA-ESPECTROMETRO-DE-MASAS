import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Sun,
  SlidersHorizontal,
  Split,
  Activity,
  CheckCircle2,
  X,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface UvVisOnboardingGuideProps {
  onClose?: () => void;
  onStartSimulation: () => void;
}

interface UvStepInfo {
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

const STEPS: UvStepInfo[] = [
  {
    stepNumber: 1,
    title: '1. Selección de Analito y Fuente Dual D₂ / W',
    subtitle: 'Fotones de energía exacta entre 1.5 y 6.2 eV (200–800 nm)',
    icon: Sun,
    accentColor: '#8E3742',
    badge: 'Emisión Dual',
    whatHappens: 'La lámpara de Deuterio (D₂) emite radiación ultravioleta continua debajo de 340 nm, mientras la lámpara de Tungsteno-Halógeno (W) ilumina el rango visible por encima de 340 nm. Un espejo motorizado conmuta automáticamente entre ambas.',
    physicsLaw: 'E = h · c / λ  ≈  1240 / λ(nm) [eV]',
    userAction: 'Elige cualquier cromóforo entre los 12 grupos disponibles (aromáticos, colorantes azo, complejos metálicos, ADN/proteínas) y observa cómo cambia la lámpara activa al cruzar los 340 nm.',
    keyRule: 'Los cromóforos absorben fotones únicamente cuando su energía hν iguala la brecha electrónica HOMO → LUMO de la molécula.'
  },
  {
    stepNumber: 2,
    title: '2. Rendija Espectral (SBW) y Colimación',
    subtitle: 'Equilibrio entre resolución fina y potencia fotónica',
    icon: SlidersHorizontal,
    accentColor: '#EFC4BF',
    badge: 'Colimación',
    whatHappens: 'La rendija de entrada recorta la luz divergente de la lámpara y el espejo parabólico la convierte en rayos paralelos hacia la rejilla. El ancho espectral SBW (0.5 a 5.0 nm) determina cuán nítidos se verán los picos cercanos.',
    physicsLaw: 'SBW = w · D⁻¹   |   Señal/Ruido ∝ w²',
    userAction: 'Prueba compuestos con estructura vibrónica fina como Benceno (254 nm) o Antraceno (375 nm) variando el deslizador de "Rendija SBW" entre 0.5 nm y 5.0 nm.',
    keyRule: 'Una rendija muy ancha fusiona los picos finos vibrónicos; una rendija estrecha separa cada detalle espectral.'
  },
  {
    stepNumber: 3,
    title: '3. Monocromador Holográfico Czerny-Turner',
    subtitle: 'Aislamiento nanométrico por interferencia constructiva',
    icon: Sparkles,
    accentColor: '#7C957D',
    badge: 'Difracción',
    whatHappens: 'La luz blanca se refleja en una rejilla holográfica grabada con surcos microscópicos. Cada longitud de onda sale difractada a un ángulo β distinto; al girar la rejilla, solo la longitud de onda λ sintonizada cruza la rendija de salida.',
    physicsLaw: 'Ecuación de la Rejilla: n · λ = d · ( sin α + sin β )',
    userAction: 'Activa "Barrido Auto ON" o mueve manualmente el deslizador de Longitud de Onda (λ) entre 200 y 800 nm para ver cambiar el color del haz monocromático.',
    keyRule: 'El azul/violeta tiene mayor energía fotónica que el rojo; por debajo de 380 nm entramos al ultravioleta invisible.'
  },
  {
    stepNumber: 4,
    title: '4. Chopper de Doble Haz y Cubetas de Cuarzo',
    subtitle: 'Comparación instantánea I₀ (Blanco) vs I (Muestra) y Ley de Beer-Lambert',
    icon: Split,
    accentColor: '#A9C2D2',
    badge: 'Beer-Lambert',
    whatHappens: 'El chopper alterna el haz entre la cubeta de referencia (solvente puro, I₀) y la cubeta de la muestra (I). Las soluciones absorben luz exponencialmente según su absortividad molar ε, paso óptico b y concentración c.',
    physicsLaw: 'A = -log₁₀(I / I₀) = ε(λ) · b · c',
    userAction: 'Modifica la Concentración, el Paso Óptico (b) o cambia el material de la cubeta a Vidrio/Plástico para comprobar por qué solo el Cuarzo transmite por debajo de 330 nm.',
    keyRule: 'Usar una cubeta de vidrio o un solvente inadecuado como acetona satura completamente el espectro ultravioleta.'
  },
  {
    stepNumber: 5,
    title: '5. Fotomultiplicador (PMT) y Espectro Electrónico',
    subtitle: 'Visualización en Absorbancia (A) o Transmitancia (%T)',
    icon: Activity,
    accentColor: '#8E3742',
    badge: 'Espectro A(λ)',
    whatHappens: 'El PMT convierte cada fotón superviviente en corriente eléctrica proporcional a I₀ e I. El sistema calcula A(λ) = log₁₀(I₀/I) y dibuja en tiempo real las bandas gaussianas de transición electrónica.',
    physicsLaw: '%T = 100 · 10^(-A)   ➔   c = A(λ_max) / ( ε · b )',
    userAction: 'Alterna la vista entre Absorbancia y %T en el gráfico y haz clic sobre los marcadores de pico λ_max para inspeccionar si la banda es π → π*, n → π*, d → d o TCML.',
    keyRule: 'En la zona visible (380–750 nm), el color que ves en la cubeta es el color complementario de la banda λ_max que el compuesto absorbe.'
  }
];

export const UvVisOnboardingGuide: React.FC<UvVisOnboardingGuideProps> = ({
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB] pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FAEEEE] text-[#8E3742] flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8E3742]">
              <span className="font-bold uppercase tracking-wider">Protocolo de Operación Óptica</span>
              <span aria-hidden="true">·</span>
              <span>Paso {currentStep.stepNumber} de {STEPS.length}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#122630]">
              Cómo Funciona el Simulador de Haz UV-Vis
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

      <div className="bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB]/60 pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor:
                  currentStep.accentColor === '#8E3742'
                    ? '#FAEEEE'
                    : currentStep.accentColor === '#7C957D'
                    ? '#F2F6F2'
                    : '#F1F6F9',
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
            Etapa: {currentStep.badge}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-[#8E3742] uppercase tracking-wider block">
            ¿Qué Ocurre en esta Etapa?
          </span>
          <p className="text-xs sm:text-sm text-[#1C3947] leading-relaxed">
            {currentStep.whatHappens}
          </p>
        </div>

        <div className="bg-[#122630] rounded-xl p-3.5 border border-[#1C3947] text-[#FAF7EE] space-y-1">
          <div className="text-[10px] font-mono text-[#A9C2D2] uppercase tracking-wider">
            Ecuación Física Gobernadora:
          </div>
          <div className="font-mono text-xs sm:text-sm font-bold text-[#EFC4BF]">
            {currentStep.physicsLaw}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-[#FAF7EE] rounded-lg border border-[#E2D7BB] text-xs">
            <span className="font-bold text-[#122630] block mb-1">
              Lo que harás en el simulador:
            </span>
            <span className="text-[#1C3947]/90 leading-relaxed">
              {currentStep.userAction}
            </span>
          </div>

          <div className="p-3 bg-[#FBF0EF] rounded-lg border border-[#F6DCD9] text-xs">
            <span className="font-bold text-[#8E3742] block mb-1">
              Principio Clave a Recordar:
            </span>
            <span className="text-[#1C3947]/90 leading-relaxed">
              {currentStep.keyRule}
            </span>
          </div>
        </div>
      </div>

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
              className="px-6 py-2.5 bg-[#7C957D] hover:bg-[#657D66] text-[#FAF7EE] text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>¡Entendido! Iniciar Simulador UV-Vis</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
