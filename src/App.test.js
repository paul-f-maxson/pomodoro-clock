import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Machine } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';
// import App from './App';

import {
  machineBuilder as clockMachineBuilder,
  machineBuilderDeps as clockMachineBuilderDeps,
} from './PomodoroClockMachine';

import {
  useMachine,
  useService,
  makeSenders,
  useStateService,
  useContextService,
  useSenders,
} from './UseMachine';
//
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

test('hooks work', () => {
  const TestElem = () => {
    const machine = useMachine(
      clockMachineBuilder,
      clockMachineBuilderDeps
    );

    const service = useService(machine);

    useSenders(service.send);

    return <></>;
  };

  const div = document.createElement('div');
  ReactDOM.render(<TestElem />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('useContextService', () => {
  const machine = clockMachineBuilder();
  const onChangeCallback = jest.fn();

  const service = interpret(machine);
  service.init();
  service.onChange(onChangeCallback);

  service.send('INC_BREAK_MINS');

  service.stop();
  expect(onChangeCallback).toBeCalledTimes(1);
});

test('senders', () => {
  const machine = clockMachineBuilder();
  const onChangeCallback = jest.fn();

  const service = interpret(machine);
  service.init();
  service.onChange(onChangeCallback);

  const TestElem = () => {
    const senders = useSenders(service.send);
    senders.INC_BREAK_MINS();
    return <></>;
  };

  const div = document.createElement('div');
  ReactDOM.render(<TestElem />, div);
  ReactDOM.unmountComponentAtNode(div);

  service.stop();
  expect(
    onChangeCallback.mock.calls[0][0].breakMinutes
  ).toEqual(
    onChangeCallback.mock.calls[0][1].breakMinutes + 1
  );
});

test('multiple interpreters', () => {
  const testMachine = Machine({
    id: 'TestMachine',
    initial: 'Off',
    states: {
      On: { id: 'On', on: { TOGGLE: 'Off' } },
      Off: { id: 'Off', on: { TOGGLE: 'On' } },
    },
  });

  const spyA = jest.fn();
  const spyB = jest.fn();

  const service = interpret(testMachine);

  service.init();

  const makeTransitionCallback = spy => (
    newState,
    event
  ) => {
    spy(newState, event);
  };

  const transitionCallbackA = makeTransitionCallback(spyA);
  const transitionCallbackB = makeTransitionCallback(spyB);

  service.onTransition(transitionCallbackA);
  service.onTransition(transitionCallbackB);

  service.start();

  service.send('TOGGLE');
  service.send('TOGGLE');

  service.stop();

  expect(spyA.mock.calls).toEqual(spyB.mock.calls);
});

test('useContextService', () => {
  const machine = clockMachineBuilder();
  const contextRecorder = jest.fn();
  const onChangeCallback = jest.fn();

  const service = interpret(machine);

  service.onChange(onChangeCallback);
  service.start();

  const senders = makeSenders(service.send);

  const TestElem = () => {
    const { context } = useContextService(machine);

    contextRecorder(context);
    return <></>;
  };

  const div = document.createElement('div');

  // first expected call on render
  ReactDOM.render(<TestElem />, div);
  expect(contextRecorder).toBeCalledTimes(1);

  // second expected call on send
  senders.INC_BREAK_MINS();
  expect(contextRecorder).toBeCalledTimes(2);
  expect(onChangeCallback).toBeCalledTimes(1);

  ReactDOM.unmountComponentAtNode(div);
});
