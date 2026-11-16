import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ASSEMBLY_SPECS, AssemblyStep, InstrumentId } from '../data/assemblyStepsData';
import { Assembly3DCanvas } from './Assembly3DCanvas';
import { clampNumber } from '../utils/safeNumber';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Layers,
  RefreshCw,
  Wrench,
  CheckCircle2,
  Compass,
  ZoomIn,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  MessageSquareText
} from 'lucide-react';

interface InstrumentAssemblyTimelapseProps {
  instrument: InstrumentId;
  onOpenSimulator: () => void;
}

export const InstrumentAssemblyTimelapse: React.FC<InstrumentAssemblyTimelapseProps> = ({
  instrument,
  onOpenSimulator
}) => {
  const spec = ASSEMBLY_SPECS[instrument];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [stepProgress, setStepProgress] = useState<number>(0); // 0..1 drop animation of active step
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.7 | 1 | 2>(1);
  const [explodedView, setExplodedView] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [yawRad, setYawRad] = useState<number>(-0.56);
  const [pitchRad, setPitchRad] = useState<number>(0.48);
  const [zoom, setZoom] = useState<number>(1.0);

  // Voice narration state (100% client-side Web Speech API)
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechDoneForStep, setSpeechDoneForStep] = useState<boolean>(false);
  const [spanishVoice, setSpanishVoice] = useState<SpeechSynthesisVoice | null>(null);
  const speechFallbackTimerRef = useRef<number | null>(null);

  const speechSupported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined';

  // Load best available Spanish voice
  useEffect(() => {
    if (!speechSupported) return;
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;
      const preferred =
        voices.find((v) => v.lang.toLowerCase() === 'es-mx') ||
        voices.find((v) => v.lang.toLowerCase() === 'es-419') ||
        voices.find((v) => v.lang.toLowerCase() === 'es-es') ||
        voices.find((v) => v.lang.toLowerCase().startsWith('es'));
      if (preferred) setSpanishVoice(preferred);
    };
    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', pickVoice);
    };
  }, [speechSupported]);

  const stopSpeech = useCallback(() => {
    if (speechFallbackTimerRef.current !== null) {
      window.clearTimeout(speechFallbackTimerRef.current);
      speechFallbackTimerRef.current = null;
    }
    if (speechSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore browser speech cancel edge cases
      }
    }
    setIsSpeaking(false);
  }, [speechSupported]);

  const speakStep = useCallback(
    (step: AssemblyStep) => {
      stopSpeech();
      if (!voiceEnabled || !speechSupported) {
        setSpeechDoneForStep(true);
        return;
      }

      setSpeechDoneForStep(false);
      const speechRate = playbackSpeed === 0.7 ? 0.9 : playbackSpeed === 2 ? 1.25 : 1.02;
      const estimatedMs = Math.min(7500, Math.max(2400, Math.round((step.voiceScript.length * 66) / speechRate)));

      // Safety fallback timeout so autoplay never stalls if browser blocks TTS autoplay before click
      speechFallbackTimerRef.current = window.setTimeout(() => {
        setIsSpeaking(false);
        setSpeechDoneForStep(true);
      }, estimatedMs);

      try {
        const utterance = new SpeechSynthesisUtterance(step.voiceScript);
        utterance.lang = spanishVoice?.lang || 'es-MX';
        if (spanishVoice) utterance.voice = spanishVoice;
        utterance.rate = speechRate;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
          setIsSpeaking(true);
        };
        utterance.onend = () => {
          if (speechFallbackTimerRef.current !== null) {
            window.clearTimeout(speechFallbackTimerRef.current);
            speechFallbackTimerRef.current = null;
          }
          setIsSpeaking(false);
          setSpeechDoneForStep(true);
        };
        utterance.onerror = () => {
          if (speechFallbackTimerRef.current !== null) {
            window.clearTimeout(speechFallbackTimerRef.current);
            speechFallbackTimerRef.current = null;
          }
          setIsSpeaking(false);
          setSpeechDoneForStep(true);
        };

        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsSpeaking(false);
        setSpeechDoneForStep(true);
      }
    },
    [voiceEnabled, speechSupported, playbackSpeed, spanishVoice, stopSpeech]
  );

  // Stop speech cleanly on unmount
  useEffect(() => {
    return () => stopSpeech();
  }, [stopSpeech]);

  // Reset assembly sequence cleanly whenever user switches instrument
  useEffect(() => {
    stopSpeech();
    setCurrentStepIndex(0);
    setStepProgress(0);
    setSpeechDoneForStep(false);
    setIsPlaying(true);
    setExplodedView(false);
  }, [instrument, stopSpeech]);

  const activeStep = spec.steps[currentStepIndex] || spec.steps[0];

  // Trigger narration whenever active step changes while voice is enabled
  useEffect(() => {
    if (!voiceEnabled) {
      stopSpeech();
      setSpeechDoneForStep(true);
      return;
    }
    speakStep(activeStep);
  }, [currentStepIndex, instrument, voiceEnabled, speakStep, stopSpeech, activeStep]);

  // Timelapse animation loop: drops active part (0 -> 1) and rotates 3D stage
  useEffect(() => {
    let rafId: number;
    let lastTs = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.06, (now - lastTs) / 1000);
      lastTs = now;

      if (autoRotate) {
        setYawRad((prev) => prev + dt * 0.28);
      }

      setStepProgress((prev) => {
        if (prev < 1) {
          const next = prev + dt * 0.72 * playbackSpeed;
          return next >= 1 ? 1 : next;
        }
        return 1;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [playbackSpeed, autoRotate]);

  // Step auto-advancement waits for BOTH 3D drop-in (stepProgress >= 1) AND voice narration finish
  useEffect(() => {
    if (!isPlaying || stepProgress < 1) return;
    if (voiceEnabled && !speechDoneForStep) return;

    if (currentStepIndex >= spec.steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const dwellMs = voiceEnabled ? Math.round(520 / playbackSpeed) : Math.round(950 / playbackSpeed);
    const timer = window.setTimeout(() => {
      setSpeechDoneForStep(false);
      setCurrentStepIndex((prev) => Math.min(spec.steps.length - 1, prev + 1));
      setStepProgress(0);
    }, dwellMs);

    return () => window.clearTimeout(timer);
  }, [
    isPlaying,
    stepProgress,
    speechDoneForStep,
    voiceEnabled,
    currentStepIndex,
    spec.steps.length,
    playbackSpeed
  ]);

  const handleSelectStep = (idx: number) => {
    setSpeechDoneForStep(false);
    setCurrentStepIndex(idx);
    setStepProgress(0);
    setIsPlaying(false);
  };

  const handlePrevStep = () => {
    const nextIdx = Math.max(0, currentStepIndex - 1);
    setSpeechDoneForStep(false);
    setCurrentStepIndex(nextIdx);
    setStepProgress(0);
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    const nextIdx = Math.min(spec.steps.length - 1, currentStepIndex + 1);
    setSpeechDoneForStep(false);
    setCurrentStepIndex(nextIdx);
    setStepProgress(0);
    setIsPlaying(false);
  };

  const handleRestartTimelapse = () => {
    stopSpeech();
    setSpeechDoneForStep(false);
    setCurrentStepIndex(0);
    setStepProgress(0);
    setExplodedView(false);
    setIsPlaying(true);
    if (voiceEnabled) {
      speakStep(spec.steps[0]);
    }
  };

  const handleTogglePlay = () => {
    if (currentStepIndex >= spec.steps.length - 1 && stepProgress >= 1) {
      handleRestartTimelapse();
      return;
    }
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
    if (!nextPlay) {
      stopSpeech();
    } else if (voiceEnabled) {
      speakStep(activeStep);
    }
  };

  const handleToggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    if (!next) {
      stopSpeech();
      setSpeechDoneForStep(true);
    } else {
      speakStep(activeStep);
    }
  };

  const handleCenterCamera = () => {
    setYawRad(-0.56);
    setPitchRad(0.48);
    setZoom(1.0);
  };

  const handleDragRotate = (dYaw: number, dPitch: number) => {
    setAutoRotate(false);
    setYawRad((prev) => prev + dYaw);
    setPitchRad((prev) => Math.max(0.18, Math.min(1.05, prev + dPitch)));
  };

  const progressPercent = Math.round(((currentStepIndex + stepProgress) / spec.steps.length) * 100);
  const isAssemblyComplete = currentStepIndex === spec.steps.length - 1 && stepProgress >= 1;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Secuencia de Ensamble Mecánico 3D</span>
            <span aria-hidden="true">·</span>
            <span>{spec.manufacturerRef}</span>
            <span aria-hidden="true">·</span>
            <span>{spec.totalSteps} Capas Constructivas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Ensamble Completo Paso a Paso: {spec.instrumentName}
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            {spec.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleToggleVoice}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm ${
              voiceEnabled
                ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D] hover:bg-[#6A826B]'
                : 'bg-[#FAF7EE] text-[#122630] border-[#E2D7BB] hover:bg-[#EFE8D3]'
            }`}
            title={speechSupported ? 'Activar o silenciar voz narradora en español' : 'Narración de voz no disponible en este navegador'}
          >
            {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-[#8E3742]" />}
            <span>{voiceEnabled ? 'Voz Activa' : 'Voz Silenciada'}</span>
          </button>

          <button
            onClick={handleRestartTimelapse}
            className="px-3.5 py-2 text-xs font-medium text-[#122630] bg-[#FAF7EE] hover:bg-[#EFE8D3] border border-[#E2D7BB] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8E3742]" />
            <span>Reiniciar Ensamble</span>
          </button>

          <button
            onClick={handleTogglePlay}
            className="px-4 py-2 text-xs font-semibold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pausar Ensamble' : 'Reproducir Ensamble'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Stage: 3D CAD Viewport + Blueprint Step Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3D Isometric Interactive Assembly Viewport (8 cols) */}
        <div className="lg:col-span-8 bg-[#0C1A22] rounded-2xl border border-[#1C3947] p-4 shadow-xl space-y-3">
          {/* Top Camera & Playback Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#1C3947] text-xs font-mono">
            <div className="flex items-center gap-2 text-[#FAF7EE]">
              <Wrench className="w-4 h-4 text-[#EFC4BF]" />
              <span className="font-bold">
                Paso {currentStepIndex + 1} de {spec.totalSteps}:
              </span>
              <span className="text-[#7C957D] tabular-nums">{progressPercent}% ensamblado</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {/* Speed Selector */}
              <div className="flex items-center bg-[#122630] rounded-lg p-0.5 border border-[#1C3947]">
                {([0.7, 1, 2] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${
                      playbackSpeed === spd
                        ? 'bg-[#8E3742] text-[#FAF7EE]'
                        : 'text-[#A9C2D2] hover:text-[#FAF7EE]'
                    }`}
                  >
                    {spd}×
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  if (!voiceEnabled) {
                    setVoiceEnabled(true);
                  } else {
                    speakStep(activeStep);
                  }
                }}
                disabled={!speechSupported}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#122630] text-[#EFC4BF] hover:bg-[#1C3947] disabled:opacity-40 border border-[#1C3947] flex items-center gap-1 cursor-pointer"
                title="Escuchar nuevamente la narración de esta pieza"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Repetir Voz</span>
              </button>

              <button
                onClick={() => setExplodedView(!explodedView)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer border transition-colors ${
                  explodedView
                    ? 'bg-[#EFC4BF] text-[#122630] border-[#EFC4BF]'
                    : 'bg-[#122630] text-[#A9C2D2] hover:text-[#FAF7EE] border-[#1C3947]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Vista Explosiva</span>
              </button>

              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer border transition-colors ${
                  autoRotate
                    ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
                    : 'bg-[#122630] text-[#A9C2D2] hover:text-[#FAF7EE] border-[#1C3947]'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Auto-Rotar</span>
              </button>

              <button
                onClick={handleCenterCamera}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#122630] text-[#A9C2D2] hover:text-[#FAF7EE] border border-[#1C3947] flex items-center gap-1 cursor-pointer"
                title="Centrar vista isométrica"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Centrar</span>
              </button>
            </div>
          </div>

          {/* 3D Isometric Interactive Canvas */}
          <Assembly3DCanvas
            instrumentId={instrument}
            steps={spec.steps}
            currentStepIndex={currentStepIndex}
            stepTransitionProgress={stepProgress}
            explodedView={explodedView}
            yawRad={yawRad}
            pitchRad={pitchRad}
            zoom={zoom}
            onDragRotate={handleDragRotate}
          />

          {/* Live Voice Narration Caption Strip */}
          <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#122630] border border-[#1C3947] text-xs">
            <div className="mt-0.5 shrink-0">
              {voiceEnabled ? (
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-[#EFC4BF] animate-pulse' : 'text-[#7C957D]'}`} />
              ) : (
                <MessageSquareText className="w-4 h-4 text-[#A9C2D2]" />
              )}
            </div>
            <div className="flex-1 leading-relaxed">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#A9C2D2] mr-2">
                {voiceEnabled
                  ? isSpeaking
                    ? 'Narrando pieza en vivo:'
                    : 'Narración del paso:'
                  : 'Guía escrita (voz silenciada):'}
              </span>
              <span className="text-[#FAF7EE] font-medium">{activeStep.voiceScript}</span>
            </div>
          </div>

          {/* Step Scrubber & Zoom Bar */}
          <div className="space-y-3 pt-1">
            {/* 10-Step Progress Track */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {spec.steps.map((st, idx) => {
                const isDone = idx < currentStepIndex || (idx === currentStepIndex && stepProgress >= 1);
                const isCurrent = idx === currentStepIndex;
                return (
                  <button
                    key={st.partKey}
                    onClick={() => handleSelectStep(idx)}
                    title={st.title}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer border text-center ${
                      isCurrent
                        ? 'bg-[#8E3742] text-[#FAF7EE] border-[#EFC4BF] shadow-sm'
                        : isDone
                        ? 'bg-[#7C957D]/30 text-[#FAF7EE] border-[#7C957D]'
                        : 'bg-[#122630] text-[#A9C2D2] border-[#1C3947] hover:border-[#A9C2D2]'
                    }`}
                  >
                    P{st.stepNumber}
                  </button>
                );
              })}
            </div>

            {/* Bottom Navigation & Zoom Slider */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-[#122630] hover:bg-[#1C3947] disabled:opacity-40 text-[#FAF7EE] text-xs font-semibold flex items-center gap-1 cursor-pointer border border-[#1C3947]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={currentStepIndex === spec.steps.length - 1}
                  className="px-3.5 py-1.5 rounded-lg bg-[#8E3742] hover:bg-[#742B34] disabled:opacity-40 text-[#FAF7EE] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Siguiente Paso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#A9C2D2]">
                <ZoomIn className="w-3.5 h-3.5 text-[#EFC4BF]" />
                <span>Zoom 3D:</span>
                <input
                  type="range"
                  min={0.65}
                  max={1.45}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(clampNumber(e.target.value, 0.65, 1.45))}
                  className="w-28 accent-[#8E3742]"
                  aria-label="Zoom del modelo 3D"
                />
                <span className="text-[#FAF7EE] tabular-nums w-10 text-right">{zoom.toFixed(2)}×</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Active Step Blueprint Card + 10-Step Sequence List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Step Card */}
          <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 space-y-4 shadow-md">
            <div className="space-y-1 border-b border-[#E2D7BB] pb-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#8E3742]">
                <span className="font-bold uppercase">{activeStep.subsystem}</span>
                <span className="text-[#7C957D] font-bold">
                  Paso {activeStep.stepNumber} / {spec.totalSteps}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#122630] leading-snug">
                {activeStep.title}
              </h3>
            </div>

            {/* Physical Hardware Reference Image */}
            <div className="relative h-40 rounded-xl overflow-hidden border border-[#E2D7BB] bg-[#0C1A22]">
              <img
                src={activeStep.imageSrc}
                alt={activeStep.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 text-[11px] font-mono text-[#EFC4BF] font-semibold leading-tight">
                {activeStep.actionSummary}
              </div>
            </div>

            {/* Fasteners & Why Order Matters */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] space-y-1">
                <div className="font-bold text-[#8E3742] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Fijación y Sellado Mecánico:</span>
                </div>
                <p className="text-[#122630] leading-relaxed font-mono text-[11px]">
                  {activeStep.fastenersOrSeals}
                </p>
              </div>

              <div className="p-3 bg-[#F2F6F2] rounded-xl border border-[#DFE8DF] space-y-1">
                <div className="font-bold text-[#4F6450] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C957D]" />
                  <span>¿Por qué se instala en este momento?</span>
                </div>
                <p className="text-[#1C3947] leading-relaxed">
                  {activeStep.whyThisOrder}
                </p>
              </div>
            </div>

            {isAssemblyComplete && (
              <div className="p-3.5 rounded-xl bg-[#EAF2EA] border border-[#7C957D] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2F4F31]">
                  <CheckCircle2 className="w-4 h-4 text-[#7C957D] shrink-0" />
                  <span>¡Equipo 100% ensamblado y operativo!</span>
                </div>
                <button
                  onClick={onOpenSimulator}
                  className="w-full py-2.5 px-4 bg-[#7C957D] hover:bg-[#6A826B] text-[#FAF7EE] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Probar Equipo en el Simulador en Vivo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Interactive 10-Step Sequence Checklist */}
          <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-4 space-y-2 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#122630] border-b border-[#E2D7BB] pb-2">
              Orden de Montaje Completo ({spec.totalSteps} etapas)
            </h4>
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {spec.steps.map((st, idx) => {
                const isDone = idx < currentStepIndex || (idx === currentStepIndex && stepProgress >= 1);
                const isCurrent = idx === currentStepIndex;
                return (
                  <button
                    key={st.partKey}
                    onClick={() => handleSelectStep(idx)}
                    className={`w-full text-left px-3 py-2 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer text-xs ${
                      isCurrent
                        ? 'bg-[#122630] text-[#FAF7EE] border-[#8E3742] font-semibold'
                        : isDone
                        ? 'bg-[#FFFDF9] text-[#122630] border-[#DFE8DF] hover:border-[#7C957D]'
                        : 'bg-[#FFFDF9]/60 text-[#1C3947]/70 border-[#E2D7BB] hover:border-[#8E3742]'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        isCurrent
                          ? 'text-[#EFC4BF]'
                          : isDone
                          ? 'text-[#7C957D]'
                          : 'text-[#E2D7BB]'
                      }`}
                    />
                    <span className="truncate">{st.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
