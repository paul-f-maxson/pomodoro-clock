import defaultContext from './defaultContext';
import runningState from './runningState';

const config = {
  id: 'PomodoroClock',
  context: defaultContext,
  on: {
    INC_WORK_MINS: { actions: 'incWorkMins' },
    DEC_WORK_MINS: { actions: 'decWorkMins' },
    INC_BREAK_MINS: { actions: 'incBreakMins' },
    DEC_BREAK_MINS: { actions: 'decBreakMins' },
  },
  initial: 'Set',
  states: {
    Set: {
      id: 'Set',
      on: {
        RUN: {
          target: 'Running.Working',
          actions: 'setTimerForWork',
        },
      },
      onEntry: 'resetContextToDefault',
    },
    Paused: {
      id: 'Paused',
      on: { RESUME: 'Running.hist', RESET: 'Set' },
    },
    Snoozing: {
      id: 'Snoozing',
      invoke: 'tickTimer',
      states: {},
      on: {
        // when TICK is recieved, perform the tickTimer action, moving to 'Running.hist' when the timer reaches zero
        '': {
          target: 'Running.hist',
          cond: 'timerAtZero',
        },
        TICK: {
          target: 'Snoozing',
          actions: 'tickTimer',
        },
        CONTINUE: {
          target: 'Running.hist',
          actions: 'setTimerToZero',
        },
        RESET: 'Set',
        PAUSE: 'Paused',
      },
    },
    Running: runningState,
  },
};

export { defaultContext };
export default config;
