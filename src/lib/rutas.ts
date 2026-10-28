const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
export const inicio = () => base;
export const ramoUrl = (codigo: string) => base + "ramo/" + encodeURIComponent(codigo) + "/";
export const miniPackUrl = (id: string) => base + "minipack/" + encodeURIComponent(id) + "/";
