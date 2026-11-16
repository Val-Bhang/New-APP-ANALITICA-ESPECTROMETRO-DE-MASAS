import { IMAGES } from '../assets/images';
import { ManufacturerTech, InstrumentGalleryItem } from './spectrometryData';

export const GC_MANUFACTURERS: ManufacturerTech[] = [
  {
    id: 'agilent',
    name: 'Agilent Technologies',
    country: 'Estados Unidos',
    specialty: 'Control Neumático Electrónico (EPC), Tecnología de Flujo Capilar CFT y Retention Time Locking',
    flagshipSeries: 'Agilent 8890 GC, Intuvo 9000 & 7890B GC-FID/MSD',
    keyInnovations: [
      {
        title: 'Control Neumático Electrónico EPC de 6.ª Generación',
        description: 'Válvulas proporcionales micro-mecanizadas y sensores báricos absolutos compensados por temperatura ambiente para regular presión en columna hasta 0.001 psi.',
        impact: 'Garantiza repetibilidad de tiempos de retención inferior a 0.0008 min y permite el modo Retention Time Locking (RTL) entre laboratorios globales.'
      },
      {
        title: 'Tecnología de Flujo Capilar (Capillary Flow Technology - CFT)',
        description: 'Placas microfluídicas de acero inoxidable desactivado con volumen muerto mínimo para retro-lavado (backflush) y división hacia detectores múltiples.',
        impact: 'Expulsa matrices pesadas de alto punto de ebullición al finalizar la corrida protegiendo la columna capilar y la fuente del detector.'
      },
      {
        title: 'Inyector Split/Splitless Ultra-Inerte con Sello Dorado y Cambio sin Herramientas',
        description: 'Cabezal Turn-Top y liners de borosilicato desactivados químicamente con ruta de flujo libre de sitios activos silanol.',
        impact: 'Evita la adsorción y descomposición catalítica de pesticidas, aminas y fenoles termolábiles durante la vaporización flash a 280 °C.'
      },
      {
        title: 'Detector FID de Doble Canal Auto-Ignición y Rango Dinámico 10⁷',
        description: 'Boquilla de cuarzo inerte con encendido electrónico automático de llama H₂/aire y electrómetro digital de respuesta lineal de 7 décadas.',
        impact: 'Cuantifica desde hidrocarburos porcentuales hasta trazas sub-ppm sin saturar el detector ni requerir diluciones múltiples.'
      }
    ]
  },
  {
    id: 'shimadzu',
    name: 'Shimadzu Corporation',
    country: 'Japón',
    specialty: 'Control Avanzado de Flujo AFC, Conectores ClickTek™ y Detector BID de Helio',
    flagshipSeries: 'Shimadzu Nexis GC-2030 & Brevis GC-2050',
    keyInnovations: [
      {
        title: 'Controlador Avanzado de Flujo (AFC) con Ahorro Automático de Helio',
        description: 'Regulación digital de presión y velocidad lineal constante que cambia automáticamente a flujo económico de espera entre secuencias o usa N₂/H₂ en modo standby.',
        impact: 'Reduce el consumo de gas portador helio hasta en 65% mientras sostiene velocidad lineal óptima según la curva de Golay.'
      },
      {
        title: 'Conectores Rápidos ClickTek™ y Horno de Alta Tasa con Enfriamiento Turbo',
        description: 'Acoplamiento manual de columna sin llave dinamométrica con confirmación táctil "clic" y doble turbina de enfriamiento por aire exterior.',
        impact: 'Enfría el horno de 450 °C a 50 °C en menos de 3.4 minutos, acelerando drásticamente la productividad del laboratorio.'
      },
      {
        title: 'Detector de Ionización por Descarga de Barrera Dieléctrica (BID-2030)',
        description: 'Plasma frío de helio generado en tubo de cuarzo que emite radiación UV extrema (17.7 eV) capaz de ionizar gases permanentes, H₂O, CO₂ y orgánicos.',
        impact: 'Alcanza sensibilidad universal hasta 100 veces superior al TCD tradicional sin utilizar llama abierta ni gases inflamables.'
      },
      {
        title: 'Diagnóstico Inteligente de Septum, Liner y Fugas (Analytical Intelligence)',
        description: 'Rutina automatizada previa al arranque que presuriza el inyector, verifica estanqueidad y contabiliza inyecciones acumuladas sobre el septum.',
        impact: 'Previene entradas catastróficas de aire atmosférico (O₂) que oxidarían la fase estacionaria de polisiloxano a temperaturas altas.'
      }
    ]
  },
  {
    id: 'bruker',
    name: 'Bruker Daltonics & SCION GC',
    country: 'Alemania',
    specialty: 'Cromatografía Capilar de Alta Velocidad, Válvulas de Gas Multicanal y Acoplamiento GC-TQ/HRMS',
    flagshipSeries: 'Bruker / SCION 456-GC, 436-GC & EVOQ GC-TQ',
    keyInnovations: [
      {
        title: 'Inyector Programable de Temperatura PTV (Programmed Temperature Vaporizer)',
        description: 'Puerto de entrada de baja masa térmica que inyecta en frío (40 °C) y rampa a 800 °C/min hasta 400 °C tras ventilar el solvente.',
        impact: 'Elimina la discriminación de alcanos pesados (C₂₀–C₄₄) y permite inyecciones de gran volumen (hasta 50 µL) sin degradar analitos frágiles.'
      },
      {
        title: 'Horno Compacto de Baja Inercia Térmica y Rampas Ultrarrápidas',
        description: 'Cámara interna optimizada con deflectores laminares que logran gradientes homogéneos de ±0.1 °C en toda la jaula capilar.',
        impact: 'Alcanza tasas de calentamiento de hasta 120 °C/min con anchos de pico de fracciones de segundo en columnas estrechas (0.10–0.18 mm ID).'
      },
      {
        title: 'Acoplamiento Directo GC-MS Libre de Lentes (Lens-Free) con Línea Calefactada',
        description: 'Interfaz capilar cerámica sin puntos fríos que inserta el extremo de la columna de 0.25 mm directamente dentro de la cámara de ionización EI/CI.',
        impact: 'Evita condensaciones tardías de semivolátiles (PAHs, ftalatos, pesticidas) preservando la simetría gaussiana hasta masas m/z > 800.'
      },
      {
        title: 'Arquitectura Multi-Detector Simultáneo (FID + ECD + TCD + PFPD)',
        description: 'Chasis modular capaz de alojar hasta tres inyectores y tres detectores independientes en paralelo mediante divisores inertes.',
        impact: 'Permite analizar trazas de azufre/fósforo, organoclorados e hidrocarburos totales simultáneamente en una sola inyección petroquímica.'
      }
    ]
  }
];

export interface GcPart {
  id: string;
  name: string;
  shortRole: string;
  category: 'Gas Portador' | 'Control Neumático' | 'Inyector' | 'Horno' | 'Columna Capilar' | 'Detector' | 'Datos';
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
    | 'carrier_gas'
    | 'epc_control'
    | 'inlet_injector'
    | 'oven_ramp'
    | 'capillary_column'
    | 'detector_fid'
    | 'chromatogram_kovats';
}

export const GC_PARTS: GcPart[] = [
  {
    id: 'carrier_gas',
    name: '1. Cilindro de Gas Portador (He, H₂, N₂) y Trampas O₂/H₂O',
    shortRole: 'Fase móvil gaseosa químicamente inerte purificada al 99.9999% sin interacción de reparto',
    category: 'Gas Portador',
    manufacturerInspiration: 'Trampas indicadoras de oxígeno/humedad Agilent & purificación grado UHP Shimadzu',
    svgRegion: {
      cx: 110,
      cy: 215,
      width: 140,
      height: 185,
      zoomLevel: 2.1,
    },
    whatItIs: 'Tanque de alta presión de Helio (He), Hidrógeno (H₂) o Nitrógeno (N₂) de grado cromatográfico conectado a cartuchos purificadores en serie de tamiz molecular (para agua), carbón activado (para hidrocarburos) y catalizador de cobre/níquel (para oxígeno).',
    whatItDoes: 'Transporta físicamente las moléculas vaporizadas desde el inyector a través de la columna capilar hasta el detector manteniendo una atmósfera estrictamente libre de oxígeno, humedad y trazas orgánicas.',
    whyItDoesIt: 'A diferencia del HPLC, en GC la fase móvil NO interactúa químicamente con los analitos (solo los empuja mecánicamente). Sin embargo, unas pocas ppm de O₂ o vapor de agua destruyen irreversiblemente las fases estacionarias de polisiloxano o PEG cuando el horno supera los 200 °C (sangrado severo de columna).',
    theoreticalReasoning: {
      headline: 'Difusividad Gaseosa (D_g), Viscosidad (η) y Curva de Golay',
      physicsPrinciples: [
        'El Hidrógeno (H₂) posee la menor viscosidad y mayor coeficiente de difusión gaseosa D_g, permitiendo operar a velocidades lineales u de 45–55 cm/s sin pérdida de eficiencia.',
        'El Helio (He) combina seguridad inerte, buena velocidad óptima (~30 cm/s) y compatibilidad universal con detectores FID, TCD y MS.',
        'El Nitrógeno (N₂) ofrece excelente eficiencia mínima a baja velocidad (~14 cm/s), pero su curva de Golay asciende abruptamente a flujos altos alargando los análisis.'
      ],
      equations: [
        {
          formula: 'u_opt ≈ √(B / C_g)   |   D_g(H₂) > D_g(He) > D_g(N₂)',
          description: 'Velocidad lineal óptima de Golay gobernada por la difusión axial y resistencia en fase gas.',
          variables: [
            { symbol: 'u_opt', name: 'Velocidad lineal óptima del gas', unit: 'cm / s' },
            { symbol: 'D_g', name: 'Difusividad binaria del analito', unit: 'cm² / s' },
            { symbol: 'η', name: 'Viscosidad dinámica del gas portador', unit: 'µPa·s' }
          ]
        }
      ],
      deepExplanation: 'Las trampas indicadoras cambian de color (ej. azul a rosado o verde a gris) cuando se saturan, actuando como la primera línea de defensa contra la oxidación térmica de la columna capilar.',
      keyTakeaway: 'Suministra un vehículo gaseoso inerte y ultraseco cuya viscosidad y difusividad determinan la rapidez de separación en la columna.'
    },
    interactiveSimulationType: 'carrier_gas'
  },
  {
    id: 'epc_control',
    name: '2. Control Neumático Electrónico (EPC / AFC)',
    shortRole: 'Regulación digital de presión de cabeza (psi/kPa) para compensar expansión térmica del gas',
    category: 'Control Neumático',
    manufacturerInspiration: 'EPC Agilent 8890 (±0.001 psi) y AFC Shimadzu Nexis GC-2030',
    svgRegion: {
      cx: 260,
      cy: 170,
      width: 135,
      height: 120,
      zoomLevel: 2.3,
    },
    whatItIs: 'Bloque de válvulas solenoides proporcionales de alta velocidad gobernadas por microprocesador con sensores de presión absoluta y sensores de flujo másico para controlar el gas portador, el flujo Split y los gases auxiliares del detector.',
    whatItDoes: 'Mantiene constante el flujo volumétrico o la velocidad lineal promedio dentro de la columna capilar aunque la temperatura del horno aumente de 40 °C a 320 °C.',
    whyItDoesIt: 'Los gases tienen una propiedad opuesta a los líquidos: al calentarse, su viscosidad AUMENTA (ley ~ T^0.7). Si se mantuviera presión fija al subir la temperatura del horno, el caudal caerían drásticamente retrasando los picos; el EPC eleva automáticamente la presión de entrada durante la rampa térmica para sostener un flujo constante.',
    theoreticalReasoning: {
      headline: 'Flujo Compresible de Poiseuille y Factor de Corrección de James–Martin',
      physicsPrinciples: [
        'Como el gas portador es compresible, su velocidad lineal aumenta progresivamente desde la entrada (P_i) hasta la salida atmosférica o al vacío (P_o).',
        'Al calentarse el horno en rampa, el EPC incrementa P_i en tiempo real para contrarrestar el aumento de viscosidad η(T) y mantener constante la velocidad lineal promedio ū.',
        'La precisión de ±0.001 psi permite alinear cromatogramas entre distintos equipos con tolerancia de milisegundos (Retention Time Locking).'
      ],
      equations: [
        {
          formula: 'F_o = (π · r⁴ · (P_i² - P_o²)) / (16 · η(T) · L · P_o)   |   j = 3/2 · ((P² - 1) / (P³ - 1))',
          description: 'Ley de Poiseuille para gases compresibles y factor de compresibilidad j de James-Martin (con P = P_i/P_o).',
          variables: [
            { symbol: 'P_i, P_o', name: 'Presión absoluta de entrada y salida', unit: 'kPa / psi' },
            { symbol: 'η(T)', name: 'Viscosidad del gas creciente con T', unit: 'Pa·s' },
            { symbol: 'j', name: 'Factor de compresibilidad', unit: '0.2 a 1.0' }
          ]
        }
      ],
      deepExplanation: 'El control electrónico reemplazó los viejos reguladores mecánicos de aguja, permitiendo calcular al instante el flujo Split exacto, compensar altitud atmosférica y detener fugas ante rotura de columna.',
      keyTakeaway: 'Compensa dinámicamente el aumento de viscosidad del gas caliente subiendo la presión de entrada para que cada pico eluya siempre en el segundo exacto.'
    },
    interactiveSimulationType: 'epc_control'
  },
  {
    id: 'inlet_injector',
    name: '3. Automuestreador e Inyector Split/Splitless (Liner + Septum)',
    shortRole: 'Vaporización instantánea (flash) de microlitros líquidos y dosificación exacta en columna capilar',
    category: 'Inyector',
    manufacturerInspiration: 'Inyector Ultra-Inerte Split/Splitless Agilent 8890 y Puerto PTV Bruker',
    svgRegion: {
      cx: 415,
      cy: 175,
      width: 145,
      height: 155,
      zoomLevel: 2.2,
    },
    whatItIs: 'Bloque metálico calefactado (220–320 °C) sellado arriba por un septum de silicona autoadhesivo y revestido por dentro con un tubo de vidrio borosilicato desactivado (liner) con lana de cuarzo y una válvula de división (Split Vent).',
    whatItDoes: 'Recibe de 0.5 a 2.0 µL de muestra líquida desde una microjeringa robotizada rápida (~100 ms), la vaporiza al instante mezclándola con el gas portador y dirige hacia la columna capilar una fracción exacta (Split 10:1–100:1) o casi toda la nube (Splitless).',
    whyItDoesIt: 'Una columna capilar de 0.25 mm de diámetro interno se saturaría y ahogaría si recibiera 1 µL de solvente líquido expandido a ~500 µL de vapor. En análisis concentrados el modo Split descarta el exceso (ej. 98%) inyectando un tapón ultrafino; en análisis de trazas el modo Splitless cierra la purga durante 45–60 s para transferir el ~95% del analito.',
    theoreticalReasoning: {
      headline: 'Expansión de Vaporización Flash y Relación de División (Split Ratio)',
      physicsPrinciples: [
        'Al pasar de líquido a gas a 250 °C y 15 psi, 1 µL de hexano genera ~190 µL de vapor, mientras que 1 µL de metanol o agua genera > 500–1,000 µL (peligro de retroceso o "backflash" si supera el volumen del liner).',
        'La lana de cuarzo desactivada dentro del liner transfiere calor homogéneo y atrapa residuos no volátiles que de otro modo ensuciarían la cabeza de la columna.',
        'Un septum perforado pierde presión EPC y permite la difusión inversa de O₂/N₂ hacia la columna.'
      ],
      equations: [
        {
          formula: 'Split Ratio = F_split / F_col   |   V_vapor = (V_liq · ρ / M) · (R · T_inj / P_inj)',
          description: 'Relación de división Split y volumen de nube de vapor dentro del liner de vidrio.',
          variables: [
            { symbol: 'F_split', name: 'Caudal por válvula de división', unit: 'mL / min' },
            { symbol: 'F_col', name: 'Caudal en columna capilar', unit: 'mL / min (~1.2)' },
            { symbol: 'V_vapor', name: 'Volumen de expansión del solvente', unit: 'µL (< 800 µL)' }
          ]
        }
      ],
      deepExplanation: 'Un pequeño flujo continuo de purga de septum (~3 mL/min) barre hacia el exterior los siloxanos desprendidos del septum caliente antes de que puedan entrar al cromatograma como picos fantasma.',
      keyTakeaway: 'Transforma microlitros líquidos en un pulso gaseoso compacto sin sobrecargar el capilar ni degradar los analitos.'
    },
    interactiveSimulationType: 'inlet_injector'
  },
  {
    id: 'oven_ramp',
    name: '4. Horno Térmico Programable de Convección Forzada',
    shortRole: 'Gradiente térmico controlado (40 → 320 °C) que resuelve el "problema general de elución"',
    category: 'Horno',
    manufacturerInspiration: 'Horno de doble turbina Shimadzu Nexis GC-2030 y Agilent 8890',
    svgRegion: {
      cx: 585,
      cy: 270,
      width: 175,
      height: 195,
      zoomLevel: 1.9,
    },
    whatItIs: 'Cámara térmicamente aislada de baja masa térmica equipada con resistencias calefactoras rápidas, un ventilador centrífugo de alta velocidad para homogeneizar el aire (±0.1 °C) y compuertas traseras motorizadas de enfriamiento rápido.',
    whatItDoes: 'Mantiene la columna capilar a temperatura isotérmica constante o ejecuta rampas programadas (ej. 50 °C por 2 min → 12 °C/min → 280 °C) durante el análisis.',
    whyItDoesIt: 'La presión de vapor P° de cada analito crece exponencialmente con la temperatura según Clausius–Clapeyron. En modo isotérmico frío, los pesados tardan horas y salen muy anchos; en isotérmico caliente, los volátiles salen juntos en el frente. La rampa térmica eluye primero los volátiles con alta resolución y luego acelera los semivolátiles con picos igual de angostos.',
    theoreticalReasoning: {
      headline: 'Ecuación de Clausius–Clapeyron y Regla Empírica de Retención Térmica',
      physicsPrinciples: [
        'Como aproximación práctica en GC, cada aumento de +30 °C en la temperatura del horno reduce aproximadamente a la MITAD el tiempo de retención de un analito.',
        'La programación de temperatura reduce progresivamente el factor de retención k\' de las sustancias de alto punto de ebullición a medida que avanza el análisis, comprimiendo la anchura de sus picos.',
        'Un gradiente espacial homogéneo (±0.1 °C) en toda la jaula impide el ensanchamiento asimétrico entre espiras vecinas.'
      ],
      equations: [
        {
          formula: 'ln(K_c) = -ΔH°_vap / (R · T) + ΔS° / R   |   ΔT ≈ +30 °C ➔ k\' se reduce ~50%',
          description: 'Dependencia exponencial de la constante de reparto gas–líquido K_c con la temperatura del horno T.',
          variables: [
            { symbol: 'K_c', name: 'Coeficiente de partición C_est / C_gas', unit: 'adimensional' },
            { symbol: 'ΔH°_vap', name: 'Entalpía de vaporización del soluto', unit: 'kJ / mol' },
            { symbol: 'T', name: 'Temperatura absoluta del horno', unit: 'K (°C + 273.15)' }
          ]
        }
      ],
      deepExplanation: 'El horno en cromatografía de gases juega exactamente el papel equivalente que desempeña la rampa de gradiente de solvente (%B) en HPLC.',
      keyTakeaway: 'Modula la presión de vapor de cada molécula mediante rampas térmicas precisas para separar volátiles y pesados en una sola corrida.'
    },
    interactiveSimulationType: 'oven_ramp'
  },
  {
    id: 'capillary_column',
    name: '5. Columna Capilar de Sílice Fundida (WCOT, 30 m × 0.25 mm)',
    shortRole: 'Tubo capilar con película estacionaria interna (0.25 µm) que separa por ebullición y polaridad',
    category: 'Columna Capilar',
    manufacturerInspiration: 'Columnas Agilent J&W DB-5ms / DB-Wax y Shimadzu SH-Rxi-5Sil MS',
    svgRegion: {
      cx: 585,
      cy: 160,
      width: 160,
      height: 120,
      zoomLevel: 2.1,
    },
    whatItIs: 'Tubo capilar flexible de sílice fundida ultrapuro recubierto externamente con polímero de poliimida marrón resistente a 360 °C e internamente tapizado por una película líquida/entrecruzada de polisiloxano apolar (DB-1 / DB-5ms) o polietilenglicol polar (WAX), enrollado en una jaula metálica.',
    whatItDoes: 'Ofrece decenas de miles a más de 120,000 platos teóricos donde las moléculas en fase gas se condensan/disuelven repetidamente en la película estacionaria interna (WCOT) según su punto de ebullición y polaridad química.',
    whyItDoesIt: 'Las columnas capilares abiertas carecen de empaque sólido (término A de Van Deemter = 0 en la ecuación de Golay), lo que elimina las múltiples trayectorias y permite usar columnas muy largas (15–60 m) con bajísima caída de presión y picos extraordinariamente estrechos.',
    theoreticalReasoning: {
      headline: 'Ecuación de Golay para Columnas Capilares Abiertas (A = 0)',
      physicsPrinciples: [
        'Sin partículas empacadas no hay difusión turbulenta (A = 0), reduciendo la ecuación de eficiencia a H = B/ū + (C_g + C_s)·ū.',
        'Reducir el diámetro interno d_c (de 0.53 mm a 0.25 mm o 0.10 mm) y el grosor de película d_f disminuye la resistencia a transferencia de masa C, disparando N > 120,000 platos.',
        'La selección química de fase ("lo semejante disuelve a lo semejante") separa incluso isómeros de igual punto de ebullición.'
      ],
      equations: [
        {
          formula: 'H = B / ū + (C_g + C_s) · ū   |   C_g ∝ d_c² / D_g   |   C_s ∝ d_f² / D_s',
          description: 'Ecuación de Golay para capilares WCOT donde el diámetro interno d_c y espesor d_f fijan la eficiencia.',
          variables: [
            { symbol: 'H', name: 'Altura de plato teórico (HETP)', unit: 'mm (~0.22 mm)' },
            { symbol: 'd_c', name: 'Diámetro interno del capilar', unit: 'mm (0.18–0.53)' },
            { symbol: 'd_f', name: 'Espesor de película estacionaria', unit: 'µm (0.10–1.0)' }
          ]
        }
      ],
      deepExplanation: 'Una columna estándar de 30 m × 0.25 mm × 0.25 µm acumula típicamente entre 100,000 y 135,000 platos teóricos, superando en eficiencia bruta a casi cualquier columna HPLC empacada.',
      keyTakeaway: 'Su arquitectura capilar abierta logra >100,000 platos teóricos separando mezclas complejas por punto de ebullición e interacción molecular.'
    },
    interactiveSimulationType: 'capillary_column'
  },
  {
    id: 'detector_fid',
    name: '6. Detector de Ionización de Llama (FID) y TCD Universal',
    shortRole: 'Quimio-ionización de enlaces C–H en llama H₂/aire (FID) o conductividad térmica (TCD)',
    category: 'Detector',
    manufacturerInspiration: 'FID de rango 10⁷ Agilent 8890 & detector TCD / BID Shimadzu',
    svgRegion: {
      cx: 760,
      cy: 215,
      width: 145,
      height: 155,
      zoomLevel: 2.2,
    },
    whatItIs: 'Torre metálica calefactada (250–350 °C) conectada al extremo de la columna capilar donde el efluente se mezcla con hidrógeno y aire puro para arder en una micro-llama sobre una boquilla de cuarzo polarizada entre +200 y +300 V frente a un electrodo colector.',
    whatItDoes: 'En el FID, los compuestos orgánicos que entran a la llama sufren pirólisis y quimio-ionización generando electrones e iones CHO⁺ proporcionales al flujo másico de carbono reducido, produciendo corrientes de picoamperios (pA) que el electrómetro amplifica.',
    whyItDoesIt: 'Una llama pura de H₂ + aire casi no genera iones (< 1 pA de línea base), por lo que cuando eluye un hidrocarburo la conductividad eléctrica del plasma salta miles de veces. Como alternativa no destructiva, el TCD mide la caída en la conductividad térmica del gas helio cuando pasa cualquier sustancia (incluida agua o CO₂).',
    theoreticalReasoning: {
      headline: 'Quimio-Ionización de Radicales CH· en Llama y Conductividad Térmica TCD',
      physicsPrinciples: [
        'Mecanismo FID: CH· + O· → CHO⁺ + e⁻ (la señal depende del número de carbonos unidos a H; los carbonos carbonílicos C=O, carboxilos o haluros CCl₄ tienen respuesta casi nula).',
        'El FID es un detector sensible al flujo másico (dm/dt), prácticamente insensible a variaciones menores de flujo de gas portador y con linealidad excepcional de 10⁷ órdenes de magnitud.',
        'El TCD (no destructivo) funciona con puente de Wheatstone de filamento caliente gracias a que He y H₂ conducen el calor ~6–8 veces mejor que casi cualquier vapor orgánico.'
      ],
      equations: [
        {
          formula: 'CH· + O· ➔ CHO⁺ + e⁻   |   I_FID ∝ N_C_reducidos · (dm / dt)',
          description: 'Reacción principal de quimio-ionización en llama FID y proporcionalidad másica de corriente.',
          variables: [
            { symbol: 'I_FID', name: 'Corriente iónica del electrómetro', unit: 'pA (picoamperios)' },
            { symbol: 'N_C_red', name: 'Carbonos efectivos no oxidados', unit: 'átomos C / mol' },
            { symbol: 'dm/dt', name: 'Tasa de entrada másica del eluyente', unit: 'g / s' }
          ]
        }
      ],
      deepExplanation: 'Además del gas portador, el FID emplea un gas de compensación ("makeup gas", N₂ o He ~25 mL/min) justo en la base de la boquilla para barrer sin volumen muerto los picos ultra-angostos que salen a 1.2 mL/min de una columna capilar.',
      keyTakeaway: 'Convierte cada compuesto eluido en corriente iónica proporcional al carbono reducido (FID) o en cambio térmico universal (TCD).'
    },
    interactiveSimulationType: 'detector_fid'
  },
  {
    id: 'chromatogram_kovats',
    name: '7. Estación Cromatográfica e Índices de Retención de Kováts (RI)',
    shortRole: 'Registro t_R vs señal (pA/mV), normalización contra n-alcanos e integración de áreas',
    category: 'Datos',
    manufacturerInspiration: 'Agilent OpenLab CDS, Shimadzu LabSolutions GC y Bruker Compass',
    svgRegion: {
      cx: 915,
      cy: 215,
      width: 140,
      height: 165,
      zoomLevel: 2.0,
    },
    whatItIs: 'Sistema de adquisición digital a alta tasa de muestreo (50–500 Hz) que procesa las señales del electrómetro FID/TCD y calcula tiempos de retención ajustados t\'_R, eficiencia N, resolución R_s e Índices de Retención de Kováts (RI).',
    whatItDoes: 'Construye el cromatograma de picos gaussianos agudos en función del tiempo, integra áreas porcentuales por Factor de Respuesta Relativo (RRF) y asigna un Índice de Kováts invariante que permite identificar volátiles y fragancias entre distintas columnas.',
    whyItDoesIt: 'Los tiempos de retención absolutos cambian si se recorta 30 cm de columna durante el mantenimiento o varía ligeramente la longitud L. Al interpolar el analito entre dos n-alcanos consecutivos (Índice de Kováts = 100·n para n-alcano), se obtiene una constante reproducible en bases de datos mundiales (NIST RI).',
    theoreticalReasoning: {
      headline: 'Índice de Retención de Kováts (Programado e Isotérmico) y Tiempo Muerto t_M',
      physicsPrinciples: [
        'Tiempo muerto gaseoso t_M: tiempo que tarda un compuesto no retenido (ej. metano en FID o aire en TCD) en recorrer los 30 metros de columna.',
        'En rampas térmicas lineales (Van den Dool y Kratz), el índice de Kováts interpola linealmente los tiempos de retención entre el alcano anterior C_n y el posterior C_{n+1}.',
        'El muestreo a ≥ 50 Hz garantiza al menos 15–20 puntos digitales sobre picos capilares de apenas 1.5 segundos de ancho.'
      ],
      equations: [
        {
          formula: 'RI = 100 · [ n + (t_R(x) - t_R(n)) / (t_R(n+1) - t_R(n)) ]   |   k\' = (t_R - t_M) / t_M',
          description: 'Índice de Kováts lineal en rampa de temperatura (Van den Dool & Kratz) y factor de retención k\'.',
          variables: [
            { symbol: 'RI', name: 'Índice de Retención de Kováts', unit: 'unidades RI (ej. 1025)' },
            { symbol: 'n, n+1', name: 'Número de carbonos n-alcanos vecinos', unit: 'entero (C₅–C₃₀)' },
            { symbol: 't_M', name: 'Tiempo muerto del gas portador', unit: 'min' }
          ]
        }
      ],
      deepExplanation: 'Combinar el índice de retención de Kováts sobre columna DB-5ms y DB-Wax proporciona dos coordenadas ortogonales de identidad química sin ambigüedad.',
      keyTakeaway: 'Convierte tiempos crudos de elución en Índices de Kováts universales y áreas cuantitativas certificables.'
    },
    interactiveSimulationType: 'chromatogram_kovats'
  }
];

export const GC_GALLERY: InstrumentGalleryItem[] = [
  {
    id: 'gc_chassis_3d',
    title: 'Corte Transversal 3D Cromatógrafo de Gases Capilar',
    subtitle: 'Tren neumático y térmico completo: EPC, Inyector Split/Splitless, Horno Capilar y FID',
    manufacturerRef: 'Inspirado en Agilent 8890 GC, Shimadzu Nexis GC-2030 y Bruker SCION 456',
    imageSrc: IMAGES.gcCutawayUltra3d,
    keyFeatures: [
      'Reguladores electrónicos EPC/AFC y trampas catalíticas O₂/H₂O integradas',
      'Torre automuestreadora sobre puerto Split/Splitless desactivado hasta 350 °C',
      'Horno de convección forzada con columna capilar WCOT de sílice fundida (30 m)',
      'Torre detectora FID con llama H₂/aire y electrómetro digital de 7 décadas'
    ],
    specs: [
      { label: 'Rango Horno', value: 'Amb.+4 °C a 450 °C' },
      { label: 'Eficiencia Capilar', value: '> 120,000 platos' },
      { label: 'Repetitividad t_R', value: '< 0.0008 min' }
    ]
  },
  {
    id: 'gc_epc_supply_detail',
    title: 'Control Neumático Electrónico (EPC) y Trampas O₂/H₂O',
    subtitle: 'Regulación bárica sub-milipsi y purificación extrema del gas portador He/H₂/N₂',
    manufacturerRef: 'Sistema EPC Agilent & AFC con Modo Eco Shimadzu',
    imageSrc: IMAGES.gcCarrierEpcSupply,
    keyFeatures: [
      'Compensación automática de viscosidad térmica η(T) durante rampas de horno',
      'Cartuchos indicadores en serie para eliminar humedad (< 10 ppb) y O₂ (< 5 ppb)',
      'Válvulas proporcionales compensadas por presión barométrica ambiente',
      'Soporte de Retention Time Locking (RTL) y flujo constante por modo de gas'
    ],
    specs: [
      { label: 'Resolución Presión', value: '±0.001 psi (EPC)' },
      { label: 'Pureza Gas Portador', value: '99.9999% (UHP 6.0)' },
      { label: 'Gases Compatibles', value: 'He · H₂ · N₂ · Ar' }
    ]
  },
  {
    id: 'gc_inlet_oven_detail',
    title: 'Puerto Split/Splitless y Columna Capilar en Horno',
    subtitle: 'Vaporización flash en liner desactivado y partición en fase estacionaria WCOT',
    manufacturerRef: 'Inyector Ultra-Inerte & Columna Capilar WCOT DB-5ms / DB-Wax',
    imageSrc: IMAGES.gcCapillaryColumnOven,
    keyFeatures: [
      'Tubo capilar de sílice fundida recubierto externamente con poliimida de alta temperatura',
      'Película interna líquida entrecruzada de 0.25 µm con término Eddy A = 0 (Golay)',
      'Turbina radial de convección con uniformidad térmica ±0.1 °C en toda la jaula',
      'Velocidad de calentamiento de hasta 120 °C/min y enfriamiento rápido por aire'
    ],
    specs: [
      { label: 'Dimensiones Capilar', value: '30 m × 0.25 mm × 0.25 µm' },
      { label: 'Límite Térmico', value: '325 °C / 350 °C (ms)' },
      { label: 'Rampa Máxima', value: 'Hasta 120 °C / min' }
    ]
  },
  {
    id: 'gc_fid_detector_detail',
    title: 'Detector de Ionización de Llama (FID) y Electrómetro',
    subtitle: 'Quimio-ionización selectiva a hidrocarburos con boquilla de cuarzo y rango lineal 10⁷',
    manufacturerRef: 'Torre FID Agilent 8890 / Shimadzu Nexis GC-2030',
    imageSrc: IMAGES.gcFidTcdDetector,
    keyFeatures: [
      'Boquilla de cuarzo inerte con encendido electrónico automático de llama H₂ + aire',
      'Electrodo colector cilíndrico polarizado a +250 V libre de saturación',
      'Gas auxiliar "makeup" (N₂/He) que elimina volúmenes muertos post-columna',
      'Respuesta lineal continua sobre siete órdenes de magnitud (pg/s a mg/s)'
    ],
    specs: [
      { label: 'Límite Detección', value: '< 1.2 pg C / s' },
      { label: 'Rango Lineal', value: '> 10⁷ décadas' },
      { label: 'Tasa Adquisición', value: 'Hasta 500 Hz' }
    ]
  }
];
