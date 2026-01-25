import type { Scope, IntentContext } from "intentx-core-z";
export type FastContextAdapter<T> = {
    get(): T;
    set(fn: (s: T) => void): void;
};
export type IntentRuntimeOptions = {
    emit: (type: string, payload?: any) => Promise<void>;
    signal?: AbortSignal;
};
export declare function bindFastContext<S>(context: FastContextAdapter<S>): <P = unknown>(payload: P, scope: Scope, options: IntentRuntimeOptions) => IntentContext<S, P>;
