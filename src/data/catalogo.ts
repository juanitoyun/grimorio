/** Fuente única de navegación. Malla de referencia: DCC FCFM (DU N°0046362, 2019).
 * https://dcc.uchile.cl/pregrado/malla/
 * El catálogo es informativo: no certifica la oferta semestral vigente.
 */
export type Departamento = "DIM" | "DFI" | "DCC";
export type Etapa = "Plan Común" | "Licenciatura" | "Especialidad";
export interface MiniPack {
  id: string;
  titulo: string;
  enlace: string;
  descripcion?: string;
  tipo?: "genially" | "quarto";
}
export interface Unidad {
  nombre: string;
  minipacks: MiniPack[];
}
export interface Ramo {
  codigo: string;
  nombre: string;
  departamento: Departamento;
  etapa: Etapa;
  creditos?: number;
  unidades: Unidad[];
}
interface Semestre {
  nombre: string;
  ramos: Ramo[];
}
interface Anio {
  nombre: string;
  semestres: Semestre[];
}
interface Plan {
  nombre: string;
  anios: Anio[];
}
const ramo = (
  codigo: string, nombre: string, departamento: Departamento,
  creditos?: number, etapa: Etapa = "Plan Común"
): Ramo => ({ codigo, nombre, departamento, creditos, etapa, unidades: [] });

const EYWA = "https://juanitoyun.github.io/eywa/slides/";
/** 11 capítulos EYWA (00 a 10) y simulacro práctico C2. */
export const eywaSlides: MiniPack[] = [
  { id: "cc3001-00", titulo: "Herramientas visuales", descripcion: "Arreglos, listas y árboles con Python.", tipo: "quarto", enlace: EYWA + "00-herramientas-visuales.html" },
  { id: "cc3001-01", titulo: "Introducción", descripcion: "Python, invariantes y recursividad.", tipo: "quarto", enlace: EYWA + "01-introduccion.html" },
  { id: "cc3001-02", titulo: "Análisis matemático", descripcion: "Cotas asintóticas y recurrencias.", tipo: "quarto", enlace: EYWA + "02-analisis-matematico.html" },
  { id: "cc3001-03", titulo: "Diseño eficiente", descripcion: "Dividir para reinar y estrategias de diseño.", tipo: "quarto", enlace: EYWA + "03-diseno-eficiente.html" },
  { id: "cc3001-04", titulo: "Estructuras elementales", descripcion: "Arreglos y listas enlazadas.", tipo: "quarto", enlace: EYWA + "04-estructuras-elementales.html" },
  { id: "cc3001-05", titulo: "Pilas, colas y prioridad", descripcion: "TDAs lineales y heaps.", tipo: "quarto", enlace: EYWA + "05-pilas-colas-prioridad.html" },
  { id: "cc3001-06", titulo: "Diccionarios", descripcion: "Tablas hash y árboles de búsqueda.", tipo: "quarto", enlace: EYWA + "06-diccionarios.html" },
  { id: "cc3001-07", titulo: "Ordenación", descripcion: "Algoritmos de ordenación y sus costos.", tipo: "quarto", enlace: EYWA + "07-ordenacion.html" },
  { id: "cc3001-08", titulo: "Búsqueda en texto", descripcion: "Coincidencia de patrones y KMP.", tipo: "quarto", enlace: EYWA + "08-busqueda-texto.html" },
  { id: "cc3001-09", titulo: "Compresión de datos", descripcion: "Codificación y compresión.", tipo: "quarto", enlace: EYWA + "09-compresion.html" },
  { id: "cc3001-10", titulo: "Grafos", descripcion: "BFS, DFS y caminos óptimos.", tipo: "quarto", enlace: EYWA + "10-grafos.html" },
  { id: "cc3001-c2", titulo: "Práctica Control 2", descripcion: "9 problemas Python con autocorrección y trazas interactivas.", tipo: "quarto", enlace: EYWA + "c2-practica.html" }
];

const algoritmos: Ramo = {
  ...ramo("CC3001", "Algoritmos y Estructuras de Datos", "DCC", 6, "Licenciatura"),
  unidades: [
    { nombre: "01 · Fundamentos y análisis", minipacks: eywaSlides.slice(0, 3) },
    { nombre: "02 · Diseño y estructuras", minipacks: eywaSlides.slice(3, 6) },
    { nombre: "03 · Diccionarios y búsqueda", minipacks: eywaSlides.slice(6, 9) },
    { nombre: "04 · Compresión y grafos", minipacks: eywaSlides.slice(9, 11) },
    { nombre: "05 · Preparación de controles", minipacks: eywaSlides.slice(11) }
  ]
};

export const catalogo: Plan[] = [
  {
    nombre: "Plan Común",
    anios: [
      {
        nombre: "Primer año",
        semestres: [
          { nombre: "1er semestre", ramos: [
            ramo("MA1001", "Intro. al Cálculo", "DIM"),
            ramo("MA1101", "Intro. al Álgebra", "DIM"),
            ramo("FI1000", "Intro. a la Física Clásica", "DFI")
          ]},
          { nombre: "2do semestre", ramos: [
            ramo("MA1002", "Cálculo Diferencial e Integral", "DIM"),
            ramo("MA1102", "Álgebra Lineal", "DIM"),
            ramo("FI1100", "Intro. a la Física Moderna", "DFI")
          ]}
        ]
      },
      {
        nombre: "Segundo año",
        semestres: [
          { nombre: "3er semestre", ramos: [
            ramo("MA2001", "Cálculo en Varias Variables", "DIM"),
            ramo("MA2601", "Ecuaciones Diferenciales Ordinarias", "DIM"),
            ramo("FI2001", "Mecánica", "DFI"),
            ramo("FI2003", "Métodos Experimentales", "DFI")
          ]},
          { nombre: "4to semestre", ramos: [
            ramo("MA2002", "Cálculo Avanzado y Aplicaciones", "DIM"),
            ramo("FI2002", "Electromagnetismo", "DFI"),
            ramo("FI2004", "Termodinámica", "DFI")
          ]}
        ]
      }
    ]
  },
  {
    nombre: "Computación · Licenciatura",
    anios: [
      {
        nombre: "Tercer año",
        semestres: [
          { nombre: "5to semestre", ramos: [
            algoritmos,
            ramo("CC3101", "Matemáticas Discretas para la Computación", "DCC", 6, "Licenciatura"),
            ramo("CC3501", "Modelación y Computación Gráfica para Ingenieros", "DCC", 6, "Licenciatura")
          ]},
          { nombre: "6to semestre", ramos: [
            ramo("CC3002", "Metodologías de Diseño y Programación", "DCC", 6, "Licenciatura"),
            ramo("CC3102", "Teoría de la Computación", "DCC", 6, "Licenciatura"),
            ramo("CC3201", "Bases de Datos", "DCC", 6, "Licenciatura"),
            ramo("CC3301", "Programación de Software de Sistemas", "DCC", 6, "Licenciatura")
          ]}
        ]
      },
      {
        nombre: "Cuarto año",
        semestres: [
          { nombre: "7mo semestre", ramos: [
            ramo("CC4102", "Diseño y Análisis de Algoritmos", "DCC", 6, "Licenciatura"),
            ramo("CC4302", "Sistemas Operativos", "DCC", 6, "Licenciatura"),
            ramo("CC4401", "Ingeniería de Software", "DCC", 6, "Licenciatura"),
            ramo("CC5205", "Minería de Datos", "DCC", 6, "Licenciatura"),
            ramo("CC4901", "Práctica Profesional I", "DCC", 7, "Licenciatura")
          ]},
          { nombre: "8vo semestre", ramos: [
            ramo("CC4101", "Lenguajes de Programación", "DCC", 6, "Licenciatura"),
            ramo("CC4303", "Redes", "DCC", 6, "Licenciatura"),
            ramo("CC4402", "Formulación, Evaluación y Gestión de Proyectos", "DCC", 6, "Licenciatura")
          ]}
        ]
      }
    ]
  },
  {
    nombre: "Computación · Especialidad",
    anios: [
      {
        nombre: "Quinto año",
        semestres: [
          { nombre: "9no semestre", ramos: [
            ramo("CC5901", "Práctica Profesional II", "DCC", 7, "Especialidad")
          ]},
          { nombre: "10mo semestre", ramos: [
            ramo("CC5402", "Proyecto de Software", "DCC", 12, "Especialidad"),
            ramo("CC6907", "Introducción al Trabajo de Título", "DCC", 6, "Especialidad")
          ]}
        ]
      },
      {
        nombre: "Sexto año",
        semestres: [
          { nombre: "11vo semestre", ramos: [
            ramo("CC6919", "Trabajo de Título", "DCC", 24, "Especialidad")
          ]}
        ]
      }
    ]
  }
];

export const ramos = catalogo.flatMap(plan =>
  plan.anios.flatMap(anio => anio.semestres.flatMap(semestre => semestre.ramos))
);

export const miniPacks = ramos.flatMap(ramo =>
  ramo.unidades.flatMap(unidad =>
    unidad.minipacks.map(pack => ({ ...pack, ramo, unidad }))
  )
);
