import type { Store } from "./core/store";
import type { StateActionMap, FastContextProps, MergeMode } from "./core/types";
type BoundActions<S, A extends StateActionMap<S>> = {
    [K in keyof A]: (...args: Parameters<A[K]> extends [any, ...infer P] ? P : never) => void;
};
type ResolveActions<S, A> = A extends StateActionMap<S> ? BoundActions<S, A> : undefined;
type DerivedSelector<S> = <R>(selector: (s: S) => R, equality?: (a: R, b: R) => boolean) => {
    use(): R;
    value(): R;
    subscribe(callback: (value: R) => void): () => void;
};
type FastContextReturn<S, A> = {
    state(): S;
    set: Store<S>["set"];
    replace: Store<S>["replace"];
    batch: Store<S>["batch"];
    transaction: Store<S>["transaction"];
    subscribe: Store<S>["subscribe"];
    devtools: (callback: (info: {
        state: S;
    }) => void) => () => void;
    use: <T = S>(selector?: (state: S) => T) => T;
    computed: DerivedSelector<S>;
    select: DerivedSelector<S>;
    when: <R>(predicate: (state: S) => R, effect: (value: R, state: S) => void) => () => void;
    scope(state: S, options?: {
        merge?: MergeMode;
    }): FastContextReturn<S, A>;
    actions: ResolveActions<S, A>;
};
export declare function createFastContext<S extends object, A extends StateActionMap<S>>(props: FastContextProps<S, A>): FastContextReturn<S, A>;
export {};
