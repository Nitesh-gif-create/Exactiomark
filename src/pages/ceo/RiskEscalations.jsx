import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { AlertTriangle, Shield, Clock, TrendingUp, AlertCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

/* ── Active Risks ── */
const activeRisks = [
    { storyId: 'US-104', riskType: 'Delay', riskLevel: 'High', responsible: 'Ananya R.', desc: 'SSO provider API not responding' },
    { storyId: 'US-109', riskType: 'DevOps Failure', riskLevel: 'Critical', responsible: 'Ananya R.', desc: 'Staging infra not provisioned' },
    { storyId: 'US-106', riskType: 'Scope Drift', riskLevel: 'Medium', responsible: 'Sneha I.', desc: 'MFA design spec changed mid-sprint' },
    { storyId: 'US-110', riskType: 'Delay', riskLevel: 'Low', responsible: 'Sneha I.', desc: 'Test suite blocked on US-109 completion' },
];

/* ── Escalation Timeline ── */
const timeline = [
    { id: 1, time: 'Feb 18, 10:32 AM', event: 'Escalation triggered', detail: 'CI/CD pipeline staging build failures exceeded threshold', notified: 'Arjun Patel (PM)', resolution: 'Pending', severity: 'Critical' },
    { id: 2, time: 'Feb 17, 3:15 PM', event: 'Escalation triggered', detail: 'SSO provider config blocked for 48+ hours', notified: 'Rajesh Mehta (CEO)', resolution: '6 hrs', severity: 'High' },
    { id: 3, time: 'Feb 15, 11:00 AM', event: 'Escalation triggered', detail: 'Review bottleneck – 3 PRs pending > 24h', notified: 'Sneha Iyer (Lead)', resolution: '2 hrs', severity: 'Medium' },
    { id: 4, time: 'Feb 14, 9:45 AM', event: 'Escalation resolved', detail: 'Backend API latency spike – fixed by scaling', notified: 'Arjun Patel (PM)', resolution: '4 hrs', severity: 'High' },
];

/* ── Risk Patterns ── */
const patterns = [
    { title: 'Repeated Backend Delay', occurrences: 4, sprints: 'Last 3 sprints', impact: 'Avg 1.5 day delay per sprint', recommendation: 'Consider dedicated backend DevOps support or pre-provisioned staging environments.', color: '#ef4444' },
    { title: 'Review Bottleneck Detection', occurrences: 6, sprints: 'Last 4 sprints', impact: 'Avg 18 hrs approval delay', recommendation: 'Introduce auto-assign reviewers and set SLA of 4 hrs for code reviews.', color: '#f59e0b' },
    { title: 'Scope Drift in Design Stories', occurrences: 3, sprints: 'Last 2 sprints', impact: '12% spillover increase', recommendation: 'Lock acceptance criteria before sprint start. Add design review checkpoint.', color: '#8b5cf6' },
];

const riskLevelColors = { Critical: '#ef4444', High: '#f59e0b', Medium: '#3b82f6', Low: '#10b981' };

export default function RiskEscalations() {
    return (
        <div>
            {/* KPI Row */}
            <div className="stats-grid mb-lg">
                <StatsCard icon={<AlertTriangle size={24} />} value="4" label="Active Risks" trend="2 critical" trendDir="up" color="red" delay={0} />
                <StatsCard icon={<Shield size={24} />} value="3" label="Open Escalations" trend="1 pending" trendDir="up" color="orange" delay={0.08} />
                <StatsCard icon={<Clock size={24} />} value="4.0 hrs" label="Avg Resolution Time" trend="-1.2 hrs" trendDir="down" color="blue" delay={0.16} />
                <StatsCard icon={<TrendingUp size={24} />} value="3" label="Patterns Detected" trend="AI analyzed" trendDir="up" color="purple" delay={0.24} />
            </div>

            {/* Active Risks Table */}
            <AnimatedCard delay={0.3}>
                <div className="card-header">
                    <span className="card-title">Active Risks</span>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Story ID</th>
                                    <th>Risk Type</th>
                                    <th>Risk Level</th>
                                    <th>Responsible</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeRisks.map(r => (
                                    <tr key={r.storyId}>
                                        <td style={{ fontWeight: 700, color: '#3b82f6' }}>{r.storyId}</td>
                                        <td><span className="badge badge-info">{r.riskType}</span></td>
                                        <td><span className="badge" style={{ background: riskLevelColors[r.riskLevel], color: '#fff' }}>{r.riskLevel}</span></td>
                                        <td style={{ fontWeight: 500 }}>{r.responsible}</td>
                                        <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{r.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AnimatedCard>

            {/* Escalation Timeline */}
            <AnimatedCard delay={0.38} style={{ marginTop: 20 }}>
                <div className="card-header">
                    <span className="card-title">Escalation Timeline</span>
                </div>
                <div className="card-body">
                    <div style={{ position: 'relative', paddingLeft: 32 }}>
                        <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 2, background: 'var(--border-color)' }} />
                        {timeline.map((t, i) => (
                            <div key={t.id} style={{ position: 'relative', paddingBottom: i < timeline.length - 1 ? 28 : 0 }}>
                                <div style={{ position: 'absolute', left: -27, top: 4, width: 14, height: 14, borderRadius: '50%', background: t.resolution === 'Pending' ? '#ef4444' : '#10b981', border: '3px solid #fff', boxShadow: '0 0 0 2px var(--border-color)' }} />
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>{t.time}</div>
                                <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {t.event}
                                    <span className="badge" style={{ background: riskLevelColors[t.severity], color: '#fff', fontSize: '0.65rem' }}>{t.severity}</span>
                                </div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 6 }}>{t.detail}</div>
                                <div style={{ display: 'flex', gap: 16, fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                                    <span>Notified: <strong style={{ color: 'var(--text-primary)' }}>{t.notified}</strong></span>
                                    <span>Resolution: <strong style={{ color: t.resolution === 'Pending' ? '#ef4444' : '#10b981' }}>{t.resolution}</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedCard>

            {/* Risk Pattern Analysis */}
            <AnimatedCard delay={0.46} style={{ marginTop: 20 }}>
                <div className="card-header">
                    <span className="card-title">Risk Pattern Analysis</span>
                    <span className="badge badge-info">AI Detected</span>
                </div>
                <div className="card-body">
                    <div style={{ display: 'grid', gap: 16 }}>
                        {patterns.map((p, i) => (
                            <div key={i} style={{ padding: '18px 22px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${p.color}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{p.title}</span>
                                    <span className="badge" style={{ background: `${p.color}20`, color: p.color, fontWeight: 600 }}>{p.occurrences} occurrences</span>
                                </div>
                                <div style={{ display: 'flex', gap: 24, fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 10 }}>
                                    <span>Across: <strong>{p.sprints}</strong></span>
                                    <span>Impact: <strong>{p.impact}</strong></span>
                                </div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', padding: '10px 14px', background: '#fff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                                    <strong>💡 Recommendation:</strong> {p.recommendation}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedCard>
        </div>
    );
}
