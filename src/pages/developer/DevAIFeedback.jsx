import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { Cpu, TrendingUp, AlertTriangle, Shield, Lightbulb, BarChart3, GitCommit, FileWarning } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/* ── Alignment Breakdown ── */
const alignmentData = [
    { metric: 'Keyword Match', value: 87, color: '#3b82f6' },
    { metric: 'File Path Relevance', value: 79, color: '#8b5cf6' },
    { metric: 'Semantic Similarity', value: 83, color: '#06b6d4' },
    { metric: 'Scope Drift', value: 14, color: '#ef4444', invert: true },
];

/* ── Code Quality Insights ── */
const qualityInsights = [
    {
        title: 'Commit Frequency Pattern',
        desc: 'Averaging 4.2 commits/day. Pattern indicates steady progress with occasional bursts on Fridays.',
        type: 'info', icon: <GitCommit size={16} />
    },
    {
        title: 'Large Diff Warning',
        desc: 'PR #345 has 580+ additions. Consider splitting into smaller PRs for easier review.',
        type: 'warning', icon: <FileWarning size={16} />
    },
    {
        title: 'Tiny Fake Commit Detection',
        desc: 'No suspicious micro-commits detected. All commits have meaningful changes (avg 42 lines).',
        type: 'success', icon: <Shield size={16} />
    },
    {
        title: 'Repeated Minor Changes Flag',
        desc: '3 commits to config.yaml in the last 2 days with minimal changes. Consider batching config updates.',
        type: 'warning', icon: <AlertTriangle size={16} />
    },
];

/* ── AI Suggestions ── */
const suggestions = [
    { text: 'Consider splitting PR #345 into smaller units for faster review cycles.', priority: 'High' },
    { text: 'Avoid modifying unrelated UI files in backend-focused branches.', priority: 'High' },
    { text: 'Add unit tests for payment service — current coverage is 72%, target is 85%.', priority: 'Medium' },
    { text: 'Externalize retry backoff configuration instead of hardcoding values.', priority: 'Low' },
    { text: 'Consider adding Redis fallback strategy for rate limiting middleware.', priority: 'Medium' },
    { text: 'Database migration scripts should always include a rollback plan.', priority: 'High' },
];

/* ── Commit Frequency Data ── */
const commitFrequency = [
    { day: 'Mon', commits: 5 }, { day: 'Tue', commits: 3 }, { day: 'Wed', commits: 4 },
    { day: 'Thu', commits: 6 }, { day: 'Fri', commits: 8 }, { day: 'Sat', commits: 1 }, { day: 'Sun', commits: 0 },
];

const getColor = (v) => v >= 80 ? '#10b981' : v >= 60 ? '#f59e0b' : '#ef4444';
const getDriftColor = (v) => v <= 10 ? '#10b981' : v <= 20 ? '#f59e0b' : '#ef4444';
const typeConfig = {
    success: { bg: 'var(--success-bg)', border: 'var(--success)', color: '#065f46' },
    warning: { bg: 'var(--warning-bg)', border: 'var(--warning)', color: '#92400e' },
    danger: { bg: 'var(--danger-bg)', border: 'var(--danger)', color: '#991b1b' },
    info: { bg: 'var(--info-bg)', border: 'var(--info)', color: '#1e40af' },
};
const priorityColors = { High: '#ef4444', Medium: '#f59e0b', Low: '#10b981' };

export default function DevAIFeedback() {
    const overallAlignment = Math.round(alignmentData.filter(d => !d.invert).reduce((a, d) => a + d.value, 0) / alignmentData.filter(d => !d.invert).length);

    return (
        <div>
            <div className="stats-grid mb-lg">
                <StatsCard icon={<Cpu size={24} />} value={`${overallAlignment}%`} label="Overall Alignment" color="green" delay={0} />
                <StatsCard icon={<TrendingUp size={24} />} value="4.2" label="Commits/Day Avg" color="blue" delay={0.08} />
                <StatsCard icon={<AlertTriangle size={24} />} value={`${alignmentData.find(d => d.invert).value}%`} label="Scope Drift" color="red" delay={0.16} />
                <StatsCard icon={<Lightbulb size={24} />} value={suggestions.length} label="AI Suggestions" color="orange" delay={0.24} />
            </div>

            {/* Alignment Breakdown */}
            <div className="grid-2 mb-lg">
                <AnimatedCard delay={0.3}>
                    <div className="card-header">
                        <span className="card-title">Alignment Breakdown</span>
                        <span className="badge badge-info">AI</span>
                    </div>
                    <div className="card-body">
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={alignmentData} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                                    <YAxis type="category" dataKey="metric" tick={{ fontSize: 11 }} width={120} />
                                    <Tooltip formatter={(v, n, p) => [`${v}%`, p.payload.metric]} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                        {alignmentData.map((d, i) => (
                                            <Cell key={i} fill={d.invert ? getDriftColor(d.value) : getColor(d.value)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Detail bars below chart */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                            {alignmentData.map((d, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', width: 130, flexShrink: 0 }}>{d.metric}</span>
                                    <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#e5e7eb' }}>
                                        <div style={{
                                            height: '100%', borderRadius: 4, width: `${d.value}%`,
                                            background: d.invert ? getDriftColor(d.value) : getColor(d.value),
                                            transition: 'width 0.8s ease'
                                        }} />
                                    </div>
                                    <span style={{
                                        fontWeight: 700, fontSize: '0.82rem', width: 40, textAlign: 'right',
                                        color: d.invert ? getDriftColor(d.value) : getColor(d.value)
                                    }}>{d.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedCard>

                {/* Commit Frequency */}
                <AnimatedCard delay={0.38}>
                    <div className="card-header">
                        <span className="card-title">Commit Frequency</span>
                        <span className="badge badge-neutral">This Week</span>
                    </div>
                    <div className="card-body">
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={commitFrequency}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Bar dataKey="commits" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Commits">
                                        {commitFrequency.map((d, i) => (
                                            <Cell key={i} fill={d.commits >= 6 ? '#10b981' : d.commits >= 3 ? '#3b82f6' : '#f59e0b'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </AnimatedCard>
            </div>

            {/* Code Quality Insights */}
            <AnimatedCard delay={0.46}>
                <div className="card-header">
                    <span className="card-title">Code Quality Insights</span>
                    <span className="badge badge-info"><Cpu size={10} style={{ display: 'inline', marginRight: 4 }} />AI Powered</span>
                </div>
                <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {qualityInsights.map((qi, i) => {
                        const cfg = typeConfig[qi.type];
                        return (
                            <div key={i} style={{
                                padding: '14px 18px', borderRadius: 'var(--radius-sm)',
                                background: cfg.bg, borderLeft: `3px solid ${cfg.border}`,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <span style={{ color: cfg.border }}>{qi.icon}</span>
                                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: cfg.color }}>{qi.title}</span>
                                </div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{qi.desc}</div>
                            </div>
                        );
                    })}
                </div>
            </AnimatedCard>

            {/* AI Suggestions */}
            <AnimatedCard delay={0.54} style={{ marginTop: 16 }}>
                <div className="card-header">
                    <span className="card-title">AI Suggestions</span>
                    <span className="badge badge-warning">{suggestions.length} suggestions</span>
                </div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {suggestions.map((s, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 12,
                            padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                            background: '#f5f3ff', border: '1px solid #e9d5ff',
                        }}>
                            <Lightbulb size={16} style={{ color: '#7c3aed', flexShrink: 0, marginTop: 2 }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.85rem', color: '#4c1d95', lineHeight: 1.5 }}>{s.text}</div>
                            </div>
                            <span style={{
                                padding: '2px 8px', borderRadius: 10, fontSize: '0.68rem', fontWeight: 700,
                                background: priorityColors[s.priority] + '20', color: priorityColors[s.priority],
                                flexShrink: 0
                            }}>{s.priority}</span>
                        </div>
                    ))}
                </div>
            </AnimatedCard>
        </div>
    );
}
