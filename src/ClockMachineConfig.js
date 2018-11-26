// sketch.systems machine definition
//
// PomodoroClock
//   run -> Running
//   pause -> Paused
//   reset -> Set
//   Set*
//   Paused
//   Running
//     AlarmNotRinging
//       WorkTime*
//         work-time-over -> EndofWork
//       BreakTime
//         break-time-over -> EndofBreak
//       SnoozingEndofWork
//         resume -> BreakTime
//       SnoozingEndofBreak
//         resume -> WorkTime
//     AlarmRinging
//       EndofWork
//         switch -> BreakTime
//         snooze -> SnoozingEndofWork
//       EndofBreak
//         switch -> WorkTime
//         snooze -> SnoozingEndofBreak

const ClockMachineConfig = {
  id: 'PomodoroClock',
  states: {
    Set: { id: 'Set', states: {} },
    Paused: { id: 'Paused', states: {} },
    Running: { id: 'Running', states: {} },
  },
  initial: 'Set',
  on: {
    pause: 'Paused',
    reset: 'Set',
    run: 'Running',
  },
};

exports = ClockMachineConfig;
