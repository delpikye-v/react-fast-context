import { MergeMode } from "./types";
export type Store<S> = {
    get(): S;
    set(updater: (s: S) => void): void;
    replace(next: S): void;
    batch(fn: () => void): void;
    transaction(fn: () => void): void;
    subscribe(listener: () => void): () => void;
};
export declare function createStore<S extends object>(initial: S, options?: {
    merge?: MergeMode;
}): Store<S>;
