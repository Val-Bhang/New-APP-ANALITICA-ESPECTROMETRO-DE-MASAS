import { IMAGES } from '../assets/images';

export interface ManufacturerTech {
  id: string;
  name: string;
  country: string;
  specialty: string;
  flagshipSeries: string;
  keyInnovations: {
    title: string;
    description: string;
    impact: string;
  }[];
}

export const LEADING_MANUFACTURERS: ManufacturerTech[] = [
  {
    id: 'agilent',
    name: 'Agilent Technologies',
    country: 'Estados Unidos',
    specialty: 'Cromatografía de Gases acoplada a Masas (GC/MSD) y Triple Cuadrupolo LC/TQ',
    flagshipSeries: 'Agilent 5977C GC/MSD & 6495 Triple Quad LC/MS',
    keyInnovations: [
      {
        title: 'Fuente de Alta Eficiencia (HES - High Efficiency Source)',
        description: 'Geometría de extracción iónica radial con doble filamento que maximiza el confinamiento electrostático de los cationes formados.',
        impact: 'Aumenta la transmisión iónica en un factor de 10x y permite límites de detección en el rango de attogramos (10⁻¹⁸ g).'
      },
      {
        title: 'Cuadrupolo de Cuarzo Recubierto en Oro Hiperbólico',
        description: 'Monolito de cuarzo de alta pureza con superficie hiperbólica maquinada a tolerancias submicrométricas y baño de oro puro.',
        impact: 'Permite calentar el cuadrupolo hasta 200 °C de forma continua sin deformación térmica, eliminando la contaminación por matrices complejas.'
      },
      {
        title: 'Sistema de Autolimpieza JetClean',
        description: 'Microinyección dosificada de hidrógeno (H₂) de ultra alta pureza durante la ionización o en reposo.',
        impact: 'Remueve depósitos de carbón y matriz aromática de la cámara sin necesidad de romper el vacío ni desmontar el equipo.'
      },
      {
        title: 'Detector de Triple Eje (TAD - Triple-Axis Detector)',
        description: 'Dínodo de alta energía (HED) montado a 90° con multiplicador fuera de eje óptico.',
        impact: 'Previene que fotones UV y partículas neutras no desviadas choquen con el detector, reduciendo el ruido de fondo casi a cero.'
      }
    ]
  },
  {
    id: 'shimadzu',
    name: 'Shimadzu Corporation',
    country: 'Japón',
    specialty: 'Espectrometría de Masas Ultrarrápida (UFms) y Celdas de Colisión de Alta Velocidad',
    flagshipSeries: 'Shimadzu GCMS-QP2020 NX & LCMS-8060RX',
    keyInnovations: [
      {
        title: 'Tecnología UFms (Ultra-Fast Mass Spectrometry)',
        description: 'Electrónica de radiofrecuencia (RF) ultrarrápida combinada con fuentes de alimentación de cuasi-cero latencia.',
        impact: 'Permite velocidades de barrido espectral de hasta 30,000 u/seg y conmutación de polaridad positiva/negativa en solo 5 ms.'
      },
      {
        title: 'Celda de Colisión UF-Sweeper®',
        description: 'Electrodos pseudo-superficiales que generan un gradiente electrostático axial acelerador dentro de la celda de gas inerte.',
        impact: 'Evacúa los iones fragmentados en microsegundos, eliminando por completo el crosstalk o solapamiento entre transiciones MRM.'
      },
      {
        title: 'Lente Overdrive Lens y Enfoque Iónico Asimétrico',
        description: 'Conjunto de electrodos cilíndricos compensadores de aberración cromática iónica antes de la rendija de entrada.',
        impact: 'Focaliza iones con dispersión de energía cinética reduciendo el ensanchamiento instrumental de picos a masas elevadas.'
      },
      {
        title: 'Fuente Dual Simultánea ESI / APCI (DUIS)',
        description: 'Cabezal de ionización combinado que aplica nebulización térmica y descarga de corona simultáneamente.',
        impact: 'Ioniza en un único barrido analítico tanto compuestos polares como no polares sin cambiar la sonda física.'
      }
    ]
  },
  {
    id: 'bruker',
    name: 'Bruker Daltonics',
    country: 'Alemania',
    specialty: 'Alta Resolución Q-TOF, FT-ICR Magnético Extremo y Movilidad Iónica Atrapada (TIMS)',
    flagshipSeries: 'Bruker timsTOF Pro 2, solariX FT-ICR & rapifleX MALDI-TOF',
    keyInnovations: [
      {
        title: 'Movilidad Iónica Atrapada (TIMS - Trapped Ion Mobility)',
        description: 'Túnel de electrodos RF segmentados donde los iones se equilibran contra un flujo continuo de gas de arrastre.',
        impact: 'Separa isómeros geométricos y conformacionales por su sección transversal de colisión (CCS) antes del análisis de masas.'
      },
      {
        title: 'Láser SmartBeam 3D para MALDI',
        description: 'Láser pulsado de estado sólido UV (355 nm) de 10 kHz con óptica de enfoque dinámico micrométrico.',
        impact: 'Permite mapeo de imagen molecular por espectrometría (MALDI Imaging) sobre cortes de tejido biológico a resolución celular.'
      },
      {
        title: 'Célula ParaCell™ para Resonancia Ciclotrónica (FT-ICR)',
        description: 'Trampa iónica de geometría parabólica inmersa en un imán superconductor de hasta 15 Tesla.',
        impact: 'Alcanza poderes de resolución extremos (R > 1,000,000), distinguiendo masa exacta hasta la milésima de dalton en petroleómica y proteómica.'
      },
      {
        title: 'Embudo Iónico Dual Apollo II',
        description: 'Embudo de placas anulares concéntricas decrecientes con campo RF para capturar el cono de electrospray.',
        impact: 'Transfiere más del 80% de los iones dispersos desde la atmósfera hasta el primer nivel de vacío de la bomba turbomolecular.'
      }
    ]
  }
];

export interface SpectrometryPart {
  id: string;
  name: string;
  shortRole: string;
  category: 'Muestra' | 'Ionización' | 'Aceleración' | 'Separación' | 'Detección' | 'Vacío' | 'Datos';
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
  interactiveSimulationType: 'inlet' | 'vacuum' | 'ionizer' | 'accelerator' | 'analyzer' | 'detector' | 'datasystem';
}

export const SPECTROMETRY_PARTS: SpectrometryPart[] = [
  {
    id: 'inlet',
    name: '1. Sistema de Introducción de Muestra',
    shortRole: 'Vaporización y entrada molecular controlada',
    category: 'Muestra',
    manufacturerInspiration: 'Inspirado en inyectores Split/Splitless Agilent 8890 GC y muestreadores automáticos Shimadzu AOC-20i Plus',
    svgRegion: {
      cx: 140,
      cy: 290,
      width: 140,
      height: 120,
      zoomLevel: 2.2,
    },
    whatItIs: 'Un puerto de inyección de precisión equipado con capilares micrométricos, calentador térmico y tabique de inyección (septum) acoplable a Cromatografía de Gases (GC) o Sonda de Inserción Directa (DIP).',
    whatItDoes: 'Recibe muestras líquidas, sólidas o gaseosas en volúmenes ultrabajos (microlitros), las calienta instantáneamente para vaporizarlas y las introduce a la cámara a una tasa constante de flujo molecular.',
    whyItDoesIt: 'La espectrometría de masas opera a nivel de partículas libres individuales. Las moléculas en fase condensada (líquido/sólido) están unidas por fuerzas intermoleculares (Van der Waals, puentes de hidrógeno) que impedirían que vuelen y se separen de manera reproducible.',
    theoreticalReasoning: {
      headline: 'Régimen de Flujo Molecular y Ecuación de Knudsen',
      physicsPrinciples: [
        'Efusióm molecular a través de un orificio micrométrico.',
        'La muestra debe entrar como gas ideal diluido para evitar la condensación o formación de clusters neutros.',
        'El número de Knudsen (Kn) debe ser mayor a 10 para garantizar colisiones nulas entre moléculas analito.'
      ],
      equations: [
        {
          formula: 'Kn = λ / d > 10',
          description: 'Criterio de Knudsen para flujo molecular libre sin turbulencias.',
          variables: [
            { symbol: 'Kn', name: 'Número de Knudsen', unit: 'adimensional' },
            { symbol: 'λ', name: 'Libre camino medio molecular', unit: 'metros (m)' },
            { symbol: 'd', name: 'Diámetro del orificio capilar', unit: 'metros (m)' }
          ]
        }
      ],
      deepExplanation: 'Para que no ocurran reacciones secundarias entre moléculas neutras antes de ser ionizadas, la muestra debe ingresar como vapor monomolecular. El calentamiento controlado (150 - 300 °C) provee la entalpía de vaporización (ΔH_vap) necesaria sin alcanzar la temperatura de pirolisis o degradación térmica prematura.',
      keyTakeaway: 'Transforma una gota macroscópica en una corriente continua de moléculas neutras aisladas listas para ser cargadas eléctricamente.'
    },
    interactiveSimulationType: 'inlet'
  },
  {
    id: 'vacuum',
    name: '2. Sistema de Ultra Alto Vacío',
    shortRole: 'Eliminación colisional y libre trayectoria iónica',
    category: 'Vacío',
    manufacturerInspiration: 'Bombas Turbomoleculares de alta velocidad tipo Pfeiffer/Leybold y tecnología de bombeo diferencial Shimadzu',
    svgRegion: {
      cx: 480,
      cy: 450,
      width: 260,
      height: 160,
      zoomLevel: 1.8,
    },
    whatItIs: 'Conjunto de bombas mecánicas primarias (rotatorias de paletas/scroll) conectadas en cascada con potentes bombas turbomoleculares con rotores a más de 60,000 RPM, manteniendo presiones de 10⁻⁵ a 10⁻⁸ Torr (10⁻³ a 10⁻⁶ Pa).',
    whatItDoes: 'Evacúa de forma continua y rigurosa todo el nitrógeno, oxígeno, agua y gases ambientales que componen la atmósfera dentro del túnel de vuelo y las cavidades del espectrómetro.',
    whyItDoesIt: 'Si existiera aire en la trayectoria, un ion viajaría apenas unos pocos micrómetros antes de chocar violentamente contra una molécula de nitrógeno o vapor de agua, neutralizando su carga o desviándolo fuera del haz útil.',
    theoreticalReasoning: {
      headline: 'Libre Camino Medio e Inercia Cinética de Gases',
      physicsPrinciples: [
        'Relación inversamente proporcional entre presión de fondo y libre camino medio.',
        'A presión atmosférica (760 Torr), el libre camino medio es de apenas 68 nanómetros.',
        'A 10⁻⁶ Torr, el libre camino medio supera los 50 metros, permitiendo que el ion viaje libremente por el tubo de 0.8 metros sin una sola colisión.'
      ],
      equations: [
        {
          formula: 'λ = (k_B · T) / (√2 · π · d_mol² · P)',
          description: 'Ecuación de libre camino medio en gases cinéticos.',
          variables: [
            { symbol: 'λ', name: 'Libre camino medio de las partículas', unit: 'metros (m)' },
            { symbol: 'k_B', name: 'Constante de Boltzmann (1.38×10⁻²³)', unit: 'J/K' },
            { symbol: 'T', name: 'Temperatura absoluta', unit: 'Kelvin (K)' },
            { symbol: 'd_mol', name: 'Diámetro cinético promedio', unit: 'metros (m)' },
            { symbol: 'P', name: 'Presión interna en la cámara', unit: 'Pascales (Pa)' }
          ]
        }
      ],
      deepExplanation: 'Un vacío insuficiente degrada el espectro de dos formas fatales: la colisión neutraliza la carga del ion (desaparece de la vista electromagnética) y las moléculas residuales de aire provocan colisiones inducidas (CID indeseado), generando picos espurios y ensanchando las líneas espectrales hasta hacer imposible medir masas exactas.',
      keyTakeaway: 'El vacío no es un simple accesorio: es el medio óptico transparente necesario para que los iones se comporten como proyectiles balísticos obedientes a Lorentz.'
    },
    interactiveSimulationType: 'vacuum'
  },
  {
    id: 'ionizer',
    name: '3. Cámara de Ionización (Impacto Electrónico - EI)',
    shortRole: 'Generación cuántica de cationes moleculares y fragmentos',
    category: 'Ionización',
    manufacturerInspiration: 'Patente Agilent High Efficiency Source (HES), sistema JetClean y fuentes de haz guiado Shimadzu',
    svgRegion: {
      cx: 280,
      cy: 290,
      width: 150,
      height: 120,
      zoomLevel: 2.1,
    },
    whatItIs: 'Cámara cerrada de acero inoxidable equipada con un filamento de tungsteno o renio incandescente emisor de electrones térmicos, una trampa de electrones (ánodo) y una placa repulsora cargada positivamente.',
    whatItDoes: 'Bombardea las moléculas neutras que ingresan con un haz transversal de electrones acelerados a exactamente 70 electronvoltios (70 eV). Al pasar cerca de la nube electrónica de la molécula, el electrón incidente expulsa uno de los electrones de valencia del analito.',
    whyItDoesIt: 'Los campos eléctricos y magnéticos solo ejercen fuerza sobre partículas con carga eléctrica neta. Las moléculas neutras son invisibles a la máquina y no podrían ser aceleradas ni desviadas.',
    theoreticalReasoning: {
      headline: 'Efecto Túnel, Resonancia de De Broglie y Potencial de Ionización',
      physicsPrinciples: [
        'La mayoría de moléculas orgánicas tienen potenciales de ionización (IP) entre 7 y 15 eV.',
        'Se usan 70 eV porque la longitud de onda cuántica de De Broglie del electrón a esa energía (λ ≈ 1.4 Å) coincide con la longitud típica de los enlaces covalentes orgánicos.',
        'La transferencia de energía supera el potencial de ionización, dejando al catión molecular [M]⁺• con exceso de energía vibracional que desencadena fragmentaciones químicas unimoleculares predictibles.'
      ],
      equations: [
        {
          formula: 'M + e⁻ (70 eV) ➔ M⁺• + 2 e⁻',
          description: 'Reacción primordial de ionización por impacto electrónico.',
          variables: [
            { symbol: 'M', name: 'Molécula neutra analito', unit: 'fase gas' },
            { symbol: 'M⁺•', name: 'Catión radical (Ion molecular)', unit: 'carga +1' },
            { symbol: '2 e⁻', name: 'Electrón incidente + electrón eyectado', unit: 'electrones libres' }
          ]
        },
        {
          formula: 'λ_dB = h / p = h / √(2 m_e E)',
          description: 'Longitud de onda de De Broglie del electrón bombardero.',
          variables: [
            { symbol: 'λ_dB', name: 'Longitud de onda cuántica', unit: 'metros (~1.4 Å)' },
            { symbol: 'h', name: 'Constante de Planck', unit: 'J·s' },
            { symbol: 'E', name: 'Energía cinética del electrón', unit: '70 eV' }
          ]
        }
      ],
      deepExplanation: 'Al romperse enlaces selectivos según su energía de disociación y la estabilidad de los carbocationes intermedios (terciario > secundario > primario; transposiciones de McLafferty, pérdidas de grupos CO, H2O, metilos), se generan fragmentos únicos cuya distribución relativa constituye la huella dactilar de la estructura química.',
      keyTakeaway: 'Convierte moléculas inertes neutras en proyectiles cargados energizados que revelan su arquitectura interna mediante fragmentación cuantificada.'
    },
    interactiveSimulationType: 'ionizer'
  },
  {
    id: 'accelerator',
    name: '4. Acelerador y Colimador Electrostático',
    shortRole: 'Enfoque de haz y homogeneización de energía cinética',
    category: 'Aceleración',
    manufacturerInspiration: 'Sistema de Lentes Overdrive de Shimadzu y óptica electrostática Einzel de Bruker',
    svgRegion: {
      cx: 410,
      cy: 290,
      width: 130,
      height: 120,
      zoomLevel: 2.2,
    },
    whatItIs: 'Serie de placas paralelas perforadas con rendijas micrométricas y lentes electrostáticas de Einzel conectadas a un divisor de alto voltaje regulado (1,000 a 8,000 Voltios).',
    whatItDoes: 'Empuja los cationes recién formados hacia afuera de la cámara mediante un potencial repulsor positivo y los acelera a través de una caída de potencial V, colimando los iones en una fina cinta paralela.',
    whyItDoesIt: 'Para poder separar los iones según su masa en la siguiente etapa, todos deben ingresar al analizador con una energía cinética estrictamente conocida e idéntica proporcionada por el campo eléctrico.',
    theoreticalReasoning: {
      headline: 'Conservación de Energía Electrostática a Cinética',
      physicsPrinciples: [
        'La energía potencial electrostática ganada por la carga q al cruzar el voltaje V se transforma íntegramente en energía cinética Ek.',
        'Como Ek = qV = ½ m v², todos los iones con la misma carga adquieren la misma energía cinética, pero velocidades inversamente proporcionales a la raíz cuadrada de su masa.',
        'Los iones ligeros emergen a gran velocidad; los iones pesados emergen más lentos.'
      ],
      equations: [
        {
          formula: 'E_k = q · V = ½ · m · v²',
          description: 'Principio de equipartición electrostática-cinética.',
          variables: [
            { symbol: 'E_k', name: 'Energía cinética del ion', unit: 'Joules (J)' },
            { symbol: 'q', name: 'Carga del ion (z · e)', unit: 'Coulombs (C)' },
            { symbol: 'V', name: 'Voltaje de aceleración aplicado', unit: 'Voltios (V)' },
            { symbol: 'm', name: 'Masa del ion', unit: 'kilogramos (kg)' },
            { symbol: 'v', name: 'Velocidad de salida del haz', unit: 'm/s' }
          ]
        },
        {
          formula: 'v = √( (2 · q · V) / m )',
          description: 'Velocidad terminal del ion al ingresar al analizador.',
          variables: [
            { symbol: 'v', name: 'Velocidad escalar', unit: 'm/s' },
            { symbol: 'm/q', name: 'Relación masa a carga', unit: 'kg/C' }
          ]
        }
      ],
      deepExplanation: 'Las rendijas colimadoras adicionales descartan aquellos iones que viajan con ángulos divergentes o componentes de velocidad lateral no deseadas, garantizando que el haz de entrada al analizador sea cuasi-monocromático en dirección.',
      keyTakeaway: 'Unifica la energía cinética de todos los iones y alinea su trayectoria hacia el sector de separación.'
    },
    interactiveSimulationType: 'accelerator'
  },
  {
    id: 'analyzer',
    name: '5. Analizador de Masas (Sector Magnético & Cuadrupolo)',
    shortRole: 'Dispersión y curvatura balística por relación m/z',
    category: 'Separación',
    manufacturerInspiration: 'Varillas de cuarzo en oro hiperbólicas Agilent, tecnología UFms Shimadzu y sector magnético Bruker',
    svgRegion: {
      cx: 630,
      cy: 250,
      width: 220,
      height: 190,
      zoomLevel: 1.8,
    },
    whatItIs: 'Un electroimán con polos mecanizados en forma de sector circular (típicamente 60° o 90°) que proyecta un campo magnético homogéneo perpendicular (B) a través de un tubo de vuelo curvo de radio fijo R.',
    whatItDoes: 'Obliga a los iones cargados en movimiento a describir trayectorias circulares debido a la fuerza magnética de Lorentz, separando el haz único en múltiples arcos concéntricos según la masa del ion.',
    whyItDoesIt: 'Es el corazón diferenciador del instrumento: traduce una mezcla caótica de iones en trayectorias espaciales separadas físicamente por su inercia y carga.',
    theoreticalReasoning: {
      headline: 'Ecuación Fundamental del Espectrómetro de Masas',
      physicsPrinciples: [
        'La fuerza de Lorentz actúa siempre perpendicular a la velocidad, funcionando como fuerza centrípeta sin alterar el módulo de la velocidad.',
        'La inercia (masa) resiste el giro: los iones pesados se curvan poco (gran radio); los ligeros se curvan bruscamente (radio pequeño).',
        'Solo los iones cuyo radio coincide exactamente con el radio de curvatura del tubo (r = R) consiguen salir por la rendija focal final y tocar el detector.'
      ],
      equations: [
        {
          formula: 'F_Lorentz = q · v · B = (m · v²) / r  ➔  r = (m · v) / (q · B)',
          description: 'Equilibrio centrípeto en el campo magnético transversal.',
          variables: [
            { symbol: 'B', name: 'Intensidad del campo magnético', unit: 'Tesla (T)' },
            { symbol: 'r', name: 'Radio de la trayectoria circular descrita', unit: 'metros (m)' },
            { symbol: 'q', name: 'Carga eléctrica del catión', unit: 'Coulombs (C)' }
          ]
        },
        {
          formula: 'm / z = (e · B² · r²) / (2 · V)',
          description: 'Ecuación maestra de la espectrometría de masas.',
          variables: [
            { symbol: 'm/z', name: 'Relación masa a carga', unit: 'Daltons / carga (Th)' },
            { symbol: 'e', name: 'Carga elemental fundamental (1.602×10⁻¹⁹ C)', unit: 'C' },
            { symbol: 'B', name: 'Campo magnético aplicado', unit: 'Tesla (T)' },
            { symbol: 'V', name: 'Voltaje de aceleración previo', unit: 'Voltios (V)' },
            { symbol: 'r', name: 'Radio geométrico del tubo de vuelo', unit: 'm' }
          ]
        }
      ],
      deepExplanation: 'Al variar continuamente la intensidad del electroimán B (o el voltaje V), el espectrómetro "barre" de forma sucesiva todos los valores de m/z desde 10 hasta 1,000 Th. Cada relación masa/carga enfoca sucesivamente sobre la rendija de salida en un instante temporal preciso.',
      keyTakeaway: 'Aplica la fuerza de Lorentz para convertir la inercia molecular en una trayectoria balística medible al micrómetro.'
    },
    interactiveSimulationType: 'analyzer'
  },
  {
    id: 'detector',
    name: '6. Detector de Iones (Multiplicador de Electrones TAD)',
    shortRole: 'Cascada de dínodos y amplificación femtoamperimétrica',
    category: 'Detección',
    manufacturerInspiration: 'Detector de Triple Eje (TAD) con Dínodo HED de Agilent y multiplicador de pulsos Shimadzu',
    svgRegion: {
      cx: 820,
      cy: 160,
      width: 140,
      height: 120,
      zoomLevel: 2.2,
    },
    whatItIs: 'Tubo de vacío con un cuerno curvo continuo (Channeltron) o una cadena de 12 a 24 dínodos discretos recubiertos con óxido de berilio/cobre bajo potenciales eléctricos crecientes (+1,500 V a +3,000 V).',
    whatItDoes: 'Recibe el impacto de cada catión individual que logra cruzar la rendija colectora y desencadena una avalancha en cascada de millones de electrones secundarios que culminan en un pulso eléctrico cuantificable en el ánodo.',
    whyItDoesIt: 'La corriente de iones que llega es extraordinariamente minúscula (frecuentemente del orden de femtoamperios, 10⁻¹⁵ A, o unos pocos cientos de iones por segundo). Ningún circuito microelectrónico convencional puede medir esa corriente sin amplificarla exponencialmente antes.',
    theoreticalReasoning: {
      headline: 'Emisión Secundaria y Ganancia Exponencial',
      physicsPrinciples: [
        'Efecto de eyección de electrones secundarios: cuando un ion con alta energía cinética golpea la superficie metálica con bajo trabajo de extracción, expulsa de 2 a 3 electrones.',
        'El campo eléctrico acelera esos electrones expulsados hacia el siguiente dínodo a mayor potencial, donde cada uno expulsa otros 2 a 3 electrones.',
        'En una cadena de N dínodos con coeficiente de emisión secundaria δ, la ganancia total del sistema es G = δ^N (típicamente 10⁶ a 10⁸ electrones por cada ion).'
      ],
      equations: [
        {
          formula: 'G = δᴺ  ➔  I_ánodo = G · I_iónico',
          description: 'Factor de ganancia total del multiplicador de electrones.',
          variables: [
            { symbol: 'G', name: 'Ganancia de amplificación', unit: 'factor 10⁶ - 10⁸' },
            { symbol: 'δ', name: 'Coeficiente de emisión secundaria por dínodo', unit: '2 - 3.5' },
            { symbol: 'N', name: 'Número de etapas de dínodos', unit: 'adimensional (16-24)' },
            { symbol: 'I_ánodo', name: 'Corriente colectada para digitalización', unit: 'microamperios (μA)' }
          ]
        }
      ],
      deepExplanation: 'El detector opera con una respuesta temporal en el rango de los nanosegundos, lo que permite contar partículas casi ion a ion con un rango dinámico lineal que abarca más de seis órdenes de magnitud de concentración analítica.',
      keyTakeaway: 'Transforma el sutil susurro de un ion individual en un grito electrónico de un millón de electrones listo para ser graficado.'
    },
    interactiveSimulationType: 'detector'
  },
  {
    id: 'datasystem',
    name: '7. Sistema de Adquisición y Procesamiento de Datos',
    shortRole: 'Digitalización y generación del espectro m/z',
    category: 'Datos',
    manufacturerInspiration: 'Estaciones de trabajo Agilent MassHunter, Shimadzu LabSolutions y Bruker Compass DataAnalysis',
    svgRegion: {
      cx: 930,
      cy: 280,
      width: 140,
      height: 120,
      zoomLevel: 2.0,
    },
    whatItIs: 'Conversor analógico-digital (ADC) de alta velocidad acoplado a un microprocesador digital con bibliotecas de calibración de masas y algoritmos de deconvolución espectral.',
    whatItDoes: 'Registra en tiempo real la corriente de salida del detector en correlación estricta con el valor instantáneo del campo magnético B (o frecuencia RF), calculando el m/z correspondiente y graficando el histograma de abundancia relativa.',
    whyItDoesIt: 'Permite al científico visualizar e interpretar la masa molecular exacta, la presencia de isótopos naturales y el patrón de fragmentación para dilucidar la identidad estructural de sustancias desconocidas.',
    theoreticalReasoning: {
      headline: 'Normalización de Abundancia Relativa y Análisis Isotópico',
      physicsPrinciples: [
        'Normalización al Pico Base: el pico de mayor abundancia en el rango se escala arbitrariamente al 100% de abundancia relativa.',
        'Pico del Ion Molecular [M]⁺•: indica la masa molar entera del compuesto.',
        'Picos isotópicos [M+1] y [M+2]: reflejan la presencia natural de isótopos pesados (1.1% de Carbono-13 por cada carbono, o 24.2% de Cloro-37 que da un patrón característico 3:1).'
      ],
      equations: [
        {
          formula: 'Abundancia Relativa (%) = ( Intensidad_{m/z} / Intensidad_{Pico Base} ) × 100',
          description: 'Cálculo estándar de normalización del espectro de masas.',
          variables: [
            { symbol: 'm/z', name: 'Posición de relación masa a carga', unit: 'Daltons / z' },
            { symbol: 'Pico Base', name: 'Ion más estable y abundante detectado', unit: '100% referencia' }
          ]
        }
      ],
      deepExplanation: 'El software compara el espectro obtenido con bibliotecas estándar de referencia (como la base de datos NIST con más de 300,000 espectros) mediante algoritmos de similitud de producto escalar, identificando compuestos orgánicos, fármacos, toxinas o biomoléculas en cuestión de segundos.',
      keyTakeaway: 'Convierte señales eléctricas en la firma molecular definitiva que identifica qué compuestos químicos existen en la muestra.'
    },
    interactiveSimulationType: 'datasystem'
  }
];

export interface CompoundSample {
  id: string;
  name: string;
  formula: string;
  molarMass: number;
  description: string;
  basePeakMz: number;
  molecularIonMz: number;
  peaks: {
    mz: number;
    relativeAbundance: number;
    fragmentFormula: string;
    description: string;
    isBasePeak?: boolean;
    isMolecularIon?: boolean;
    isIsotopic?: boolean;
  }[];
}

export const SAMPLE_COMPOUNDS: CompoundSample[] = [
  {
    id: 'ethanol',
    name: 'Etanol',
    formula: 'C₂H₆O',
    molarMass: 46,
    description: 'Alcohol clásico con una fragmentación alfa muy representativa que da lugar al oxonio m/z 31.',
    basePeakMz: 31,
    molecularIonMz: 46,
    peaks: [
      { mz: 15, relativeAbundance: 12, fragmentFormula: '[CH₃]⁺', description: 'Ruptura de enlace C-C con pérdida de catión metilo.' },
      { mz: 27, relativeAbundance: 18, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmentación secundaria del hidrocarburo.' },
      { mz: 29, relativeAbundance: 24, fragmentFormula: '[C₂H₅]⁺ / [CHO]⁺', description: 'Pérdida de ion etilo o reordenamiento del formilo.' },
      { mz: 31, relativeAbundance: 100, fragmentFormula: '[CH₂=OH]⁺', description: 'Pico Base: Ruptura alfa estabilizada por resonancia con el oxígeno.', isBasePeak: true },
      { mz: 45, relativeAbundance: 42, fragmentFormula: '[M - H]⁺', description: 'Pérdida de un protón radicalario del grupo metileno.' },
      { mz: 46, relativeAbundance: 28, fragmentFormula: '[C₂H₆O]⁺•', description: 'Ion Molecular intacto: catión radical del etanol.', isMolecularIon: true },
      { mz: 47, relativeAbundance: 1.2, fragmentFormula: '[¹³C C H₆ O]⁺•', description: 'Pico isotópico natural por presencia de Carbono-13 (aprox 2.2%).', isIsotopic: true }
    ]
  },
  {
    id: 'water',
    name: 'Agua',
    formula: 'H₂O',
    molarMass: 18,
    description: 'Molécula pequeña fundamental con ion molecular estable y fragmentación por pérdida de radical hidroxilo.',
    basePeakMz: 18,
    molecularIonMz: 18,
    peaks: [
      { mz: 16, relativeAbundance: 2.1, fragmentFormula: '[O]⁺•', description: 'Pérdida completa de ambos átomos de hidrógeno.' },
      { mz: 17, relativeAbundance: 23, fragmentFormula: '[OH]⁺', description: 'Pérdida de un átomo de hidrógeno (ruptura simple de enlace O-H).' },
      { mz: 18, relativeAbundance: 100, fragmentFormula: '[H₂O]⁺•', description: 'Ion molecular y pico base a la vez por alta estabilidad.', isBasePeak: true, isMolecularIon: true },
      { mz: 19, relativeAbundance: 0.2, fragmentFormula: '[H₂¹⁸O]⁺• / [H₃O]⁺', description: 'Presencia isotópica de Oxígeno-18 y trazas de aducto hidronio.', isIsotopic: true }
    ]
  },
  {
    id: 'acetone',
    name: 'Acetona',
    formula: 'C₃H₆O',
    molarMass: 58,
    description: 'Cetona sencilla con un pico base característico en m/z 43 correspondiente al catión acetilo [CH3CO]+.',
    basePeakMz: 43,
    molecularIonMz: 58,
    peaks: [
      { mz: 15, relativeAbundance: 35, fragmentFormula: '[CH₃]⁺', description: 'Catión metilo resultante de la escisión del enlace C-C adyacente al carbonilo.' },
      { mz: 27, relativeAbundance: 14, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento menor hidrocarbonado.' },
      { mz: 42, relativeAbundance: 9, fragmentFormula: '[CH₂CO]⁺•', description: 'Ion ceteno por eliminación de metano.' },
      { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃CO]⁺', description: 'Pico Base: Catión acetilio estabilizado por resonancia con el doble enlace C=O.', isBasePeak: true },
      { mz: 58, relativeAbundance: 26, fragmentFormula: '[C₃H₆O]⁺•', description: 'Ion Molecular intacto de la acetona.', isMolecularIon: true },
      { mz: 59, relativeAbundance: 1.1, fragmentFormula: '[¹³C C₂ H₆ O]⁺•', description: 'Pico isotópico M+1 del ion molecular.', isIsotopic: true }
    ]
  },
  {
    id: 'benzene',
    name: 'Benceno',
    formula: 'C₆H₆',
    molarMass: 78,
    description: 'Anillo aromático excepcionalmente estable con energía de resonancia que hace que el ion molecular sea el pico base.',
    basePeakMz: 78,
    molecularIonMz: 78,
    peaks: [
      { mz: 39, relativeAbundance: 16, fragmentFormula: '[C₃H₃]⁺', description: 'Fragmentación profunda del anillo aromático.' },
      { mz: 50, relativeAbundance: 18, fragmentFormula: '[C₄H₂]⁺•', description: 'Pérdida de acetileno C2H2.' },
      { mz: 51, relativeAbundance: 20, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento cíclico menor.' },
      { mz: 52, relativeAbundance: 21, fragmentFormula: '[C₄H₄]⁺•', description: 'Eliminación típica de acetileno desde el anillo.' },
      { mz: 77, relativeAbundance: 23, fragmentFormula: '[C₆H₅]⁺', description: 'Catión fenilo por pérdida de un átomo de hidrógeno radicalario.' },
      { mz: 78, relativeAbundance: 100, fragmentFormula: '[C₆H₆]⁺•', description: 'Pico Base e Ion Molecular: gran estabilidad por deslocalización electrónica pi.', isBasePeak: true, isMolecularIon: true },
      { mz: 79, relativeAbundance: 6.6, fragmentFormula: '[¹³C C₅ H₆]⁺•', description: 'Pico isotópico M+1 (6 carbonos × 1.1% ≈ 6.6% abundancia esperada).', isIsotopic: true }
    ]
  },
  {
    id: 'chlorobenzene',
    name: 'Clorobenceno',
    formula: 'C₆H₅Cl',
    molarMass: 112,
    description: 'Compuesto halogenado idóneo para evidenciar el doblete isotópico natural de Cloro (³⁵Cl y ³⁷Cl en proporción 3:1).',
    basePeakMz: 77,
    molecularIonMz: 112,
    peaks: [
      { mz: 51, relativeAbundance: 25, fragmentFormula: '[C₄H₃]⁺', description: 'Descomposición ulterior del catión fenilo.' },
      { mz: 77, relativeAbundance: 100, fragmentFormula: '[C₆H₅]⁺', description: 'Pico Base: Pérdida del halógeno radicalario Cl•, dejando el catión fenilo.', isBasePeak: true },
      { mz: 112, relativeAbundance: 68, fragmentFormula: '[C₆H₅³⁵Cl]⁺•', description: 'Ion Molecular con el isótopo liviano Cloro-35 (abundancia natural 75.8%).', isMolecularIon: true },
      { mz: 114, relativeAbundance: 22, fragmentFormula: '[C₆H₅³⁷Cl]⁺•', description: 'Ion Molecular con el isótopo pesado Cloro-37 (abundancia natural 24.2%, ratio 3:1 perfecto).', isIsotopic: true }
    ]
  }
];

export interface PuzzlePartItem {
  id: string;
  name: string;
  category: string;
  role: string;
  targetSlotIndex: number;
  iconName: string;
  explanationIfMisplaced?: string;
}

export const PUZZLE_ITEMS: PuzzlePartItem[] = [
  {
    id: 'inlet',
    name: 'Sistema de Entrada de Muestra',
    category: 'Inyección',
    role: 'Vaporiza la muestra e introduce gas neutro en régimen molecular libre.',
    targetSlotIndex: 0,
    iconName: 'Droplets',
    explanationIfMisplaced: 'La muestra debe entrar al inicio del sistema; de lo contrario no hay partículas que ionizar ni analizar.'
  },
  {
    id: 'ionizer',
    name: 'Cámara de Ionización (70 eV)',
    category: 'Ionización',
    role: 'Bombardea moléculas con electrones para crear cationes manipulables por campos.',
    targetSlotIndex: 1,
    iconName: 'Zap',
    explanationIfMisplaced: 'Los campos electrostáticos y magnéticos son inútiles con moléculas neutras; la ionización debe ocurrir antes de la aceleración.'
  },
  {
    id: 'accelerator',
    name: 'Acelerador y Colimador de Haz',
    category: 'Aceleración',
    role: 'Aplica alta tensión (kV) para igualar la energía cinética y colimar el haz.',
    targetSlotIndex: 2,
    iconName: 'FastForward',
    explanationIfMisplaced: 'El acelerador solo actúa sobre partículas ya cargadas positivamente procedentes de la cámara de ionización.'
  },
  {
    id: 'analyzer',
    name: 'Analizador de Sector Magnético',
    category: 'Separación',
    role: 'Aplica fuerza de Lorentz transversal para curvar los iones según su relación m/z.',
    targetSlotIndex: 3,
    iconName: 'Compass',
    explanationIfMisplaced: 'El analizador debe recibir el haz colimado y monoenergético para separar los iones antes de contarlos.'
  },
  {
    id: 'detector',
    name: 'Multiplicador de Electrones',
    category: 'Detección',
    role: 'Genera avalancha secundaria de 10⁶ electrones al recibir el impacto iónico.',
    targetSlotIndex: 4,
    iconName: 'Activity',
    explanationIfMisplaced: 'El detector debe situarse tras el analizador para medir únicamente los iones seleccionados y no una mezcla ciega.'
  },
  {
    id: 'vacuum',
    name: 'Bombas de Ultra Alto Vacío',
    category: 'Vacío',
    role: 'Evacúa gases de fondo para asegurar libre camino medio superior al tubo de vuelo.',
    targetSlotIndex: 5,
    iconName: 'Wind',
    explanationIfMisplaced: 'El sistema de vacío debe estar acoplado a la envolvente general para evitar colisiones catastróficas en el trayecto.'
  },
  {
    id: 'datasystem',
    name: 'Sistema de Datos y Espectro',
    category: 'Procesamiento',
    role: 'Digitaliza pulsos y genera el gráfico de m/z vs Abundancia Relativa.',
    targetSlotIndex: 6,
    iconName: 'Cpu',
    explanationIfMisplaced: 'El procesador se conecta a la salida del detector para convertir los pulsos eléctricos en información química legible.'
  }
];

export const PUZZLE_SLOTS = [
  { index: 0, title: 'Etapa 1: Inyección', expectedPartId: 'inlet', desc: 'Entrada y vaporización de la muestra' },
  { index: 1, title: 'Etapa 2: Carga', expectedPartId: 'ionizer', desc: 'Generación de cationes por impacto' },
  { index: 2, title: 'Etapa 3: Impulso', expectedPartId: 'accelerator', desc: 'Unificación de energía cinética' },
  { index: 3, title: 'Etapa 4: Dispersión', expectedPartId: 'analyzer', desc: 'Separación balística por m/z' },
  { index: 4, title: 'Etapa 5: Captura', expectedPartId: 'detector', desc: 'Multiplicación en cascada de señal' },
  { index: 5, title: 'Infraestructura: Vacío', expectedPartId: 'vacuum', desc: 'Presión ultra baja y libre camino medio' },
  { index: 6, title: 'Salida: Cómputo', expectedPartId: 'datasystem', desc: 'Registro y generación del espectro' },
];

export interface InstrumentGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  manufacturerRef: string;
  imageSrc: string;
  keyFeatures: string[];
  specs: { label: string; value: string }[];
}

export const INSTRUMENT_GALLERY: InstrumentGalleryItem[] = [
  {
    id: 'chassis_cutaway',
    title: 'Corte Transversal Arquitectónico Ultra 3D del Espectrómetro',
    subtitle: 'Diseño industrial híbrido de investigación analítica con cámara transparente',
    manufacturerRef: 'Inspirado en la ingeniería de Agilent 7010C Triple Quad, Bruker timsTOF y Shimadzu UFms',
    imageSrc: IMAGES.spectrometerCutawayUltra3d,
    keyFeatures: [
      'Chasis de aluminio aeroespacial y acero inoxidable 316L con sellado hermético',
      'Cámara de ionización con haz colimado de alta energía y focalización dipolar',
      'Tubo de vuelo curvo con sector magnético homogéneo y bobinas refrigeradas',
      'Bombas turbomoleculares integradas en bancada antivibratoria de bajo ruido'
    ],
    specs: [
      { label: 'Rango de Masas', value: '1.2 - 2,050 m/z' },
      { label: 'Velocidad de Escaneo', value: 'Hasta 30,000 u/s (UFms)' },
      { label: 'Vacío Límite', value: '< 10⁻⁷ mbar (Ultra High Vacuum)' }
    ]
  },
  {
    id: 'hes_ion_source',
    title: 'Cámara de Ionización de Alta Eficiencia (HES)',
    subtitle: 'Filamento incandescente de tungsteno y confinamiento cuántico radial',
    manufacturerRef: 'Basado en la patente Agilent High Efficiency Source y Shimadzu DUIS',
    imageSrc: IMAGES.ionsourceAgilentHesDetail,
    keyFeatures: [
      'Filamento doble de emisión termoiónica con corriente regulada a 70 eV exactos',
      'Lentes de extracción doradas para evitar oxidación y acumulación de carga estática',
      'Puerto de microflujo JetClean con dosificación de H₂ para autolimpieza',
      'Aberturas colimadoras micrométricas que maximizan la densidad del haz catiónico'
    ],
    specs: [
      { label: 'Energía de Electrones', value: '10 a 150 eV regulable' },
      { label: 'Temperatura Fuente', value: 'Hasta 350 °C controlada' },
      { label: 'Corriente de Emisión', value: '0 - 300 μA programable' }
    ]
  },
  {
    id: 'quadrupole_filter',
    title: 'Analizador Cuadrupolar Hiperbólico de Precisión',
    subtitle: 'Filtro de masas con varillas doradas y oscilación Mathieu RF/DC',
    manufacturerRef: 'Diseño de varillas de cuarzo en oro de Agilent y tecnología Shimadzu UF-Sweeper',
    imageSrc: IMAGES.quadrupoleRodsShimadzuBruker,
    keyFeatures: [
      'Varillas de geometría hiperbólica ideal que eliminan armónicos parásitos de campo',
      'Tensión compuesta V(t) = U + V_0·cos(ωt) que selecciona únicamente iones en resonancia',
      'Tolerancia mecánica de montaje inferior a 1 micrómetro en todo el recorrido',
      'Conexiones aisladas cerámicas de alta pureza libres de desgasificación'
    ],
    specs: [
      { label: 'Frecuencia RF', value: '1.2 MHz estabilizada por cuarzo' },
      { label: 'Voltaje RF Pico a Pico', value: 'Hasta 6,000 Vpp' },
      { label: 'Resolución Unitaria', value: 'FWHM < 0.6 Da en todo el rango' }
    ]
  },
  {
    id: 'turbopump_detector',
    title: 'Sistema de Vacío Turbomolecular y Multiplicador',
    subtitle: 'Rotor de titanio a 60,000 RPM y dínodos discretos de alta ganancia',
    manufacturerRef: 'Ingeniería de vacío tipo Pfeiffer / Leybold y detector Triple-Axis TAD de Agilent/Bruker',
    imageSrc: IMAGES.turbopumpDetectorAssembly,
    keyFeatures: [
      'Álabes de titanio de múltiples etapas que confieren velocidad molecular direccional',
      'Detector Channeltron / Multiplicador fuera de eje óptico para rechazo de ruido neutro',
      'Ganancia exponencial de 10⁶ a 10⁸ electrones por cada ion incidente',
      'Tiempo de subida nanosegundo para conteo ultrarrápido sin saturación de señal'
    ],
    specs: [
      { label: 'Velocidad de Giro', value: '60,000 RPM (cojinetes magnéticos)' },
      { label: 'Ganancia Electrónica', value: '10⁶ - 10⁸ e⁻/ion' },
      { label: 'Voltaje del Multiplicador', value: '0 a -3,000 V regulable' }
    ]
  }
];

