# ✨Buxef - Zero to Genius✨

**🕹️ Gamifyⁱⁿᵍ FCFM**

Biblioteca independiente, abierta y experimental de miniPacks interactivos para explorar contenidos de la FCFM.

## Filosofía
- Sin registro, cuentas, puntuaciones ni desbloqueos.
- Organización navegable: Plan Común → año → semestre → ramo → unidad → miniPack.
- Modo oscuro y navegación libre.
- Presentaciones públicas incrustadas desde Genially; no se almacenan ZIP pesados en el repositorio.
- Un solo catálogo alimenta todas las páginas.

## Desarrollar localmente
Requiere Node.js 22.12+.

```sh
npm install
npm run dev
```

## Publicar
El workflow `.github/workflows/deploy.yml` prepara la publicación automática de GitHub Pages. En **Settings → Pages → Build and deployment → Source**, selecciona **GitHub Actions**.

Sitio previsto: https://juanitoyun.github.io/grimorio/

## Agregar contenido
Edita `src/data/catalogo.ts`: incorpora unidades y miniPacks al ramo correspondiente. Cada miniPack requiere un ID único y una URL pública de Genially (`enlace`).

Las rutas se generan automáticamente:
- `/ramo/MA1101/`
- `/minipack/<id>/`

Cada actualización de `main` volverá a construir el sitio.
