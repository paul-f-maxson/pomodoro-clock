import defaultContext from './defaultContext';
import runningState from './runningState';

const config = {
  id: 'PomodoroClock',
  context: defaultContext,
  on: {
    RUN: 'Running',
    PAUSE: 'Paused',
    RESUME: 'Running.hist',
    RESET: {
      target: 'Set',
      actions: 'resetContextToDefault',
    },
    INC_WORK_MINS: { actions: 'incWorkMins' },
    DEC_WORK_MINS: { actions: 'decWorkMins' },
    INC_BREAK_MINS: { actions: 'incBreakMins' },
    DEC_BREAK_MINS: { actions: 'decBreakMins' },
  },
  initial: 'Set',
  states: {
    Set: { id: 'Set' },
    Paused: { id: 'Paused' },
    Snoozing: {
      id: 'Snoozing',
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
      },
      onEntry: 'turnTickingOn',
      onExit: 'turnTickingOff',
    },
    Running: runningState,
  },
};

export { defaultContext };
export default config;
