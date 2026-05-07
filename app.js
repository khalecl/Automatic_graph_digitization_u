window.App = window.App || {};

window.App.app_js = (function() {
  let state = {
    uploadedImage: null,
    detectedLines: null,
    calibratedAxes: null,
    dataPoints: null,
    pointDensity: 'medium',
    graphStyle: 'line'
  };

  const modules = {};

  function init() {
    console.log('🚀 App core initialized');
  }

  function registerModule(name, module) {
    modules[name] = module;
    console.log(`✅ Module registered: ${name}`);
  }

  function getModule(name) {
    return modules[name];
  }

  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  function setState(key, value) {
    if (key in state) {
      state[key] = value;
      console.log(`State updated: ${key} =`, value);
      // You can dispatch events here later for better reactivity
    } else {
      console.warn(`Invalid state key: ${key}`);
    }
  }

  return {
    init,
    registerModule,
    getModule,
    getState,
    setState
  };
})();