import type Lenis from "lenis";

// Shared handle to the single Lenis instance (avoids a global Window type
// that clashes with the one lenis already declares).
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;