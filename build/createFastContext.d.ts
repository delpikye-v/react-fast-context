import { StateActionMap, FastContextProps } from "./core/types";
export declare function createFastContext<S extends object, A extends StateActionMap<S>>(props: FastContextProps<S, A>): {
    state: () => S;
    set: (state: import("./core/types").StateUpdater<S>) => void;
    replace: (next: S) => void;
    batch: (fn: () => void) => void;
    transaction: (fn: () => void) => void;
    use: <R>(selector: (state: S) => R, isEqual?: import("./react/fastSelector").EqualityFn<R>) => R;
    computed: <R>(selector: (s: S) => R, equality?: (a: R, b: R) => boolean) => {
        use: () => R;
        value: () => R;
    };
    scope: (state: S) => {
        state: () => S;
        set: (state: import("./core/types").StateUpdater<S>) => void;
        replace: (next: S) => void;
        batch: (fn: () => void) => void;
        transaction: (fn: () => void) => void;
        use: <R>(selector: (state: S) => R, isEqual?: import("./react/fastSelector").EqualityFn<R>) => R;
        computed: <R>(selector: (s: S) => R, equality?: (a: R, b: R) => boolean) => {
            use: () => R;
            value: () => R;
        };
        scope: any;
        subscribe: (fn: import("./core/types").Listener) => () => boolean;
        devtools: (cb: (info: {
            state: S;
        }) => void) => () => boolean;
        actions: A extends StateActionMap<S> ? { [K in keyof A]: (...args: Parameters<A[K]> extends [any, ...infer A_1] ? A_1 : never) => void; } : undefined;
    };
    subscribe: (fn: import("./core/types").Listener) => () => boolean;
    devtools: (cb: (info: {
        state: S;
    }) => void) => () => boolean;
    actions: A extends StateActionMap<S> ? { [K in keyof A]: (...args: Parameters<A[K]> extends [any, ...infer A_1] ? A_1 : never) => void; } : undefined;
};
