const defaultContext = (function() {
  // IIFE
  const staticDefaults = {
    workMinutes: 25,
    breakMinutes: 5,
    snoozeMinutes: 6,
    ringing: false,
  };
  return {
    ...staticDefaults,
    // Dependent defaults
    time: (() => {
      // Set time to default workMinutes
      let tme = new Date(0);
      tme.setMinutes(staticDefaults.workMinutes);
      return tme;
    })(),
  };
})();

export default defaultContext;
