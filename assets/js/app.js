const $=s=>document.querySelector(s);
const state={projects:[],filtered:[],lang:"fr",map:null,markers:[]};
const text={
 fr:{
  hero:"Explorez les projets à travers le Maroc",
  sub:"Carte interactive, annuaire consultable et tableau de bord des projets.",
  projects:"Projets",regions:"Régions",sectors:"Secteurs",active:"Actifs",
  all:"Tous",search:"Rechercher un projet, une ville, une région…",
  details:"Voir les détails",source:"Source",status:"Statut",year:"Année",
  budget:"Budget",jobs:"Emplois",location:"Localisation",no:"Aucun projet trouvé",
  map:"Carte",dashboard:"Tableau de bord",browse:"Parcourir les projets",
  mapTitle:"Carte interactive du Maroc",reset:"Réinitialiser la vue",
  directory:"Annuaire",allSectors:"Tous les secteurs",allRegions:"Toutes les régions",
  allStatuses:"Tous les statuts",project:"Projet",close:"Fermer",
  developed:"Développé par"
 },
 en:{
  hero:"Explore projects across Morocco",
  sub:"Interactive map, searchable directory and project intelligence dashboard.",
  projects:"Projects",regions:"Regions",sectors:"Sectors",active:"Active",
  all:"All",search:"Search projects, cities, regions…",
  details:"View details",source:"Source",status:"Status",year:"Year",
  budget:"Budget",jobs:"Jobs",location:"Location",no:"No projects found",
  map:"Map",dashboard:"Dashboard",browse:"Browse projects",
  mapTitle:"Interactive Morocco Map",reset:"Reset view",
  directory:"Directory",allSectors:"All sectors",allRegions:"All regions",
  allStatuses:"All statuses",project:"Project",close:"Close",
  developed:"Developed by"
 },
 ar:{
  hero:"كتاشف المشاريع اللي كاينة فالمغرب",
  sub:"خريطة تفاعلية، دليل ديال المشاريع، ولوحة معلومات باش تكتاشف المشاريع بسهولة.",
  projects:"المشاريع",regions:"الجهات",sectors:"القطاعات",active:"المشاريع النشيطة",
  all:"الكل",search:"قلب على مشروع، مدينة، ولا جهة…",
  details:"شوف التفاصيل",source:"المصدر",status:"الحالة",year:"السنة",
  budget:"الميزانية",jobs:"مناصب الشغل",location:"المكان",no:"ما لقاينا حتى مشروع",
  map:"الخريطة",dashboard:"لوحة المعلومات",browse:"شوف المشاريع",
  mapTitle:"الخريطة التفاعلية ديال المغرب",reset:"رجّع الخريطة",
  directory:"دليل المشاريع",allSectors:"جميع القطاعات",allRegions:"جميع الجهات",
  allStatuses:"جميع الحالات",project:"مشروع",close:"سد",
  developed:"طوّرو"
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
function renderMarkers(){
 state.markers.forEach(m=>m.remove()); state.markers=[];
 state.filtered.forEach(p=>{
   const c=coords(p); if(c.some(Number.isNaN)) return;
   const m=L.marker(c).addTo(state.map).bindPopup(`<strong>${esc(p.name)}</strong><br>${esc(p.city||p.region||"")}<br><button class="popup-link" data-id="${esc(p.id)}">${esc(t("details"))}</button>`);
   m.on("popupopen",e=>{const b=e.popup.getElement()?.querySelector(".popup-link"); if(b)b.onclick=()=>openProject(b.dataset.id)});
   state.markers.push(m);
 });
}
function renderStats(){
 $("#statProjects").textContent=state.projects.length;
 $("#statRegions").textContent=new Set(state.projects.map(p=>p.region).filter(Boolean)).size;
 $("#statCategories").textContent=new Set(state.projects.map(p=>p.category).filter(Boolean)).size;
 $("#statActive").textContent=state.projects.filter(p=>/active|ongoing|in progress|actif|en cours|نشط/i.test(p.status||"")).length;
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
 const q=$("#search").value.trim().toLowerCase(), cat=$("#category").value, reg=$("#region").value, st=$("#status").value;
 state.filtered=state.projects.filter(p=>{
   const hay=[p.name,p.description,p.city,p.region,p.category].join(" ").toLowerCase();
   return (!q||hay.includes(q))&&(!cat||p.category===cat)&&(!reg||p.region===reg)&&(!st||p.status===st);
 });
 renderCards(); renderMarkers();
}
function openProject(id){
 const p=state.projects.find(x=>String(x.id)===String(id)); if(!p)return;
 const modal=$("#projectModal");
 $("#modalContent").innerHTML=`<span class="tag">${esc(p.category||"Project")}</span><h2>${esc(p.name)}</h2><p>${esc(p.description||"")}</p><div class="detail-grid"><div><small>${esc(t("location"))}</small><b>${esc(p.city||"—")} · ${esc(p.region||"—")}</b></div><div><small>${esc(t("status"))}</small><b>${esc(p.status||"—")}</b></div><div><small>${esc(t("year"))}</small><b>${esc(p.year||"—")}</b></div><div><small>${esc(t("budget"))}</small><b>${esc(p.budget||"—")}</b></div><div><small>${esc(t("jobs"))}</small><b>${esc(p.jobs||"—")}</b></div><div><small>${esc(t("source"))}</small><b>${esc(p.sourceName||"—")}</b></div></div>${p.source?`<a class="btn primary" href="${esc(p.source)}" target="_blank" rel="noopener">${esc(t("source"))} ↗</a>`:""}`;
 modal.hidden=false; modal.setAttribute("aria-hidden","false");
}
function closeModal(){$("#projectModal").hidden=true;$("#projectModal").setAttribute("aria-hidden","true")}
function applyLang(){
 const x=text[state.lang];
 document.documentElement.lang=state.lang;
 document.documentElement.dir=state.lang==="ar"?"rtl":"ltr";
 $("#heroTitle").textContent=x.hero;
 $("#heroText").textContent=x.sub;
 $("#lblProjects").textContent=x.projects;
 $("#lblRegions").textContent=x.regions;
 $("#lblCategories").textContent=x.sectors;
 $("#lblActive").textContent=x.active;
 $("#search").placeholder=x.search;
 document.querySelectorAll("nav a")[0].textContent=x.map;
 document.querySelectorAll("nav a")[1].textContent=x.dashboard;
 document.querySelectorAll("nav a")[2].textContent=x.browse;
 document.querySelector("#map .section-head h2").textContent=x.mapTitle;
 document.querySelector("#resetMap").textContent=x.reset;
 document.querySelector("#projects .section-head h2").textContent=x.directory;
 const selects=[
   ["#category",x.allSectors],
   ["#region",x.allRegions],
   ["#status",x.allStatuses]
 ];
 selects.forEach(([sel,label])=>{
   const el=$(sel);
   if(el && el.options.length) el.options[0].textContent=label;
 });
}
async function boot(){
 const r=await fetch("data/projects.json?v=6.0.2"); state.projects=await r.json(); state.filtered=[...state.projects];
 fillSelect("#category","category");fillSelect("#region","region");fillSelect("#status","status");
 renderStats();applyLang();initMap();renderCards();
 ["search","category","region","status"].forEach(id=>$( "#"+id).addEventListener("input",apply));
 $("#projectGrid").addEventListener("click",e=>{const b=e.target.closest(".details");if(b)openProject(b.dataset.id)});
 $("#resetMap").onclick=()=>state.map.setView([31.7917,-7.0926],5.5);
 document.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeModal);
 document.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{
  state.lang=b.dataset.lang;
  applyLang();
  renderCards();
  renderMarkers();
});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
}
boot().catch(e=>{console.error(e);$("#projectGrid").innerHTML=`<div class="card"><h3>Unable to load project data.</h3></div>`});