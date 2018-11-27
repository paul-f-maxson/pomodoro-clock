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

const workTimeState = {
  id: 'WorkTime',
  on: { CONTINUE: '#EndofWork' },
  onEntry: 'setTimerForWork',
  initial: 'Working',
  states: {
    Working: {
      id: 'Working',
      states: {},
      on: {
        '': { target: 'EndofWork', cond: 'timerAtZero' },
        TICK: { target: 'Working', actions: 'tickTimer' },
      },
      onEntry: 'turnTickingOn',
      onExit: 'turnTickingOff',
    },
    EndofWork: {
      id: 'EndofWork',
      states: {},
      on: {
        CONTINUE: '#BreakTime',
        SNOOZE: '#SnoozingEndofWork',
      },
      onEntry: 'turnRingingOn',
      onExit: 'turnRingingOff',
    },
    SnoozingEndofWork: {
      id: 'SnoozingEndofWork',
      states: {},
      on: {
        '': { target: 'EndofWork', cond: 'timerAtZero' },
        TICK: {
          target: 'SnoozingEndofWork',
          actions: 'tickTimer',
        },
      },
      onEntry: 'turnTickingOn',
      onExit: 'turnTickingOff',
    },
  },
};

const breakTimeState = {
  id: 'BreakTime',
  on: { CONTINUE: '#EndofBreak' },
  onEntry: 'setTimerForBreak',
  initial: 'TakingBreak',
  states: {
    TakingBreak: {
      id: 'TakingBreak',
      states: {},
      on: {
        '': { target: 'EndofBreak', cond: 'timerAtZero' },
        TICK: {
          target: 'TakingBreak',
          actions: 'tickTimer',
        },
      },
      onEntry: 'turnTickingOn',
      onExit: 'turnTickingOff',
    },
    EndofBreak: {
      id: 'EndofBreak',
      states: {},
      on: {
        CONTINUE: '#WorkTime',
        SNOOZE: '#SnoozingEndofBreak',
      },
      onEntry: 'turnRingingOn',
      onExit: 'turnRingingOff',
    },
    SnoozingEndofBreak: {
      id: 'SnoozingEndofBreak',
      states: {},
      on: {
        '': { target: 'EndofBreak', cond: 'timerAtZero' },
        TICK: {
          target: 'SnoozingEndofBreak',
          actions: 'tickTimer',
        },
      },
      onEntry: 'turnTickingOn',
      onExit: 'turnTickingOff',
    },
  },
};

const runningState = {
  id: 'Running',
  initial: 'WorkTime',
  on: {},
  states: {
    WorkTime: workTimeState,
    BreakTime: breakTimeState,
  },
};

// State Outline
//
// PomodoroClock
//   RUN -> Running
//   RESET -> Set
//   Set*
//
//   Running
//     WorkTime*
//       CONTINUE -> EndofWork
//       EndofWork
//         CONTINUE -> BreakTime
//         SNOOZE -> SnoozingEndofWork
//       SnoozingEndofWork
//         CONTINUE -> EndofWork
//     BreakTime
//       CONTINUE -> EndofBreak
//       EndofBreak
//         CONTINUE -> WorkTime
//         SNOOZE -> SnoozingEndofBreak
//       SnoozingEndofBreak
//         CONTINUE -> EndofBreak

const machine = Machine(
  {
    id: 'PomodoroClock',
    context: {
      workMinutes: 25,
      breakMinutes: 5,
      snoozeMinutes: 3,
      time: (() => {
        const tme = new Date(0);
        tme.setMinutes(25);
        return tme;
      })(),
      ticking: false,
      ringing: false,
    },
    initial: 'Set',
    on: {
      RESET: '#Set',
      RUN: '#Running',
      INC_WORK_MINS: {
        actions: incrementBoundCtxValueAction(
          'workMinutes',
          1,
          1
        ),
      },
      DEC_WORK_MINS: {
        actions: incrementBoundCtxValueAction(
          'workMinutes',
          -1,
          1
        ),
      },
      INC_BREAK_MINS: {
        actions: incrementBoundCtxValueAction(
          'breakMinutes',
          1,
          1
        ),
      },
      DEC_BREAK_MINS: {
        actions: incrementBoundCtxValueAction(
          'breakMinutes',
          -1,
          1
        ),
      },
      TICK: { actions: 'tickTimer' },
    },
    states: {
      Set: { id: 'Set', states: {} },
      Paused: { id: 'Paused', states: {} },
      Running: runningState,
    },
  },
  {
    actions: {
      turnTickingOn: assignCtxBool('ticking', true),
      turnTickingOff: assignCtxBool('ticking', false),
      turnRingingOn: assignCtxBool('ringing', true),
      turnRingingOff: assignCtxBool('ringing', false),
      setTimerForWork: assign({
        time: ctx => {
          let newDate = new Date(0);
          newDate.setMinutes(ctx.workMinutes);
          return newDate;
        },
      }),
      setTimerForBreak: assign({
        time: ctx => {
          let newDate = new Date(0);
          newDate.setMinutes(ctx.breakMinutes);
          return newDate;
        },
      }),
      tickTimer: assign({
        time: (ctx, event) => {
          const newTime = new Date(ctx.time - 1000);
          if (newTime.getTime() > 0) return newTime;
          else return new Date(0);
        },
      }),
    },
    guards: {
      timerAtZero,
    },
  }
);

export default machine;
