import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

// `next lint` (removed in Next 16) only scanned source dirs; `eslint .` scans everything,
// so exclude non-source scaffolding that isn't meant to typecheck.
const eslintConfig = [
  { ignores: ['.claude/**', '.claude-context/**', '.next/**', 'docs/**', '_docs_private/**'] },
  ...coreWebVitals,
  ...typescript,
  prettier,
];

export default eslintConfig;
