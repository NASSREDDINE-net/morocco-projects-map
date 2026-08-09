# 🇲🇦 Morocco Projects Map — V4.2 Final Fix

Clean GitHub Pages build.

### Fixed
- Leaflet loads before the app.
- Map initialization waits for `projects.json`.
- Removed the old mock-map marker layer.
- Removed the `window.projects` bug.
- Removed malformed/extra map HTML.
- Real OpenStreetMap tiles.
- One Leaflet marker per project with coordinates.
- Search/category/year filters update markers.
- Fit Projects / Morocco controls.
- Darija / English.
- Light/Dark mode.
- Local project bot works without Gemini.
- Clear fallback message if the map or data cannot load.

### Deploy
Upload `index.html`, `assets/`, and `data/` directly to the repository root and use GitHub Pages:
`main` → `/ (root)`.
