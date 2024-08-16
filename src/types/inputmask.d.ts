declare module 'inputmask' {
    class Inputmask {
      constructor(mask: string);
      mask(element: HTMLInputElement): void;
    }
    export default Inputmask;
}