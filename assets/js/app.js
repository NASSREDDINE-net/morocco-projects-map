let projects=[];
const $=s=>document.querySelector(s);

const i18n={
 en:{
  navMap:"Map",navProjects:"Projects",navAbout:"About",heroTitle:'Discover projects<br><span>across Morocco.</span>',
  heroText:"Explore a growing, structured map of projects, initiatives and innovation across Moroccan cities and regions.",
  exploreMap:"Explore map",browseProjects:"Browse projects",botHero:"Ask about a project, city or category.",
  botTry:"Try: “technology projects in Tangier”",projects:"Projects",regions:"Regions",demoCities:"Demo cities",demoPeriod:"Demo period",
  explore:"EXPLORE",projectMap:"Project map",projectLocation:"Project location",
  mapNotice:"V1 uses a lightweight interactive map canvas with demo coordinates. No external map service or API key is required.",
  directory:"DIRECTORY",allCategories:"All categories",allYears:"All years",
  findWhat:"Find what you need.",botText:"V1 Bot searches the local project dataset instantly — private, fast and GitHub Pages compatible.",
  search:"Search",aboutTitle:"Open, lightweight, extensible.",
  aboutText:"Morocco Projects Map is designed as an open project directory. V1 is static and uses JSON data, making it easy to host on GitHub Pages and expand later with verified datasets, richer maps and a real assistant.",
  footerV1:"V1 · Open Project",searchPlaceholder:"🔎 Search project, city or region...",botPlaceholder:"Ask: projects in Rabat",
  results:"result",noProjects:"No projects found",tryAnother:"Try another search or filter.",
  found:"I found",matches:"matching project(s)",noMatch:"No matching demo project found. Try “Rabat”, “technology”, “energy” or “environment”.",
  ask:"Try asking about a city, category or project."
 },
 darija:{
  navMap:"الخريطة",navProjects:"المشاريع",navAbout:"على المشروع",heroTitle:'كتاشف المشاريع<br><span>فالمغرب.</span>',
  heroText:"كتاشف مجموعة منظمة ومتطورة ديال المشاريع والمبادرات والابتكار فالمدن والجهات المغربية.",
  exploreMap:"شوف الخريطة",browseProjects:"شوف المشاريع",botHero:"سول على مشروع، مدينة ولا مجال.",
  botTry:"جرب: «مشاريع التكنولوجيا فطنجة»",projects:"المشاريع",regions:"الجهات",demoCities:"مدن تجريبية",demoPeriod:"الفترة التجريبية",
  explore:"استكشف",projectMap:"خريطة المشاريع",projectLocation:"موقع المشروع",
  mapNotice:"V1 فيها خريطة تفاعلية خفيفة بإحداثيات تجريبية، وما كتحتاج لا خدمة خرائط خارجية لا API Key.",
  directory:"الدليل",allCategories:"جميع المجالات",allYears:"جميع السنوات",
  findWhat:"قلب على اللي بغيتي.",botText:"Map Bot ديال V1 كيقلب مباشرة فبيانات المشاريع المحلية، بسرعة وبلا API.",
  search:"قلب",aboutTitle:"مفتوح، خفيف وقابل للتطوير.",
  aboutText:"Morocco Projects Map هو دليل مفتوح للمشاريع. V1 خدامة بطريقة Static وكتستعمل JSON، وبالتالي مناسبة لـ GitHub Pages، ونقدرو نطوروها ببيانات موثوقة وخريطة أقوى ومساعد ذكي حقيقي.",
  footerV1:"V1 · مشروع مفتوح",searchPlaceholder:"🔎 قلب على مشروع، مدينة ولا جهة...",botPlaceholder:"سول: المشاريع فـ الرباط",
  results:"نتيجة",noProjects:"ما لقيناش مشاريع",tryAnother:"جرب بحث ولا فلتر آخر.",
  found:"لقيت",matches:"مشروع مطابق",noMatch:"ما لقيتش مشروع مطابق فبيانات V1 التجريبية. جرب «الرباط»، «التكنولوجيا»، «الطاقة» ولا «البيئة».",
  ask:"سول على مدينة، مجال ولا مشروع."
 }
};

function setLanguage(lang){
 const t=i18n[lang];
 document.documentElement.lang=lang==="darija"?"ar-MA":"en";
 document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(t[k]!==undefined)el.textContent=t[k]});
 document.querySelectorAll("[data-i18n-html]").forEach(el=>{const k=el.dataset.i18nHtml;if(t[k]!==undefined)el.innerHTML=t[k]});
 document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{const k=el.dataset.i18nPlaceholder;if(t[k]!==undefined)el.placeholder=t[k]});
 $("#langBtn").textContent=lang==="en"?"دارجة":"EN";
 $("#langBtn").title=lang==="en"?"بدل للدارجة":"Switch to English";
 localStorage.mapLang=lang;
 render();
}
async function init(){
 projects=await fetch("data/projects.json").then(r=>r.json());
 $("#statProjects").textContent=projects.length+"+"; if($("#statRegions"))$("#statRegions").textContent=new Set(projects.map(p=>p.region)).size; if($("#statCities"))$("#statCities").textContent=new Set(projects.map(p=>p.city)).size;
 const cats=[...new Set(projects.map(p=>p.category))].sort();
 cats.forEach(c=>$("#category").insertAdjacentHTML("beforeend",`<option>${c}</option>`));
 [...new Set(projects.map(p=>p.year))].sort((a,b)=>b-a).forEach(y=>$("#year").insertAdjacentHTML("beforeend",`<option>${y}</option>`));
 setLanguage(localStorage.mapLang||"darija");
 renderMarkers();
}
function filtered(){
 const q=$("#search").value.toLowerCase(),c=$("#category").value,y=$("#year").value;
 return projects.filter(p=>(!q||[p.name,p.city,p.region,p.category,p.description].join(" ").toLowerCase().includes(q))&&(!c||p.category===c)&&(!y||String(p.year)===y));
}
function render(){
 const t=i18n[localStorage.mapLang||"darija"],list=filtered();
 $("#resultCount").textContent=`${list.length} ${t.results}${list.length!==1?(localStorage.mapLang==="darija"?"":"s"):""}`;
 $("#projectGrid").innerHTML=list.map(p=>`<article class="card">
 <span class="tag">${p.category}</span><span class="verified">✓ ${localStorage.mapLang==="darija"?"موثق":"Verified"}</span>
 <h3>${p.name}</h3>
 <div class="meta">📍 ${p.city} · ${p.region}<br>📅 ${p.year} · ${p.status}${p.budget?`<br>💰 ${p.budget}`:""}${p.jobs?`<br>👥 ${p.jobs}`:""}</div>
 <p>${p.description}</p>
 <div class="source"><small>${p.sourceName}</small><a href="${p.source}" target="_blank" rel="noopener">${localStorage.mapLang==="darija"?"المصدر الرسمي ↗":"Official source ↗"}</a></div>
 </article>`).join("")||`<div class="card"><h3>${t.noProjects}</h3><p>${t.tryAnother}</p></div>`;
}
function renderMarkers(){
 const box=$("#markers");
 projects.forEach(p=>{const x=18+((p.lng+13)/10)*65,y=22+((36-p.lat)/7)*58;
 box.insertAdjacentHTML("beforeend",`<button class="marker" style="left:${Math.min(84,Math.max(15,x))}%;top:${Math.min(82,Math.max(18,y))}%" title="${p.name}" aria-label="${p.name}" onclick="focusProject(${p.id})"></button>`)});
}
function focusProject(id){const p=projects.find(x=>x.id===id);$("#search").value=p.name;render();$("#projects").scrollIntoView({behavior:"smooth"})}
async function bot(){
 const t=i18n[localStorage.mapLang||"darija"],q=$("#botInput").value.trim();
 if(!q){$("#botAnswer").textContent=t.ask;return}
 const ql=q.toLowerCase();
 const f=projects.filter(p=>[p.name,p.city,p.region,p.category,p.description,p.status].join(" ").toLowerCase().includes(ql));
 if(f.length){$("#botAnswer").textContent=`📍 ${t.found} ${f.length} ${t.matches}: ${f.slice(0,5).map(p=>p.name).join(", ")}.`;return}
 const endpoint=window.MAP_BOT_URL;
 if(!endpoint){$("#botAnswer").textContent=t.noMatch;return}
 $("#botAnswer").textContent=localStorage.mapLang==="darija"?"🤖 كنقلب ليك...":"🤖 Thinking...";
 try{const r=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:q,language:localStorage.mapLang==="en"?"en":"darija"})});const d=await r.json();$("#botAnswer").textContent="🤖 "+(d.answer||t.noMatch)}catch{$("#botAnswer").textContent=t.noMatch}
}

$("#search").addEventListener("input",render);
$("#category").addEventListener("change",render);
$("#year").addEventListener("change",render);
$("#botBtn").addEventListener("click",bot);
$("#botInput").addEventListener("keydown",e=>{if(e.key==="Enter")bot()});
$("#themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.theme=document.body.classList.contains("dark")?"dark":"light"});
$("#langBtn").addEventListener("click",()=>setLanguage((localStorage.mapLang||"darija")==="darija"?"en":"darija"));
if(localStorage.theme==="dark")document.body.classList.add("dark");
init();

/* ===== V4.1 CLEAN: Leaflet + OpenStreetMap ===== */
let cleanMap=null;
let cleanMarkers=null;

function mapEscape(v){
  return String(v ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));
}

function mapPopup(p){
  const en=(localStorage.mapLang||"darija")==="en";
  return `
    <div class="project-popup">
      <h3>${mapEscape(p.name)}</h3>
      <span class="status">✓ ${en?"Verified":"موثق"}</span>
      <div class="meta">
        📍 ${mapEscape(p.city)}<br>
        🏷️ ${mapEscape(p.category)}<br>
        📅 ${mapEscape(p.year)}<br>
        🟢 ${mapEscape(p.status)}
      </div>
      <p>${mapEscape(p.description)}</p>
      ${p.source ? `<a href="${mapEscape(p.source)}" target="_blank" rel="noopener">${en?"Official source ↗":"المصدر الرسمي ↗"}</a>` : ""}
    </div>`;
}

function getVisibleProjects(){
  // Use the existing filter function when available.
  try{
    if(typeof filtered==="function") return filtered();
  }catch(e){}
  return Array.isArray(projects) ? projects : [];
}

function drawCleanMarkers(){
  if(!cleanMap || !cleanMarkers) return;
  cleanMarkers.clearLayers();
  const visible=getVisibleProjects();
  const bounds=[];

  visible.forEach(p=>{
    const lat=Number(p.lat), lng=Number(p.lng);
    if(!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    const marker=L.circleMarker([lat,lng],{
      radius:8,
      color:"#ffffff",
      weight:2,
      fillColor:"#c1272d",
      fillOpacity:.95
    });
    marker.bindPopup(mapPopup(p),{maxWidth:320});
    marker.addTo(cleanMarkers);
    bounds.push([lat,lng]);
  });

  if(bounds.length===1){
    cleanMap.setView(bounds[0],10);
  }else if(bounds.length>1){
    cleanMap.fitBounds(bounds,{padding:[35,35],maxZoom:8});
  }
}

function initCleanMap(){
  const el=document.getElementById("projectsMap");
  if(!el || !window.L || cleanMap) return;

  cleanMap=L.map(el,{preferCanvas:true,scrollWheelZoom:true});
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom:19,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
  }).addTo(cleanMap);

  cleanMap.setView([31.7917,-7.0926],5.5);
  cleanMarkers=L.layerGroup().addTo(cleanMap);
  drawCleanMarkers();

  // Leaflet needs a size refresh after layout/resize.
  setTimeout(()=>cleanMap.invalidateSize(),150);
}

function refreshCleanMap(){
  drawCleanMarkers();
}

window.refreshCleanMap=refreshCleanMap;

// Intercept common UI render calls without replacing the original renderer.
document.addEventListener("DOMContentLoaded",()=>{
  const wait=setInterval(()=>{
    if(window.L && Array.isArray(window.projects)){
      clearInterval(wait);
      initCleanMap();
    }
  },50);
  setTimeout(()=>clearInterval(wait),10000);
});

document.addEventListener("input", e=>{
  if(["search","category","year"].includes(e.target?.id)) setTimeout(refreshCleanMap,0);
});
document.addEventListener("change", e=>{
  if(["search","category","year"].includes(e.target?.id)) setTimeout(refreshCleanMap,0);
});

/* ===== V4.2 EXPLORER ===== */
let selectedProject=null;

function projectById(id){
  return (Array.isArray(projects)?projects:[]).find(p=>String(p.id)===String(id));
}
function openProject(id){
  const p=projectById(id); if(!p) return;
  selectedProject=p;
  const en=(localStorage.mapLang||"darija")==="en";
  const drawer=document.getElementById("projectDrawer");
  const content=document.getElementById("drawerContent");
  content.innerHTML=`
    <div class="drawer-kicker">${en?"VERIFIED PROJECT":"مشروع موثق"}</div>
    <h2 class="drawer-title">${mapEscape(p.name)}</h2>
    <div class="drawer-grid">
      <div class="drawer-stat"><small>${en?"City":"المدينة"}</small><strong>${mapEscape(p.city)}</strong></div>
      <div class="drawer-stat"><small>${en?"Region":"الجهة"}</small><strong>${mapEscape(p.region)}</strong></div>
      <div class="drawer-stat"><small>${en?"Category":"المجال"}</small><strong>${mapEscape(p.category)}</strong></div>
      <div class="drawer-stat"><small>${en?"Year":"السنة"}</small><strong>${mapEscape(p.year)}</strong></div>
      <div class="drawer-stat"><small>${en?"Status":"الحالة"}</small><strong>${mapEscape(p.status)}</strong></div>
      <div class="drawer-stat"><small>${en?"Budget":"الميزانية"}</small><strong>${mapEscape(p.budget||"—")}</strong></div>
    </div>
    <p class="drawer-description">${mapEscape(p.description)}</p>
    ${p.source?`<a class="drawer-source" href="${mapEscape(p.source)}" target="_blank" rel="noopener">${en?"Open official source ↗":"فتح المصدر الرسمي ↗"}</a>`:""}
  `;
  drawer.classList.add("open"); drawer.setAttribute("aria-hidden","false");
  document.getElementById("drawerBackdrop").classList.add("open");
}
function closeProject(){
  document.getElementById("projectDrawer")?.classList.remove("open");
  document.getElementById("drawerBackdrop")?.classList.remove("open");
  document.getElementById("projectDrawer")?.setAttribute("aria-hidden","true");
}
function fitCleanMap(){
  if(!cleanMap) return;
  const bounds=[];
  getVisibleProjects().forEach(p=>{
    const lat=Number(p.lat),lng=Number(p.lng);
    if(Number.isFinite(lat)&&Number.isFinite(lng)) bounds.push([lat,lng]);
  });
  if(bounds.length) cleanMap.fitBounds(bounds,{padding:[35,35],maxZoom:8});
}
function centerMorocco(){ if(cleanMap) cleanMap.setView([31.7917,-7.0926],5.5); }

document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("drawerClose")?.addEventListener("click",closeProject);
  document.getElementById("drawerBackdrop")?.addEventListener("click",closeProject);
  document.getElementById("fitMap")?.addEventListener("click",fitCleanMap);
  document.getElementById("locateMap")?.addEventListener("click",centerMorocco);
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeProject();});
});

/* Enhance marker popups with a details button. */
const oldPopup=window.mapPopup;
if(typeof oldPopup==="function"){
  window.mapPopup=function(p){
    const base=oldPopup(p);
    return base.replace('</div>','<div class="popup-actions"><button type="button" onclick="openProject('+JSON.stringify(String(p.id))+')">'+((localStorage.mapLang||"darija")==="en"?"Details":"التفاصيل")+'</button></div></div>');
  };
}

/* Keep map counter in sync. */
function updateMapCounter(){
  const n=getVisibleProjects().length;
  const el=document.getElementById("mapCount");
  if(el) el.textContent=n+" "+(((localStorage.mapLang||"darija")==="en")?"projects":"مشروع");
}
setInterval(updateMapCounter,500);
