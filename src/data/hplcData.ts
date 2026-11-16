import { IMAGES } from '../assets/images';
import { ManufacturerTech, InstrumentGalleryItem } from './spectrometryData';

export const HPLC_MANUFACTURERS: ManufacturerTech[] = [
  {
    id: 'agilent',
    name: 'Agilent Technologies',
    country: 'Estados Unidos',
    specialty: 'UHPLC de Alta Presión (1,300 bar), Inyección Dual-Needle y Emulación Inteligente ISET',
    flagshipSeries: 'Agilent 1290 Infinity II LC & 1260 Infinity II Prime',
    keyInnovations: [
      {
        title: 'Bomba de Alta Velocidad InfinityLab (1,300 bar / 5 mL/min)',
        description: 'Dos canales binarios independientes con accionamiento directo y amortiguación de pulso electrónica en tiempo real.',
        impact: 'Sostiene columnas sub-2 µm de ultra alta resolución sin deriva de línea base ni fluctuaciones de gradiente en mezclas agua-acetonitrilo.'
      },
      {
        title: 'Tecnología ISET (Intelligent System Emulation)',
        description: 'Algoritmo fluídico que replica el volumen de retardo (dwell volume) y la dispersión de equipos HPLC heredados de cualquier fabricante.',
        impact: 'Permite transferir métodos farmacopeicos antiguos de 400 bar directamente a un UHPLC moderno sin modificar tiempos de retención.'
      },
      {
        title: 'Automuestreador Multisampler con Doble Aguja (Dual-Needle)',
        description: 'Cabezal robótico con dos rutas de inyección paralelas y lavado multi-solvente activo.',
        impact: 'Reduce el tiempo de ciclo entre inyecciones por debajo de 10 segundos y el arrastre (carryover) a < 0.0009%.'
      },
      {
        title: 'Celda Óptica Max-Light Cartridge (Camino de 60 mm sin Dispersión)',
        description: 'Guía de ondas ópticas en fibra de sílice por reflexión interna total dentro de un cartucho de solo unos microlitros.',
        impact: 'Multiplica la sensibilidad de Beer-Lambert hasta 10 veces respecto a celdas convencionales manteniendo picos cromatográficos ultradelgados.'
      }
    ]
  },
  {
    id: 'shimadzu',
    name: 'Shimadzu Corporation',
    country: 'Japón',
    specialty: 'Analytical Intelligence, Monitoreo Automático de Burbujas FlowPilot y Detectores PDA i-D2',
    flagshipSeries: 'Shimadzu Nexera LC-40 & Prominence LC-2050',
    keyInnovations: [
      {
        title: 'FlowPilot y Purga Automática por Sensor de Presión',
        description: 'Incremento gradual programado del caudal y verificación óptica/bárica continua de ondas de compresibilidad en cada pistón.',
        impact: 'Evita choques térmicos y mecánicos sobre el empaque de sílice C18 al arrancar en frío y detecta burbujas de aire al instante.'
      },
      {
        title: 'Desgasificador de Membrana Teflon AF Ultra Compacto',
        description: 'Cámara de vacío controlada dinámicamente que extrae oxígeno y nitrógeno disueltos a través de tubos fluoropoliméricos permeables a gases.',
        impact: 'Elimina las microburbujas en los cabezales de mezcla agua-metanol y reduce el ruido UV en longitudes de onda cortas (190–210 nm).'
      },
      {
        title: 'Termostato Dual de Celda y Horno CTO-40 con Precalentador Capilar',
        description: 'Control térmico de alta precisión sobre la fase móvil entrante y la columna analítica hasta 100 °C.',
        impact: 'Suprime el gradiente térmico radial dentro del lecho empacado, eliminando el ensanchamiento asimétrico de picos (peak tailing).'
      },
      {
        title: 'Detector PDA SPD-M40 con Matriz de Fotodiodos Estabilizada (i-D2)',
        description: 'Control térmico triple de lámpara D₂, monocromador y arreglo de diodos acoplado a tecnología Intelligent Peak Deconvolution.',
        impact: 'Resuelve espectralmente impurezas ocultas que coeluyen bajo un mismo pico cromatográfico utilizando perfiles UV 3D.'
      }
    ]
  },
  {
    id: 'bruker',
    name: 'Bruker Daltonics & LC',
    country: 'Alemania',
    specialty: 'UHPLC Nano-Acoplado a Espectrometría de Masas (Elute UHPLC), Calentamiento Activo y Baja Dispersión',
    flagshipSeries: 'Bruker Elute UHPLC, Elute SP & nanoElute 2',
    keyInnovations: [
      {
        title: 'Arquitectura Zero-Dead-Volume para Acoplamiento LC-MS y DAD',
        description: 'Conexiones capilares ultra cortas (ID 50–100 µm) entre inyector, columna termostatizada y celda detectora.',
        impact: 'Preserva íntegra la eficiencia teórica (N > 25,000 platos) lograda por columnas core-shell y sub-2 µm en análisis proteómicos y farmacéuticos.'
      },
      {
        title: 'Pistones de Zafiro Sintético de Alta Precisión y Válvulas Check de Rubí',
        description: 'Mecanizado cerámico nanométrico resistente a solventes agresivos, TFA, ácido fórmico y gradientes rápidos hasta 1,300 bar.',
        impact: 'Asegura repetibilidad de tiempos de retención inferior a 0.05% RSD durante miles de inyecciones continuas.'
      },
      {
        title: 'Desgasificación de Volumen Muerto Ultra Bajo (< 400 µL)',
        description: 'Canales paralelos independientes para solventes acuosos, orgánicos y soluciones de lavado de aguja.',
        impact: 'Acelera el cambio de fase móvil entre métodos analíticos consecutivos reduciendo el consumo de acetonitrilo.'
      },
      {
        title: 'Control Integrado HyStar para Sincronización DAD + MS',
        description: 'Sincronización de reloj único entre flujo cromatográfico, espectro UV de arreglo de diodos y barrido iónico en tiempo real.',
        impact: 'Combina cuantificación óptica Beer-Lambert con confirmación exacta de masa molecular en una sola corrida.'
      }
    ]
  }
];

export interface HplcPart {
  id: string;
  name: string;
  shortRole: string;
  category: 'Fase Móvil' | 'Gradiente' | 'Bombeo' | 'Inyección' | 'Separación' | 'Detección' | 'Datos';
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
    | 'mobile_phase'
    | 'gradient_controller'
    | 'pump'
    | 'injector'
    | 'column'
    | 'detector'
    | 'datasystem';
}

export const HPLC_PARTS: HplcPart[] = [
  {
    id: 'mobile_phase',
    name: '1. Reservorios de Fase Móvil y Desgasificador al Vacío',
    shortRole: 'Almacenamiento filtrado de solventes (A: Agua / B: Acetonitrilo) y extracción de gases disueltos',
    category: 'Fase Móvil',
    manufacturerInspiration: 'Desgasificador de membrana Teflon AF Shimadzu Nexera y frascos grado LC Agilent InfinityLab',
    svgRegion: {
      cx: 115,
      cy: 210,
      width: 145,
      height: 170,
      zoomLevel: 2.1,
    },
    whatItIs: 'Botellas de vidrio borosilicato con filtros porosos de entrada (fritas de acero/titanio de 2 µm) conectadas a una cámara de vacío atravesada por tubos de membrana fluoropolimérica impermeable a líquidos.',
    whatItDoes: 'Suministra fase móvil ultralimpia (libre de partículas sólidas) y elimina oxígeno y nitrógeno disueltos antes de que los solventes ingresen a la bomba de alta presión.',
    whyItDoesIt: 'Al mezclar agua con metanol o acetonitrilo se libera calor y disminuye la solubilidad de los gases, formando microburbujas. Una sola burbuja dentro de la bomba impide comprimir el líquido (cavitación), colapsa el caudal y genera picos fantasma en la celda UV.',
    theoreticalReasoning: {
      headline: 'Ley de Henry, Permeación Selectiva y Control de Fuerza Eluyente',
      physicsPrinciples: [
        'Según la Ley de Henry (C_gas = k_H · P_parcial), al aplicar vacío parcial fuera de la membrana de Teflon AF se desplaza el equilibrio hacia la fase gaseosa sin evaporar el solvente.',
        'La eliminación del oxígeno disuelto también suprime la absorción UV parásita de complejos O₂–solvente debajo de 220 nm y protege analitos sensibles a oxidación.',
        'En cromatografía en fase reversa, el agua es el solvente débil (polar) y el acetonitrilo o metanol es el modificador orgánico fuerte (apolar).'
      ],
      equations: [
        {
          formula: 'C_gas = k_H · P_vacío   |   log k = log k_w - S · φ_B',
          description: 'Desgasificación al vacío (Henry) y relación lineal de fuerza eluyente con fracción orgánica φ_B.',
          variables: [
            { symbol: 'C_gas', name: 'Gas remanente disuelto', unit: 'ppm' },
            { symbol: 'P_vacío', name: 'Presión reducida en cámara', unit: 'mbar (~50 mbar)' },
            { symbol: 'φ_B', name: 'Fracción volumétrica orgánico B', unit: '0.05 a 0.95' },
            { symbol: 'S', name: 'Sensibilidad hidrofóbica del soluto', unit: 'adimensional' }
          ]
        }
      ],
      deepExplanation: 'Una fase móvil perfectamente filtrada y desgasificada es el primer requisito para evitar obstrucción de las fritas de 0.2 µm en columnas UHPLC modernas y mantener una línea base plana sin deriva.',
      keyTakeaway: 'Purifica y desgasifica continuamente los solventes para impedir cavitación en las válvulas de la bomba y ruido óptico en el detector.'
    },
    interactiveSimulationType: 'mobile_phase'
  },
  {
    id: 'gradient_controller',
    name: '2. Válvulas Proporcionadoras y Mezclador de Gradiente',
    shortRole: 'Dosificación exacta de la proporción %A / %B en modo Isocrático o Gradiente',
    category: 'Gradiente',
    manufacturerInspiration: 'Mezclador microfluídico Jet Weaver Agilent 1290 y válvulas rápidas Shimadzu LC-40',
    svgRegion: {
      cx: 265,
      cy: 155,
      width: 130,
      height: 115,
      zoomLevel: 2.3,
    },
    whatItIs: 'Módulo de electroválvulas moduladas por ancho de pulso (o cabezales binarios independientes) acopladas a una microcámara helicoidal de mezcla de bajo volumen muerto.',
    whatItDoes: 'Combina con exactitud porcentajes variables de fase móvil acuosa (%A) y orgánica (%B) a lo largo de la corrida, ya sea de composición constante (isocrática) o creciente en orgánico (gradiente).',
    whyItDoesIt: 'Las muestras reales contienen analitos con polaridades muy distintas. En modo isocrático, los compuestos muy retenidos salen demasiado tarde y anchos; el gradiente incrementa progresivamente %B para acelerar su elución con picos estrechos y agudos.',
    theoreticalReasoning: {
      headline: 'Compresión de Bandas en Elución por Gradiente y Volumen de Retardo',
      physicsPrinciples: [
        'Durante un gradiente creciente de %B, la parte trasera de cada banda cromatográfica está expuesta a mayor proporción orgánica que el frente, viajando ligeramente más rápido y comprimiendo el pico.',
        'El tiempo de retención aparente incluye el volumen de retardo del sistema (dwell volume V_D) entre el mezclador y la cabeza de columna.',
        'La capacidad pico (Peak Capacity P_c) se multiplica en gradiente frente a la elución isocrática.'
      ],
      equations: [
        {
          formula: 'k* = (t_G · F) / (V_m · Δφ · S)',
          description: 'Factor de retención efectivo promedio durante elución lineal en gradiente.',
          variables: [
            { symbol: 't_G', name: 'Tiempo total del gradiente', unit: 'min' },
            { symbol: 'F', name: 'Caudal volumétrico', unit: 'mL/min' },
            { symbol: 'V_m', name: 'Volumen muerto de columna', unit: 'mL' },
            { symbol: 'Δφ', name: 'Cambio de fracción orgánica', unit: 'φ_fin - φ_ini' }
          ]
        }
      ],
      deepExplanation: 'Una mezcla incompleta en el mezclador genera ondulaciones sinusoidales en la línea base UV a 210 nm; los mezcladores microfluídicos modernos dividen y recombinan el flujo decenas de veces para lograr homogeneidad con mínimo retraso.',
      keyTakeaway: 'Orquesta dinámicamente la polaridad de la fase móvil (%B) para resolver mezclas complejas desde compuestos hidrofílicos hasta hidrofóbicos.'
    },
    interactiveSimulationType: 'gradient_controller'
  },
  {
    id: 'pump',
    name: '3. Bomba Binaria de Alta Presión (Pistones de Zafiro)',
    shortRole: 'Impulsión continua de fase móvil hasta 400–1,300 bar venciendo la resistencia del lecho empacado',
    category: 'Bombeo',
    manufacturerInspiration: 'Bomba Binaria Agilent 1290 Infinity II (1300 bar) y doble pistón cerámico Bruker Elute / Shimadzu',
    svgRegion: {
      cx: 265,
      cy: 295,
      width: 145,
      height: 130,
      zoomLevel: 2.2,
    },
    whatItIs: 'Bomba recíproca de doble pistón en serie o paralelo fabricada con émbolos de zafiro sintético (Al₂O₃), sellos de PTFE/PEEK y válvulas unidireccionales de bola de rubí.',
    whatItDoes: 'Mantiene un caudal volumétrico constante (ej. 0.5 a 2.0 mL/min) completamente libre de pulsaciones, generando la alta presión hidráulica necesaria para forzar el líquido a través de la columna.',
    whyItDoesIt: 'Las columnas HPLC modernas están empacadas con micropartículas de 1.8 a 5.0 µm. Según la Ley de Darcy / Kozeny-Carman, la caída de presión necesaria crece inversamente con el cuadrado del diámetro de partícula (ΔP ∝ 1/d_p²), exigiendo cientos de bares que la gravedad jamás podría alcanzar.',
    theoreticalReasoning: {
      headline: 'Ley de Darcy-Kozeny-Carman y Compensación de Compresibilidad',
      physicsPrinciples: [
        'Reducir el tamaño de partícula a la mitad (de 3.5 µm a 1.7 µm) duplica la eficiencia cromatográfica pero multiplica la contrapresión requerida por un factor de 4 (≈ 600–1,100 bar).',
        'A presiones UHPLC (> 500 bar), los líquidos ya no son incompresibles: el agua se comprime ~2% y el acetonitrilo ~5%, lo que exige un segundo pistón compensador de carrera variable.',
        'La precisión del caudal determina directamente la reproducibilidad del tiempo de retención t_R.'
      ],
      equations: [
        {
          formula: 'ΔP = (Φ · η · L · u) / d_p²',
          description: 'Ecuación de flujo en medios porosos (Darcy / Kozeny-Carman) para columnas empacadas.',
          variables: [
            { symbol: 'ΔP', name: 'Contrapresión en cabeza de columna', unit: 'bar o MPa' },
            { symbol: 'η', name: 'Viscosidad de la fase móvil', unit: 'mPa·s (cP)' },
            { symbol: 'L', name: 'Longitud de la columna', unit: 'mm' },
            { symbol: 'd_p', name: 'Diámetro de partícula de sílice', unit: 'µm (1.8–5.0)' }
          ]
        }
      ],
      deepExplanation: 'El pistón primario aspira solvente durante su retroceso mientras el pistón secundario (en serie) descarga exactamente el volumen faltante comprimido, manteniendo flujo laminar continuo.',
      keyTakeaway: 'Convierte potencia mecánica de precisión en alta presión estable (hasta 1,300 bar) indispensable para atravesar lechos de micropartículas.'
    },
    interactiveSimulationType: 'pump'
  },
  {
    id: 'injector',
    name: '4. Automuestreador y Válvula Rotatoria de 6 Vías',
    shortRole: 'Introducción cuantitativa de microlitros (1–20 µL) al flujo de alta presión sin detener el sistema',
    category: 'Inyección',
    manufacturerInspiration: 'Válvula de alta presión 6 vías y Multisampler Agilent / Shimadzu SIL-40',
    svgRegion: {
      cx: 430,
      cy: 225,
      width: 145,
      height: 155,
      zoomLevel: 2.2,
    },
    whatItIs: 'Sistema robotizado con aguja de acero inerte, viales septum de 2 mL y una válvula rotatoria de seis puertos (modelo Rheodyne) con sello cerámico/PEEK y bucle calibrado (sample loop).',
    whatItDoes: 'En posición LOAD carga la muestra en el bucle a presión atmosférica mientras la bomba fluye directo hacia la columna; al girar 60° a INJECT, inserta el bucle en la línea de alta presión como un tapón compacto y rectangular.',
    whyItDoesIt: 'Si se inyectara manualmente abriendo la línea a 600 bar, la fase móvil saldría disparada peligrosamente y el aire entraría a la columna. Además, un volumen inyectado demasiado grande o difuso ensancharía todos los picos desde el inicio (band broadening extra-columna).',
    theoreticalReasoning: {
      headline: 'Inyección en Tapón Rectangular y Varianza Extra-Columna',
      physicsPrinciples: [
        'La varianza total del pico cromatográfico suma las varianzas independientes: σ²_total = σ²_inyector + σ²_conexiones + σ²_columna + σ²_detector.',
        'Para no degradar la resolución, el volumen de inyección V_inj debe mantenerse típicamente por debajo del 1–2% del volumen del pico eluido.',
        'La conmutación rotatoria en < 100 ms evita caídas bruscas de presión que fracturarían el lecho de sílice.'
      ],
      equations: [
        {
          formula: 'σ²_total = σ²_col + σ²_inj + σ²_det   (con σ²_inj = V_inj² / 12)',
          description: 'Contribución del volumen de inyección a la anchura total de los picos cromatográficos.',
          variables: [
            { symbol: 'σ²_total', name: 'Varianza temporal total del pico', unit: 's² o µL²' },
            { symbol: 'V_inj', name: 'Volumen inyectado en el bucle', unit: 'µL (1–20 µL)' },
            { symbol: 'σ²_col', name: 'Dispersión intrínseca de la columna', unit: 'µL²' }
          ]
        }
      ],
      deepExplanation: 'El diseño split-loop (flow-through needle) de los automuestreadores modernos mantiene la aguja dentro de la ruta de lavado de alta presión, eliminando volúmenes muertos donde podrían quedar restos de la muestra anterior (carryover).',
      keyTakeaway: 'Introduce volúmenes exactos de microlitros dentro de un flujo a 600+ bar sin interrumpir la corriente ni introducir burbujas.'
    },
    interactiveSimulationType: 'injector'
  },
  {
    id: 'column',
    name: '5. Columna Analítica C18 Empacada y Horno Peltier',
    shortRole: 'El "corazón" donde ocurre la separación molecular por equilibrio hidrofóbico diferenciado',
    category: 'Separación',
    manufacturerInspiration: 'Columnas Agilent ZORBAX Eclipse Plus C18 / Shimadzu Shim-pack y horno térmico Peltier',
    svgRegion: {
      cx: 605,
      cy: 225,
      width: 170,
      height: 155,
      zoomLevel: 2.0,
    },
    whatItIs: 'Tubo de acero inoxidable de alta resistencia (ej. 4.6 × 150 mm o 2.1 × 100 mm) relleno densamente con microesferas porosas de sílice (SiO₂) recubiertas químicamente de cadenas octadecilo apolares (C₁₈H₃₇–), alojado en un horno termostatizado (20–80 °C).',
    whatItDoes: 'Retiene selectivamente a cada compuesto de la mezcla según su afinidad entre la fase estacionaria apolar (C18) y la fase móvil polar (agua/acetonitrilo), haciendo que eluyan en tiempos t_R distintos.',
    whyItDoesIt: 'Las moléculas más polares interactúan poco con las cadenas hidrofóbicas C18 y viajan rápido junto al solvente (t_R bajo); las moléculas más hidrofóbicas se particionan fuertemente en los poros C18 y emergen más tarde. El horno mantiene constante la viscosidad η y el equilibrio de reparto.',
    theoreticalReasoning: {
      headline: 'Ecuación de Van Deemter, Factor de Retención k\' y Resolución R_s',
      physicsPrinciples: [
        'La altura equivalente de plato teórico H = A + B/u + C·u explica que existe una velocidad lineal óptima u_opt donde se minimiza tanto la difusión longitudinal (B/u) como la resistencia a transferencia de masa (C·u).',
        'El número de platos teóricos N = L / H cuantifica cuán estrechos son los picos; bajar d_p de 5 µm a 1.8 µm reduce los términos A y C disparando N.',
        'Aumentar la temperatura disminuye la viscosidad de la fase móvil (baja ΔP) y acelera la difusión reduciendo el término C.'
      ],
      equations: [
        {
          formula: 'H = A + B / u + C · u    |    N = 16 · (t_R / w_b)² = L / H',
          description: 'Ecuación cinética de Van Deemter y eficiencia cromatográfica en platos teóricos N.',
          variables: [
            { symbol: 'H', name: 'Altura de plato teórico (HETP)', unit: 'µm' },
            { symbol: 'A, B, C', name: 'Términos Eddy, difusión axial y transf. de masa', unit: 'coeficientes' },
            { symbol: 'u', name: 'Velocidad lineal de la fase móvil', unit: 'mm / s' },
            { symbol: 't_R, w_b', name: 'Tiempo de retención y ancho base', unit: 'min' }
          ]
        },
        {
          formula: 'R_s = (√N / 4) · ((α - 1) / α) · (k / (1 + k))',
          description: 'Ecuación fundamental de Purnell para la resolución entre dos picos vecinos.',
          variables: [
            { symbol: 'R_s', name: 'Resolución cromatográfica (meta ≥ 1.5)', unit: 'adimensional' },
            { symbol: 'α', name: 'Selectividad química k₂ / k₁', unit: '≥ 1.0' },
            { symbol: 'k', name: 'Factor de retención promedio (t_R - t₀)/t₀', unit: 'óptimo 1–10' }
          ]
        }
      ],
      deepExplanation: 'La ecuación de Purnell es la brújula del cromatografista: incrementar N mejora la resolución solo como √N, mientras que ajustar %B o el tipo de solvente para modificar la selectividad α produce saltos espectaculares en la separación.',
      keyTakeaway: 'Convierte diferencias microscópicas de polaridad e hidrofobicidad en tiempos de elución perfectamente separados sobre miles de platos teóricos.'
    },
    interactiveSimulationType: 'column'
  },
  {
    id: 'detector',
    name: '6. Detector UV-Vis DAD (Arreglo de Diodos) y Celda Z',
    shortRole: 'Medición óptica continua no destructiva en flujo mediante celda de cuarzo de microlitros',
    category: 'Detección',
    manufacturerInspiration: 'Detector DAD Agilent 1290 Max-Light, PDA Shimadzu SPD-M40 y fluorescencia FLD',
    svgRegion: {
      cx: 775,
      cy: 225,
      width: 145,
      height: 150,
      zoomLevel: 2.2,
    },
    whatItIs: 'Microcelda óptica de flujo en geometría "Z" de cuarzo (volumen interno 1–10 µL, paso óptico 10 mm) iluminada por una lámpara de Deuterio/Tungsteno que proyecta la luz transmitida sobre un arreglo de 1,024 fotodiodos de silicio (DAD/PDA).',
    whatItDoes: 'Registra continuamente la absorbancia UV-Vis del eluyente que sale de la columna en múltiples longitudes de onda simultáneas (190–640 nm), convirtiendo cada banda química que pasa en un pico eléctrico proporcional a su concentración.',
    whyItDoesIt: 'Una celda convencional de cubeta (3 mL) diluiría instantáneamente los picos separados volviendo a mezclarlos. La microcelda en Z mantiene el flujo tubular laminar ultra estrecho sin remezclado y captura el espectro UV completo de cada pico para confirmar su identidad y pureza.',
    theoreticalReasoning: {
      headline: 'Ley de Beer-Lambert en Flujo Dinámico y Pureza Espectral 3D',
      physicsPrinciples: [
        'En todo instante t del eluido, la absorbancia instantánea sigue la ley de Beer-Lambert: A(t, λ) = ε(λ) · b_celda · C(t).',
        'Integrar el área bajo el pico ∫A(t)dt arroja una magnitud directamente proporcional a la masa total inyectada del analito: Área = (ε·b / F) · m_inyectada.',
        'Comparar los espectros UV normalizados en la subida, cima y bajada del pico revela si existe una impureza oculta coeluyendo.'
      ],
      equations: [
        {
          formula: 'A(t) = ε(λ) · b · C(t)    ➔    Área_pico = ∫ A(t) dt ∝ m_analito / F',
          description: 'Cuantificación cromatográfica por integración del perfil temporal de absorbancia.',
          variables: [
            { symbol: 'A(t)', name: 'Señal del cromatograma en mAU', unit: 'mAU (10⁻³ UA)' },
            { symbol: 'b', name: 'Paso óptico de la celda Z', unit: '1.0 cm (ó 6.0 cm MaxLight)' },
            { symbol: 'F', name: 'Caudal de fase móvil', unit: 'mL / min' }
          ]
        }
      ],
      deepExplanation: 'El volumen de la celda detectora debe ser menor que la cuarta parte del volumen de dispersión del pico más angosto; de lo contrario, el propio detector ensancha y fusiona los picos que tanto costó separar en la columna.',
      keyTakeaway: 'Transforma la concentración química instantánea a la salida de la columna en señal cuantitativa en mAU y huella espectral UV en tiempo real.'
    },
    interactiveSimulationType: 'detector'
  },
  {
    id: 'datasystem',
    name: '7. Estación Cromatográfica y Cromatograma t_R vs mAU',
    shortRole: 'Integración de áreas, cálculo de t_R, k\', N y resolución R_s',
    category: 'Datos',
    manufacturerInspiration: 'Agilent OpenLab CDS, Shimadzu LabSolutions LC y Bruker Compass HyStar',
    svgRegion: {
      cx: 915,
      cy: 225,
      width: 145,
      height: 155,
      zoomLevel: 2.0,
    },
    whatItIs: 'Software analítico de adquisición a alta frecuencia (80–160 Hz para UHPLC) y procesamiento matemático de picos cromatográficos.',
    whatItDoes: 'Grafica la intensidad del detector (mAU) frente al tiempo (min), detecta automáticamente inicio/fin de cada pico, integra sus áreas para cuantificación y calcula métricas de idoneidad del sistema (USP System Suitability: R_s, N, factor de asimetría T_f).',
    whyItDoesIt: 'Los picos cromatográficos rápidos en UHPLC duran apenas 1 o 2 segundos de base. Se requiere muestreo digital rápido y algoritmos precisos de integración sobre línea base para cuantificar impurezas al 0.05% conforme a normas farmacéuticas.',
    theoreticalReasoning: {
      headline: 'Parámetros de Idoneidad Cromatográfica e Integración Cuantitativa',
      physicsPrinciples: [
        'Tiempo muerto t₀: tiempo mínimo que tarda una molécula no retenida (el solvente) en cruzar la columna; define la línea de referencia cinética.',
        'Factor de retención k\' = (t_R - t₀) / t₀ mide cuántas veces más tiempo pasa el analito en la fase estacionaria C18 respecto a la móvil.',
        'Una separación analítica válida farmacéuticamente exige típicamente R_s ≥ 1.5 (separación a línea base) y factor de asimetría entre 0.8 y 1.5.'
      ],
      equations: [
        {
          formula: 'k\' = (t_R - t₀) / t₀   |   α = k\'₂ / k\'₁   |   R_s = 2·(t_R2 - t_R1) / (w_b1 + w_b2)',
          description: 'Métricas maestras de retención, selectividad y resolución leídas directamente del cromatograma.',
          variables: [
            { symbol: 't₀', name: 'Tiempo muerto de columna', unit: 'min' },
            { symbol: 't_R', name: 'Tiempo de retención del pico', unit: 'min' },
            { symbol: 'w_b', name: 'Ancho del pico en la base', unit: 'min' }
          ]
        }
      ],
      deepExplanation: 'Además de cuantificar por estándar externo o interno mediante áreas, el mapa isotiempo-longitud de onda (isocontorno 3D DAD) permite elegir automáticamente el λ óptimo libre de interferencias de matriz.',
      keyTakeaway: 'Convierte la corriente óptica del detector en métricas químicas certificables de identidad (t_R), pureza espectral y concentración exacta.'
    },
    interactiveSimulationType: 'datasystem'
  }
];

export const HPLC_GALLERY: InstrumentGalleryItem[] = [
  {
    id: 'hplc_chassis_3d',
    title: 'Corte Transversal Modular UHPLC (Alta Presión)',
    subtitle: 'Tren fluídico completo desde reservorios y bomba binaria hasta columna C18 y celda DAD',
    manufacturerRef: 'Inspirado en Agilent 1290 Infinity II, Shimadzu Nexera LC-40 y Bruker Elute',
    imageSrc: IMAGES.hplcCutawayUltra3d,
    keyFeatures: [
      'Reservorios de fase móvil A/B acoplados a desgasificador al vacío de membrana fluoropolimérica',
      'Bomba binaria de alta presión hasta 1,300 bar con compensación activa de compresibilidad',
      'Automuestreador robótico con válvula rotatoria de 6 puertos de ultra baja dispersión',
      'Horno de columna Peltier con lecho C18 sub-2 µm y detector UV-Vis DAD en línea'
    ],
    specs: [
      { label: 'Presión Máxima', value: '1,300 bar (UHPLC)' },
      { label: 'Rango de Caudal', value: '0.05 - 5.0 mL/min' },
      { label: 'Volumen de Inyección', value: '0.1 - 100 µL' }
    ]
  },
  {
    id: 'hplc_pump_degasser_detail',
    title: 'Bomba Binaria de Pistones de Zafiro y Desgasificador',
    subtitle: 'Generación hidráulica sin pulsaciones y eliminación de burbujas por Ley de Henry',
    manufacturerRef: 'Pistones de zafiro sintético & rubí Bruker Elute / Agilent InfinityLab',
    imageSrc: IMAGES.hplcBinaryPumpDegasser,
    keyFeatures: [
      'Émbolos cerámicos de zafiro (Al₂O₃) y válvulas de retención con bola y asiento de rubí',
      'Amortiguación activa de pulsos mediante pistones en serie primario/secundario',
      'Desgasificación continua con membrana Teflon AF de volumen muerto mínimo',
      'Precisión de composición de gradiente ±0.15% independientemente de la contrapresión'
    ],
    specs: [
      { label: 'Precisión Caudal', value: '< 0.07% RSD' },
      { label: 'Material Pistón', value: 'Zafiro Monocristalino' },
      { label: 'Vacío Desgasificador', value: '~50 mbar estables' }
    ]
  },
  {
    id: 'hplc_column_c18_detail',
    title: 'Columna Analítica C18 Empacada en Horno Peltier',
    subtitle: 'Separación en fase reversa de micropartículas porosas según ecuación de Van Deemter',
    manufacturerRef: 'Columnas C18 sub-2 µm Agilent ZORBAX / Shimadzu Shim-pack',
    imageSrc: IMAGES.hplcC18ColumnOven,
    keyFeatures: [
      'Microesferas de sílice ultrapura de 1.8 a 5.0 µm funcionalizadas con cadenas octadecilo C18',
      'Precalentador de fase móvil para eliminar gradientes térmicos radiales (peak tailing)',
      'Fritas de retención de titanio/acero inoxidable de 0.2 µm para alta permeabilidad',
      'Eficiencia teórica superior a 25,000 platos por columna para separaciones rápidas'
    ],
    specs: [
      { label: 'Partícula Empaque', value: '1.8 / 3.5 / 5.0 µm' },
      { label: 'Control Térmico', value: '20 °C a 85 °C (±0.05°)' },
      { label: 'Eficiencia N', value: '12,000 - 30,000 platos' }
    ]
  },
  {
    id: 'hplc_dad_flowcell_detail',
    title: 'Detector de Arreglo de Diodos (DAD) y Válvula de Inyección',
    subtitle: 'Inyección exacta en bucle de 6 vías y detección óptica continua en celda Z de cuarzo',
    manufacturerRef: 'Celda Max-Light Agilent / Matriz PDA Shimadzu SPD-M40',
    imageSrc: IMAGES.hplcDadDetector,
    keyFeatures: [
      'Celda de flujo en Z de microlitros que evita el remezclado extra-columna de bandas separadas',
      'Captura espectral UV-Vis simultánea de 190 a 640 nm hasta 120 Hz',
      'Verificación de pureza de pico mediante superposición espectral normalizada 3D',
      'Integrado tras inyector de 6 vías con sello PEEK/cerámico resistente a 1,300 bar'
    ],
    specs: [
      { label: 'Frecuencia Muestreo', value: 'Hasta 160 Hz (UHPLC)' },
      { label: 'Paso Óptico Celda', value: '10 mm estándar (60 Max)' },
      { label: 'Ruido Fotométrico', value: '< ±0.35 × 10⁻⁵ AU' }
    ]
  }
];
