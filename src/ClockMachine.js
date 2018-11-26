import { Machine, actions } from 'xstate';
const { assign } = actions;

// const tick = assign({
//   time: (ctx, event) => new Date(ctx.time - 1000),
// });
//

const incrementCtxValueAction = (valueName, increment) =>
  assign({
    [valueName]: ctx => ctx[valueName] + increment,
  });

const runningState = {
  id: 'Running',
  states: {
    WorkTime: {
      id: 'WorkTime',
      states: {},
      on: { CONTINUE: '#EndofWork' },
    },
    EndofWork: {
      id: 'EndofWork',
      states: {},
      on: {
        CONTINUE: '#BreakTime',
        SNOOZE: '#SnoozingEndofWork',
      },
    },
    SnoozingEndofWork: {
      id: 'SnoozingEndofWork',
      states: {},
      on: { CONTINUE: '#BreakTime' },
    },
    BreakTime: {
      id: 'BreakTime',
      states: {},
      on: { CONTINUE: '#EndofBreak' },
    },
    EndofBreak: {
      id: 'EndofBreak',
      states: {},
      on: {
        CONTINUE: '#WorkTime',
        SNOOZE: '#SnoozingEndofBreak',
      },
    },
    SnoozingEndofBreak: {
      id: 'SnoozingEndofBreak',
      states: {},
      on: { CONTINUE: '#WorkTime' },
    },
  },
  initial: 'WorkTime',
  on: {},
};

// State Outline
//
// PomodoroClock
//   run -> Running
//   reset -> Set
//   Set*
//
//   Running
//     WorkTime*
//       CONTINUE -> EndofWork
//     EndofWork
//       CONTINUE -> BreakTime
//       SNOOZE -> SnoozingEndofWork
//     SnoozingEndofWork
//       CONTINUE -> BreakTime
//     BreakTime
//       CONTINUE -> EndofBreak
//     EndofBreak
//       CONTINUE -> WorkTime
//       SNOOZE -> SnoozingEndofBreak
//     SnoozingEndofBreak
//       CONTINUE -> WorkTime

const machine = Machine({
  id: 'PomodoroClock',
  context: {
    workMinutes: 25,
    breakMinutes: 5,
    snoozeMinutes: 3,
    time: new Date(0),
  },
  states: {
    Set: { id: 'Set', states: {} },
    Paused: { id: 'Paused', states: {} },
    Running: runningState,
  },
  initial: 'Set',
  on: {
    PAUSE: '#Paused',
    RESET: '#Set',
    RUN: '#Running',
    INC_WORK_MINS: {
      actions: incrementCtxValueAction('workMinutes', 1),
    },
    DEC_WORK_MINS: {
      actions: incrementCtxValueAction('workMinutes', -1),
    },
    INC_BREAK_MINS: {
      actions: incrementCtxValueAction('breakMinutes', 1),
    },
    DEC_BREAK_MINS: {
      actions: incrementCtxValueAction('breakMinutes', -1),
    },
  },
});

export default machine;
