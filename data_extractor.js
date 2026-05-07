window.App = window.App || {};

window.App.data_extractor_js = (function() {
    let dataPoints = [];
    let pointDensity = 100;

    function extractDataPoints(density) {
        pointDensity = density || 100;
        const axes = window.App.calibration_js.getCalibratedAxes();
        const lines = window.App.app_js.getDetectedLines();
        
        if (!axes || !lines || lines.length === 0) {
            console.warn("No calibrated axes or detected lines available.");
            dataPoints = [];
            return;
        }

        dataPoints = [];
        const xAxis = axes.xAxis;
        const yAxis = axes.yAxis;

        lines.forEach(line => {
            const linePoints = [];
            const step = 100 / pointDensity;

            for (let percent = 0; percent <= 100; percent += step) {
                const x = xAxis.min + (xAxis.max - xAxis.min) * (percent / 100);
                const y = yAxis.min + (yAxis.max - yAxis.min) * (percent / 100);
                linePoints.push({ x, y });
            }

            dataPoints.push(linePoints);
        });
    }

    function getDataPoints() {
        return dataPoints;
    }

    return {
        extractDataPoints,
        getDataPoints
    };
})();