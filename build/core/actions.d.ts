import type { StateActionMap } from "./types";
type StripState<F> = F extends (state: any, ...args: infer Args) => void ? (...args: Args) => void : never;
type BindActionProps<A extends StateActionMap<any>> = {
    [K in keyof A]: StripState<A[K]>;
};
export declare function bindActions<S, A extends StateActionMap<S>>(actions: A, set: (fn: (s: S) => void) => void): BindActionProps<A>;
export {};
