# 🇲🇦 Morocco Projects Map

> **Explore, discover and visualize projects across Morocco through an interactive map and searchable project directory.**

[![Live Website](https://img.shields.io/badge/Live%20Website-morocco--projects.is--a.bot-0b6b3a?style=for-the-badge)](https://morocco-projects.is-a.bot/)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?style=for-the-badge&logo=github)](https://pages.github.com/)
[![License](https://img.shields.io/badge/License-Open%20Project-blue?style=for-the-badge)](#-license)
[![Morocco](https://img.shields.io/badge/Made%20for-Morocco-red?style=for-the-badge)](https://morocco-projects.is-a.bot/)

**Morocco Projects Map** is a lightweight, static and multilingual web application for discovering projects and initiatives across Morocco.

The platform combines an interactive **Leaflet + OpenStreetMap** map, structured JSON data, search and filters, project details, responsive design, Moroccan Darija, English and French, plus light/dark mode.

---

## 🌐 Live Website

### 👉 https://morocco-projects.is-a.bot/

The website is deployed as a static application and does not require a backend server.

---

## 🎯 Project Vision

The goal is to make information about projects in Morocco easier to discover, explore and understand geographically.

The platform is designed as a foundation for a growing **Morocco Projects Directory & Map**, where reliable project information can be organized by:

- 📍 Location
- 🏙️ City
- 🗺️ Region
- 🏷️ Sector / category
- 📅 Year
- 🚦 Status
- 💰 Budget, when available
- 👥 Jobs, when available
- 🔗 Official source

> **Important:** the application displays the information available in `data/projects.json`. It should not invent or silently alter project information.

---

## ✨ Features

### 🗺️ Interactive Morocco Map

- Leaflet-powered interactive map
- OpenStreetMap map data
- Project markers based on coordinates
- Marker popups with project information
- Zoom and map navigation
- Project filtering reflected on the map
- OpenStreetMap attribution preserved

### 🔎 Search & Filters

Search and explore projects using:

- Project name
- City
- Region
- Category
- Description
- Source

Available filtering dimensions can include:

- 🏷️ Category
- 🗺️ Region
- 📅 Year
- 🚦 Status

### 📋 Project Details

Project details can display:

- Project name
- Location
- Region
- Category
- Description
- Status
- Year
- Budget
- Jobs
- Verification status
- Official source

### 📊 Project Insights

The interface can summarize dataset information such as:

- Total projects
- Active projects
- Verified projects
- Latest project year
- Main project category
- Project distribution

### 🇲🇦 Moroccan Darija

The **AR** language option is designed for Moroccan users and uses **Moroccan Darija (الدارجة المغربية)** rather than only Modern Standard Arabic.

The interface supports:

- 🇲🇦 Darija / Arabic
- 🇫🇷 Français
- 🇬🇧 English

The Arabic/Darija interface includes RTL support.

### 🌙 Light & Dark Mode

- Light mode
- Dark mode
- Persistent user preference
- Responsive interface in both themes

### 📱 Responsive Design

Designed for:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📲 Tablet

### 🔗 Official Sources

Where available, project information includes a source link so users can consult the original information.

### 🚀 Static & Lightweight

The project:

- Uses no application backend
- Requires no database server
- Can run directly on static hosting
- Is compatible with GitHub Pages
- Keeps project data in a simple JSON dataset

---

## 🧱 Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive UI |
| JavaScript | Application logic |
| Leaflet | Interactive mapping |
| OpenStreetMap | Map data |
| JSON | Project dataset |
| GitHub Pages | Static hosting |

---

## 📁 Project Structure

```text
morocco-projects-map/
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── images/
│       ├── logo.png
│       ├── favicon.png
│       └── brand-lockup.png
│
├── data/
│   └── projects.json
│
├── CNAME
├── index.html
├── nojekyll.txt
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── README.md
```

---

## 📊 Project Data

Project data is stored in:

```text
data/projects.json
```

A project record can contain fields such as:

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

1. Prefer official and reliable sources.
2. Keep geographic coordinates accurate.
3. Clearly identify verified information.
4. Do not fabricate project details.
5. Keep source links when available.
6. Update outdated information carefully.

---

## 🛠️ Run Locally

Clone the repository:

```bash
git clone https://github.com/NASSREDDINE-net/morocco-projects-map.git
```

Enter the project directory:

```bash
cd morocco-projects-map
```

Because the project loads JSON data from the browser, using a local HTTP server is recommended.

### Python

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

---

## 🌐 Deployment

The project is designed for static hosting.

### GitHub Pages

Recommended configuration:

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

The repository contains a `CNAME` file for:

```text
morocco-projects.is-a.bot
```

### Other compatible hosts

The application can also be adapted for:

- Cloudflare Pages
- Netlify
- Vercel
- Other static hosting services

---

## 🔐 Domain

Current project domain:

### https://morocco-projects.is-a.bot/

The custom domain is configured through GitHub Pages and the repository `CNAME` file.

---

## 🔍 SEO & Web Discovery

The project includes web-discovery files such as:

- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- Canonical URL metadata
- Open Graph metadata

These help search engines and social platforms understand and discover the website.

---

## 🧪 Testing Checklist

Before publishing a change, verify:

- [ ] Homepage loads correctly
- [ ] Map initializes correctly
- [ ] Project markers appear
- [ ] Project popups/details work
- [ ] Search works
- [ ] Filters work
- [ ] Data loads from `data/projects.json`
- [ ] Darija / Arabic works correctly
- [ ] French works correctly
- [ ] English works correctly
- [ ] RTL layout works correctly
- [ ] Light mode works
- [ ] Dark mode works
- [ ] Mobile layout works
- [ ] Logo and favicon load
- [ ] Source links work
- [ ] Custom domain works
- [ ] No unexpected popup appears on page load
- [ ] No console errors are introduced

### Recommended browsers

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari
- Brave

---

## 🗺️ How It Works

1. The application loads `data/projects.json`.
2. JavaScript validates and processes the project records.
3. Leaflet initializes the Morocco map.
4. Projects with valid coordinates become map markers.
5. Users can search and filter the dataset.
6. Selecting a project reveals its available details.
7. Source links allow users to consult the original information.

---

## 🤝 Contributing

Contributions are welcome.

You can help by:

- 🐛 Reporting bugs
- 💡 Suggesting features
- 🗺️ Improving project data
- 🔎 Improving search and filtering
- 🎨 Improving the interface
- 📱 Improving mobile usability
- 🌐 Improving translations
- ⚡ Improving performance
- 📚 Improving documentation

### Pull Requests

Before opening a Pull Request, please include:

1. **What changed**
2. **Why it changed**
3. **How it was tested**
4. Screenshots when the change affects the interface

Please keep changes focused and avoid introducing unverified project information.

---

## 🧭 Roadmap

Potential future improvements include:

- [ ] Advanced project categories
- [ ] Dedicated project pages
- [ ] More detailed regional statistics
- [ ] Project clustering on the map
- [ ] Advanced geographic filtering
- [ ] Better mobile map experience
- [ ] Shareable project URLs
- [ ] Improved SEO for individual projects
- [ ] Data import/update workflow
- [ ] More official data sources
- [ ] Additional languages
- [ ] Accessibility improvements

---

## 🛡️ Data & Attribution

Map functionality uses:

- **Leaflet**
- **OpenStreetMap**

OpenStreetMap attribution must remain visible when using OpenStreetMap data.

Project information should be checked against reliable sources before being reused or redistributed.

---

## 👨‍💻 Developer

**Developed by NASSREDDINE**

🌐 Portfolio:  
https://nassreddine.is-a.dev

💻 GitHub:  
https://github.com/NASSREDDINE-net

---

## 📄 License

This repository is an open project intended for educational, civic-tech and data-visualization purposes.

Project data may have separate source-specific terms or attribution requirements. Always consult and respect the original source before redistributing external data.

---

## ⭐ Support the Project

If you find **Morocco Projects Map** useful:

- ⭐ Star the repository
- 🐛 Report issues
- 💡 Suggest improvements
- 🤝 Contribute through Pull Requests
- 📢 Share the project

---

## 🇲🇦 Built for Morocco

> **Discover Morocco's projects. Explore the map. Find the information.**

**Morocco Projects Map** — an open foundation for exploring projects across Morocco.
