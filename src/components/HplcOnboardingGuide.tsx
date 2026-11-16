import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Droplets,
  Gauge,
  GitCommitHorizontal,
  Layers,
  Activity,
  CheckCircle2,
  X,
  BookOpen
} from 'lucide-react';

interface HplcOnboardingGuideProps {
  onClose?: () => void;
  onStartSimulation: () => void;
}

interface HplcStepInfo {
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

const STEPS: HplcStepInfo[] = [
  {
    stepNumber: 1,
    title: '1. Desgasificación & Proporción de Fase Móvil (%A / %B)',
    subtitle: 'Agua purificada (A) + Acetonitrilo modificador (B)',
    icon: Droplets,
    accentColor: '#A9C2D2',
    badge: 'Fase Móvil',
    whatHappens: 'Los solventes cruzan un desgasificador al vacío de Teflon AF (Ley de Henry) y se mezclan según la fracción orgánica %B. En fase reversa C18, mayor %B vuelve más fuerte y rápida la elución.',
    physicsLaw: 'log k\' = log k_w − S · φ_B',
    userAction: 'Selecciona cualquiera de las 12 familias (analgésicos, vitaminas, esteroides, pesticidas, plaguicidas) y mueve el deslizador "%B Acetonitrilo" para ver cómo se adelantan o separan los picos.',
    keyRule: 'Subir %B acelera los analitos hidrofóbicos; si es excesivo, los picos coeluyen sin separarse cerca de t₀.'
  },
  {
    stepNumber: 2,
    title: '2. Bomba Binaria de Alta Presión & Ley de Darcy',
    subtitle: 'Impulsión estable hasta 1,300 bar a través del lecho empacado',
    icon: Gauge,
    accentColor: '#8E3742',
    badge: 'Alta Presión',
    whatHappens: 'Los pistones de zafiro comprimen el líquido contra la resistencia hidráulica de millones de microesferas porosas de sílice (1.8–5.0 µm), manteniendo un caudal F constante en mL/min.',
    physicsLaw: 'ΔP = (Φ · η · L · u) / d_p²',
    userAction: 'Cambia el tamaño de partícula d_p entre 1.8 µm UHPLC y 5.0 µm Clásica o sube el Caudal F y observa el salto cuadrático en la contrapresión ΔP (bar).',
    keyRule: 'Reducir d_p a la mitad cuadruplica la presión ΔP necesaria, mientras calentar el horno reduce la viscosidad η.'
  },
  {
    stepNumber: 3,
    title: '3. Válvula Rotatoria de 6 Vías & Inyección',
    subtitle: 'Inserción de microlitros sin detener los cientos de bares',
    icon: GitCommitHorizontal,
    accentColor: '#EFC4BF',
    badge: 'Inyección 6 Vías',
    whatHappens: 'Un bucle calibrado introduce un tapón estrecho de mezcla al flujo de alta presión en el instante t = 0 min, minimizando la dispersión extra-columna.',
    physicsLaw: 't₀ = V_m / F',
    userAction: 'Pulsa "Reiniciar Corrida" para inyectar un nuevo tapón y observa el frente de solvente no retenido marcando el tiempo muerto t₀.',
    keyRule: 'Ninguna molécula retenida en la columna puede salir antes del tiempo muerto t₀.'
  },
  {
    stepNumber: 4,
    title: '4. Reparto en Columna C18 & Ecuación de Van Deemter',
    subtitle: 'Competencia hidrofóbica entre cadenas C18 y fase móvil',
    icon: Layers,
    accentColor: '#7C957D',
    badge: 'Columna C18',
    whatHappens: 'Las moléculas polares viajan rápido con el solvente acuoso; las apolares quedan retenidas temporalmente en las cadenas octadecilo C18. La eficiencia en platos N depende de la velocidad lineal u y d_p.',
    physicsLaw: 'H = A + B/u + C·u    |    N = L / H',
    userAction: 'Observa las bandas de colores migrar a velocidades distintas dentro del tubo C18 y ajusta la Temperatura del Horno (20–70 °C) para afinar viscosidad y anchura de pico.',
    keyRule: 'Partículas sub-2 µm (1.8 µm) generan más de 25,000 platos teóricos N, produciendo picos agudos y estrechos.'
  },
  {
    stepNumber: 5,
    title: '5. Detector DAD en Celda Z & Cromatograma R_s',
    subtitle: 'Absorbancia UV continua frente al tiempo de retención t_R',
    icon: Activity,
    accentColor: '#8E3742',
    badge: 'Cromatograma',
    whatHappens: 'Cada banda química cruza la celda óptica Z generando un pico gaussiano proporcional a su concentración según Beer-Lambert. La resolución R_s evalúa si dos picos vecinos están completamente separados.',
    physicsLaw: 'R_s = ¼ · ((α − 1)/α) · √N · (k / (1 + k)) ≥ 1.5',
    userAction: 'Haz clic en cualquier pico del cromatograma para inspeccionar t_R, k\', ancho base w_b y λ_max UV. Intenta lograr R_s ≥ 1.5 (separación a línea base).',
    keyRule: 'El botón "Usar %B Óptimo" calibra automáticamente el método farmacopeico ideal para cada muestra.'
  }
];

export const HplcOnboardingGuide: React.FC<HplcOnboardingGuideProps> = ({
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
              <span className="font-bold uppercase tracking-wider">Protocolo Cromatográfico</span>
              <span aria-hidden="true">·</span>
              <span>Paso {currentStep.stepNumber} de {STEPS.length}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#122630]">
              Cómo Funciona el Simulador HPLC / UHPLC
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
            Ecuación Cromatográfica Clave:
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
              <span>¡Entendido! Iniciar Simulador HPLC</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
