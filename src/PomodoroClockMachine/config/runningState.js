const runningState = {
  id: 'Running',
  on: { PAUSE: 'Paused', RESET: 'Set' },
  initial: 'Working',
  invoke: {
    id: 'tickTimer',
    src: (ctx, event) => callback => {
      // This will send the 'TICK' event to the parent every second
      const id = setInterval(() => callback('TICK'), 1000);

      // Perform cleanup
      return () => clearInterval(id);
    },
  },
  states: {
    hist: { type: 'history' },
    Working: {
      id: 'Working',
      states: {},
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

export default runningState;
