declare const env: {
  NODE_ENV: 'production' | 'development';
};

declare module 'react-quill-image-uploader' {
  export function fn(): any;
  export function saveImageSrc(): any;
}
