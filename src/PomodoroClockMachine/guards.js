const guards = {
  timerAtZero: ctx => ctx.time.getTime() <= 0,
};

export default guards;
