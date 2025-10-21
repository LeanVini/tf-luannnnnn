// Shim local para fornecer declarações mínimas do React e runtime JSX quando
// o servidor TypeScript não estiver resolvendo @types/react corretamente.
declare module 'react' {
	export type FC<P = {}> = (props: P & { children?: any }) => any;
	export function useState<S>(initial: S): [S, (s: S | ((prev: S) => S)) => void];
	export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
	export type FormEvent<T = Element> = Event;
	export type ChangeEvent<T = Element> = Event & { target: T };
	const React: any;
	export default React;
	export namespace JSX {
		interface IntrinsicElements {
			[elemName: string]: any;
		}
		type Element = any;
	}
}

declare module 'react/jsx-runtime' {
	export function jsx(type: any, props: any): any;
	export function jsxs(type: any, props: any): any;
	export function jsxDEV(type: any, props: any): any;
}

declare module 'react/jsx-dev-runtime' {
	export function jsxDEV(type: any, props: any): any;
}

declare module 'react-dom/client' {
	export function createRoot(container: any): { render(el: any): void };
}
