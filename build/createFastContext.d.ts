import type { Store } from "./core/store";
import type { StateActionMap, FastContextProps } from "./core/types";
type BoundActions<S, A extends StateActionMap<S>> = {
    [K in keyof A]: (...args: Parameters<A[K]> extends [any, ...infer P] ? P : never) => void;
};
type ResolveActions<S, A> = A extends StateActionMap<S> ? BoundActions<S, A> : undefined;
type ComputedApi<S> = <R>(selector: (s: S) => R, equality?: (a: R, b: R) => boolean) => {
    use(): R;
    value(): R;
};
type FastContextReturn<S, A> = {
    state(): S;
    set: Store<S>["set"];
    replace: Store<S>["replace"];
    batch: Store<S>["batch"];
    transaction: Store<S>["transaction"];
    subscribe: Store<S>["subscribe"];
    devtools: (cb: (info: {
        state: S;
    }) => void) => () => void;
    use: <T = S>(selector?: (state: S) => T) => T;
    computed: ComputedApi<S>;
    scope(state: S): FastContextReturn<S, A>;
    actions: ResolveActions<S, A>;
};
export declare function createFastContext<S extends object, A extends StateActionMap<S>>(props: FastContextProps<S, A>): FastContextReturn<S, A>;
export {};
