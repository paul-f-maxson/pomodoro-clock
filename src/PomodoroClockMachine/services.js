export default {
  tickTimer: (ctx, event) => callback => {
    // This will send the 'TICK' event to the parent every second
    const id = setInterval(() => callback('TICK'), 1000);

    // Perform cleanup
    return () => clearInterval(id);
  },
};
