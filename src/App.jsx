import React, { useState, useRef, useEffect } from "react";
import {
  Camera, Pencil, Ruler, MapPin, Cloud, FileDown, Plus, Trash2, Settings,
  Sparkles, Image as ImgIcon, X, Check, Sun, CloudRain, CloudSnow, CloudDrizzle,
  Wind, Undo2, Building2, Loader2, Tag, Mic, Map as MapIcon, FolderOpen,
  ChevronLeft, Globe, Square, ClipboardList,
} from "lucide-react";

/* ════════ palette ════════ */
const C = {
  bg: "#0f1410", panel: "#18201a", panel2: "#212c23", line: "#2f3d31",
  text: "#e8efe7", dim: "#8ea394", green: "#5cbf72", greenDim: "#3c8a50",
  amber: "#e0a73a", red: "#e26a6a", blue: "#5fa8d3", sky: "#7cc4e8",
};
let _id = Date.now();
const uid = () => String(_id++);
const iso = () => new Date().toISOString();

/* ════════ languages (Australia-relevant) ════════ */
const LANGS = [
  { code: "en", native: "English" }, { code: "ko", native: "한국어" },
  { code: "zh", native: "中文（简体）" }, { code: "zh-Hant", native: "中文（繁體）" },
  { code: "vi", native: "Tiếng Việt" }, { code: "it", native: "Italiano" },
  { code: "el", native: "Ελληνικά" }, { code: "ar", native: "العربية" },
  { code: "es", native: "Español" }, { code: "hi", native: "हिन्दी" },
  { code: "tl", native: "Tagalog" }, { code: "ja", native: "日本語" },
  { code: "pa", native: "ਪੰਜਾਬੀ" },
];
const langEnglishName = {
  en: "English", ko: "Korean", zh: "Simplified Chinese", "zh-Hant": "Traditional Chinese",
  vi: "Vietnamese", it: "Italian", el: "Greek", ar: "Arabic", es: "Spanish",
  hi: "Hindi", tl: "Tagalog", ja: "Japanese", pa: "Punjabi",
};

/* ════════ UI strings (EN + KO) ════════ */
const I18N = {
  en: {
    projects: "Projects", newProject: "New Project", noProjects: "No projects yet — create one to start.",
    settings: "Settings", appLanguage: "App Language", companyName: "Company Name",
    companyContact: "Contact / Email / Licence No.", logoHint: "Logo and name appear on every report.",
    logo: "Logo", projectName: "Project Name", client: "Client", code: "Project Code",
    clientLang: "Client report language", getLocation: "Get Location + Weather",
    locationUnset: "Location not set", weather: "Weekly Weather", manual: "manual",
    weekHint: "Mon–Sun · rainy days marked", weatherFail: "Couldn't load weather automatically.",
    enterManual: "Enter manually", aiAdvice: "AI Site / Quote Advice",
    askPlaceholder: "e.g. What planting suits this slope? What's easy to miss when quoting this?",
    getAdvice: "Get advice", items: "Inspection Items", byTrade: "grouped by trade",
    itemTitle: "Item title (e.g. Front bed drainage issue)", siteNote: "Site note (type or dictate)",
    polish: "Polish", addItem: "Add Inspection Item", trade: "Trade", status: "Status",
    severity: "Severity", st_open: "Open", st_prog: "In Progress", st_done: "Done",
    sv_high: "Urgent", sv_med: "Attention", sv_low: "Minor", tradeQuotes: "Quotes by Trade",
    tradeQuoteHint: "Generate a quote with only that trade's items to send each subcontractor.",
    subName: "Subcontractor (optional)", quote: "Quote", fullQuote: "Full Quote Request",
    progressReport: "Progress Report", floorPlan: "Floor Plan",
    floorPlanHint: "Upload a plan, then tap to drop defect pins.", uploadPlan: "Upload Floor Plan",
    pinNote: "Pin note", record: "Record", recording: "Recording…", stop: "Stop",
    summarize: "AI Summarise", analyze: "AI Analyse Photo", draw: "Draw", dimension: "Dimension",
    undo: "Undo", cancel: "Cancel", save: "Save", back: "Back", itemCount: "items",
    noItems: "No items.", drawHint: "Draw with Apple Pencil or set a dimension line — enter the real length once, the rest auto-measure.",
    voiceOff: "Voice input unavailable here — type your note and use AI Summarise.",
    autosaved: "Auto-saved", translating: "Translating…", deleteProj: "Delete project?",
    photosGps: "photo location & time saved", defectPins: "Defect pin",
    qty: "Qty", unit: "Unit", rate: "Rate", lineTotal: "Line", useDim: "Use measured dimension",
    estimate: "Estimate Summary", subtotal: "Subtotal", gst: "GST (10%)", total: "Total",
    exVat: "ex GST", emailReport: "Email", myEmail: "My Email (sender)",
    clientEmail: "Client Email", exportCsv: "Export CSV", templates: "Templates",
    saveTemplate: "Save as Template", useTemplate: "Use Template", templateName: "Template name",
    noTemplates: "No saved templates.", signature: "My Signature", sign: "Sign here",
    clearSig: "Clear", signed: "Signed", addSignature: "Add My Signature",
    pickDim: "Pick a measured length from this item's photos",
    modeQuote: "Quote Visit", modeInspect: "Inspection", modeFinal: "Final Quote",
    chooseMode: "What is this visit for?",
    quoteVisitDesc: "First visit — measure & request subcontractor quotes",
    inspectDesc: "Inspect progress & report to client",
    finalDesc: "Combine sub quotes, add margin, build client quote",
    subQuotes: "Subcontractor Quotes", addSubQuote: "Add Sub Quote", subAmount: "Amount ($)",
    subMemo: "Memo / scope", include: "Include", margin: "Margin", defaultMargin: "Default margin (%)",
    tradeMargin: "margin %", myWork: "My Own Work", addMyWork: "Add My Work",
    workTitle: "Description", workAmount: "Amount ($)", profitSummary: "Profit Summary",
    cost: "Cost (subs + my work)", marginAmt: "Margin", clientPrice: "Client Price (ex GST)",
    netProfit: "Net Profit", buildClientQuote: "Build Client Quote", quoteNo: "Quote No.",
    validUntil: "Valid until", validNote: "This quote is valid for the period shown above.",
    clientQuoteNote: "Client quote shows final prices only — subcontractor costs and margins are hidden.",
  },
  ko: {
    projects: "프로젝트", newProject: "새 프로젝트", noProjects: "프로젝트가 없습니다 — 새로 만들어 시작하세요.",
    settings: "설정", appLanguage: "앱 언어", companyName: "회사명",
    companyContact: "연락처 / 이메일 / 면허번호", logoHint: "로고와 회사명은 모든 보고서에 표시됩니다.",
    logo: "로고", projectName: "프로젝트명", client: "클라이언트", code: "프로젝트 코드",
    clientLang: "클라이언트 보고서 언어", getLocation: "위치 + 날씨 가져오기",
    locationUnset: "위치 미설정", weather: "주간 날씨", manual: "수동",
    weekHint: "월~일 · 비 온 날 표시", weatherFail: "자동 날씨를 불러오지 못했어요.",
    enterManual: "수동 입력", aiAdvice: "AI 현장·견적 조언",
    askPlaceholder: "예: 이 경사면에 맞는 식재는? 이 견적에서 빠뜨리기 쉬운 항목은?",
    getAdvice: "조언 받기", items: "점검 항목", byTrade: "공종별 분류",
    itemTitle: "항목 제목 (예: 정문 화단 배수 불량)", siteNote: "현장 노트 (입력 또는 음성)",
    polish: "다듬기", addItem: "점검 항목 추가", trade: "공종", status: "상태",
    severity: "심각도", st_open: "미해결", st_prog: "진행중", st_done: "완료",
    sv_high: "긴급", sv_med: "주의", sv_low: "경미", tradeQuotes: "공종별 견적 요청",
    tradeQuoteHint: "각 공종 항목만 담긴 견적서를 만들어 하청 업체에 따로 보낼 수 있어요.",
    subName: "하청 업체명 (선택)", quote: "견적서", fullQuote: "전체 견적 요청서",
    progressReport: "진행 보고서", floorPlan: "플로어 플랜",
    floorPlanHint: "도면을 올리고 탭하여 결함 핀을 찍으세요.", uploadPlan: "도면 업로드",
    pinNote: "핀 노트", record: "녹음", recording: "녹음 중…", stop: "정지",
    summarize: "AI 요약", analyze: "AI 사진 분석", draw: "그리기", dimension: "치수",
    undo: "실행취소", cancel: "취소", save: "저장", back: "뒤로", itemCount: "개",
    noItems: "항목이 없습니다.", drawHint: "애플펜슬로 그리거나 치수선을 그으세요. 첫 선의 실제 길이를 한 번 입력하면 이후 자동 측정됩니다.",
    voiceOff: "여기선 음성입력을 쓸 수 없어요 — 노트를 입력하고 AI 요약을 사용하세요.",
    autosaved: "자동 저장됨", translating: "번역 중…", deleteProj: "프로젝트를 삭제할까요?",
    photosGps: "사진에 위치·시간 기록", defectPins: "결함 핀",
    qty: "수량", unit: "단위", rate: "단가", lineTotal: "소계", useDim: "측정값 가져오기",
    estimate: "견적 합계", subtotal: "소계 합", gst: "GST (10%)", total: "총액",
    exVat: "GST 별도", emailReport: "이메일", myEmail: "내 이메일 (발신)",
    clientEmail: "클라이언트 이메일", exportCsv: "CSV 내보내기", templates: "템플릿",
    saveTemplate: "템플릿으로 저장", useTemplate: "템플릿 사용", templateName: "템플릿 이름",
    noTemplates: "저장된 템플릿이 없습니다.", signature: "내 서명", sign: "여기에 서명",
    clearSig: "지우기", signed: "서명 완료", addSignature: "내 서명 추가",
    pickDim: "이 항목 사진에서 측정한 길이 선택",
    modeQuote: "견적 방문", modeInspect: "점검", modeFinal: "최종 견적",
    chooseMode: "이번 방문은 어떤 목적인가요?",
    quoteVisitDesc: "첫 방문 — 측정하고 하청에 견적 요청",
    inspectDesc: "진행 상황 점검 후 클라이언트에 보고",
    finalDesc: "하청 견적 취합 → 마진 적용 → 클라이언트 견적서",
    subQuotes: "하청 견적", addSubQuote: "하청 견적 추가", subAmount: "금액 ($)",
    subMemo: "메모 / 범위", include: "포함", margin: "마진", defaultMargin: "기본 마진 (%)",
    tradeMargin: "마진 %", myWork: "내 직접 작업", addMyWork: "내 작업 추가",
    workTitle: "내용", workAmount: "금액 ($)", profitSummary: "이익 요약",
    cost: "원가 (하청+내작업)", marginAmt: "마진", clientPrice: "클라이언트 가격 (GST 별도)",
    netProfit: "순이익", buildClientQuote: "클라이언트 견적서 생성", quoteNo: "견적 번호",
    validUntil: "유효기한", validNote: "본 견적은 위에 표시된 기한까지 유효합니다.",
    clientQuoteNote: "클라이언트 견적서에는 최종 가격만 표시되며, 하청 원가와 마진은 숨겨집니다.",
  },
};
const T = (lang, k) => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;

/* ════════ trades ════════ */
const TRADES = [
  { key: "fence", en: "Fencing", ko: "펜스" }, { key: "concrete", en: "Concrete", ko: "콘크리트" },
  { key: "planting", en: "Planting", ko: "식재" }, { key: "mulching", en: "Mulching", ko: "멀칭" },
  { key: "drainage", en: "Drainage", ko: "배수" },
  { key: "turf", en: "Turf", ko: "잔디" }, { key: "irrigation", en: "Irrigation", ko: "관수" },
  { key: "lighting", en: "Lighting", ko: "조명" }, { key: "paving", en: "Paving", ko: "포장" },
  { key: "retaining", en: "Retaining Wall", ko: "옹벽" },
  { key: "excavator", en: "Excavator", ko: "굴삭기" },
  { key: "bobcat", en: "Bobcat Operator", ko: "밥캣 오퍼레이터" },
  { key: "other", en: "Other", ko: "기타" },
];
const tradeLabel = (key, lang) => {
  const t = TRADES.find((x) => x.key === key) || TRADES[TRADES.length - 1];
  return lang === "ko" ? t.ko : t.en;
};

/* ════════ weather ════════ */
const WX = (code) => {
  if (code == null) return { icon: Sun, label: "—", c: C.dim };
  if (code === 0) return { icon: Sun, label: "Clear", c: C.amber };
  if (code <= 3) return { icon: Cloud, label: "Cloud", c: C.dim };
  if (code <= 48) return { icon: Cloud, label: "Fog", c: C.dim };
  if (code <= 57) return { icon: CloudDrizzle, label: "Drizzle", c: C.sky };
  if (code <= 67) return { icon: CloudRain, label: "Rain", c: C.blue };
  if (code <= 77) return { icon: CloudSnow, label: "Snow", c: C.sky };
  if (code <= 82) return { icon: CloudRain, label: "Showers", c: C.blue };
  if (code <= 86) return { icon: CloudSnow, label: "Snow", c: C.sky };
  return { icon: Wind, label: "Storm", c: C.red };
};
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ════════ AI ════════ */
async function askClaude(prompt, system, imageData) {
  const content = imageData
    ? [{ type: "image", source: { type: "base64", media_type: "image/jpeg", data: imageData } },
       { type: "text", text: prompt }]
    : prompt;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500,
        system: system || "", messages: [{ role: "user", content }] }),
    });
    const data = await res.json();
    return data.content.map((b) => (b.type === "text" ? b.text : "")).join("").trim();
  } catch { return ""; }
}

/* ════════ persistence ════════ */
const hasArtifactStorage = typeof window !== "undefined" && window.storage && typeof window.storage.get === "function";
const store = hasArtifactStorage ? {
  async get(k) { try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; } catch { return null; } },
  async set(k, v) { try { await window.storage.set(k, JSON.stringify(v)); } catch {} },
  async del(k) { try { await window.storage.delete(k); } catch {} },
} : {
  async get(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
  async set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  async del(k) { try { localStorage.removeItem(k); } catch {} },
};
const INDEX_KEY = "li:index";
const PREFS_KEY = "li:prefs";
const pKey = (id) => `li:proj:${id}`;

const blankProject = (name, mode) => ({
  id: uid(), name: name || "New Project", mode: mode || "quote", client: "", code: "", clientLang: "en",
  clientEmail: "", lat: null, lng: null, createdAt: iso(), updatedAt: iso(),
  items: [], subs: {}, weather: { status: "idle", days: [] }, floorPlan: null, pins: [],
  signature: null,
  quoteNo: "", // assigned on first final-quote build
  validDays: 30, // quote validity, editable per project
  tradeMargins: {},   // {tradeKey: percent}  overrides default
  subQuotes: [],      // {id, trade, sub, amount, note, included}
  myWork: [],         // {id, title, amount, note}  (my own labour/materials)
});
const blankItem = () => ({
  id: uid(), title: "", note: "", trade: "other", status: "open", severity: "med", photos: [], ts: iso(),
  qty: "", unit: "m", rate: "",
});
const UNITS = ["m", "mm", "m²", "m³", "ea", "hr", "ls", "t"];
const GST_RATE = 0.10;
const QUOTE_VALID_DAYS = 30; // default; editable per project
const num = (v) => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
const money = (n) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const TEMPLATES_KEY = "li:templates";
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

const inputStyle = {
  background: C.panel2, border: `1px solid ${C.line}`, color: C.text,
  borderRadius: 9, padding: "9px 11px", fontSize: 14, outline: "none", width: "100%",
};

/* ═══════════════ ROOT ═══════════════ */
export default function App() {
  const [prefs, setPrefs] = useState({ lang: "en", defaultMargin: 20, quoteCounter: 0,
    company: { name: "My Landscaping Co.", contact: "", logo: null, email: "" } });
  const [index, setIndex] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [project, setProject] = useState(null);
  const [screen, setScreen] = useState("list");
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef();
  const L = prefs.lang;

  useEffect(() => { (async () => {
    const p = await store.get(PREFS_KEY); if (p) setPrefs(p);
    const idx = await store.get(INDEX_KEY); if (idx) setIndex(idx);
    const tpl = await store.get(TEMPLATES_KEY); if (tpl) setTemplates(tpl);
    setLoaded(true);
  })(); }, []);

  useEffect(() => { if (loaded) store.set(PREFS_KEY, prefs); }, [prefs, loaded]);

  useEffect(() => {
    if (!project || !loaded) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const updated = { ...project, updatedAt: iso() };
      await store.set(pKey(project.id), updated);
      setIndex((prev) => {
        const next = prev.filter((x) => x.id !== project.id);
        next.unshift({ id: project.id, name: project.name, mode: project.mode, updatedAt: updated.updatedAt });
        store.set(INDEX_KEY, next); return next;
      });
    }, 600);
  }, [project, loaded]);

  const openProject = async (id) => { const p = await store.get(pKey(id)); if (p) { setProject(p); setScreen("project"); } };
  const createProject = (mode) => {
    const names = { quote: L === "ko" ? "새 견적 방문" : "New Quote Visit",
      inspect: L === "ko" ? "새 점검" : "New Inspection", final: L === "ko" ? "새 최종 견적" : "New Final Quote" };
    setProject(blankProject(names[mode] || names.quote, mode)); setScreen("project");
  };
  const deleteProject = async (id) => { await store.del(pKey(id));
    setIndex((prev) => { const next = prev.filter((x) => x.id !== id); store.set(INDEX_KEY, next); return next; }); };

  const saveTemplate = () => {
    if (!project) return;
    const name = window.prompt(T(L, "templateName"), project.name); if (!name) return;
    const tpl = { id: uid(), name, mode: project.mode,
      items: project.items.map((it) => ({ ...blankItem(), title: it.title, trade: it.trade, unit: it.unit, severity: it.severity })) };
    setTemplates((prev) => { const next = [tpl, ...prev]; store.set(TEMPLATES_KEY, next); return next; });
  };
  const useTemplate = (tpl) => {
    const p = blankProject(tpl.name, tpl.mode || "quote");
    p.items = tpl.items.map((it) => ({ ...blankItem(), title: it.title, trade: it.trade, unit: it.unit, severity: it.severity }));
    setProject(p); setScreen("project");
  };
  const deleteTemplate = (id) => setTemplates((prev) => { const next = prev.filter((t) => t.id !== id); store.set(TEMPLATES_KEY, next); return next; });

  if (!loaded)
    return <div style={{ background: C.bg, minHeight: "100vh", display: "grid", placeItems: "center", color: C.dim }}>
      <Loader2 className="spin" /><style>{spinCss}</style></div>;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Segoe UI','Malgun Gothic',system-ui,sans-serif" }}>
      <style>{spinCss}</style>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px 90px" }}>
        <header style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0",
          position: "sticky", top: 0, background: C.bg, zIndex: 8, borderBottom: `1px solid ${C.line}` }}>
          {screen === "project" && <button onClick={() => { setScreen("list"); setProject(null); }} style={iconBtn}><ChevronLeft size={18} /></button>}
          {prefs.company.logo
            ? <img src={prefs.company.logo} alt="" style={{ height: 32, borderRadius: 7 }} />
            : <div style={{ width: 32, height: 32, borderRadius: 8, background: C.green, display: "grid", placeItems: "center", color: C.bg }}><Building2 size={18} /></div>}
          <div style={{ flex: 1, fontWeight: 800, fontSize: 15 }}>{prefs.company.name}</div>
          <button onClick={() => setScreen(screen === "settings" ? "list" : "settings")}
            style={{ ...iconBtn, background: screen === "settings" ? C.green : C.panel2, color: screen === "settings" ? C.bg : C.text }}><Settings size={17} /></button>
        </header>

        {screen === "settings" && <SettingsScreen prefs={prefs} setPrefs={setPrefs} L={L} />}
        {screen === "list" && <ProjectList index={index} templates={templates} L={L} onOpen={openProject}
          onCreate={createProject} onDelete={deleteProject} onUseTemplate={useTemplate} onDeleteTemplate={deleteTemplate} />}
        {screen === "project" && project && <ProjectScreen project={project} setProject={setProject} prefs={prefs} setPrefs={setPrefs} L={L} onSaveTemplate={saveTemplate} />}
      </div>
    </div>
  );
}

/* ═══════════════ Project list ═══════════════ */
const MODE_META = {
  quote: { color: "#e0a73a", label: "modeQuote", desc: "quoteVisitDesc" },
  inspect: { color: "#5cbf72", label: "modeInspect", desc: "inspectDesc" },
  final: { color: "#5fa8d3", label: "modeFinal", desc: "finalDesc" },
};
function ProjectList({ index, templates, L, onOpen, onCreate, onDelete, onUseTemplate, onDeleteTemplate }) {
  return (
    <section style={{ marginTop: 18 }}>
      <h2 style={{ fontSize: 18, margin: "0 0 10px" }}>{T(L, "newProject")}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8, marginBottom: 22 }}>
        {["quote", "inspect", "final"].map((m) => (
          <button key={m} onClick={() => onCreate(m)} style={{ ...card, textAlign: "left", cursor: "pointer",
            borderLeft: `4px solid ${MODE_META[m].color}`, display: "flex", alignItems: "center", gap: 12 }}>
            <Plus size={18} style={{ color: MODE_META[m].color }} />
            <div>
              <div style={{ fontWeight: 700 }}>{T(L, MODE_META[m].label)}</div>
              <div style={{ fontSize: 12, color: C.dim }}>{T(L, MODE_META[m].desc)}</div>
            </div>
          </button>
        ))}
      </div>

      <h2 style={{ fontSize: 18, margin: "0 0 10px" }}>{T(L, "projects")}</h2>
      {index.length === 0 ? (
        <div style={{ color: C.dim, textAlign: "center", padding: "40px 0" }}>
          <FolderOpen size={36} style={{ opacity: .4 }} /><p>{T(L, "noProjects")}</p></div>
      ) : index.map((p) => {
        const mm = MODE_META[p.mode] || MODE_META.quote;
        return (
        <div key={p.id} style={{ ...card, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 8,
          borderLeft: `4px solid ${mm.color}` }} onClick={() => onOpen(p.id)}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: C.dim }}>
              <span style={{ color: mm.color, fontWeight: 700 }}>{T(L, mm.label)}</span> · {new Date(p.updatedAt).toLocaleString()}</div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); if (window.confirm(T(L, "deleteProj"))) onDelete(p.id); }} style={iconBtn}><Trash2 size={16} /></button>
        </div>
        );
      })}

      {templates && templates.length > 0 && (
        <div style={{ marginTop: 22 }}>
          <h3 style={{ fontSize: 15, color: C.dim }}>{T(L, "templates")}</h3>
          {templates.map((t) => (
            <div key={t.id} style={{ ...card, display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <ClipboardList size={18} style={{ color: C.amber }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: C.dim }}>{t.items.length} {T(L, "itemCount")}</div>
              </div>
              <button onClick={() => onUseTemplate(t)} style={{ ...miniAction }}><Plus size={13} /> {T(L, "useTemplate")}</button>
              <button onClick={() => onDeleteTemplate(t.id)} style={iconBtn}><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ═══════════════ Settings ═══════════════ */
function SettingsScreen({ prefs, setPrefs, L }) {
  const ref = useRef();
  const onLogo = (f) => { const r = new FileReader(); r.onload = () => setPrefs({ ...prefs, company: { ...prefs.company, logo: r.result } }); r.readAsDataURL(f); };
  return (
    <section style={{ marginTop: 18 }}>
      <h2 style={{ fontSize: 17 }}>{T(L, "settings")}</h2>
      <label style={lbl}><Globe size={14} /> {T(L, "appLanguage")}</label>
      <select value={prefs.lang} onChange={(e) => setPrefs({ ...prefs, lang: e.target.value })} style={{ ...inputStyle, marginBottom: 18 }}>
        <option value="en">English</option><option value="ko">한국어</option>
      </select>
      <p style={{ color: C.dim, fontSize: 13 }}>{T(L, "logoHint")}</p>
      <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 6 }}>
        <div onClick={() => ref.current?.click()} style={{ width: 88, height: 88, borderRadius: 12, border: `1px dashed ${C.line}`,
          background: C.panel, display: "grid", placeItems: "center", cursor: "pointer", overflow: "hidden" }}>
          {prefs.company.logo ? <img src={prefs.company.logo} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            : <div style={{ textAlign: "center", color: C.dim, fontSize: 12 }}><ImgIcon size={20} /><div>{T(L, "logo")}</div></div>}
        </div>
        <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files[0] && onLogo(e.target.files[0])} />
        <div style={{ flex: 1 }}>
          <input value={prefs.company.name} placeholder={T(L, "companyName")} style={{ ...inputStyle, marginBottom: 8 }}
            onChange={(e) => setPrefs({ ...prefs, company: { ...prefs.company, name: e.target.value } })} />
          <input value={prefs.company.contact} placeholder={T(L, "companyContact")} style={{ ...inputStyle, marginBottom: 8 }}
            onChange={(e) => setPrefs({ ...prefs, company: { ...prefs.company, contact: e.target.value } })} />
          <input value={prefs.company.email || ""} placeholder={T(L, "myEmail")} type="email" style={inputStyle}
            onChange={(e) => setPrefs({ ...prefs, company: { ...prefs.company, email: e.target.value } })} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ Project screen ═══════════════ */
function ProjectScreen({ project, setProject, prefs, setPrefs, L, onSaveTemplate }) {
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [building, setBuilding] = useState(false);
  const patch = (p) => setProject((prev) => ({ ...prev, ...p }));
  const mode = project.mode || "quote";

  const locate = () => {
    if (!navigator.geolocation) { patch({ weather: { status: "error", days: [] } }); return; }
    patch({ weather: { status: "loading", days: [] } });
    navigator.geolocation.getCurrentPosition(
      (pos) => { const { latitude: lat, longitude: lng } = pos.coords; setProject((prev) => ({ ...prev, lat, lng })); fetchWeather(lat, lng); },
      () => patch({ weather: { status: "error", days: [] } }), { enableHighAccuracy: true, timeout: 8000 });
  };
  const fetchWeather = async (lat, lng) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&past_days=7&forecast_days=1&timezone=auto`;
      const d = await (await fetch(url)).json();
      const days = d.daily.time.map((t, i) => ({ date: t, dow: DOW[new Date(t).getDay()], code: d.daily.weather_code[i],
        tmax: Math.round(d.daily.temperature_2m_max[i]), tmin: Math.round(d.daily.temperature_2m_min[i]), rain: d.daily.precipitation_sum[i] })).slice(-7);
      patch({ weather: { status: "ok", days } });
    } catch { patch({ weather: { status: "error", days: [] } }); }
  };
  const manualWeek = () => {
    const base = new Date();
    const days = Array.from({ length: 7 }).map((_, i) => { const dt = new Date(base); dt.setDate(base.getDate() - (6 - i));
      return { date: dt.toISOString().slice(0, 10), dow: DOW[dt.getDay()], code: 0, tmax: 22, tmin: 14, rain: 0 }; });
    patch({ weather: { status: "manual", days } });
  };

  const addItem = () => patch({ items: [...project.items, blankItem()] });
  const setItem = (id, p) => patch({ items: project.items.map((it) => it.id === id ? { ...it, ...p } : it) });
  const delItem = (id) => patch({ items: project.items.filter((it) => it.id !== id) });
  const addPhoto = (id, files) => {
    Array.from(files).forEach((f) => { const reader = new FileReader(); reader.onload = () => {
      const photo = { id: uid(), src: reader.result, annotated: null, lat: project.lat, lng: project.lng, ts: iso() };
      setProject((prev) => ({ ...prev, items: prev.items.map((it) => it.id === id ? { ...it, photos: [...it.photos, photo] } : it) }));
    }; reader.readAsDataURL(f); });
  };
  const savePhoto = (itemId, photoId, dataUrl, dims) => setProject((prev) => ({ ...prev, items: prev.items.map((it) => it.id !== itemId ? it
    : { ...it, photos: it.photos.map((ph) => ph.id === photoId ? { ...ph, annotated: dataUrl, dims: dims || [] } : ph) }) }));
  const delPhoto = (itemId, photoId) => setProject((prev) => ({ ...prev, items: prev.items.map((it) => it.id !== itemId ? it
    : { ...it, photos: it.photos.filter((ph) => ph.id !== photoId) }) }));

  const buildReport = async (kind, tradeKey) => { setBuilding(true);
    try { await generateReport({ kind, tradeKey, project, prefs, setProject, setPrefs }); } finally { setBuilding(false); } };

  return (
    <>
      <section style={{ marginTop: 16 }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color: C.bg,
          background: (MODE_META[mode] || MODE_META.quote).color, borderRadius: 6, padding: "3px 10px", marginBottom: 10 }}>
          {T(L, (MODE_META[mode] || MODE_META.quote).label)}
        </div>
        <input value={project.name} onChange={(e) => patch({ name: e.target.value })} placeholder={T(L, "projectName")}
          style={{ ...inputStyle, fontSize: 18, fontWeight: 700, marginBottom: 10 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <input value={project.client} placeholder={T(L, "client")} style={inputStyle} onChange={(e) => patch({ client: e.target.value })} />
          <input value={project.code} placeholder={T(L, "code")} style={inputStyle} onChange={(e) => patch({ code: e.target.value })} />
        </div>
        <label style={lbl}><Globe size={13} /> {T(L, "clientLang")}</label>
        <select value={project.clientLang} onChange={(e) => patch({ clientLang: e.target.value })} style={inputStyle}>
          {LANGS.map((l) => <option key={l.code} value={l.code}>{l.native} — {langEnglishName[l.code]}</option>)}
        </select>
        <input value={project.clientEmail || ""} placeholder={T(L, "clientEmail")} type="email"
          onChange={(e) => patch({ clientEmail: e.target.value })} style={{ ...inputStyle, marginTop: 8 }} />
        {mode !== "inspect" && (
          <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: C.dim, whiteSpace: "nowrap" }}>{T(L, "validUntil")}:</span>
            <input value={project.validDays ?? 30} inputMode="numeric" onChange={(e) => patch({ validDays: e.target.value })}
              style={{ ...inputStyle, width: 70, padding: "6px 8px" }} />
            <span style={{ fontSize: 13, color: C.dim }}>{L === "ko" ? "일" : "days"}</span>
          </div>
        )}
        {/* location/weather only matter for quote (measure) and inspect */}
        {mode !== "final" && (
          <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={locate} style={{ ...inputStyle, width: "auto", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", whiteSpace: "nowrap" }}>
              <MapPin size={15} /> {T(L, "getLocation")}</button>
            <span style={{ fontSize: 13, color: C.dim }}>{project.lat ? `${project.lat.toFixed(4)}, ${project.lng.toFixed(4)}` : T(L, "locationUnset")}</span>
          </div>
        )}
      </section>

      {/* ───── INSPECT MODE ───── */}
      {mode === "inspect" && <>
        <WeatherStrip weather={project.weather} L={L} onManual={manualWeek} />
        <AIAdvice project={project} L={L} />
        <FloorPlanSection project={project} setProject={setProject} L={L}
          onEditPhoto={(pinId, photoId) => setEditingPhoto({ pinId, photoId })} />
      </>}

      {/* ───── QUOTE + INSPECT: item list ───── */}
      {mode !== "final" && (
        <section style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 16, margin: 0 }}>{T(L, "items")} ({project.items.length})</h2>
            <span style={{ fontSize: 12, color: C.dim }}>{T(L, "byTrade")} · {T(L, "photosGps")}</span>
          </div>
          {project.items.map((it, n) => (
            <ItemCard key={it.id} item={it} n={n} L={L} mode={mode} onChange={(p) => setItem(it.id, p)} onDel={() => delItem(it.id)}
              onPhoto={(files) => addPhoto(it.id, files)} onEditPhoto={(photoId) => setEditingPhoto({ itemId: it.id, photoId })}
              onDelPhoto={(photoId) => delPhoto(it.id, photoId)} />
          ))}
          <button onClick={addItem} style={{ ...inputStyle, background: C.panel, cursor: "pointer", marginTop: 10,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontWeight: 600 }}><Plus size={16} /> {T(L, "addItem")}</button>
          {project.items.length > 0 && (
            <button onClick={onSaveTemplate} style={{ ...miniAction, marginTop: 8 }}>
              <ClipboardList size={13} /> {T(L, "saveTemplate")}</button>
          )}
        </section>
      )}

      {/* ───── QUOTE MODE: send quantity-only requests to subs + estimate ───── */}
      {mode === "quote" && <>
        <TradeQuotes project={project} setProject={setProject} L={L} onBuild={(tk) => buildReport("quote", tk)} />
        <EstimateSummary project={project} L={L} />
        <section style={{ marginTop: 18 }}>
          <button onClick={() => buildReport("quote")} disabled={building} style={{ ...bigBtn, background: C.amber, width: "100%" }}>
            {building ? <Loader2 size={18} className="spin" /> : <FileDown size={18} />} {T(L, "fullQuote")}</button>
        </section>
      </>}

      {/* ───── FINAL QUOTE MODE ───── */}
      {mode === "final" && (
        <FinalQuote project={project} setProject={setProject} prefs={prefs} setPrefs={setPrefs} L={L}
          onBuild={() => buildReport("client")} building={building} />
      )}

      {/* ───── INSPECT MODE: signature + progress report ───── */}
      {mode === "inspect" && <>
        <SignatureSection project={project} setProject={setProject} L={L} />
        <section style={{ marginTop: 18 }}>
          <button onClick={() => buildReport("progress")} disabled={building} style={{ ...bigBtn, background: C.green, width: "100%" }}>
            {building ? <Loader2 size={18} className="spin" /> : <FileDown size={18} />} {T(L, "progressReport")}</button>
        </section>
      </>}

      {/* shared: email + csv */}
      <section style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <button onClick={() => emailReport(project, prefs)} style={{ ...inputStyle, background: C.panel, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontWeight: 600 }}>
          <FileDown size={16} /> {T(L, "emailReport")}</button>
        <button onClick={() => exportCSV(project)} style={{ ...inputStyle, background: C.panel, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontWeight: 600 }}>
          <FileDown size={16} /> {T(L, "exportCsv")}</button>
      </section>
      {building && <p style={{ color: C.dim, fontSize: 13, textAlign: "center", marginTop: 8 }}><Loader2 size={13} className="spin" /> {T(L, "translating")}</p>}

      {editingPhoto && <PhotoEditor L={L} photo={findPhoto(project, editingPhoto)} onClose={() => setEditingPhoto(null)}
        onSave={(dataUrl, dims) => { if (editingPhoto.itemId) savePhoto(editingPhoto.itemId, editingPhoto.photoId, dataUrl, dims);
          else savePinPhoto(setProject, editingPhoto.pinId, editingPhoto.photoId, dataUrl); setEditingPhoto(null); }} />}
    </>
  );
}

/* ═══════════════ Final quote mode (margins, sub selection, profit) ═══════════════ */
function FinalQuote({ project, setProject, prefs, setPrefs, L, onBuild, building }) {
  const patch = (p) => setProject((prev) => ({ ...prev, ...p }));
  const defMargin = prefs.defaultMargin ?? 20;
  const subs = project.subQuotes || [];
  const myWork = project.myWork || [];
  const tradeMargins = project.tradeMargins || {};

  const addSub = () => patch({ subQuotes: [...subs, { id: uid(), trade: "fence", sub: "", amount: "", note: "", included: true }] });
  const setSub = (id, p) => patch({ subQuotes: subs.map((s) => s.id === id ? { ...s, ...p } : s) });
  const delSub = (id) => patch({ subQuotes: subs.filter((s) => s.id !== id) });
  const addWork = () => patch({ myWork: [...myWork, { id: uid(), title: "", amount: "", note: "" }] });
  const setWork = (id, p) => patch({ myWork: myWork.map((w) => w.id === id ? { ...w, ...p } : w) });
  const delWork = (id) => patch({ myWork: myWork.filter((w) => w.id !== id) });
  const marginFor = (trade) => tradeMargins[trade] != null && tradeMargins[trade] !== "" ? num(tradeMargins[trade]) : defMargin;

  // calc
  let subCost = 0, subClient = 0;
  subs.filter((s) => s.included).forEach((s) => {
    const c = num(s.amount); subCost += c; subClient += c * (1 + marginFor(s.trade) / 100);
  });
  const workCost = myWork.reduce((sum, w) => sum + num(w.amount), 0);
  const cost = subCost + workCost;
  const clientEx = subClient + workCost; // my own work passed at cost (no margin); change if needed
  const marginAmt = clientEx - cost;
  const gst = clientEx * GST_RATE;

  const usedTrades = [...new Set(subs.map((s) => s.trade))];

  return (
    <>
      {/* default margin */}
      <section style={{ ...card, marginTop: 16 }}>
        <label style={{ ...lbl, marginTop: 0 }}>{T(L, "defaultMargin")}</label>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input value={prefs.defaultMargin ?? 20} inputMode="decimal"
            onChange={(e) => setPrefs({ ...prefs, defaultMargin: e.target.value })}
            style={{ ...inputStyle, width: 90 }} /><span style={{ color: C.dim }}>%</span>
        </div>
      </section>

      {/* sub quotes */}
      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 16, marginBottom: 4 }}>{T(L, "subQuotes")}</h2>
        {subs.map((s) => (
          <div key={s.id} style={{ ...card, marginBottom: 8, opacity: s.included ? 1 : 0.5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={s.included} onChange={(e) => setSub(s.id, { included: e.target.checked })}
                style={{ width: 18, height: 18, accentColor: C.green }} />
              <select value={s.trade} onChange={(e) => setSub(s.id, { trade: e.target.value })}
                style={{ ...inputStyle, flex: "0 0 130px", padding: "6px 8px" }}>
                {TRADES.map((t) => <option key={t.key} value={t.key}>{tradeLabel(t.key, L)}</option>)}
              </select>
              <input value={s.sub} onChange={(e) => setSub(s.id, { sub: e.target.value })} placeholder={T(L, "subName")}
                style={{ ...inputStyle, flex: 1, padding: "6px 8px" }} />
              <button onClick={() => delSub(s.id)} style={iconBtn}><Trash2 size={15} /></button>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: C.dim }}>{T(L, "subAmount")}</span>
              <input value={s.amount} inputMode="decimal" onChange={(e) => setSub(s.id, { amount: e.target.value })} placeholder="0.00"
                style={{ ...inputStyle, width: 110, padding: "6px 8px" }} />
              <span style={{ fontSize: 12, color: C.dim }}>{tradeLabel(s.trade, L)} {T(L, "tradeMargin")}:</span>
              <input value={tradeMargins[s.trade] ?? ""} inputMode="decimal" placeholder={String(defMargin)}
                onChange={(e) => patch({ tradeMargins: { ...tradeMargins, [s.trade]: e.target.value } })}
                style={{ ...inputStyle, width: 64, padding: "6px 8px" }} />
              <span style={{ fontSize: 13, color: C.green, fontWeight: 700 }}>
                → {money(num(s.amount) * (1 + marginFor(s.trade) / 100))}</span>
            </div>
            <input value={s.note} onChange={(e) => setSub(s.id, { note: e.target.value })} placeholder={T(L, "subMemo")}
              style={{ ...inputStyle, marginTop: 8, padding: "6px 8px", fontSize: 13 }} />
          </div>
        ))}
        <button onClick={addSub} style={{ ...inputStyle, background: C.panel, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontWeight: 600 }}><Plus size={16} /> {T(L, "addSubQuote")}</button>
      </section>

      {/* my own work */}
      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 16, marginBottom: 4 }}>{T(L, "myWork")}</h2>
        {myWork.map((w) => (
          <div key={w.id} style={{ ...card, marginBottom: 8, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <input value={w.title} onChange={(e) => setWork(w.id, { title: e.target.value })} placeholder={T(L, "workTitle")}
              style={{ ...inputStyle, flex: 1, minWidth: 140, padding: "6px 8px" }} />
            <input value={w.amount} inputMode="decimal" onChange={(e) => setWork(w.id, { amount: e.target.value })} placeholder={T(L, "workAmount")}
              style={{ ...inputStyle, width: 110, padding: "6px 8px" }} />
            <button onClick={() => delWork(w.id)} style={iconBtn}><Trash2 size={15} /></button>
          </div>
        ))}
        <button onClick={addWork} style={{ ...inputStyle, background: C.panel, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontWeight: 600 }}><Plus size={16} /> {T(L, "addMyWork")}</button>
      </section>

      {/* profit summary (internal only) */}
      {clientEx > 0 && (
        <section style={{ ...card, marginTop: 18, borderLeft: `4px solid ${C.amber}` }}>
          <h2 style={{ fontSize: 16, margin: "0 0 10px" }}>{T(L, "profitSummary")} <span style={{ fontSize: 11, color: C.dim }}>(internal)</span></h2>
          <Row label={T(L, "cost")} val={money(cost)} dim />
          <Row label={T(L, "marginAmt")} val={money(marginAmt)} color={C.amber} />
          <Row label={T(L, "clientPrice")} val={money(clientEx)} />
          <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 8, paddingTop: 8 }}>
            <Row label={T(L, "gst")} val={money(gst)} dim />
            <Row label={T(L, "total")} val={money(clientEx + gst)} big color={C.green} />
            <Row label={T(L, "netProfit")} val={money(marginAmt)} color={C.amber} />
          </div>
        </section>
      )}

      <p style={{ color: C.dim, fontSize: 12, marginTop: 12 }}>{T(L, "clientQuoteNote")}</p>
      <section style={{ marginTop: 8 }}>
        <button onClick={onBuild} disabled={building || clientEx <= 0} style={{ ...bigBtn, background: C.blue, width: "100%",
          opacity: clientEx <= 0 ? 0.5 : 1 }}>
          {building ? <Loader2 size={18} className="spin" /> : <FileDown size={18} />} {T(L, "buildClientQuote")}</button>
      </section>
    </>
  );
}
function Row({ label, val, dim, big, color }) {
  return <div style={{ display: "flex", justifyContent: "space-between", padding: big ? "6px 0" : "3px 0",
    fontSize: big ? 17 : 14, fontWeight: big ? 800 : 400 }}>
    <span style={{ color: dim ? C.dim : C.text }}>{label}</span>
    <span style={{ color: color || C.text, fontWeight: color || big ? 700 : 400 }}>{val}</span></div>;
}

/* ═══════════════ Estimate summary (per-trade subtotal + GST) ═══════════════ */
function EstimateSummary({ project, L }) {
  const byTrade = {};
  project.items.forEach((it) => { const t = it.trade; byTrade[t] = (byTrade[t] || 0) + num(it.qty) * num(it.rate); });
  const rows = Object.entries(byTrade).filter(([, v]) => v > 0);
  const subtotal = rows.reduce((s, [, v]) => s + v, 0);
  if (subtotal <= 0) return null;
  const gst = subtotal * GST_RATE;
  return (
    <section style={{ ...card, marginTop: 18 }}>
      <h2 style={{ fontSize: 16, margin: "0 0 10px" }}>{T(L, "estimate")}</h2>
      {rows.map(([tk, v]) => (
        <div key={tk} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 14 }}>
          <span style={{ color: C.dim }}>{tradeLabel(tk, L)}</span><span>{money(v)}</span>
        </div>
      ))}
      <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 8, paddingTop: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
          <span style={{ color: C.dim }}>{T(L, "subtotal")} ({T(L, "exVat")})</span><span>{money(subtotal)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 4 }}>
          <span style={{ color: C.dim }}>{T(L, "gst")}</span><span>{money(gst)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 17, marginTop: 6, color: C.green }}>
          <span>{T(L, "total")}</span><span>{money(subtotal + gst)}</span></div>
      </div>
    </section>
  );
}

/* ═══════════════ Signature pad ═══════════════ */
function SignatureSection({ project, setProject, L }) {
  const [open, setOpen] = useState(false);
  const cvRef = useRef(); const drawing = useRef(false);
  const start = (e) => { e.preventDefault(); drawing.current = true; const ctx = cvRef.current.getContext("2d");
    ctx.beginPath(); ctx.moveTo(...pos(e)); };
  const draw = (e) => { if (!drawing.current) return; e.preventDefault(); const ctx = cvRef.current.getContext("2d");
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.5; ctx.lineCap = "round"; ctx.lineTo(...pos(e)); ctx.stroke(); };
  const end = () => { drawing.current = false; };
  const pos = (e) => { const r = cvRef.current.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e;
    return [t.clientX - r.left, t.clientY - r.top]; };
  const clear = () => { const c = cvRef.current; c.getContext("2d").clearRect(0, 0, c.width, c.height); };
  const saveSig = () => { setProject((prev) => ({ ...prev, signature: cvRef.current.toDataURL("image/png") })); setOpen(false); };

  return (
    <section style={{ marginTop: 18 }}>
      <h2 style={{ fontSize: 16, marginBottom: 6 }}><Pencil size={15} style={{ verticalAlign: -2 }} /> {T(L, "signature")}</h2>
      {project.signature && !open && (
        <div style={{ ...card, display: "flex", alignItems: "center", gap: 12 }}>
          <img src={project.signature} alt="" style={{ height: 50, background: "#222", borderRadius: 6, padding: 4 }} />
          <span style={{ color: C.green, fontWeight: 600 }}>✓ {T(L, "signed")}</span>
          <button onClick={() => setProject((prev) => ({ ...prev, signature: null }))} style={{ ...iconBtn, marginLeft: "auto" }}><Trash2 size={15} /></button>
        </div>
      )}
      {!project.signature && !open && (
        <button onClick={() => setOpen(true)} style={{ ...inputStyle, background: C.panel, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Pencil size={15} /> {T(L, "addSignature")}</button>
      )}
      {open && (
        <div style={{ ...card }}>
          <p style={{ color: C.dim, fontSize: 12, marginTop: 0 }}>{T(L, "sign")}</p>
          <canvas ref={cvRef} width={520} height={150}
            onMouseDown={start} onMouseMove={draw} onMouseUp={end} onMouseLeave={end}
            onTouchStart={start} onTouchMove={draw} onTouchEnd={end}
            style={{ width: "100%", height: 150, background: "#0c100c", borderRadius: 8, touchAction: "none", border: `1px solid ${C.line}` }} />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={clear} style={{ ...miniAction }}>{T(L, "clearSig")}</button>
            <button onClick={saveSig} style={{ ...primaryBtn, marginLeft: "auto" }}><Check size={15} /> {T(L, "save")}</button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ═══════════════ CSV + email ═══════════════ */
function exportCSV(project) {
  const rows = [["#", "Trade", "Title", "Status", "Severity", "Qty", "Unit", "Rate", "Line Total", "Note"]];
  project.items.forEach((it, i) => rows.push([i + 1, tradeLabel(it.trade, "en"), it.title, it.status, it.severity,
    it.qty, it.unit, it.rate, (num(it.qty) * num(it.rate)).toFixed(2), (it.note || "").replace(/\n/g, " ")]));
  const subtotal = project.items.reduce((s, it) => s + num(it.qty) * num(it.rate), 0);
  rows.push([]); rows.push(["", "", "", "", "", "", "", "Subtotal", subtotal.toFixed(2)]);
  rows.push(["", "", "", "", "", "", "", "GST 10%", (subtotal * GST_RATE).toFixed(2)]);
  rows.push(["", "", "", "", "", "", "", "Total", (subtotal * (1 + GST_RATE)).toFixed(2)]);
  const csv = rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" }); const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = `${project.name}_estimate.csv`; a.click(); URL.revokeObjectURL(url);
}
function emailReport(project, prefs) {
  const subtotal = project.items.reduce((s, it) => s + num(it.qty) * num(it.rate), 0);
  const to = project.clientEmail || "";
  const subject = `${project.name} — ${prefs.company.name}`;
  const lines = project.items.map((it, i) => `${i + 1}. [${tradeLabel(it.trade, "en")}] ${it.title}` +
    (num(it.qty) ? ` — ${it.qty}${it.unit}${num(it.rate) ? " @ " + money(num(it.rate)) + " = " + money(num(it.qty) * num(it.rate)) : ""}` : ""));
  const body = `${prefs.company.name}\n${prefs.company.contact || ""}\n\nProject: ${project.name}\nClient: ${project.client || "-"}\n\n` +
    lines.join("\n") + (subtotal > 0 ? `\n\nSubtotal: ${money(subtotal)}\nGST: ${money(subtotal * GST_RATE)}\nTotal: ${money(subtotal * (1 + GST_RATE))}` : "") +
    `\n\n(Detailed report attached separately — download from the app.)`;
  window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function findPhoto(project, ref) {
  if (ref.itemId) return project.items.find((i) => i.id === ref.itemId)?.photos.find((p) => p.id === ref.photoId);
  return project.pins.find((p) => p.id === ref.pinId)?.photos.find((ph) => ph.id === ref.photoId);
}
function savePinPhoto(setProject, pinId, photoId, dataUrl) {
  setProject((prev) => ({ ...prev, pins: prev.pins.map((p) => p.id !== pinId ? p
    : { ...p, photos: p.photos.map((ph) => ph.id === photoId ? { ...ph, annotated: dataUrl } : ph) }) }));
}

/* ═══════════════ Weather strip ═══════════════ */
function WeatherStrip({ weather, L, onManual }) {
  const { status, days } = weather;
  if (status === "idle") return null;
  if (status === "loading") return <div style={{ ...card, marginTop: 14, display: "flex", gap: 8, alignItems: "center" }}><Loader2 size={16} className="spin" /> …</div>;
  if (status === "error") return <div style={{ ...card, marginTop: 14, display: "flex", gap: 10, alignItems: "center" }}>
    <span style={{ color: C.dim }}>{T(L, "weatherFail")}</span><button onClick={onManual} style={miniBtn}>{T(L, "enterManual")}</button></div>;
  return (
    <section style={{ ...card, marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>{T(L, "weather")} {status === "manual" && `(${T(L, "manual")})`}</span>
        <span style={{ color: C.dim, fontSize: 12 }}>{T(L, "weekHint")}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
        {days.map((d, i) => { const w = WX(d.code); const Icon = w.icon; const rainy = d.rain > 1;
          return <div key={i} style={{ background: rainy ? "#1c2a33" : C.panel2, border: `1px solid ${rainy ? C.blue : C.line}`,
            borderRadius: 8, padding: "8px 2px", textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 12 }}>{d.dow}</div>
            <Icon size={19} style={{ color: w.c, margin: "4px 0" }} />
            <div style={{ fontSize: 10, color: C.dim }}>{d.tmax}°/{d.tmin}°</div>
            <div style={{ fontSize: 10, color: C.blue, fontWeight: 700, height: 13 }}>{d.rain > 0 ? `${d.rain.toFixed(1)}mm` : ""}</div>
          </div>; })}
      </div>
    </section>
  );
}

/* ═══════════════ AI advice ═══════════════ */
function AIAdvice({ project, L }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(""); const [a, setA] = useState(""); const [loading, setLoading] = useState(false);
  const ask = async () => {
    if (!q.trim()) return; setLoading(true); setA("");
    const ctx = `Project: ${project.name}\nItems:\n` + project.items.map((it, i) => `${i + 1}. [${tradeLabel(it.trade, "en")}] ${it.title} — ${it.note}`).join("\n");
    const out = await askClaude(`${ctx}\n\nQuestion: ${q}`,
      `You are an experienced landscape professional in Queensland, Australia. Give practical, specific advice on site inspection and quoting, considering safety, planting, drainage, materials and cost. Reply in ${langEnglishName[L] || "English"}, concise.`);
    setA(out || "—"); setLoading(false);
  };
  return (
    <section style={{ marginTop: 14 }}>
      <button onClick={() => setOpen(!open)} style={{ ...inputStyle, background: open ? C.panel2 : C.panel, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}><Sparkles size={16} style={{ color: C.amber }} /> {T(L, "aiAdvice")}</button>
      {open && <div style={{ ...card, marginTop: 8 }}>
        <textarea value={q} onChange={(e) => setQ(e.target.value)} rows={2} placeholder={T(L, "askPlaceholder")} style={{ ...inputStyle, resize: "vertical" }} />
        <button onClick={ask} disabled={loading} style={{ ...inputStyle, background: C.amber, color: C.bg, fontWeight: 700, cursor: "pointer",
          width: "auto", marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
          {loading ? <Loader2 size={15} className="spin" /> : <Sparkles size={15} />} {T(L, "getAdvice")}</button>
        {a && <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", background: C.panel2, borderRadius: 9, padding: 12 }}>{a}</div>}
      </div>}
    </section>
  );
}

/* ═══════════════ Floor plan ═══════════════ */
function FloorPlanSection({ project, setProject, L, onEditPhoto }) {
  const fileRef = useRef(); const imgRef = useRef();
  const [activePin, setActivePin] = useState(null);
  const patch = (p) => setProject((prev) => ({ ...prev, ...p }));
  const upload = (f) => { const r = new FileReader(); r.onload = () => patch({ floorPlan: r.result, pins: [] }); r.readAsDataURL(f); };
  const onTap = (e) => {
    if (!project.floorPlan) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100, y = ((e.clientY - rect.top) / rect.height) * 100;
    const pin = { id: uid(), x, y, note: "", photos: [] };
    patch({ pins: [...project.pins, pin] }); setActivePin(pin.id);
  };
  const setPin = (id, p) => patch({ pins: project.pins.map((pn) => pn.id === id ? { ...pn, ...p } : pn) });
  const delPin = (id) => { patch({ pins: project.pins.filter((pn) => pn.id !== id) }); setActivePin(null); };
  const addPinPhoto = (id, files) => { Array.from(files).forEach((f) => { const r = new FileReader(); r.onload = () => {
    const photo = { id: uid(), src: r.result, annotated: null, ts: iso() };
    setProject((prev) => ({ ...prev, pins: prev.pins.map((pn) => pn.id === id ? { ...pn, photos: [...pn.photos, photo] } : pn) }));
  }; r.readAsDataURL(f); }); };
  const pin = project.pins.find((p) => p.id === activePin);

  return (
    <section style={{ marginTop: 18 }}>
      <h2 style={{ fontSize: 16, marginBottom: 4 }}><MapIcon size={16} style={{ verticalAlign: -2 }} /> {T(L, "floorPlan")}</h2>
      {!project.floorPlan ? (
        <><p style={{ color: C.dim, fontSize: 13, marginTop: 0 }}>{T(L, "floorPlanHint")}</p>
        <button onClick={() => fileRef.current?.click()} style={{ ...inputStyle, background: C.panel, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><ImgIcon size={16} /> {T(L, "uploadPlan")}</button></>
      ) : (
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `1px solid ${C.line}` }}>
          <img ref={imgRef} src={project.floorPlan} alt="" onClick={onTap} style={{ width: "100%", display: "block", cursor: "crosshair" }} />
          {project.pins.map((p, i) => (
            <button key={p.id} onClick={(e) => { e.stopPropagation(); setActivePin(p.id); }}
              style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-100%)",
                background: activePin === p.id ? C.amber : C.red, color: "#fff", border: "2px solid #fff",
                borderRadius: "50% 50% 50% 0", width: 26, height: 26, cursor: "pointer", fontWeight: 700, fontSize: 12, rotate: "45deg" }}>
              <span style={{ display: "inline-block", rotate: "-45deg" }}>{i + 1}</span></button>
          ))}
          <button onClick={() => patch({ floorPlan: null, pins: [] })} style={{ position: "absolute", top: 8, right: 8, ...iconBtn, background: "rgba(0,0,0,.6)" }}><X size={15} /></button>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files[0] && upload(e.target.files[0])} />
      {pin && (
        <div style={{ ...card, marginTop: 10, borderLeft: `4px solid ${C.amber}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <b>{T(L, "defectPins")} #{project.pins.indexOf(pin) + 1}</b>
            <button onClick={() => delPin(pin.id)} style={iconBtn}><Trash2 size={15} /></button>
          </div>
          <NoteWithVoiceAI value={pin.note} onChange={(v) => setPin(pin.id, { note: v })} L={L} placeholder={T(L, "pinNote")} photoForAnalysis={pin.photos[0]} />
          <PhotoRow photos={pin.photos} L={L} onAdd={(files) => addPinPhoto(pin.id, files)} onEdit={(photoId) => onEditPhoto(pin.id, photoId)}
            onDel={(photoId) => setPin(pin.id, { photos: pin.photos.filter((ph) => ph.id !== photoId) })} />
        </div>
      )}
    </section>
  );
}

/* ═══════════════ Item card ═══════════════ */
function ItemCard({ item, n, L, mode, onChange, onDel, onPhoto, onEditPhoto, onDelPhoto }) {
  const STATUS = { open: C.red, prog: C.amber, done: C.green };
  const SEV = { high: C.red, med: C.amber, low: C.blue };
  return (
    <div style={{ ...card, marginTop: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 24, height: 24, borderRadius: 6, background: C.green, color: C.bg, display: "grid",
          placeItems: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{n + 1}</span>
        <input value={item.title} onChange={(e) => onChange({ title: e.target.value })} placeholder={T(L, "itemTitle")} style={{ ...inputStyle, fontWeight: 600 }} />
        <button onClick={onDel} style={iconBtn}><Trash2 size={16} /></button>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Tag size={14} style={{ color: C.dim }} />
        {TRADES.map((t) => <button key={t.key} onClick={() => onChange({ trade: t.key })} style={chip(item.trade === t.key, C.green)}>{tradeLabel(t.key, L)}</button>)}
      </div>
      {mode === "inspect" && (
        <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: C.dim }}>{T(L, "status")}:</span>
            {["open", "prog", "done"].map((s) => <button key={s} onClick={() => onChange({ status: s })} style={chip(item.status === s, STATUS[s])}>
              {T(L, s === "open" ? "st_open" : s === "prog" ? "st_prog" : "st_done")}</button>)}
          </div>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: C.dim }}>{T(L, "severity")}:</span>
            {["high", "med", "low"].map((s) => <button key={s} onClick={() => onChange({ severity: s })} style={chip(item.severity === s, SEV[s])}>
              {T(L, s === "high" ? "sv_high" : s === "med" ? "sv_med" : "sv_low")}</button>)}
          </div>
        </div>
      )}
      <div style={{ marginTop: 8 }}>
        <NoteWithVoiceAI value={item.note} onChange={(v) => onChange({ note: v })} L={L} placeholder={T(L, "siteNote")} photoForAnalysis={item.photos[0]} />
      </div>
      <QtyRow item={item} L={L} mode={mode} onChange={onChange} />
      <PhotoRow photos={item.photos} L={L} onAdd={onPhoto} onEdit={onEditPhoto} onDel={onDelPhoto} />
    </div>
  );
}

/* ═══════════════ Qty / unit / rate row ═══════════════ */
function QtyRow({ item, L, mode, onChange }) {
  const [pickOpen, setPickOpen] = useState(false);
  const dims = item.photos.flatMap((p) => p.dims || []);
  const lineTotal = num(item.qty) * num(item.rate);
  const showRate = mode !== "quote"; // quote-to-sub: quantities only
  return (
    <div style={{ marginTop: 10, background: C.panel2, borderRadius: 9, padding: "8px 10px" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: "1 1 70px" }}>
          <span style={{ fontSize: 10, color: C.dim }}>{T(L, "qty")}</span>
          <input value={item.qty} onChange={(e) => onChange({ qty: e.target.value })} inputMode="decimal" placeholder="0"
            style={{ ...inputStyle, padding: "6px 8px", fontSize: 13 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: "0 0 64px" }}>
          <span style={{ fontSize: 10, color: C.dim }}>{T(L, "unit")}</span>
          <select value={item.unit} onChange={(e) => onChange({ unit: e.target.value })}
            style={{ ...inputStyle, padding: "6px 6px", fontSize: 13 }}>
            {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        {showRate && <>
          <div style={{ display: "flex", flexDirection: "column", flex: "1 1 80px" }}>
            <span style={{ fontSize: 10, color: C.dim }}>{T(L, "rate")} ($)</span>
            <input value={item.rate} onChange={(e) => onChange({ rate: e.target.value })} inputMode="decimal" placeholder="0.00"
              style={{ ...inputStyle, padding: "6px 8px", fontSize: 13 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "1 1 80px" }}>
            <span style={{ fontSize: 10, color: C.dim }}>{T(L, "lineTotal")}</span>
            <span style={{ fontWeight: 700, fontSize: 14, padding: "6px 0", color: lineTotal ? C.green : C.dim }}>
              {lineTotal ? money(lineTotal) : "—"}</span>
          </div>
        </>}
      </div>
      {dims.length > 0 && (
        <div style={{ marginTop: 6 }}>
          <button onClick={() => setPickOpen(!pickOpen)} style={{ ...miniAction, fontSize: 11 }}>
            <Ruler size={12} /> {T(L, "useDim")}</button>
          {pickOpen && (
            <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
              {dims.map((d, i) => (
                <button key={i} onClick={() => {
                  const val = parseFloat(d); const unit = d.replace(/[\d.\s]/g, "") || item.unit;
                  onChange({ qty: isFinite(val) ? String(val) : item.qty, unit: UNITS.includes(unit) ? unit : item.unit });
                  setPickOpen(false);
                }} style={{ ...chip(false, C.sky), color: C.sky }}>{d}</button>
              ))}
              {dims.length >= 2 && (
                <button onClick={() => {
                  const a = parseFloat(dims[0]), b = parseFloat(dims[1]);
                  if (isFinite(a) && isFinite(b)) onChange({ qty: String(+(a * b).toFixed(2)), unit: "m²" });
                  setPickOpen(false);
                }} style={{ ...chip(false, C.amber), color: C.amber }}>{dims[0]} × {dims[1]} = m²</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════ Note + voice + AI ═══════════════ */
function NoteWithVoiceAI({ value, onChange, L, placeholder, photoForAnalysis }) {
  const [busy, setBusy] = useState(""); const [listening, setListening] = useState(false);
  const recRef = useRef();
  const voiceOK = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const toggleVoice = () => {
    if (!voiceOK) { alert(T(L, "voiceOff")); return; }
    if (listening) { recRef.current?.stop(); setListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR(); recRef.current = r; r.lang = L === "ko" ? "ko-KR" : "en-AU"; r.continuous = true; r.interimResults = false;
    r.onresult = (e) => { let txt = ""; for (let i = e.resultIndex; i < e.results.length; i++) txt += e.results[i][0].transcript; onChange((value ? value + " " : "") + txt); };
    r.onend = () => setListening(false); r.start(); setListening(true);
  };
  const run = async (mode) => {
    if (!value.trim() && mode !== "analyze") return; setBusy(mode);
    const lang = langEnglishName[L] || "English"; let out = "";
    if (mode === "polish") {
      out = await askClaude(`Rewrite this landscaping site note in clear, professional ${lang}, keeping the original facts. Output only the rewritten note:\n\n"${value}"`, "You are a professional editor for landscape inspection reports.");
      if (out) onChange(out.replace(/^["']|["']$/g, ""));
    } else if (mode === "summarize") {
      out = await askClaude(`Summarise this dictated/rough site note into a concise professional description in ${lang}, capturing key defects, measurements and actions. Output only the description:\n\n"${value}"`, "You are a landscape site inspector assistant.");
      if (out) onChange(out.replace(/^["']|["']$/g, ""));
    } else if (mode === "analyze" && photoForAnalysis) {
      const data = (photoForAnalysis.annotated || photoForAnalysis.src).split(",")[1];
      out = await askClaude(`Describe what this landscaping site photo shows for an inspection report in ${lang}. Note visible defects, materials and concerns. Concise and professional.`, "You are a landscape inspector.", data);
      if (out) onChange((value ? value + "\n" : "") + out);
    }
    setBusy("");
  };
  return (
    <div>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} placeholder={placeholder} style={{ ...inputStyle, resize: "vertical" }} />
      <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
        <button onClick={toggleVoice} style={{ ...miniAction, color: listening ? C.red : C.text, borderColor: listening ? C.red : C.line }}>
          {listening ? <Square size={13} /> : <Mic size={13} />} {listening ? T(L, "recording") : T(L, "record")}</button>
        <button onClick={() => run("summarize")} disabled={busy} style={miniAction}>
          {busy === "summarize" ? <Loader2 size={13} className="spin" /> : <Sparkles size={13} />} {T(L, "summarize")}</button>
        <button onClick={() => run("polish")} disabled={busy} style={miniAction}>
          {busy === "polish" ? <Loader2 size={13} className="spin" /> : <Pencil size={13} />} {T(L, "polish")}</button>
        {photoForAnalysis && <button onClick={() => run("analyze")} disabled={busy} style={miniAction}>
          {busy === "analyze" ? <Loader2 size={13} className="spin" /> : <ImgIcon size={13} />} {T(L, "analyze")}</button>}
      </div>
    </div>
  );
}

/* ═══════════════ Photo row ═══════════════ */
function PhotoRow({ photos, L, onAdd, onEdit, onDel }) {
  const ref = useRef();
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10, alignItems: "center" }}>
      {photos.map((ph) => (
        <div key={ph.id} style={{ position: "relative" }}>
          <img src={ph.annotated || ph.src} alt="" onClick={() => onEdit(ph.id)} style={{ width: 82, height: 82, objectFit: "cover",
            borderRadius: 8, cursor: "pointer", border: ph.annotated ? `2px solid ${C.amber}` : `1px solid ${C.line}` }} />
          <button onClick={() => onDel(ph.id)} style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: 99,
            background: C.red, color: "#fff", border: "none", cursor: "pointer", fontSize: 12 }}>×</button>
          <div style={{ position: "absolute", bottom: 3, left: 3, background: "rgba(0,0,0,.6)", borderRadius: 5, padding: "1px 5px",
            fontSize: 10, display: "flex", alignItems: "center", gap: 3 }}><Pencil size={10} /></div>
        </div>
      ))}
      <button onClick={() => ref.current?.click()} style={{ width: 82, height: 82, borderRadius: 8, border: `1px dashed ${C.line}`,
        background: C.panel2, color: C.dim, cursor: "pointer", display: "grid", placeItems: "center" }}><Camera size={20} /></button>
      <input ref={ref} type="file" accept="image/*" multiple capture="environment" style={{ display: "none" }}
        onChange={(e) => { onAdd(e.target.files); e.target.value = ""; }} />
    </div>
  );
}

/* ═══════════════ Trade quotes ═══════════════ */
function TradeQuotes({ project, setProject, L, onBuild }) {
  const used = [...new Set(project.items.map((it) => it.trade))].map((tk) => ({ tk, count: project.items.filter((it) => it.trade === tk).length })).filter((g) => g.count > 0);
  if (used.length === 0) return null;
  const setSub = (tk, v) => setProject((prev) => ({ ...prev, subs: { ...prev.subs, [tk]: v } }));
  return (
    <section style={{ marginTop: 22 }}>
      <h2 style={{ fontSize: 16, marginBottom: 4 }}>{T(L, "tradeQuotes")}</h2>
      <p style={{ color: C.dim, fontSize: 13, marginTop: 0 }}>{T(L, "tradeQuoteHint")}</p>
      {used.map(({ tk, count }) => (
        <div key={tk} style={{ ...card, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
          <span style={{ background: C.greenDim, fontWeight: 700, fontSize: 13, borderRadius: 6, padding: "4px 12px" }}>{tradeLabel(tk, L)}</span>
          <span style={{ color: C.dim, fontSize: 13 }}>{count} {T(L, "itemCount")}</span>
          <input value={project.subs[tk] || ""} placeholder={T(L, "subName")} onChange={(e) => setSub(tk, e.target.value)}
            style={{ ...inputStyle, flex: 1, minWidth: 120, padding: "7px 10px", fontSize: 13 }} />
          <button onClick={() => onBuild(tk)} style={{ background: C.amber, color: C.bg, border: "none", borderRadius: 8, fontWeight: 700,
            padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, whiteSpace: "nowrap" }}>
            <FileDown size={15} /> {T(L, "quote")}</button>
        </div>
      ))}
    </section>
  );
}

/* ═══════════════ Photo editor ═══════════════ */
function PhotoEditor({ photo, onClose, onSave, L }) {
  const canvasRef = useRef(); const imgRef = useRef();
  const [tool, setTool] = useState("draw"); const [color, setColor] = useState(C.amber);
  const [strokes, setStrokes] = useState([]); const [drawing, setDrawing] = useState(false);
  const [dimStart, setDimStart] = useState(null); const [scale, setScale] = useState({ pxPerUnit: null, unit: "m" });
  const COLORS = [C.amber, C.red, C.green, C.sky, "#ffffff"];
  useEffect(() => { const img = new Image(); img.onload = () => { imgRef.current = img; const cv = canvasRef.current;
    const maxW = Math.min(window.innerWidth - 40, 780); const ratio = img.height / img.width; cv.width = maxW; cv.height = maxW * ratio; redraw([]); };
    img.src = photo.annotated || photo.src; }, []);
  const redraw = (sk) => {
    const cv = canvasRef.current, ctx = cv.getContext("2d"); ctx.clearRect(0, 0, cv.width, cv.height);
    if (imgRef.current) ctx.drawImage(imgRef.current, 0, 0, cv.width, cv.height);
    sk.forEach((s) => { ctx.strokeStyle = s.color; ctx.fillStyle = s.color; ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.lineJoin = "round";
      if (s.tool === "draw") { ctx.beginPath(); s.points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke(); }
      else if (s.tool === "dim" && s.points.length === 2) { const [a, b] = s.points; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        [a, b].forEach((p) => { const ang = Math.atan2(b.y - a.y, b.x - a.x) + Math.PI / 2; ctx.beginPath();
          ctx.moveTo(p.x - 7 * Math.cos(ang), p.y - 7 * Math.sin(ang)); ctx.lineTo(p.x + 7 * Math.cos(ang), p.y + 7 * Math.sin(ang)); ctx.stroke(); });
        if (s.label) { const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2; ctx.font = "bold 15px sans-serif"; const w = ctx.measureText(s.label).width;
          ctx.fillStyle = "rgba(0,0,0,.7)"; ctx.fillRect(mx - w / 2 - 5, my - 20, w + 10, 22); ctx.fillStyle = s.color; ctx.textAlign = "center";
          ctx.fillText(s.label, mx, my - 4); ctx.textAlign = "start"; } } });
  };
  const pos = (e) => { const r = canvasRef.current.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - r.left) * (canvasRef.current.width / r.width), y: (t.clientY - r.top) * (canvasRef.current.height / r.height) }; };
  const down = (e) => { e.preventDefault(); const p = pos(e);
    if (tool === "draw") { setDrawing(true); setStrokes((s) => [...s, { tool: "draw", color, points: [p] }]); } else setDimStart(p); };
  const move = (e) => { if (tool === "draw" && drawing) { e.preventDefault(); const p = pos(e);
      setStrokes((s) => { const c = [...s]; c[c.length - 1].points.push(p); redraw(c); return c; }); }
    else if (tool === "dim" && dimStart) redraw([...strokes, { tool: "dim", color, points: [dimStart, pos(e)] }]); };
  const up = (e) => { if (tool === "draw") { setDrawing(false); return; }
    if (tool === "dim" && dimStart) { const p = pos(e.changedTouches ? { ...e, clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY } : e);
      const dist = Math.hypot(p.x - dimStart.x, p.y - dimStart.y); if (dist < 8) { setDimStart(null); return; }
      let label = ""; if (scale.pxPerUnit) label = (dist / scale.pxPerUnit).toFixed(2) + scale.unit;
      else { const input = window.prompt(T(L, "dimension") + " (e.g. 2.5m):", "");
        if (input) { label = input; const num = parseFloat(input); if (num > 0) { const unit = input.replace(/[\d.\s]/g, "") || "m"; setScale({ pxPerUnit: dist / num, unit }); } } }
      const ns = [...strokes, { tool: "dim", color, points: [dimStart, p], label }]; setStrokes(ns); setDimStart(null); redraw(ns); } };
  const undo = () => { const ns = strokes.slice(0, -1); setStrokes(ns); redraw(ns); };
  const save = () => {
    const dims = strokes.filter((s) => s.tool === "dim" && s.label).map((s) => s.label);
    onSave(canvasRef.current.toDataURL("image/jpeg", 0.85), dims);
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.92)", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", padding: 16, overflow: "auto" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <TBtn on={() => setTool("draw")} active={tool === "draw"} icon={Pencil} label={T(L, "draw")} />
        <TBtn on={() => setTool("dim")} active={tool === "dim"} icon={Ruler} label={T(L, "dimension")} />
        {COLORS.map((c) => <button key={c} onClick={() => setColor(c)} style={{ width: 32, height: 32, borderRadius: 8, background: c, cursor: "pointer", border: color === c ? "3px solid #fff" : "1px solid #555" }} />)}
        <TBtn on={undo} icon={Undo2} label={T(L, "undo")} />
      </div>
      <canvas ref={canvasRef} onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up} onTouchStart={down} onTouchMove={move} onTouchEnd={up}
        style={{ touchAction: "none", borderRadius: 10, maxWidth: "100%", cursor: "crosshair", background: "#000" }} />
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button onClick={onClose} style={{ background: C.panel2, color: C.text, border: `1px solid ${C.line}`, borderRadius: 10, padding: "11px 22px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><X size={16} /> {T(L, "cancel")}</button>
        <button onClick={save} style={{ background: C.green, color: C.bg, border: "none", borderRadius: 10, fontWeight: 700, padding: "11px 26px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Check size={16} /> {T(L, "save")}</button>
      </div>
      <p style={{ color: C.dim, fontSize: 12, marginTop: 10, textAlign: "center", maxWidth: 420 }}>{T(L, "drawHint")}</p>
    </div>
  );
}
function TBtn({ on, active, icon: Icon, label }) {
  return <button onClick={on} style={{ background: active ? C.green : "#222", color: active ? "#0f1410" : "#ddd", border: "none", borderRadius: 8,
    padding: "8px 12px", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 5, fontWeight: 600 }}><Icon size={15} /> {label}</button>;
}

/* ═══════════════ Report generation (AI translation) ═══════════════ */
async function generateReport({ kind, tradeKey, project, prefs, setProject, setPrefs }) {
  const company = prefs.company;
  const isQuote = kind === "quote";       // request TO subcontractor: quantities only, no prices
  const isProgress = kind === "progress"; // inspection update to client
  const isClient = kind === "client";     // final quote to client: margins applied, subs hidden
  const targetLang = isQuote ? "en" : project.clientLang;
  const reportItems = tradeKey ? project.items.filter((it) => it.trade === tradeKey) : project.items;
  const sub = tradeKey ? project.subs[tradeKey] : "";

  // assign a quote number on first client-quote build
  let quoteNo = project.quoteNo;
  if (isClient && !quoteNo) {
    const n = (prefs.quoteCounter || 0) + 1;
    const yr = new Date().getFullYear();
    quoteNo = `Q-${yr}-${String(n).padStart(3, "0")}`;
    setPrefs && setPrefs({ ...prefs, quoteCounter: n });
    setProject && setProject((prev) => ({ ...prev, quoteNo }));
  }
  const validDays = num(project.validDays) || 30;
  const validUntilStr = addDays(new Date(), validDays).toLocaleDateString();

  const labels = {
    heading: isClient ? "Quotation" : isQuote ? "Quote Request" : "Site Progress Report",
    scope: isQuote ? "Work Items (please quote)" : isClient ? "Quotation" : "Inspection / Progress Items",
    subtitleQuote: "We request a quote for the items below.",
    subtitleProg: "Here is an update on site progress.",
    subtitleClient: "Thank you for the opportunity to quote. Please see our quotation below.",
    project: "Project", client: isQuote ? "Principal" : "Client", recipient: "Quote requested from",
    location: "Site location", date: "Date", trade: "Trade", weather: "Weekly Weather",
    weatherNote: "Days marked in blue had rainfall, which may have delayed work.",
    open: "Open", prog: "In Progress", done: "Done", high: "Urgent", med: "Attention", low: "Minor",
    generated: "Generated", defects: "Defect Locations (floor plan)",
    qty: "Qty", rate: "Rate", line: "Amount", subtotal: "Subtotal (ex GST)", gst: "GST (10%)",
    total: "Total (inc GST)", signature: "For and on behalf of", estimateNote: "Quantities are estimates and subject to site confirmation.",
    quoteNo: "Quote No.", validUntil: "Valid until", validNote: "This quotation is valid until the date shown above.",
    item: "Item", amount: "Amount",
  };
  // For sub-quote requests: quantities only, no money. For client quote: build from margins.
  const itemTexts = reportItems.map((it) => ({ title: it.title, note: it.note }));
  const pinTexts = project.pins.map((p) => p.note);

  // client quote line items (trade → client price with margin)
  const defMargin = prefs.defaultMargin ?? 20;
  const tradeMargins = project.tradeMargins || {};
  const marginFor = (tr) => tradeMargins[tr] != null && tradeMargins[tr] !== "" ? num(tradeMargins[tr]) : defMargin;
  const clientLines = [];
  if (isClient) {
    (project.subQuotes || []).filter((s) => s.included).forEach((s) => {
      clientLines.push({ label: tradeLabel(s.trade, "en"), note: s.note, amount: num(s.amount) * (1 + marginFor(s.trade) / 100) });
    });
    (project.myWork || []).forEach((w) => { clientLines.push({ label: w.title || "Work", note: w.note, amount: num(w.amount) }); });
  }
  const clientLineTexts = clientLines.map((l) => ({ label: l.label, note: l.note || "" }));

  let TL = labels, items2 = itemTexts, pins2 = pinTexts, lines2 = clientLineTexts;
  if (targetLang && targetLang !== "en") {
    const payload = JSON.stringify({ labels, items: itemTexts, pins: pinTexts, lines: clientLineTexts });
    const out = await askClaude(`Translate ALL string values in this JSON to ${langEnglishName[targetLang]}, using natural professional landscaping/construction terminology. Keep JSON structure and keys identical. Output ONLY the JSON, no markdown:\n\n${payload}`,
      "You are a professional translator for landscape construction documents. Output valid JSON only.");
    try { const parsed = JSON.parse(out.replace(/```json|```/g, "").trim());
      if (parsed.labels) TL = { ...labels, ...parsed.labels }; if (parsed.items) items2 = parsed.items;
      if (parsed.pins) pins2 = parsed.pins; if (parsed.lines) lines2 = parsed.lines;
    } catch {}
  }
  const esc = (s) => String(s || "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const accent = isClient ? "#5fa8d3" : isQuote ? "#e0a73a" : "#3c8a50";
  const sevMap = { high: TL.high, med: TL.med, low: TL.low };
  const stMap = { open: TL.open, prog: TL.prog, done: TL.done };
  const wxHtml = isProgress && project.weather.days.length ? `<h2>${esc(TL.weather)}</h2>
    <div class="wx">${project.weather.days.map((d) => { const w = WX(d.code);
      return `<div class="wxd${d.rain > 1 ? " rain" : ""}"><div class="dow">${d.dow}</div><div class="wl">${w.label}</div>
      <div class="tp">${d.tmax}° / ${d.tmin}°</div><div class="rn">${d.rain > 0 ? d.rain.toFixed(1) + "mm" : ""}</div></div>`; }).join("")}</div>
    <p class="hint">${esc(TL.weatherNote)}</p>` : "";

  let bodyHtml = "", totalsHtml = "";
  if (isClient) {
    // ── final client quote: only labels + client prices (margins & sub names hidden) ──
    bodyHtml = clientLines.map((l, n) => {
      const t = lines2[n] || { label: l.label, note: l.note };
      return `<div class="item"><div class="ititle">${n + 1}. ${esc(t.label)}</div>
        ${t.note ? `<p>${esc(t.note)}</p>` : ""}<div class="ql"><b>${esc(TL.amount)}: ${money(l.amount)}</b></div></div>`;
    }).join("");
    const sub = clientLines.reduce((s, l) => s + l.amount, 0);
    totalsHtml = `<div class="totals">
      <div><span>${esc(TL.subtotal)}</span><span>${money(sub)}</span></div>
      <div><span>${esc(TL.gst)}</span><span>${money(sub * GST_RATE)}</span></div>
      <div class="grand"><span>${esc(TL.total)}</span><span>${money(sub * (1 + GST_RATE))}</span></div>
      <p class="hint">${esc(TL.validNote)}</p></div>`;
  } else {
    // ── sub request (qty only) or progress (qty + price) ──
    bodyHtml = reportItems.map((it, n) => {
      const photos = it.photos.map((ph) => `<img src="${ph.annotated || ph.src}" />`).join("");
      const t = items2[n] || { title: it.title, note: it.note };
      const badges = isProgress ? `<span class="b" style="background:#eef3ee;color:#3c8a50">${esc(stMap[it.status] || it.status)}</span>
        <span class="b" style="background:#fdf0e6;color:#c47d1a">${esc(sevMap[it.severity] || it.severity)}</span>` : "";
      // quote-to-sub: quantity only, NEVER price. progress: show price if present.
      let qtyLine = "";
      if (num(it.qty)) {
        if (isQuote) qtyLine = `<div class="ql">${esc(TL.qty)}: ${esc(it.qty)} ${esc(it.unit)}</div>`;
        else { const lt = num(it.qty) * num(it.rate);
          qtyLine = `<div class="ql">${esc(TL.qty)}: ${esc(it.qty)} ${esc(it.unit)}` +
            (num(it.rate) ? ` &nbsp;·&nbsp; ${esc(TL.rate)}: ${money(num(it.rate))} &nbsp;·&nbsp; <b>${esc(TL.line)}: ${money(lt)}</b>` : "") + `</div>`; }
      }
      return `<div class="item"><div class="ititle">${n + 1}. ${esc(t.title) || "—"}
        <span class="cat">${esc(tradeLabel(it.trade, "en"))}</span> ${badges}</div>
        ${qtyLine}${t.note ? `<p>${esc(t.note)}</p>` : ""}${photos ? `<div class="photos">${photos}</div>` : ""}</div>`;
    }).join("");
    // totals: progress only (sub requests carry no prices)
    if (isProgress) {
      const subtotal = reportItems.reduce((s, it) => s + num(it.qty) * num(it.rate), 0);
      if (subtotal > 0) totalsHtml = `<div class="totals">
        <div><span>${esc(TL.subtotal)}</span><span>${money(subtotal)}</span></div>
        <div><span>${esc(TL.gst)}</span><span>${money(subtotal * GST_RATE)}</span></div>
        <div class="grand"><span>${esc(TL.total)}</span><span>${money(subtotal * (1 + GST_RATE))}</span></div></div>`;
    }
  }

  const sigHtml = (isProgress || isClient) && project.signature ? `<h2>${esc(TL.signature)} ${esc(company.name)}</h2>
    <img class="sig" src="${project.signature}" /><div class="sigline">${esc(company.name)}</div>` : "";
  const planHtml = isProgress && project.floorPlan ? `<h2>${esc(TL.defects)}</h2>
    <div class="plan"><img src="${project.floorPlan}" />${project.pins.map((p, i) => `<span class="pin" style="left:${p.x}%;top:${p.y}%">${i + 1}</span>`).join("")}</div>
    <ol class="pinlist">${project.pins.map((p, i) => `<li>${esc(pins2[i] || p.note || "—")}</li>`).join("")}</ol>` : "";
  const logoHtml = company.logo ? `<img class="logo" src="${company.logo}" />` : "";
  const loc = project.lat ? `${project.lat.toFixed(4)}, ${project.lng.toFixed(4)}` : "—";
  const subtitle = isClient ? TL.subtitleClient : isQuote ? TL.subtitleQuote : TL.subtitleProg;
  const badgeTxt = isClient ? "QUOTATION" : isQuote ? "QUOTE REQUEST" : "PROGRESS";
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(project.name)} — ${esc(TL.heading)}</title>
    <style>body{font-family:-apple-system,'Malgun Gothic',sans-serif;color:#1d241e;max-width:880px;margin:0 auto;padding:40px 28px;line-height:1.55}
    header{display:flex;align-items:center;gap:16px;border-bottom:4px solid ${accent};padding-bottom:14px}.logo{height:54px;object-fit:contain}
    .co{font-size:20px;font-weight:800}.co small{display:block;font-weight:400;color:#666;font-size:13px}
    .badge{margin-left:auto;background:${accent};color:#fff;padding:6px 14px;border-radius:6px;font-weight:700;font-size:13px}
    h1{font-size:22px;margin:22px 0 4px}.sub{color:#555;margin:0 0 16px}
    .meta{background:#f3f6f3;border-radius:10px;padding:14px 18px;font-size:14px;display:grid;grid-template-columns:1fr 1fr;gap:6px 24px}.meta b{color:#444}
    h2{font-size:16px;border-left:4px solid ${accent};padding-left:8px;margin:26px 0 10px}
    .wx{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}.wxd{background:#f3f6f3;border-radius:8px;padding:8px 4px;text-align:center;font-size:12px}
    .wxd.rain{background:#e3eef7;border:1px solid #9cc5e3}.dow{font-weight:700;font-size:13px}.wl{margin:3px 0;color:#555}.tp{font-weight:600}.rn{color:#2b78b8;font-weight:700;height:14px}
    .hint{font-size:12px;color:#777}.item{margin:14px 0;padding-bottom:14px;border-bottom:1px solid #e3e8e3}.ititle{font-weight:700;font-size:15px}
    .item p{margin:6px 0;color:#333;white-space:pre-wrap}.cat{background:#eef3ee;color:#3c8a50;font-size:11px;font-weight:700;padding:2px 8px;border-radius:5px;margin-left:6px}
    .b{font-size:11px;font-weight:700;padding:2px 8px;border-radius:5px;margin-left:4px}
    .photos{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.photos img{max-width:260px;border-radius:8px;border:1px solid #d5ddd5}
    .plan{position:relative;display:inline-block;max-width:100%}.plan img{max-width:100%;border-radius:8px}
    .pin{position:absolute;transform:translate(-50%,-100%);background:#e26a6a;color:#fff;border:2px solid #fff;border-radius:50% 50% 50% 0;width:24px;height:24px;text-align:center;line-height:22px;font-weight:700;font-size:12px;rotate:45deg}
    .pinlist{font-size:14px}.pinlist li{margin:4px 0}footer{margin-top:30px;color:#999;font-size:12px;text-align:center}
    .ql{font-size:13px;color:#2b6b3e;background:#f0f6f1;border-radius:6px;padding:4px 10px;margin:6px 0;display:inline-block}
    .totals{margin-top:18px;border-top:2px solid ${accent};padding-top:12px;max-width:340px;margin-left:auto}
    .totals div{display:flex;justify-content:space-between;font-size:14px;padding:3px 0}
    .totals .grand{font-size:19px;font-weight:800;color:${accent};border-top:1px solid #ddd;margin-top:6px;padding-top:8px}
    .totals .hint{text-align:right}
    .sig{height:80px;background:#fafafa;border:1px solid #ddd;border-radius:8px;padding:6px}.sigline{border-top:1px solid #333;width:240px;margin-top:6px;font-size:13px;color:#555}
    @media print{body{padding:0}}</style></head><body>
    <header>${logoHtml}<div class="co">${esc(company.name)}<small>${esc(company.contact)}</small></div><div class="badge">${badgeTxt}</div></header>
    <h1>${esc(TL.heading)}${tradeKey ? ` — ${esc(tradeLabel(tradeKey, "en"))}` : ""}</h1>
    <p class="sub">${esc(subtitle)}</p>
    <div class="meta"><div><b>${esc(TL.project)}</b> ${esc(project.name)}</div><div><b>${esc(TL.client)}</b> ${esc(project.client) || "—"}</div>
    ${isQuote && sub ? `<div><b>${esc(TL.recipient)}</b> ${esc(sub)}</div>` : ""}${tradeKey ? `<div><b>${esc(TL.trade)}</b> ${esc(tradeLabel(tradeKey, "en"))}</div>` : ""}
    ${isClient ? `<div><b>${esc(TL.quoteNo)}</b> ${esc(quoteNo)}</div><div><b>${esc(TL.validUntil)}</b> ${esc(validUntilStr)}</div>` : ""}
    <div><b>${esc(TL.location)}</b> ${loc}</div><div><b>${esc(TL.date)}</b> ${new Date(project.updatedAt).toLocaleDateString()}</div></div>
    ${wxHtml}<h2>${esc(TL.scope)}${!isClient ? ` (${reportItems.length})` : ""}</h2>${bodyHtml || "<p>—</p>"}${totalsHtml}${planHtml}${sigHtml}
    <footer>${esc(company.name)} · ${esc(TL.generated)} ${new Date().toLocaleString()}</footer></body></html>`;
  const blob = new Blob([html], { type: "text/html" }); const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url;
  const fnameKind = isClient ? "quotation" : isQuote ? "quote_request" + (tradeKey ? "_" + tradeKey : "") : "progress";
  a.download = `${project.name}_${fnameKind}.html`; a.click(); URL.revokeObjectURL(url);
}

/* ════════ shared styles ════════ */
const spinCss = `.spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{background:#2f3d31;border-radius:8px}`;
const card = { background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14 };
const iconBtn = { background: C.panel2, border: `1px solid ${C.line}`, color: C.text, borderRadius: 9, padding: 8, cursor: "pointer", display: "grid", placeItems: "center" };
const primaryBtn = { background: C.green, color: C.bg, border: "none", borderRadius: 9, fontWeight: 700, padding: "9px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const bigBtn = { color: C.bg, border: "none", borderRadius: 9, fontWeight: 700, padding: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 14 };
const miniBtn = { background: "#2f3d31", color: "#e8efe7", border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 12 };
const miniAction = { background: C.panel2, border: `1px solid ${C.line}`, color: C.text, borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 5, fontWeight: 600 };
const lbl = { display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: C.dim, margin: "12px 0 5px" };
const chip = (active, col) => ({ fontSize: 12, fontWeight: 600, borderRadius: 6, padding: "4px 10px", cursor: "pointer", border: `1px solid ${active ? col : C.line}`, background: active ? col : "transparent", color: active ? C.bg : C.dim });
