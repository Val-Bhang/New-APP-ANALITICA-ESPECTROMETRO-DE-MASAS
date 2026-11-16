import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Flame,
  Split,
  Ruler,
  Gem,
  Activity,
  CheckCircle2,
  X,
  BookOpen
} from 'lucide-react';

interface FtirOnboardingGuideProps {
  onClose?: () => void;
  onStartSimulation: () => void;
}

interface FtirStepInfo {
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

const STEPS: FtirStepInfo[] = [
  {
    stepNumber: 1,
    title: '1. Emisor Térmico Globar (SiC) & Ventaja de Jacquinot',
    subtitle: 'Radiación policromática continua entre 4,000 y 400 cm⁻¹ sin vidrio',
    icon: Flame,
    accentColor: '#8E3742',
    badge: 'Fuente IR',
    whatHappens: 'Una cerámica incandescente de Carburo de Silicio (~1,250 K) emite todo el espectro del infrarrojo medio a la vez sobre espejos dorados, atravesando la apertura circular J-Stop sin perder luz en rendijas.',
    physicsLaw: 'λ_max · T = 2898 µm·K    |    θ_max = √( Δν̃ / ν̃_max )',
    userAction: 'Elige cualquiera de las 12 familias orgánicas e inorgánicas (alcoholes, cetonas, amidas, polímeros, minerales) o busca entre los 120 compuestos calibrados.',
    keyRule: 'Nunca uses ampollas o ventanas de vidrio ordinario: el enlace Si–O del vidrio absorbe por completo el IR medio debajo de 3,550 cm⁻¹.'
  },
  {
    stepNumber: 2,
    title: '2. Interferómetro de Michelson & Divisor KBr / Ge',
    subtitle: 'División al 50% y recombinación coherente en un interferograma I(δ)',
    icon: Split,
    accentColor: '#A9C2D2',
    badge: 'Interferómetro',
    whatHappens: 'El divisor de KBr/Ge envía la mitad del haz al espejo fijo y la otra mitad al espejo móvil retroreflector. Al recombinarse con retardo δ, cada frecuencia infrarroja queda modulada como una onda coseno.',
    physicsLaw: 'I(δ) = ∫ B(ν̃) · [ 1 + cos( 2π · ν̃ · δ ) ] dν̃',
    userAction: 'Observa el panel del Interferograma I(δ) debajo de la cámara óptica y nota cómo el pico central "centerburst" aparece en δ = 0 (ZPD).',
    keyRule: 'El FTIR mide todas las longitudes de onda simultáneamente en un solo barrido (Ventaja Multiplex de Fellgett).'
  },
  {
    stepNumber: 3,
    title: '3. Láser He-Ne (632.8 nm) & Resolución Espectral Δν̃',
    subtitle: 'Metrología atómica y recorrido del espejo móvil Δx',
    icon: Ruler,
    accentColor: '#7C957D',
    badge: 'Láser He-Ne',
    whatHappens: 'Un láser rojo de Helio-Neón viaja paralelo al haz IR para marcar cada desplazamiento de λ/2 con precisión absoluta. Cuanto mayor es el recorrido máximo δ_max, más estrechas y resueltas se ven las bandas.',
    physicsLaw: 'Δν̃ ≈ 1 / δ_max = 1 / (2 · Δx_max)',
    userAction: 'Alterna la Resolución Espectral Δν̃ entre 0.5 cm⁻¹ (alta definición) y 16 cm⁻¹ (baja resolución) y observa cómo las bandas estrechas se ensanchan o se separan.',
    keyRule: 'Lograr 0.5 cm⁻¹ exige mover el espejo mucho más lejos (δ_max = 2 cm) y cerrar el J-stop respecto a 4 cm⁻¹ estándar.'
  },
  {
    stepNumber: 4,
    title: '4. Cristal ATR de Diamante & Regla de Selección Dipolar',
    subtitle: 'Onda evanescente micrométrica (~1–2 µm) y vibraciones moleculares',
    icon: Gem,
    accentColor: '#EFC4BF',
    badge: 'Muestra ATR',
    whatHappens: 'Solo vibraciones con cambio de momento dipolar (Δμ ≠ 0) absorben fotones IR según la frecuencia de Hooke del enlace. El cristal de diamante ATR genera una onda evanescente de ~1–2 µm ideal para sólidos y líquidos puros.',
    physicsLaw: 'ν̃ = (1 / 2πc) · √( k_enlace / μ )    |    d_p ∝ λ',
    userAction: 'Alterna entre "ATR Diamante", "Pastilla KBr" y "Ventana Vidrio (Error)". Compara cómo el ATR intensifica las bandas de bajos cm⁻¹ (huella dactilar) frente a KBr.',
    keyRule: 'Si seleccionas Ventana de Vidrio, el espectro cae a 0% Transmitancia debajo de 3,550 cm⁻¹ demostrando por qué se usan sales KBr/NaCl o diamante.'
  },
  {
    stepNumber: 5,
    title: '5. Detector DLATGS, Barridos N & Espectro 4000→400 cm⁻¹',
    subtitle: 'Co-adición de barridos (√N) y Transformada Rápida de Fourier (FFT)',
    icon: Activity,
    accentColor: '#8E3742',
    badge: 'FFT & %T',
    whatHappens: 'El cristal piroeléctrico DLATGS registra dT/dt y el procesador ejecuta la Transformada de Fourier dividendo entre el fondo (Background) para entregar el espectro desde 4000 a 400 cm⁻¹.',
    physicsLaw: 'SNR ∝ √( N_scans )    |    %T(ν̃) = 100 · B_muestra / B_fondo',
    userAction: 'Ajusta el número de barridos (1 a 64), cambia entre % Transmitancia (picos hacia abajo) y Absorbancia, y haz clic en cualquier pico para ver su modo vibracional.',
    keyRule: 'Entre 4000 y 1500 cm⁻¹ identificas los grupos funcionales (O–H, C=O, C≡N); por debajo de 1500 cm⁻¹ yace la huella dactilar única.'
  }
];

export const FtirOnboardingGuide: React.FC<FtirOnboardingGuideProps> = ({
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
              <span className="font-bold uppercase tracking-wider">Protocolo Interferométrico</span>
              <span aria-hidden="true">·</span>
              <span>Paso {currentStep.stepNumber} de {STEPS.length}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#122630]">
              Cómo Funciona el Simulador Infrarrojo Medio (FTIR)
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
            Ecuación Infrarroja Clave:
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
              <span>¡Entendido! Iniciar Simulador FTIR</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
