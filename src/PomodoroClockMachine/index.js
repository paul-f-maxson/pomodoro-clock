import { Machine } from 'xstate';
import actions from './actions';
import guards from './guards';
import config from './config/';

const machine = Machine(config, {
  actions: actions,
  guards: guards,
});

export default machine;
