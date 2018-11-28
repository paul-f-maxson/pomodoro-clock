import { Machine } from 'xstate';
import actions from './actions';
import guards from './guards';
import config from './config/';

/*
 * The primary function of this Machine is to alternate between two main states, Working and TakingBreak, which represent the work and break states of a Pomodoro Clock. In these states (as well as the Snooze state, explanation below), the Machine decrements the time context by one second in response to TICK events. When the timer reaches zero, the machine advances to an intermediate state that triggers the alarm to ring, and then on to the other timer state when a CONTINUE event is recieved. The above states are all internal to the Running state.
 *
 * On the same hierarchical level as Running state are Set, Pause and Snooze states. From any of these states,
 * Set is the initial state and can be entered at any time in response to a RESET event. On entry into the Set state, context is returned to default settings. From Set, a RUN action will transfer into Running.Working and set the clock to the specified time.
 * In any substate of Running, a PAUSE event transitions the machine into the Pause state. On CONTINUE, the machine will return to the historical state.
 * If a SNOOZE event is recieved in one of the alarm states, the Snoozing state is entered. The Snooze state has the same functionality as Pause and also sets a timer, transfering back to the historical state (which can only be an alarm ringing state) when the timer runs out.
 *
 * Finally, [(INC),(DEC)]_[(WORK),(BREAK)]_MINS events can be sent to change the timer settings.
 */

const machine = Machine(config, {
  actions: actions,
  guards: guards,
});

export default machine;
