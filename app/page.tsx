'use client';

import { useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, Bell,
  Camera, Check, ChevronDown, CircleHelp, Command, Database, FileText,
  FlaskConical, Gauge, HardHat, Layers3, Menu, MoreHorizontal, Plus,
  ScanEye, Search, Settings2, ShieldCheck, SlidersHorizontal, Upload,
  Video, X, Zap, Clock3, CircleDot, Play, Download, Filter, Image as ImageIcon,
} from 'lucide-react';

type PageKey = 'Overview' | 'Dataset Studio' | 'Training Studio' | 'Detection Studio' | 'Viewpoint Lab' | 'Evaluation' | 'Reports';
const nav: { group: string; items: { label: PageKey; icon: ReactNode }[] }[] = [
  { group: 'WORKSPACE', items: [
    { label: 'Overview', icon: <Layers3 /> },
    { label: 'Dataset Studio', icon: <Database /> },
    { label: 'Training Studio', icon: <FlaskConical /> },
    { label: 'Detection Studio', icon: <ScanEye /> },
  ]},
  { group: 'RESEARCH', items: [
    { label: 'Viewpoint Lab', icon: <Camera /> },
    { label: 'Evaluation', icon: <BarChart3 /> },
    { label: 'Reports', icon: <FileText /> },
  ]},
];
const domains = [
  { name: 'Frontal CCTV', kind: 'Training domain', detail: 'Reference camera view', status: 'Training set', color: 'blue', progress: 100 },
  { name: 'Overhead', kind: 'Unseen viewpoint', detail: 'Elevation, occlusion and perspective shift', status: 'Not tested', color: 'orange', progress: 0 },
  { name: 'Side angle', kind: 'Unseen viewpoint', detail: 'Orientation and profile shift', status: 'Not tested', color: 'orange', progress: 0 },
  { name: 'Long distance', kind: 'Scale shift', detail: 'Smaller subjects and PPE regions', status: 'Not tested', color: 'violet', progress: 0 },
];

function Heading({ kicker, title, detail, children }: { kicker: string; title: string; detail: string; children?: ReactNode }) {
  return <div className="page-heading"><div><div className="kicker">{kicker}</div><h1>{title}</h1><p>{detail}</p></div>{children && <div className="heading-actions">{children}</div>}</div>;
}
function Metric({ label, value, detail, icon, tone = 'blue' }: { label: string; value: string; detail: string; icon: ReactNode; tone?: string }) {
  return <article className="metric-card"><div className="metric-label">{label}<span className={'metric-icon ' + tone}>{icon}</span></div><strong>{value}</strong><small>{detail}</small></article>;
}
function Empty({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) {
  return <div className="empty-state"><span className="empty-symbol">{icon}</span><h3>{title}</h3><p>{detail}</p></div>;
}
function Step({ n, title, detail, status }: { n: string; title: string; detail: string; status: string }) {
  return <div className="step-row"><span className="step-index">{n}</span><div className="step-copy"><strong>{title}</strong><small>{detail}</small></div><span className="step-status">{status}</span></div>;
}

export default function Home() {
  const [active, setActive] = useState<PageKey>('Overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const fileSize = useMemo(() => file ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : '', [file]);
  const go = (page: PageKey) => { setActive(page); setMobileOpen(false); };
  const onFile = (e: ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) setFile(f); };

  return <div className={'app-shell ' + (collapsed ? 'sidebar-collapsed' : '')}>
    {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <aside className={'sidebar ' + (mobileOpen ? 'sidebar-open' : '')}>
      <div className="brand-row">
        <div className="brand-symbol"><ScanEye size={21} /></div>
        <div className="brand-name"><strong>SafeSight<span>AI</span></strong><small>VISION INTELLIGENCE</small></div>
        <button className="collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar"><Menu size={17}/></button>
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18}/></button>
      </div>
      <button className="project-switcher" onClick={() => go('Overview')}><span className="project-mark"><HardHat size={17}/></span><span className="project-text"><small>ACTIVE PROJECT</small><strong>PPE compliance</strong></span><ChevronDown size={15}/></button>
      <nav className="nav-groups">{nav.map(group => <div className="nav-group" key={group.group}><div className="nav-caption">{group.group}</div>{group.items.map(item => <button key={item.label} title={collapsed ? item.label : undefined} className={'nav-item ' + (active === item.label ? 'active' : '')} onClick={() => go(item.label)}><span className="nav-icon">{item.icon}</span><span className="nav-text">{item.label}</span>{item.label === 'Viewpoint Lab' && <i className="nav-indicator"/>}</button>)}</div>)}</nav>
      <div className="sidebar-bottom">
        <div className="sidebar-help"><span className="help-icon"><CircleHelp size={17}/></span><div className="help-copy"><strong>Research guide</strong><small>Protocol & experiment standards</small></div><ArrowUpRight size={14}/></div>
        <button className="nav-item settings-link" onClick={() => go('Reports')}><span className="nav-icon"><Settings2/></span><span className="nav-text">Settings</span></button>
        <div className="user-row"><span className="user-avatar">SA</span><div className="user-copy"><strong>Research workspace</strong><small>Local environment</small></div><MoreHorizontal size={17}/></div>
      </div>
    </aside>

    <div className="main-column">
      <header className="topbar">
        <div className="top-left"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={19}/></button><div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>{active}</strong></div></div>
        <div className="top-right"><div className="search-box"><Search size={15}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search workspace"/><kbd>⌘ K</kbd></div><button className="top-icon" aria-label="Notifications"><Bell size={17}/></button><span className="top-divider"/><span className="live-status"><i/> Prototype</span><span className="user-avatar small-avatar">SA</span></div>
      </header>

      <main className="main-content">
        {active === 'Overview' && <>
          <Heading kicker="PPE COMPLIANCE / COMPUTER VISION" title="Research overview" detail="A single place to build, test and understand PPE detection across camera conditions.">
            <button className="button button-quiet" onClick={() => go('Dataset Studio')}><Upload size={15}/> Import dataset</button>
            <button className="button button-primary" onClick={() => go('Viewpoint Lab')}><FlaskConical size={15}/> New experiment</button>
          </Heading>
          <section className="hero-panel">
            <div className="hero-copy"><div className="hero-overline"><span className="hero-pulse"/> RESEARCH OBJECTIVE</div><h2>Does your model see safety<br/>from <em>every angle?</em></h2><p>Train on familiar footage. Challenge it with unseen viewpoints. Measure what holds up.</p><div className="hero-actions"><button className="button button-white" onClick={() => go('Viewpoint Lab')}>Explore viewpoint lab <ArrowRight size={15}/></button><span className="hero-note"><ShieldCheck size={14}/> Controlled evaluation protocol</span></div></div>
            <div className="hero-visual" aria-hidden="true"><div className="scan-frame"><span className="scan-corner c1"/><span className="scan-corner c2"/><span className="scan-corner c3"/><span className="scan-corner c4"/><div className="scan-person"><div className="person-head"/><div className="person-body"/><div className="person-leg left"/><div className="person-leg right"/><div className="helmet-mark"/></div><div className="scan-tag tag-one"><i/> PERSON DETECTED</div><div className="scan-tag tag-two">PPE · UNVERIFIED</div><div className="scan-line"/></div><div className="visual-coordinate">CAM_04 / FRAME 00182</div></div>
            <div className="hero-index"><span>01</span><span className="index-line"/><span>04</span></div>
          </section>

          <div className="section-title"><div><h2>Experiment at a glance</h2><p>Live project state <span>·</span> no runs recorded yet</p></div><button className="subtle-link" onClick={() => go('Evaluation')}>View evaluation <ArrowRight size={14}/></button></div>
          <div className="metrics-grid">
            <Metric label="Dataset images" value="—" detail="No dataset connected" icon={<Database size={17}/>} />
            <Metric label="Model checkpoint" value="Not trained" detail="Baseline not available" icon={<Layers3 size={17}/>} tone="violet"/>
            <Metric label="Test domains" value="0 / 3" detail="Held-out conditions" icon={<Camera size={17}/>} tone="orange"/>
            <Metric label="Evaluation score" value="—" detail="Awaiting first experiment" icon={<Gauge size={17}/>} tone="green"/>
          </div>
          <div className="dashboard-grid">
            <section className="panel domain-panel"><div className="panel-head"><div><h2>Camera conditions</h2><p>Experiment coverage</p></div><button className="icon-ghost" onClick={() => go('Viewpoint Lab')} aria-label="Open viewpoint lab"><ArrowUpRight size={17}/></button></div><div className="domain-list">{domains.map((d,i)=><div className="domain-item" key={d.name}><span className={'domain-symbol '+d.color}><Camera size={16}/></span><div className="domain-info"><strong>{d.name}</strong><small>{d.detail}</small></div><div className="domain-progress"><div><i style={{width:d.progress+'%'}}/></div><small>{d.status}</small></div></div>)}</div><div className="panel-foot"><span><CircleDot size={13}/> 1 training domain</span><span>3 held-out domains</span></div></section>
            <section className="panel question-panel"><div className="panel-head"><div><h2>Research focus</h2><p>The question behind this workspace</p></div><span className="focus-icon"><ScanEye size={18}/></span></div><div className="question-content"><span className="question-number">CORE QUESTION / 001</span><h3>Can a detector trained on one camera view generalise to another?</h3><p>Perspective, distance, occlusion and lighting can change how PPE appears. This study isolates those shifts.</p><button className="subtle-link" onClick={() => go('Reports')}>Read research protocol <ArrowRight size={14}/></button></div></section>
          </div>
          <div className="section-title readiness-title"><div><h2>Build your experiment</h2><p>Three steps from raw footage to defensible results</p></div></div>
          <div className="workflow-grid"><button className="workflow-card" onClick={() => go('Dataset Studio')}><span className="workflow-number">01</span><span className="workflow-icon"><Database size={18}/></span><strong>Prepare dataset</strong><small>Import footage, labels and camera metadata.</small><ArrowUpRight size={16}/></button><button className="workflow-card" onClick={() => go('Training Studio')}><span className="workflow-number">02</span><span className="workflow-icon violet"><FlaskConical size={18}/></span><strong>Train baseline</strong><small>Configure and record a reproducible model.</small><ArrowUpRight size={16}/></button><button className="workflow-card" onClick={() => go('Evaluation')}><span className="workflow-number">03</span><span className="workflow-icon orange"><BarChart3 size={18}/></span><strong>Evaluate generalisation</strong><small>Compare performance across unseen views.</small><ArrowUpRight size={16}/></button></div>
        </>}

        {active === 'Dataset Studio' && <>
          <Heading kicker="DATA MANAGEMENT" title="Dataset studio" detail="Bring your footage and annotations into a traceable research dataset."><button className="button button-primary" onClick={() => inputRef.current?.click()}><Plus size={15}/> Add dataset</button></Heading>
          <section className="panel upload-panel"><input ref={inputRef} type="file" accept=".zip,.json,.yaml,.yml" className="visually-hidden" onChange={onFile}/><div className="upload-art"><Upload size={23}/></div><h2>{file ? file.name : 'Bring your dataset into SafeSight'}</h2><p>{file ? fileSize + ' · staged locally only' : 'Select an archive or manifest to begin preparing your PPE dataset.'}</p><button className="button button-primary" onClick={() => inputRef.current?.click()}><Upload size={15}/> Choose local file</button><small>ZIP · JSON · YAML · No data is uploaded in this prototype</small>{file && <button className="remove-file" onClick={() => setFile(null)}>Remove selected file</button>}</section>
          <div className="section-title"><div><h2>Dataset quality gates</h2><p>Checks required before a training run</p></div></div><div className="workflow-grid"><div className="workflow-card static"><span className="workflow-icon"><ImageIcon size={18}/></span><strong>Image integrity</strong><small>Readable files, dimensions and duplicate detection.</small><span className="pill-muted">Not checked</span></div><div className="workflow-card static"><span className="workflow-icon violet"><ShieldCheck size={18}/></span><strong>Annotation quality</strong><small>Class mapping, bounding boxes and label coverage.</small><span className="pill-muted">Not checked</span></div><div className="workflow-card static"><span className="workflow-icon orange"><Layers3 size={18}/></span><strong>Split integrity</strong><small>Group-aware splits to prevent camera and frame leakage.</small><span className="pill-muted">Not checked</span></div></div>
        </>}

        {active === 'Training Studio' && <>
          <Heading kicker="MODEL DEVELOPMENT" title="Training studio" detail="Configure a baseline that can be reproduced, compared and audited."/>
          <div className="notice"><FlaskConical size={17}/><span><strong>Training pipeline not connected.</strong> No model weights or training metrics exist yet.</span></div>
          <div className="metrics-grid"><Metric label="Training runs" value="0" detail="No runs recorded" icon={<Activity size={17}/>}/><Metric label="Best checkpoint" value="—" detail="No trained model" icon={<Layers3 size={17}/>} tone="violet"/><Metric label="GPU profile" value="Unknown" detail="Hardware not configured" icon={<Zap size={17}/>} tone="orange"/><Metric label="Run status" value="Idle" detail="Ready for configuration" icon={<Clock3 size={17}/>} tone="green"/></div>
          <section className="panel"><div className="panel-head"><div><h2>Baseline protocol</h2><p>Required before the first training run</p></div><span className="pill-muted">NOT STARTED</span></div><div className="steps-list"><Step n="01" title="Validate training split" detail="Confirm frontal-view samples, labels and group boundaries." status="Required"/><Step n="02" title="Pin model configuration" detail="Record architecture, version, image size and hyperparameters." status="Required"/><Step n="03" title="Train and register checkpoint" detail="Store weights, logs, environment and run identifier." status="Required"/></div></section>
        </>}

        {active === 'Detection Studio' && <>
          <Heading kicker="INFERENCE WORKSPACE" title="Detection studio" detail="Inspect PPE detections, evidence frames and model predictions."/>
          <div className="split-panels"><section className="panel"><div className="panel-head"><div><h2>Inference canvas</h2><p>Image or video input</p></div><span className="pill-muted">MODEL REQUIRED</span></div><Empty icon={<Video size={22}/>} title="No model connected" detail="A trained checkpoint and inference API are required before detection can run."/></section><section className="panel"><div className="panel-head"><div><h2>Detection summary</h2><p>Predicted PPE classes</p></div></div><div className="class-list">{['Helmet','Safety vest','Gloves','Person'].map((x,i)=><div key={x}><span>{x}</span><span className="class-empty">—</span></div>)}</div><small className="panel-note">No predictions available. Values will populate from real inference.</small></section></div>
        </>}

        {active === 'Viewpoint Lab' && <>
          <Heading kicker="GENERALISATION EXPERIMENT" title="Viewpoint lab" detail="Challenge a fixed baseline with camera domains it has never seen."/>
          <section className="hero-strip"><span className="strip-icon"><Camera size={20}/></span><div><strong>One checkpoint. Three unseen conditions.</strong><small>Keep model weights fixed during cross-view evaluation. Fine-tuning must be reported separately.</small></div><span className="pill-blue">CONTROLLED TEST</span></section>
          <section className="panel"><div className="panel-head"><div><h2>Domain matrix</h2><p>Training reference and held-out evaluation conditions</p></div><button className="button button-quiet" onClick={() => go('Evaluation')}><SlidersHorizontal size={14}/> Evaluation settings</button></div><div className="domain-matrix">{domains.map((d,i)=><div className="matrix-row" key={d.name}><span className={'matrix-icon '+d.color}><Camera size={17}/></span><div className="matrix-main"><strong>{d.name}</strong><small>{d.detail}</small></div><span className="matrix-role">{d.kind}</span><span className={'matrix-state '+(i===0?'done':'pending')}>{i===0?<Check size={13}/>:<Clock3 size={13}/>} {d.status}</span></div>)}</div></section>
          <div className="workflow-grid"><div className="workflow-card static"><span className="workflow-number">01</span><strong>Freeze checkpoint</strong><small>Use identical weights across every test domain.</small></div><div className="workflow-card static"><span className="workflow-number">02</span><strong>Lock thresholds</strong><small>Keep confidence, IoU and image size consistent.</small></div><div className="workflow-card static"><span className="workflow-number">03</span><strong>Compare failures</strong><small>Inspect misses by PPE class, size and occlusion.</small></div></div>
        </>}

        {active === 'Evaluation' && <>
          <Heading kicker="MEASUREMENT & ANALYSIS" title="Evaluation" detail="Understand model quality by PPE class, viewpoint and distance."/>
          <div className="notice"><Activity size={17}/><span><strong>No evaluation runs yet.</strong> Metrics are intentionally blank until a labelled test set and trained checkpoint are evaluated.</span></div>
          <div className="metrics-grid"><Metric label="Precision" value="—" detail="No measured value" icon={<Gauge size={17}/>}/><Metric label="Recall" value="—" detail="No measured value" icon={<Activity size={17}/>} tone="violet"/><Metric label="mAP @ 0.50" value="—" detail="No measured value" icon={<BarChart3 size={17}/>} tone="orange"/><Metric label="mAP @ 0.50:0.95" value="—" detail="No measured value" icon={<BarChart3 size={17}/>} tone="green"/></div>
          <div className="split-panels"><section className="panel"><div className="panel-head"><div><h2>Performance by domain</h2><p>Cross-view metric comparison</p></div><button className="icon-ghost" aria-label="Filter results"><Filter size={16}/></button></div><Empty icon={<BarChart3 size={22}/>} title="No chart data" detail="Run evaluation on labelled test data to compare each camera condition."/></section><section className="panel"><div className="panel-head"><div><h2>Failure analysis</h2><p>Where detections break down</p></div></div><Empty icon={<ScanEye size={22}/>} title="No failure cases" detail="False positives, missed detections and class-wise errors will appear here."/></section></div>
        </>}

        {active === 'Reports' && <>
          <Heading kicker="RESEARCH DOCUMENTATION" title="Reports & protocol" detail="Keep every dataset, experiment and result traceable."/>
          <section className="panel report-row"><span className="report-icon"><FileText size={20}/></span><div><strong>Research protocol</strong><small>Experimental design, dataset requirements, metrics and validity safeguards.</small></div><a href="https://github.com/sakilahmed-git/Safe-Sight/blob/main/docs/RESEARCH_PROTOCOL.md" target="_blank" rel="noreferrer">Open <ArrowUpRight size={14}/></a></section>
          <section className="panel report-row"><span className="report-icon violet"><Database size={20}/></span><div><strong>Dataset manifest schema</strong><small>Source, licence, split, viewpoint, distance and annotation metadata.</small></div><a href="https://github.com/sakilahmed-git/Safe-Sight/blob/main/docs/DATASET_MANIFEST.schema.json" target="_blank" rel="noreferrer">Open <ArrowUpRight size={14}/></a></section>
          <section className="panel report-row"><span className="report-icon orange"><Download size={20}/></span><div><strong>Reproducibility record</strong><small>Dataset version, checkpoint, configuration, environment and evaluation command.</small></div><button onClick={() => go('Viewpoint Lab')}>Review rules <ArrowRight size={14}/></button></section>
        </>}
        <footer className="footer"><span>SAFESIGHT AI <i/> RESEARCH WORKSPACE</span><span>PROTOTYPE BUILD · RESULTS ARE NEVER SIMULATED</span></footer>
      </main>
    </div>
  </div>;
}
