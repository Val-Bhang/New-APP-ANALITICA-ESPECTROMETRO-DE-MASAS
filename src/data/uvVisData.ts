import { IMAGES } from '../assets/images';
import { ManufacturerTech, InstrumentGalleryItem } from './spectrometryData';

export const UVVIS_MANUFACTURERS: ManufacturerTech[] = [
  {
    id: 'agilent',
    name: 'Agilent Technologies',
    country: 'Estados Unidos',
    specialty: 'Espectrofotometría UV-Vis Doble Haz con Lámpara de Xenón Flash y Multicelda Peltier',
    flagshipSeries: 'Agilent Cary 3500 Multicell UV-Vis & Cary 60',
    keyInnovations: [
      {
        title: 'Lámpara de Destello de Xenón de 80 Hz (Sin Calentamiento)',
        description: 'Emite pulsos ultraintensos de espectro continuo UV-Vis (190–1100 nm) únicamente durante la medición.',
        impact: 'Elimina el tiempo de precalentamiento, evita el fotoblanqueo de muestras biológicas sensibles y ofrece una vida útil superior a 3,000 millones de destellos.'
      },
      {
        title: 'Óptica Doble Haz Inmune a Luz Ambiental (Cary 60)',
        description: 'Detector sincronizado a los pulsos de 80 Hz con filtro óptico de rechazo de luz continua externa.',
        impact: 'Permite medir con el compartimento de cubetas abierto o mediante sondas de fibra óptica directamente dentro de reactores químicos.'
      },
      {
        title: 'Arquitectura Multicelda Simultánea de 8 Posiciones (Cary 3500)',
        description: 'División óptica simétrica que dirige haces paralelos simultáneos a hasta 8 cubetas con control térmico Peltier independiente.',
        impact: 'Permite ejecutar curvas de desnaturalización térmica de ADN/proteínas y cinéticas enzimáticas en cuatro temperaturas diferentes al mismo tiempo.'
      },
      {
        title: 'Rango Lineal Fotométrico hasta 5.0 Abs',
        description: 'Electrónica de detección de bajo ruido con rejilla Czerny-Turner fuera de plano.',
        impact: 'Cuantifica muestras altamente concentradas sin necesidad de diluciones seriales ni pérdida de linealidad en Beer-Lambert.'
      }
    ]
  },
  {
    id: 'shimadzu',
    name: 'Shimadzu Corporation',
    country: 'Japón',
    specialty: 'Monocromadores Holográficos Lo-Ray-Ligh® de Luz Parásita Ultrabaja y Esferas Integradoras',
    flagshipSeries: 'Shimadzu UV-1900i & UV-2600i Plus / UV-3600i Plus',
    keyInnovations: [
      {
        title: 'Rejilla de Difracción Holográfica Lo-Ray-Ligh®',
        description: 'Proceso patentado de grabado holográfico que minimiza las irregularidades microscópicas entre surcos.',
        impact: 'Reduce la luz parásita (stray light) por debajo del 0.0005% a 220 nm, garantizando exactitud espectral en UV lejano.'
      },
      {
        title: 'Barrido Ultrarrápido (29,000 nm/min)',
        description: 'Motorización galvano-óptica del monocromador que barre todo el espectro de 190 a 1100 nm en menos de 2 segundos.',
        impact: 'Permite seguir reacciones químicas rápidas y cinéticas de degradación fotocatalítica sin retraso instrumental.'
      },
      {
        title: 'Doble Monocromador y Conmutación Automática D₂ / W-Halógeno',
        description: 'Sistema Czerny-Turner de doble etapa (en serie UV-3600i) y espejo motorizado de cambio automático entre 282 y 393 nm.',
        impact: 'Garantiza transiciones continuas sin saltos de línea base entre la región ultravioleta y el espectro visible.'
      },
      {
        title: 'Acoplamiento Esfera Integradora ISR-2600Plus',
        description: 'Cavidad recubierta de sulfato de bario (BaSO₄) de alta reflectancia difusa con doble detector PMT/InGaAs.',
        impact: 'Mide reflectancia difusa, películas delgadas y suspensiones turbias donde la dispersión Rayleigh distorsionaría una cubeta estándar.'
      }
    ]
  },
  {
    id: 'bruker',
    name: 'Bruker Optics',
    country: 'Alemania',
    specialty: 'Detección Fotónica Estabilizada, Óptica Recubierta en Oro y Espectroscopía Óptica de Precisión',
    flagshipSeries: 'Bruker MPA II / VERTEX Optical UV-Vis-NIR & PDA Systems',
    keyInnovations: [
      {
        title: 'Espejos Asféricos con Recubrimiento de Oro y SiO₂ Protector',
        description: 'Óptica reflexiva de alta precisión con baja rugosidad superficial libre de aberración cromática.',
        impact: 'Maximiza el rendimiento fotónico a través de todo el espectro óptico evitando el uso de lentes refractivas que distorsionan el foco con λ.'
      },
      {
        title: 'Arreglos Lineales de Fotodiodos de Silicio (PDA) Termostatizados',
        description: 'Matriz monolítica de 1,024 elementos fotodetectores estabilizada térmicamente por módulo Peltier.',
        impact: 'Captura simultáneamente todas las longitudes de onda en milisegundos con estabilidad de longitud de onda mejor a ±0.05 nm.'
      },
      {
        title: 'Validación Óptica Interna Automatizada (OVP - NIST Traceable)',
        description: 'Rueda interna motorizada con filtros certificados de óxido de holmio y vidrio de densidad neutra.',
        impact: 'Verifica automáticamente la exactitud de longitud de onda y linealidad fotométrica conforme a Farmacopeas USP/EP e ISO 17025.'
      },
      {
        title: 'Acoplamiento Óptico por Fibra de Cuarzo de Baja Hidroxilación',
        description: 'Guías de onda de sílice fundida de grado solarizado resistentes a degradación UV profunda.',
        impact: 'Mantiene transmisión estable por debajo de 220 nm durante monitoreo continuo de procesos industriales en línea.'
      }
    ]
  }
];

export interface UvVisPart {
  id: string;
  name: string;
  shortRole: string;
  category: 'Fuentes' | 'Colimación' | 'Monocromador' | 'Doble Haz' | 'Muestra' | 'Detección' | 'Datos';
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
    | 'lamps'
    | 'entrance_slit'
    | 'monochromator'
    | 'chopper'
    | 'cuvettes'
    | 'detector'
    | 'datasystem';
}

export const UVVIS_PARTS: UvVisPart[] = [
  {
    id: 'lamps',
    name: '1. Fuentes de Radiación Dual (Deuterio D₂ y Tungsteno-Halógeno)',
    shortRole: 'Emisión continua electromagnética en UV (190–350 nm) y Visible (350–900 nm)',
    category: 'Fuentes',
    manufacturerInspiration: 'Conmutación D₂/W-Halógeno de Shimadzu UV-1900i y fuente Xenón Flash de Agilent Cary',
    svgRegion: {
      cx: 125,
      cy: 195,
      width: 150,
      height: 150,
      zoomLevel: 2.1,
    },
    whatItIs: 'Módulo óptico integrado por dos lámparas complementarias y un espejo conmutador motorizado: una lámpara de arco de Deuterio (D₂) encapsulada en cuarzo y una lámpara incandescente de Tungsteno-Halógeno (W).',
    whatItDoes: 'Genera un espectro continuo de fotones de alta estabilidad. La lámpara de deuterio ilumina la región ultravioleta (190–350 nm), mientras que la de tungsteno cubre el espectro visible y cercano al infrarrojo (350–900 nm); un espejo cambia automáticamente entre ambas alrededor de 340 nm.',
    whyItDoesIt: 'Ninguna fuente térmica convencional emite de forma intensa y uniforme desde los 190 nm hasta los 900 nm. El tungsteno a 3000 K casi no produce radiación UV por debajo de 320 nm, mientras que la descarga molecular de deuterio decae por encima de 380 nm salvo líneas discretas.',
    theoreticalReasoning: {
      headline: 'Cuantización de Planck y Radiación Continua de Cuerpo Negro / Arco Molecular',
      physicsPrinciples: [
        'Cada fotón transporta un cuanto de energía inversamente proporcional a su longitud de onda: E = h · c / λ.',
        'La lámpara de Deuterio (D₂) emite por disociación molecular de estados excitados D₂* hacia estados repulsivos continuos, liberando fotones energéticos de 3.5 a 6.5 eV (190–350 nm).',
        'El filamento de Tungsteno-Halógeno sigue la ley de radiación de Planck (~3000 K), generando un continuo suave visible entre 350 y 1100 nm sin desgaste del vidrio gracias al ciclo regenerativo del halógeno.'
      ],
      equations: [
        {
          formula: 'E = h · ν = (h · c) / λ  ≈  1240 / λ(nm) [eV]',
          description: 'Energía fotónica capaz de promover electrones de valencia (HOMO → LUMO).',
          variables: [
            { symbol: 'E', name: 'Energía del fotón incidente', unit: 'Joules o eV' },
            { symbol: 'h', name: 'Constante de Planck (6.626×10⁻³⁴)', unit: 'J·s' },
            { symbol: 'c', name: 'Velocidad de la luz (2.998×10⁸)', unit: 'm/s' },
            { symbol: 'λ', name: 'Longitud de onda seleccionada', unit: 'nanómetros (nm)' }
          ]
        }
      ],
      deepExplanation: 'Las transiciones electrónicas en cromóforos orgánicos requieren fotones de entre 1.5 y 6.5 eV (190–800 nm). Contar con una fuente estable y continua garantiza que exista flujo fotónico suficiente en cada nanómetro del barrido para detectar bandas de absorción débiles o estrechas.',
      keyTakeaway: 'Combina descarga cuántica de deuterio y emisión térmica de tungsteno para cubrir sin interrupciones todo el rango energético electrónico UV-Vis.'
    },
    interactiveSimulationType: 'lamps'
  },
  {
    id: 'entrance_slit',
    name: '2. Rendija de Entrada y Óptica Colimadora',
    shortRole: 'Definición de resolución espectral (SBW) y paralelismo del haz',
    category: 'Colimación',
    manufacturerInspiration: 'Rendijas micrométricas de Shimadzu UV-2600i y espejos colimadores con recubrimiento SiO₂ Bruker',
    svgRegion: {
      cx: 265,
      cy: 195,
      width: 120,
      height: 120,
      zoomLevel: 2.3,
    },
    whatItIs: 'Una abertura metálica estrecha de ancho ajustable (0.1 a 5.0 nm de ancho de banda espectral) seguida por un espejo cóncavo parabólico aluminizado.',
    whatItDoes: 'Recorta espacialmente el haz divergente proveniente de las lámparas convirtiéndolo en una fuente lineal puntual y lo proyecta como un haz de rayos paralelos hacia la rejilla de difracción.',
    whyItDoesIt: 'Si los rayos llegaran en distintos ángulos sobre la rejilla de difracción, cada ángulo produciría una longitud de onda distinta en la salida, arruinando la pureza espectral. Asimismo, la abertura de la rendija fija el compromiso entre resolución fina y relación señal/ruido.',
    theoreticalReasoning: {
      headline: 'Anchura Espectral de Banda (SBW) y Colimación Parabólica',
      physicsPrinciples: [
        'Cuanto más estrecha es la rendija (p. ej. 0.5 nm vs 4.0 nm), mejor se resuelven picos vibrónicos finos cercanos (como los dedos aromáticos del benceno a ~254 nm).',
        'Sin embargo, reducir la rendija a la mitad reduce el flujo fotónico aproximadamente a un cuarto (∝ ancho²), incrementando el ruido estadístico.',
        'Los espejos cóncavos reemplazan lentes de vidrio para evitar aberración cromática: todas las longitudes de onda reflejan exactamente al mismo ángulo.'
      ],
      equations: [
        {
          formula: 'SBW = w · D⁻¹  (con SNR ∝ w²)',
          description: 'Relación entre anchura física de rendija w, dispersión recíproca D⁻¹ y resolución.',
          variables: [
            { symbol: 'SBW', name: 'Anchura espectral de banda', unit: 'nm' },
            { symbol: 'w', name: 'Ancho mecánico de rendija', unit: 'mm o μm' },
            { symbol: 'D⁻¹', name: 'Dispersión lineal recíproca', unit: 'nm / mm' }
          ]
        }
      ],
      deepExplanation: 'Una regla práctica en espectrofotometría es que la SBW del instrumento debe ser al menos 10 veces menor que la anchura natural a media altura (FWHM) de la banda de absorción del analito para evitar que el pico aparezca artificialmente achatado y subestimado.',
      keyTakeaway: 'Transforma luz divergente desordenada en un haz paralelo y controla el equilibrio matemático entre nitidez de picos y potencia luminosa.'
    },
    interactiveSimulationType: 'entrance_slit'
  },
  {
    id: 'monochromator',
    name: '3. Monocromador Czerny-Turner y Rejilla Holográfica',
    shortRole: 'Dispersión angular de alta precisión en longitudes de onda individuales',
    category: 'Monocromador',
    manufacturerInspiration: 'Rejilla Lo-Ray-Ligh® de Shimadzu (1200–2400 líneas/mm) y montaje Czerny-Turner Agilent',
    svgRegion: {
      cx: 410,
      cy: 195,
      width: 165,
      height: 150,
      zoomLevel: 2.0,
    },
    whatItIs: 'Cavidad negra antirreflejante que alberga dos espejos esféricos (colimador y enfocador) junto con una rejilla de difracción holográfica rotatoria grabada con 1,200 a 2,400 surcos microscópicos por milímetro.',
    whatItDoes: 'Descompone la luz blanca policromática en un abanico espacial continuo de longitudes de onda (como un arcoíris de ultra alta precisión) y al girar milimétricamente el ángulo de la rejilla, dirige únicamente una estrecha banda λ hacia la rendija de salida.',
    whyItDoesIt: 'Para medir qué longitudes de onda específicas absorbe una molécula y construir el espectro A(λ), el equipo debe aislar secuencialmente cada color o longitud de onda UV pura minimizando la luz parásita.',
    theoreticalReasoning: {
      headline: 'Interferencia Constructiva en Rejillas de Difracción (Ecuación de la Rejilla)',
      physicsPrinciples: [
        'Cada surco de la rejilla actúa como un emisor coherente de ondas secundarias (principio de Huygens).',
        'Solo aquellas direcciones β donde la diferencia de camino óptico entre surcos vecinos es un múltiplo entero de λ sufren interferencia constructiva.',
        'A diferencia de un prisma (cuya dispersión es no lineal y absorbe UV), una rejilla holográfica ofrece dispersión lineal uniforme y elimina errores periódicos (ghosts).'
      ],
      equations: [
        {
          formula: 'n · λ = d · ( sin α + sin β )',
          description: 'Ecuación fundamental de difracción en monocromadores reflexivos.',
          variables: [
            { symbol: 'n', name: 'Orden de difracción (usualmente n = 1)', unit: 'entero' },
            { symbol: 'λ', name: 'Longitud de onda aislada', unit: 'nm' },
            { symbol: 'd', name: 'Separación entre surcos (1 / densidad)', unit: 'nm (~833 nm)' },
            { symbol: 'α, β', name: 'Ángulos de incidencia y difracción', unit: 'grados (°)' }
          ]
        }
      ],
      deepExplanation: 'El diseño Czerny-Turner compensa las aberraciones geométricas de coma mediante espejos simétricos. Además, filtros ordenadores automáticos bloquean órdenes superiores (n = 2) para evitar, por ejemplo, que luz UV de 250 nm en segundo orden se mezcle con la medición de 500 nm en primer orden.',
      keyTakeaway: 'Convierte la geometría de un giro angular mecánico en una selección cuántica exacta al nanómetro mediante interferencia constructiva.'
    },
    interactiveSimulationType: 'monochromator'
  },
  {
    id: 'chopper',
    name: '4. Divisor Óptico Rotatorio (Chopper de Doble Haz)',
    shortRole: 'Alternancia rápida entre haz de Referencia (I₀) y Muestra (I)',
    category: 'Doble Haz',
    manufacturerInspiration: 'Arquitectura Double-Beam Chopper de Shimadzu UV-2600i y divisor óptico Agilent Cary',
    svgRegion: {
      cx: 560,
      cy: 220,
      width: 135,
      height: 135,
      zoomLevel: 2.2,
    },
    whatItIs: 'Disco giratorio motorizado (30–80 Hz) dividido en sectores altamente reflectantes (espejo), sectores completamente abiertos (paso directo) y sectores opacos negros (referencia de corriente oscura).',
    whatItDoes: 'Alterna el haz monocromático decenas de veces por segundo entre dos caminos ópticos idénticos: uno cruza la cubeta de referencia con el disolvente puro (I₀) y el otro cruza la cubeta con la muestra analito (I).',
    whyItDoesIt: 'Las lámparas fluctúan naturalmente con el tiempo y los disolventes/cubetas reflejan y absorben algo de luz. Al medir I₀ e I casi simultáneamente con la misma lámpara y el mismo detector, toda deriva de lámpara y absorción del blanco se cancelan matemáticamente en tiempo real.',
    theoreticalReasoning: {
      headline: 'Cancelación Diferencial de Deriva Óptica y Definición de Transmitancia',
      physicsPrinciples: [
        'La intensidad inicial I₀ se mide en el disolvente blanco; la intensidad transmitida I se mide en la solución muestra.',
        'Al calcular la razón I / I₀ en cada ciclo del chopper, cualquier variación de brillo ΔL de la lámpara aparece tanto en el numerador como en el denominador y se anula: (I·ΔL) / (I₀·ΔL) = I / I₀.',
        'Los sectores opacos permiten restar la corriente oscura electrónica del detector en cada revolución.'
      ],
      equations: [
        {
          formula: 'T = I / I₀    ➔    A = -log₁₀(T) = log₁₀( I₀ / I )',
          description: 'Definición fotométrica fundamental de Transmitancia (T) y Absorbancia (A).',
          variables: [
            { symbol: 'T', name: 'Transmitancia fraccionaria (0 a 1)', unit: 'adimensional (o %T)' },
            { symbol: 'I₀', name: 'Intensidad emergente del blanco/referencia', unit: 'cuentas / s' },
            { symbol: 'I', name: 'Intensidad emergente de la muestra', unit: 'cuentas / s' },
            { symbol: 'A', name: 'Absorbancia óptica', unit: 'unidades de Abs (UA)' }
          ]
        }
      ],
      deepExplanation: 'En equipos de haz simple, un cambio del 2% en el voltaje de la lámpara después de medir el blanco arruinaría la precisión. El diseño de doble haz con chopper corrige este problema instantáneamente y permite realizar barridos completos de 190 a 900 nm con línea base plana.',
      keyTakeaway: 'Divide el haz en referencia y muestra decenas de veces por segundo para cancelar el ruido de la lámpara y restar automáticamente el solvente.'
    },
    interactiveSimulationType: 'chopper'
  },
  {
    id: 'cuvettes',
    name: '5. Compartimento y Cubetas Ópticas de Cuarzo (1 cm)',
    shortRole: 'Interacción fotón-molécula en camino óptico calibrado y ventana transparente UV',
    category: 'Muestra',
    manufacturerInspiration: 'Celdas de cuarzo Suprasil® de 10 mm y compartimento multicelda termostatizado Agilent / Shimadzu',
    svgRegion: {
      cx: 715,
      cy: 265,
      width: 155,
      height: 155,
      zoomLevel: 2.1,
    },
    whatItIs: 'Cámara hermética a la luz ambiente con soportes de precisión (frecuentemente termostatizados por Peltier) que alojan dos cubetas rectangulares de sílice fundida (cuarzo) de paso óptico exacto b = 1.000 cm.',
    whatItDoes: 'Mantiene un volumen de solución homogéneo atravesado perpendicularmente por el haz colimado, permitiendo que los fotones resonantes sean absorbidos por los electrones de los cromóforos disueltos.',
    whyItDoesIt: 'Las cubetas ordinarias de vidrio o plástico absorben intensamente toda la radiación ultravioleta por debajo de 300–340 nm, cegando al equipo en la región UV. Solo el cuarzo fundido de alta pureza (SiO₂ amorfo libre de impurezas metálicas) transmite con eficiencia hasta 190 nm.',
    theoreticalReasoning: {
      headline: 'Ley de Bouguer-Lambert-Beer y Transiciones Electrónicas HOMO → LUMO',
      physicsPrinciples: [
        'Cada capa diferencial dx de solución absorbe una fracción de fotones proporcional al número de moléculas absorbentes en su camino.',
        'Integrando a lo largo del paso óptico b se obtiene una caída exponencial de intensidad I = I₀ · 10^(-εbc), que al tomar el logaritmo se vuelve lineal: A = ε · b · c.',
        'Solo se absorben fotones cuya energía E = hc/λ coincide exactamente con la brecha energética ΔE entre un orbital ocupado (π o n) y un orbital antienlazante vacío (π* o σ*).'
      ],
      equations: [
        {
          formula: 'A = log₁₀(I₀ / I) = ε(λ) · b · c',
          description: 'Ley de Beer-Lambert para cuantificación analítica lineal.',
          variables: [
            { symbol: 'A', name: 'Absorbancia medida', unit: 'adimensional (UA)' },
            { symbol: 'ε', name: 'Absortividad molar característica', unit: 'L · mol⁻¹ · cm⁻¹' },
            { symbol: 'b', name: 'Camino óptico de la cubeta', unit: 'cm (estándar 1.00)' },
            { symbol: 'c', name: 'Concentración molar del analito', unit: 'mol / L (M)' }
          ]
        }
      ],
      deepExplanation: 'La absortividad molar ε mide la probabilidad cuántica de transición (reglas de selección de espín y simetría): transiciones permitidas π→π* en sistemas aromáticos o polienos alcanzan ε = 10,000 a 100,000 L·mol⁻¹·cm⁻¹, mientras que transiciones prohibidas por simetría n→π* en carbonilos suelen tener ε = 10 a 100 L·mol⁻¹·cm⁻¹.',
      keyTakeaway: 'Convierte la atenuación exponencial del haz al atravesar la solución en una ley matemática directamente proporcional a la concentración.'
    },
    interactiveSimulationType: 'cuvettes'
  },
  {
    id: 'detector',
    name: '6. Detector Fotomultiplicador (PMT) y Arreglo de Fotodiodos',
    shortRole: 'Conversión fotón-electrón por efecto fotoeléctrico y amplificación cuántica',
    category: 'Detección',
    manufacturerInspiration: 'Tubo Fotomultiplicador R928 de Shimadzu y Arreglos de Fotodiodos de Silicio Termostatizados Bruker / Agilent',
    svgRegion: {
      cx: 855,
      cy: 205,
      width: 135,
      height: 135,
      zoomLevel: 2.2,
    },
    whatItIs: 'Transductor fotónico de ultra alta sensibilidad: bien un Tubo Fotomultiplicador (PMT) al vacío con fotocátodo bialcalino y cadena de dínodos en cascada, o bien un Arreglo Lineal de Fotodiodos de Silicio (PDA).',
    whatItDoes: 'Captura los fotones emergentes de las cubetas de referencia y muestra, los convierte en fotoelectrones primarios y genera una corriente eléctrica linealmente proporcional a la potencia radiante recibida.',
    whyItDoesIt: 'En muestras concentradas (p. ej. A = 3.0), solo pasa el 0.1% de los fotones incidentes (1 de cada 1,000). Un sensor ordinario perdería la señal en el ruido térmico; el PMT amplifica cada fotoelectrón hasta un millón de veces manteniendo linealidad en más de 5 décadas.',
    theoreticalReasoning: {
      headline: 'Efecto Fotoeléctrico de Einstein y Multiplicación por Dínodos',
      physicsPrinciples: [
        'Cuando un fotón de energía hν golpea el fotocátodo con función de trabajo Φ, expulsa un electrón si hν > Φ.',
        'En un PMT, el voltaje acelerador entre 9 y 12 dínodos sucesivos multiplica cada electrón por δⁿ ≈ 10⁶ veces.',
        'En un PDA (Photodiode Array), la luz policromática dispersada cae simultáneamente sobre 1,024 microdiodos semiconductores p-n, registrando todo el espectro en milisegundos sin piezas móviles.'
      ],
      equations: [
        {
          formula: 'K_max = h · ν - Φ    |    I_foto = η · q · (P_óptica / h·ν)',
          description: 'Ecuación fotoeléctrica y conversión proporcional de potencia radiante en corriente.',
          variables: [
            { symbol: 'K_max', name: 'Energía cinética máxima del fotoelectrón', unit: 'eV' },
            { symbol: 'Φ', name: 'Función de trabajo del fotocátodo', unit: 'eV (~1.5 eV)' },
            { symbol: 'η', name: 'Eficiencia cuántica del detector', unit: 'e⁻ / fotón' },
            { symbol: 'I_foto', name: 'Corriente fotométrica proporcional a I', unit: 'μA' }
          ]
        }
      ],
      deepExplanation: 'La combinación de alta eficiencia cuántica en UV-Vis y ruido oscuro extremadamente bajo permite diferenciar variaciones de transmitancia inferiores al 0.01%, haciendo posible detectar concentraciones sub-micromolares en química clínica y ambiental.',
      keyTakeaway: 'Convierte cada fotón superviviente al paso por la cubeta en una señal electrónica lineal precisa mediante el efecto fotoeléctrico.'
    },
    interactiveSimulationType: 'detector'
  },
  {
    id: 'datasystem',
    name: '7. Procesamiento Digital y Espectro Electrónico UV-Vis',
    shortRole: 'Cálculo logarítmico A = log₁₀(I₀/I), picos λ_max y curvas de calibración',
    category: 'Datos',
    manufacturerInspiration: 'Software Agilent Cary WinUV, Shimadzu LabSolutions UV-Vis y Bruker OPUS Optical Suite',
    svgRegion: {
      cx: 860,
      cy: 380,
      width: 155,
      height: 130,
      zoomLevel: 2.0,
    },
    whatItIs: 'Módulo conversor analógico-digital (ADC de 24 bits) y plataforma computacional que procesa las señales alternas del blanco y muestra, aplica corrección de línea base y grafica Absorbancia vs Longitud de Onda.',
    whatItDoes: 'Calcula instante a instante A(λ) = -log₁₀(I/I₀) o %T(λ) = 100·(I/I₀), localiza los máximos de absorción λ_max, calcula derivadas espectrales (dA/dλ) y determina concentraciones desconocidas a partir de rectas de calibración.',
    whyItDoesIt: 'Las moléculas no muestran bandas discretas finas en solución debido al solapamiento vibracional-rotacional; el software permite deconvolucionar bandas anchas, identificar desplazamientos batocrómicos/hipsocrómicos y verificar la pureza cromática.',
    theoreticalReasoning: {
      headline: 'Conjugación π, Reglas de Woodward-Fieser y Regresión de Beer-Lambert',
      physicsPrinciples: [
        'Al aumentar la conjugación de dobles enlaces alternados, disminuye la brecha energética ΔE(HOMO–LUMO), desplazando λ_max hacia longitudes de onda mayores (desplazamiento batocrómico o al rojo).',
        'El color percibido por el ojo humano es siempre el color complementario de la banda visible absorbida (p. ej. absorber violeta-azul ~450 nm produce color amarillo-naranja).',
        'Desviaciones de Beer-Lambert aparecen a concentraciones altas (>0.01 M) por interacciones intermoleculares, cambios de índice de refracción o equilibrios ácido-base no amortiguados.'
      ],
      equations: [
        {
          formula: 'c = A(λ_max) / ( ε(λ_max) · b )',
          description: 'Cuantificación directa de concentración analítica por calibración UV-Vis.',
          variables: [
            { symbol: 'λ_max', name: 'Longitud de onda de máxima absorbancia', unit: 'nm' },
            { symbol: 'ε(λ_max)', name: 'Coeficiente de extinción molar en el pico', unit: 'L·mol⁻¹·cm⁻¹' },
            { symbol: 'c', name: 'Concentración calculada de la muestra', unit: 'mol/L (M)' }
          ]
        }
      ],
      deepExplanation: 'El procesamiento en primera y segunda derivada matemática (d²A/dλ²) revela hombros espectrales ocultos en mezclas complejas de proteínas, fármacos o colorantes, multiplicando el poder diagnóstico de un espectro UV-Vis convencional.',
      keyTakeaway: 'Transforma la razón óptica I₀/I en información molecular estructural sobre conjugación electrónica y concentración cuantitativa exacta.'
    },
    interactiveSimulationType: 'datasystem'
  }
];

export const UVVIS_GALLERY: InstrumentGalleryItem[] = [
  {
    id: 'uvvis_chassis_3d',
    title: 'Corte Transversal Arquitectónico 3D del Espectrofotómetro UV-Vis',
    subtitle: 'Sistema óptico de doble haz con fuentes duales, rejilla Czerny-Turner y doble cubeta',
    manufacturerRef: 'Inspirado en Shimadzu UV-2600i Plus, Agilent Cary 3500 y óptica reflexiva Bruker',
    imageSrc: IMAGES.uvvisCutawayUltra3d,
    keyFeatures: [
      'Bancada óptica monolítica de aluminio anodizado libre de vibraciones térmicas',
      'Fuentes duales D₂ (UV profundo) y Tungsteno-Halógeno (Visible/NIR) con espejo conmutador',
      'Monocromador Czerny-Turner con separación prismática-difractiva continua de 190 a 900 nm',
      'Chopper óptico rotatorio que divide el haz entre cubeta de referencia (blanco) y muestra'
    ],
    specs: [
      { label: 'Rango Espectral', value: '190 - 1,100 nm' },
      { label: 'Luz Parásita', value: '< 0.0005% (220 nm)' },
      { label: 'Rango Fotométrico', value: '-4.0 a +5.0 Abs' }
    ]
  },
  {
    id: 'uvvis_lamps_detail',
    title: 'Módulo de Fuentes Duales: Arco de Deuterio (D₂) y Tungsteno-Halógeno',
    subtitle: 'Emisión ultravioleta molecular continua y radiación de Planck en rango visible',
    manufacturerRef: 'Basado en fuentes estabilizadas Shimadzu UV-1900i y tecnología óptica Agilent',
    imageSrc: IMAGES.uvvisLampsSource,
    keyFeatures: [
      'Lámpara de Deuterio con ventana de cuarzo Suprasil® para transmisión hasta 190 nm',
      'Lámpara Halógena de Tungsteno de 30 W con ciclo regenerativo para vida útil prolongada',
      'Espejos cóncavos recubiertos con Al + MgF₂ / SiO₂ que enfocan sin aberración cromática',
      'Conmutación automatizada programable entre 282 y 393 nm (estándar a 340 nm)'
    ],
    specs: [
      { label: 'Rango Lámpara D₂', value: '190 - 370 nm (UV)' },
      { label: 'Rango Lámpara W', value: '330 - 1,100 nm (Vis-NIR)' },
      { label: 'Estabilidad Línea Base', value: '±0.0002 Abs / hora' }
    ]
  },
  {
    id: 'uvvis_monochromator_detail',
    title: 'Monocromador Czerny-Turner y Rejilla Holográfica de Difracción',
    subtitle: 'Resolución angular nanométrica y supresión total de luz parásita',
    manufacturerRef: 'Rejilla Lo-Ray-Ligh® de Shimadzu y óptica asimétrica Agilent Cary',
    imageSrc: IMAGES.uvvisMonochromatorGrating,
    keyFeatures: [
      'Rejilla holográfica plana de alta densidad (1,200 a 2,400 líneas/mm)',
      'Rendija de entrada y salida micrométrica con anchura espectral variable (0.1 - 5.0 nm)',
      'Espejos parabólicos M1 (colimador) y M2 (enfocador) para corregir aberración de coma',
      'Rueda automática de filtros bloqueadores de órdenes superiores (n ≥ 2)'
    ],
    specs: [
      { label: 'Anchura Banda (SBW)', value: '0.1 / 0.5 / 1 / 2 / 5 nm' },
      { label: 'Exactitud de λ', value: '±0.1 nm (a 656.1 nm D₂)' },
      { label: 'Repetibilidad', value: '< ±0.05 nm' }
    ]
  },
  {
    id: 'uvvis_cuvette_detector',
    title: 'Compartimento de Cubetas de Cuarzo y Detección PMT / PDA',
    subtitle: 'Cuantificación por Ley de Beer-Lambert y captación fotónica de alta ganancia',
    manufacturerRef: 'Celdas de cuarzo 1 cm, Fotomultiplicador R928 y arreglo PDA Bruker / Agilent',
    imageSrc: IMAGES.uvvisDetectorPhotodiode,
    keyFeatures: [
      'Celdas ópticas de cuarzo fundido (b = 1.000 cm) transparentes hasta 190 nm',
      'Fotomultiplicador (PMT) con dínodos dorados de ganancia 10⁶ para absorbancias altas',
      'Arreglo de 1,024 fotodiodos de silicio (PDA) para captura instantánea de espectro completo',
      'Control térmico Peltier de precisión (±0.05 °C) para ensayos bioquímicos y ADN'
    ],
    specs: [
      { label: 'Camino Óptico (b)', value: '1.000 cm estándar' },
      { label: 'Ruido Fotométrico', value: '< 0.00003 Abs RMS' },
      { label: 'Velocidad PDA', value: 'Espectro completo < 20 ms' }
    ]
  }
];
