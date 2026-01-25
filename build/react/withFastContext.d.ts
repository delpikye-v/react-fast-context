import type { Scope, IntentContext } from "intentx-core-z";
export type FastContextLike<T> = {
    get(): T;
    set(fn: (s: T) => void): void;
};
type GetContextOptions = {
    emit: (type: string, payload?: any) => Promise<void>;
    signal?: AbortSignal;
};
export declare function withFastContext<TState>(context: FastContextLike<TState>): <P = any>(payload: P, scope: Scope, options: GetContextOptions) => IntentContext<TState, P>;
export {};
