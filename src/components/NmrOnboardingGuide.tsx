import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Play,
  FlaskConical,
  Magnet,
  SlidersHorizontal,
  Radio,
  Activity,
  CheckCircle2,
  X,
  BookOpen
} from 'lucide-react';

interface NmrOnboardingGuideProps {
  onClose?: () => void;
  onStartSimulation: () => void;
}

interface NmrStepInfo {
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

const STEPS: NmrStepInfo[] = [
  {
    stepNumber: 1,
    title: '1. Tubo de 5 mm, Solvente Deuterado & Canal ²H Lock',
    subtitle: 'Aislamiento diamagnético del analito sin fondo protónico',
    icon: FlaskConical,
    accentColor: '#7C957D',
    badge: 'Solvente & Lock',
    whatHappens: 'La muestra orgánica se disuelve en ~0.6 mL de CDCl₃, DMSO-d₆ o D₂O dentro de un tubo calibrado de 5 mm. El deuterio (²H) resuena en otra frecuencia para bloquear el campo magnético y deja limpia la ventana de protones ¹H.',
    physicsLaw: 'N_α / N_β = exp( γ·ħ·B₀ / k_B·T )',
    userAction: 'Explora las 12 familias químicas (120 compuestos) y alterna entre "Solvente Deuterado" y "H₂O No Deuterado (Error)" para ver cómo el agua normal inunda el espectro en 4.79 ppm.',
    keyRule: 'Nunca uses agua o solventes comunes sin deuterio ni recipientes ferromagnéticos cerca del imán superconductor.'
  },
  {
    stepNumber: 2,
    title: '2. Imán Superconductor B₀ & Frecuencia de Larmor ν₀',
    subtitle: 'Efecto Zeeman nuclear entre 60 MHz (1.4 T) y 800 MHz (18.8 T)',
    icon: Magnet,
    accentColor: '#8E3742',
    badge: 'Campo B₀',
    whatHappens: 'El solenoide inmerso en helio líquido a 4.2 K genera un campo estático vertical B₀ que hace precesar los espines nucleares ¹H a ν₀ = 42.577 MHz/T, dispersando sus desplazamientos químicos en Hz.',
    physicsLaw: 'ν₀ = (γ / 2π) · B₀    |    SNR ∝ B₀^(3/2)',
    userAction: 'Cambia la frecuencia del equipo entre 60, 300, 400, 600 y 800 MHz. Observa cómo dobletes y multipletes apretados a 60 MHz se separan nítidamente a 600–800 MHz.',
    keyRule: 'Mientras la constante J (Hz) es fija para cada molécula, la separación δ (ppm) en Hz crece proporcionalmente con el campo B₀.'
  },
  {
    stepNumber: 3,
    title: '3. Bobinas Shim (Homogeneidad < 1 ppb) & Relajación T₂*',
    subtitle: 'Alineación micrométrica de B₀ para resolver multipletes',
    icon: SlidersHorizontal,
    accentColor: '#A9C2D2',
    badge: 'Shimming',
    whatHappens: 'Hasta 36 bobinas resistivas corrigen inhomogeneidades espaciales ΔB₀ a partes por billón. Si B₀ no es uniforme, el tiempo efectivo T₂* colapsa y el FID muere antes de codificar las frecuencias finas.',
    physicsLaw: 'Δν₁/₂ = 1 / (π · T₂*) = 1/(π·T₂) + (γ · ΔB₀) / (2π)',
    userAction: 'Alterna entre "Shims Óptimos (0.5 Hz)" y "Sin Shim (18 Hz)" y observa el impacto inmediato tanto en la duración del FID S(t) como en la nitidez de los tripletes y cuartetes.',
    keyRule: 'Sin un buen shimming, la estructura fina (acoplamientos J de 2 a 8 Hz) desaparece convirtiéndose en campanas anchas.'
  },
  {
    stepNumber: 4,
    title: '4. Pulso RF de 90° en la Sonda & Captación de Señal FID',
    subtitle: 'Inclinación de M₀ al plano X–Y y acumulación de N barridos',
    icon: Radio,
    accentColor: '#EFC4BF',
    badge: 'Pulso RF & FID',
    whatHappens: 'La bobina en silla de montar emite un pulso corto (~10 µs) de radiofrecuencia que rota el vector M₀ 90° hacia el plano X–Y. Los núcleos precesan induciendo una onda amortiguada FID promediada sobre N_scans.',
    physicsLaw: 'S(t) = Σ I_k · cos(2π·Δν_k·t) · exp(−t / T₂*)    |    SNR ∝ √N',
    userAction: 'Pulsa "Nuevo Pulso 90°" para observar la inclinación del vector M en la cámara del imán y ajusta N_scans (1–64) para limpiar el ruido basal del FID.',
    keyRule: 'A diferencia del escaneo lento de ondas continuas, un pulso duro corto excita todos los protones de la muestra al mismo tiempo.'
  },
  {
    stepNumber: 5,
    title: '5. Transformada FFT, Escala δ (ppm) y Regla (n + 1)',
    subtitle: 'Lectura universal descendente desde 12.5 ppm hasta 0.00 ppm (TMS)',
    icon: Activity,
    accentColor: '#8E3742',
    badge: 'Espectro ¹H',
    whatHappens: 'La Transformada de Fourier convierte el FID en el espectro ¹H RMN normalizado frente al TMS (0.00 ppm). Cada pico aporta su entorno electrónico (δ), conteo de protones (integral) y vecinos (n + 1).',
    physicsLaw: 'δ (ppm) = [ (ν_muestra − ν_TMS) / ν₀ ] × 10⁶    |    Picos = n + 1',
    userAction: 'Activa o desactiva la referencia TMS 0.00 ppm y haz clic en cualquier señal del espectro para inspeccionar su desplazamiento δ, integral, multiplicidad y constante J.',
    keyRule: 'Los grupos desapantallados (–COOH, –CHO, Ar–H) aparecen a campo bajo (izquierda, 12–6.5 ppm) y los alifáticos saturados a la derecha (2–0 ppm).'
  }
];

export const NmrOnboardingGuide: React.FC<NmrOnboardingGuideProps> = ({
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
              <span className="font-bold uppercase tracking-wider">Protocolo Cuántico RMN</span>
              <span aria-hidden="true">·</span>
              <span>Paso {currentStep.stepNumber} de {STEPS.length}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#122630]">
              Cómo Funciona el Simulador de Resonancia Magnética Nuclear (¹H RMN)
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
            Ecuación de Resonancia Nuclear Clave:
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
              <span>¡Entendido! Iniciar Simulador RMN</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
