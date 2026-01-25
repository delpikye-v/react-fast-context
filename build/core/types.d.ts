export type Listener = () => void;
export type StateUpdater<T> = (state: T) => void;
export type StateActionMap<S> = {
    [key: string]: (state: S, ...args: any[]) => void;
};
export type FastContextProps<S extends object, A extends StateActionMap<S> | undefined = undefined> = {
    state: S;
    actions?: A;
};
