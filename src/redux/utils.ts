import { Action } from 'redux';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

type ActionHandlers<S> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (state: S, action: any) => S;
};

export const createReducer = <TState>(
  initialState: TState,
  handlers: ActionHandlers<TState>,
) => {
  return (state: TState, action: Action) => {
    state ??= initialState;
    const handler = handlers[action.type];

    return handler?.(state, action) ?? state;
  };
};
