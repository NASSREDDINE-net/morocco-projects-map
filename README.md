# 🇲🇦 Morocco Projects Map

> **Discover, explore and visualize projects across Morocco.**

[![Live Website](https://img.shields.io/badge/Live%20Website-morocco--projects.is--a.bot-08783f?style=for-the-badge)](https://morocco-projects.is-a.bot/)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?style=for-the-badge&logo=github)](https://pages.github.com/)
[![Made for Morocco](https://img.shields.io/badge/Made%20for-Morocco-c1272d?style=for-the-badge)](https://morocco-projects.is-a.bot/)

**Morocco Projects Map** is a static, multilingual web application for discovering and visualizing selected projects and initiatives across Morocco.

The project combines an interactive **Leaflet + OpenStreetMap** map, structured JSON data, search and filters, project details, dashboard insights, Moroccan Darija, French, English, responsive design, sharing links and light/dark mode.

## 🌐 Live

**https://morocco-projects.is-a.bot/**

## ✨ Features

- 🗺️ Interactive Morocco map powered by Leaflet and OpenStreetMap
- 🔎 Search across project name, city, region, category, status and source
- 🎛️ Filters by sector, region, status and year
- 📋 Project details with location, status, year, budget, jobs and coordinates
- 🔗 Official source links
- 📤 Shareable project links using URL hashes
- 📊 Dashboard statistics and category breakdown
- 📍 Optional browser geolocation
- 🇲🇦 Moroccan Darija in **AR**, with RTL support
- 🇫🇷 French and 🇬🇧 English
- 🌙 Persistent light/dark mode
- 📱 Responsive desktop, tablet and mobile UI
- 🖼️ Project logo, favicon and social preview
- 🔍 Basic SEO metadata, canonical URL, sitemap and robots file
- 🚀 Static deployment with no backend or database

## 🧱 Stack

| Technology | Role |
|---|---|
| HTML5 | Structure |
| CSS3 | UI, responsive design and themes |
| JavaScript | Search, filters, map and interactions |
| Leaflet | Interactive mapping |
| OpenStreetMap | Base map |
| JSON | Project dataset |
| GitHub Pages | Hosting |

## 📁 Structure

```text
morocco-projects-map/
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   └── images/
│       ├── logo.png
│       ├── favicon.png
│       └── brand-lockup.png
├── data/
│   └── projects.json
├── CNAME
├── index.html
├── nojekyll.txt
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── README.md
```

## 📊 Data

Project records live in `data/projects.json`.

Typical fields include:

```json
{
  "id": 1,
  "name": "Project name",
  "city": "City",
  "region": "Region",
  "category": "Transport",
  "year": 2026,
  "status": "In progress",
  "description": "Project description",
  "budget": null,
  "jobs": null,
  "lat": 33.57,
  "lng": -7.59,
  "sourceName": "Official source",
  "source": "https://example.com",
  "verified": true
}
```

### Data principles

1. Prefer official or reliable sources.
2. Keep source links when available.
3. Keep coordinates accurate and review them.
4. Do not fabricate project information.
5. Mark information as verified only when it has been checked.
6. Treat project data as a dataset that requires periodic review.

## 🛠️ Run locally

```bash
git clone https://github.com/NASSREDDINE-net/morocco-projects-map.git
cd morocco-projects-map
python -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

A local HTTP server is recommended because the browser loads `data/projects.json`.

## 🌐 Deployment

The project is configured for GitHub Pages:

```text
Branch: main
Folder: /
```

Custom domain:

```text
morocco-projects.is-a.bot
```

The `CNAME` file must remain present when deploying the site.

## 🔍 SEO

The project includes:

- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- Canonical URL
- Open Graph metadata
- Favicon and Apple touch icon

## 🧪 Testing checklist

- [ ] Homepage loads
- [ ] JSON data loads
- [ ] Map loads
- [ ] Markers appear
- [ ] Search works
- [ ] Sector/region/status/year filters work
- [ ] Project details open
- [ ] Official source links work
- [ ] Project sharing works
- [ ] FR / EN / AR work
- [ ] Darija RTL layout works
- [ ] Light/dark mode works
- [ ] Geolocation button behaves correctly
- [ ] Mobile layout works
- [ ] Custom domain works
- [ ] No unexpected popup appears on refresh
- [ ] No new browser console errors

## 🤝 Contributing

Contributions are welcome.

Useful contributions include:

- 🐛 Bug reports
- 💡 Feature proposals
- 🗺️ Data improvements
- 🎨 UI/UX improvements
- 📱 Mobile improvements
- 🌐 Translation improvements
- ⚡ Performance improvements
- 📚 Documentation

For Pull Requests, explain **what changed, why it changed and how it was tested**. Do not add unverified project information.

## 🧭 Roadmap

- [ ] Project-specific pages
- [ ] More detailed regional analytics
- [ ] Improved map clustering
- [ ] More advanced geographic search
- [ ] More official project sources
- [ ] Better accessibility
- [ ] Data update workflow
- [ ] Expanded SEO for individual projects

## 🛡️ Attribution

Mapping uses **Leaflet** and **OpenStreetMap**. OpenStreetMap attribution must remain visible.

Project information remains subject to the terms and attribution requirements of its original sources.

## 👨‍💻 Developer

**Developed by NASSREDDINE**

- 🌐 Portfolio: https://nassreddine.is-a.dev
- 💻 GitHub: https://github.com/NASSREDDINE-net

## 🇲🇦 Built for Morocco

> **كتاشف المشاريع اللي كاينة فالمغرب، شوف الخريطة، وقلب على المعلومة اللي كتهمك.**

**Morocco Projects Map** — an open foundation for exploring projects across Morocco.
