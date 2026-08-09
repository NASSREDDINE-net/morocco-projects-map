# 🇲🇦 Morocco Projects Map

> Interactive map for discovering and exploring projects across Morocco 🇲🇦


\

## 🌍 Overview

**Morocco Projects Map** is an interactive web application designed to visualize and explore projects across Morocco through an easy-to-use map interface.

The project combines **Leaflet**, **OpenStreetMap**, structured project data, search, filtering, and responsive web design to provide a simple way to discover projects by location.

### 🎯 Main goals

* 🇲🇦 Make Moroccan projects easier to discover
* 📍 Visualize project locations on an interactive map
* 🔎 Make project information searchable
* 📱 Provide a responsive experience on different devices
* 🌐 Keep the project lightweight and accessible
* 🛠️ Provide a foundation for future project and data contributions

---

## ✨ Features

### 🗺️ Interactive Map

* Interactive map powered by **Leaflet**
* OpenStreetMap map tiles
* Project markers based on geographic coordinates
* Project popups with relevant information
* Map navigation and zoom controls
* OpenStreetMap attribution preserved

### 🔎 Search & Filtering

* Search projects from the interface
* Filter displayed projects
* Automatically refresh map markers according to the selected filters

### 📱 Responsive Design

The interface is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

### 🌐 Multilingual Interface

The project supports user-facing labels in:

* 🇲🇦 Darija / Arabic
* 🇬🇧 English

Additional languages can be introduced in future versions.

### 🎨 User Interface

* Clean and lightweight interface
* Responsive map layout
* Project information popups
* Light/dark interface compatibility where supported
* No unnecessary backend dependency

---

## 🧱 Technology Stack

| Technology    | Purpose                         |
| ------------- | ------------------------------- |
| HTML5         | Application structure           |
| CSS3          | Interface and responsive design |
| JavaScript    | Application logic               |
| Leaflet       | Interactive mapping             |
| OpenStreetMap | Map data                        |
| JSON          | Project data                    |

---

## 📂 Project Structure

```text
morocco-projects-map/
│
├── assets/
│   ├── css/
│   ├── js/
│   └── ...
│
├── data/
│   └── ...
│
├── index.html
├── CHANGELOG-V4.2.md
└── README.md
```

---

## 🚀 V4.2 — Final Fix

Version **4.2** focuses on stability, usability, responsive behavior, map reliability, and final interface improvements.

### 🔧 Improvements

* ✅ Improved map initialization
* ✅ Improved project marker handling
* ✅ Improved project popup information
* ✅ Improved search/filter behavior
* ✅ Improved responsive layout
* ✅ Improved interface consistency
* ✅ Improved project data handling
* ✅ Fixed identified UI issues
* ✅ Removed unnecessary dependencies
* ✅ Improved overall stability

For the complete release history, see:

**CHANGELOG-V4.2.md**

---

## 🗺️ How It Works

1. The application loads the project data.
2. Leaflet initializes the Morocco map.
3. Projects containing geographic coordinates are converted into map markers.
4. Users can search and filter projects.
5. Selecting a marker displays project information.
6. The map updates according to the selected data.

---

## 💻 Local Development

Clone the repository:

```bash
git clone https://github.com/NASSREDDINE-net/morocco-projects-map.git
```

Enter the project directory:

```bash
cd morocco-projects-map
```

Because this is a lightweight static web application, no complex build system is required.

You can open:

```text
index.html
```

directly in a browser, or use a local HTTP server for development.

For example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## 🌐 Deployment

The project is compatible with static hosting platforms such as:

* GitHub Pages
* Cloudflare Pages
* Netlify
* Other static hosting providers

### GitHub Pages

The repository contains the static application files required for GitHub Pages deployment.

After enabling GitHub Pages, the application can be accessed from the generated GitHub Pages URL.

---

## 📸 Screenshots

### 🗺️ Main Map

Add a screenshot of the main map here:

```text
![Morocco Projects Map](./assets/screenshots/main-map.png)
```

### 📍 Project Information

Add a project popup screenshot here:

```text
![Project Information](./assets/screenshots/project-details.png)
```

### 📱 Mobile

Add a mobile screenshot here:

```text
![Mobile View](./assets/screenshots/mobile.png)
```

> Replace the screenshot paths above with the actual screenshots included in the repository.

---

## 🧪 Testing

The V4.2 release should be tested on:

* [x] Desktop layout
* [x] Mobile layout
* [x] Tablet layout
* [x] Map initialization
* [x] Map navigation
* [x] Project markers
* [x] Project popups
* [x] Search
* [x] Filters
* [x] Responsive behavior
* [x] Project data loading

### Recommended browsers

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

---

## 🛡️ Data & Attribution

Map data is provided by **OpenStreetMap** and displayed using **Leaflet**.

OpenStreetMap attribution must remain visible when using the map.

Project information should be maintained carefully and updated when reliable source information changes.

---

## 🤝 Contributing

Contributions are welcome.

You can contribute by:

* 🐛 Reporting bugs
* 💡 Suggesting improvements
* 🗺️ Improving project data
* 🎨 Improving the interface
* ⚡ Improving performance
* 📱 Improving responsive behavior
* 🌐 Improving translations
* 🔧 Submitting Pull Requests

Before submitting a Pull Request, please describe clearly:

1. What was changed
2. Why it was changed
3. How it was tested

---

## 📋 Roadmap

Possible future improvements:

* [ ] Advanced project categories
* [ ] More detailed project pages
* [ ] Improved geographic filtering
* [ ] Additional Moroccan regions and datasets
* [ ] Improved accessibility
* [ ] Statistics and project counters
* [ ] Better mobile map controls
* [ ] Additional languages
* [ ] Project submission workflow

---

## 📜 Version

**Current version: V4.2 — Final Fix**

---

## 🇲🇦 About

**Morocco Projects Map** is an independent open-source web project focused on making Moroccan projects easier to discover and explore through interactive digital mapping.

Built with:

**HTML + CSS + JavaScript + Leaflet + OpenStreetMap**

---

## 👨‍💻 Author

**NASSREDDINE-net**

GitHub:

https://github.com/NASSREDDINE-net

Project:

https://github.com/NASSREDDINE-net/morocco-projects-map

---

## ⭐ Support

If you find this project useful:

* ⭐ Star the repository
* 🐛 Report issues
* 💡 Share suggestions
* 🤝 Contribute improvements

🇲🇦 **Made for exploring Morocco's projects through an open digital map.**
