import { useState } from 'react';
import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { FileText, Download, BarChart2, Shield, Activity, AlertTriangle } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
    PieChart, Pie, Legend
} from 'recharts';

const reports = [
    {
        id: 1, name: 'CI Stability Report', icon: <BarChart2 size={16} />, color: '#3b82f6', category: 'CI/CD',
        description: 'Pipeline success rates, failure trends, flaky build detection, and average build times across all pipelines.',
        lastGenerated: 'Feb 20, 2026', data: [
            { label: 'Total Runs', value: '184' }, { label: 'Success Rate', value: '87%' },
            { label: 'Flaky Builds', value: '2' }, { label: 'Avg Build Time', value: '3.2m' },
        ]
    },
    {
        id: 2, name: 'Deployment Success Report', icon: <Activity size={16} />, color: '#10b981', category: 'Deployments',
        description: 'Deployment frequency, rollback rates, failed deployment analysis, and MTTR for the current sprint.',
        lastGenerated: 'Feb 20, 2026', data: [
            { label: 'Total Deployments', value: '21' }, { label: 'Success Rate', value: '85%' },
            { label: 'Rollbacks', value: '3' }, { label: 'MTTR', value: '1h 45m' },
        ]
    },
    {
        id: 3, name: 'Infra Change Risk Report', icon: <Shield size={16} />, color: '#8b5cf6', category: 'Infrastructure',
        description: 'Infrastructure change audit including risk levels, unauthorized changes, drift detection, and compliance status.',
        lastGenerated: 'Feb 19, 2026', data: [
            { label: 'Total Changes', value: '8' }, { label: 'High Risk', value: '3' },
            { label: 'Unauthorized', value: '2' }, { label: 'Drift Detected', value: '1' },
        ]
    },
    {
        id: 4, name: 'Incident Analysis Report', icon: <AlertTriangle size={16} />, color: '#ef4444', category: 'Incidents',
        description: 'Incident breakdown by severity, MTTD/MTTR analysis, repeat incident patterns, and root cause summaries.',
        lastGenerated: 'Feb 20, 2026', data: [
            { label: 'Total Incidents', value: '5' }, { label: 'Critical', value: '2' },
            { label: 'Avg MTTR', value: '102m' }, { label: 'Repeat', value: '2' },
        ]
    },
    {
        id: 5, name: 'SLA Compliance Report', icon: <FileText size={16} />, color: '#f59e0b', category: 'Compliance',
        description: 'Service level agreement compliance across all monitored services. Includes uptime history and breach analysis.',
        lastGenerated: 'Feb 20, 2026', data: [
            { label: 'Services Monitored', value: '6' }, { label: 'Avg Uptime', value: '99.94%' },
            { label: 'SLA Breaches', value: '2' }, { label: 'At Risk', value: '1' },
        ]
    },
];

const incidentBySeverity = [
    { name: 'Critical', value: 2, color: '#ef4444' }, { name: 'High', value: 2, color: '#f97316' },
    { name: 'Medium', value: 1, color: '#f59e0b' },
];

const pipelineSuccess = [
    { name: 'alpha-BE CI', rate: 92 }, { name: 'gamma-FE CI', rate: 96 }, { name: 'beta-svc CD', rate: 68 },
    { name: 'infra-TF', rate: 98 }, { name: 'alpha-BE CD', rate: 88 }, { name: 'monitor', rate: 72 },
];

export default function DevOpsReports() {
    const [exporting, setExporting] = useState(null);

    const handleExport = (id, name) => {
        setExporting(id);
        setTimeout(() => setExporting(null), 1500);
    };

    return (
        <div>
            <div className="stats-grid mb-lg">
                <StatsCard icon={<FileText size={24} />} value={reports.length} label="Available Reports" color="blue" delay={0} />
                <StatsCard icon={<Download size={24} />} value="5" label="Export Formats" color="green" delay={0.08} />
                <StatsCard icon={<BarChart2 size={24} />} value="Sprint 12" label="Current Period" color="orange" delay={0.16} />
                <StatsCard icon={<Activity size={24} />} value="Auto" label="Generation" trend="Daily" trendDir="up" color="green" delay={0.24} />
            </div>

            {/* Report Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16, marginBottom: 16 }}>
                {reports.map((r, idx) => (
                    <AnimatedCard key={r.id} delay={0.3 + idx * 0.08}>
                        <div className="card-header" style={{ borderBottom: `2px solid ${r.color}20` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: `${r.color}15`, color: r.color
                                }}>{r.icon}</div>
                                <div>
                                    <span className="card-title" style={{ fontSize: '0.9rem' }}>{r.name}</span>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{r.category}</div>
                                </div>
                            </div>
                            <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>{r.lastGenerated}</span>
                        </div>
                        <div className="card-body">
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>{r.description}</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                                {r.data.map((d, i) => (
                                    <div key={i} style={{
                                        padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-page)',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                    }}>
                                        <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{d.label}</span>
                                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: r.color }}>{d.value}</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => handleExport(r.id, r.name)}
                                style={{
                                    width: '100%', padding: '8px 16px', borderRadius: 'var(--radius-sm)', background: r.color,
                                    color: '#fff', border: 'none', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                    opacity: exporting === r.id ? 0.6 : 1, transition: 'all 0.15s ease'
                                }}>
                                <Download size={14} /> {exporting === r.id ? 'Exporting...' : 'Export Report'}
                            </button>
                        </div>
                    </AnimatedCard>
                ))}
            </div>

            {/* Summary Charts */}
            <div className="grid-2">
                <AnimatedCard delay={0.7}>
                    <div className="card-header"><span className="card-title">Incidents by Severity</span></div>
                    <div className="card-body">
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={incidentBySeverity} cx="50%" cy="50%" outerRadius={75} innerRadius={40}
                                        dataKey="value" nameKey="name" label={({ name, value }) => `${name}: ${value}`}
                                        labelLine={{ strokeWidth: 1 }}>
                                        {incidentBySeverity.map((d, i) => (
                                            <Cell key={i} fill={d.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </AnimatedCard>

                <AnimatedCard delay={0.78}>
                    <div className="card-header"><span className="card-title">Pipeline Success Rates</span></div>
                    <div className="card-body">
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={pipelineSuccess}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(v) => `${v}%`} />
                                    <Bar dataKey="rate" radius={[4, 4, 0, 0]} name="Success %">
                                        {pipelineSuccess.map((d, i) => (
                                            <Cell key={i} fill={d.rate >= 90 ? '#10b981' : d.rate >= 75 ? '#f59e0b' : '#ef4444'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </AnimatedCard>
            </div>
        </div>
    );
}
