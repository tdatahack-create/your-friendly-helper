import { createFileRoute } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import { Download, ExternalLink, FileCheck2 } from "lucide-react";
import { marked } from "marked";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("python", python);
marked.setOptions({ gfm: true, breaks: false });

const PDF_URL = "https://raw.githubusercontent.com/0xDarkSeidBull/dao-redbelly/main/task11-rbnt-report/part1-tokenomics-report/RBNT_Token_Utility_Report.pdf";
const DOCX_URL = "https://raw.githubusercontent.com/0xDarkSeidBull/dao-redbelly/main/task11-rbnt-report/part1-tokenomics-report/RBNT_Token_Utility_Report.docx";

type FileDefinition = { name: string; url: string; type: "markdown" | "javascript" | "python" | "json" };
function file(name: string, path: string, type: FileDefinition["type"]): FileDefinition {
  return { name, type, url: `https://raw.githubusercontent.com/0xDarkSeidBull/dao-redbelly/main/task11-rbnt-report/${path}` };
}

const DEFI_FILES: FileDefinition[] = [
  file("index.js", "part2-defillama-kit/index.js", "javascript"),
  file("verify_manual.py", "part2-defillama-kit/verify_manual.py", "python"),
  file("local-mock.test.js", "part2-defillama-kit/local-mock.test.js", "javascript"),
  file("contracts.json", "part2-defillama-kit/contracts.json", "json"),
  file("package.json", "part2-defillama-kit/package.json", "json"),
  file("TESTING.md", "part2-defillama-kit/TESTING.md", "markdown"),
  file("SUBMISSION-GUIDE.md", "part2-defillama-kit/SUBMISSION-GUIDE.md", "markdown"),
  file("API-ENDPOINTS.md", "part2-defillama-kit/API-ENDPOINTS.md", "markdown"),
];
const RWA_FILES: FileDefinition[] = [
  file("README.md", "part3-rwa-xyz-kit/README.md", "markdown"),
  file("ONBOARDING-CHECKLIST.md", "part3-rwa-xyz-kit/ONBOARDING-CHECKLIST.md", "markdown"),
  file("NETWORK-PROFILE-DRAFT.md", "part3-rwa-xyz-kit/NETWORK-PROFILE-DRAFT.md", "markdown"),
  file("PLATFORMS-TO-INTRODUCE.md", "part3-rwa-xyz-kit/PLATFORMS-TO-INTRODUCE.md", "markdown"),
  file("POC-TEMPLATE.md", "part3-rwa-xyz-kit/POC-TEMPLATE.md", "markdown"),
];
const ARTICLE = file("RBNT-Explainer.md", "part4-explainer/RBNT-Explainer.md", "markdown");

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "TASK-11 — RBNT Utility & Ecosystem Report" },
    { name: "description", content: "A source-verified Redbelly DAO research dossier covering RBNT tokenomics, DeFiLlama, RWA.xyz, and a plain-language explainer." },
    { property: "og:title", content: "TASK-11 — RBNT Utility & Ecosystem Report" },
    { property: "og:description", content: "Four completed deliverables, with every figure traced to a primary source." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function VerifiedStamp({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? "verified-stamp verified-stamp-small" : "verified-stamp"}><span>Verified</span><span className="stamp-dot">•</span><span>Source</span></span>;
}

function Index() {
  return <div className="dossier-shell">
    <a href="#main-content" className="skip-link">Skip to dossier</a>
    <nav className="top-nav" aria-label="Dossier sections">
      <a href="#top" className="nav-identity"><FileCheck2 aria-hidden="true" /><span>TASK-11</span></a>
      <div className="nav-links">
        <a href="#tokenomics"><span>01</span> Tokenomics</a><a href="#defillama"><span>02</span> DeFiLlama</a>
        <a href="#rwa"><span>03</span> RWA.xyz</a><a href="#explainer"><span>04</span> Explainer</a>
      </div>
    </nav>
    <main id="main-content">
      <header id="top" className="hero-section">
        <div className="hero-kicker">Redbelly DAO Task Board · Submitted Research Deliverable</div>
        <div className="hero-grid"><div><p className="case-number">CASE FILE / TASK-11</p><h1>RBNT Token Utility and Ecosystem Visibility Report</h1><p className="hero-summary">4 deliverables, every figure traced to a primary source — official whitepaper, live on-chain data, or the platform&apos;s own docs.</p></div><VerifiedStamp /></div>
        <dl className="hero-register"><div><dt>Status</dt><dd>Completed</dd></div><div><dt>Deliverables</dt><dd className="key-number">04</dd></div><div><dt>Evidence standard</dt><dd>Primary sources</dd></div><div><dt>Review format</dt><dd>Inline dossier</dd></div></dl>
      </header>
      <DossierSection id="tokenomics" number="01" label="RBNT Tokenomics Report" intro="14-page tokenomics report, every figure cited from Redbelly's official whitepaper (August 2025) — total fixed supply (10B RBNT), the 5 real token uses (gas, governance, staking, sharding, incentives), full allocation table, and the token release schedule. Includes a 4-way competitor comparison (Ondo, Polymesh, XDC). No speculative price predictions — flagged explicitly where the whitepaper itself doesn't provide a pricing model.">
        <div className="pdf-frame"><iframe title="RBNT Token Utility Report PDF" src={PDF_URL} loading="lazy" /></div>
        <div className="document-actions"><Button asChild className="dossier-button"><a href={PDF_URL} target="_blank" rel="noreferrer"><ExternalLink aria-hidden="true" /> Open PDF in new tab</a></Button><Button asChild variant="outline" className="dossier-button dossier-button-outline"><a href={DOCX_URL} download><Download aria-hidden="true" /> Download DOCX (editable)</a></Button></div>
      </DossierSection>
      <DossierSection id="defillama" number="02" label="DeFiLlama Submission Kit" intro="A TVL adapter for reddex (Redbelly's native DEX), built against the public @defillama/sdk. Live-verified on real infrastructure: a manual on-chain calculation ($21,778) was checked against DeFiLlama's own live figure ($22,002) — a 1.02% difference, well inside the 5% accuracy requirement. A domain bug (api.llama.fi vs coins.llama.fi) was found and fixed during verification — flagged transparently in the docs below rather than hidden." aside={<div className="evidence-note"><span className="key-number">1.02%</span><span>observed variance<br />against live figure</span></div>}><FileBrowser files={DEFI_FILES} stampFile="TESTING.md" /></DossierSection>
      <DossierSection id="rwa" number="03" label="RWA.xyz Submission Kit" intro="A verified finding: Redbelly is genuinely absent from RWA.xyz's directory and network-coverage list (checked directly against their published docs) — unlike the DeFiLlama case, where the 'absent' claim turned out to be outdated. Since RWA.xyz onboarding is a manual partnership process (Partners App → Slack → kickoff call), not a self-service code submission, this kit pre-fills every field their process asks for." aside={<VerifiedStamp compact />}><FileBrowser files={RWA_FILES} /></DossierSection>
      <DossierSection id="explainer" number="04" label="Explainer Article" intro="A 419-word plain-language explainer of what RBNT actually does, written for Discord/social — same sourcing discipline as the full report, condensed."><FetchedMarkdown source={ARTICLE} /></DossierSection>
    </main>
    <footer><span>TASK-11 / RBNT UTILITY & ECOSYSTEM VISIBILITY</span><span>Research deliverable · Redbelly DAO</span></footer>
  </div>;
}

function DossierSection({ id, number, label, intro, aside, children }: { id: string; number: string; label: string; intro: string; aside?: ReactNode; children: ReactNode }) {
  return <section id={id} className="case-section"><div className="folder-tab"><span>{number}</span>{label}</div><div className="case-paper"><div className="section-heading"><div><p className="section-index">DELIVERABLE {number} / 04</p><h2>{label}</h2><p className="section-intro">{intro}</p></div>{aside ? <div className="section-aside">{aside}</div> : null}</div>{children}</div></section>;
}

function FileBrowser({ files, stampFile }: { files: FileDefinition[]; stampFile?: string }) {
  const [active, setActive] = useState(files[0]?.name ?? "");
  const selected = files.find((item) => item.name === active) ?? files[0];
  if (!selected) return null;
  return <Tabs value={active} onValueChange={setActive} className="file-browser"><div className="tab-strip"><TabsList className="file-tabs" aria-label="Submission kit files">{files.map((item) => <TabsTrigger key={item.name} value={item.name} className="file-tab">{item.name}{item.name === stampFile ? <span className="tab-verified">verified</span> : null}</TabsTrigger>)}</TabsList></div>{files.map((item) => <TabsContent key={item.name} value={item.name} className="file-panel"><div className="file-panel-bar"><span>{item.name}</span><a href={item.url} target="_blank" rel="noreferrer">Open raw <ExternalLink aria-hidden="true" /></a></div><FetchedFile source={item} /></TabsContent>)}</Tabs>;
}

function useRemoteText(source: FileDefinition) {
  const [state, setState] = useState<{ text?: string; error?: string }>({});
  useEffect(() => { const controller = new AbortController(); setState({}); fetch(source.url, { signal: controller.signal }).then((response) => { if (!response.ok) throw new Error(`Request failed (${response.status})`); return response.text(); }).then((text) => setState({ text })).catch((error: unknown) => { if (error instanceof DOMException && error.name === "AbortError") return; setState({ error: error instanceof Error ? error.message : "The file could not be loaded." }); }); return () => controller.abort(); }, [source.url]);
  return state;
}

function FetchedFile({ source }: { source: FileDefinition }) {
  const state = useRemoteText(source);
  if (state.error) return <FetchError source={source} message={state.error} />;
  if (state.text === undefined) return <LoadingPanel />;
  if (source.type === "markdown") return <MarkdownContent text={state.text} />;
  const highlighted = hljs.highlight(state.text, { language: source.type }).value;
  return <pre className="code-content" tabIndex={0} aria-label={`${source.name} source code`}><code className={`hljs language-${source.type}`} dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>;
}

function FetchedMarkdown({ source }: { source: FileDefinition }) {
  const state = useRemoteText(source);
  if (state.error) return <div className="article-panel"><FetchError source={source} message={state.error} /></div>;
  if (state.text === undefined) return <div className="article-panel"><LoadingPanel /></div>;
  return <div className="article-panel"><MarkdownContent text={state.text} /></div>;
}

function MarkdownContent({ text }: { text: string }) {
  const [html, setHtml] = useState("");
  useEffect(() => { let current = true; Promise.resolve(marked.parse(text)).then((parsed) => { const semanticHtml = parsed.replaceAll("<h1", "<h2 class=\"document-title\"").replaceAll("</h1>", "</h2>"); if (current) setHtml(DOMPurify.sanitize(semanticHtml)); }); return () => { current = false; }; }, [text]);
  return <article className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

function LoadingPanel() { return <div className="loading-panel" aria-label="Loading file content"><Skeleton className="h-4 w-2/5" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-11/12" /><Skeleton className="h-24 w-full" /><Skeleton className="h-4 w-3/4" /></div>; }
function FetchError({ source, message }: { source: FileDefinition; message: string }) { return <div className="fetch-error" role="alert"><strong>This evidence file could not be loaded.</strong><span>{message}</span><a href={source.url} target="_blank" rel="noreferrer">Open raw file <ExternalLink aria-hidden="true" /></a></div>; }
