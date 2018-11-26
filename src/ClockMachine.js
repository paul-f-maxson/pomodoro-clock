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

const alarmRingingState = {
  id: 'AlarmRinging',
  activities: ['ringing'],
  states: {
    EndofWork: {
      id: 'EndofWork',
      states: {},
      on: {
        snooze: '#SnoozingEndofWork',
        switch: '#BreakTime',
      },
    },
    EndofBreak: {
      id: 'EndofBreak',
      states: {},
      on: {
        snooze: '#SnoozingEndofBreak',
        switch: '#WorkTime',
      },
    },
  },
  initial: 'EndofWork',
  on: {},
};

const alarmNotRingingState = {
  id: 'AlarmNotRinging',
  states: {
    WorkTime: {
      id: 'WorkTime',
      states: {},
      on: { 'work-time-over': '#EndofWork' },
    },
    BreakTime: {
      id: 'BreakTime',
      states: {},
      on: { 'break-time-over': '#EndofBreak' },
    },
    SnoozingEndofWork: {
      id: 'SnoozingEndofWork',
      states: {},
      on: { resume: '#BreakTime' },
    },
    SnoozingEndofBreak: {
      id: 'SnoozingEndofBreak',
      states: {},
      on: { resume: '#WorkTime' },
    },
  },
  initial: 'WorkTime',
  on: {},
};

const runningState = {
  id: 'Running',
  states: {
    AlarmNotRinging: alarmNotRingingState,
    AlarmRinging: alarmRingingState,
  },
  initial: 'AlarmNotRinging',
  on: {},
};

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
