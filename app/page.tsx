'use client';

import { useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import {
  Activity, ArrowDownToLine, ArrowRight, BarChart3, Camera,
  ChevronDown, CircleHelp, ClipboardList, Database, FileCheck2, FileImage,
  FlaskConical, Gauge, HardHat, Layers3, Menu, ScanEye, Settings2,
  ShieldCheck, UploadCloud, X, Zap,
} from 'lucide-react';

type PageKey = 'Overview' | 'Dataset studio' | 'Model training' | 'Detection studio' | 'Viewpoint challenge' | 'Evaluation lab' | 'Research reports';

const groups: { label: string; items: { label: PageKey; icon: ReactNode }[] }[] = [
  { label: 'WORKSPACE', items: [
    { label: 'Overview', icon: <Layers3 /> },
    { label: 'Dataset studio', icon: <Database /> },
    { label: 'Model training', icon: <FlaskConical /> },
    { label: 'Detection studio', icon: <ScanEye /> },
  ]},
  { label: 'RESEARCH', items: [
    { label: 'Viewpoint challenge', icon: <Camera /> },
    { label: 'Evaluation lab', icon: <BarChart3 /> },
    { label: 'Research reports', icon: <ClipboardList /> },
  ]},
];

const domains = [
  { name: 'Frontal CCTV', type: 'Training domain', detail: 'Reference camera view', state: 'Training domain', tone: 'blue' },
  { name: 'Overhead camera', type: 'Unseen viewpoint', detail: 'Elevation and occlusion shift', state: 'Not evaluated', tone: 'amber' },
  { name: 'Side-angle camera', type: 'Unseen viewpoint', detail: 'Orientation and profile shift', state: 'Not evaluated', tone: 'amber' },
  { name: 'Long-distance footage', type: 'Scale shift', detail: 'Smaller subject and PPE regions', state: 'Not evaluated', tone: 'violet' },
];

function PageHeading({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{children ? <div className="heading-actions">{children}</div> : null}</div>;
}

function MetricCard({ icon, label, value, note }: { icon: ReactNode; label: string; value: string; note: string }) {
  return <article className="metric-card"><div className="metric-top"><span>{label}</span><span className="metric-icon" aria-hidden="true">{icon}</span></div><strong>{value}</strong><p>{note}</p></article>;
}

function EmptyState({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return <div className="empty-state"><span className="empty-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{description}</p></div>;
}

export default function Home() {
  const [active, setActive] = useState<PageKey>('Overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedSize = useMemo(() => selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : '', [selectedFile]);

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  }

  function navigate(page: PageKey) {
    setActive(page);
    setMobileOpen(false);
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {mobileOpen ? <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} /> : null}
      <aside className={mobileOpen ? 'sidebar sidebar-open' : 'sidebar'} aria-label="Main navigation">
        <div className="brand-lockup">
          <span className="brand-mark"><ScanEye size={21} strokeWidth={2.1} /></span>
          <span className="brand-copy"><strong>SafeSight <em>AI</em></strong><small>RESEARCH WORKSPACE</small></span>
          <button className="icon-button sidebar-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={18} /></button>
        </div>

        <button className="study-switcher" onClick={() => navigate('Overview')} aria-label="Current study: PPE viewpoint generalisation">
          <span className="study-icon"><HardHat size={18} /></span>
          <span className="study-copy"><small>ACTIVE STUDY</small><strong>PPE viewpoint<br />generalisation</strong></span>
          <ChevronDown size={15} />
        </button>

        <nav className="nav-groups">
          {groups.map((group) => (
            <div className="nav-group" key={group.label}>
              <div className="nav-label">{group.label}</div>
              {group.items.map((item) => (
                <button key={item.label} className={active === item.label ? 'nav-item nav-item-active' : 'nav-item'} onClick={() => navigate(item.label)} aria-current={active === item.label ? 'page' : undefined}>
                  <span className="nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
                  {item.label === 'Viewpoint challenge' ? <span className="nav-dot" aria-label="Research focus" /> : null}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="guide-card"><CircleHelp size={18} /><strong>Research guide</strong><p>Keep the test protocol reproducible and report only measured results.</p><button onClick={() => navigate('Research reports')}>View protocol <ArrowRight size={14} /></button></div>
          <button className="nav-item settings-item" onClick={() => navigate('Research reports')}><Settings2 size={17} /><span>Project settings</span></button>
          <div className="profile-row"><span className="profile-avatar">SA</span><span><strong>Researcher</strong><small>Local workspace</small></span><span className="profile-status" title="Prototype workspace" /></div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button mobile-menu" aria-label="Open navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>{active}</strong></div></div>
          <div className="topbar-right"><span className="workspace-status"><i /> Prototype workspace</span><span className="profile-avatar top-avatar" aria-label="Researcher profile">SA</span></div>
        </header>

        <main id="main-content" className="main-content">
          {active === 'Overview' ? (
            <>
              <PageHeading eyebrow="COMPUTER VISION / PPE COMPLIANCE STUDY" title="Research overview" description="Measure how a single-stage PPE detector performs beyond the camera views it learned from.">
                <button className="button button-secondary" onClick={() => navigate('Dataset studio')}><UploadCloud size={16} /> Add dataset</button>
                <button className="button button-primary" onClick={() => navigate('Viewpoint challenge')}><FlaskConical size={16} /> Configure experiment</button>
              </PageHeading>
              <section className="research-banner" aria-label="Research objective">
                <span className="banner-icon"><ShieldCheck size={21} /></span>
                <div><strong>One model. Unseen viewpoints. Measurable generalisation.</strong><p>Train on frontal CCTV, then evaluate overhead, side-angle and distance-shifted footage.</p></div>
                <span className="protocol-label">CONTROLLED PROTOCOL</span>
              </section>

              <div className="section-heading"><div><h2>Experiment snapshot</h2><p>Current project state · no model results recorded</p></div><span className="status-pill">INITIAL SETUP</span></div>
              <div className="metrics-grid">
                <MetricCard icon={<Database size={17} />} label="Dataset images" value="—" note="No dataset connected" />
                <MetricCard icon={<Layers3 size={17} />} label="Detector" value="Not trained" note="Single-stage baseline pending" />
                <MetricCard icon={<Camera size={17} />} label="Test domains" value="0 / 3" note="Overhead · side · distance" />
                <MetricCard icon={<Activity size={17} />} label="Generalisation gap" value="—" note="Requires measured results" />
              </div>

              <div className="overview-grid">
                <section className="surface-card domain-card"><div className="card-heading"><div><h2>Evaluation conditions</h2><p>Target matrix for the research experiment</p></div><button className="text-button" onClick={() => navigate('Evaluation lab')}>Open evaluation <ArrowRight size={15} /></button></div>
                  <div className="domain-list">{domains.map((domain) => <div className="domain-row" key={domain.name}><span className={'domain-icon domain-' + domain.tone}><Camera size={17} /></span><span className="domain-copy"><strong>{domain.name}</strong><small>{domain.detail}</small></span><span className={'domain-state state-' + domain.tone}>{domain.state}</span></div>)}</div>
                  <div className="integrity-note"><ShieldCheck size={16} /><span>Scores will appear only after evaluation on labelled test data.</span></div>
                </section>
                <section className="surface-card research-card"><div className="card-heading"><div><h2>Research question</h2><p>What this project aims to establish</p></div><span className="research-card-icon"><ScanEye size={19} /></span></div><h3>Does the detector generalise?</h3><p>A detector trained on frontal CCTV can fail when camera elevation, orientation, occlusion or subject scale changes.</p><ul><li>Keep model weights fixed during cross-view testing</li><li>Report precision, recall and mAP per condition</li><li>Analyse failure cases by PPE class and distance</li></ul></section>
              </div>

              <div className="section-heading readiness-heading"><div><h2>Project readiness</h2><p>Build the experiment in a reproducible order</p></div></div>
              <div className="readiness-grid"><ReadinessStep number="01" title="Dataset ingestion" description="Import images, labels and source metadata" state="Next step" /><ReadinessStep number="02" title="Baseline training" description="Train and record a reproducible baseline" state="Waiting" /><ReadinessStep number="03" title="Cross-view evaluation" description="Test unseen viewpoints without fine-tuning" state="Waiting" /></div>
            </>
          ) : null}

          {active === 'Dataset studio' ? (
            <>
              <PageHeading eyebrow="DATA MANAGEMENT" title="Dataset studio" description="Prepare a traceable, leakage-resistant dataset before training." />
              <div className="notice notice-info"><ShieldCheck size={18} /><span><strong>Dataset ingestion is not connected yet.</strong> You can select a local archive to stage the workflow, but this prototype does not upload or process it.</span></div>
              <section className="surface-card upload-card"><div className="upload-symbol"><UploadCloud size={24} /></div><h2>Bring your PPE dataset</h2><p>Select a dataset archive or manifest. Keep raw footage outside Git and record its source, licence and camera metadata.</p><input ref={inputRef} className="visually-hidden" type="file" accept=".zip,.json,.yaml,.yml" onChange={chooseFile} aria-label="Choose dataset archive or manifest" /><button className="button button-primary" onClick={() => inputRef.current?.click()}><UploadCloud size={16} /> Choose local file</button>{selectedFile ? <div className="selected-file"><FileCheck2 size={17} /><span><strong>{selectedFile.name}</strong><small>{selectedSize} · selected locally, not uploaded</small></span><button className="icon-button" aria-label="Remove selected file" onClick={() => setSelectedFile(null)}><X size={16} /></button></div> : <small className="upload-hint">Accepted for staging: ZIP, JSON, YAML</small>}</section>
              <div className="two-column"><section className="surface-card"><div className="card-heading"><div><h2>Required metadata</h2><p>Capture these fields for every source</p></div><FileImage size={19} /></div><ul className="check-list"><li>Dataset name, version and licence</li><li>Camera viewpoint and approximate distance</li><li>Source video or site grouping</li><li>Class definitions and annotation format</li><li>Train, validation and test split</li></ul></section><section className="surface-card"><div className="card-heading"><div><h2>Data integrity</h2><p>Validation gates before training</p></div><ShieldCheck size={19} /></div><ul className="check-list"><li>Image and annotation integrity</li><li>Duplicate and near-duplicate detection</li><li>Group-aware split leakage audit</li><li>Class balance and annotation QA</li><li>Dataset manifest and checksums</li></ul></section></div>
            </>
          ) : null}

          {active === 'Model training' ? (
            <>
              <PageHeading eyebrow="MODEL DEVELOPMENT" title="Model training" description="Establish a reproducible frontal-view baseline before cross-camera testing." />
              <div className="notice notice-warning"><FlaskConical size={18} /><span><strong>No training pipeline is connected.</strong> No checkpoint, training run or model metrics currently exist in this repository.</span></div>
              <div className="metrics-grid training-metrics"><MetricCard icon={<Layers3 size={17} />} label="Baseline checkpoint" value="Missing" note="Train domain: frontal CCTV" /><MetricCard icon={<Gauge size={17} />} label="Training runs" value="0" note="No runs recorded" /><MetricCard icon={<Zap size={17} />} label="Inference profile" value="—" note="Hardware not configured" /><MetricCard icon={<FileCheck2 size={17} />} label="Reproducibility" value="Pending" note="Config and environment required" /></div>
              <section className="surface-card"><div className="card-heading"><div><h2>Baseline training protocol</h2><p>Required records for a reproducible run</p></div><span className="status-pill">NOT STARTED</span></div><div className="protocol-steps"><ReadinessStep number="01" title="Validate training split" description="Confirm frontal-view samples, labels and group boundaries" state="Required" /><ReadinessStep number="02" title="Pin model and environment" description="Record detector version, dependencies and hardware" state="Required" /><ReadinessStep number="03" title="Train and save checkpoint" description="Store configuration, logs, weights and run identifier" state="Required" /></div></section>
            </>
          ) : null}

          {active === 'Detection studio' ? (
            <>
              <PageHeading eyebrow="INFERENCE WORKSPACE" title="Detection studio" description="Inspect PPE detections from a trained and versioned model." />
              <EmptyState icon={<ScanEye size={25} />} title="A trained detector is required" description="The inference interface will be enabled after a baseline checkpoint and prediction API are available. No sample detections are being shown as real results." />
              <div className="two-column"><section className="surface-card"><h2>Planned inference inputs</h2><ul className="check-list"><li>Image and video frame inference</li><li>Configurable confidence threshold</li><li>Bounding boxes and class labels</li><li>Exportable annotated frames</li></ul></section><section className="surface-card"><h2>Planned compliance analysis</h2><ul className="check-list"><li>Person-to-PPE association rules</li><li>Helmet and safety-vest status</li><li>Uncertain or occluded detections</li><li>Frame-level evidence and timestamps</li></ul></section></div>
            </>
          ) : null}

          {active === 'Viewpoint challenge' ? (
            <>
              <PageHeading eyebrow="GENERALISATION STUDY" title="Viewpoint challenge" description="Compare a frozen frontal-trained detector against camera domains it has not seen." />
              <div className="notice notice-info"><ShieldCheck size={18} /><span><strong>Hold the checkpoint fixed during this test.</strong> Do not tune on held-out viewpoints. Report any fine-tuned model as a separate experiment.</span></div>
              <section className="surface-card"><div className="card-heading"><div><h2>Cross-view test matrix</h2><p>Target evaluation domains and expected distribution shifts</p></div><span className="status-pill">0 DOMAINS TESTED</span></div><div className="challenge-table-wrap"><table className="challenge-table"><thead><tr><th scope="col">Camera domain</th><th scope="col">Domain role</th><th scope="col">Primary shift</th><th scope="col">Evaluation</th></tr></thead><tbody>{domains.map((domain) => <tr key={domain.name}><td><strong>{domain.name}</strong></td><td>{domain.type}</td><td>{domain.detail}</td><td><span className={'domain-state state-' + domain.tone}>{domain.state}</span></td></tr>)}</tbody></table></div></section>
              <section className="surface-card methodology-card"><h2>Comparison rules</h2><div className="rule-grid"><div><strong>01 · Fixed weights</strong><p>Use the same checkpoint for every held-out domain.</p></div><div><strong>02 · Consistent thresholds</strong><p>Keep image size, confidence and IoU settings consistent.</p></div><div><strong>03 · Group-aware splits</strong><p>Separate videos, cameras or sites to prevent frame leakage.</p></div></div></section>
            </>
          ) : null}

          {active === 'Evaluation lab' ? (
            <>
              <PageHeading eyebrow="MEASUREMENT & ANALYSIS" title="Evaluation lab" description="Track measured detection performance by camera domain and PPE class." />
              <div className="notice notice-warning"><Activity size={18} /><span><strong>No evaluation runs found.</strong> Metrics remain blank until a labelled test set and trained checkpoint are evaluated.</span></div>
              <div className="metrics-grid"><MetricCard icon={<Gauge size={17} />} label="Precision" value="—" note="No measured value" /><MetricCard icon={<Activity size={17} />} label="Recall" value="—" note="No measured value" /><MetricCard icon={<BarChart3 size={17} />} label="mAP@0.50" value="—" note="No measured value" /><MetricCard icon={<BarChart3 size={17} />} label="mAP@0.50:0.95" value="—" note="No measured value" /></div>
              <section className="surface-card"><div className="card-heading"><div><h2>Per-domain results</h2><p>Scores will populate from actual evaluation runs</p></div><span className="status-pill">NO DATA</span></div><EmptyState icon={<BarChart3 size={24} />} title="Nothing to chart yet" description="Run evaluation on labelled test data to compare precision, recall, mAP and class-wise performance across viewpoints." /></section>
              <section className="surface-card"><h2>Required evaluation outputs</h2><div className="rule-grid"><div><strong>Detection quality</strong><p>Precision, recall, mAP@0.50 and mAP@0.50:0.95.</p></div><div><strong>Failure analysis</strong><p>Per-class confusion matrix, object-size buckets and occlusion cases.</p></div><div><strong>Runtime profile</strong><p>Inference latency, hardware, image size and threshold settings.</p></div></div></section>
            </>
          ) : null}

          {active === 'Research reports' ? (
            <>
              <PageHeading eyebrow="DOCUMENTATION & REPRODUCIBILITY" title="Research reports" description="Keep the methodology, dataset provenance and experiment outputs auditable." />
              <section className="surface-card report-card"><div className="report-icon"><ClipboardList size={22} /></div><div><h2>Research protocol</h2><p>Research questions, experimental design, dataset requirements, metrics and validity safeguards.</p><a className="button button-secondary" href="https://github.com/sakilahmed-git/Safe-Sight/blob/main/docs/RESEARCH_PROTOCOL.md" target="_blank" rel="noreferrer">Open protocol <ArrowRight size={15} /></a></div></section>
              <section className="surface-card report-card"><div className="report-icon"><Database size={22} /></div><div><h2>Dataset manifest schema</h2><p>Machine-readable schema for source, licence, split, viewpoint, distance and annotation metadata.</p><a className="button button-secondary" href="https://github.com/sakilahmed-git/Safe-Sight/blob/main/docs/DATASET_MANIFEST.schema.json" target="_blank" rel="noreferrer">View schema <ArrowRight size={15} /></a></div></section>
              <section className="surface-card report-card"><div className="report-icon"><ArrowDownToLine size={22} /></div><div><h2>Reproducibility checklist</h2><p>Record dataset version, split, checkpoint, configuration, software environment and evaluation command for every reported result.</p><button className="button button-secondary" onClick={() => navigate('Viewpoint challenge')}>Review experiment rules <ArrowRight size={15} /></button></div></section>
            </>
          ) : null}

          <footer className="app-footer"><span>SAFESIGHT AI <i /> RESEARCH BUILD 0.2.0</span><span>PROTOTYPE · NO UNVERIFIED RESULTS</span></footer>
        </main>
      </div>
    </div>
  );
}

function ReadinessStep({ number, title, description, state }: { number: string; title: string; description: string; state: string }) {
  return <div className="readiness-step"><span className="step-number">{number}</span><span className="step-copy"><strong>{title}</strong><small>{description}</small></span><span className="step-state">{state}</span></div>;
}
