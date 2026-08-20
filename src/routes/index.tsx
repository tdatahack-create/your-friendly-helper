import { createFileRoute } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import { Download, ExternalLink } from "lucide-react";
import { marked } from "marked";
import { useEffect, useState, type ReactNode } from "react";


import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("python", python);
marked.setOptions({ gfm: true, breaks: false });

const DOCX_RAW_URL = "https://raw.githubusercontent.com/0xDarkSeidBull/daotask11/main/RBNT_Token_Utility_Report_1.docx";
const READ_DOCS_URL = `https://docs.google.com/viewer?url=${DOCX_RAW_URL}&embedded=true`;
const READ_PDF_URL = "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/daotask11@main/RBNT_Token_Utility_Report_1.pdf";
const GITHUB_URL = "https://github.com/0xDarkSeidBull/daotask11/blob/main/RBNT_Token_Utility_Report_1.pdf";
const DEVTO_URL = "https://dev.to/0xdarkseidbull/verifying-before-shipping-a-rbnt-token-case-study-3bc1";
const PDF_VIEWER_URL = `https://docs.google.com/viewer?url=${encodeURIComponent("https://raw.githubusercontent.com/0xDarkSeidBull/daotask11/main/RBNT_Token_Utility_Report_1.pdf")}&embedded=true`;

type FileDefinition = { name: string; url: string; type: "markdown" | "javascript" | "python" | "json" };
function file(name: string, path: string, type: FileDefinition["type"]): FileDefinition {
  return { name, type, url: `https://raw.githubusercontent.com/0xDarkSeidBull/daotask11/main/${path}` };
}
function rwaFile(name: string, path: string, type: FileDefinition["type"]): FileDefinition {
  return { name, type, url: `https://raw.githubusercontent.com/0xDarkSeidBull/daotask11/main/part3-rwa-xyz-kit/${path}` };
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
  rwaFile("README.md", "README.md", "markdown"),
  rwaFile("ONBOARDING-CHECKLIST.md", "ONBOARDING-CHECKLIST.md", "markdown"),
  rwaFile("NETWORK-PROFILE-DRAFT.md", "NETWORK-PROFILE-DRAFT.md", "markdown"),
  rwaFile("PLATFORMS-TO-INTRODUCE.md", "PLATFORMS-TO-INTRODUCE.md", "markdown"),
  rwaFile("POC-TEMPLATE.md", "POC-TEMPLATE.md", "markdown"),
  rwaFile("ASSET-REGISTRY-DATA.md", "ASSET-REGISTRY-DATA.md", "markdown"),
];
const ARTICLE: FileDefinition = { name: "RBNT-Explainer.md", type: "markdown", url: "https://raw.githubusercontent.com/0xDarkSeidBull/daotask11/main/part4-explainer/RBNT-Explainer.md" };

const BRAND_MARK = "/dao-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "TASK-11 RBNT Utility & Ecosystem Report" },
    { name: "description", content: "A source-verified Redbelly DAO research dossier covering RBNT tokenomics, DeFiLlama, RWA.xyz, and a plain-language explainer." },
    { property: "og:title", content: "TASK-11 RBNT Utility & Ecosystem Report" },
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
      <a href="#top" className="nav-identity"><img src={BRAND_MARK} alt="DAO Task Board logo" className="nav-logo" height={44} /></a>
      <div className="nav-links">
        <a href="#tokenomics"><span>01</span> Tokenomics</a><a href="#defillama"><span>02</span> DeFiLlama</a>
        <a href="#rwa"><span>03</span> RWA.xyz</a><a href="#explainer"><span>04</span> Explainer</a>
      </div>
    </nav>
    <main id="main-content">
      <header id="top" className="hero-section">
        <div className="hero-kicker">Redbelly DAO Task Board · Submitted Research Deliverable</div>
        <div className="hero-grid"><div><p className="case-number">CASE FILE</p><h1>RBNT Token Utility and Ecosystem Visibility Report</h1><p className="hero-summary">4 deliverables, every figure traced to a primary source, whether the official whitepaper, live on-chain data, or the platform&apos;s own docs.</p></div><VerifiedStamp /></div>
        <dl className="hero-register"><div><dt>Status</dt><dd>Completed</dd></div><div><dt>Deliverables</dt><dd className="key-number">04</dd></div><div><dt>Evidence standard</dt><dd>Primary sources</dd></div><div><dt>Review format</dt><dd>Inline dossier</dd></div></dl>
      </header>
      <DossierSection id="tokenomics" number="01" label="RBNT Tokenomics Report" intro="14-page tokenomics report, every figure cited from Redbelly's official whitepaper (August 2025). It covers total fixed supply (10B RBNT), the 5 real token uses (gas, governance, staking, sharding, incentives), the full allocation table, and the token release schedule. Includes a 4-way competitor comparison (Ondo, Polymesh, XDC). No speculative price predictions, and it is flagged explicitly where the whitepaper itself doesn't provide a pricing model.">
        <div className="pdf-frame"><iframe title="RBNT Token Utility Report PDF" src={PDF_VIEWER_URL} loading="lazy" /></div>
        <div className="document-actions"><Button asChild className="dossier-button"><a href={READ_PDF_URL} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /> Read PDF</a></Button><Button asChild variant="outline" className="dossier-button dossier-button-outline"><a href={READ_DOCS_URL} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /> Read Docs</a></Button></div>
        <p className="secondary-download"><a href={DOCX_RAW_URL} download><Download aria-hidden="true" /> Download DOCX</a></p>
      </DossierSection>
      <DossierSection id="defillama" number="02" label="DeFiLlama Submission Kit" intro="A TVL adapter for reddex (Redbelly's native DEX), built against the public @defillama/sdk. Live-verified on real infrastructure: a manual on-chain calculation ($21,778) was checked against DeFiLlama's own live figure ($22,002), a 1.02% difference, well inside the 5% accuracy requirement. A domain bug (api.llama.fi vs coins.llama.fi) was found and fixed during verification, then flagged transparently in the docs below rather than hidden." aside={<div className="evidence-note"><span className="key-number">1.02%</span><span>observed variance<br />against live figure</span></div>}><FileBrowser files={DEFI_FILES} stampFile="TESTING.md" /></DossierSection>
      <DossierSection id="rwa" number="03" label="RWA.xyz Submission Kit" intro="A verified finding: Redbelly is genuinely absent from RWA.xyz's directory and network-coverage list (checked directly against their published docs). That is unlike the DeFiLlama case, where the 'absent' claim turned out to be outdated. Since RWA.xyz onboarding is a manual partnership process (Partners App to Slack to kickoff call), not a self-service code submission, this kit pre-fills every field their process asks for, including a sample asset registry and the FAQ's own 4 to 8 week end-to-end timeline from submission to going live." aside={<div className="evidence-note"><span className="key-number">4 to 8 weeks</span><span>estimated end-to-end<br />timeline per RWA.xyz FAQ</span></div>}><FileBrowser files={RWA_FILES} /><p className="secondary-download"><a href="https://github.com/0xDarkSeidBull/daotask11/tree/main/part3-rwa-xyz-kit" target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /> View full kit on GitHub</a></p></DossierSection>
      <DossierSection id="explainer" number="04" label="Explainer Article" intro="A 450-word plain-language explainer titled &quot;How Network Adoption Drives RBNT Value&quot;, written for Discord and social, showing how gas, staking, sharding, and governance tie RBNT demand to network adoption, with the same sourcing discipline as the full report, condensed.">
        <div className="document-actions"><Button asChild className="dossier-button"><a href={DEVTO_URL} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /> Read Article</a></Button></div>
        <FetchedMarkdown source={ARTICLE} />
      </DossierSection>
    </main>
    <div className="footer-wrap">
      <footer><span>RBNT UTILITY &amp; ECOSYSTEM VISIBILITY</span><span>Research deliverable · Redbelly DAO</span></footer>
      <div className="footer-credit">
        <span>Built with ♥ by <a href="https://github.com/0xDarkSeidBull" target="_blank" rel="noreferrer">0xDarkSeidBull</a></span>
        <span className="footer-icons">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="View the report on GitHub"><GithubIcon /></a>
          <a href={READ_DOCS_URL} target="_blank" rel="noopener noreferrer" aria-label="Read the report as a document"><DocsIcon /></a>
          <a href={READ_PDF_URL} target="_blank" rel="noopener noreferrer" aria-label="Read the report PDF"><PdfIcon /></a>
          <a href={DEVTO_URL} target="_blank" rel="noopener noreferrer" aria-label="Read the article on Dev.to"><DevtoIcon /></a>
        </span>
      </div>
    </div>
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
  const highlighted = hljs.highlight(stripDashes(state.text), { language: source.type }).value;
  return <pre className="code-content" tabIndex={0} aria-label={`${source.name} source code`}><code className={`hljs language-${source.type}`} dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>;
}

function FetchedMarkdown({ source }: { source: FileDefinition }) {
  const state = useRemoteText(source);
  if (state.error) return <div className="article-panel"><FetchError source={source} message={state.error} /></div>;
  if (state.text === undefined) return <div className="article-panel"><LoadingPanel /></div>;
  return <div className="article-panel"><MarkdownContent text={state.text} /></div>;
}

function stripDashes(input: string) {
  return input
    .replace(/(\d)\s*[—–]\s*(\d)/g, "$1 to $2")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/,\s*,/g, ",")
    .replace(/,\s*([.;:!?])/g, "$1");
}

function MarkdownContent({ text }: { text: string }) {
  const [html, setHtml] = useState("");
  useEffect(() => { let current = true; Promise.resolve(marked.parse(stripDashes(text))).then((parsed) => { const semanticHtml = parsed.replaceAll("<h1", "<h2 class=\"document-title\"").replaceAll("</h1>", "</h2>"); if (current) setHtml(DOMPurify.sanitize(semanticHtml)); }); return () => { current = false; }; }, [text]);
  return <article className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

function LoadingPanel() { return <div className="loading-panel" aria-label="Loading file content"><Skeleton className="h-4 w-2/5" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-11/12" /><Skeleton className="h-24 w-full" /><Skeleton className="h-4 w-3/4" /></div>; }
function FetchError({ source, message }: { source: FileDefinition; message: string }) { return <div className="fetch-error" role="alert"><strong>This evidence file could not be loaded.</strong><span>{message}</span><a href={source.url} target="_blank" rel="noreferrer">Open raw file <ExternalLink aria-hidden="true" /></a></div>; }

const svgProps = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
function GithubIcon() { return <svg {...svgProps}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.8A5.3 5.3 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.7s-1.1-.3-3.8 1.4a13 13 0 0 0-7 0C6.3 1 5.2 1.3 5.2 1.3A4.9 4.9 0 0 0 5.1 5a5.3 5.3 0 0 0-1.4 3.7c0 5.3 3.2 6.5 6.2 6.8a3.4 3.4 0 0 0-.9 2.6V22" /></svg>; }
function DocsIcon() { return <svg {...svgProps}><path d="M14 2H6.5A1.5 1.5 0 0 0 5 3.5v17A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5V7z" /><path d="M14 2v5h5" /><path d="M8.5 12.5h7M8.5 16.5h7" /></svg>; }
function PdfIcon() { return <svg {...svgProps}><path d="M14 2H6.5A1.5 1.5 0 0 0 5 3.5v17A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5V7z" /><path d="M14 2v5h5" /><path d="M8.2 18v-4h1.2a1.1 1.1 0 0 1 0 2.2H8.2M12.4 18v-4h.9a1.2 1.2 0 0 1 1.2 1.2v1.6a1.2 1.2 0 0 1-1.2 1.2zM18.2 14h-1.6v4M16.6 16h1.3" /></svg>; }
function DevtoIcon() { return <svg {...svgProps}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 9.5v5h1a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM12.6 9.5l1 5 1-5M17 14.5h1.8M17 12h1.6M17 14.5v-5h1.8" /></svg>; }
