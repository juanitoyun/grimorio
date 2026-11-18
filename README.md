# ✨ Buxef — Zero to Genius

Biblioteca abierta y experimental para estudiar contenidos de la FCFM, creada sobre el repositorio **GRIMORIO**. Proyecto independiente, **no oficial** de la Universidad de Chile.

## Infraestructura

- **Astro 6 / TypeScript:** páginas estáticas generadas a partir de un catálogo central en `src/data/catalogo.ts`.
- **GitHub Pages:** `astro.config.mjs` configura la base `/grimorio/`. El workflow `deploy.yml` construye y publica desde `main` si GitHub Pages está configurado con **GitHub Actions**.
- **Catálogo:** Plan Común (selección inicial DIM/DFI) y trayectoria de Ingeniería Civil en Computación (DCC) de los semestres V–XI, separando **Licenciatura** y **Especialidad**.
- **Reproductores:** `GeniallyEmbed.astro` conserva su carga voluntaria. `QuartoDeck.astro` añade carga voluntaria de presentaciones Reveal.js, selección de capítulo, enlaces externos y vista inmersiva. El iframe se destruye al cerrar o cambiar de capítulo.
- **Sin cuentas, sin backend y sin tokens:** los reproductores insertan contenido público; el ejecutor Python vive en EYWA.

## Aula EYWA · CC3001

`/aula/CC3001/` muestra las **11 presentaciones Quarto** (00–10) del proyecto [EYWA](https://github.com/juanitoyun/eywa). Se pueden abrir desde la ficha de [CC3001](https://juanitoyun.github.io/grimorio/ramo/CC3001/) y desde cada unidad/`miniPack`.

La dirección pública prevista del visor es:
https://juanitoyun.github.io/grimorio/aula/CC3001/

Los iframes referencian el sitio independiente `https://juanitoyun.github.io/eywa/slides/*.html`. **Buxef no copia ni reproduce el código de EYWA**: lo presenta con permisos del navegador. Si EYWA no está publicado, cambia su URL, o el navegador bloquea la incrustación, se debe utilizar el botón **Abrir en EYWA**. No se afirma una comprobación visual externa de la publicación hasta probarla en un navegador.

Los capítulos **00–02** tienen laboratorios específicos; algunos capítulos posteriores todavía son síntesis didácticas en evolución. La cobertura de fuentes se puede consultar en [EYWA / coverage](https://juanitoyun.github.io/eywa/coverage/index.html).

## Fuente académica y alcance

Referencia: [Malla oficial DCC](https://dcc.uchile.cl/pregrado/malla/), publicada como **DU N°0046362, malla curricular 2019**. CC3001, CC3101, CC3501, etc., aparecen en la Licenciatura (V–VIII); la Especialidad figura en IX–XI.

Se incorporaron **19 asignaturas DCC con código CC** de la malla, incluyendo prácticas y trabajos de título. **No es una malla exhaustiva**: no se replicaron materias generales, electivos sin código específico ni el núcleo de gestión con códigos alternativos CC5601/CC5602. Los ramos sin materiales tienen fichas vacías en lugar de enlaces inventados. El listado no confirma la oferta actual de cada semestre.

## Ejecutar y validar

Se requiere **Node.js 24** (el workflow usa esa versión):

```bash
npm install
npm test
npm run dev
npm run build
```

Desarrollo local: `http://localhost:4321/grimorio/` (Astro muestra la URL efectiva).

Las pruebas validan que los 11 enlaces de Quarto están bien enumerados, que los códigos DCC no se duplicaron y que los componentes de reproducción y la navegación están conectados. GitHub Actions además comprueba que se generen la portada, el aula, el curso y las páginas de capítulos.

## Agregar un curso o presentación

Editar `src/data/catalogo.ts` (fuente única). Para agregar material Quarto, crear un `MiniPack` con `tipo: "quarto"`, un `id` único y una URL HTML pública. Para Genially, mantener `tipo: "genially"` o omitirlo.

Rutas generadas:
- `/ramo/<codigo>/`
- `/minipack/<id>/`
- `/aula/CC3001/` (sala de presentaciones disponible en el catálogo).

La interfaz solo instancia un iframe cuando la persona pulsa **Iniciar presentación**, evitando precargas de Pyodide y medios innecesarios. Al navegar entre capítulos se reinicia la instancia embebida (no se preserva automáticamente el estado Python).

## Independencia y créditos

Buxef y EYWA son iniciativas personales de aprendizaje. El listado de asignaturas se basa en información pública del DCC; su inclusión no implica patrocinio institucional. Los textos y recursos didácticos de EYWA tienen su propio historial y criterios de autoría.
