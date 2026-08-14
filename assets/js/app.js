const $=s=>document.querySelector(s);
const state={projects:[],filtered:[],lang:"fr",map:null,markers:[]};
const text={
 fr:{
  hero:"Explorez les projets à travers le Maroc",sub:"Carte interactive, annuaire consultable et tableau de bord des projets.",
  projects:"Projets",regions:"Régions",sectors:"Secteurs",active:"Actifs",all:"Tous",
  search:"Rechercher un projet, une ville, une région…",details:"Voir les détails",source:"Source",status:"Statut",year:"Année",
  budget:"Budget",jobs:"Emplois",location:"Localisation",no:"Aucun projet trouvé",map:"Carte",dashboard:"Tableau de bord",browse:"Projets",
  mapTitle:"Carte interactive du Maroc",reset:"Réinitialiser",locate:"Ma position",directory:"Annuaire",
  allSectors:"Tous les secteurs",allRegions:"Toutes les régions",allStatuses:"Tous les statuts",allYears:"Toutes les années",
  project:"Projet",close:"Fermer",developed:"Développé par",mapLegend:"Légende",insights:"APERÇU",overview:"Vue d’ensemble",
  latest:"DERNIÈRE ANNÉE",latestText:"Dernière année présente dans les données",share:"Partager",copied:"Lien copié",
  verified:"Vérifié",official:"Source officielle",coordinates:"Coordonnées",locating:"Localisation…",
  locationDenied:"La localisation n’est pas disponible.",noCoords:"Coordonnées indisponibles"
 },
 en:{
  hero:"Explore projects across Morocco",sub:"Interactive map, searchable directory and project intelligence dashboard.",
  projects:"Projects",regions:"Regions",sectors:"Sectors",active:"Active",all:"All",
  search:"Search projects, cities, regions…",details:"View details",source:"Source",status:"Status",year:"Year",
  budget:"Budget",jobs:"Jobs",location:"Location",no:"No projects found",map:"Map",dashboard:"Dashboard",browse:"Projects",
  mapTitle:"Interactive Morocco Map",reset:"Reset view",locate:"Locate me",directory:"Project directory",
  allSectors:"All sectors",allRegions:"All regions",allStatuses:"All statuses",allYears:"All years",
  project:"Project",close:"Close",developed:"Developed by",mapLegend:"Legend",insights:"INSIGHTS",overview:"Project overview",
  latest:"LATEST YEAR",latestText:"Latest year available in the dataset",share:"Share",copied:"Link copied",
  verified:"Verified",official:"Official source",coordinates:"Coordinates",locating:"Locating…",
  locationDenied:"Location is unavailable.",noCoords:"Coordinates unavailable"
 },
 ar:{
  hero:"كتاشف المشاريع اللي كاينة فالمغرب",sub:"خريطة تفاعلية، دليل ديال المشاريع، ولوحة معلومات باش تكتاشف المشاريع بسهولة.",
  projects:"المشاريع",regions:"الجهات",sectors:"القطاعات",active:"المشاريع النشيطة",all:"الكل",
  search:"قلب على مشروع، مدينة، ولا جهة…",details:"شوف التفاصيل",source:"المصدر",status:"الحالة",year:"السنة",
  budget:"الميزانية",jobs:"مناصب الشغل",location:"المكان",no:"ما لقاينا حتى مشروع",map:"الخريطة",dashboard:"لوحة المعلومات",browse:"المشاريع",
  mapTitle:"الخريطة التفاعلية ديال المغرب",reset:"رجّع الخريطة",locate:"حدّد موقعي",directory:"دليل المشاريع",
  allSectors:"جميع القطاعات",allRegions:"جميع الجهات",allStatuses:"جميع الحالات",allYears:"جميع السنوات",
  project:"مشروع",close:"سد",developed:"طوّرو",mapLegend:"المفتاح",insights:"نظرة عامة",overview:"نظرة على المشاريع",
  latest:"آخر سنة",latestText:"آخر سنة كاينة فالمعطيات",share:"شارك",copied:"تنسخ الرابط",
  verified:"موثّق",official:"المصدر الرسمي",coordinates:"الإحداثيات",locating:"كنحددو الموقع…",
  locationDenied:"الموقع الجغرافي ما متاحش.",noCoords:"الإحداثيات ما متوفراش"
 }}
function t(k){return text[state.lang][k]||k}
function esc(v){return String(v??"—").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function coords(p){return [Number(p.lat??p.latitude),Number(p.lng??p.lon??p.longitude)]}
function unique(key){return [...new Set(state.projects.map(p=>p[key]).filter(Boolean))].sort()}
function fillSelect(id,key){const el=$(id);unique(key).forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;el.appendChild(o)})}
function initMap(){
 state.map=L.map("mapCanvas").setView([31.7917,-7.0926],5.5);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(state.map);
 renderMarkers();
}
const categoryIcon={Transport:"🚆",Water:"💧",Health:"🏥",Technology:"💡",Agriculture:"🌾",Infrastructure:"🏗️",Tourism:"🏨",Digital:"💻"};
function renderMarkers(){
 state.markers.forEach(m=>m.remove()); state.markers=[];
 const categories=[...new Set(state.filtered.map(p=>p.category).filter(Boolean))];
 $("#mapLegend").innerHTML=`<span class="legend-title">${esc(t("mapLegend"))}</span>`+categories.slice(0,8).map(c=>`<span><b>${categoryIcon[c]||"📍"}</b>${esc(c)}</span>`).join("");
 state.filtered.forEach(p=>{
   const c=coords(p); if(c.some(Number.isNaN)) return;
   const icon=L.divIcon({className:"project-marker",html:`<span>${categoryIcon[p.category]||"📍"}</span>`,iconSize:[38,38],iconAnchor:[19,38],popupAnchor:[0,-34]});
   const m=L.marker(c,{icon}).addTo(state.map).bindPopup(`<strong>${esc(p.name)}</strong><br>${esc(p.city||p.region||"")}<br><button class="popup-link" data-id="${esc(p.id)}">${esc(t("details"))}</button>`);
   m.on("popupopen",e=>{const b=e.popup.getElement()?.querySelector(".popup-link");if(b)b.onclick=()=>openProject(b.dataset.id)});
   state.markers.push(m);
 });
}
function renderStats(){
 $("#statProjects").textContent=state.projects.length;
 $("#statRegions").textContent=new Set(state.projects.map(p=>p.region).filter(Boolean)).size;
 $("#statCategories").textContent=new Set(state.projects.map(p=>p.category).filter(Boolean)).size;
 $("#statActive").textContent=state.projects.filter(p=>/active|ongoing|in progress|actif|en cours|نشط|nchiط/i.test(p.status||"")).length;
 const years=state.projects.map(p=>Number(p.year)).filter(Number.isFinite);
 $("#latestYear").textContent=years.length?Math.max(...years):"—";
 const counts={}; state.projects.forEach(p=>{const k=p.category||t("project");counts[k]=(counts[k]||0)+1});
 const entries=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
 const max=entries[0]?.[1]||1;
 $("#categoryBreakdown").innerHTML=entries.slice(0,6).map(([k,v])=>`<div class="break-row"><div><span>${esc(k)}</span><b>${v}</b></div><i><em style="width:${Math.round(v/max*100)}%"></em></i></div>`).join("");
}
function renderCards(){
 const grid=$("#projectGrid"); grid.innerHTML="";
 $("#resultCount").textContent=`${state.filtered.length} ${t("projects").toLowerCase()}`;
 if(!state.filtered.length){grid.innerHTML=`<div class="card"><h3>${esc(t("no"))}</h3></div>`;return}
 state.filtered.forEach(p=>{
   const card=document.createElement("article"); card.className="card";
   card.innerHTML=`<span class="tag">${esc(p.category||"Project")}</span><h3>${esc(p.name)}</h3><p>${esc(p.description||"")}</p><div class="meta">📍 ${esc(p.city||"—")} · ${esc(p.region||"—")}</div><button class="btn primary details" data-id="${esc(p.id)}">${esc(t("details"))}</button>`;
   grid.appendChild(card);
 });
}
function apply(){
 const q=$("#search").value.trim().toLowerCase(), cat=$("#category").value, reg=$("#region").value, st=$("#status").value, yr=$("#year").value;
 state.filtered=state.projects.filter(p=>{
   const hay=[p.name,p.description,p.city,p.region,p.category,p.status,p.sourceName].join(" ").toLowerCase();
   return (!q||hay.includes(q))&&(!cat||p.category===cat)&&(!reg||p.region===reg)&&(!st||p.status===st)&&(!yr||String(p.year)===yr);
 });
 renderCards(); renderMarkers();
}
function openProject(id){
 const p=state.projects.find(x=>String(x.id)===String(id)); if(!p)return;
 const modal=$("#projectModal");
 const shareUrl=`${location.origin}${location.pathname}#project=${encodeURIComponent(p.id)}`;
 $("#modalContent").innerHTML=`<div class="modal-top"><span class="tag">${esc(p.category||t("project"))}</span>${p.verified?`<span class="verified">✓ ${esc(t("verified"))}</span>`:""}</div>
 <h2>${esc(p.name)}</h2><p class="modal-description">${esc(p.description||"")}</p>
 <div class="detail-grid">
  <div><small>${esc(t("location"))}</small><b>${esc(p.city||"—")} · ${esc(p.region||"—")}</b></div>
  <div><small>${esc(t("status"))}</small><b>${esc(p.status||"—")}</b></div>
  <div><small>${esc(t("year"))}</small><b>${esc(p.year||"—")}</b></div>
  <div><small>${esc(t("budget"))}</small><b>${esc(p.budget||"—")}</b></div>
  <div><small>${esc(t("jobs"))}</small><b>${esc(p.jobs||"—")}</b></div>
  <div><small>${esc(t("coordinates"))}</small><b>${Number.isFinite(Number(p.lat))?`${p.lat}, ${p.lng}`:t("noCoords")}</b></div>
 </div>
 <div class="modal-actions">${p.source?`<a class="btn primary" href="${esc(p.source)}" target="_blank" rel="noopener noreferrer">${esc(t("official"))} ↗</a>`:""}<button class="btn ghost" id="shareProject">${esc(t("share"))}</button></div>
 <div id="shareFeedback" class="share-feedback" aria-live="polite"></div>`;
 modal.hidden=false; modal.setAttribute("aria-hidden","false");
 history.replaceState(null,"",`#project=${encodeURIComponent(p.id)}`);
 $("#shareProject").onclick=async()=>{
   try{await navigator.clipboard.writeText(shareUrl);$("#shareFeedback").textContent=t("copied")}
   catch{prompt("Copy this link:",shareUrl)}
 };
}
function closeModal(){$("#projectModal").hidden=true;$("#projectModal").setAttribute("aria-hidden","true")}
function applyLang(){
 const x=text[state.lang];
 document.documentElement.lang=state.lang; document.documentElement.dir=state.lang==="ar"?"rtl":"ltr";
 $("#heroTitle").textContent=x.hero;$("#heroText").textContent=x.sub;
 $("#lblProjects").textContent=x.projects;$("#lblRegions").textContent=x.regions;$("#lblCategories").textContent=x.sectors;$("#lblActive").textContent=x.active;
 $("#search").placeholder=x.search; $("#heroMap").textContent=x.map;$("#heroBrowse").textContent=x.browse;
 const nav=document.querySelectorAll("nav a"); nav[0].textContent=x.map;nav[1].textContent=x.dashboard;nav[2].textContent=x.browse;
 $("#mapEyebrow").textContent=x.map;$("#map .section-head h2").textContent=x.mapTitle;$("#resetMap").textContent=x.reset;$("#locateMe").textContent=`📍 ${x.locate}`;
 $("#projects .section-head h2").textContent=x.directory;
 $("#insightEyebrow").textContent=x.insights;$("#insightTitle").textContent=x.overview;$("#latestEyebrow").textContent=x.latest;$("#latestText").textContent=x.latestText;
 $("#developedBy").textContent=x.developed;
 [["#category",x.allSectors],["#region",x.allRegions],["#status",x.allStatuses],["#year",x.allYears]].forEach(([sel,label])=>{const el=$(sel);if(el&&el.options.length)el.options[0].textContent=label});
 renderStats();
}

function initTheme(){
 const saved=localStorage.getItem("morocco-projects-theme");
 const dark=saved==="dark";
 document.documentElement.dataset.theme=dark?"dark":"light";
 const b=$("#themeToggle");
 if(b){
   b.textContent=dark?"☀️":"🌙";
   b.title=dark?"Light mode":"Dark mode";
   b.setAttribute("aria-label",dark?"Switch to light mode":"Switch to dark mode");
   b.onclick=()=>{
     const isDark=document.documentElement.dataset.theme==="dark";
     document.documentElement.dataset.theme=isDark?"light":"dark";
     localStorage.setItem("morocco-projects-theme",isDark?"light":"dark");
     b.textContent=isDark?"🌙":"☀️";
     b.title=isDark?"Dark mode":"Light mode";
     b.setAttribute("aria-label",isDark?"Switch to dark mode":"Switch to light mode");
   };
 }
}

function fillYear(){
 const el=$("#year"); [...new Set(state.projects.map(p=>p.year).filter(Boolean))].sort((a,b)=>b-a).forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;el.appendChild(o)});
}
function openHashProject(){
 const m=location.hash.match(/^#project=(.+)$/); if(m)openProject(decodeURIComponent(m[1]));
}

async function boot(){
 initTheme();
 const r=await fetch("data/projects.json?v=6.1.0"); state.projects=await r.json(); state.filtered=[...state.projects];
 fillSelect("#category","category");fillSelect("#region","region");fillSelect("#status","status");fillYear();
 renderStats();applyLang();initMap();renderCards();
 ["search","category","region","status","year"].forEach(id=>$( "#"+id).addEventListener("input",apply));
 $("#projectGrid").addEventListener("click",e=>{const b=e.target.closest(".details");if(b)openProject(b.dataset.id)});
 $("#resetMap").onclick=()=>state.map.setView([31.7917,-7.0926],5.5);
 $("#locateMe").onclick=()=>{
   if(!navigator.geolocation){alert(t("locationDenied"));return}
   $("#locateMe").textContent=`📍 ${t("locating")}`;
   navigator.geolocation.getCurrentPosition(pos=>{state.map.setView([pos.coords.latitude,pos.coords.longitude],12);$("#locateMe").textContent=`📍 ${t("locate")}`},()=>{alert(t("locationDenied"));$("#locateMe").textContent=`📍 ${t("locate")}`},{enableHighAccuracy:true,timeout:8000});
 };
 document.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeModal);
 document.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{
  state.lang=b.dataset.lang;
  applyLang();
  renderCards();
  renderMarkers();
});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()}); window.addEventListener("hashchange",openHashProject); openHashProject();
}
boot().catch(e=>{console.error(e);$("#projectGrid").innerHTML=`<div class="card"><h3>Unable to load project data.</h3></div>`});