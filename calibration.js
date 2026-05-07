window.App = window.App || {};

window.App.calibration_js = (function() {
  let calibrationState = {
    points: [],
    axisValues: { x: { min: null, max: null }, y: { min: null, max: null } }
  };

  function setupCalibration() {
    document.addEventListener('DOMContentLoaded', function() {
      const calibrationContainer = document.getElementById('calibration-container');
      if (!calibrationContainer) return;

      // Create calibration UI elements
      calibrationContainer.innerHTML = `
        <div class="calibration-controls">
          <h3>Axis Calibration</h3>
          <div class="axis-inputs">
            <div class="axis-group">
              <label>X-Axis Min: <input type="number" id="x-min" placeholder="0"></label>
              <label>X-Axis Max: <input type="number" id="x-max" placeholder="100"></label>
            </div>
            <div class="axis-group">
              <label>Y-Axis Min: <input type="number" id="y-min" placeholder="0"></label>
              <label>Y-Axis Max: <input type="number" id="y-max" placeholder="100"></label>
            </div>
          </div>
          <button id="calibrate-btn">Calibrate Axes</button>
          <div class="calibration-instructions">
            <p>Click on the graph corners to define axis boundaries, then enter values above.</p>
          </div>
        </div>
      `;

      // Set up event listeners
      document.getElementById('calibrate-btn').addEventListener('click', function() {
        const xMin = parseFloat(document.getElementById('x-min').value);
        const xMax = parseFloat(document.getElementById('x-max').value);
        const yMin = parseFloat(document.getElementById('y-min').value);
        const yMax = parseFloat(document.getElementById('y-max').value);

        if (isNaN(xMin) || isNaN(xMax) || isNaN(yMin) || isNaN(yMax)) {
          alert('Please enter valid numbers for all axis values.');
          return;
        }

        calibrationState.axisValues = { x: { min: xMin, max: xMax }, y: { min: yMin, max: yMax } };
        window.App.graph_detector_js.updateCalibration(calibrationState);
      });

      // Handle point selection on graph
      const graphPreview = document.getElementById('graph-preview');
      if (graphPreview) {
        graphPreview.addEventListener('click', function(e) {
          const rect = graphPreview.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          calibrationState.points.push({ x, y });
          window.App.graph_detector_js.highlightCalibrationPoint(x, y);
        });
      }
    });
  }

  function calibrateAxes(points, axisValues) {
    if (!points || points.length === 0) {
      console.error('No calibration points provided');
      return false;
    }

    calibrationState.points = points;
    calibrationState.axisValues = axisValues || calibrationState.axisValues;

    // Update shared state
    window.App.app_js.updateState('calibratedAxes', calibrationState.axisValues);

    return true;
  }

  // Public API
  return {
    setupCalibration,
    calibrateAxes
  };
})();