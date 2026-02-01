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
export type FastContext<S, A> = {
    state(): S;
    get(): S;
    set: Store<S>["set"];
    replace: Store<S>["replace"];
    batch: Store<S>["batch"];
    transaction: Store<S>["transaction"];
    subscribe: Store<S>["subscribe"];
    update(fn: (state: S) => void): void;
    commit(fn: (state: S) => void): void;
    use: <T = S>(selector?: (state: S) => T) => T;
    computed: DerivedSelector<S>;
    select: DerivedSelector<S>;
    peek<T = S>(selector?: (state: S) => T): T;
    when: <R>(predicate: (state: S) => R, effect: (value: R, state: S) => void) => () => void;
    watch<R>(selector: (state: S) => R, effect: (value: R, prev: R | undefined) => void, equality?: (a: R, b: R) => boolean): () => void;
    scope(state: S, options?: {
        merge?: MergeMode;
    }): FastContext<S, A>;
    devtools: (callback: (info: {
        state: S;
    }) => void) => () => void;
    actions: ResolveActions<S, A>;
};
export declare function createFastContext<S extends object, A extends StateActionMap<S>>(props: FastContextProps<S, A>): FastContext<S, A>;
export {};
