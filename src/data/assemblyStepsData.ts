import { IMAGES } from '../assets/images';

export type InstrumentId = 'ms' | 'uvvis' | 'hplc' | 'ftir' | 'nmr' | 'gc';

export interface AssemblyStep {
  stepNumber: number;
  partKey: string;
  title: string;
  subsystem: string;
  fastenersOrSeals: string;
  whyThisOrder: string;
  actionSummary: string;
  voiceScript: string;
  imageSrc: string;
  accentColor: string;
  explodedOffset: { dx: number; dy: number; dz: number };
}

export interface InstrumentAssemblySpec {
  id: InstrumentId;
  instrumentName: string;
  subtitle: string;
  manufacturerRef: string;
  totalSteps: number;
  steps: AssemblyStep[];
}

export const ASSEMBLY_SPECS: Record<InstrumentId, InstrumentAssemblySpec> = {
  ms: {
    id: 'ms',
    instrumentName: 'Espectrómetro de Masas (EI-MS · Cuadrupolo)',
    subtitle: 'Ensamble completo en 10 pasos: desde patas antivibratorias y bombas de vacío hasta los cuadrupolos, cableado RF, carcasa y encendido espectral',
    manufacturerRef: 'Arquitectura Bruker · Shimadzu UFms · Agilent MSD',
    totalSteps: 10,
    steps: [
      {
        stepNumber: 1,
        partKey: 'ms_chassis_pump',
        title: '1. Chasis Base Antivibratorio y Bomba Rotatoria',
        subsystem: 'Estructura & Vacío Primario',
        fastenersOrSeals: '4 amortiguadores elastoméricos + brida KF-25 con anillo Viton',
        whyThisOrder: 'Se monta primero el bastidor base y la bomba mecánica para aislar vibraciones antes de alinear las lentes y barras cuadrupolares.',
        actionSummary: 'Se nivela la bancada inferior y se fija la bomba de pre-vacío (~10⁻³ Torr).',
        voiceScript: 'Paso uno: instalamos el chasis base antivibratorio y acoplamos la bomba rotatoria de prevacío con sello Viton.',
        imageSrc: IMAGES.puzzlePeristalticPump,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: -30 }
      },
      {
        stepNumber: 2,
        partKey: 'ms_vacuum_manifold',
        title: '2. Cámara de Alto Vacío y Bomba Turbomolecular',
        subsystem: 'Manifold Ultra-Alto Vacío',
        fastenersOrSeals: 'Brida ConFlat CF-100 con empaque metálico de cobre OFHC',
        whyThisOrder: 'La cámara de acero inoxidable 316L debe quedar sellada sobre la turbobomba antes de alojar componentes sensibles de óptica iónica.',
        actionSummary: 'Se atornilla el bloque hermético de alto vacío sobre la turbina de 250 litros por segundo.',
        voiceScript: 'Paso dos: montamos la cámara de acero inoxidable de alto vacío sobre la bomba turbomolecular para alcanzar diez a la menos seis Torr.',
        imageSrc: IMAGES.turbopumpDetectorAssembly,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: 0, dy: 0, dz: 5 }
      },
      {
        stepNumber: 3,
        partKey: 'ms_inlet_capillary',
        title: '3. Puerto de Inyección y Línea Calefactada (280 °C)',
        subsystem: 'Introducción de Muestra',
        fastenersOrSeals: 'Férula grafito-Vespel 1/16" + collar calefactor térmico',
        whyThisOrder: 'Sella la entrada gaseosa hacia el centro de la futura cámara de ionización sin dañar el filamento.',
        actionSummary: 'Se inserta la línea capilar de transferencia térmica en el costado izquierdo.',
        voiceScript: 'Paso tres: ajustamos el puerto de inyección y la línea de transferencia calefactada a doscientos ochenta grados Celsius.',
        imageSrc: IMAGES.puzzleInletInjector,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: -75, dy: 0, dz: 25 }
      },
      {
        stepNumber: 4,
        partKey: 'ms_ion_source',
        title: '4. Fuente de Ionización EI (Filamento 70 eV e Imanes)',
        subsystem: 'Cámara de Ionización',
        fastenersOrSeals: 'Aisladores cerámicos Al₂O₃ + 4 pasamuros herméticos',
        whyThisOrder: 'Debe centrarse frente a la entrada de muestra y alinearse coaxialmente con las lentes extractoras.',
        actionSummary: 'Encajan el bloque repulsor, la jaula de ionización y el filamento de renio de 70 eV.',
        voiceScript: 'Paso cuatro: colocamos la fuente de ionización por impacto electrónico con su filamento de setenta electronvoltios e imanes colimadores.',
        imageSrc: IMAGES.ionsourceAgilentHesDetail,
        accentColor: '#8E3742',
        explodedOffset: { dx: -45, dy: -20, dz: 50 }
      },
      {
        stepNumber: 5,
        partKey: 'ms_lenses',
        title: '5. Lentes Electrostáticas de Extracción y Enfoque',
        subsystem: 'Óptica Iónica',
        fastenersOrSeals: 'Espaciadores de cuarzo + varillas guía paralelas (±5 µm)',
        whyThisOrder: 'Enfocan el haz divergente de cationes antes de ingresar al filtro cuadrupolar.',
        actionSummary: 'Se deslizan los discos colimadores metálicos en serie con potencial acelerador.',
        voiceScript: 'Paso cinco: deslizamos las lentes electrostáticas de extracción y enfoque para colimar el haz de iones positivos.',
        imageSrc: IMAGES.puzzleAcceleratorPlates,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: -15, dy: 0, dz: 65 }
      },
      {
        stepNumber: 6,
        partKey: 'ms_quadrupole',
        title: '6. Analizador Cuadrupolar Hiperbólico (Barras RF + DC)',
        subsystem: 'Filtro de Masas m/z',
        fastenersOrSeals: 'Collares cerámicos de baja expansión térmica (±2 µm)',
        whyThisOrder: 'Solo se monta tras garantizar concentricidad axial perfecta entre las lentes y el detector.',
        actionSummary: 'Descienden las cuatro barras paralelas que filtran trayectorias según relación masa/carga.',
        voiceScript: 'Paso seis: instalamos las cuatro barras del analizador cuadrupolar hiperbólico para filtrar cada fragmento según su relación masa sobre carga.',
        imageSrc: IMAGES.quadrupoleRodsShimadzuBruker,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: 25, dy: 0, dz: 85 }
      },
      {
        stepNumber: 7,
        partKey: 'ms_detector',
        title: '7. Dinodo de Alta Energía y Multiplicador de Electrones',
        subsystem: 'Detección en Cascada',
        fastenersOrSeals: 'Blindaje coaxial RF + conector pasamuros de -2,000 V',
        whyThisOrder: 'Se ubica descentrado al final del cuadrupolo para captar iones filtrados sin ruido de fotones neutros.',
        actionSummary: 'Se acopla el multiplicador capaz de convertir un ion en un millón de electrones.',
        voiceScript: 'Paso siete: fijamos el dinodo y el multiplicador de electrones para amplificar cada ion hasta un millón de veces.',
        imageSrc: IMAGES.turbopumpDetectorAssembly,
        accentColor: '#7C957D',
        explodedOffset: { dx: 70, dy: 0, dz: 55 }
      },
      {
        stepNumber: 8,
        partKey: 'ms_wiring_cooling',
        title: '8. Electrónica RF, Cables Coaxiales y Ventiladores Traseros',
        subsystem: 'Potencia & Enfriamiento',
        fastenersOrSeals: 'Bus digital FPGA + conectores RF blindados y disipadores',
        whyThisOrder: 'Alimenta el generador de radiofrecuencia de los cuadrupolos y extrae calor de los amplificadores de potencia.',
        actionSummary: 'Se conectan las tarjetas RF laterales, los arneses coaxiales y la turbina trasera.',
        voiceScript: 'Paso ocho: cableamos el generador de radiofrecuencia hacia el cuadrupolo y montamos el módulo trasero de ventilación.',
        imageSrc: IMAGES.spectrometerCutawayAgilentBruker,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 0, dy: 65, dz: 35 }
      },
      {
        stepNumber: 9,
        partKey: 'ms_cabinet_panels',
        title: '9. Paneles Laterales, Ventana de Inspección y Bisel Frontal',
        subsystem: 'Envolvente Industrial',
        fastenersOrSeals: 'Paneles en aluminio cepillado + vidrio templado de inspección',
        whyThisOrder: 'Protege los circuitos de alto voltaje, canaliza el flujo de aire interno y deja visible la zona de vacío.',
        actionSummary: 'Se cierran las paredes laterales y el marco frontal de acero cepillado.',
        voiceScript: 'Paso nueve: ensamblamos los paneles laterales, la ventana de inspección y el bisel frontal protector.',
        imageSrc: IMAGES.spectrometerCutawayUltra3d,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: 0, dy: -60, dz: 45 }
      },
      {
        stepNumber: 10,
        partKey: 'ms_housing_data',
        title: '10. Tapa Superior Hermética, Pantalla Táctil y Puesta en Marcha',
        subsystem: 'Cierre Completo & Espectro',
        fastenersOrSeals: '4 pernos superiores M5 + monitor integrado FPGA',
        whyThisOrder: 'El cierre superior completo sella el sistema y habilita el vacío operativo para encender el espectro de masas.',
        actionSummary: 'Desciende la cubierta superior con sus pernos, enciende la pantalla y fluye el haz de iones.',
        voiceScript: 'Paso diez: aseguramos la tapa superior, encendemos la pantalla táctil y el espectrómetro de masas queda armado y operando al cien por ciento.',
        imageSrc: IMAGES.spectrometerCutawayUltra3d,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: 115 }
      }
    ]
  },
  uvvis: {
    id: 'uvvis',
    instrumentName: 'Espectrofotómetro UV-Vis (Doble Haz)',
    subtitle: 'Ensamble completo en 10 pasos: desde el banco óptico negro mate hasta lámparas D₂/W, monocromador Czerny-Turner, cubetas, electrónica y carcasa cerrada',
    manufacturerRef: 'Óptica Agilent Cary · Shimadzu Lo-Ray-Ligh® · Bruker',
    totalSteps: 10,
    steps: [
      {
        stepNumber: 1,
        partKey: 'uv_optical_bench',
        title: '1. Banco Óptico Fundido en Negro Mate y Patas Niveladoras',
        subsystem: 'Chasis Óptico Rígido',
        fastenersOrSeals: 'Placa monolítica anodizada con 3 apoyos cinemáticos',
        whyThisOrder: 'Brinda rigidez térmica y absorbe reflexiones internas parásitas antes de instalar espejos.',
        actionSummary: 'Se asienta la base óptica negra antirreflejante sobre el banco de laboratorio.',
        voiceScript: 'Paso uno: colocamos el banco óptico monolítico en negro mate con sus patas niveladoras antirreflejo.',
        imageSrc: IMAGES.uvvisCutawayUltra3d,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: -30 }
      },
      {
        stepNumber: 2,
        partKey: 'uv_lamps',
        title: '2. Lámparas de Deuterio (UV) y Tungsteno-Halógeno (Vis)',
        subsystem: 'Fuentes Radiantes',
        fastenersOrSeals: 'Zócalos cerámicos pre-alineados + espejo selector motorizado',
        whyThisOrder: 'Permite dirigir el haz continuo de 190 a 1,100 nm sobre la rendija de entrada.',
        actionSummary: 'Se montan ambas fuentes luminosas con espejo conmutador automático a 340 nm.',
        voiceScript: 'Paso dos: instalamos las lámparas de deuterio ultravioleta y tungsteno visible con su espejo selector.',
        imageSrc: IMAGES.uvvisLampsSource,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: -75, dy: -20, dz: 35 }
      },
      {
        stepNumber: 3,
        partKey: 'uv_slits_mirrors',
        title: '3. Rendija Micrométrica y Espejo Colimador Cóncavo',
        subsystem: 'Colimación Czerny-Turner',
        fastenersOrSeals: 'Cuchillas de acero + montura 3 ejes en espejo Al/MgF₂',
        whyThisOrder: 'Convierte la luz divergente en un frente de onda paralelo hacia la red de difracción.',
        actionSummary: 'Descienden la rendija de entrada y el espejo colimador parabólico.',
        voiceScript: 'Paso tres: montamos la rendija micrométrica de entrada y el espejo colimador cóncavo.',
        imageSrc: IMAGES.uvvisMonochromatorGrating,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: -35, dy: 25, dz: 50 }
      },
      {
        stepNumber: 4,
        partKey: 'uv_grating',
        title: '4. Red de Difracción Holográfica en Motor Paso a Paso',
        subsystem: 'Dispersión Monocromática',
        fastenersOrSeals: 'Eje rotatorio sin holgura con codificador óptico 0.05 nm',
        whyThisOrder: 'Separa los colores por interferencia constructiva (nλ = d·senθ) hacia el espejo de enfoque.',
        actionSummary: 'Encaja la torreta de rejilla de 1,200 líneas por milímetro.',
        voiceScript: 'Paso cuatro: acoplamos la red de difracción holográfica sobre su motor de precisión para aislar cada longitud de onda.',
        imageSrc: IMAGES.uvvisMonochromatorGrating,
        accentColor: '#8E3742',
        explodedOffset: { dx: 0, dy: -30, dz: 75 }
      },
      {
        stepNumber: 5,
        partKey: 'uv_beam_splitter',
        title: '5. Divisor de Doble Haz (Chopper Rotatorio 50/50)',
        subsystem: 'Compensación I₀ / I',
        fastenersOrSeals: 'Motor brushless silencioso + espejo sectorial semitransparente',
        whyThisOrder: 'Divide el haz monocromático en trayectorias paralelas idénticas hacia Muestra y Referencia.',
        actionSummary: 'Se instala el divisor óptico rotatorio en el centro del chasis.',
        voiceScript: 'Paso cinco: montamos el divisor de doble haz para enviar simultáneamente luz a la cubeta de referencia y a la muestra.',
        imageSrc: IMAGES.uvvisCutawayUltra3d,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 25, dy: 0, dz: 60 }
      },
      {
        stepNumber: 6,
        partKey: 'uv_cuvette_holder',
        title: '6. Compartimento Peltier y Cubetas de Cuarzo Suprasil (1 cm)',
        subsystem: 'Zona de Absorción Beer-Lambert',
        fastenersOrSeals: 'Bloque Peltier ±0.1 °C + resortes de presión para cuarzo UV',
        whyThisOrder: 'Posiciona ambas cubetas exactamente en el plano focal de los dos haces paralelos.',
        actionSummary: 'Se fija el doble portacubetas termostatizado con sus dos celdas de cuarzo.',
        voiceScript: 'Paso seis: fijamos el compartimento termostatizado Peltier e insertamos ambas cubetas de cuarzo de un centímetro.',
        imageSrc: IMAGES.uvvisCuvetteCompartment,
        accentColor: '#7C957D',
        explodedOffset: { dx: 45, dy: 15, dz: 45 }
      },
      {
        stepNumber: 7,
        partKey: 'uv_detector',
        title: '7. Detectores de Fotodiodos Duales de Silicio (Muestra + Ref)',
        subsystem: 'Transducción Fotoeléctrica',
        fastenersOrSeals: 'Ventana de cuarzo + preamplificador logarítmico de bajo ruido',
        whyThisOrder: 'Miden I e I₀ simultáneamente para calcular absorbancia sin deriva de intensidad.',
        actionSummary: 'Se instalan los dos receptores fotónicos al fondo de la trayectoria óptica.',
        voiceScript: 'Paso siete: instalamos los dos detectores de fotodiodos de silicio para medir en vivo la relación entre luz incidente y transmitida.',
        imageSrc: IMAGES.uvvisDetectorPhotodiode,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: 75, dy: 0, dz: 50 }
      },
      {
        stepNumber: 8,
        partKey: 'uv_pcb_power',
        title: '8. Tarjeta Electrónica A/D, Fuente de Lámparas y Ventilador',
        subsystem: 'Control y Disipación',
        fastenersOrSeals: 'Cableado blindado de fotodiodos + fuente regulada 24 V',
        whyThisOrder: 'Alimenta el encendido de la lámpara de deuterio y disipa el calor lejos del monocromador.',
        actionSummary: 'Se colocan la fuente lateral de potencia y las conexiones electrónicas.',
        voiceScript: 'Paso ocho: integramos la tarjeta de adquisición analógica digital, la fuente regulada y el ventilador de extracción térmica.',
        imageSrc: IMAGES.uvvisLampsSource,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 0, dy: 65, dz: 30 }
      },
      {
        stepNumber: 9,
        partKey: 'uv_enclosure_walls',
        title: '9. Carcasa Envolvente Hermética y Panel Frontal de Control',
        subsystem: 'Aislamiento Total de Luz',
        fastenersOrSeals: 'Paredes anodizadas con sellos laberinto anti-luz ambiental',
        whyThisOrder: 'Cierra el recinto óptico para impedir que la luz externa contamine las lecturas de absorbancia.',
        actionSummary: 'Se fijan los paneles exteriores oscuros y la consola frontal inclinada.',
        voiceScript: 'Paso nueve: cerramos las paredes perimetrales y el panel frontal para sellar el equipo contra la luz ambiental.',
        imageSrc: IMAGES.uvvisCutawayUltra3d,
        accentColor: '#1C3947',
        explodedOffset: { dx: 0, dy: -60, dz: 40 }
      },
      {
        stepNumber: 10,
        partKey: 'uv_cover_readout',
        title: '10. Tapa Superior Abatible, Pantalla y Barrido Espectral Completo',
        subsystem: 'Cierre y Calibración NIST',
        fastenersOrSeals: 'Tapa superior con bisagras amortiguadas + pantalla espectro UV-Vis',
        whyThisOrder: 'Completa el sellado superior y dispara la calibración automática de línea base en todo el rango.',
        actionSummary: 'Cierra la compuerta superior, enciende la pantalla y recorre el haz por toda la óptica.',
        voiceScript: 'Paso diez: bajamos la tapa hermética superior, encendemos la pantalla espectral y el espectrofotómetro ultravioleta visible queda completamente armado.',
        imageSrc: IMAGES.uvvisCutawayUltra3d,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: 110 }
      }
    ]
  },
  hplc: {
    id: 'hplc',
    instrumentName: 'Cromatógrafo Líquido UHPLC (1,300 bar)',
    subtitle: 'Ensamble completo en 10 pasos: desde bandeja, frascos y desgasificador hasta bomba de zafiro, inyector 6 vías, columna C18, celda DAD y torre cerrada',
    manufacturerRef: 'Torre Agilent 1290 Infinity II · Shimadzu Nexera · Bruker Elute',
    totalSteps: 10,
    steps: [
      {
        stepNumber: 1,
        partKey: 'hplc_tray_degasser',
        title: '1. Bandeja Antiderrame, Reservorios A/B y Desgasificador al Vacío',
        subsystem: 'Acondicionamiento de Solvente',
        fastenersOrSeals: 'Bomba de vacío integrada + tubería fluoropolimérica 1/8"',
        whyThisOrder: 'Elimina burbujas de aire disueltas mediante membrana Teflon AF antes de presurizar la fase móvil.',
        actionSummary: 'Se monta la plataforma base con las botellas A y B y el módulo de vacío.',
        voiceScript: 'Paso uno: instalamos la bandeja antiderrame, las botellas de fase móvil acuosa y orgánica y el desgasificador al vacío.',
        imageSrc: IMAGES.hplcBinaryPumpDegasser,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: -75, dy: 0, dz: 10 }
      },
      {
        stepNumber: 2,
        partKey: 'hplc_gradient_mixer',
        title: '2. Válvulas Proporcionadoras y Mezclador de Gradiente',
        subsystem: 'Formación de Gradiente %B',
        fastenersOrSeals: 'Racores PEEK + microcámara mezcladora helicoidal',
        whyThisOrder: 'Homogeneiza agua y acetonitrilo antes de ingresar a los cabezales de alta presión.',
        actionSummary: 'Se instala el módulo mezclador dinámico de gradiente binario.',
        voiceScript: 'Paso dos: acoplamos las válvulas proporcionadoras y el mezclador microfluídico de gradiente.',
        imageSrc: IMAGES.hplcBinaryPumpDegasser,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: -40, dy: -20, dz: 35 }
      },
      {
        stepNumber: 3,
        partKey: 'hplc_binary_pump',
        title: '3. Bomba Binaria de Alta Presión (Pistones de Zafiro + Rubí)',
        subsystem: 'Generación Hidráulica 1,300 bar',
        fastenersOrSeals: 'Cabezal de acero inoxidable 316 + sellos PTFE energizados',
        whyThisOrder: 'Genera hasta mil trescientos bar necesarios para vencer la resistencia del lecho C18.',
        actionSummary: 'Encaja el bloque de bomba binaria con sus dos pistones de zafiro en serie.',
        voiceScript: 'Paso tres: montamos la bomba binaria de pistones de zafiro y válvulas de rubí capaz de alcanzar mil trescientos bar.',
        imageSrc: IMAGES.hplcBinaryPumpDegasser,
        accentColor: '#8E3742',
        explodedOffset: { dx: -25, dy: 15, dz: 55 }
      },
      {
        stepNumber: 4,
        partKey: 'hplc_autosampler',
        title: '4. Automuestreador Robótico y Válvula Rotatoria de 6 Vías',
        subsystem: 'Inyección Split-Loop',
        fastenersOrSeals: 'Rotor cerámico de alta presión + capilar acero 100 µm ID',
        whyThisOrder: 'Introduce microlitros exactos dentro del flujo presurizado sin interrumpir la bomba.',
        actionSummary: 'Se posiciona el compartimento de viales robótico y la válvula de seis puertos.',
        voiceScript: 'Paso cuatro: fijamos el automuestreador robotizado con su bandeja de viales y la válvula rotatoria de seis vías.',
        imageSrc: IMAGES.hplcAutosamplerValve,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 10, dy: -25, dz: 70 }
      },
      {
        stepNumber: 5,
        partKey: 'hplc_oven_preheater',
        title: '5. Horno de Columna Peltier y Precalentador Capilar',
        subsystem: 'Control Térmico (±0.05 °C)',
        fastenersOrSeals: 'Cuna termostatizada + puerta térmica aislada',
        whyThisOrder: 'Estabiliza la viscosidad de la fase móvil antes de entrar a la columna.',
        actionSummary: 'Se monta la cámara térmica lateral con precalentador capilar.',
        voiceScript: 'Paso cinco: instalamos el horno Peltier de columna y su precalentador capilar para evitar gradientes térmicos.',
        imageSrc: IMAGES.hplcC18ColumnOven,
        accentColor: '#7C957D',
        explodedOffset: { dx: 40, dy: 0, dz: 40 }
      },
      {
        stepNumber: 6,
        partKey: 'hplc_c18_column',
        title: '6. Columna Analítica Empacada C18 (Sub-2 µm) y Racores',
        subsystem: 'Separación Hidrofóbica',
        fastenersOrSeals: 'Conectores Finger-Tight de volumen muerto cero',
        whyThisOrder: 'Se aloja dentro del horno con capilares cortos para conservar miles de platos teóricos.',
        actionSummary: 'Se conecta el cartucho cromatográfico de sílice C18 dentro del horno.',
        voiceScript: 'Paso seis: conectamos la columna analítica C dieciocho sub dos micrómetros dentro del horno con racores de volumen muerto cero.',
        imageSrc: IMAGES.hplcC18ColumnOven,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 42, dy: 20, dz: 80 }
      },
      {
        stepNumber: 7,
        partKey: 'hplc_dad_detector',
        title: '7. Detector UV-Vis DAD de Arreglo de Diodos y Celda en Z',
        subsystem: 'Detección Óptica Continua',
        fastenersOrSeals: 'Microcelda de flujo de cuarzo 10 mm + capilar PEEK salida',
        whyThisOrder: 'Mide instantáneamente el eluyente saliente sin diluir las bandas separadas.',
        actionSummary: 'Se acopla la lámpara de deuterio, la celda en Z y el arreglo de mil veinticuatro diodos.',
        voiceScript: 'Paso siete: instalamos el detector de arreglo de diodos con microcelda de flujo en Z a la salida de la columna.',
        imageSrc: IMAGES.hplcDadDetector,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: 75, dy: 0, dz: 65 }
      },
      {
        stepNumber: 8,
        partKey: 'hplc_capillary_plumbing',
        title: '8. Tuberías Capilares de Alta Presión, Bus CAN y Sensores de Fuga',
        subsystem: 'Interconexión Fluídica',
        fastenersOrSeals: 'Capilares 0.12 mm acero inoxidable + sensores ópticos de goteo',
        whyThisOrder: 'Enlaza bomba, inyector, columna y detector formando un circuito cerrado estanco.',
        actionSummary: 'Se tienden todos los capilares intermodulares y los sensores inferiores de fuga.',
        voiceScript: 'Paso ocho: tendemos los capilares de acero inoxidable de alta presión y activamos los sensores de fuga intermodulares.',
        imageSrc: IMAGES.hplcCutawayUltra3d,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 0, dy: -45, dz: 45 }
      },
      {
        stepNumber: 9,
        partKey: 'hplc_cabinet_doors',
        title: '9. Bastidor Exterior de Torre, Puertas Frontales y Bandeja Superior',
        subsystem: 'Envolvente Modular',
        fastenersOrSeals: 'Marcos laterales anodizados + puertas frontales con visor acrílico',
        whyThisOrder: 'Estabiliza la torre apilada y protege mecánicamente contra sobrepresiones accidentales.',
        actionSummary: 'Se montan las paredes envolventes de la torre UHPLC y las compuertas frontales.',
        voiceScript: 'Paso nueve: cerramos la carcasa modular de la torre cromatográfica y colocamos las puertas frontales con visor.',
        imageSrc: IMAGES.hplcCutawayUltra3d,
        accentColor: '#1C3947',
        explodedOffset: { dx: 0, dy: 60, dz: 40 }
      },
      {
        stepNumber: 10,
        partKey: 'hplc_stack_enclosure',
        title: '10. Cubierta Superior, Pantalla Cromatográfica y Flujo Activo',
        subsystem: 'Cierre y Puesta en Marcha',
        fastenersOrSeals: 'Tapa superior de torre + monitor OpenLab/LabSolutions',
        whyThisOrder: 'Completa el sistema permitiendo presurizar a seiscientos bar y separar los picos en vivo.',
        actionSummary: 'Se instala el módulo superior, enciende el monitor y fluyen las bandas separadas en vivo.',
        voiceScript: 'Paso diez: aseguramos el techo modular, encendemos el monitor de datos y el cromatógrafo líquido queda armado e inyectando.',
        imageSrc: IMAGES.hplcCutawayUltra3d,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: 110 }
      }
    ]
  },
  ftir: {
    id: 'ftir',
    instrumentName: 'Espectrómetro Infrarrojo Medio (FTIR)',
    subtitle: 'Ensamble completo en 10 pasos: desde chasis desecado, fuente Globar y láser He-Ne hasta divisor KBr, espejos RockSolid™, módulo ATR, sensor DLATGS y carcasa sellada',
    manufacturerRef: 'Óptica RockSolid™ Bruker · Shimadzu ADA · Agilent Cary 630',
    totalSteps: 10,
    steps: [
      {
        stepNumber: 1,
        partKey: 'ftir_sealed_chassis',
        title: '1. Chasis Óptico Sellado y Cartucho Desecante / Purga N₂',
        subsystem: 'Recinto Libre de H₂O',
        fastenersOrSeals: 'Juntas EPDM herméticas + desecador de tamiz molecular',
        whyThisOrder: 'Reduce la humedad interna por debajo del 15% antes de introducir cristales higroscópicos de KBr.',
        actionSummary: 'Se coloca la base sellada estanca con bloque desecante regenerativo.',
        voiceScript: 'Paso uno: ubicamos el chasis óptico hermético junto con el cartucho desecante para proteger la óptica salina contra la humedad.',
        imageSrc: IMAGES.ftirCutawayUltra3d,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: -30 }
      },
      {
        stepNumber: 2,
        partKey: 'ftir_globar_source',
        title: '2. Fuente Infrarroja Cerámica Globar (SiC a 1,200 °C)',
        subsystem: 'Emisor de Cuerpo Negro IR',
        fastenersOrSeals: 'Disipador térmico aleteado + espejo parabólico dorado',
        whyThisOrder: 'Colima la radiación infrarroja media (4,000–400 cm⁻¹) manteniendo el calor fuera de la óptica.',
        actionSummary: 'Se inserta la fuente incandescente de carburo de silicio y su espejo dorado.',
        voiceScript: 'Paso dos: montamos la fuente infrarroja cerámica Globar a mil doscientos grados Celsius con su espejo parabólico dorado.',
        imageSrc: IMAGES.ftirGlobarSource,
        accentColor: '#8E3742',
        explodedOffset: { dx: -75, dy: -20, dz: 40 }
      },
      {
        stepNumber: 3,
        partKey: 'ftir_hene_laser',
        title: '3. Láser Metrológico He-Ne (632.8 nm) y Fotodiodo de Referencia',
        subsystem: 'Regla Interferométrica Láser',
        fastenersOrSeals: 'Soporte cinemático coaxial paralelo al haz IR',
        whyThisOrder: 'Sincroniza el muestreo cada 316.4 nm del desplazamiento del espejo móvil (Ventaja de Connes).',
        actionSummary: 'Se fija el tubo láser rojo de referencia óptica paralelo al banco.',
        voiceScript: 'Paso tres: alineamos el láser metrológico de helio-neón a seiscientos treinta y dos punto ocho nanómetros para calibrar el interferograma.',
        imageSrc: IMAGES.ftirMichelsonInterferometer,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: -40, dy: 30, dz: 55 }
      },
      {
        stepNumber: 4,
        partKey: 'ftir_beamsplitter',
        title: '4. Divisor de Haz de Bromuro de Potasio (KBr/Ge) a 45°',
        subsystem: 'Núcleo de Michelson',
        fastenersOrSeals: 'Montura sin tensión mecánica + placa compensadora KBr',
        whyThisOrder: 'Divide 50% del haz hacia el espejo fijo y 50% hacia el móvil creando la interferencia.',
        actionSummary: 'Desciende delicadamente el cristal divisor semirreflector a cuarenta y cinco grados.',
        voiceScript: 'Paso cuatro: instalamos a cuarenta y cinco grados el divisor de haz de bromuro de potasio recubierto en germanio.',
        imageSrc: IMAGES.ftirMichelsonInterferometer,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: 0, dy: 0, dz: 85 }
      },
      {
        stepNumber: 5,
        partKey: 'ftir_mirrors',
        title: '5. Espejo Fijo y Espejo Móvil Retroreflector Cúbico Oscilante',
        subsystem: 'Escáner de Diferencia Óptica δ',
        fastenersOrSeals: 'Pivote magnético sin desgaste o cojinete de aire lineal',
        whyThisOrder: 'Genera la diferencia de camino óptico δ que codifica todas las frecuencias IR simultáneamente.',
        actionSummary: 'Se instalan ambos brazos reflectores dorados en ángulo recto exacto.',
        voiceScript: 'Paso cinco: acoplamos el espejo fijo y el espejo móvil retroreflector que modulará continuamente la diferencia de camino óptico.',
        imageSrc: IMAGES.ftirMichelsonInterferometer,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 5, dy: -45, dz: 65 }
      },
      {
        stepNumber: 6,
        partKey: 'ftir_atr_module',
        title: '6. Módulo ATR de Cristal de Diamante y Prensa Micrométrica',
        subsystem: 'Onda Evanescente ATR',
        fastenersOrSeals: 'Base kinemática Snap-in + yunque con limitador de torque',
        whyThisOrder: 'Enfoca el interferograma modulado justo en la faceta del diamante para penetrar ~2 µm en la muestra.',
        actionSummary: 'Encaja el bloque ATR frontal con su diamante y brazo de prensado.',
        voiceScript: 'Paso seis: encajamos el módulo de reflectancia total atenuada con cristal de diamante y su prensa de contacto.',
        imageSrc: IMAGES.ftirAtrSampleChamber,
        accentColor: '#7C957D',
        explodedOffset: { dx: 45, dy: 20, dz: 55 }
      },
      {
        stepNumber: 7,
        partKey: 'ftir_detector',
        title: '7. Detector Piroeléctrico DLATGS y Espejo Elipsoidal',
        subsystem: 'Lectura de Interferograma I(δ)',
        fastenersOrSeals: 'Ventana hermética de KBr/CsI + conversor ADC de 24 bits',
        whyThisOrder: 'Capta todo el interferograma simultáneamente maximizando la relación señal-ruido (Ventaja de Fellgett).',
        actionSummary: 'Se atornilla el sensor térmico piroeléctrico al extremo derecho del recorrido.',
        voiceScript: 'Paso siete: fijamos el detector piroeléctrico de sulfato de triglicina deuterada para registrar el interferograma completo.',
        imageSrc: IMAGES.ftirDtgsDetector,
        accentColor: '#8E3742',
        explodedOffset: { dx: 80, dy: 0, dz: 45 }
      },
      {
        stepNumber: 8,
        partKey: 'ftir_dsp_cabling',
        title: '8. Tarjeta DSP de Transformada de Fourier y Disipador Trasero',
        subsystem: 'Electrónica FFT & Control',
        fastenersOrSeals: 'Cableado blindado de bajo ruido + módulo láser driver',
        whyThisOrder: 'Digitaliza las franjas del láser He-Ne y ejecuta la FFT en tiempo real.',
        actionSummary: 'Se conectan la tarjeta digitalizadora trasera y el disipador térmico de la fuente.',
        voiceScript: 'Paso ocho: conectamos el procesador digital de Transformada de Fourier y el disipador de la fuente cerámica.',
        imageSrc: IMAGES.ftirCutawayUltra3d,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 0, dy: 65, dz: 35 }
      },
      {
        stepNumber: 9,
        partKey: 'ftir_enclosure_shell',
        title: '9. Carcasa Hermética Perimetral y Ventana ATR Frontal',
        subsystem: 'Sellado Higrométrico',
        fastenersOrSeals: 'Paneles laterales sellados con empaque continuo EPDM',
        whyThisOrder: 'Aísla el compartimento óptico permitiendo acceso externo únicamente al cristal de diamante ATR.',
        actionSummary: 'Se montan las paredes selladas dejando expuesto el platillo del diamante ATR.',
        voiceScript: 'Paso nueve: colocamos la carcasa perimetral hermética dejando accesible únicamente el platillo superior del diamante.',
        imageSrc: IMAGES.ftirCutawayUltra3d,
        accentColor: '#1C3947',
        explodedOffset: { dx: 0, dy: -60, dz: 45 }
      },
      {
        stepNumber: 10,
        partKey: 'ftir_cover_fft',
        title: '10. Tapa Superior Sellada, Monitor FFT y Haz Infrarrojo Activo',
        subsystem: 'Cierre y Espectro %T',
        fastenersOrSeals: 'Tapa superior con pernos perimetrales + visor espectral',
        whyThisOrder: 'Completa el sellado seco y activa el haz IR, el láser rojo He-Ne y el espectro vibracional.',
        actionSummary: 'Se cierra el equipo por completo, oscila el espejo de Michelson y aparece el espectro IR.',
        voiceScript: 'Paso diez: sellamos la cubierta superior, activamos el interferómetro de Michelson y el espectrómetro infrarrojo queda armado y operativo.',
        imageSrc: IMAGES.ftirCutawayUltra3d,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: 110 }
      }
    ]
  },
  nmr: {
    id: 'nmr',
    instrumentName: 'Espectrómetro RMN Superconductor (¹H · 400 MHz)',
    subtitle: 'Ensamble completo en 10 pasos: desde patas neumáticas, solenoide superconductor y criostato LHe/LN₂ hasta shims, sonda CryoProbe™, spinner, consola y blindaje',
    manufacturerRef: 'Imán Ascend™ Bruker · Agilent DirectDrive™ · Shimadzu qNMR',
    totalSteps: 10,
    steps: [
      {
        stepNumber: 1,
        partKey: 'nmr_anti_vibration',
        title: '1. Trípode Neumático Antivibratorio y Anillo Base No Magnético',
        subsystem: 'Soporte Estructural',
        fastenersOrSeals: '3 patas de aluminio aeronáutico con amortiguadores neumáticos',
        whyThisOrder: 'Aísla vibraciones del suelo y evita materiales ferromagnéticos que distorsionarían el campo B₀.',
        actionSummary: 'Se nivelan las tres columnas neumáticas y el anillo estructural inferior.',
        voiceScript: 'Paso uno: nivelamos las tres columnas neumáticas antivibratorias no magnéticas capaces de sostener todo el criostato.',
        imageSrc: IMAGES.nmrCutawayUltra3d,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: -30 }
      },
      {
        stepNumber: 2,
        partKey: 'nmr_supercond_coil',
        title: '2. Bobina Solenoide Superconductora Nb₃Sn / NbTi (9.4 Tesla)',
        subsystem: 'Núcleo Generador de B₀',
        fastenersOrSeals: 'Soldadura superconductora persistente + interruptor criogénico',
        whyThisOrder: 'El devanado superconductor debe quedar centrado en el eje vertical Z antes de encapsularlo.',
        actionSummary: 'Se colocan los anillos superconductores principales y de compensación activa.',
        voiceScript: 'Paso dos: instalamos el solenoide superconductor de niobio estaño que generará el campo magnético estático de nueve punto cuatro Tesla.',
        imageSrc: IMAGES.nmrSuperconductingMagnet,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 0, dy: 0, dz: 35 }
      },
      {
        stepNumber: 3,
        partKey: 'nmr_cryostat_dewar',
        title: '3. Criostato Dewar Anidado (Helio 4.2 K y Nitrógeno 77 K)',
        subsystem: 'Aislamiento Criogénico',
        fastenersOrSeals: 'Soldadura TIG de ultra-alto vacío + aislamiento multicapa',
        whyThisOrder: 'Sostiene la superconductividad sin resistencia eléctrica ni fuente de corriente externa.',
        actionSummary: 'Desciende la cámara térmica cilíndrica de doble camisa criogénica al vacío.',
        voiceScript: 'Paso tres: cerramos el criostato Dewar anidado con camisas de helio líquido a cuatro punto dos Kelvin y nitrógeno a setenta y siete Kelvin.',
        imageSrc: IMAGES.nmrSuperconductingMagnet,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: 0, dy: 0, dz: 65 }
      },
      {
        stepNumber: 4,
        partKey: 'nmr_shim_tube',
        title: '4. Camisa de Bobinas Shim (X, Y, Z, Z²) y Canal Lock ²H',
        subsystem: 'Homogeneidad < 1 ppb',
        fastenersOrSeals: 'Tubo central de 54 mm a temperatura ambiente + fijación en latón',
        whyThisOrder: 'Reviste el orificio central para homogeneizar B₀ por debajo de una parte por billón.',
        actionSummary: 'Desciende la camisa de treinta y seis bobinas shim hacia el eje central del imán.',
        voiceScript: 'Paso cuatro: deslizamos por el eje central la camisa de bobinas shim para afinar la homogeneidad del campo a una parte por billón.',
        imageSrc: IMAGES.nmrAutosamplerShim,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: 85 }
      },
      {
        stepNumber: 5,
        partKey: 'nmr_rf_probe',
        title: '5. Sonda Criogénica CryoProbe™ con Bobinas RF en Silla (20 K)',
        subsystem: 'Antena Transceptora B₁',
        fastenersOrSeals: 'Brida inferior de bloqueo + línea criogénica de circuito cerrado',
        whyThisOrder: 'Se introduce desde abajo para ubicar la bobina en silla exactamente en el centro isocéntrico.',
        actionSummary: 'Sube la sonda RF desde la base hasta bloquearse en el punto dulce magnético.',
        voiceScript: 'Paso cinco: elevamos desde la base la sonda criogénica con bobinas de radiofrecuencia en silla hasta el centro exacto del imán.',
        imageSrc: IMAGES.nmrCryoprobeRfCoil,
        accentColor: '#8E3742',
        explodedOffset: { dx: 0, dy: 0, dz: -60 }
      },
      {
        stepNumber: 6,
        partKey: 'nmr_spinner_tube',
        title: '6. Turbina Neumática (20 Hz) y Tubo Borosilicato 5 mm (CDCl₃)',
        subsystem: 'Muestra & Lock Deuterio',
        fastenersOrSeals: 'Colchón de aire comprimido + galga de profundidad de 5 mm',
        whyThisOrder: 'El tubo cae amortiguado por aire desde arriba para centrarse suavemente en la sonda.',
        actionSummary: 'Baja la turbina giratoria con la muestra deuterada hasta la ventana RF.',
        voiceScript: 'Paso seis: introducimos el tubo de cinco milímetros con solvente deuterado sobre su turbina neumática giratoria.',
        imageSrc: IMAGES.nmrAutosamplerShim,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 0, dy: 0, dz: 115 }
      },
      {
        stepNumber: 7,
        partKey: 'nmr_console',
        title: '7. Consola Transceptora RF en Cuadratura y Preamplificadores',
        subsystem: 'Pulso 90° & Digitalización FID',
        fastenersOrSeals: 'Cables coaxiales fase-emparejados + rack electrónico aislado',
        whyThisOrder: 'Genera pulsos de cuatrocientos megahercios y digitaliza los ecos FID en microvoltios.',
        actionSummary: 'Se instala el gabinete electrónico lateral con su pantalla y cableado coaxial.',
        voiceScript: 'Paso siete: conectamos la consola transceptora de radiofrecuencia en cuadratura mediante cables coaxiales blindados.',
        imageSrc: IMAGES.nmrRfConsoleSpectrometer,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: 85, dy: 0, dz: 25 }
      },
      {
        stepNumber: 8,
        partKey: 'nmr_cryo_turrets',
        title: '8. Torretas Superiores de Llenado LHe/LN₂ y Válvulas de Alivio',
        subsystem: 'Seguridad Criogénica',
        fastenersOrSeals: 'Cuellos criogénicos de baja conducción + válvulas check',
        whyThisOrder: 'Sellan las entradas superiores de reposición de helio y nitrógeno manteniendo presión segura.',
        actionSummary: 'Se acoplan las dos torretas superiores de llenado y monitoreo de nivel.',
        voiceScript: 'Paso ocho: montamos las torretas superiores de llenado criogénico y las válvulas de seguridad de helio.',
        imageSrc: IMAGES.nmrSuperconductingMagnet,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: 0, dy: 0, dz: 120 }
      },
      {
        stepNumber: 9,
        partKey: 'nmr_outer_jacket',
        title: '9. Carcasa Externa Acero Inoxidable y Chimenea SampleJet™',
        subsystem: 'Envolvente & Automuestreador',
        fastenersOrSeals: 'Camisa pulida externa con ventana cutaway + guía superior',
        whyThisOrder: 'Protege el criostato y guía la inserción robótica de los siguientes tubos de muestra.',
        actionSummary: 'Se cierra el cilindro metálico exterior y la chimenea superior de carga.',
        voiceScript: 'Paso nueve: envolvemos el imán con su carcasa externa de acero inoxidable y la chimenea superior de carga automática.',
        imageSrc: IMAGES.nmrCutawayUltra3d,
        accentColor: '#1C3947',
        explodedOffset: { dx: 0, dy: -50, dz: 40 }
      },
      {
        stepNumber: 10,
        partKey: 'nmr_shield_fft',
        title: '10. Bloqueo ²H, Pulso 90° en B₁ y Espectro ¹H RMN en Pantalla',
        subsystem: 'Puesta en Campo & TopSpin/VnmrJ',
        fastenersOrSeals: 'Monitor cuántico de frecuencias δ (12 → 0 ppm)',
        whyThisOrder: 'Completa el equipo y ejecuta la precesión de Larmor para trazar el primer espectro protónico.',
        actionSummary: 'Enciende el espectro en la consola y el vector de magnetización precesa en vivo.',
        voiceScript: 'Paso diez: activamos el bloqueo de deuterio, aplicamos el pulso de noventa grados y el espectrómetro de resonancia magnética nuclear queda operando completamente.',
        imageSrc: IMAGES.nmrCutawayUltra3d,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: 110 }
      }
    ]
  },
  gc: {
    id: 'gc',
    instrumentName: 'Cromatógrafo de Gases Capilar (GC · FID/TCD)',
    subtitle: 'Ensamble completo en 10 pasos: desde chasis y trampas O₂/H₂O hasta EPC, horno con turbina, inyector Split/Splitless, capilar de 30 m, llama FID, torre y puerta cerrada',
    manufacturerRef: 'Arquitectura Agilent 8890 · Shimadzu Nexis GC-2030 · Bruker SCION',
    totalSteps: 10,
    steps: [
      {
        stepNumber: 1,
        partKey: 'gc_chassis',
        title: '1. Bastidor Base, Aislamiento Térmico y Fuente de Potencia',
        subsystem: 'Estructura & Potencia',
        fastenersOrSeals: 'Chasis de acero inoxidable + paneles de fibra cerámica térmica',
        whyThisOrder: 'Aísla las tarjetas electrónicas inferiores frente a los 450 °C que alcanzará el horno.',
        actionSummary: 'Se asienta la base estructural con la fuente de alimentación aislada.',
        voiceScript: 'Paso uno: colocamos el bastidor base con aislamiento cerámico y la fuente de potencia inferior.',
        imageSrc: IMAGES.gcCutawayUltra3d,
        accentColor: '#7C957D',
        explodedOffset: { dx: 0, dy: 0, dz: -30 }
      },
      {
        stepNumber: 2,
        partKey: 'gc_gas_epc',
        title: '2. Trampas O₂/H₂O y Módulo Neumático Electrónico (EPC/AFC)',
        subsystem: 'Control de Gas Portador',
        fastenersOrSeals: 'Tubería pre-limpiada 1/8" + férulas metálicas Swagelok',
        whyThisOrder: 'Purifica Helio/Hidrógeno y fija presión sub-milipsi antes de calentar cualquier fase.',
        actionSummary: 'Se fijan los cartuchos purificadores y las válvulas proporcionales EPC.',
        voiceScript: 'Paso dos: instalamos las trampas indicadoras de oxígeno y humedad junto al módulo neumático electrónico EPC.',
        imageSrc: IMAGES.gcCarrierEpcSupply,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: -75, dy: 0, dz: 30 }
      },
      {
        stepNumber: 3,
        partKey: 'gc_oven_fan',
        title: '3. Cámara del Horno, Resistencia Calefactora y Turbina Radial',
        subsystem: 'Horno de Convección Forzada',
        fastenersOrSeals: 'Eje motor balanceado + sensor PT-1000 de ±0.1 °C',
        whyThisOrder: 'El ventilador y las resistencias se prueban antes de colgar la delicada columna capilar.',
        actionSummary: 'Se montan la cámara aislada, la resistencia térmica y el ventilador trasero.',
        voiceScript: 'Paso tres: ensamblamos la cámara del horno térmico junto con la resistencia calefactora y la turbina de convección.',
        imageSrc: IMAGES.gcCapillaryColumnOven,
        accentColor: '#8E3742',
        explodedOffset: { dx: 0, dy: -30, dz: 40 }
      },
      {
        stepNumber: 4,
        partKey: 'gc_inlet_port',
        title: '4. Puerto Inyector Split/Splitless (Liner de Vidrio y Septum)',
        subsystem: 'Vaporización Flash (280 °C)',
        fastenersOrSeals: 'Sello inferior dorado + septum silicona de baja purga',
        whyThisOrder: 'Se monta sobre el techo del horno para recibir el extremo inicial del capilar desde abajo.',
        actionSummary: 'Desciende el bloque calefactor con liner desactivado y línea Split.',
        voiceScript: 'Paso cuatro: fijamos el puerto inyector Split-Splitless con su liner de vidrio desactivado y septum de silicona.',
        imageSrc: IMAGES.gcSplitlessAutosamplerInlet,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: -25, dy: 0, dz: 75 }
      },
      {
        stepNumber: 5,
        partKey: 'gc_capillary_col',
        title: '5. Columna Capilar de Sílice Fundida (30 m × 0.25 mm WCOT)',
        subsystem: 'Fase Estacionaria Capilar',
        fastenersOrSeals: 'Tuercas ranuradas + férulas Vespel/Grafito sin oxígeno',
        whyThisOrder: 'Se suspende en el centro del aire circulante conectando el inyector con la base del detector.',
        actionSummary: 'Entra la jaula metálica con la espiral de poliimida marrón de treinta metros.',
        voiceScript: 'Paso cinco: colgamos la columna capilar de sílice fundida de treinta metros dentro del horno conectando sus extremos sin fugas.',
        imageSrc: IMAGES.gcCapillaryColumnOven,
        accentColor: '#EFC4BF',
        explodedOffset: { dx: 10, dy: 15, dz: 70 }
      },
      {
        stepNumber: 6,
        partKey: 'gc_fid_detector',
        title: '6. Torre Detectora FID (Boquilla de Cuarzo, Llama H₂ y Colector)',
        subsystem: 'Quimio-Ionización de Llama',
        fastenersOrSeals: 'Aisladores de alúmina + suministro H₂/Aire/Makeup N₂',
        whyThisOrder: 'Recibe el efluente final directo de la columna debajo de la llama de hidrógeno.',
        actionSummary: 'Se monta la torre superior FID con su electrodo colector a +250 V.',
        voiceScript: 'Paso seis: instalamos la torre del detector de ionización de llama con boquilla de cuarzo y electrodo colector.',
        imageSrc: IMAGES.gcFidTcdDetector,
        accentColor: '#8E3742',
        explodedOffset: { dx: 45, dy: -15, dz: 85 }
      },
      {
        stepNumber: 7,
        partKey: 'gc_autosampler',
        title: '7. Torre Automuestreadora Líquida con Microjeringa de 10 µL',
        subsystem: 'Inyección Automatizada',
        fastenersOrSeals: 'Brazo guía alineado verticalmente sobre el septum',
        whyThisOrder: 'Garantiza inyección vertical sin doblar la microaguja en los cien milisegundos de disparo.',
        actionSummary: 'Encaja la torre de viales de 2 mL directamente sobre el inyector.',
        voiceScript: 'Paso siete: acoplamos la torre automuestreadora con microjeringa robotizada exactamente centrada sobre el inyector.',
        imageSrc: IMAGES.gcSplitlessAutosamplerInlet,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: -25, dy: 0, dz: 120 }
      },
      {
        stepNumber: 8,
        partKey: 'gc_gas_lines_panels',
        title: '8. Líneas Auxiliares H₂/Aire y Paneles Laterales de Chasis',
        subsystem: 'Integración Neumática & Carcasa',
        fastenersOrSeals: 'Líneas de cobre hacia el FID + paneles laterales aislados',
        whyThisOrder: 'Suministra combustible al FID y cierra el compartimento izquierdo de trampas y válvulas.',
        actionSummary: 'Se conectan las tuberías hacia el detector y los paneles laterales metálicos.',
        voiceScript: 'Paso ocho: tendemos las líneas de hidrógeno y aire hacia el detector y cerramos los paneles laterales del chasis.',
        imageSrc: IMAGES.gcCarrierEpcSupply,
        accentColor: '#1C3947',
        explodedOffset: { dx: 0, dy: 60, dz: 40 }
      },
      {
        stepNumber: 9,
        partKey: 'gc_top_bezel',
        title: '9. Cubierta Superior Protectora y Bisel Frontal de Control',
        subsystem: 'Envolvente Completa',
        fastenersOrSeals: 'Tapa superior aislada + panel frontal de estado neumático',
        whyThisOrder: 'Protege las zonas calientes a 300 °C de inyector y detector frente a contactos accidentales.',
        actionSummary: 'Desciende la cubierta superior rodeando el automuestreador y la torre FID.',
        voiceScript: 'Paso nueve: aseguramos la cubierta superior protectora alrededor del inyector y la chimenea del detector.',
        imageSrc: IMAGES.gcCutawayUltra3d,
        accentColor: '#A9C2D2',
        explodedOffset: { dx: 0, dy: 0, dz: 105 }
      },
      {
        stepNumber: 10,
        partKey: 'gc_door_chromatogram',
        title: '10. Puerta Térmica Cerrada, Ignición FID y Monitor Kováts',
        subsystem: 'Cierre Completo & Cromatograma',
        fastenersOrSeals: 'Pestillo térmico aislado + pantalla táctil pA/Kováts',
        whyThisOrder: 'Cierra el horno para estabilizar ±0.1 °C, enciende la llama H₂ y arranca el cromatograma.',
        actionSummary: 'Se cierra la puerta del horno, enciende la llama FID y aparece el cromatograma.',
        voiceScript: 'Paso diez: cerramos la puerta térmica del horno, encendemos la llama de hidrógeno y el cromatógrafo de gases queda armado y analizando.',
        imageSrc: IMAGES.gcCutawayUltra3d,
        accentColor: '#7C957D',
        explodedOffset: { dx: 80, dy: 0, dz: 55 }
      }
    ]
  }
};
