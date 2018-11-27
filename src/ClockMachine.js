import { Machine, actions } from 'xstate';
const { assign } = actions;

const incrementBoundCtxValueAction = (
  valueName,
  increment,
  min = NaN,
  max = NaN
) =>
  assign({
    [valueName]: ctx => {
      const newValue = ctx[valueName] + increment;
      return (newValue >= min || Number.isNaN(min)) &&
        (newValue <= max || Number.isNaN(max))
        ? newValue
        : ctx[valueName];
    },
  });

const assignCtxBool = (valueName, truthValue) =>
  assign({ [valueName]: truthValue });

function timerAtZero(ctx) {
  return ctx.time.getTime() <= 0;
}

const runningState = {
  id: 'Running',
  on: {},
  initial: 'Working',
  states: {
    hist: { type: 'history' },
    Working: {
      id: 'Working',
      states: {},
      onEntry: 'turnTickingOn',
      onExit: 'turnTickingOff',
      on: {
        // when TICK is recieved, perform the tickTimer action, moving to 'EndofWork' when the timer reaches zero
        '': { target: 'EndofWork', cond: 'timerAtZero' },
        TICK: {
          target: 'Working',
          actions: 'tickTimer',
        },
      },
    },
    EndofWork: {
      id: 'EndofWork',
      states: {},
      onEntry: 'turnRingingOn',
      onExit: 'turnRingingOff',
      on: {
        CONTINUE: {
          target: 'TakingBreak',
          actions: 'setTimerForBreak',
        },
        SNOOZE: {
          target: '#Snoozing',
          actions: 'setTimerForSnooze',
        },
      },
    },
    TakingBreak: {
      id: 'TakingBreak',
      states: {},
      onEntry: 'turnTickingOn',
      onExit: 'turnTickingOff',
      on: {
        // when TICK is recieved, perform the tickTimer action, moving to 'EndofBreak' when the timer reaches zero
        '': { target: 'EndofBreak', cond: 'timerAtZero' },
        TICK: {
          target: 'TakingBreak',
          actions: 'tickTimer',
        },
      },
    },
    EndofBreak: {
      id: 'EndofBreak',
      states: {},
      onEntry: 'turnRingingOn',
      onExit: 'turnRingingOff',
      on: {
        CONTINUE: {
          target: 'Working',
          actions: 'setTimerForWork',
        },
        SNOOZE: {
          target: '#Snoozing',
          actions: 'setTimerForSnooze',
        },
      },
    },
  },
};

const defaultContext = (function() {
  // IIFE
  const staticDefaults = {
    workMinutes: 25,
    breakMinutes: 5,
    snoozeMinutes: 3,
    ticking: false,
    ringing: false,
  };
  return {
    ...staticDefaults,
    // Dependent defaults
    time: (() => {
      // Set time to default workMinutes
      let tme = new Date(0);
      tme.setMinutes(staticDefaults.workMinutes);
      return tme;
    })(),
  };
})();

const machine = Machine(
  {
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
  },
  {
    actions: {
      resetContextToDefault: assign(defaultContext),
      turnTickingOn: assignCtxBool('ticking', true),
      turnTickingOff: assignCtxBool('ticking', false),
      turnRingingOn: assignCtxBool('ringing', true),
      turnRingingOff: assignCtxBool('ringing', false),
      setTimerToZero: assign({ time: new Date(0) }),
      setTimerForWork: assign({
        time: ctx => {
          let newTime = new Date(0);
          newTime.setMinutes(ctx.workMinutes);
          return newTime;
        },
      }),
      setTimerForBreak: assign({
        time: ctx => {
          let newTime = new Date(0);
          newTime.setMinutes(ctx.breakMinutes);
          return newTime;
        },
      }),
      setTimerForSnooze: assign({
        time: ctx => {
          let newTime = new Date(0);
          newTime.setMinutes(ctx.snoozeMinutes);
          return newTime;
        },
      }),
      tickTimer: assign({
        time: (ctx, event) => {
          const newTime = new Date(ctx.time - 1000);
          if (newTime.getTime() > 0) return newTime;
          else return new Date(0);
        },
      }),
      incWorkMins: incrementBoundCtxValueAction(
        'workMinutes',
        1,
        1
      ),
      decWorkMins: incrementBoundCtxValueAction(
        'workMinutes',
        -1,
        1
      ),
      incBreakMins: incrementBoundCtxValueAction(
        'breakMinutes',
        1,
        1
      ),
      decBreakMins: incrementBoundCtxValueAction(
        'breakMinutes',
        -1,
        1
      ),
    },
    guards: {
      timerAtZero,
    },
  }
);

export default machine;
