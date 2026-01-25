export type EqualityFn<T> = (a: T, b: T) => boolean;
export declare function createFastSelector<S>(getState: () => S, subscribe: (fn: () => void) => () => void): <R>(selector: (state: S) => R, isEqual?: EqualityFn<R>) => R;
