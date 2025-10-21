// Declaração global mínima para o namespace JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    type Element = any;
    type ElementClass = any;
    type ElementAttributesProperty = any;
  }
}

export {};
