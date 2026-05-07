window.App = window.App || {};

window.App.export_js = (function() {
  'use strict';

  function exportToCSV(data) {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Invalid data format for CSV export');
      return;
    }

    const headers = ['x', 'y'];
    const csvContent = [
      headers.join(','),
      ...data.map(item => `${item.x},${item.y}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToJSON(data) {
    if (!Array.isArray(data)) {
      console.error('Invalid data format for JSON export');
      return;
    }

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.json');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return {
    exportToCSV: exportToCSV,
    exportToJSON: exportToJSON
  };
})();