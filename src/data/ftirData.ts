import { IMAGES } from '../assets/images';
import { ManufacturerTech, InstrumentGalleryItem } from './spectrometryData';

export const FTIR_MANUFACTURERS: ManufacturerTech[] = [
  {
    id: 'bruker',
    name: 'Bruker Optics',
    country: 'Alemania',
    specialty: 'Interferómetro RockSolid™ con Espejos Cúbicos de Oro, Fuente CenterGlow™ y Precisión Láser He-Ne',
    flagshipSeries: 'Bruker INVENIO, VERTEX 80v & ALPHA II Compact FTIR',
    keyInnovations: [
      {
        title: 'Interferómetro RockSolid™ Permanently Aligned',
        description: 'Usa retroreflectores duales cúbicos (cube-corner) montados sobre pivotes sin fricción y desgaste cero.',
        impact: 'Inmune a vibraciones y cambios térmicos en planta o laboratorio; garantiza una estabilidad de número de onda mejor a 0.0005 cm⁻¹.'
      },
      {
        title: 'Emisor Infrarrojo CenterGlow™ de Larga Vida (> 5 años)',
        description: 'Elemento cerámico de carburo de silicio con perfil térmico concentrado exactamente en el punto focal óptico.',
        impact: 'Reduce el consumo eléctrico mientras maximiza la radiancia en todo el IR medio (4000–400 cm⁻¹) sin puntos calientes inútiles.'
      },
      {
        title: 'Alineación Continua por Láser He-Ne Estabilizado (632.8 nm)',
        description: 'Mide en tiempo real la diferencia de camino óptico δ cada λ/2 de desplazamiento del espejo móvil.',
        impact: 'Proporciona una escala absoluta de número de onda (Ventaja de Connes) sin necesidad de recalibración manual con poliestireno.'
      },
      {
        title: 'Módulo ATR de Diamante Monolítico Platinum ATR',
        description: 'Cristal de diamante soldado térmicamente a placa de carburo de tungsteno con prensa ergonómica de un dedo.',
        impact: 'Analiza sólidos duros, polímeros y ácidos corrosivos en segundos sin molienda ni pastillas higroscópicas de KBr.'
      }
    ]
  },
  {
    id: 'shimadzu',
    name: 'Shimadzu Corporation',
    country: 'Japón',
    specialty: 'Alta Relación Señal-Ruido (60,000:1), Deshumidificación Activa Automática y Diagnóstico ADA',
    flagshipSeries: 'Shimadzu IRTracer-100 & IRSpirit-X Series',
    keyInnovations: [
      {
        title: 'Sensor DLATGS Termostatizado de Alta Sensibilidad (SNR 60,000:1)',
        description: 'Detector piroeléctrico de sulfato de triglicina deuterado dopado con L-alanina acoplado a un preamplificador digital de 24 bits.',
        impact: 'Detecta trazas de contaminantes e impurezas en microplásticos o fármacos con tiempos de acumulación de pocos segundos.'
      },
      {
        title: 'Deshumidificador Electrónico Automático para Óptica KBr',
        description: 'Sistema desecante sólido sin mantenimiento integrado en la cámara sellada del divisor de haz de KBr/Ge.',
        impact: 'Protege el cristal higroscópico de KBr frente a la humedad ambiental incluso en climas tropicales húmedos.'
      },
      {
        title: 'Alineación Dinámica Avanzada (ADA - 5,000 ajustes/s)',
        description: 'Sistema piezoeléctrico que corrige en tiempo real cualquier inclinación angular del espejo móvil durante barridos rápidos de 20 Hz.',
        impact: 'Permite capturar espectros resueltos en tiempo de reacciones químicas rápidas y acoplamientos TGA-FTIR.'
      },
      {
        title: 'Software IR Pilot™ & Librerías LabSolutions',
        description: 'Flujos guiados para identificación de polímeros, análisis farmacéutico farmacopeico y detección automática de contaminantes.',
        impact: 'Automatiza la sustracción espectral de vapor de agua y CO₂ atmosférico sin distorsionar las bandas del analito.'
      }
    ]
  },
  {
    id: 'agilent',
    name: 'Agilent Technologies',
    country: 'Estados Unidos',
    specialty: 'Espectroscopía FTIR Portátil y de Mesada Ultracompacta, Celdas DialPath™ y Microscopía LDIR',
    flagshipSeries: 'Agilent Cary 630 FTIR & Cary 670 / 8700 LDIR',
    keyInnovations: [
      {
        title: 'Diseño Óptico Ultracompacto Cary 630 (3.6 kg en 20 × 20 cm)',
        description: 'Trayectoria óptica plegada de foco corto que reduce al mínimo el volumen de aire atravesado por el haz infrarrojo.',
        impact: 'Minimiza naturalmente las interferencias de H₂O y CO₂ sin purga constante de nitrógeno, cabiendo dentro de una campana de extracción.'
      },
      {
        title: 'Módulos Snap-in con Reconocimiento Óptico Automático (DialPath™)',
        description: 'Interfaz mecánica sin tornillos para alternar en 10 segundos entre ATR de Diamante, Transmisión Líquida DialPath™ y Reflectancia Difusa.',
        impact: 'Permite elegir pasos ópticos líquidos exactos (30, 50 o 100 µm) con un simple giro sin limpiar celdas de NaCl frágiles.'
      },
      {
        title: 'Óptica Sellada de Seleniuro de Zinc (ZnSe) Libre de Humedad',
        description: 'Versión optativa de divisor de haz en ZnSe no higroscópico para operación de campo fuera del laboratorio.',
        impact: 'Opera con fiabilidad industrial en inspección de materias primas, aceites lubricantes y polímeros reciclados.'
      },
      {
        title: 'Software MicroLab con Códigos de Calidad en Tiempo Real',
        description: 'Indicadores visuales inmediatos que verifican buen contacto físico entre muestra sólida y cristal ATR antes de escanear.',
        impact: 'Garantiza reproducibilidad cuantitativa de espectros IR entre distintos operadores.'
      }
    ]
  }
];

export interface FtirPart {
  id: string;
  name: string;
  shortRole: string;
  category: 'Fuente IR' | 'Colimación' | 'Interferómetro' | 'Metrología Láser' | 'Muestra / ATR' | 'Detección' | 'Procesamiento FFT';
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
    | 'globar_source'
    | 'collimator_jstop'
    | 'beamsplitter_michelson'
    | 'hene_moving_mirror'
    | 'sample_atr_kbr'
    | 'detector_dtgs'
    | 'fft_processor';
}

export const FTIR_PARTS: FtirPart[] = [
  {
    id: 'globar_source',
    name: '1. Fuente Térmica Infrarroja Globar (Carburo de Silicio)',
    shortRole: 'Emisión policromática continua de cuerpo negro entre 4000 y 400 cm⁻¹ (~1200–1500 K)',
    category: 'Fuente IR',
    manufacturerInspiration: 'Fuente CenterGlow™ de Bruker & emisor cerámico SiC estabilizado Shimadzu / Agilent',
    svgRegion: {
      cx: 115,
      cy: 215,
      width: 145,
      height: 155,
      zoomLevel: 2.1,
    },
    whatItIs: 'Varilla o cerámica en U de Carburo de Silicio (SiC) sinterizado —conocida como Globar— calentada eléctricamente por efecto Joule entre 1,200 y 1,500 K sin envoltura de vidrio.',
    whatItDoes: 'Emite un haz continuo de fotones en todo el espectro del infrarrojo medio (longitudes de onda entre 2.5 µm y 25 µm, equivalentes a 4000–400 cm⁻¹) hacia un espejo elipsoidal recubierto de oro.',
    whyItDoesIt: 'Las bombillas incandescentes comunes con ampolla de vidrio o cuarzo absorben completamente la radiación IR media debajo de 2,500 cm⁻¹. El Globar opera al aire libre o en cámara sellada radiando directamente energía térmica con emisividad ~0.85 sin ventana que la bloquee.',
    theoreticalReasoning: {
      headline: 'Ley de Radiación de Planck y Desplazamiento Térmico de Wien',
      physicsPrinciples: [
        'Según la Ley de Wien, un cuerpo caliente a ~1,250 K tiene su máximo de emisión cerca de 2.3 µm (~4,300 cm⁻¹), cubriendo óptimamente la región vibracional fundamental de enlaces orgánicos.',
        'La intensidad decae hacia números de onda bajos (400 cm⁻¹) conforme a ν̃³, motivo por el cual el FTIR aprovecha toda la banda simultáneamente (Ventaja de Fellgett).',
        'Los espejos recubiertos en oro reflejan > 98% de la radiación infrarroja, a diferencia de lentes de vidrio que absorberían los fotones.'
      ],
      equations: [
        {
          formula: 'λ_max · T = 2898 µm·K    |    E = h · c · ν̃',
          description: 'Ley de desplazamiento de Wien y energía vibracional del fotón expresada en número de onda ν̃ (cm⁻¹).',
          variables: [
            { symbol: 'ν̃', name: 'Número de onda (1/λ)', unit: 'cm⁻¹ (4000–400)' },
            { symbol: 'T', name: 'Temperatura absoluta del Globar', unit: 'K (~1250 K)' },
            { symbol: 'λ_max', name: 'Longitud de onda pico de emisión', unit: 'µm (~2.3 µm)' }
          ]
        }
      ],
      deepExplanation: 'La estabilización térmica activa del centro cerámico evita derivas de intensidad en el canal simple; además, la ausencia de lentes refractivas elimina por completo la aberración cromática entre 2.5 y 25 µm.',
      keyTakeaway: 'Proporciona un haz infrarrojo continuo sin envoltura de vidrio que cubre simultáneamente todas las vibraciones moleculares fundamentales.'
    },
    interactiveSimulationType: 'globar_source'
  },
  {
    id: 'collimator_jstop',
    name: '2. Espejo Colimador de Oro y Apertura Jacquinot (J-Stop)',
    shortRole: 'Colimación paralela del haz infrarrojo y control angular de resolución sin rendijas dispersivas',
    category: 'Colimación',
    manufacturerInspiration: 'Óptica reflectiva dorada fuera de eje Bruker INVENIO & rueda J-Stop automatizada',
    svgRegion: {
      cx: 245,
      cy: 300,
      width: 120,
      height: 120,
      zoomLevel: 2.3,
    },
    whatItIs: 'Espejo parabólico fuera de eje bañado en oro puro acompañado de un diafragma circular motorizado denominado apertura de Jacquinot (J-stop).',
    whatItDoes: 'Convierte la radiación divergente del Globar en un haz perfectamente paralelo de gran sección transversal y regula el ángulo sólido máximo que entra al interferómetro.',
    whyItDoesIt: 'A diferencia de los espectrómetros UV-Vis que pierden hasta el 98% de la luz en rendijas angostas, un FTIR emplea una apertura circular ancha (Ventaja de Jacquinot), inyectando enorme potencia fotónica sobre el interferómetro para lograr relaciones señal-ruido excepcionales.',
    theoreticalReasoning: {
      headline: 'Ventaja de Rendimiento de Jacquinot (Throughput) y Divergencia Máxima',
      physicsPrinciples: [
        'En un interferómetro de Michelson, los rayos oblicuos recorren un camino óptico ligeramente distinto al rayo axial (cos θ), lo que ensancha las bandas si no se limita el diámetro del J-stop en resoluciones altas (0.5 cm⁻¹).',
        'Para resoluciones estándar (4 cm⁻¹), la apertura puede abrirse ampliamente multiplicando el flujo de energía IR que alcanza el detector.',
        'Los espejos de oro frente a los de aluminio ofrecen mayor reflectancia y cero oxidación en la región 4000–400 cm⁻¹.'
      ],
      equations: [
        {
          formula: 'θ_max = √( Δν̃ / ν̃_max )   |   Φ_FTIR ≫ Φ_dispersivo',
          description: 'Semiángulo máximo permitido por la apertura de Jacquinot según la resolución Δν̃ deseada.',
          variables: [
            { symbol: 'Δν̃', name: 'Resolución espectral nominal', unit: 'cm⁻¹ (0.5–16)' },
            { symbol: 'ν̃_max', name: 'Límite superior del rango IR', unit: '4000 cm⁻¹' },
            { symbol: 'θ_max', name: 'Semiángulo máximo de divergencia', unit: 'radianes' }
          ]
        }
      ],
      deepExplanation: 'El software reduce automáticamente el orificio de la rueda J-Stop únicamente cuando el usuario solicita resoluciones ultra finas (≤ 1 cm⁻¹) para gases o vibraciones estrechas.',
      keyTakeaway: 'Alinea los rayos infrarrojos en paralelo y deja pasar mucha más luz que cualquier monocromador de rendijas.'
    },
    interactiveSimulationType: 'collimator_jstop'
  },
  {
    id: 'beamsplitter_michelson',
    name: '3. Interferómetro de Michelson y Divisor de Haz de KBr / Ge',
    shortRole: 'División al 50% del haz IR hacia el espejo fijo y móvil para generar interferencia óptica',
    category: 'Interferómetro',
    manufacturerInspiration: 'Divisor KBr con recubrimiento de Germanio Bruker RockSolid™ y Shimadzu con deshumidificador',
    svgRegion: {
      cx: 410,
      cy: 225,
      width: 145,
      height: 155,
      zoomLevel: 2.1,
    },
    whatItIs: 'Sustrato óptico plano de Bromuro de Potasio (KBr) monocristalino —transparente al infrarrojo medio— recubierto por una capa ultradelgada de Germanio (Ge) a 45° junto con una placa compensadora idéntica.',
    whatItDoes: 'Divide el haz infrarrojo entrante en dos haces de igual intensidad (50% transmitido al espejo fijo, 50% reflejado al espejo móvil) y los recombina al regresar para producir un interferograma modulado en frecuencia.',
    whyItDoesIt: 'Permite codificar simultáneamente las miles de frecuencias infrarrojas en una sola señal temporal sin necesidad de prismas ni rejillas lentas. El KBr no presenta absorciones propias entre 4000 y 400 cm⁻¹, aunque exige protección contra humedad ambiental.',
    theoreticalReasoning: {
      headline: 'Interferencia Constructiva/Destructiva y Codificación de Frecuencias',
      physicsPrinciples: [
        'Al recombinarse ambos haces con diferencia de camino óptico δ, cada número de onda ν̃ experimenta interferencia según cos(2π · ν̃ · δ).',
        'En δ = 0 (ZPD: Zero Path Difference), todas las longitudes de onda interfieren constructivamente produciendo un pico intenso central llamado "centerburst".',
        'La placa compensadora de KBr asegura que ambos brazos atraviesen exactamente el mismo espesor de sal óptica evitando dispersión de fase.'
      ],
      equations: [
        {
          formula: 'I(δ) = ∫ B(ν̃) · [ 1 + cos( 2π · ν̃ · δ ) ] dν̃',
          description: 'Ecuación fundamental del interferograma que relaciona el desplazamiento δ con todas las frecuencias B(ν̃).',
          variables: [
            { symbol: 'I(δ)', name: 'Intensidad registrada en el interferograma', unit: 'V o cuentas ADC' },
            { symbol: 'δ', name: 'Diferencia de camino óptico (OPD = 2x)', unit: 'cm' },
            { symbol: 'B(ν̃)', name: 'Intensidad espectral por número de onda', unit: 'UA / cm⁻¹' }
          ]
        }
      ],
      deepExplanation: 'Cada frecuencia infrarroja queda modulada a una frecuencia acústica distinta f_ν̃ = 2 · v_espejo · ν̃, permitiendo que todas viajen juntas hacia el detector al mismo tiempo (Ventaja Multiplex de Fellgett).',
      keyTakeaway: 'Convierte las miles de longitudes de onda IR simultáneas en una onda de interferencia cuya forma contiene todo el espectro.'
    },
    interactiveSimulationType: 'beamsplitter_michelson'
  },
  {
    id: 'hene_moving_mirror',
    name: '4. Espejo Móvil Retroreflector y Láser de Referencia He-Ne (632.8 nm)',
    shortRole: 'Barrido micrométrico de diferencia de camino óptico δ con calibración interferométrica láser',
    category: 'Metrología Láser',
    manufacturerInspiration: 'Retroreflectores cúbicos RockSolid™ Bruker y alineación dinámica piezoeléctrica ADA Shimadzu',
    svgRegion: {
      cx: 410,
      cy: 115,
      width: 145,
      height: 110,
      zoomLevel: 2.3,
    },
    whatItIs: 'Espejo retroreflector cúbico montado sobre un deslizador magnético/flexión sin fricción, acompañado de un láser rojo de Helio-Neón monocromático (λ = 632.8 nm, ν̃ = 15,798 cm⁻¹) que comparte la misma trayectoria del interferómetro.',
    whatItDoes: 'El espejo se desplaza linealmente milímetros o centímetros para variar la diferencia de camino δ = 2·Δx, mientras el interferograma sinusoidal del láser He-Ne dispara la digitalización exacta del detector IR en cada cruce por cero.',
    whyItDoesIt: 'Cualquier error de velocidad mecánica destruiría la Transformada de Fourier. Al muestrear exactamente cada λ_HeNe = 632.8 nm, la posición del espejo se conoce con precisión atómica independientemente de microvariaciones mecánicas (Ventaja de Connes). Además, la distancia máxima Δx determina la resolución espectral.',
    theoreticalReasoning: {
      headline: 'Ventaja de Connes y Límite de Resolución por Camino Óptico Máximo',
      physicsPrinciples: [
        'Dos frecuencias infrarrojas cercanas separadas por Δν̃ requieren al menos un ciclo completo de diferencia en δ_max, cumpliendo Δν̃ = 1 / δ_max.',
        'Para lograr una resolución estándar de 4 cm⁻¹ basta mover el espejo solo 0.125 cm (δ_max = 0.25 cm); para 0.5 cm⁻¹ debe recorrer 1.0 cm completo (δ_max = 2.0 cm).',
        'La frecuencia roja estable del láser He-Ne sirve como regla cuántica interna para una exactitud absoluta en cm⁻¹.'
      ],
      equations: [
        {
          formula: 'δ = 2 · Δx    |    Δν̃ ≈ 1 / δ_max = 1 / (2 · Δx_max)',
          description: 'Relación inversa entre el recorrido máximo del espejo Δx_max y la resolución espectral alcanzable Δν̃.',
          variables: [
            { symbol: 'Δx', name: 'Desplazamiento físico del espejo móvil', unit: 'cm' },
            { symbol: 'δ_max', name: 'Diferencia máxima de camino óptico', unit: 'cm (0.06–2.0)' },
            { symbol: 'Δν̃', name: 'Resolución espectral del espectro', unit: 'cm⁻¹' }
          ]
        }
      ],
      deepExplanation: 'Usar espejos cúbicos (3 superficies a 90°) en lugar de espejos planos impide que una leve inclinación mecánica desvíe el haz paralelo, manteniendo el contraste interferométrico intacto por años.',
      keyTakeaway: 'El recorrido del espejo fija la resolución Δν̃ y el láser rojo He-Ne mide cada movimiento con exactitud nanométrica.'
    },
    interactiveSimulationType: 'hene_moving_mirror'
  },
  {
    id: 'sample_atr_kbr',
    name: '5. Compartimento de Muestra y Cristal ATR de Diamante / Pastilla KBr',
    shortRole: 'Interacción de fotones IR con momentos dipolares moleculares por transmisión o onda evanescente ATR',
    category: 'Muestra / ATR',
    manufacturerInspiration: 'Platinum Diamond ATR Bruker, DialPath™ Agilent Cary 630 y prensa KBr Shimadzu',
    svgRegion: {
      cx: 615,
      cy: 225,
      width: 155,
      height: 150,
      zoomLevel: 2.1,
    },
    whatItIs: 'Cámara purgada de muestra equipada con un cristal ATR monolítico de Diamante/ZnSe (alto índice de refracción n₁ ≈ 2.4) y prensa micrométrica, intercambiable por portapastillas de KBr o celdas líquidas de NaCl/CaF₂.',
    whatItDoes: 'En ATR, el haz IR sufre reflexión interna total dentro del diamante, generando una "onda evanescente" que penetra 0.5–2 µm dentro del sólido o líquido presionado encima y es atenuada selectivamente por sus enlaces químicos.',
    whyItDoesIt: 'Las muestras sólidas y líquidas puras son demasiado densas en IR para atravesar milímetros como en UV-Vis (saturarían a 0% Transmitancia). El ATR logra un paso óptico efectivo de apenas ~1–2 µm sin moler ni diluir la muestra en KBr.',
    theoreticalReasoning: {
      headline: 'Vibraciones Cuantizadas (Ley de Hooke), Regla de Selección Dipolar y Onda Evanescente ATR',
      physicsPrinciples: [
        'Una molécula absorbe radiación IR medio solo si la vibración produce un cambio en su momento dipolar eléctrico (Δμ ≠ 0); enlaces simétricos como N₂, O₂ o C=C centrosimétrico son inactivos en IR.',
        'La frecuencia de estiramiento sigue un oscilador armónico cuantizado: enlaces fuertes (C≡N, C=O) y átomos ligeros (O–H, N–H, C–H) vibran a números de onda altos (3600–1650 cm⁻¹).',
        'En ATR, la profundidad de penetración d_p aumenta con la longitud de onda λ, haciendo las bandas de bajos cm⁻¹ (huella dactilar) proporcionalmente más intensas que en pastilla de KBr.'
      ],
      equations: [
        {
          formula: 'ν̃ = (1 / 2πc) · √( k_enlace / μ_masa )    |    d_p = λ / [ 2π · √( n₁² sin²θ - n₂² ) ]',
          description: 'Frecuencia vibracional de enlace (Ley de Hooke) y profundidad de penetración evanescente d_p en cristal ATR.',
          variables: [
            { symbol: 'k_enlace', name: 'Constante de fuerza del enlace (simple < doble < triple)', unit: 'N/m' },
            { symbol: 'μ_masa', name: 'Masa reducida m₁m₂/(m₁+m₂)', unit: 'kg/mol' },
            { symbol: 'd_p', name: 'Penetración de onda evanescente ATR', unit: 'µm (0.5–2.5 µm)' }
          ]
        }
      ],
      deepExplanation: 'La zona por debajo de 1,500 cm⁻¹ se conoce como "Región de Huella Dactilar" porque involucra vibraciones acopladas de todo el esqueleto molecular (estiramientos C–O, C–N, flexiones), siendo única para cada sustancia química.',
      keyTakeaway: 'Exige un cambio de momento dipolar para absorber fotones IR y aprovecha el cristal de diamante ATR para obtener espectros limpios sin preparación compleja.'
    },
    interactiveSimulationType: 'sample_atr_kbr'
  },
  {
    id: 'detector_dtgs',
    name: '6. Detector Piroeléctrico DTGS / DLATGS (y MCT Criogénico)',
    shortRole: 'Conversión ultrarrápida de modulaciones térmicas infrarrojas en corriente eléctrica analógica',
    category: 'Detección',
    manufacturerInspiration: 'Sensor DLATGS termostatizado Shimadzu (SNR 60,000:1) y MCT enfriado por LN₂ Bruker',
    svgRegion: {
      cx: 790,
      cy: 225,
      width: 135,
      height: 150,
      zoomLevel: 2.2,
    },
    whatItIs: 'Sensor piroeléctrico cristalino de Sulfato de Triglicina Deuterado (DTGS / DLATGS) sellado tras una ventana de KBr o CsI sobre un espejo parabólico recolector de oro.',
    whatItDoes: 'Mide en milisegundos las diminutas variaciones de temperatura inducidas por el haz interferométrico modulado proveniente de la muestra y las transforma en voltaje proporcional a dT/dt.',
    whyItDoesIt: 'Los fotones de infrarrojo medio poseen muy baja energía (0.05 a 0.5 eV), insuficiente para arrancar electrones en tubos fotomultiplicadores UV-Vis o fotodiodos de silicio. El DTGS detecta directamente su efecto térmico a temperatura ambiente con respuesta plana de 4000 a 400 cm⁻¹.',
    theoreticalReasoning: {
      headline: 'Efecto Piroeléctrico Lineal vs Fotoconductividad Criogénica',
      physicsPrinciples: [
        'En el cristal ferroeléctrico DTGS, cada pulsación de energía IR cambia su temperatura ΔT y altera su polarización eléctrica espontánea P_s, generando una corriente i = A · p · (dT/dt).',
        'El deuterio y dopaje con L-alanina (DLATGS) elevan la temperatura de Curie manteniendo la sensibilidad estable sin despolarizarse.',
        'Para microscopía o cinéticas sub-milisegundo se emplea el detector semiconductor cuántico MCT (HgCdTe) enfriado con nitrógeno líquido a 77 K para suprimir el ruido térmico k_B·T.'
      ],
      equations: [
        {
          formula: 'I_piro = A_sensor · p · (dT / dt)    |    SNR ∝ √( N_scans )',
          description: 'Corriente piroeléctrica del sensor DLATGS y mejora de relación señal-ruido por co-adición de espectros.',
          variables: [
            { symbol: 'p', name: 'Coeficiente piroeléctrico del cristal', unit: 'µC / (m²·K)' },
            { symbol: 'dT/dt', name: 'Tasa de cambio térmico por interferencia', unit: 'K / s' },
            { symbol: 'N_scans', name: 'Número de barridos co-añadidos', unit: '1 a 64+' }
          ]
        }
      ],
      deepExplanation: 'Dado que el DTGS responde solo a cambios térmicos (dT/dt) y no a luz constante ambiental, ignora naturalmente la radiación térmica continua del cuarto, respondiendo exclusivamente a las frecuencias moduladas por el interferómetro.',
      keyTakeaway: 'Traduce pulsos de calor infrarrojo modulados en el interferograma digitalizado que alimenta la Transformada de Fourier.'
    },
    interactiveSimulationType: 'detector_dtgs'
  },
  {
    id: 'fft_processor',
    name: '7. Transformada Rápida de Fourier (FFT) y Espectro Vibracional',
    shortRole: 'Decodificación matemática del interferograma I(δ) al espectro %T / Abs vs cm⁻¹',
    category: 'Procesamiento FFT',
    manufacturerInspiration: 'Bruker OPUS · Shimadzu LabSolutions IR · Agilent MicroLab FTIR',
    svgRegion: {
      cx: 925,
      cy: 225,
      width: 135,
      height: 150,
      zoomLevel: 2.0,
    },
    whatItIs: 'Procesador digital de señal (DSP) de 24 bits y algoritmo matemático de Transformada Rápida de Fourier (Cooley-Tukey FFT) con funciones de apodización y división contra el espectro blanco de fondo (Background).',
    whatItDoes: 'Convierte la señal temporal/espacial del interferograma I(δ) en el espectro clásico de Transmitancia (%T = 100 · I_muestra / I_fondo) o Absorbancia frente al número de onda descendente (4000 → 400 cm⁻¹).',
    whyItDoesIt: 'Ningún ojo humano puede leer qué enlaces posee una molécula observando directamente un interferograma oscilatorio. La Transformada de Fourier descompone instantáneamente esa onda compleja en las frecuencias vibracionales puras de O–H, N–H, C=O, C–H y huella dactilar.',
    theoreticalReasoning: {
      headline: 'Integral de Fourier, Apodización Happ-Genzel y Relación Fondo-Muestra',
      physicsPrinciples: [
        'La integral de Fourier transforma el dominio del retardo óptico δ (cm) al dominio espectral del número de onda ν̃ (cm⁻¹).',
        'Como el espejo no viaja hasta δ = ∞, truncar el interferograma produce pequeños lóbulos laterales ("pies" artificiales); la función de apodización (ej. Happ-Genzel) suaviza los extremos para eliminarlos.',
        'Dividir el espectro de haz simple de la muestra entre el espectro Background (aire o cristal ATR limpio) cancela las bandas de H₂O, CO₂ y el perfil térmico del Globar.'
      ],
      equations: [
        {
          formula: 'B(ν̃) = ∫ I(δ) · A_apod(δ) · cos( 2π · ν̃ · δ ) dδ    |    %T(ν̃) = 100 · B_muestra / B_fondo',
          description: 'Transformada coseno de Fourier apodizada y normalización frente al blanco instrumental.',
          variables: [
            { symbol: 'B(ν̃)', name: 'Espectro de haz simple tras FFT', unit: 'intensidad' },
            { symbol: 'A_apod', name: 'Ventana de apodización (Happ-Genzel)', unit: '0 a 1' },
            { symbol: '%T(ν̃)', name: 'Transmitancia porcentual normalizada', unit: '% (0–100%)' }
          ]
        }
      ],
      deepExplanation: 'El eje horizontal en química infrarroja se grafica tradicionalmente de izquierda a derecha en orden descendente (4000 → 400 cm⁻¹), colocando primero las frecuencias de alta energía (estiramientos X–H) y al final la región de huella dactilar.',
      keyTakeaway: 'Decodifica el interferograma completo en milisegundos produciendo la huella vibracional exacta para identificar grupos funcionales.'
    },
    interactiveSimulationType: 'fft_processor'
  }
];

export const FTIR_GALLERY: InstrumentGalleryItem[] = [
  {
    id: 'ftir_chassis_3d',
    title: 'Corte Transversal FTIR de Alto Rendimiento (Mid-IR)',
    subtitle: 'Tren óptico sellado desde el Globar SiC y el interferómetro Michelson hasta ATR y detector DTGS',
    manufacturerRef: 'Inspirado en Bruker INVENIO, Shimadzu IRTracer-100 y Agilent Cary 630',
    imageSrc: IMAGES.ftirCutawayUltra3d,
    keyFeatures: [
      'Espejos parabólicos recubiertos en oro sin lentes refractivas ni aberración cromática',
      'Interferómetro de Michelson con divisor KBr/Ge y láser rojo He-Ne a 632.8 nm',
      'Compartimento versátil con cristal ATR de diamante o pastillas de KBr',
      'Procesamiento FFT de 24 bits con cancelación de fondo atmosférico (H₂O y CO₂)'
    ],
    specs: [
      { label: 'Rango Espectral', value: '4,000 - 400 cm⁻¹' },
      { label: 'Resolución Máx.', value: '0.4 - 0.5 cm⁻¹' },
      { label: 'Exactitud ν̃', value: '± 0.01 cm⁻¹ (He-Ne)' }
    ]
  },
  {
    id: 'ftir_globar_detail',
    title: 'Emisor Cerámico Globar de Carburo de Silicio (1,250 K)',
    subtitle: 'Radiación térmica infrarroja continua según Ley de Planck y Wien sin ampolla de vidrio',
    manufacturerRef: 'Fuente CenterGlow™ Bruker / Emisor SiC Shimadzu',
    imageSrc: IMAGES.ftirGlobarSource,
    keyFeatures: [
      'Elemento en U de carburo de silicio sinterizado operando a ~1,250 K sin cristal envolvente',
      'Reflejo colector dorado elipsoidal de alta eficiencia (> 98% reflectancia IR)',
      'Emisión continua en todo el infrarrojo medio sin requerir intercambio de lámpara',
      'Estabilidad térmica regulada electrónicamente para línea base plana'
    ],
    specs: [
      { label: 'Temperatura', value: '1,200 - 1,500 K' },
      { label: 'Pico de Wien', value: '~2.3 µm (~4,300 cm⁻¹)' },
      { label: 'Vida Útil', value: '> 30,000 horas' }
    ]
  },
  {
    id: 'ftir_michelson_detail',
    title: 'Interferómetro de Michelson RockSolid™ con Láser He-Ne',
    subtitle: 'Modulación multiplex simultánea de frecuencias con retroreflectores cúbicos y placa KBr',
    manufacturerRef: 'Bruker RockSolid™ / Shimadzu ADA Dynamic Alignment',
    imageSrc: IMAGES.ftirMichelsonInterferometer,
    keyFeatures: [
      'Divisor de haz monocristalino de KBr con capa de Germanio y placa compensadora',
      'Retroreflectores duales cube-corner dorados inmunes a vibraciones angulares',
      'Pivote de flexión sin desgaste con control de velocidad lineal de precisión',
      'Láser rojo He-Ne (632.8 nm) como patrón absoluto de muestreo interferométrico'
    ],
    specs: [
      { label: 'Láser Metrología', value: 'He-Ne 632.8 nm' },
      { label: 'Relación SNR', value: '50,000:1 - 60,000:1' },
      { label: 'Divisor Óptico', value: 'KBr / Ge (ó ZnSe)' }
    ]
  },
  {
    id: 'ftir_atr_dtgs_detail',
    title: 'Módulo ATR de Diamante y Detector Piroeléctrico DLATGS',
    subtitle: 'Reflexión Total Atenuada de onda evanescente (~1.5 µm) y transducción térmica lineal',
    manufacturerRef: 'Bruker Platinum ATR / Agilent DialPath™ / Shimadzu DLATGS',
    imageSrc: IMAGES.ftirAtrSampleChamber,
    keyFeatures: [
      'Cristal monolítico de diamante (n = 2.4) transparente desde 4000 hasta <400 cm⁻¹',
      'Prensa micrométrica de torque calibrado para contacto íntimo de polvos y polímeros',
      'Detector piroeléctrico DLATGS estable a temperatura ambiente tras ventana KBr/CsI',
      'Captura directa sin dilución en pastillas higroscópicas ni solventes tóxicos'
    ],
    specs: [
      { label: 'Penetración ATR', value: '0.5 - 2.2 µm (d_p)' },
      { label: 'Índice Diamante', value: 'n₁ = 2.40' },
      { label: 'Detector', value: 'DLATGS / MCT-LN₂' }
    ]
  }
];
