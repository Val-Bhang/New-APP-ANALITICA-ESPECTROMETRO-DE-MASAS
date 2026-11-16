import { IMAGES } from '../assets/images';
import { ManufacturerTech, InstrumentGalleryItem } from './spectrometryData';

export const NMR_MANUFACTURERS: ManufacturerTech[] = [
  {
    id: 'bruker',
    name: 'Bruker BioSpin',
    country: 'Alemania / Suiza',
    specialty: 'Imanes Superconductores Ascend™ hasta 1.2 GHz (28.2 T), Sondas Criogénicas CryoProbe™ y Consola Avance Neo',
    flagshipSeries: 'Bruker Avance Neo 400–1200 MHz & Fourier 80',
    keyInnovations: [
      {
        title: 'Imán Superconductor Ascend™ Ultra-Blindado (9.4 a 28.2 Tesla)',
        description: 'Bobinados híbridos de NbTi y Nb₃Sn en helio líquido a 4.2 K con compensación activa de campo disperso.',
        impact: 'Permite frecuencias de Larmor desde 400 hasta 1,200 MHz dispersando señales superpuestas en proteínas y productos naturales complejos.'
      },
      {
        title: 'Sonda Criogénica CryoProbe™ Prodigy (15–25 K)',
        description: 'Las bobinas receptoras RF y los preamplificadores se enfrían con helio o nitrógeno gaseoso cerca de los 20 K mientras la muestra sigue a 298 K.',
        impact: 'Reduce drásticamente el ruido térmico de Johnson-Nyquist, multiplicando la relación señal-ruido por 3x–4x (reduciendo el tiempo experimental hasta 16 veces).'
      },
      {
        title: 'Automuestreador SampleCase™ / SampleJet™ con Turbina Neumática',
        description: 'Inserta suavemente tubos de 5 mm sobre un colchón de aire comprimido logrando rotación estable a 20 Hz.',
        impact: 'Promedia pequeñas inhomogeneidades radiales en el plano X–Y logrando líneas espectrales más estrechas que 0.35 Hz.'
      },
      {
        title: 'Consola Digital Multi-Canal Avance™ Neo y TopSpin®',
        description: 'Transceptor RF modular con generación de formas de pulso de nanosegundos, sobremuestreo ADC y bloqueo automático por deuterio ²H.',
        impact: 'Ejecuta secuencias 1D y 2D (COSY, HSQC, HMBC) totalmente automatizadas con fase y línea base calibradas.'
      }
    ]
  },
  {
    id: 'agilent',
    name: 'Agilent Technologies (Varian NMR)',
    country: 'Estados Unidos',
    specialty: 'Arquitectura DirectDrive™ 2, Sonda Automática OneNMR™ y Sondas de Microflujo de Alta Sensibilidad',
    flagshipSeries: 'Agilent DD2 400–800 MHz & ProPulse / OneNMR',
    keyInnovations: [
      {
        title: 'Consola DirectDrive™ 2 con Síntesis Digital RF Directa',
        description: 'Genera pulsos de radiofrecuencia y digitaliza el FID directamente mediante FPGA de alta velocidad sin etapas analógicas intermedias.',
        impact: 'Asegura estabilidad de fase sub-grado en experimentos multidimensionales y supresión precisa de señales intensas de agua (PRESAT / WET).'
      },
      {
        title: 'Sonda Multinuclear OneNMR™ con Sintonización Automática ProTune™',
        description: 'Cabezal de bobina dual sintonizable motorizadamente entre ¹H/¹⁹F y todos los heteronúcleos desde ¹⁵N hasta ³¹P.',
        impact: 'Cambia entre espectros ¹H, ¹³C{¹H}, ¹⁹F y ³¹P en segundos sin retirar la sonda del imán superconductor.'
      },
      {
        title: 'Imanes PremiumCOMPACT™ Ultra-Escudados de Bajo Consumo Criogénico',
        description: 'Blindaje magnético de mínima huella con cámara aislada al alto vacío que supera el año entre recargas de helio líquido.',
        impact: 'Reduce la línea de 5 Gauss permitiendo instalar sistemas de 500–600 MHz en laboratorios estándar.'
      },
      {
        title: 'Mapeo Gradiente Tridimensional PFGs y Autoshim 3D',
        description: 'Bobinas de gradiente de campo pulsado integradas para mapear y corregir automáticamente hasta 36 términos esféricos de homogeneidad B₀.',
        impact: 'Garantiza picos simétricos sin hombros ("spinning sidebands") incluso al cambiar de solvente (CDCl₃ → DMSO-d₆).'
      }
    ]
  },
  {
    id: 'shimadzu',
    name: 'Shimadzu Corporation',
    country: 'Japón',
    specialty: 'Flujos Integrados Q-NMR Cuantitativo Farmacopeico, Acoplamiento LC-SPE-NMR-MS y Validación Analítica',
    flagshipSeries: 'Flujos LabSolutions / LC-NMR-MS & Estandarización Q-NMR',
    keyInnovations: [
      {
        title: 'Metodología Cuantitativa qNMR Trazable sin Estándar Idéntico',
        description: 'Aprovecha que el área integral de cada señal en RMN ¹H es estrictamente proporcional al número de protones y concentración molar.',
        impact: 'Permite determinar pureza absoluta farmacéutica usando materiales de referencia primarios certificados NIST independientemente de la estructura química.'
      },
      {
        title: 'Acoplamiento Híbrido UHPLC-DAD-SPE-NMR-MS',
        description: 'Aísla picos cromatográficos mediante cartuchos de fase sólida (SPE), los seca con N₂ y los eluye con solvente deuterado hacia la celda de flujo RMN.',
        impact: 'Combina la masa exacta de un espectrómetro MS con la conectividad atómica inequívoca del RMN para metabolitos en trazas.'
      },
      {
        title: 'Automatización de Control de Calidad de Polímeros y Aceites',
        description: 'Integración de librerías estructurales que determinan tacticidad, índice de yodo, grado de ramificación y mezclas farmacéuticas.',
        impact: 'Elimina ensayos húmedos destructivos conservando intacta la muestra en el tubo de 5 mm para análisis posteriores.'
      },
      {
        title: 'Protocolos Multi-Instrumento Armonizados (MS + FTIR + UV + RMN)',
        description: 'Ecosistema analítico integrado donde la fórmula molecular del MS, los grupos funcionales del FTIR y el esqueleto hidrocarbonado del RMN convergen.',
        impact: 'Resuelve la elucidación estructural completa de moléculas orgánicas desconocidas con certeza cercana al 100%.'
      }
    ]
  }
];

export interface NmrPart {
  id: string;
  name: string;
  shortRole: string;
  category: 'Muestra & Lock' | 'Criostato' | 'Imán B₀' | 'Homogeneidad Shim' | 'Sonda RF' | 'Consola FID' | 'Procesamiento FFT';
  manufacturerInspiration: string;
  svgRegion: {
    cx: number;
    cy: number;
    width: number;
    height: number;
    zoomLevel: number;
  };
  whatItIs: string;
  whatItDoes: string;
  whyItDoesIt: string;
  theoreticalReasoning: {
    headline: string;
    physicsPrinciples: string[];
    equations: {
      formula: string;
      description: string;
      variables: { symbol: string; name: string; unit: string }[];
    }[];
    deepExplanation: string;
    keyTakeaway: string;
  };
  interactiveSimulationType:
    | 'sample_spinner_tube'
    | 'cryostat_dewar'
    | 'superconducting_magnet'
    | 'shim_coils'
    | 'rf_probe_coil'
    | 'rf_console_adc'
    | 'fft_nmr_processor';
}

export const NMR_PARTS: NmrPart[] = [
  {
    id: 'sample_spinner_tube',
    name: '1. Tubo de Borosilicato (5 mm), Solvente Deuterado y Turbina de Aire',
    shortRole: 'Contención diamagnética en solvente sin ¹H (CDCl₃, DMSO-d₆) y rotación neumática de 20 Hz',
    category: 'Muestra & Lock',
    manufacturerInspiration: 'SampleJet™ Bruker & Automuestreador Neumático Agilent RMN',
    svgRegion: {
      cx: 115,
      cy: 215,
      width: 145,
      height: 155,
      zoomLevel: 2.1,
    },
    whatItIs: 'Tubo cilíndrico de vidrio borosilicato calibrado de 5 mm montado en una turbina polimérica (PEEK/POM) impulsada por aire comprimido hacia el centro magnético vertical del imán.',
    whatItDoes: 'Disuelve unos miligramos de muestra en ~0.6 mL de solvente deuterado (CDCl₃, DMSO-d₆ o D₂O) y hace girar el tubo sobre su eje vertical a ~20 revoluciones por segundo.',
    whyItDoesIt: 'Si se usara un solvente normal con ¹H (como CHCl₃ o H₂O), su señal gigante (~110 M de protones) saturaría el receptor ADC ocultando al analito (~10 mM). Además, el deuterio (²H) sirve como señal de referencia para el canal Lock y el giro rápido promedia pequeñas variaciones radiales del campo.',
    theoreticalReasoning: {
      headline: 'Distribución de Boltzmann Nuclear y Eliminación del Fondo de Solvente',
      physicsPrinciples: [
        'Los núcleos con número cuántico de espín I = 1/2 (¹H, ¹³C, ¹⁹F, ³¹P) poseen un momento magnético μ = γ·I que se alinea paralelo (estado α, menor energía) o antiparalelo (estado β) al campo externo B₀.',
        'La diferencia de energía ΔE entre α y β es diminuta (~10⁻⁵ eV), por lo que la población en exceso (ΔN/N) según Boltzmann es apenas ~1 en 100,000 núcleos a temperatura ambiente.',
        'Reemplazar ¹H por ²H (deuterio) desplaza la resonancia del solvente a otra banda de frecuencia (61.4 MHz en un equipo de 400 MHz), dejando limpia la ventana protónica.'
      ],
      equations: [
        {
          formula: 'ΔE = h · ν₀ = (γ · h / 2π) · B₀    |    N_α / N_β = exp( ΔE / k_B · T )',
          description: 'Brecha energética Zeeman nuclear y razón térmica de poblaciones de espín de Boltzmann.',
          variables: [
            { symbol: 'γ', name: 'Razón giromagnética (¹H = 2.675×10⁸)', unit: 'rad/(s·T)' },
            { symbol: 'B₀', name: 'Inducción magnética estática', unit: 'Tesla (1.4–28.2 T)' },
            { symbol: 'k_B·T', name: 'Energía térmica ambiental (298 K)', unit: 'J (~4.11×10⁻²¹)' }
          ]
        }
      ],
      deepExplanation: 'El vidrio paramagnético o recipientes metálicos ferromagnéticos perturbarían catastróficamente la uniformidad de B₀ y serían atraídos violentamente dentro del núcleo del imán.',
      keyTakeaway: 'El solvente deuterado evita saturar el detector y proporciona la señal ²H de bloqueo magnético, mientras la turbina promedia imperfecciones radiales.'
    },
    interactiveSimulationType: 'sample_spinner_tube'
  },
  {
    id: 'cryostat_dewar',
    name: '2. Criostato Dewar Anidado (Nitrógeno Líquido 77 K y Helio Líquido 4.2 K)',
    shortRole: 'Aislamiento térmico multicapa al vacío que mantiene las bobinas debajo de su temperatura crítica',
    category: 'Criostato',
    manufacturerInspiration: 'Criostatos de Larga Autonomía Bruker Ascend™ & Agilent PremiumCOMPACT™',
    svgRegion: {
      cx: 265,
      cy: 145,
      width: 130,
      height: 115,
      zoomLevel: 2.2,
    },
    whatItIs: 'Termo cilíndrico de doble cámara de acero inoxidable austenítico (no magnético) sellado al alto vacío con escudo térmico externo de nitrógeno líquido (77 K) y recipiente interno de helio líquido (4.2 K).',
    whatItDoes: 'Mantiene sumergido el solenoide superconductor a 4.2 Kelvin (−269 °C) de manera ininterrumpida durante años, evitando que entre calor por conducción o radiación.',
    whyItDoesIt: 'Los superconductores NbTi y Nb₃Sn solo pierden toda resistencia eléctrica por debajo de su temperatura crítica (9.2–18 K). Si el helio se evaporara por falta de vacío o nitrógeno, ocurriría un "quench" (transición súbita a estado resistivo), liberando megajulios de calor y apagando el imán.',
    theoreticalReasoning: {
      headline: 'Superconductividad Tipo II y Aislamiento Criogénico Multicapa',
      physicsPrinciples: [
        'Por debajo de T_c = 4.2 K, los electrones forman pares de Cooper que fluyen sin dispersión reticular (resistencia R = 0 Ω).',
        'El escudo de nitrógeno líquido a 77 K reduce la radiación térmica T⁴ hacia el tanque interno de helio en un factor mayor a 200×.',
        'Toda la estructura del criostato debe fabricarse con aleaciones diamagnéticas o austeníticas para no deformar las líneas de flujo de B₀.'
      ],
      equations: [
        {
          formula: 'T_LHe = 4.2 K < T_c (NbTi/Nb₃Sn)   ⇒   R = 0 Ω   ⇒   I(t) = I₀ = constante',
          description: 'Condición térmica criogénica que garantiza corriente eléctrica perpetua sin fuente de poder externa.',
          variables: [
            { symbol: 'T_LHe', name: 'Temperatura de ebullición del Helio líquido', unit: '4.2 K (−268.9 °C)' },
            { symbol: 'T_LN₂', name: 'Temperatura del escudo térmico de Nitrógeno', unit: '77 K (−196 °C)' },
            { symbol: 'R', name: 'Resistencia eléctrica del alambre superconductor', unit: '0 Ω' }
          ]
        }
      ],
      deepExplanation: 'Una vez energizado el imán durante la instalación, un interruptor superconductor cierra el circuito sobre sí mismo: el equipo de RMN mantiene su campo de cientos de amperios desconectado de la red eléctrica por décadas.',
      keyTakeaway: 'El baño de helio líquido a 4.2 K respaldado por nitrógeno a 77 K conserva resistencia cero para sostener corrientes gigantes perpetuas.'
    },
    interactiveSimulationType: 'cryostat_dewar'
  },
  {
    id: 'superconducting_magnet',
    name: '3. Imán Solenoide Superconductor Nb₃Sn / NbTi (Campo Magnético B₀)',
    shortRole: 'Generación del campo estático ultra-intenso (9.4–28.2 T) que determina la frecuencia de Larmor ν₀',
    category: 'Imán B₀',
    manufacturerInspiration: 'Imanes UltraShield™ Bruker Ascend & Imanes Escudados Varian/Agilent',
    svgRegion: {
      cx: 265,
      cy: 295,
      width: 140,
      height: 130,
      zoomLevel: 2.1,
    },
    whatItIs: 'Solenoide multicapa de kilómetros de hilo de aleación Niobio-Titanio (NbTi) y Niobio-Estaño (Nb₃Sn) incrustado en matriz de cobre que rodea el tubo vertical central (room-temperature bore).',
    whatItDoes: 'Produce un campo magnético vertical B₀ extremadamente intenso (entre 9.4 T para 400 MHz y 28.2 T para 1.2 GHz) que separa energéticamente los estados de espín nuclear α y β (Efecto Zeeman).',
    whyItDoesIt: 'A mayor campo B₀, mayor es la diferencia de frecuencia en Hz entre protones en distintos entornos químicos (Δν = Δδ · ν₀), desplegando multipletes traslapados y aumentando la sensibilidad ΔN/N como B₀³/².',
    theoreticalReasoning: {
      headline: 'Precesión de Larmor y Escala de Dispersión Química en MHz',
      physicsPrinciples: [
        'Al colocarse en B₀, el momento magnético nuclear no se alinea estáticamente; precesa como un trompo en torno al eje Z a la frecuencia angular ω₀ = γ · B₀.',
        'Para el protón ¹H, la razón giromagnética equivale a 42.577 MHz por cada Tesla (así, 9.4 T = 400 MHz; 14.1 T = 600 MHz; 18.8 T = 800 MHz).',
        'Mientras la constante de acoplamiento J (en Hz) depende solo de los enlaces químicos y es invariante con B₀, la separación en Hz de los desplazamientos δ (ppm) crece linealmente con B₀, resolviendo espectros de segundo orden.'
      ],
      equations: [
        {
          formula: 'ν₀ = (γ / 2π) · B₀    |    SNR_RMN ∝ B₀^(3/2)',
          description: 'Frecuencia de resonancia de Larmor proporcional al campo magnético B₀ e incremento superlineal de sensibilidad.',
          variables: [
            { symbol: 'ν₀', name: 'Frecuencia nominal de Larmor del ¹H', unit: 'MHz (60–1200)' },
            { symbol: 'γ/2π', name: 'Constante giromagnética (¹H: 42.58 · ¹³C: 10.71)', unit: 'MHz / T' },
            { symbol: 'B₀', name: 'Intensidad del campo magnético principal', unit: 'Tesla (T)' }
          ]
        }
      ],
      deepExplanation: 'Pasar de un equipo de sobremesa de 60 MHz (1.4 T) a uno superconductor de 600 MHz (14.1 T) multiplica por 10× la separación espectral en Hz entre dos señales próximas y por más de 30× la relación señal-ruido.',
      keyTakeaway: 'El solenoide superconductor fija la frecuencia de Larmor ν₀; campos B₀ mayores desenredan multipletes complejos y elevan la sensibilidad.'
    },
    interactiveSimulationType: 'superconducting_magnet'
  },
  {
    id: 'shim_coils',
    name: '4. Bobinas de Homogeneidad (Shims X, Y, Z, Z²) y Bloqueo de Deuterio (²H Lock)',
    shortRole: 'Corrección activa de B₀ a partes por billón (ppb) y compensación de deriva temporal en tiempo real',
    category: 'Homogeneidad Shim',
    manufacturerInspiration: 'Sistema 3D Autoshim & Digital Lock Bruker / Agilent DirectDrive™',
    svgRegion: {
      cx: 430,
      cy: 225,
      width: 135,
      height: 150,
      zoomLevel: 2.1,
    },
    whatItIs: 'Cilindro de hasta 36–40 pequeñas bobinas resistivas ortogonales (armónicos esféricos Z¹, Z², Z³, X, Y, XY, XZ…) que envuelven la sonda, acoplado a un canal transceptor continuo sintonizado al deuterio (²H) del solvente.',
    whatItDoes: 'Ajusta microcampos correctores (Shimming) hasta lograr que B₀ sea uniforme dentro de 1 parte por billón (1 ppb ≈ 0.4 Hz a 400 MHz) sobre todo el volumen activo de la muestra, mientras el Lock compensa cualquier deriva del imán.',
    whyItDoesIt: 'Los desplazamientos químicos y constantes de acoplamiento J miden apenas 1 a 15 Hz dentro de un campo portador de 400,000,000 Hz. Una variación de apenas 0.0001% en B₀ ensancharía todos los picos borrando por completo dobletes y tripletes.',
    theoreticalReasoning: {
      headline: 'Tiempo de Relajación Efectivo T₂* y Precisión de Parte por Billón (10⁻⁹)',
      physicsPrinciples: [
        'La anchura a media altura de un pico Lorentziano en RMN es Δν₁/₂ = 1 / (π · T₂*), donde T₂* combina la relajación molecular intrínseca T₂ y la inhomogeneidad ΔB₀.',
        'Un mal ajuste de shims (ΔB₀ grande) destruye rápidamente la coherencia de fase de los espines (T₂* muy corto), produciendo picos anchos e indistinguibles.',
        'El canal Lock vigila continuamente el pico del solvente deuterado (²H) e inyecta corriente a una bobina Z₀ para fijar el campo magnético con exactitud sub-Hertz.'
      ],
      equations: [
        {
          formula: '1 / T₂* = 1 / T₂ + (γ · ΔB₀) / 2    |    Δν₁/₂ = 1 / (π · T₂*)',
          description: 'Ensanchamiento instrumental de línea por inhomogeneidad espacial ΔB₀ del campo magnético.',
          variables: [
            { symbol: 'T₂*', name: 'Constante de decaimiento transversal efectivo del FID', unit: 's' },
            { symbol: 'ΔB₀', name: 'Inhomogeneidad residual del campo sobre la muestra', unit: 'nT (nanotesla)' },
            { symbol: 'Δν₁/₂', name: 'Ancho de pico a mitad de altura (FWHM)', unit: 'Hz (< 0.5 Hz ideal)' }
          ]
        }
      ],
      deepExplanation: 'El procedimiento clásico de "shimming sobre Z¹ y Z²" busca maximizar la señal del canal Lock de deuterio, lo cual equivale matemáticamente a minimizar ΔB₀ y prolongar el decaimiento del FID.',
      keyTakeaway: 'Sin el shimming y bloqueo de deuterio a partes por billón, todas las señales de RMN se fundirían en un solo lomo ancho sin estructura fina.'
    },
    interactiveSimulationType: 'shim_coils'
  },
  {
    id: 'rf_probe_coil',
    name: '5. Sonda RF (CryoProbe™ / Sonda Silla) y Pulso Electromagnético B₁ (90°)',
    shortRole: 'Emisión de pulsos cortos de MHz para inclinar la magnetización M₀ al plano X–Y y captación del eco nuclear',
    category: 'Sonda RF',
    manufacturerInspiration: 'CryoProbe™ Prodigy Bruker & Sonda Multinuclear Agilent OneNMR™',
    svgRegion: {
      cx: 605,
      cy: 225,
      width: 150,
      height: 150,
      zoomLevel: 2.1,
    },
    whatItIs: 'Cabeza cilíndrica introducida desde abajo del imán con una microbobina en geometría de silla de montar (saddle coil) orientada perpendicularmente a B₀ (en el eje X) y capacitores variables de sintonía e impedancia (50 Ω).',
    whatItDoes: 'Emite un pulso breve e intenso de radiofrecuencia (campo magnético oscilante B₁ durante ~8–12 µs) que abate el vector de magnetización neta M₀ 90° desde el eje Z hacia el plano transversal X–Y, e inmediatamente después funciona como antena receptora.',
    whyItDoesIt: 'Los espines precesando alrededor del eje Z solo inducen una fuerza electromotriz (Ley de Faraday) en la bobina receptora transversal cuando poseen componente coherente en el plano X–Y. Además, un pulso rectangular corto (Δt ≈ 10 µs) excita simultáneamente toda la banda de frecuencias químicas (principio de pulso duro FTIR/FT-NMR).',
    theoreticalReasoning: {
      headline: 'Ángulo de Volteo (Flip Angle) en el Marco Rotatorio y Factor de Calidad Q',
      physicsPrinciples: [
        'En el marco que gira a la frecuencia de Larmor ν₀, el campo oscilante B₁ aparece estático a lo largo de X′, haciendo rotar M₀ hacia Y′ en un ángulo θ = γ · B₁ · t_p.',
        'Un pulso de 90° (π/2 radianes) produce la máxima magnetización transversal M_xy = M₀ y la señal FID más intensa.',
        'Enfriar la bobina RF a ~20 K (CryoProbe) reduce la resistencia térmica de la antena, disparando el factor de calidad Q y triplicando la SNR frente a sondas a temperatura ambiente.'
      ],
      equations: [
        {
          formula: 'θ = γ · B₁ · t_pulso    (90°: θ = π/2)    |    Δν_excitación ≈ 1 / (4 · t_pulso)',
          description: 'Ángulo de rotación de la magnetización neta M₀ y ancho de banda espectral excitado por un pulso corto.',
          variables: [
            { symbol: 'B₁', name: 'Amplitud del campo magnético RF del pulso', unit: 'mT' },
            { symbol: 't_pulso', name: 'Duración del pulso RF de 90°', unit: 'µs (~8–12 µs)' },
            { symbol: 'θ', name: 'Ángulo de inclinación hacia el plano X–Y', unit: 'rad (π/2 óptimo)' }
          ]
        }
      ],
      deepExplanation: 'La misma bobina que transmite vatios de potencia RF durante 10 microsegundos conmuta en menos de 5 µs (dead time) a detectar corrientes inducidas de nanovoltios emitidas por los núcleos precesando.',
      keyTakeaway: 'El pulso de 90° abate todos los espines al plano X–Y simultáneamente para que induzcan señal en la bobina sintonizada de la sonda.'
    },
    interactiveSimulationType: 'rf_probe_coil'
  },
  {
    id: 'rf_console_adc',
    name: '6. Consola Transceptora RF, Detección en Cuadratura y Señal FID',
    shortRole: 'Digitalización en microsegundos del Decaimiento Libre de Inducción S(t) amortiguado por T₂*',
    category: 'Consola FID',
    manufacturerInspiration: 'Consola Digital Avance™ Neo Bruker & DirectDrive™ 2 Agilent',
    svgRegion: {
      cx: 775,
      cy: 225,
      width: 130,
      height: 150,
      zoomLevel: 2.2,
    },
    whatItIs: 'Amplificador de pulsos RF, preamplificador de ultrabajo ruido, mezcladores de detección en cuadratura (canales Real X e Imaginario Y a 90°) y convertidores analógico-digitales (ADC) de alta resolución.',
    whatItDoes: 'Resta la frecuencia portadora de referencia ν₀ (ej. 400 MHz) mediante heterodinaje para extraer únicamente las frecuencias audio diferenciales (0 a 5,000 Hz) de cada protón químico, registrando la onda amortiguada FID (Free Induction Decay).',
    whyItDoesIt: 'Sería físicamente ineficiente digitalizar directamente oscilaciones a 600 millones de ciclos por segundo para distinguir variaciones de 1 Hz. La detección en cuadratura traslada la señal al rango de kilohercios y permite diferenciar frecuencias positivas (+Δν) de negativas (−Δν) respecto al portador.',
    theoreticalReasoning: {
      headline: 'Ley de Inducción de Faraday, Relajación T₁/T₂* y Acumulación de Pulsos',
      physicsPrinciples: [
        'Tras el pulso de 90°, los vectores de espín pierden coherencia en el plano X–Y exponencialmente según exp(−t / T₂*) y regresan gradualmente al eje Z según la relajación espín-red T₁.',
        'La superposición de todos los protones de la molécula produce un patrón complejo de batidos en el dominio del tiempo llamado FID.',
        'Repetir la secuencia Pulso 90° → Adquisición FID → Espera de relajación d₁ (T₁) N veces aumenta la relación señal-ruido como √N_scans.'
      ],
      equations: [
        {
          formula: 'S(t) = Σ I_k · exp( i · 2π · Δν_k · t ) · exp( −t / T₂* )    |    SNR ∝ √( N_scans )',
          description: 'Señal compleja de Decaimiento Libre de Inducción (FID) adquirida en cuadratura y ganancia por acumulación.',
          variables: [
            { symbol: 'Δν_k', name: 'Desplazamiento en Hz respecto al transmisor ν₀', unit: 'Hz (0–6000)' },
            { symbol: 'T₂*', name: 'Tiempo de relajación transversal efectivo', unit: 's (0.05–2.0)' },
            { symbol: 'N_scans', name: 'Número de transientes FID promediados', unit: '1 a 64+' }
          ]
        }
      ],
      deepExplanation: 'El tiempo de adquisición total es T_aq = N_puntos / SW; un buen compromiso exige esperar suficiente tiempo (d₁ ≥ 5·T₁ en qNMR cuantitativo) para que la magnetización longitudinal se recupere completamente entre pulsos.',
      keyTakeaway: 'Registra la superposición temporal de todas las frecuencias nucleares (FID) promediando múltiples barridos para limpiar el ruido electrónico.'
    },
    interactiveSimulationType: 'rf_console_adc'
  },
  {
    id: 'fft_nmr_processor',
    name: '7. Transformada de Fourier (FFT), Escala δ (ppm) y Multiplicidad J (n+1)',
    shortRole: 'Conversión del FID S(t) al espectro de frecuencias químicas δ (ppm) con integrales y desdoblamiento',
    category: 'Procesamiento FFT',
    manufacturerInspiration: 'Bruker TopSpin® · Agilent VnmrJ / MestReNova · Shimadzu Q-NMR',
    svgRegion: {
      cx: 915,
      cy: 225,
      width: 135,
      height: 150,
      zoomLevel: 2.0,
    },
    whatItIs: 'Módulo matemático de Transformada Rápida de Fourier compleja (FFT), corrección de fase, calibración de desplazamiento químico δ respecto a Tetrametilsilano (TMS = 0.00 ppm) e integración de áreas.',
    whatItDoes: 'Descompone el FID temporal en picos agudos Lorentzianos distribuidos de izquierda a derecha en escala adimensional descendente δ (de 12 ppm a 0 ppm), revelando el entorno electrónico, el número de protones vecinos (regla n+1) y el área cuantitativa de cada grupo.',
    whyItDoesIt: 'Las frecuencias crudas en Hz cambian de un imán de 300 MHz a uno de 600 MHz. Dividir la diferencia respecto al TMS entre la frecuencia nominal del equipo genera la escala universal δ en partes por millón (ppm), idéntica en cualquier laboratorio del mundo.',
    theoreticalReasoning: {
      headline: 'Apantallamiento Diamagnético (σ), Escala Universal δ (ppm) y Acoplamiento Escalar J',
      physicsPrinciples: [
        'La nube electrónica que rodea a cada núcleo genera un microcampo opuesto B_local = B₀ · (1 − σ); átomos electronegativos (O, N, Cl, anillos aromáticos) "desapantallan" al protón desplazándolo a campo bajo (δ alto, izquierda).',
        'El acoplamiento escalar a través de enlaces covalentes (generalmente a 3 enlaces ³J_HH) desdobla una señal en (n + 1) líneas con intensidades del triángulo de Pascal gracias a las orientaciones posibles de n protones vecinos.',
        'A diferencia de la óptica UV/IR (donde ε varía por cromóforo), el área integral de un pico ¹H depende exclusivamente de cuántos protones equivalentes lo originan.'
      ],
      equations: [
        {
          formula: 'δ (ppm) = [ (ν_muestra − ν_TMS) / ν₀ ] × 10⁶    |    Multiplitud = n + 1  (Triángulo de Pascal)',
          description: 'Definición IUPAC de desplazamiento químico independiente del imán y desdoblamiento espín-espín.',
          variables: [
            { symbol: 'δ', name: 'Desplazamiento químico relativo al TMS (0.00 ppm)', unit: 'ppm (0–14)' },
            { symbol: 'J', name: 'Constante de acoplamiento escalar entre vecinos', unit: 'Hz (0–18 Hz)' },
            { symbol: 'Área', name: 'Integral directa proporcional al número de ¹H', unit: '1H, 2H, 3H…' }
          ]
        }
      ],
      deepExplanation: 'La escala IUPAC grafica siempre los δ altos ("campo bajo", desapantallado) a la izquierda (12–10 ppm para ácidos/aldehídos) y el TMS apantallado en 0.00 ppm a la derecha.',
      keyTakeaway: 'Convierte la onda FID en el mapa atómico completo de la molécula: posición δ (entorno), integral (conteo de H) y multiplicidad (vecinos n+1).'
    },
    interactiveSimulationType: 'fft_nmr_processor'
  }
];

export const NMR_GALLERY: InstrumentGalleryItem[] = [
  {
    id: 'nmr_chassis_3d',
    title: 'Corte Transversal RMN Superconductor de Alto Campo',
    subtitle: 'Criostato multicapa, imán Nb₃Sn/NbTi, turbina neumática, sonda RF de silla y consola digital',
    manufacturerRef: 'Inspirado en Bruker Avance Neo Ascend™ y Agilent DD2 OneNMR™',
    imageSrc: IMAGES.nmrCutawayUltra3d,
    keyFeatures: [
      'Imán superconductor sumergido en helio líquido a 4.2 K y escudo térmico N₂ a 77 K',
      'Tubo vertical a temperatura ambiente con turbina neumática de aire (20 Hz)',
      'Sonda RF CryoProbe™ con geometría de silla de montar perpendicular a B₀',
      'Consola transceptora con detección en cuadratura y Transformada FFT directa'
    ],
    specs: [
      { label: 'Frecuencia ¹H', value: '400 - 1,200 MHz' },
      { label: 'Campo Estático', value: '9.4 - 28.2 Tesla' },
      { label: 'Resolución Shim', value: '< 0.35 Hz (1 ppb)' }
    ]
  },
  {
    id: 'nmr_magnet_detail',
    title: 'Criostato Dewar y Solenoide Superconductor (4.2 K)',
    subtitle: 'Corriente persistente sin resistencia eléctrica sosteniendo campos de decenas de Tesla',
    manufacturerRef: 'Imanes Ascend™ Bruker / PremiumCOMPACT™ Agilent',
    imageSrc: IMAGES.nmrSuperconductingMagnet,
    keyFeatures: [
      'Recipientes concéntricos aislados al alto vacío (LN₂ a 77 K externo / LHe a 4.2 K interno)',
      'Kilómetros de filamentos NbTi / Nb₃Sn en matriz estabilizadora de cobre',
      'Interruptor térmico superconductor para operación continua sin fuente externa',
      'Blindaje magnético activo reduciendo la línea de seguridad de 5 Gauss'
    ],
    specs: [
      { label: 'Temp. Núcleo', value: '4.2 K (−269 °C)' },
      { label: 'Resistencia R', value: '0 Ω (Supercond.)' },
      { label: 'Estabilidad', value: '< 10 ppb / hora' }
    ]
  },
  {
    id: 'nmr_probe_detail',
    title: 'Cabezal de Sonda RF (CryoProbe™) y Automuestreador de 5 mm',
    subtitle: 'Bobina transceptora de alta Q abrazando el tubo en solvente deuterado',
    manufacturerRef: 'Bruker CryoProbe™ / Agilent OneNMR™ ProTune™',
    imageSrc: IMAGES.nmrCryoprobeRfCoil,
    keyFeatures: [
      'Bobina en silla de montar sintonizada con capacitores cerámicos no magnéticos a 50 Ω',
      'Canal dedicado de bloqueo ²H (Deuterio Lock) corrigiendo la deriva del campo',
      'Bobinas de gradiente de campo pulsado (PFG) para autoshimming y RMN 2D',
      'Soportes de zafiro y cuarzo ultrapuro totalmente libres de señal ¹H residual'
    ],
    specs: [
      { label: 'Tubo Muestra', value: '5 mm (600 µL)' },
      { label: 'Pulso 90° (π/2)', value: '~8 - 12 µs' },
      { label: 'Ganancia Cryo', value: '3× - 4× SNR' }
    ]
  },
  {
    id: 'nmr_console_detail',
    title: 'Consola Transceptora RF, ADC en Cuadratura y Q-NMR',
    subtitle: 'Síntesis digital FPGA de pulsos y adquisición de Decaimiento Libre FID',
    manufacturerRef: 'Avance™ Neo Bruker / DirectDrive™ 2 Agilent / qNMR Shimadzu',
    imageSrc: IMAGES.nmrRfConsoleSpectrometer,
    keyFeatures: [
      'Detección en cuadratura (Real e Imaginario a 90°) tras heterodinaje',
      'Digitalización de alta gama dinámica (> 22 bits efectivos por sobremuestreo)',
      'Integración directa de áreas para cuantificación absoluta farmacéutica qNMR',
      'Supresión selectiva de solvente residual y procesamiento FFT complejo'
    ],
    specs: [
      { label: 'Resolución Fase', value: '< 0.005° RF' },
      { label: 'Escala Universal', value: 'δ (14 → 0 ppm)' },
      { label: 'Exactitud qNMR', value: '< 0.5% RSD' }
    ]
  }
];
