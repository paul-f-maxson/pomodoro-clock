import { interpret } from 'xstate/lib/interpreter';
import clockMachine from './ClockMachine';

test('xstate initializes correctly', () => {
  expect(clockMachine.initialState.value).toBe('Set');
});

it('transitions from initial to Running', () => {
  const service = interpret(clockMachine).onTransition(
    current => {
      console.log(current.toStrings());
    }
  );
  service.start();
  const newState = service.send('RUN');
  expect(newState.toStrings()).toContain('Running');
  service.stop();
});

it('increments', () => {
  const service = interpret(clockMachine).onTransition(
    current => {
      console.log(current.toStrings());
    }
  );
  service.start();

  const newState = service.send('INC_WORK_MINS');
  expect(newState.context.workMinutes).toEqual(26);
  service.stop();
});
