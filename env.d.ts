/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV_TOOLS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
