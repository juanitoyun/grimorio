import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const catalogo = read("src/data/catalogo.ts");
const routes = read("src/lib/rutas.ts");
const viewer = read("src/components/QuartoDeck.astro");
const aula = read("src/pages/aula/[codigo].astro");
const pack = read("src/pages/minipack/[id].astro");

test("Los 11 decks EYWA están enumerados sin huecos y enlazados a Quarto", () => {
  const slides = [...catalogo.matchAll(/id: "cc3001-(\d{2})"[^\n]*enlace: EYWA \+ "([^"]+)"/g)];
  assert.equal(slides.length, 11);
  for (let i = 0; i <= 10; i++) {
    const [_, id, filename] = slides[i];
    assert.equal(id, String(i).padStart(2, "0"));
    assert.ok(filename.endsWith(".html"), filename);
    assert.ok(!filename.includes(".."), filename);
  }
  assert.match(catalogo, /https:\/\/juanitoyun\.github\.io\/eywa\/slides\//);
  assert.match(catalogo, /tipo: "quarto"/);
});

test("Catálogo DCC con códigos únicos y etapas académicas diferenciadas", () => {
  const dcc = [...catalogo.matchAll(/ramo\("(CC\d{4})",/g)].map(m => m[1]);
  assert.equal(dcc.length, 19);
  assert.equal(new Set(dcc).size, dcc.length);
  for (const codigo of ["CC3001", "CC3101", "CC4102", "CC5402", "CC6919"])
    assert.ok(dcc.includes(codigo), codigo);
  assert.match(catalogo, /Computación · Licenciatura/);
  assert.match(catalogo, /Computación · Especialidad/);
});

test("Iframe bajo demanda, cierre y modo inmersivo sin afectar Genially", () => {
  assert.match(viewer, /createElement\("iframe"\)/);
  assert.match(viewer, /addEventListener\("click", load\)/);
  assert.match(viewer, /frameHost\?\.replaceChildren\(\)/);
  assert.match(viewer, /requestFullscreen/);
  assert.match(viewer, /data-quarto-external/);
  assert.match(viewer, /data-sync-hash/);
  assert.match(pack, /QuartoDeck diapositivas=\{\[pack\]\}/);
  assert.match(pack, /GeniallyEmbed/);
});

test("Rutas GitHub Pages bajo /grimorio y sala de CC3001", () => {
  assert.match(routes, /import\.meta\.env\.BASE_URL/);
  assert.match(routes, /export const aulaUrl/);
  assert.match(aula, /sincronizarHash/);
  assert.match(aula, /getStaticPaths/);
  assert.ok(existsSync(new URL("../src/pages/ramo/[codigo].astro", import.meta.url)));
});

test("Modo Código HD abre únicamente el laboratorio de la diapositiva activa", () => {
  assert.match(viewer, /data-quarto-code/);
  assert.match(viewer, /data-quarto-code-overlay/);
  assert.match(viewer, /getCurrentSlide/);
  assert.match(viewer, /slideUrl\.origin !== window\.location\.origin/);
  assert.match(viewer, /labUrl\.origin === slideUrl\.origin/);
  assert.match(viewer, /labUrl\.pathname\.startsWith\(labPrefix\)/);
  assert.match(viewer, /labUrl\.protocol === "https:"/);
  assert.match(viewer, /codeHost\.appendChild\(iframe\)/);
  assert.match(viewer, /codeOverlay\.hidden = false/);
  assert.match(viewer, /codeOverlay\.hidden = true/);
  assert.match(viewer, /codeFontSize = Math\.min\(24/);
  assert.match(viewer, /codeFontSize = Math\.max\(13/);
  assert.match(viewer, /fontSize:\s*16|let codeFontSize = 16/);
  assert.match(viewer, /codeExternal\.href = lab/);
  assert.match(viewer, /resetCode\(\)/);
  const styles = read("src/styles/global.css");
  assert.match(styles, /\.q-code-overlay\{/);
  assert.match(styles, /height:100dvh/);
  assert.match(styles, /\.q-code-body iframe\{/);
});
