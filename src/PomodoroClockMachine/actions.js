import { actions as xstateActions } from 'xstate';
import { defaultContext } from './config/';
const { assign } = xstateActions;

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

const actions = {
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
};

export default actions;
