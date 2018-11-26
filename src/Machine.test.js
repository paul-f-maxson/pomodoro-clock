import clockMachine from './ClockMachine';
import { interpret } from 'xstate/lib/interpreter';

test('xstate initializes correctly', () => {
  expect(clockMachine.initialState.value).toBe('Set');
});

it('transitions from initial to paused', () => {
  const service = interpret(clockMachine).onTransition(
    current => {
      console.log(current.toStrings());
    }
  );
  service.start();
  const newState = service.send('PAUSE');
  expect(newState.matches('Paused')).toBe(true);
  service.stop();
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
