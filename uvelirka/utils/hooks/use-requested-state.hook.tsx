import { useEffect, useState } from 'react';
import { getRequest } from '../axios.utils';

function noTransform<TData>(data: TData) {
  return data;
}

export function useRequestedState<TState>(
  {
    initialState,
    requestPath,
    transformRequestedState,
  }: {
    initialState: TState,
    requestPath: string,
    transformRequestedState?: (newState: TState) => TState
  },
): {
  state: TState,
  setState: (newState: TState) => void,
} {
  const [state, setState] = useState(initialState);
  const transform = transformRequestedState ?? noTransform;
  const requestNewState = async () => setState(transform(await getRequest<TState>(requestPath)));

  useEffect(() => {
    requestNewState();
  }, [requestPath]);

  return {
    state,
    setState,
  };
}