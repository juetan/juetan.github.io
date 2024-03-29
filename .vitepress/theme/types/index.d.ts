/// <reference types="vite/client" />

declare interface Window {
  __WORD_COUNT__: number;
}

/**
 * 站点最后修改时间
 */
declare const __APP_LAST_MODIFIED__: string;

interface ImportMetaEnv {
  /**
   * 站点创建时间
   */
  readonly VITE_APP_FOUNDED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
