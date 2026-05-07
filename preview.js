window.App = window.App || {};

window.App.preview_js = (function() {
  let canvas = null;
  let ctx = null;
  let data = [];
  let style = 'line';

  function initCanvas() {
    const container = document.getElementById('preview-container');
    if (!container) return;

    canvas = document.createElement('canvas');
    canvas.id = 'preview-canvas';
    container.innerHTML = '';
    container.appendChild(canvas);

    ctx = canvas.getContext('2d');
    resizeCanvas();
  }

  function resizeCanvas() {
    if (!canvas) return;

    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawPreview();
  }

  function drawLine() {
    if (!ctx || data.length === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const margin = 40;
    const width = canvas.width - 2 * margin;
    const height = canvas.height - 2 * margin;

    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    const yMin = Math.min(...data.map(d => d.y));
    const yMax = Math.max(...data.map(d => d.y));

    data.forEach((point, i) => {
      const x = margin + (point.x - xMin) / (xMax - xMin) * width;
      const y = canvas.height - margin - (point.y - yMin) / (yMax - yMin) * height;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }

  function drawBar() {
    if (!ctx || data.length === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4a90e2';

    const margin = 40;
    const width = canvas.width - 2 * margin;
    const height = canvas.height - 2 * margin;

    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    const yMin = Math.min(...data.map(d => d.y));
    const yMax = Math.max(...data.map(d => d.y));

    const barWidth = width / data.length * 0.8;

    data.forEach((point, i) => {
      const x = margin + i * (width / data.length);
      const barHeight = (point.y - yMin) / (yMax - yMin) * height;
      const y = canvas.height - margin - barHeight;

      ctx.fillRect(x, y, barWidth, barHeight);
    });
  }

  function drawScatter() {
    if (!ctx || data.length === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4a90e2';

    const margin = 40;
    const width = canvas.width - 2 * margin;
    const height = canvas.height - 2 * margin;

    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    const yMin = Math.min(...data.map(d => d.y));
    const yMax = Math.max(...data.map(d => d.y));

    data.forEach(point => {
      const x = margin + (point.x - xMin) / (xMax - xMin) * width;
      const y = canvas.height - margin - (point.y - yMin) / (yMax - yMin) * height;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawArea() {
    if (!ctx || data.length === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(74, 144, 226, 0.5)';
    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 2;

    const margin = 40;
    const width = canvas.width - 2 * margin;
    const height = canvas.height - 2 * margin;

    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    const yMin = Math.min(...data.map(d => d.y));
    const yMax = Math.max(...data.map(d => d.y));

    ctx.beginPath();

    data.forEach((point, i) => {
      const x = margin + (point.x - xMin) / (xMax - xMin) * width;
      const y = canvas.height - margin - (point.y - yMin) / (yMax - yMin) * height;

      if (i === 0) {
        ctx.moveTo(x, canvas.height - margin);
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineTo(canvas.width - margin, canvas.height - margin);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawPreview() {
    if (!ctx) return;

    switch (style) {
      case 'line':
        drawLine();
        break;
      case 'bar':
        drawBar();
        break;
      case 'scatter':
        drawScatter();
        break;
      case 'area':
        drawArea();
        break;
      default:
        drawLine();
    }
  }

  function renderPreview(newData, newStyle) {
    data = newData || [];
    style = newStyle || 'line';

    if (!canvas) {
      initCanvas();
    }

    drawPreview();
  }

  function updatePreview() {
    if (canvas) {
      drawPreview();
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    initCanvas();
    window.addEventListener('resize', resizeCanvas);
  });

  return {
    renderPreview: renderPreview,
    updatePreview: updatePreview
  };
})();