import { useState, useMemo, useEffect } from 'react';
import { interpret } from 'xstate/lib/interpreter';
import LogRocket from 'logrocket';

// Create, initialize, and return an xstate machine service
export const useMachine = machine => {
  const service = useMemo(() => interpret(machine), [machine]);

  service.onTransition((newState, event) => {
    if (event.type !== 'TICK') {
      LogRocket.info({
        desc: 'Machine state change',
        data: {
          event: event,
          new: { newState, stateStrings: newState.toStrings() },
        },
      });
    }
  });

  service.init();

  useEffect(() => () => service.stop());

  return service;
};

// TODO: Caller can pass an object of keys for the specific part of context or state they care about

export const useServiceForContext = (service, init) => {
  const [context, setContext] = useState(init);

  service.onChange(setContext);

  return context;
};

// TODO: completely exclude context from the state object
export const useServiceForState = (service, init) => {
  const [state, setState] = useState(init);

  service.onTransition(setState);

  return state;
};
