// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
export type BaseApi<T = unknown> = {
  code: number;
  message: string;
  data: T;
};

export type RequestParamsType<T = unknown> = Record<string, T>;

export interface FileResponse {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
}
