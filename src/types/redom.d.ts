declare module 'redom' {
    export function el(tag: string, attributes?: any, ...children: any[]): HTMLElement;
    export function setChildren(element: HTMLElement, children: any[]): void;
  }