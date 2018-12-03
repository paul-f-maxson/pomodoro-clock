import { useState, useMemo, useEffect } from 'react';
import { interpret } from 'xstate/lib/interpreter';

export default (machineBuilder, machineBuilderDeps) => {
  const machine = useMemo(
    machineBuilder,
    machineBuilderDeps
  );

  const [state, setState] = useState(machine.initialState);
  const [context, setContext] = useState(machine.context);

  // Setup the service only once.
  const service = useMemo(() => {
    const service = interpret(machine);
    service.init();
    service.onTransition(state => setState(state));
    service.onChange(setContext);
    return service;
  }, []);

  // Stop the service when unmounting.
  useEffect(() => {
    return () => service.stop();
  }, []);

  return { state, context, service, send: service.send };
};
