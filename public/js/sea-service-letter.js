if (window.__sslBooted) { /* already initialized */ } else {
window.__sslBooted = true;

/* =========================================================
   CONFIG: everything the developer needs to change lives here
   ========================================================= */
const CONFIG = {
  // POST endpoint that stores the request and returns { ref: "NSIPL/CHN/2026/11/422/ST" }.
  // Leave null to run in demo mode (ref generated in the browser).
  submitEndpoint: "/api/sea-service-letter",
  // Show the internal letter preview under the form after submit. Set false in production.
  showInternalPreview: false,
  // Page the QR code points to; it should look up the ref and confirm the letter is genuine.
  verifyUrl: "https://www.nautilusshipping.com/verify-sea-service",
  refPrefix: "NSIPL/CHN",
  refSuffix: "ST",
  issuingCity: "CHENNAI",
  rpslNo: "RPSL - CHN - 012",
  rpslValidTill: "29-12-2026",
  signatory: { name: "Capt. Y.D. Misra", title: "DPA" },
  company: {
    legalName: "NAUTILUS SHIPPING INDIA PVT. LTD.",
    displayName: "Nautilus Shipping India Pvt Ltd",
    address: "1st Floor, Maalavika Centre, 144/145, Kodambakkam High Road, Nungambakkam, Chennai-600034",
    phone: "+91 44 4684 9999",
    web: "www.nautilusshipping.com",
    cin: "U61100KA2007PTC042363",
    emails: ["crew.ops1@nautilusshipping.com", "crew.ops2@nautilusshipping.com"]
  }
};

/* Principal vessel register: replace with the fleet list from your database/API.
   Keys are upper-case vessel names. Letter columns are filled from here. */
const VESSEL_REGISTER = {
  "JSW MIHIRGAD": { imo: "9891048", type: "GENERAL CARGO", grt: "5858", powerKw: "2400", flag: "INDIA", trade: "NCV" },
  "JSW RATANGAD": { imo: "9899167", type: "GENERAL CARGO", grt: "5833", powerKw: "2400", flag: "INDIA", trade: "NCV" }
};

/* Same rank list as the Careers form on nautilusshipping.com, so crew ops sees one vocabulary */
const RANKS = ["Captain (Master)","Chief Officer (Chief Mate)","Second Officer (Second Mate)","Third Officer (Third Mate)","Junior Officer","Deck Cadet","Chief Engineer","Second Engineer","Third Engineer","Fourth Engineer","TME","Electrical Officer (EO)","Electro-Technical Officer (ETO)","Bosun","Able Seaman (AB)","Ordinary Seaman (OS)","Trainee OS","Fitter","Oiler","Wiper","Pumpman","Chief Cook","Cook","Trainee Cook","General Steward","Steward","NCV Master","NCV Mate (Chief Officer)","NCV Second Mate","NCV Third Mate","NCV Junior Officer","NCV Chief Engineer","NCV Second Engineer","NCV Third Engineer","NCV Fourth Engineer"];

/* =========================================================
   Helpers
   ========================================================= */
const $ = s => document.querySelector(s);
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const pad = n => String(n).padStart(2,"0");
const todayISO = () => { const d=new Date(); return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; };
const parseISO = s => { if(!s) return null; const [y,m,d]=s.split("-").map(Number); return new Date(Date.UTC(y,m-1,d)); };
const fmtLetterDate = d => `${pad(d.getUTCDate())}-${MONTHS[d.getUTCMonth()]}-${d.getUTCFullYear()}`; // 16-Apr-2026
const daysInclusive = (a,b) => Math.round((b-a)/86400000)+1;
const esc = s => String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm = s => s.trim().replace(/\s+/g," ");

/* Validation rules (tune patterns to your data) */
const RULES = {
  name:     v => v.length >= 3 && /^[A-Za-z .'-]+$/.test(v) || "Enter your full name as in your CDC (letters only).",
  email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Enter a valid email, like name@example.com.",
  phone:    v => /^\d{6,12}$/.test(v.replace(/[\s-]/g,"")) || "Enter your mobile number without the country code, like 98765 43210.",
  cdc:      v => /^[A-Z]{2,4} ?\d{4,8}$/.test(v) || "Enter your CDC number, like MUM 123456.",
  indos:    v => /^\d{2}[A-Z]{2}\d{4,5}$/.test(v) || "INDoS is 2 digits, 2 letters, then 4 digits, like 24GM1234.",
  passport: v => /^[A-Z]\d{7}$/.test(v) || "Passport number is 1 letter followed by 7 digits, like A1234567."
};

/* =========================================================
   Vessel rows
   ========================================================= */
let vessels = [{ name:"", rank:"", from:"", to:"" }];
const vesselList = $("#vessels");

function buildDatalists(){
  const dl1 = document.createElement("datalist"); dl1.id="vesselNames";
  dl1.innerHTML = Object.keys(VESSEL_REGISTER).map(n=>`<option value="${esc(n)}">`).join("");
  document.body.append(dl1);
}

function renderVessels(){
  const max = todayISO();
  vesselList.innerHTML = vessels.map((v,i)=>`
    <div class="vessel" data-i="${i}">
      <div class="vessel-head">
        <h3>Vessel ${i+1}</h3>
        <span class="days" id="v${i}-days"></span>
        ${vessels.length>1?`<button type="button" class="link-btn" data-remove="${i}">Remove</button>`:""}
      </div>
      <div class="grid">
        <div class="field">
          <label for="v${i}-name">Vessel name</label>
          <input id="v${i}-name" data-k="name" class="upper" list="vesselNames" value="${esc(v.name)}" placeholder="As written in your CDC" autocomplete="off">
          <span class="err" id="v${i}-name-err"></span>
        </div>
        <div class="field">
          <label for="v${i}-rank">Rank on board</label>
          <select id="v${i}-rank" data-k="rank"><option value="">Select rank</option>${RANKS.map(r=>`<option${r===v.rank?" selected":""}>${esc(r)}</option>`).join("")}</select>
          <span class="err" id="v${i}-rank-err"></span>
        </div>
        <div class="field">
          <label for="v${i}-from">Sailed from</label>
          <input id="v${i}-from" data-k="from" type="date" max="${max}" value="${esc(v.from)}">
          <span class="err" id="v${i}-from-err"></span>
        </div>
        <div class="field">
          <label for="v${i}-to">Signed off on</label>
          <input id="v${i}-to" data-k="to" type="date" max="${max}" value="${esc(v.to)}">
          <span class="err" id="v${i}-to-err"></span>
        </div>
      </div>
    </div>`).join("");
  $("#vesselCount").value = vessels.length;
  $("#vcMinus").disabled = vessels.length<=1;
  $("#vcPlus").disabled = vessels.length>=10;
  updateSeaTime();
}

function setVesselCount(n){
  n = Math.max(1, Math.min(10, parseInt(n,10)||1));
  while(vessels.length<n) vessels.push({ name:"", rank:"", from:"", to:"" });
  vessels = vessels.slice(0,n);
  renderVessels();
}

vesselList.addEventListener("input", e=>{
  const card = e.target.closest(".vessel"); if(!card) return;
  const i = +card.dataset.i, k = e.target.dataset.k;
  vessels[i][k] = e.target.value;
  e.target.closest(".field").classList.remove("invalid");
  if(k==="from"||k==="to") updateSeaTime();
});
vesselList.addEventListener("click", e=>{
  const r = e.target.closest("[data-remove]"); if(!r) return;
  vessels.splice(+r.dataset.remove,1); renderVessels();
});
$("#vcMinus").onclick = ()=>setVesselCount(vessels.length-1);
$("#vcPlus").onclick  = ()=>setVesselCount(vessels.length+1);
$("#vesselCount").addEventListener("change", e=>setVesselCount(e.target.value));

/* Sea-time strip */
function updateSeaTime(){
  const spans = vessels.map((v,i)=>({i, name:v.name, a:parseISO(v.from), b:parseISO(v.to)}))
                       .filter(s=>s.a && s.b && s.b>=s.a);
  vessels.forEach((v,i)=>{
    const el = document.getElementById(`v${i}-days`); if(!el) return;
    const a=parseISO(v.from), b=parseISO(v.to);
    el.textContent = (a&&b&&b>=a) ? `${daysInclusive(a,b)} days on board` : "";
  });
  const total = spans.reduce((t,s)=>t+daysInclusive(s.a,s.b),0);
  const months = Math.floor(total/30), rem = total%30;
  $("#seaTotal").innerHTML = `${total}<small>day${total===1?"":"s"}${total>=30?`, about ${months} month${months>1?"s":""}${rem?` ${rem} day${rem>1?"s":""}`:""}`:""}</small>`;

  const track = $("#seaTrack");
  if(!spans.length){ track.innerHTML = `<p class="seatime-empty">Your service periods appear here as you add dates.</p>`; return; }
  const min = Math.min(...spans.map(s=>s.a)), max = Math.max(...spans.map(s=>s.b)) + 86400000;
  const range = max-min;
  const sorted = [...spans].sort((x,y)=>x.a-y.a);
  const overlap = sorted.some((s,k)=>k>0 && s.a<=sorted[k-1].b);
  track.innerHTML = `
    <div class="track">${spans.map(s=>{
      const left=(s.a-min)/range*100, width=Math.max((s.b-s.a+86400000)/range*100,1.5);
      return `<div class="bar" style="left:${left}%;width:${width}%" title="${esc(s.name||`Vessel ${s.i+1}`)}">${esc(s.name||`Vessel ${s.i+1}`)}</div>`;}).join("")}</div>
    <div class="track-scale"><span>${fmtLetterDate(new Date(min))}</span><span>${fmtLetterDate(new Date(max-86400000))}</span></div>
    ${overlap?`<p class="warn">Two of your service periods overlap. Check the dates against your CDC.</p>`:""}`;
}

/* =========================================================
   Validation + submit
   ========================================================= */
function setErr(id, msg){
  const input = document.getElementById(id), field = input.closest(".field"), err = document.getElementById(id+"-err");
  err.textContent = msg; field.classList.add("invalid");
  input.setAttribute("aria-invalid","true"); input.setAttribute("aria-describedby", id+"-err");
}
function clearErrs(){
  document.querySelectorAll(".field.invalid").forEach(f=>f.classList.remove("invalid"));
  document.querySelectorAll("[aria-invalid]").forEach(i=>i.removeAttribute("aria-invalid"));
  $("#declareWrap").classList.remove("invalid");
}
document.querySelectorAll(".field input").forEach(i=>i.addEventListener("input",()=>i.closest(".field").classList.remove("invalid")));

function collect(){
  const up = id => norm($("#"+id).value).toUpperCase();
  return {
    name: norm($("#name").value),
    email: norm($("#email").value),
    phoneCode: $("#phoneCode").value,
    phone: norm($("#phone").value),
    cdc: up("cdc"), indos: up("indos").replace(/\s/g,""), passport: up("passport").replace(/\s/g,""),
    vesselCount: vessels.length,
    vessels: vessels.map(v=>({ name: norm(v.name).toUpperCase(), rank: norm(v.rank), from: v.from, to: v.to })),
    declaration: $("#declare").checked,
    submittedAt: new Date().toISOString()
  };
}

function validate(d){
  const errs = [];
  for(const k of ["name","email","phone","cdc","indos","passport"]){
    const r = d[k] ? RULES[k](d[k]) : "This field is required.";
    if(r!==true) errs.push([k, r===undefined||r===false ? "Check this field." : (d[k]?r:`${$("label[for="+k+"]").textContent} is required.`)]);
  }
  const today = parseISO(todayISO());
  d.vessels.forEach((v,i)=>{
    const n=i+1;
    if(!v.name) errs.push([`v${i}-name`,`Vessel ${n}: enter the vessel name.`]);
    if(!v.rank) errs.push([`v${i}-rank`,`Vessel ${n}: select your rank on board.`]);
    const a=parseISO(v.from), b=parseISO(v.to);
    if(!a) errs.push([`v${i}-from`,`Vessel ${n}: enter the sign-on date.`]);
    else if(a>today) errs.push([`v${i}-from`,`Vessel ${n}: sign-on date can’t be in the future.`]);
    if(!b) errs.push([`v${i}-to`,`Vessel ${n}: enter the sign-off date.`]);
    else if(b>today) errs.push([`v${i}-to`,`Vessel ${n}: sign-off date can’t be in the future.`]);
    else if(a && b<a) errs.push([`v${i}-to`,`Vessel ${n}: sign-off date must be on or after the sign-on date.`]);
  });
  return errs;
}

$("#ssForm").addEventListener("submit", async e=>{
  e.preventDefault();
  clearErrs();
  const data = collect();
  const errs = validate(data);
  const declareMissing = !data.declaration;
  const list = $("#errorList"), box = $("#errorSummary");
  if(errs.length || declareMissing){
    errs.forEach(([id,msg])=>setErr(id,msg));
    if(declareMissing) $("#declareWrap").classList.add("invalid");
    list.innerHTML = errs.map(([id,msg])=>`<li><a href="#${id}">${esc(msg)}</a></li>`).join("")
                   + (declareMissing?`<li><a href="#declare">Tick the confirmation box.</a></li>`:"");
    box.classList.add("show"); box.focus();
    return;
  }
  box.classList.remove("show");

  const btn = $("#submitBtn"); btn.disabled = true; btn.textContent = "Sending…";
  try{
    const ref = await submitApplication(data);
    data.ref = ref;
    showDone(data);
    if(CONFIG.showInternalPreview) renderInternal(data);
  }catch(err){
    list.innerHTML = `<li>We couldn’t send your request. Check your connection and try again. If it keeps failing, email ${esc(CONFIG.company.emails[0])}.</li>`;
    box.classList.add("show"); box.focus();
  }finally{
    btn.disabled = false; btn.textContent = "Send request";
  }
});

/* Backend hook. Replace with your API. Should return the issued reference number. */
async function submitApplication(payload){
  if(CONFIG.submitEndpoint){
    const res = await fetch(CONFIG.submitEndpoint,{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
    if(!res.ok) throw new Error("Submit failed: "+res.status);
    const json = await res.json();
    return json.ref;
  }
  // Demo mode: the server should issue the running serial number in production.
  const d = new Date();
  const serial = String(Math.floor(100+Math.random()*900));
  return `${CONFIG.refPrefix}/${d.getFullYear()}/${pad(d.getMonth()+1)}/${serial}/${CONFIG.refSuffix}`;
}

function showDone(d){
  $("#ssForm").style.display = "none";
  $("#doneRef").textContent = d.ref;
  $("#doneEmail").textContent = d.email;
  const done = $("#done"); done.classList.add("show"); done.focus();
}
$("#newRequest").onclick = ()=>{
  $("#ssForm").reset(); vessels=[{name:"",rank:"",from:"",to:""}]; renderVessels();
  $("#ssForm").style.display = ""; $("#done").classList.remove("show");
  $("#internal").classList.remove("show"); $("#letterMount").innerHTML="";
  window.scrollTo({top:0}); $("#name").focus();
};

/* =========================================================
   Letter generation (reuse server-side: pure function of data)
   ========================================================= */
const WORDMARK_SVG = `<svg viewBox="364 67 1380 302" aria-label="Nautilus Shipping"><path fill="#fff" fill-rule="evenodd" d="M390 365C389 365 391 363 392 362C394 361 396 359 397 357L399 353L398 346L397 338L396 336C394 334 388 332 382 332C376 332 373 331 371 327L370 324L369 313L369 302L370 299L371 296L376 294C379 292 383 291 388 290L395 290L397 291C401 293 398 294 391 294C378 294 377 296 374 308L373 313L374 316C377 323 381 326 391 327L398 328L400 331L403 334L404 340L405 345L404 352C403 356 402 361 401 362L399 366L395 366C392 366 390 366 390 365ZM567 365L566 363L566 349C566 342 566 334 566 332C566 323 567 298 568 296C569 291 570 295 571 309L572 324L574 326C575 327 577 328 578 328C580 328 583 329 584 329L586 330L584 330C583 331 580 331 579 331L576 332L574 334L572 337L572 351L572 365L570 366C569 366 568 365 567 365ZM600 365C599 365 599 359 599 351L599 338L598 335C597 334 595 332 594 331L593 330L596 327L599 324L599 309L599 293L600 292C601 292 602 291 603 292L604 293L604 299C604 308 604 311 604 339C604 353 604 364 604 365C603 366 601 366 600 365ZM765 365C764 364 764 348 764 328L765 292L766 291C768 290 770 291 770 296C771 303 772 362 771 364L771 366L768 366C766 366 765 366 765 365ZM932 365C932 364 932 348 932 328L932 293L934 291L936 289L948 289C954 290 960 290 961 291C964 292 968 298 969 305L970 311L969 320L968 329L965 332L963 334L956 334C950 334 947 333 948 331C949 331 951 330 954 330C957 329 960 328 961 327L963 325L964 316L965 308L962 302L960 296L957 295C955 294 952 294 949 294L944 294L942 295L939 297L939 318C939 329 939 339 939 340C939 342 939 347 939 352C940 358 939 363 939 364C938 366 934 367 932 365ZM1127 365L1126 364L1127 342C1127 317 1127 317 1126 304L1126 294L1127 292L1128 290L1142 290L1155 289L1157 290C1158 291 1161 294 1162 296L1164 301L1164 313L1164 324L1163 328C1162 329 1160 332 1159 332L1157 334L1151 334C1148 334 1145 334 1144 333C1142 332 1144 330 1148 330C1156 330 1159 326 1160 314L1160 306L1158 302L1156 297L1151 295C1146 292 1139 292 1136 295L1134 297L1133 305C1133 310 1133 315 1133 317C1133 319 1133 330 1133 342L1134 364L1132 365C1130 366 1128 366 1127 365ZM1525 365L1523 364L1515 344C1511 333 1507 324 1506 323L1504 321L1502 322C1499 324 1498 327 1499 345L1499 362L1498 363C1496 364 1496 363 1496 354C1496 346 1496 336 1495 316C1495 310 1495 302 1496 298L1496 291L1498 290L1500 289L1502 290C1503 290 1505 294 1506 297C1509 304 1517 326 1519 333C1521 340 1524 344 1526 344C1529 344 1529 342 1530 329C1530 318 1531 315 1533 316C1533 317 1534 328 1534 340L1534 364L1533 365C1532 366 1529 366 1525 365ZM1328 364C1328 364 1327 347 1327 328L1328 292L1330 292L1332 292L1332 328L1332 364L1330 365C1329 365 1328 365 1328 364ZM1710 364C1707 364 1703 364 1702 363L1700 363L1698 358L1696 354L1696 347C1696 336 1696 328 1696 315L1696 304L1697 298L1699 292L1701 291L1704 289L1715 289L1726 288L1726 289L1726 291L1719 291L1712 292L1708 294C1706 295 1703 297 1703 298L1701 300L1701 326C1702 352 1702 355 1706 358L1708 360L1715 361L1722 361L1725 359L1728 357L1728 347C1728 342 1727 336 1727 333C1726 331 1725 328 1726 328C1727 326 1730 327 1731 329L1732 332L1732 347C1732 355 1732 363 1731 363C1730 364 1718 365 1710 364ZM372 246C371 246 369 245 369 244L368 242L368 195C369 115 370 80 371 78C371 77 372 76 373 76C376 76 387 81 390 84C391 86 395 88 398 89C400 91 407 95 412 99C429 112 434 114 439 113C443 112 443 110 444 94C444 87 444 79 445 78L446 75L450 74C452 74 462 74 472 74L490 74L492 75C493 76 494 79 495 80C495 82 496 114 495 151C495 221 495 238 494 241C491 246 484 243 462 228C460 226 455 223 451 222C447 220 442 216 438 214C435 211 431 209 429 208L425 207L423 208L421 209L421 216C420 219 420 226 420 231C420 236 420 241 419 242L419 244L415 245C411 246 377 247 372 246ZM568 245C561 245 555 244 554 243L550 242L550 240C550 238 553 232 561 216C564 210 568 203 570 199C571 195 574 191 575 188C577 186 579 182 579 181C580 179 581 177 582 176C582 175 585 170 588 164C603 133 622 95 625 90C626 89 627 85 628 83L630 78L634 75C644 69 652 73 661 93C667 105 676 124 683 138C686 144 691 153 693 160C696 166 701 175 704 181C720 213 732 238 732 241C732 242 731 243 730 244L729 245L716 246C709 246 700 246 695 245L687 244L683 239C681 236 677 233 675 232L670 231L642 230L614 230L610 231L605 233L600 239C593 247 592 247 568 245ZM1019 244L1010 244L1009 242C1008 241 1008 218 1008 187C1009 157 1009 131 1008 129C1008 128 1007 125 1005 124L1003 121L990 121C976 121 972 120 971 116L970 114L971 95L971 76L973 74L974 73L1032 72L1091 72L1093 74L1095 76L1095 82C1095 86 1095 93 1096 98C1096 109 1095 115 1093 118L1092 120L1078 120C1070 121 1063 121 1063 121C1062 121 1061 123 1060 124L1059 128L1059 181C1059 210 1059 236 1058 238L1058 242L1056 243C1053 245 1033 245 1019 244ZM1153 244C1152 243 1150 243 1149 242C1149 241 1149 133 1149 89L1150 75L1151 74L1152 72L1174 72C1186 72 1196 72 1198 72L1200 73L1201 76C1203 83 1201 237 1199 240C1198 241 1197 243 1195 243C1192 244 1157 245 1153 244ZM837 242C833 241 829 240 826 239L822 238L813 231L805 224L800 217C798 213 795 209 794 207L792 204L791 196C791 192 790 187 789 185L788 182L789 154C789 139 790 115 789 102L789 78L790 76L792 74L815 73L837 73L839 75L841 76L841 131L841 186L842 190L844 194L847 195C852 198 854 197 859 194C865 191 865 194 866 128L866 76L868 74L870 73L891 73L912 73L914 74L916 75L917 80L918 86L918 131C917 155 917 180 916 185L915 194L911 203C908 213 904 220 901 221C900 222 896 226 892 230L884 237L876 239C864 244 862 244 852 244L844 244L837 242ZM1256 243L1254 241L1255 158L1255 76L1257 74L1258 72L1280 72C1293 72 1303 72 1304 73C1306 75 1306 80 1306 130L1305 184L1307 186C1307 187 1309 189 1311 190L1313 192L1336 192L1359 192L1361 195L1363 197L1362 218L1362 240L1361 242L1359 244L1309 244L1258 244L1256 243ZM1470 241C1465 240 1458 238 1455 237L1448 235L1438 226C1427 215 1425 212 1420 197L1417 186L1418 176C1418 170 1419 149 1418 124C1418 77 1418 75 1421 73L1423 72L1445 72L1467 72L1469 74L1471 76L1471 131L1470 186L1473 190C1474 192 1476 194 1477 195L1480 196L1484 195C1488 194 1491 191 1493 186L1494 182L1494 128L1495 76L1498 73L1500 71L1522 71L1543 72L1544 73C1547 76 1547 95 1547 141L1546 185L1544 192C1541 207 1541 207 1536 214C1534 217 1531 220 1529 222C1520 234 1504 241 1484 242L1478 243L1470 241ZM1660 242C1659 241 1655 241 1651 240C1647 239 1642 238 1640 238C1634 236 1622 229 1615 223L1609 218L1609 215C1609 212 1611 210 1624 204C1631 201 1638 197 1640 196C1641 195 1645 194 1648 193L1654 192L1664 194L1676 196L1680 194C1683 194 1685 192 1686 191L1688 189L1688 185L1688 182L1684 179L1680 176L1666 175C1658 175 1649 174 1646 173C1635 171 1618 159 1609 146L1605 141L1603 131L1601 122L1602 117C1602 115 1603 110 1604 106L1606 100L1616 91L1625 82L1629 81C1632 80 1635 79 1637 77C1646 72 1669 70 1690 73L1702 74L1710 79L1719 83L1728 92L1737 102L1737 105C1737 108 1735 111 1731 112C1729 112 1724 114 1720 116C1716 117 1712 119 1711 119C1710 119 1707 120 1703 122C1700 124 1695 125 1693 126L1688 126L1681 123L1673 120L1668 121C1663 122 1658 125 1655 127C1649 133 1658 140 1675 141C1679 142 1685 143 1689 144C1692 145 1696 146 1697 146C1698 146 1705 149 1711 152L1724 158L1728 162C1730 165 1734 170 1736 174L1740 182L1740 191L1741 200L1738 207C1736 211 1732 217 1729 220L1724 226L1718 229C1714 231 1710 233 1708 235C1706 237 1703 238 1690 240C1685 241 1663 242 1660 242ZM649 182C652 180 652 177 648 172L645 167L642 166C639 165 637 167 634 173L631 178L631 180C633 184 645 185 649 182Z"/></svg>`;
const EMBLEM_SVG = `<svg viewBox="95 85 830 390" aria-hidden="true"><path fill="#2E9B7B" d="M114.1 461.1C110.3 457.3 108.5 448.2 104.9 414.8C102.3 390.4 102.5 352.1 105.3 343.5C106.2 340.7 107.4 335.1 108.0 331.0C109.0 323.7 110.0 321.6 118.7 307.3C119.4 306.0 121.7 304.2 123.8 303.1C125.9 302.0 128.2 300.1 128.9 298.7C129.6 297.4 132.5 294.5 135.3 292.4C138.2 290.2 144.1 285.0 148.4 280.7C152.8 276.4 157.6 272.2 159.0 271.5C160.4 270.8 162.2 269.0 163.0 267.6C163.7 266.1 166.0 264.0 167.9 262.8C169.9 261.6 171.8 260.2 172.1 259.7C172.5 259.2 172.6 242.7 172.5 223.1C172.4 203.5 172.6 178.7 172.9 168.0L173.6 148.4L177.7 139.8C185.8 122.9 204.6 108.2 224.3 103.4C227.5 102.6 231.8 100.8 233.9 99.5C239.0 96.1 245.3 95.2 268.3 94.7L288.0 94.3L290.4 96.7C293.9 100.2 296.0 107.1 297.0 118.0C298.7 135.9 299.9 145.5 301.9 155.5C303.0 161.0 304.4 170.8 305.0 177.2C305.9 187.4 307.9 199.8 309.6 205.3C311.0 209.6 322.1 208.7 328.0 203.7C330.8 201.3 334.1 200.0 341.2 198.5C342.7 198.2 344.7 197.1 345.7 196.1C348.7 193.1 351.2 192.2 359.0 191.5C372.3 190.4 375.2 189.9 378.9 188.4C383.5 186.4 392.0 186.4 399.0 188.3C402.0 189.2 407.0 190.2 410.0 190.6C414.6 191.1 416.1 191.8 419.1 195.0C421.1 197.1 424.6 200.0 426.8 201.4C429.8 203.3 431.7 205.7 434.4 211.2C436.4 215.2 438.9 220.2 440.1 222.2C442.6 226.7 446.0 247.9 446.0 259.2C446.0 268.1 444.6 270.2 437.6 272.1C435.4 272.7 430.6 274.7 427.0 276.5C423.4 278.3 418.6 280.1 416.3 280.5C414.0 280.8 410.9 282.1 409.6 283.1C408.2 284.2 403.8 286.2 399.8 287.6C395.8 288.9 391.0 291.1 389.0 292.4C387.1 293.6 381.4 296.2 376.5 298.0C371.6 299.8 363.4 303.6 358.5 306.5C353.6 309.4 348.4 312.1 347.0 312.5C345.6 312.9 343.5 314.1 342.2 315.1C340.9 316.1 337.3 317.9 334.2 319.0C331.1 320.2 325.4 322.7 321.5 324.6C317.6 326.5 312.6 328.5 310.3 329.0C308.0 329.6 304.8 331.1 303.3 332.4C300.9 334.4 296.5 336.7 277.5 346.3C268.7 350.7 260.9 355.2 253.0 360.5C248.5 363.5 244.0 366.0 243.0 366.0C241.0 366.0 234.4 370.2 231.2 373.6C229.9 374.9 227.2 376.9 225.2 377.9C216.6 382.3 199.5 393.4 194.7 397.7C192.7 399.5 190.6 401.0 190.1 401.0C189.1 401.0 169.7 415.0 163.8 420.0C161.8 421.7 158.2 424.5 155.8 426.2C151.8 429.1 129.5 451.3 122.4 459.4C118.9 463.5 116.9 463.9 114.1 461.1Z"/><path fill="#2B3030" d="M138.5 461.9C137.2 460.0 167.0 433.9 184.7 421.6C189.5 418.1 196.5 413.1 200.2 410.4C215.2 399.3 241.6 382.8 266.5 369.0C273.1 365.4 279.6 361.7 281.0 360.8C284.8 358.3 303.7 348.3 311.0 344.8C314.6 343.2 324.9 338.1 334.0 333.5C343.1 329.0 351.6 324.9 353.0 324.5C354.4 324.1 358.2 322.4 361.5 320.8C367.3 317.9 371.1 316.3 397.5 305.3C421.0 295.5 447.5 286.1 481.0 275.5C488.4 273.2 497.3 270.1 500.8 268.6C504.2 267.2 509.8 265.3 513.3 264.5C516.7 263.6 522.4 262.1 526.0 261.1C545.0 255.7 583.8 245.9 594.0 244.1C597.0 243.5 606.0 241.7 614.0 240.0C622.0 238.3 631.2 236.5 634.5 236.0C637.8 235.5 645.5 234.1 651.5 233.0C675.6 228.6 692.1 226.0 696.7 226.0C698.4 226.0 705.1 225.1 711.7 224.0C725.9 221.5 753.6 218.4 779.5 216.5C790.0 215.7 803.3 214.6 809.1 214.1C815.0 213.6 833.7 212.7 850.6 212.1C867.6 211.5 888.1 210.5 896.1 209.9C920.7 208.0 920.9 209.7 897.5 221.4C870.0 235.0 854.4 243.8 831.9 258.3C829.5 259.9 823.9 263.3 819.5 265.9C800.3 277.4 777.2 292.8 770.1 298.9C767.0 301.6 761.8 305.5 758.5 307.7C755.2 309.9 750.2 313.9 747.5 316.6C743.2 320.9 738.7 324.6 719.0 340.5C711.1 346.9 692.3 367.5 680.4 382.7C660.0 408.8 645.7 436.2 642.5 455.2C641.3 462.4 645.0 462.0 571.9 462.0C535.7 462.0 505.5 461.7 504.6 461.4C501.1 460.0 504.7 452.8 514.8 441.1C517.4 438.1 522.6 431.5 526.5 426.5C548.8 397.6 585.7 359.6 604.6 346.1C608.4 343.4 613.3 339.9 615.5 338.3C619.8 335.2 620.8 331.8 617.6 331.2C615.6 330.8 604.2 333.1 596.0 335.5C593.5 336.3 585.6 338.5 578.4 340.5C565.2 344.1 554.1 347.8 531.0 356.5C524.1 359.1 515.9 362.1 512.7 363.2C509.5 364.3 504.7 366.7 502.2 368.4C499.6 370.1 491.4 374.6 484.0 378.4C462.4 389.2 447.4 397.3 443.3 400.1C441.2 401.5 432.8 407.1 424.5 412.4C416.2 417.8 406.4 424.8 402.5 428.1C398.6 431.4 391.0 437.5 385.6 441.7C380.1 445.9 372.8 452.1 369.4 455.6L363.1 461.8L355.8 462.2C331.1 463.3 139.2 463.1 138.5 461.9Z"/></svg>`;

function buildLetterHTML(d){
  const c = CONFIG.company;
  const rows = [...d.vessels]
    .sort((x,y)=>parseISO(y.from)-parseISO(x.from))          // most recent first, as on issued letters
    .map(v=>{
      const reg = VESSEL_REGISTER[v.name];
      const cell = val => reg ? `<td contenteditable="true">${esc(val)}</td>` : `<td contenteditable="true" class="fill-me" title="Not in vessel register: fill in"></td>`;
      return `<tr>
        <td contenteditable="true">${esc(v.name)}</td>
        <td contenteditable="true">${esc(v.rank.toUpperCase())}</td>
        ${cell(reg?.imo)}${cell(reg?.type)}${cell(reg?.grt)}${cell(reg?.powerKw)}${cell(reg?.flag)}${cell(reg?.trade)}
        <td contenteditable="true">${fmtLetterDate(parseISO(v.from))}</td>
        <td contenteditable="true">${fmtLetterDate(parseISO(v.to))}</td>
      </tr>`;
    }).join("");
  const now = new Date();
  const issueDate = fmtLetterDate(new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())));

  return `
  <article class="letter" id="letter">
    <div class="lh-band">${WORDMARK_SVG}</div>
    <div class="lh-meta"><span>RPSL No: ${esc(CONFIG.rpslNo)}</span><span>VALID TILL: ${esc(CONFIG.rpslValidTill)}</span></div>
    <div class="lh-body">
      <p><span class="b">Ref:</span> <span contenteditable="true">${esc(d.ref)}</span></p>
      <div class="gap"></div>
      <p contenteditable="true">${issueDate}</p>
      <p class="b">${esc(CONFIG.issuingCity)}</p>
      <div class="gap"></div>
      <p class="b">To</p>
      <p class="b">THE PRINCIPAL OFFICER</p>
      <p class="b">MMD</p>
      <p class="b">CHENNAI \\ COCHIN \\ MUMBAI \\ KOLKATA \\ DELHI</p>
      <div class="gap"></div>
      <p>The below candidate has served on our principal vessel as per the details given below:</p>
      <div class="gap"></div>
      <p>NAME: ${esc(d.name.toUpperCase())}</p>
      <p>CDC NO: <span class="b">${esc(d.cdc)}</span></p>
      <p>INDOS NO : <span class="b">${esc(d.indos)}</span></p>
      <p>PASSPORT NO: <span class="b">${esc(d.passport)}</span></p>
      <table class="lh-table">
        <thead><tr><th>VESSEL NAME</th><th>RANK</th><th>IMO NO</th><th>TYPE OF VESSEL</th><th>GRT</th><th>POWER (KW)</th><th>FLAG</th><th>TRADE</th><th>FROM</th><th>TO</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="sign-block">
        <p>For</p>
        <p>${esc(c.legalName)},</p>
        <div class="sign-space">Signature and company seal</div>
        <p class="b">${esc(CONFIG.signatory.name)}</p>
        <p class="b">${esc(CONFIG.signatory.title)}</p>
      </div>
      <div class="gap"></div>
      <p>For any queries or verification relating to the above sea service, contact us at<br>${c.emails.map(esc).join(" &amp; ")} or scan the QR code</p>
      <div class="qr-box" id="qrBox"></div>
    </div>
    <footer class="lh-foot">
      <div>Phone: ${esc(c.phone)}</div>
      <div class="mid">${EMBLEM_SVG}<b>${esc(c.displayName)}</b><br>${esc(c.address)}</div>
      <div class="right">${esc(c.web)}<br>CIN: ${esc(c.cin)}</div>
    </footer>
  </article>`;
}

function renderInternal(d){
  $("#letterMount").innerHTML = buildLetterHTML(d);
  if(window.QRCode){
    new QRCode($("#qrBox"), { text: `${CONFIG.verifyUrl}?ref=${encodeURIComponent(d.ref)}`, width:256, height:256, correctLevel: QRCode.CorrectLevel.M });
  }
  $("#internal").classList.add("show");
}
const printBtn=$("#printBtn"); if(printBtn) printBtn.onclick = ()=>window.print();

$("#declare").addEventListener("change",()=>$("#declareWrap").classList.remove("invalid"));
/* init */
buildDatalists();
renderVessels();

/* Site menu — optional when page uses React landing header */
const menuBtn = $("#menuBtn"), menu = $("#siteMenu");
if(menuBtn && menu){
  function setMenu(open){
    menuBtn.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    const focusable = menu.querySelector("a");
    if(open && focusable) focusable.focus();
  }
  menuBtn.onclick = ()=>setMenu(menuBtn.getAttribute("aria-expanded")!=="true");
  const menuClose = $("#menuClose");
  if(menuClose) menuClose.onclick = ()=>{ setMenu(false); menuBtn.focus(); };
  document.addEventListener("keydown", e=>{ if(e.key==="Escape" && !menu.hidden){ setMenu(false); menuBtn.focus(); } });
}
const yearEl = $("#year");
if(yearEl) yearEl.textContent = new Date().getFullYear();

}
