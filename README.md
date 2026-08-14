# 🇲🇦 Morocco Projects Map — V5.1.1 Fix

An open, static and interactive directory of projects and initiatives across Morocco.

## 🔧 V5.1.1 Fix

- Fixed the project-details modal rendering issue that could leave a blank dialog.
- Added defensive handling for missing/invalid project IDs and incomplete project fields.
- Added event delegation for dynamically generated **View details** buttons.
- Improved mobile modal layout and accessibility.

## ✨ What's new in V5.0

- Interactive **Leaflet + OpenStreetMap** map
- Live project markers linked to the JSON dataset
- Search across project name, city, region, category, description and source
- Filters for **category, region, year and status**
- Project details modal with source link, status, year, budget and jobs
- Dataset insights: top category, latest year, verified projects and active pipeline
- Local “Map Bot” search
- **English / Français / العربية** interface
- Light / dark mode
- Responsive mobile layout
- GitHub Pages compatible — no backend required
- Existing `CNAME` preserved for `morocco-projects.is-a.bot`

## 📁 Structure

```text
.
├── CNAME
├── index.html
├── data/
│   └── projects.json
├── assets/
│   ├── css/style.css
│   └── js/app.js
└── nojekyll.txt
```

## 🚀 Deployment

The project is designed for GitHub Pages.

Publishing source:

- Branch: `main`
- Folder: `/ (root)`

Custom domain:

```text
morocco-projects.is-a.bot
```

## 🧩 Data model

Each project can contain:

```json
{
  "id": 1,
  "name": "Project name",
  "city": "City",
  "region": "Region",
  "category": "Transport",
  "year": 2026,
  "status": "In progress",
  "description": "Description",
  "budget": null,
  "jobs": null,
  "lat": 33.57,
  "lng": -7.59,
  "sourceName": "Official source",
  "source": "https://example.com",
  "verified": true
}
```

## 🔎 Data quality

The frontend does not invent project data. It renders `data/projects.json`. Projects with `verified: true` are displayed with a verification badge and their source link is available from the details modal.

## 🛠️ Local preview

Because browsers may block `fetch()` from local `file://` pages, use a small local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## 🌐 Live

https://morocco-projects.is-a.bot/

## License

Open project for educational, civic-tech and data-visualisation use. Check the repository history and source references before redistributing project data.


## V5.1.1 Fix

- Fixed stale-browser/CDN caching of the previous JavaScript bundle by versioning `app.js` as `5.1.1`.
- The modal is rendered before it is revealed and explicitly hidden on close.
- Added validation that `data/projects.json` contains an array.


## V5.1.2 Fix

- Fixed the blank popup appearing automatically on first load or browser refresh.
- The project modal now remains hidden until a user explicitly opens project details.
- Added a cache-busted JavaScript version (`5.1.2`).


## V5.1.3

- Footer now displays **Developed by NASSREDDINE** with a link to `https://nassreddine.is-a.dev`.
