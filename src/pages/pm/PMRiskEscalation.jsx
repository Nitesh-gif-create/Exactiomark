import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { AlertTriangle, Clock, Cpu, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const escalationTimeline = [
    { time: 'Feb 20, 2026 10:30', event: 'Sprint Delta — deployment failure escalated', who: 'Ananya Reddy', status: 'Open', severity: 'High' },
    { time: 'Feb 19, 2026 15:00', event: 'Design spec mismatch — Dashboard UI', who: 'Rahul Verma', status: 'In Progress', severity: 'Medium' },
    { time: 'Feb 18, 2026 09:15', event: 'CI/CD pipeline broken for 4 hours', who: 'Ananya Reddy', status: 'Resolved', severity: 'High' },
    { time: 'Feb 17, 2026 14:45', event: 'Dependency conflict in Auth module', who: 'Vikram Singh', status: 'Resolved', severity: 'Low' },
    { time: 'Feb 16, 2026 11:00', event: 'Scope creep in Sprint Beta', who: 'Sneha Iyer', status: 'Resolved', severity: 'Medium' },
];

const delayDistribution = [
    { range: '0-2h', count: 8 },
    { range: '2-6h', count: 5 },
    { range: '6-12h', count: 3 },
    { range: '12-24h', count: 2 },
    { range: '24h+', count: 1 },
];

const highRiskMembers = [
    { name: 'Ananya Reddy', escalations: 3, avgDelay: '8.5h', risk: 'High' },
    { name: 'Karan Joshi', escalations: 2, avgDelay: '14h', risk: 'High' },
    { name: 'Rahul Verma', escalations: 1, avgDelay: '6h', risk: 'Medium' },
];

const sevColors = { High: '#ef4444', Medium: '#f59e0b', Low: '#10b981' };
const statusColors = { Open: '#ef4444', 'In Progress': '#f59e0b', Resolved: '#10b981' };

export default function PMRiskEscalation() {
    return (
        <div>
            <div className="stats-grid mb-lg">
                <StatsCard icon={<AlertTriangle size={24} />} value={escalationTimeline.filter(e => e.status !== 'Resolved').length} label="Active Escalations" color="red" delay={0} />
                <StatsCard icon={<Clock size={24} />} value="6.2h" label="Avg Resolution Time" color="orange" delay={0.08} />
                <StatsCard icon={<Users size={24} />} value={highRiskMembers.length} label="High Risk Members" color="purple" delay={0.16} />
                <StatsCard icon={<TrendingUp size={24} />} value="72%" label="Resolution Rate" trend="+8%" trendDir="up" color="green" delay={0.24} />
            </div>

            {/* Escalation Timeline */}
            <AnimatedCard delay={0.3}>
                <div className="card-header">
                    <span className="card-title">Escalation Timeline</span>
                </div>
                <div className="card-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {escalationTimeline.map((e, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px',
                                background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)',
                                borderLeft: `4px solid ${sevColors[e.severity]}`
                            }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColors[e.status], flexShrink: 0 }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{e.event}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 2 }}>by {e.who} · {e.time}</div>
                                </div>
                                <span className="badge" style={{ background: statusColors[e.status], color: '#fff' }}>{e.status}</span>
                                <span className="badge" style={{ background: `${sevColors[e.severity]}20`, color: sevColors[e.severity] }}>{e.severity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedCard>

            <div className="grid-2" style={{ marginTop: 20 }}>
                {/* Delay Distribution */}
                <AnimatedCard delay={0.38}>
                    <div className="card-header"><span className="card-title">Delay Distribution</span></div>
                    <div className="card-body">
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={delayDistribution}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </AnimatedCard>

                {/* High-Risk Members */}
                <AnimatedCard delay={0.46}>
                    <div className="card-header"><span className="card-title">High-Risk Members</span></div>
                    <div className="card-body" style={{ padding: 0 }}>
                        <div className="table-wrapper">
                            <table className="table">
                                <thead><tr><th>Member</th><th>Escalations</th><th>Avg Delay</th><th>Risk</th></tr></thead>
                                <tbody>
                                    {highRiskMembers.map(m => (
                                        <tr key={m.name}>
                                            <td style={{ fontWeight: 600 }}>{m.name}</td>
                                            <td style={{ fontWeight: 700, color: m.escalations > 2 ? '#ef4444' : '#f59e0b' }}>{m.escalations}</td>
                                            <td style={{ fontWeight: 600 }}>{m.avgDelay}</td>
                                            <td><span className="badge" style={{ background: sevColors[m.risk], color: '#fff' }}>{m.risk}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </AnimatedCard>
            </div>

            {/* Root Cause AI Summary */}
            <AnimatedCard delay={0.54} style={{ marginTop: 20 }}>
                <div className="card-header">
                    <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Cpu size={16} style={{ color: '#8b5cf6' }} /> Root Cause AI Summary
                    </span>
                </div>
                <div className="card-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { text: '62% of escalations originated from DevOps pipeline failures. Consider infrastructure review.', type: 'danger' },
                            { text: 'Scope creep contributed to 25% of delays. Tighter sprint scoping recommended.', type: 'warning' },
                            { text: 'Ananya Reddy involved in 3 of 5 escalations — workload redistribution needed.', type: 'danger' },
                            { text: 'Resolution time improved 15% compared to last month after process changes.', type: 'success' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                                background: item.type === 'success' ? '#f0fdf4' : item.type === 'warning' ? '#fffbeb' : '#fef2f2',
                                border: `1px solid ${item.type === 'success' ? '#bbf7d0' : item.type === 'warning' ? '#fde68a' : '#fecaca'}`,
                                fontSize: '0.85rem', lineHeight: 1.5,
                                color: item.type === 'success' ? '#166534' : item.type === 'warning' ? '#92400e' : '#991b1b'
                            }}>
                                {item.type === 'success' ? '✅' : item.type === 'warning' ? '⚠️' : '🔴'} {item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedCard>
        </div>
    );
}
