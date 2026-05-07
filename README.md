# Automatic graph digitization - upload image of chart/graph, extract data points automatically, export to CSV with adjustable point density

## Run

Open `index.html` directly in a browser, OR serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `styles.css` — Global styles for the app, including dark mode, layout, and interactive elements.
- `app.js` — Core app initialization and state management.
- `upload.js` — Handles image upload and validation.
- `graph_detector.js` — Auto-detects graph lines and axes from the uploaded image.
- `calibration.js` — Handles manual axis calibration via user input.
- `data_extractor.js` — Extracts data points from the calibrated graph.
- `export.js` — Handles exporting data to CSV or JSON.
- `preview.js` — Renders a preview of the extracted data in different graph styles.
- `index.html` — Main entry point; loads all assets and initializes the app.
