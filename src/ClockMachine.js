import { Machine, actions } from 'xstate';
const { assign } = actions;

const incrementCtxValueAction = (valueName, increment) =>
  assign({
    [valueName]: ctx => ctx[valueName] + increment,
  });

const assignCtxBool = (valueName, truthValue) =>
  assign({ [valueName]: truthValue });

const workTimeState = {
  id: 'WorkTime',
  on: { CONTINUE: '#EndofWork' },
  onEntry: 'setTimerForWork',
  initial: 'Working',
  states: {
    Working: {
      id: 'Working',
      states: {},
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
      on: { CONTINUE: '#EndofWork' },
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
      on: { CONTINUE: '#EndofBreak' },
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
      time: new Date(0),
      ticking: false,
      ringing: false,
    },
    initial: 'Set',
    on: {
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
        actions: incrementCtxValueAction(
          'breakMinutes',
          -1
        ),
      },
      TICK: {
        actions: assign({
          time: (ctx, event) => new Date(ctx.time - 1000),
        }),
      },
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
    },
  }
);

export default machine;
