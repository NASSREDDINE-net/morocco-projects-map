(() => {
"use strict";
const $ = s => document.querySelector(s);
const state = { projects: [], filtered: [], map: null, markers: null, lang: localStorage.getItem("mp-lang") || "en" };

const I18N = {
  en:{navMap:"Map",navProjects:"Projects",navAbout:"About",eyebrow:"VERIFIED PROJECT DIRECTORY · V5.0",heroTitle:"See Morocco’s projects<br><span>on one map.</span>",heroText:"Explore a structured, searchable directory of projects and initiatives across Moroccan cities and regions.",exploreMap:"Explore map",browseProjects:"Browse projects",verifiedData:"Verified source links",staticFast:"Fast static site",openData:"Open dataset",botHero:"Find a project in seconds.",botTry:"Try: “technology in Tangier”",trySearch:"Try search →",projects:"Projects",regions:"Regions",cities:"Cities",categories:"Categories",explore:"EXPLORE",projectMap:"Project map",fit:"Fit projects",morocco:"Morocco",locate:"My location",projectLocation:"Project location",mapNotice:"Markers are generated from the local JSON dataset. Select a marker to inspect the project.",directory:"DIRECTORY",searchPlaceholder:"Search project, city, region or description…",allCategories:"All categories",allRegions:"All regions",allYears:"All years",allStatuses:"All statuses",reset:"Reset",noResults:"No projects found",tryDifferent:"Try another search or clear the filters.",insights:"INSIGHTS",overview:"Dataset overview",topCategory:"Top category",latestYear:"Latest year",verifiedProjects:"Verified projects",activeProjects:"Active pipeline",sourceBacked:"with source references",notCompleted:"not marked as completed",findWhat:"Find what you need.",botText:"Searches the local dataset instantly — private, fast and GitHub Pages compatible.",botPlaceholder:"Ask: projects in Rabat",search:"Search",aboutEyebrow:"ABOUT",aboutTitle:"Open, lightweight, extensible.",aboutText:"Morocco Projects Map is an open project directory. The frontend is static, the data is stored in JSON, and every project can point to a source for verification.",about01:"Map-first discovery",about02:"Searchable structured data",about03:"GitHub Pages friendly",verified:"Verified",details:"View details",source:"Source",status:"Status",year:"Year",category:"Category",region:"Region",city:"City",budget:"Budget",jobs:"Jobs",noMatch:"No matching projects. Try a city, category or project name.",found:"Found",matches:"matches",ask:"Type a question first.",locationDenied:"Location access was denied.",locating:"Locating…",mapError:"Map could not load. Check your connection."},
  fr:{navMap:"Carte",navProjects:"Projets",navAbout:"À propos",eyebrow:"RÉPERTOIRE VÉRIFIÉ · V5.0",heroTitle:"Les projets du Maroc<br><span>sur une carte.</span>",heroText:"Explorez un répertoire structuré et consultable des projets et initiatives dans les villes et régions marocaines.",exploreMap:"Explorer la carte",browseProjects:"Voir les projets",verifiedData:"Sources vérifiées",staticFast:"Site statique rapide",openData:"Données ouvertes",botHero:"Trouvez un projet en quelques secondes.",botTry:"Essayez : « technologie à Tanger »",trySearch:"Tester la recherche →",projects:"Projets",regions:"Régions",cities:"Villes",categories:"Catégories",explore:"EXPLORER",projectMap:"Carte des projets",fit:"Afficher les projets",morocco:"Maroc",locate:"Ma position",projectLocation:"Localisation du projet",mapNotice:"Les marqueurs proviennent du fichier JSON local. Sélectionnez un marqueur pour voir le projet.",directory:"RÉPERTOIRE",searchPlaceholder:"Rechercher un projet, une ville, une région…",allCategories:"Toutes les catégories",allRegions:"Toutes les régions",allYears:"Toutes les années",allStatuses:"Tous les statuts",reset:"Réinitialiser",noResults:"Aucun projet trouvé",tryDifferent:"Essayez une autre recherche ou réinitialisez les filtres.",insights:"APERÇU",overview:"Vue d’ensemble",topCategory:"Catégorie principale",latestYear:"Année la plus récente",verifiedProjects:"Projets vérifiés",activeProjects:"Projets actifs",sourceBacked:"avec références sources",notCompleted:"non marqués comme terminés",findWhat:"Trouvez ce dont vous avez besoin.",botText:"Recherche instantanée dans les données locales — privée, rapide et compatible GitHub Pages.",botPlaceholder:"Demander : projets à Rabat",search:"Rechercher",aboutEyebrow:"À PROPOS",aboutTitle:"Ouvert, léger et extensible.",aboutText:"Morocco Projects Map est un répertoire ouvert de projets. Le frontend est statique, les données sont stockées en JSON et chaque projet peut pointer vers une source.",about01:"Découverte par carte",about02:"Données structurées",about03:"Compatible GitHub Pages",verified:"Vérifié",details:"Voir les détails",source:"Source",status:"Statut",year:"Année",category:"Catégorie",region:"Région",city:"Ville",budget:"Budget",jobs:"Emplois",noMatch:"Aucun projet correspondant.",found:"Trouvé",matches:"résultats",ask:"Écrivez d’abord une question.",locationDenied:"Accès à la position refusé.",locating:"Localisation…",mapError:"La carte n’a pas pu charger."},
  ar:{navMap:"الخريطة",navProjects:"المشاريع",navAbout:"حول المشروع",eyebrow:"دليل المشاريع الموثقة · V5.0",heroTitle:"شاهد مشاريع المغرب<br><span>على خريطة واحدة.</span>",heroText:"اكتشف دليلاً منظماً وقابلاً للبحث للمشاريع والمبادرات في المدن والجهات المغربية.",exploreMap:"استكشف الخريطة",browseProjects:"تصفح المشاريع",verifiedData:"مصادر موثقة",staticFast:"موقع سريع",openData:"بيانات مفتوحة",botHero:"اعثر على مشروع في ثوانٍ.",botTry:"جرب: «التكنولوجيا في طنجة»",trySearch:"جرب البحث ←",projects:"المشاريع",regions:"الجهات",cities:"المدن",categories:"الفئات",explore:"استكشاف",projectMap:"خريطة المشاريع",fit:"إظهار المشاريع",morocco:"المغرب",locate:"موقعي",projectLocation:"موقع المشروع",mapNotice:"يتم إنشاء العلامات من ملف JSON المحلي. اختر علامة لعرض تفاصيل المشروع.",directory:"الدليل",searchPlaceholder:"ابحث عن مشروع أو مدينة أو جهة…",allCategories:"كل الفئات",allRegions:"كل الجهات",allYears:"كل السنوات",allStatuses:"كل الحالات",reset:"إعادة ضبط",noResults:"لم يتم العثور على مشاريع",tryDifferent:"جرب بحثاً آخر أو امسح الفلاتر.",insights:"إحصائيات",overview:"نظرة عامة على البيانات",topCategory:"الفئة الأكثر",latestYear:"أحدث سنة",verifiedProjects:"المشاريع الموثقة",activeProjects:"المشاريع النشطة",sourceBacked:"مع مراجع المصادر",notCompleted:"غير مكتملة",findWhat:"ابحث عما تحتاجه.",botText:"يبحث فوراً داخل البيانات المحلية — سريع وخصوصي ومتوافق مع GitHub Pages.",botPlaceholder:"مثال: مشاريع الرباط",search:"بحث",aboutEyebrow:"حول",aboutTitle:"مفتوح، خفيف وقابل للتطوير.",aboutText:"Morocco Projects Map دليل مفتوح للمشاريع. الواجهة ثابتة والبيانات محفوظة بصيغة JSON، ويمكن لكل مشروع الإشارة إلى مصدر للتحقق.",about01:"اكتشاف عبر الخريطة",about02:"بيانات منظمة قابلة للبحث",about03:"متوافق مع GitHub Pages",verified:"موثق",details:"التفاصيل",source:"المصدر",status:"الحالة",year:"السنة",category:"الفئة",region:"الجهة",city:"المدينة",budget:"الميزانية",jobs:"فرص العمل",noMatch:"لا توجد مشاريع مطابقة. جرب اسم مدينة أو فئة أو مشروع.",found:"تم العثور على",matches:"نتائج",ask:"اكتب سؤالاً أولاً.",locationDenied:"تم رفض الوصول إلى الموقع.",locating:"جارٍ تحديد الموقع…",mapError:"تعذر تحميل الخريطة."}
};

const tr = k => (I18N[state.lang] && I18N[state.lang][k]) || I18N.en[k] || k;

function escapeHtml(v){return String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function setText(selector,key){const el=$(selector);if(el)el.textContent=tr(key);}
function setLanguage(lang){
  state.lang=I18N[lang]?lang:"en"; localStorage.setItem("mp-lang",state.lang);
  document.documentElement.lang=state.lang; document.documentElement.dir=state.lang==="ar"?"rtl":"ltr"; document.body.classList.toggle("rtl",state.lang==="ar");
  document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=tr(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-html]").forEach(el=>el.innerHTML=tr(el.dataset.i18nHtml));
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>el.placeholder=tr(el.dataset.i18nPlaceholder));
  $("#langBtn").textContent=state.lang==="en"?"AR":state.lang==="ar"?"FR":"EN";
  render(); updateMap();
}
function cycleLanguage(){setLanguage(state.lang==="en"?"ar":state.lang==="ar"?"fr":"en");}

function populateFilters(){
  const sets = {
    category:[...new Set(state.projects.map(p=>p.category).filter(Boolean))].sort(),
    region:[...new Set(state.projects.map(p=>p.region).filter(Boolean))].sort(),
    year:[...new Set(state.projects.map(p=>p.year).filter(Boolean))].sort((a,b)=>Number(b)-Number(a)),
    status:[...new Set(state.projects.map(p=>p.status).filter(Boolean))].sort()
  };
  Object.entries(sets).forEach(([id,vals])=>{
    const el=$("#"+id); if(!el)return;
    const current=el.value; const first=el.options[0]; el.innerHTML=""; el.appendChild(first);
    vals.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;el.appendChild(o);});
    el.value=vals.includes(current)?current:"";
  });
}

function applyFilters(){
  const q=($("#search")?.value||"").trim().toLowerCase(), cat=$("#category")?.value||"", reg=$("#region")?.value||"", year=$("#year")?.value||"", status=$("#status")?.value||"";
  state.filtered=state.projects.filter(p=>{
    const hay=[p.name,p.city,p.region,p.category,p.description,p.status,p.sourceName].join(" ").toLowerCase();
    return (!q||hay.includes(q))&&(!cat||p.category===cat)&&(!reg||p.region===reg)&&(!year||String(p.year)===year)&&(!status||p.status===status);
  });
  render(); updateMap(); renderActiveFilters();
}
function renderActiveFilters(){
  const parts=[]; const map=[["search","⌕"],["category",""],["region",""],["year",""],["status",""]];
  map.forEach(([id,prefix])=>{const v=$("#"+id)?.value;if(v)parts.push(`${prefix}${escapeHtml(v)}`);});
  $("#activeFilters").innerHTML=parts.length?parts.join(" · "):"";
}
function render(){
  const grid=$("#projectGrid"), empty=$("#emptyState"); if(!grid)return;
  grid.innerHTML="";
  $("#resultCount").textContent=`${state.filtered.length} / ${state.projects.length}`;
  if(!state.filtered.length){empty.hidden=false;return;} empty.hidden=true;
  state.filtered.forEach(p=>{
    const card=document.createElement("article"); card.className="card";
    card.innerHTML=`<div class="card-top"><span class="tag">${escapeHtml(p.category||"Project")}</span>${p.verified?`<span class="verified">✓ ${tr("verified")}</span>`:""}</div>
      <h3>${escapeHtml(p.name)}</h3><div class="meta">📍 ${escapeHtml(p.city||"—")} · ${escapeHtml(p.region||"—")}</div>
      <p>${escapeHtml(p.description||"")}</p>
      <div class="card-footer"><span class="status">${escapeHtml(p.status||"—")} · ${escapeHtml(p.year||"—")}</span><button class="details-btn" data-id="${p.id}">${tr("details")} →</button></div>`;
    grid.appendChild(card);
  });

}
function updateStats(){
  $("#statProjects").textContent=state.projects.length;
  $("#statRegions").textContent=new Set(state.projects.map(p=>p.region).filter(Boolean)).size;
  $("#statCities").textContent=new Set(state.projects.map(p=>p.city).filter(Boolean)).size;
  $("#statCategories").textContent=new Set(state.projects.map(p=>p.category).filter(Boolean)).size;
  const counts={};state.projects.forEach(p=>counts[p.category]=(counts[p.category]||0)+1);
  const top=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
  $("#topCategory").textContent=top?top[0]:"—";$("#topCategoryCount").textContent=top?`${top[1]} ${tr("projects").toLowerCase()}`:"";
  const latest=Math.max(...state.projects.map(p=>Number(p.year)||0));$("#latestYear").textContent=latest||"—";$("#latestYearCount").textContent=`${state.projects.filter(p=>Number(p.year)===latest).length} ${tr("projects").toLowerCase()}`;
  $("#verifiedCount").textContent=state.projects.filter(p=>p.verified).length;
  $("#activeCount").textContent=state.projects.filter(p=>!/completed|complete|finished/i.test(p.status||"")).length;
}

function initMap(){
  if(!window.L){$("#mapError").hidden=false;$("#mapError").textContent=tr("mapError");return;}
  state.map=L.map("projectsMap",{scrollWheelZoom:true,zoomControl:true}).setView([31.7917,-7.0926],5.4);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; OpenStreetMap contributors',maxZoom:19}).addTo(state.map);
  state.markers=L.layerGroup().addTo(state.map);
  updateMap();
}
function updateMap(){
  if(!state.map||!state.markers)return;
  state.markers.clearLayers();const points=[];
  state.filtered.forEach(p=>{
    if(!Number.isFinite(Number(p.lat))||!Number.isFinite(Number(p.lng)))return;
    const marker=L.circleMarker([p.lat,p.lng],{radius:8,color:"#fff",weight:2,fillColor:"#006233",fillOpacity:.95});
    marker.bindPopup(`<strong>${escapeHtml(p.name)}</strong><br><small>${escapeHtml(p.city||"")} · ${escapeHtml(p.category||"")}</small><br><button class="popup-link" onclick="window.__openProject(${Number(p.id)})">${escapeHtml(tr("details"))} →</button>`);
    marker.addTo(state.markers);points.push([p.lat,p.lng]);
  });
  $("#mapCount").textContent=`${state.filtered.length} ${tr("projects").toLowerCase()}`;
  if(points.length&&state.map._loaded)state.map.fitBounds(points,{padding:[30,30],maxZoom:8});
}
window.__openProject=id=>openModal(id);

function openModal(id){
  const p=state.projects.find(x=>String(x.id)===String(id));
  const modal=$("#modal"), content=$("#modalContent");
  if(!modal||!content)return;

  if(!p){
    content.innerHTML=`<div class="modal-fallback"><div class="modal-icon">!</div><h2>${escapeHtml(tr("noResults"))}</h2><p>${escapeHtml(tr("noMatch"))}</p></div>`;
  }else{
    const sourceUrl = typeof p.source==="string" && /^https?:\/\//i.test(p.source) ? p.source : "";
    const safeSource = sourceUrl ? escapeHtml(sourceUrl) : "";
    const title = escapeHtml(p.name || "Untitled project");
    const category = escapeHtml(p.category || "Project");
    const city = escapeHtml(p.city || "—");
    const region = escapeHtml(p.region || "—");
    const description = escapeHtml(p.description || "No description available.");
    const status = escapeHtml(p.status || "—");
    const year = escapeHtml(p.year || "—");
    const budget = escapeHtml(p.budget ?? "—");
    const jobs = escapeHtml(p.jobs ?? "—");
    const sourceName = escapeHtml(p.sourceName || tr("source"));

    content.innerHTML=`
      <div class="modal-project">
        <div class="modal-title">
          <span class="tag">${category}</span>
          ${p.verified ? `<span class="verified">✓ ${escapeHtml(tr("verified"))}</span>` : ""}
          <h2 id="modalTitle">${title}</h2>
          <div class="modal-meta">📍 ${city} · ${region}</div>
        </div>
        <p class="modal-description">${description}</p>
        <div class="modal-data">
          <div><small>${escapeHtml(tr("status"))}</small><b>${status}</b></div>
          <div><small>${escapeHtml(tr("year"))}</small><b>${year}</b></div>
          <div><small>${escapeHtml(tr("budget"))}</small><b>${budget}</b></div>
          <div><small>${escapeHtml(tr("jobs"))}</small><b>${jobs}</b></div>
        </div>
        <div class="modal-source">
          <small>${escapeHtml(tr("source"))}</small>
          <strong>${sourceName}</strong>
        </div>
        <div class="modal-actions">
          ${safeSource ? `<a class="btn primary" href="${safeSource}" target="_blank" rel="noopener noreferrer">${escapeHtml(tr("source"))} ↗</a>` : ""}
          <button class="btn ghost" type="button" data-close-modal>${state.lang==="ar"?"إغلاق":state.lang==="fr"?"Fermer":"Close"}</button>
        </div>
      </div>`;
  }

  modal.hidden=false;
  modal.setAttribute("aria-hidden","false"); modal.querySelector(".modal-card")?.setAttribute("aria-labelledby","modalTitle");
  document.body.style.overflow="hidden";
  modal.querySelectorAll("[data-close-modal]").forEach(x=>x.addEventListener("click",closeModal));
  const close=modal.querySelector(".modal-close");
  if(close)close.focus();
}
function closeModal(){$("#modal").hidden=true;$("#modal").setAttribute("aria-hidden","true");document.body.style.overflow="";}
function runBot(){
  const q=($("#botInput")?.value||"").trim().toLowerCase();
  if(!q){$("#botAnswer").textContent=tr("ask");return;}
  const words=q.split(/\s+/).filter(w=>w.length>2);
  const found=state.projects.filter(p=>words.some(w=>[p.name,p.city,p.region,p.category,p.description,p.status].join(" ").toLowerCase().includes(w)));
  $("#botAnswer").textContent=found.length?`📍 ${tr("found")} ${found.length} ${tr("matches")}: ${found.slice(0,5).map(p=>p.name).join(", ")}.`:tr("noMatch");
  if(found.length){$("#search").value=words.join(" ");applyFilters();}
}
function locate(){
  if(!navigator.geolocation){$("#botAnswer").textContent=tr("locationDenied");return;}
  $("#locateBtn").disabled=true;
  navigator.geolocation.getCurrentPosition(pos=>{state.map?.setView([pos.coords.latitude,pos.coords.longitude],12);$("#locateBtn").disabled=false;},()=>{alert(tr("locationDenied"));$("#locateBtn").disabled=false;},{enableHighAccuracy:true,timeout:8000});
}

async function init(){
  try{
    const r=await fetch("data/projects.json",{cache:"no-store"});if(!r.ok)throw new Error(`projects.json: ${r.status}`);
    state.projects=await r.json();state.filtered=[...state.projects];
    populateFilters();updateStats();setLanguage(state.lang);initMap();
  }catch(e){console.error(e);$("#projectGrid").innerHTML=`<article class="card"><h3>⚠️ ${escapeHtml(e.message)}</h3></article>`;$("#mapError").hidden=false;$("#mapError").textContent=tr("mapError");}
}
document.addEventListener("DOMContentLoaded",()=>{
  if(localStorage.getItem("mp-theme")==="dark")document.body.classList.add("dark");
  $("#themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("mp-theme",document.body.classList.contains("dark")?"dark":"light");});
  $("#langBtn").addEventListener("click",cycleLanguage);$("#heroSearchBtn").addEventListener("click",()=>{$("#search").focus();document.querySelector("#projects").scrollIntoView({behavior:"smooth"});});
  $("#projectGrid").addEventListener("click",e=>{const b=e.target.closest(".details-btn");if(b)openModal(b.dataset.id);});
  ["search","category","region","year","status"].forEach(id=>{const el=$("#"+id);el.addEventListener(id==="search"?"input":"change",applyFilters);});
  $("#resetFilters").addEventListener("click",()=>{["search","category","region","year","status"].forEach(id=>{$("#"+id).value=""});applyFilters();});
  $("#emptyReset").addEventListener("click",()=>$("#resetFilters").click());
  $("#fitMap").addEventListener("click",()=>updateMap());$("#centerMap").addEventListener("click",()=>state.map?.setView([31.7917,-7.0926],5.4));$("#locateBtn").addEventListener("click",locate);
  $("#botBtn").addEventListener("click",runBot);$("#botInput").addEventListener("keydown",e=>{if(e.key==="Enter")runBot();});
  document.querySelectorAll("[data-close-modal]").forEach(x=>x.addEventListener("click",closeModal));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
  init();
});
})();