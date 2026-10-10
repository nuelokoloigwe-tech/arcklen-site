import { useEffect, useState } from 'react';
import {
  ArrowRight, BarChart3, CheckCircle2, FileText, FolderKanban,
  GitBranch, LayoutDashboard, Plus, Presentation, Settings, Sparkles
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Project = {
  id: string;
  name: string;
  description: string;
  brief: string;
  updated: string;
  tags: string[];
  analysis?: string;
};

const starterProjects: Project[] = [
  {
    id: 'mortgage',
    name: 'Mortgage Servicing Improvement',
    description: 'Improve document processing and reduce customer wait time.',
    brief: '',
    updated: 'Today',
    tags: ['Analysis', 'Requirements', 'Process'],
  },
  {
    id: 'onboarding',
    name: 'Customer Onboarding Review',
    description: 'Streamline onboarding and strengthen KYC controls.',
    brief: '',
    updated: '2 days ago',
    tags: ['Stakeholders', 'Requirements', 'Gap'],
  },
];

const tabs = ['Overview', 'Stakeholders', 'Process', 'Requirements', 'Rules', 'Gaps', 'Documents'];

export default function OdiWorkspace() {
const [projects, setProjects] = useState<Project[]>(() => {
  try {
    const savedProjects = localStorage.getItem('odi-projects');

    return savedProjects
      ? (JSON.parse(savedProjects) as Project[])
      : starterProjects;
  } catch {
    return starterProjects;
  }
});
  const [selected, setSelected] = useState<Project | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');
  
useEffect(() => {
  localStorage.setItem('odi-projects', JSON.stringify(projects));
}, [projects]);

  const create = () => {
  if (!name.trim()) return;

  const project: Project = {
    id: crypto.randomUUID(),
    name: name.trim(),
    description: brief.trim()
      ? brief.trim().slice(0, 180)
      : 'New BA project ready for Odi analysis.',
    brief: brief.trim(),
    updated: 'Just now',
    tags: ['New Project'],
  };

  setProjects(current => [project, ...current]);
  setSelected(project);
  setNewOpen(false);
  setName('');
  setBrief('');
};

  if (selected) return <Workspace project={selected} back={() => setSelected(null)} />;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 bg-slate-950 text-white lg:flex lg:flex-col">
          <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-300 font-bold text-slate-950">O</div>
            <div><div className="font-semibold">Odi</div><div className="text-xs text-slate-400">BA Thinking Workspace</div></div>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {[
              ['Dashboard', LayoutDashboard], ['Projects', FolderKanban], ['BA Workspace', Sparkles],
              ['Documents', FileText], ['Presentations', Presentation]
            ].map(([label, Icon]) => (
              <button key={label as string} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                <Icon className="h-4 w-4" />{label as string}
              </button>
            ))}
          </nav>
          <div className="border-t border-white/10 p-4"><button className="flex gap-3 px-4 py-3 text-sm text-slate-300"><Settings className="h-4 w-4"/>Settings</button></div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Dashboard</p><h1 className="text-sm font-semibold">Odi — BA Thinking Workspace</h1></div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">N</div>
          </header>

          <div className="mx-auto max-w-7xl p-6 lg:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><p className="text-sm font-semibold text-blue-600">Your BA Workspace</p>
                <h2 className="mt-1 text-3xl font-semibold tracking-tight">Good evening, Nuel 👋</h2>
                <p className="mt-2 max-w-2xl text-slate-600">Bring a project brief to Odi and turn it into structured BA thinking, analysis and delivery artefacts.</p>
              </div>
              <button onClick={() => setNewOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"><Plus className="h-4 w-4"/>New Project</button>
            </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {([
                ['Active Projects', projects.length, FolderKanban],
                ['Documents', 12, FileText],
                ['Process Diagrams', 4, GitBranch],
                ['Presentations', 2, Presentation]
              ] as [string, number, LucideIcon][]).map(([label, value, Icon]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl font-semibold">{value}</span>
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-600">{label}</p>
                </div>
              ))}
            </div>

            <section className="mt-8">
              <h3 className="text-xl font-semibold">Recent Projects</h3>
              <p className="mt-1 text-sm text-slate-500">Continue working where you left off.</p>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {projects.map(p => (
                  <button key={p.id} onClick={() => setSelected(p)} className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-blue-200 hover:shadow-md">
                    <div className="flex justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-blue-600"><FolderKanban className="h-6 w-6"/></div><ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600"/></div>
                    <h4 className="mt-5 text-lg font-semibold">{p.name}</h4><p className="mt-2 text-sm leading-6 text-slate-600">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{p.tags.map(t => <span key={t} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{t}</span>)}</div>
                    <p className="mt-4 text-xs text-slate-400">Updated {p.updated}</p>
                  </button>
                ))}
              </div>
            </section>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex gap-4"><LightbulbIcon/><div><h3 className="font-semibold">How Odi works</h3><p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">Start with a project brief. Odi reviews the context, identifies what is known and unknown, suggests BA techniques, and helps build connected requirements, processes, stakeholders, rules and gaps.</p></div></div>
            </div>
          </div>
        </main>
      </div>

      {newOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
        <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
          <p className="text-sm font-semibold text-blue-600">New Project</p><h2 className="mt-1 text-2xl font-semibold">Start a BA workspace</h2>
          <div className="mt-6 space-y-5">
            <label className="block text-sm font-semibold">Project name<input value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal" placeholder="e.g. Mortgage Servicing Improvement"/></label>
            <label className="block text-sm font-semibold">Project brief<textarea value={brief} onChange={e => setBrief(e.target.value)} rows={7} className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 font-normal" placeholder="Paste the project brief, business problem, objectives or change request..."/></label>
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center"><FileText className="mx-auto h-7 w-7 text-slate-400"/><p className="mt-2 text-sm font-medium">Document upload comes next</p><p className="mt-1 text-xs text-slate-500">PDF, Word and supporting documents will feed the same workspace context.</p></div>
          </div>
          <div className="mt-6 flex justify-end gap-3"><button onClick={() => setNewOpen(false)} className="rounded-xl border px-5 py-3 text-sm font-semibold">Cancel</button><button onClick={create} disabled={!name.trim()} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-40">Create workspace <ArrowRight className="ml-1 inline h-4 w-4"/></button></div>
        </div>
      </div>}
    </div>
  );
}

function Workspace({ project, back }: { project: Project; back: () => void }) {
  const [tab, setTab] = useState('Overview');
  const [analysis, setAnalysis] = useState(project.analysis ?? '');
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [analysisError, setAnalysisError] = useState('');

  const analyseBrief = async () => {
    if (!project.brief.trim() || project.brief.trim().length < 100) {
      setAnalysisError(
        'Please provide a project brief containing at least 100 characters.'
      );
      return;
    }

    setIsAnalysing(true);
    setAnalysisError('');
    setAnalysis('');

    try {
      const response = await fetch('/api/analyse-project-brief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName: project.name,
          briefText: project.brief,
        }),
      });

      
const responseText = await response.text();

let data: { error?: string; analysis?: string };

try {
  data = JSON.parse(responseText);
} catch {
  throw new Error(
    `The API returned an empty or invalid response (HTTP ${response.status}). Check that the API endpoint is running.`
  );
}

if (!response.ok) {
  throw new Error(
    data.error || `API request failed (HTTP ${response.status}).`
  );
}

setAnalysis(data.analysis || 'No analysis was returned.');

    } catch (error) {
      setAnalysisError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while analysing the brief.'
      );
    } finally {
      setIsAnalysing(false);
    }
  };

  return (

  <div className="min-h-screen bg-slate-100 p-6 lg:p-10">
    <button onClick={back} className="mb-5 text-sm font-semibold text-blue-600">← Back to projects</button>
    <div className="mx-auto max-w-7xl rounded-3xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-blue-600">Project Workspace</p><h2 className="mt-1 text-3xl font-semibold">{project.name}</h2><p className="mt-2 text-slate-600">{project.description}</p>
      
<div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h3 className="font-semibold text-slate-900">Project Brief Analysis</h3>
      <p className="mt-1 text-sm text-slate-600">
        Analyse your brief to generate structured BA insights.
      </p>
    </div>

    <button
      type="button"
      onClick={analyseBrief}
      disabled={isAnalysing}
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isAnalysing ? 'Analysing brief...' : 'Analyse Project Brief'}
    </button>
    
{isAnalysing && (
  <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
    <div className="flex items-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

      <p className="font-semibold text-blue-900">
        Odi is analysing your project brief...
      </p>
    </div>

    <p className="mt-2 text-sm text-blue-800">
      Please wait while Odi reviews your brief and identifies
      key business analysis considerations. This may take a few moments.
    </p>
  </div>
)}

  </div>

  {analysisError && (
    <p className="mt-3 text-sm text-red-600" role="alert">
      {analysisError}
    </p>
  )}

  {analysis && (
    <div className="mt-4 whitespace-pre-wrap rounded-lg border bg-white p-4 text-sm leading-6 text-slate-700">
      


<div className="space-y-6">
  {(() => {
    const lines = analysis
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n');

    const sections: { heading: string; content: string[] }[] = [];
    let current = {
      heading: 'Project Analysis',
      content: [] as string[],
    };

    const clean = (text: string) =>
      text
        .replace(/^#{1,6}\s*/, '')
        .replace(/\*\*/g, '')
        .trim();

    for (const line of lines) {
      const trimmed = line.trim();
      const headingMatch = trimmed.match(/^#{1,6}\s+(.+)$/);

      if (headingMatch) {
        if (
          current.content.length ||
          current.heading !== 'Project Analysis'
        ) {
          sections.push(current);
        }

        current = {
          heading: clean(headingMatch[1]).replace(/^\d+\.\s*/, ''),
          content: [],
        };
        continue;
      }

      if (
        trimmed &&
        clean(trimmed).replace(/^\d+\.\s*/, '').toLowerCase() ===
          current.heading.toLowerCase()
      ) {
        continue;
      }

      if (/^\s*\|(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(trimmed)) {
        continue;
      }

      current.content.push(line);
    }

    sections.push(current);

    return sections
      .filter(section => section.content.join('').trim())
      .map((section, sectionIndex) => {
        const blocks: string[][] = [];
        let block: string[] = [];

        for (const line of section.content) {
          const trimmed = line.trim();
          const isTable = trimmed.startsWith('|') && trimmed.endsWith('|');
          const previousIsTable =
            block.length > 0 &&
            block[block.length - 1].trim().startsWith('|') &&
            block[block.length - 1].trim().endsWith('|');

          if (
            block.length &&
            trimmed === ''
          ) {
            blocks.push(block);
            block = [];
            continue;
          }

          if (block.length && isTable !== previousIsTable) {
            blocks.push(block);
            block = [];
          }

          if (trimmed) block.push(line);
        }

        if (block.length) blocks.push(block);

        return (
          <section
            key={sectionIndex}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            {section.heading !== 'Project Analysis' && (
              <h3 className="mb-4 text-base font-semibold text-slate-900">
                {section.heading}
              </h3>
            )}

            <div className="space-y-4 text-sm leading-7 text-slate-700">
              {blocks.map((rows, blockIndex) => {
                const first = rows[0].trim();

                if (first.startsWith('|') && first.endsWith('|')) {
                  const tableRows = rows
                    .map(row =>
                      row.trim().replace(/^\|/, '').replace(/\|$/, '')
                        .split('|').map(cell => clean(cell))
                    )
                    .filter(row =>
                      !row.every(cell => /^:?-{3,}:?$/.test(cell))
                    );

                  if (!tableRows.length) return null;

                  return (
                    <div key={blockIndex} className="overflow-x-auto rounded-lg border border-slate-200">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead className="bg-slate-50">
                          <tr>
                            {tableRows[0].map((cell, i) => (
                              <th key={i} className="border-b px-3 py-2 font-semibold text-slate-900">
                                {cell}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows.slice(1).map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => (
                                <td key={j} className="border-b border-slate-100 px-3 py-2 align-top">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                const isList = rows.every(row =>
                  /^\s*(?:[-*•]\s+|\d+[.)]\s+)/.test(row)
                );

                if (isList) {
                  const numbered = /^\s*\d+[.)]\s+/.test(first);
                  const List = numbered ? 'ol' : 'ul';

                  return (
                    <List key={blockIndex} className={`${numbered ? 'list-decimal' : 'list-disc'} space-y-1 pl-6`}>
                      {rows.map((row, i) => (
                        <li key={i}>
                          {clean(row).replace(/^(?:[-*•]|\d+[.)])\s*/, '')}
                        </li>
                      ))}
                    </List>
                  );
                }

                return (
                  <p key={blockIndex} className="whitespace-pre-wrap">
                    {rows.map(clean).join('\n')}
                  </p>
                );
              })}
            </div>
          </section>
        );
      });
  })()}
</div>


    </div>
  )}
</div>

      <div className="mt-7 flex gap-1 overflow-x-auto border-b">{tabs.map(t => <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold ${tab===t?'border-blue-600 text-blue-600':'border-transparent text-slate-500'}`}>{t}</button>)}</div>
      {tab==='Overview' && <Overview/>}{tab==='Stakeholders' && <Stakeholders/>}{tab==='Process' && <Process/>}{tab==='Requirements' && <Requirements/>}
      {['Rules','Gaps','Documents'].includes(tab) && <Panel title={tab}/>}
    </div>
  </div>
  );
}

function Overview() { return <div className="mt-6">
  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><div className="flex gap-3"><Sparkles className="h-5 w-5 text-blue-600"/><div><h3 className="font-semibold">Here's what I understand about this project</h3><p className="mt-1 text-sm leading-6 text-slate-600">Odi has interpreted the project context. The BA can edit, challenge or confirm each item before using it downstream.</p></div></div></div>
  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[
    ['Business Problem','Customers are waiting too long for documentation to be processed.'],['Objectives','Reduce processing time, improve transparency and maintain compliance.'],['Scope','Mortgage documentation processing for new and existing customers.'],['Drivers','Customer satisfaction, operational efficiency and regulatory expectations.'],['Expected Outcomes','Faster processing, fewer manual interventions and clearer status visibility.'],['Key Stakeholders','Customers, Operations, Technology, Compliance, Risk and Legal.']
  ].map(([a,b])=><div key={a} className="rounded-2xl border p-5"><div className="text-sm font-semibold text-blue-600">{a}</div><p className="mt-2 text-sm leading-6 text-slate-600">{b}</p></div>)}</div>
  <div className="mt-5 rounded-2xl border p-5"><h3 className="font-semibold">Recommended BA Techniques</h3><div className="mt-4 flex flex-wrap gap-2">{['Stakeholder interviews','Process mapping','Document analysis','Requirements workshop'].map(x=><span key={x} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium">{x}</span>)}</div></div>
</div>; }

function Stakeholders() { const rows=[['Operations','Process Owner','High','High','Workshop'],['Compliance','Control','High','High','Review workshop'],['Technology','Delivery','High','High','Technical workshop'],['Customer','End User','High','Medium','Research & feedback']]; return <div className="mt-6 overflow-x-auto rounded-2xl border"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{['Stakeholder','Role','Interest','Influence','Engagement'].map(h=><th key={h} className="px-5 py-4">{h}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r[0]} className="border-t">{r.map((c,i)=><td key={i} className="px-5 py-4">{i>1&&i<4?<span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{c}</span>:c}</td>)}</tr>)}</tbody></table></div>; }

function Process() { return <div className="mt-6"><h3 className="font-semibold">As-Is Process</h3><p className="mt-1 text-sm text-slate-500">Odi maps the process from available project evidence.</p><div className="mt-5 flex flex-col gap-3 rounded-2xl border bg-slate-50 p-6 md:flex-row md:items-center">{['Submit documents','Receive & validate','Compliance check','Review & decision','Notify customer'].map((x,i)=><div key={x} className="flex flex-1 items-center gap-3"><div className="flex-1 rounded-xl border bg-white p-4 text-sm font-semibold">{x}</div>{i<4&&<ArrowRight className="hidden h-5 w-5 md:block"/>}</div>)}</div></div>; }

function Requirements() { return <div className="mt-6"><div className="flex items-center justify-between"><div><h3 className="font-semibold">Requirements</h3><p className="mt-1 text-sm text-slate-500">Structured requirements ready for refinement and traceability.</p></div><button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"><Plus className="mr-1 inline h-4 w-4"/>Add Requirement</button></div><div className="mt-5 overflow-x-auto rounded-2xl border"><table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{['ID','Requirement','Type','Priority'].map(h=><th key={h} className="px-5 py-4">{h}</th>)}</tr></thead><tbody>{[['REQ-001','The system shall allow digital submission of mortgage documents.','Functional','High'],['REQ-002','The system shall validate required documents automatically.','Functional','High'],['REQ-003','Customers shall receive real-time processing status.','Functional','Medium'],['REQ-004','Processing time should reduce to one working day.','Business','High']].map(r=><tr key={r[0]} className="border-t">{r.map((c,i)=><td key={i} className="px-5 py-4">{i===0?<b className="text-blue-600">{c}</b>:c}</td>)}</tr>)}</tbody></table></div></div>; }

function Panel({title}:{title:string}) { return <div className="mt-6 rounded-2xl border bg-slate-50 p-8"><BarChart3 className="h-7 w-7 text-blue-600"/><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">This module will connect to the same project context so Odi can generate and maintain professional BA outputs.</p></div>; }

function LightbulbIcon(){ return <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white"><CheckCircle2 className="h-5 w-5"/></div>; }
