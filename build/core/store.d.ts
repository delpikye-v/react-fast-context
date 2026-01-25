import { Listener, StateUpdater } from "./types";
export declare function createStore<S extends object>(initial: S): {
    get: () => S;
    set: (state: StateUpdater<S>) => void;
    replace: (next: S) => void;
    batch: (fn: () => void) => void;
    transaction: (fn: () => void) => void;
    subscribe: (fn: Listener) => () => boolean;
};
