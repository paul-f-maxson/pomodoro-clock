import React, { createContext } from 'react';

import { useMachine } from './';

const getMatch = (cond, { state, extstate }) => {
  // if cond is not specified, default to true
  if (cond === undefined) {
    return true;
  }

  if (typeof cond === 'function') {
    return cond({ state, extstate });
  }

  return cond;
};

const getNode = (
  match,
  props,
  component,
  render,
  children
) => {
  if (component) {
    return match
      ? React.createElement(component, props)
      : null;
  }

  if (render) {
    return match ? render(props) : null;
  }

  if (typeof children === 'function') {
    return children({
      ...props,
      match,
    });
  }

  return match ? children : null;
};

const getCond = (is, not, map) => {
  const stateTest = is || not;

  return stateTest
    ? map[typeof stateTest][is ? 'is' : 'not'](stateTest)
    : true;
};

const createReactMachine = xstateMachine => {
  const context = createContext();

  const Provider = () => {
    const machine = useMachine(xstateMachine);

    // avoid passing state object down
    const { state, context, service, send } = machine;

    return (
      <context.Provider
        {...this.props}
        value={{
          state,
          context,
          service,
          send,
        }}
      />
    );
  };

  const Machine = ({
    cond,
    component,
    render,
    children,
  }) => (
    <context.Consumer>
      {props =>
        getNode(
          getMatch(cond, props),
          props,
          component,
          render,
          children
        )
      }
    </context.Consumer>
  );

  const Activity = ({ is, not, ...propsRest }) => {
    const map = {
      function: {
        is: fn => ({ state }) =>
          !!(state && fn(state.activities)),
        not: fn => ({ state }) =>
          !(state && fn(state.activities)),
      },
      string: {
        is: str => ({ state }) =>
          !!(state && state.activities[str]),
        not: str => ({ state }) =>
          !(state && state.activities[str]),
      },
      // code relies on typeof [] === 'object'
      object: {
        is: arr => ({ state }) =>
          !!(
            state &&
            arr.some(str => !!state.activities[str])
          ),
        not: arr => ({ state }) =>
          !(
            state &&
            arr.some(str => !!state.activities[str])
          ),
      },
    };

    return (
      <Machine
        {...propsRest}
        cond={getCond(is, not, map)}
      />
    );
  };

  Machine.Provider = Provider;
  Machine.Activity = Activity;

  return Machine;
};

export default createReactMachine;
