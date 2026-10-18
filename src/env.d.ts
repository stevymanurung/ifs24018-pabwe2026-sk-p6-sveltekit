/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_DELCOM_BASEURL: string;
  readonly VITE_DELCOM_API_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
