interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_HOST: string;
  readonly VITE_AccessToken: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}