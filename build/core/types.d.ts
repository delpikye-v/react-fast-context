export type Listener = () => void;
export type StateUpdater<T> = (state: T) => void;
export type StateActionMap<S> = {
    [key: string]: (state: S, ...args: any[]) => void;
};
export type MergeMode = "shallow" | "replace" | "none";
export type MergePolicy<S extends object> = MergeMode | {
    [K in keyof S]?: MergeMode;
};
export type FastContextProps<S extends object, A extends StateActionMap<S> | undefined = undefined> = {
    state: S;
    actions?: A;
    merge?: MergePolicy<S>;
};
