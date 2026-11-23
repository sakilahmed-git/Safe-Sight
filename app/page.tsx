'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Activity, ArrowDownToLine, ArrowUpRight, Bell, Boxes, Camera, Check,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Command, Database,
  FileText, FlaskConical, FolderOpen, Gauge, HardHat, ImagePlus, LayoutGrid,
  Menu, MoreHorizontal, Play, ScanEye, Search, Settings2, ShieldCheck,
  SlidersHorizontal, Upload, Video, X, Zap
} from 'lucide-react';

type Section = 'Overview' | 'Live monitor' | 'Datasets' | 'Models' | 'Viewpoint lab' | 'Results';
const sections: { title: Section; icon: typeof LayoutGrid; group: string }[] = [
  { title: 'Overview', icon: LayoutGrid, group: 'WORKSPACE' },
  { title: 'Live monitor', icon: Camera, group: 'WORKSPACE' },
  { title: 'Datasets', icon: Database, group: 'WORKSPACE' },
  { title: 'Models', icon: Boxes, group: 'WORKSPACE' },
  { title: 'Viewpoint lab', icon: ScanEye, group: 'RESEARCH' },
  { title: 'Results', icon: Activity, group: 'RESEARCH' },
];

function Brand({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return <div className="brand">
    <button className="brand-mark" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
      <ScanEye size={21}/><span className="brand-hover"><Menu size={17}/></span>
    </button>
    {!collapsed && <><div className="brand-copy"><strong>SafeSight<span>AI</span></strong><small>VISION WORKSPACE</small></div><button className="brand-toggle" onClick={onToggle} aria-label="Collapse sidebar"><ChevronLeft size={16}/></button></>}
  </div>;
}

export default function Home() {
  const [active, setActive] = useState<Section>('Overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [asset, setAsset] = useState<File | null>(null);
  const [assetUrl, setAssetUrl] = useState('');
  const [search, setSearch] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!asset) { setAssetUrl(''); return; }
    const url = URL.createObjectURL(asset);
    setAssetUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [asset]);

  const chooseFile = (file?: File) => {
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setAsset(file);
      setActive('Live monitor');
    }
  };
  const navButton = (item: typeof sections[number]) => {
    const Icon = item.icon;
    return <button key={item.title} className={'nav-item ' + (active === item.title ? 'selected' : '')}
      onClick={() => { setActive(item.title); setMobileOpen(false); }} title={collapsed ? item.title : undefined}>
      <Icon size={17}/><span>{item.title}</span>{item.title === 'Live monitor' && <i className="nav-live"/>}
    </button>;
  };

  return <div className={'app-shell ' + (collapsed ? 'is-collapsed' : '')}>
    {mobileOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)}/>}
    <aside className={'sidebar ' + (mobileOpen ? 'mobile-open' : '')}>
      <Brand collapsed={collapsed} onToggle={() => setCollapsed(v => !v)}/>
      <button className="project-select" onClick={() => setActive('Overview')}>
        <span className="project-icon"><HardHat size={17}/></span>
        <span className="project-label"><small>PROJECT</small><strong>PPE compliance study</strong></span>
        <ChevronDown size={15}/>
      </button>
      <div className="nav-label">WORKSPACE</div>
      <nav>{sections.filter(s => s.group === 'WORKSPACE').map(navButton)}</nav>
      <div className="nav-label research-label">RESEARCH</div>
      <nav>{sections.filter(s => s.group === 'RESEARCH').map(navButton)}</nav>
      <div className="sidebar-bottom">
        <div className="storage-mini"><div className="storage-top"><span>LOCAL STORAGE</span><span>—</span></div><div className="storage-track"><i/></div><small>Connect a dataset to begin</small></div>
        <button className="nav-item"><CircleHelp size={17}/><span>Documentation</span></button>
        <button className="profile-row"><span className="avatar">SA</span><span className="profile-text"><strong>Research workspace</strong><small>Local environment</small></span><MoreHorizontal size={17}/></button>
      </div>
    </aside>

    <div className="main-column">
      <header className="topbar">
        <div className="crumbs"><button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={19}/></button><span>SafeSight</span><i>/</i><strong>{active}</strong></div>
        <div className="top-actions">
          <label className="top-search"><Search size={15}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search workspace"/><kbd>⌘ K</kbd></label>
          <button className="top-icon" aria-label="Notifications"><Bell size={17}/></button>
          <span className="top-separator"/>
          <span className="environment"><i/> LOCAL</span>
          <span className="avatar avatar-small">SA</span>
        </div>
      </header>

      <main className="content">
        {active === 'Overview' && <>
          <div className="page-head">
            <div><div className="eyebrow">PPE COMPLIANCE <span>·</span> COMPUTER VISION</div><h1>Good morning.</h1><p>Your research workspace is ready for its first dataset.</p></div>
            <button className="button button-primary" onClick={() => fileRef.current?.click()}><Upload size={15}/> Import footage</button>
          </div>
          <section className="workbench">
            <div className="workbench-main">
              <div className="workbench-heading"><div><span className="live-dot"/> <span className="eyebrow">INSPECTION CANVAS</span><span className="canvas-state">NO SOURCE CONNECTED</span></div><button className="icon-button" aria-label="More canvas options"><MoreHorizontal size={18}/></button></div>
              <div className="canvas-empty" onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => {e.preventDefault();chooseFile(e.dataTransfer.files?.[0]);}}>
                <div className="empty-grid"/>
                <div className="upload-orb"><ImagePlus size={23}/></div>
                <h2>Bring a camera frame into focus.</h2>
                <p>Drop an image or video here to inspect it in the workspace.</p>
                <button className="button button-light" onClick={e => {e.stopPropagation();fileRef.current?.click();}}>Browse files <ArrowUpRight size={14}/></button>
                <span className="file-hint">JPG · PNG · WEBP · MP4 · MOV</span>
              </div>
              <input ref={fileRef} type="file" accept="image/*,video/*" hidden onChange={e => chooseFile(e.target.files?.[0])}/>
              <div className="canvas-footer"><span><Command size={13}/> Drop files to preview</span><span>PREVIEW ONLY <i/> INFERENCE NOT CONNECTED</span></div>
            </div>
            <aside className="inspector">
              <div className="inspector-title"><div><span className="eyebrow">WORKSPACE STATUS</span><h3>Project snapshot</h3></div><button className="icon-button"><MoreHorizontal size={17}/></button></div>
              <div className="status-row"><span className="status-icon"><Database size={16}/></span><div><strong>Dataset</strong><small>Waiting for source files</small></div><span className="status-pill">EMPTY</span></div>
              <div className="status-row"><span className="status-icon purple"><Boxes size={16}/></span><div><strong>Detection model</strong><small>No checkpoint registered</small></div><span className="status-pill">—</span></div>
              <div className="status-row"><span className="status-icon amber"><FlaskConical size={16}/></span><div><strong>Experiments</strong><small>No evaluation runs</small></div><span className="status-pill">0</span></div>
              <div className="inspector-divider"/>
              <div className="research-question"><span className="eyebrow">RESEARCH QUESTION</span><h3>Can a detector trained on one camera view generalise to another?</h3><p>Measure the effect of viewpoint, distance and occlusion on PPE detection.</p><button className="text-action" onClick={() => setActive('Viewpoint lab')}>Open viewpoint lab <ChevronRight size={14}/></button></div>
            </aside>
          </section>
          <div className="below-grid">
            <section className="section-block"><div className="section-heading"><div><span className="eyebrow">EXPERIMENT DESIGN</span><h2>Camera domains</h2></div><button className="text-action" onClick={() => setActive('Viewpoint lab')}>View matrix <ArrowUpRight size={14}/></button></div>
              <div className="domain-table">
                <div className="domain-line"><span className="domain-thumb frontal"><Camera size={17}/></span><span className="domain-name"><strong>Frontal CCTV</strong><small>Training reference</small></span><span className="domain-tag reference"><Check size={12}/> Reference</span></div>
                <div className="domain-line"><span className="domain-thumb overhead"><ScanEye size={17}/></span><span className="domain-name"><strong>Overhead</strong><small>Elevation and occlusion shift</small></span><span className="domain-tag">Not tested</span></div>
                <div className="domain-line"><span className="domain-thumb side"><Camera size={17}/></span><span className="domain-name"><strong>Side angle</strong><small>Orientation and profile shift</small></span><span className="domain-tag">Not tested</span></div>
                <div className="domain-line"><span className="domain-thumb distance"><Gauge size={17}/></span><span className="domain-name"><strong>Long distance</strong><small>Scale and resolution shift</small></span><span className="domain-tag">Not tested</span></div>
              </div>
            </section>
            <section className="section-block activity-block"><div className="section-heading"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Nothing yet</h2></div><span className="activity-mark"><Activity size={17}/></span></div><div className="activity-empty"><span className="activity-line"/><p>Your imports, training runs and evaluation events will appear here.</p></div></section>
          </div>
        </>}

        {active === 'Live monitor' && <div className="page-head"><div><div className="eyebrow">SOURCE INSPECTION</div><h1>Live monitor</h1><p>Preview source footage and inspect the camera frame.</p></div><button className="button button-primary" onClick={() => fileRef.current?.click()}><Upload size={15}/> Add source</button></div>}
        {active === 'Live monitor' && <section className="monitor-layout"><div className="monitor-canvas">
          <div className="monitor-toolbar"><span><span className="live-dot"/> SOURCE VIEWER</span><div><button className="icon-button"><SlidersHorizontal size={16}/></button><button className="icon-button"><MoreHorizontal size={17}/></button></div></div>
          {assetUrl ? <div className="media-preview">{asset?.type.startsWith('video/') ? <video src={assetUrl} controls playsInline/> : <img src={assetUrl} alt="Selected source preview"/>}<div className="preview-label">LOCAL PREVIEW · NO DETECTIONS</div></div> : <div className="monitor-empty" onClick={() => fileRef.current?.click()}><ImagePlus size={27}/><strong>Select a source to inspect</strong><span>Image and video files are previewed locally.</span><button className="button button-light">Choose source</button></div>}
          <input ref={fileRef} type="file" accept="image/*,video/*" hidden onChange={e => chooseFile(e.target.files?.[0])}/>
          <div className="monitor-footer">{asset ? <><span>{asset.name}</span><button className="text-action" onClick={() => setAsset(null)}>Remove source <X size={13}/></button></> : <span>Awaiting source</span>}<span>INFERENCE OFFLINE</span></div>
        </div><aside className="monitor-inspector"><span className="eyebrow">SOURCE DETAILS</span><h3>{asset ? asset.name : 'No source loaded'}</h3><div className="detail-pair"><span>Type</span><strong>{asset?.type || '—'}</strong></div><div className="detail-pair"><span>Size</span><strong>{asset ? (asset.size / 1048576).toFixed(2) + ' MB' : '—'}</strong></div><div className="detail-pair"><span>Model</span><strong>Not connected</strong></div><div className="detail-pair"><span>Predictions</span><strong>Unavailable</strong></div><div className="inspector-note"><ShieldCheck size={16}/><span>Preview only. SafeSight will not display detections until a real inference model is connected.</span></div></aside></section>}

        {active === 'Datasets' && <><div className="page-head"><div><div className="eyebrow">DATA MANAGEMENT</div><h1>Datasets</h1><p>Organise footage, annotations and camera metadata.</p></div><button className="button button-primary" onClick={() => fileRef.current?.click()}><Upload size={15}/> Import files</button></div><section className="simple-empty"><div className="empty-orb"><FolderOpen size={24}/></div><h2>Your dataset library is empty.</h2><p>Start with a labelled PPE dataset or add source footage to build one.</p><button className="button button-primary" onClick={() => fileRef.current?.click()}>Choose local files <ArrowUpRight size={14}/></button><input ref={fileRef} type="file" multiple accept="image/*,video/*,.zip,.json,.yaml,.yml" hidden onChange={e => chooseFile(e.target.files?.[0])}/></section></>}
        {active === 'Models' && <><div className="page-head"><div><div className="eyebrow">MODEL REGISTRY</div><h1>Models</h1><p>Track checkpoints and keep experiments reproducible.</p></div><span className="quiet-status">0 CHECKPOINTS</span></div><section className="simple-empty"><div className="empty-orb purple"><Boxes size={24}/></div><h2>No model registered.</h2><p>Trained checkpoints will appear here with their configuration and evaluation history.</p><button className="button button-light" onClick={() => setActive('Viewpoint lab')}>Explore experiment design <ArrowUpRight size={14}/></button></section></>}
        {active === 'Viewpoint lab' && <><div className="page-head"><div><div className="eyebrow">GENERALISATION STUDY</div><h1>Viewpoint lab</h1><p>Keep the baseline fixed. Change the camera conditions.</p></div><span className="quiet-status">PROTOCOL 01</span></div><section className="lab-intro"><span className="lab-icon"><ScanEye size={22}/></span><div><strong>One training domain. Three held-out domains.</strong><p>Evaluate cross-view performance without changing model weights or confidence thresholds.</p></div></section><div className="lab-grid">{[{n:'01',name:'Frontal CCTV',desc:'Training reference',type:'TRAINING',tone:'blue'},{n:'02',name:'Overhead',desc:'Elevation and occlusion',type:'HELD OUT',tone:'orange'},{n:'03',name:'Side angle',desc:'Orientation shift',type:'HELD OUT',tone:'purple'},{n:'04',name:'Long distance',desc:'Scale and resolution',type:'HELD OUT',tone:'green'}].map(d=><article className="lab-card" key={d.n}><span className="lab-number">{d.n}</span><span className={'lab-symbol '+d.tone}><Camera size={19}/></span><h3>{d.name}</h3><p>{d.desc}</p><span className={'lab-type '+d.tone}>{d.type}</span></article>)}</div><section className="protocol-strip"><ShieldCheck size={18}/><div><strong>Evaluation integrity</strong><span>Freeze checkpoint, preprocessing and thresholds before comparing domains.</span></div></section></>}
        {active === 'Results' && <><div className="page-head"><div><div className="eyebrow">MEASUREMENT</div><h1>Results</h1><p>Compare performance across PPE classes and camera viewpoints.</p></div><span className="quiet-status">NO RUNS RECORDED</span></div><section className="simple-empty"><div className="empty-orb green"><Activity size={24}/></div><h2>Results will appear after your first evaluation.</h2><p>Precision, recall, mAP and per-domain failure analysis will be populated from measured runs only.</p><button className="button button-light" onClick={() => setActive('Viewpoint lab')}>Review evaluation protocol <ArrowUpRight size={14}/></button></section></>}
        <footer className="footer"><span>SAFESIGHT <i/> RESEARCH WORKSPACE</span><span>LOCAL ENVIRONMENT <i/> BUILD 0.2</span></footer>
      </main>
    </div>
  </div>;
}
