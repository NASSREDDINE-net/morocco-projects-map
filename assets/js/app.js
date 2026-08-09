(() => {
"use strict";

const $ = (selector) => document.querySelector(selector);
let projects = [];
let map = null;
let markerLayer = null;

const i18n = {
  en: {
    navMap:"Map", navProjects:"Projects", navAbout:"About",
    heroTitle:'Discover projects<br><span>across Morocco.</span>',
    heroText:"Explore a structured map of verified projects and initiatives across Moroccan cities and regions.",
    exploreMap:"Explore map", browseProjects:"Browse projects",
    botHero:"Ask about a project, city or category.", botTry:"Try: “technology projects in Tangier”",
    projects:"Projects", regions:"Regions", cities:"Cities", verifiedData:"Verified data",
    explore:"EXPLORE", projectMap:"Project map", projectLocation:"Project location",
    mapNotice:"Real Leaflet + OpenStreetMap map. Markers are loaded from the verified local project dataset.",
    directory:"DIRECTORY", allCategories:"All categories", allYears:"All years",
    findWhat:"Find what you need.", botText:"Search the verified local dataset instantly. Gemini is optional and not required.",
    search:"Search", searchPlaceholder:"🔎 Search project, city or region...",
    botPlaceholder:"Ask: projects in Rabat", results:"projects",
    noProjects:"No projects found", tryAnother:"Try another search or filter.",
    found:"I found", matches:"matching project(s)",
    noMatch:"No matching verified project found. Try “Rabat”, “technology”, “energy” or “environment”.",
    ask:"Try asking about a city, category or project.",
    verified:"Verified", official:"Official source ↗", details:"Details",
    fit:"Fit projects", morocco:"Morocco", mapError:"Map could not load. Check your internet connection.",
    city:"City", region:"Region", category:"Category", year:"Year", status:"Status", budget:"Budget"
  },
  darija: {
    navMap:"الخريطة", navProjects:"المشاريع", navAbout:"على المشروع",
    heroTitle:'كتاشف المشاريع<br><span>فالمغرب.</span>',
    heroText:"كتاشف خريطة منظمة ديال المشاريع الموثقة والمبادرات فالمدن والجهات المغربية.",
    exploreMap:"شوف الخريطة", browseProjects:"شوف المشاريع",
    botHero:"سول على مشروع، مدينة ولا مجال.", botTry:"جرب: «مشاريع التكنولوجيا فطنجة»",
    projects:"المشاريع", regions:"الجهات", cities:"المدن", verifiedData:"بيانات موثقة",
    explore:"استكشف", projectMap:"خريطة المشاريع", projectLocation:"موقع المشروع",
    mapNotice:"خريطة حقيقية بـ Leaflet وOpenStreetMap. الـMarkers كيتحملو من بيانات المشاريع الموثقة.",
    directory:"الدليل", allCategories:"جميع المجالات", allYears:"جميع السنوات",
    findWhat:"قلب على اللي بغيتي.", botText:"قلب مباشرة فبيانات المشاريع الموثقة. Gemini اختياري وماشي ضروري.",
    search:"قلب", searchPlaceholder:"🔎 قلب على مشروع، مدينة ولا جهة...",
    botPlaceholder:"سول: المشاريع فـ الرباط", results:"مشروع",
    noProjects:"ما لقيناش مشاريع", tryAnother:"جرب بحث ولا فلتر آخر.",
    found:"لقيت", matches:"مشروع مطابق",
    noMatch:"ما لقيتش مشروع مطابق. جرب «الرباط»، «التكنولوجيا»، «الطاقة» ولا «البيئة».",
    ask:"سول على مدينة، مجال ولا مشروع.",
    verified:"موثق", official:"المصدر الرسمي ↗", details:"التفاصيل",
    fit:"جمع المشاريع", morocco:"المغرب", mapError:"الخريطة ما تحملاش. تأكد من الإنترنت.",
    city:"المدينة", region:"الجهة", category:"المجال", year:"السنة", status:"الحالة", budget:"الميزانية"
  }
};

const lang = () => localStorage.getItem("mapLang") || "darija";
const tr = (key) => (i18n[lang()] || i18n.darija)[key] || key;
const escapeHtml = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
}[c]));

function setLanguage(next) {
  localStorage.setItem("mapLang", next);
  document.documentElement.lang = next === "darija" ? "ar-MA" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[next][key]) el.textContent = i18n[next][key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.dataset.i18nHtml;
    if (i18n[next][key]) el.innerHTML = i18n[next][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (i18n[next][key]) el.placeholder = i18n[next][key];
  });
  $("#langBtn").textContent = next === "darija" ? "EN" : "دارجة";
  render();
  drawMarkers();
}

function visibleProjects() {
  const q = ($("#search")?.value || "").trim().toLowerCase();
  const category = $("#category")?.value || "";
  const year = $("#year")?.value || "";
  return projects.filter(p => {
    const haystack = [p.name,p.city,p.region,p.category,p.description,p.status].join(" ").toLowerCase();
    return (!q || haystack.includes(q)) &&
           (!category || p.category === category) &&
           (!year || String(p.year) === year);
  });
}

function render() {
  const list = visibleProjects();
  const count = $("#resultCount");
  if (count) count.textContent = `${list.length} ${tr("results")}`;

  const grid = $("#projectGrid");
  if (!grid) return;
  grid.innerHTML = list.length ? list.map(p => `
    <article class="card">
      <span class="tag">${escapeHtml(p.category)}</span>
      <span class="verified">✓ ${tr("verified")}</span>
      <h3>${escapeHtml(p.name)}</h3>
      <div class="meta">📍 ${escapeHtml(p.city)} · ${escapeHtml(p.region)}<br>
      📅 ${escapeHtml(p.year)} · ${escapeHtml(p.status)}
      ${p.budget ? `<br>💰 ${escapeHtml(p.budget)}` : ""}
      ${p.jobs ? `<br>👥 ${escapeHtml(p.jobs)}` : ""}</div>
      <p>${escapeHtml(p.description)}</p>
      <div class="source"><small>${escapeHtml(p.sourceName || "")}</small>
      ${p.source ? `<a href="${escapeHtml(p.source)}" target="_blank" rel="noopener">${tr("official")}</a>` : ""}</div>
    </article>`).join("") :
    `<div class="card"><h3>${tr("noProjects")}</h3><p>${tr("tryAnother")}</p></div>`;
}

function popupHtml(p) {
  return `<div class="project-popup">
    <h3>${escapeHtml(p.name)}</h3>
    <span class="status">✓ ${tr("verified")}</span>
    <div class="meta">
      📍 ${escapeHtml(p.city)}<br>
      🏷️ ${escapeHtml(p.category)}<br>
      📅 ${escapeHtml(p.year)}<br>
      🟢 ${escapeHtml(p.status)}
    </div>
    <p>${escapeHtml(p.description)}</p>
    ${p.source ? `<a href="${escapeHtml(p.source)}" target="_blank" rel="noopener">${tr("official")}</a>` : ""}
  </div>`;
}

function drawMarkers() {
  if (!map || !markerLayer) return;
  markerLayer.clearLayers();
  const list = visibleProjects();
  const bounds = [];

  list.forEach(p => {
    const lat = Number(p.lat), lng = Number(p.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    const marker = L.circleMarker([lat,lng], {
      radius: 8, color:"#fff", weight:2, fillColor:"#c1272d", fillOpacity:.95
    });
    marker.bindPopup(popupHtml(p), {maxWidth:320});
    marker.addTo(markerLayer);
    bounds.push([lat,lng]);
  });

  const mapCount = $("#mapCount");
  if (mapCount) mapCount.textContent = `${list.length} ${tr("results")}`;

  if (bounds.length === 1) map.setView(bounds[0], 10);
  else if (bounds.length > 1) map.fitBounds(bounds, {padding:[35,35], maxZoom:8});
}

function initMap() {
  const el = $("#projectsMap");
  if (!el) return;
  if (!window.L) {
    const err = $("#mapError");
    if (err) { err.hidden = false; err.textContent = tr("mapError"); }
    return;
  }
  map = L.map(el, {scrollWheelZoom:true});
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom:19,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
  }).addTo(map);
  map.setView([31.7917,-7.0926],5.5);
  markerLayer = L.layerGroup().addTo(map);
  drawMarkers();
  setTimeout(() => map.invalidateSize(), 150);
}

function setupFilters() {
  $("#search")?.addEventListener("input", () => { render(); drawMarkers(); });
  $("#category")?.addEventListener("change", () => { render(); drawMarkers(); });
  $("#year")?.addEventListener("change", () => { render(); drawMarkers(); });
  $("#themeBtn")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    setTimeout(() => map?.invalidateSize(), 50);
  });
  $("#langBtn")?.addEventListener("click", () => setLanguage(lang()==="darija" ? "en" : "darija"));
  $("#botBtn")?.addEventListener("click", runBot);
  $("#botInput")?.addEventListener("keydown", e => { if (e.key==="Enter") runBot(); });
  $("#fitMap")?.addEventListener("click", () => {
    if (!map) return;
    const points = visibleProjects().filter(p=>Number.isFinite(Number(p.lat))&&Number.isFinite(Number(p.lng))).map(p=>[Number(p.lat),Number(p.lng)]);
    if (points.length) map.fitBounds(points,{padding:[35,35],maxZoom:8});
  });
  $("#centerMap")?.addEventListener("click", () => map?.setView([31.7917,-7.0926],5.5));
}

function runBot() {
  const q = ($("#botInput")?.value || "").trim();
  if (!q) { $("#botAnswer").textContent = tr("ask"); return; }
  const ql=q.toLowerCase();
  const found=projects.filter(p=>[p.name,p.city,p.region,p.category,p.description,p.status].join(" ").toLowerCase().includes(ql));
  if(found.length){
    $("#botAnswer").textContent=`📍 ${tr("found")} ${found.length} ${tr("matches")}: ${found.slice(0,5).map(p=>p.name).join(", ")}.`;
  } else {
    $("#botAnswer").textContent=tr("noMatch");
  }
}

async function init() {
  try {
    const response = await fetch("data/projects.json", {cache:"no-store"});
    if (!response.ok) throw new Error("projects.json: " + response.status);
    projects = await response.json();

    const categories=[...new Set(projects.map(p=>p.category).filter(Boolean))].sort();
    categories.forEach(c=>$("#category")?.insertAdjacentHTML("beforeend",`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`));
    const years=[...new Set(projects.map(p=>p.year).filter(Boolean))].sort((a,b)=>Number(b)-Number(a));
    years.forEach(y=>$("#year")?.insertAdjacentHTML("beforeend",`<option value="${escapeHtml(y)}">${escapeHtml(y)}</option>`));

    if($("#statProjects")) $("#statProjects").textContent=projects.length;
    if($("#statRegions")) $("#statRegions").textContent=new Set(projects.map(p=>p.region).filter(Boolean)).size;
    if($("#statCities")) $("#statCities").textContent=new Set(projects.map(p=>p.city).filter(Boolean)).size;

    setLanguage(lang());
    initMap();
  } catch (error) {
    console.error(error);
    const grid=$("#projectGrid");
    if(grid) grid.innerHTML=`<div class="card"><h3>⚠️ ${tr("noProjects")}</h3><p>${escapeHtml(error.message)}</p></div>`;
    const err=$("#mapError");
    if(err){err.hidden=false;err.textContent=tr("mapError");}
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem("theme")==="dark") document.body.classList.add("dark");
  setupFilters();
  init();
});
})();
