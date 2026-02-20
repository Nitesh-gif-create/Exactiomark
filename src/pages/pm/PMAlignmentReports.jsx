import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { Cpu, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell
} from 'recharts';

const companyAlignment = 82.3;
const projectAlignment = [
    { project: 'Sprint Alpha', avg: 88 },
    { project: 'Sprint Beta', avg: 79 },
    { project: 'Sprint Gamma', avg: 75 },
    { project: 'Sprint Delta', avg: 84 },
];

const memberAlignment = [
    { name: 'Vikram Singh', alignment: 91, deviation: 3 },
    { name: 'Sneha Iyer', alignment: 87, deviation: 5 },
    { name: 'Meera Nair', alignment: 83, deviation: 7 },
    { name: 'Arjun Patel', alignment: 85, deviation: 4 },
    { name: 'Ananya Reddy', alignment: 78, deviation: 12 },
    { name: 'Rahul Verma', alignment: 70, deviation: 18 },
    { name: 'Karan Joshi', alignment: 65, deviation: 22 },
];

const alignmentTrend = [
    { sprint: 'S1', alignment: 76 }, { sprint: 'S2', alignment: 79 }, { sprint: 'S3', alignment: 80 },
    { sprint: 'S4', alignment: 81 }, { sprint: 'S5', alignment: 83 }, { sprint: 'S6', alignment: 82 },
];

const riskDistribution = [
    { name: 'High Risk', value: 3, color: '#ef4444' },
    { name: 'Moderate', value: 4, color: '#f59e0b' },
    { name: 'Healthy', value: 8, color: '#10b981' },
];

const scopeDrift = [
    { sprint: 'S1', drift: 12 }, { sprint: 'S2', drift: 8 }, { sprint: 'S3', drift: 15 },
    { sprint: 'S4', drift: 10 }, { sprint: 'S5', drift: 7 }, { sprint: 'S6', drift: 9 },
];

const getColor = (v) => v >= 80 ? '#10b981' : v >= 60 ? '#f59e0b' : '#ef4444';

export default function PMAlignmentReports() {
    return (
        <div>
            <div className="stats-grid mb-lg">
                <StatsCard icon={<Cpu size={24} />} value={`${companyAlignment}%`} label="Company Alignment" trend="+1.8%" trendDir="up" color="purple" delay={0} />
                <StatsCard icon={<TrendingUp size={24} />} value="85.2%" label="Project Alignment" trend="+2.4%" trendDir="up" color="blue" delay={0.08} />
                <StatsCard icon={<AlertTriangle size={24} />} value={memberAlignment.filter(m => m.deviation > 15).length} label="High Deviation" color="red" delay={0.16} />
                <StatsCard icon={<BarChart3 size={24} />} value="9.8%" label="Avg Scope Drift" color="orange" delay={0.24} />
            </div>

            {/* Member Alignment Breakdown */}
            <AnimatedCard delay={0.3}>
                <div className="card-header">
                    <span className="card-title">🔹 Member-wise Alignment Breakdown</span>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead><tr><th>Member</th><th>Alignment Score</th><th>Deviation %</th><th>Visual</th></tr></thead>
                            <tbody>
                                {memberAlignment.map(m => (
                                    <tr key={m.name}>
                                        <td style={{ fontWeight: 600 }}>{m.name}</td>
                                        <td><span style={{ fontWeight: 700, color: getColor(m.alignment) }}>{m.alignment}%</span></td>
                                        <td><span style={{ fontWeight: 700, color: m.deviation > 15 ? '#ef4444' : m.deviation > 8 ? '#f59e0b' : '#10b981' }}>{m.deviation}%</span></td>
                                        <td style={{ width: 180 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ flex: 1, height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                                                    <div style={{ width: `${m.alignment}%`, height: '100%', background: getColor(m.alignment), borderRadius: 4 }} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AnimatedCard>

            <div className="grid-2 mb-lg" style={{ marginTop: 20 }}>
                {/* Alignment Trend per Sprint */}
                <AnimatedCard delay={0.38}>
                    <div className="card-header"><span className="card-title">Alignment Trend per Sprint</span></div>
                    <div className="card-body">
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={alignmentTrend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="sprint" tick={{ fontSize: 12 }} />
                                    <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(v) => `${v}%`} />
                                    <Line type="monotone" dataKey="alignment" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </AnimatedCard>

                {/* High-Risk Story Distribution */}
                <AnimatedCard delay={0.46}>
                    <div className="card-header"><span className="card-title">High-Risk Story Distribution</span></div>
                    <div className="card-body">
                        <div className="chart-container" style={{ display: 'flex', alignItems: 'center' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" paddingAngle={3} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                        {riskDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </AnimatedCard>
            </div>

            <div className="grid-2">
                {/* Scope Drift Frequency */}
                <AnimatedCard delay={0.54}>
                    <div className="card-header"><span className="card-title">Scope Drift Frequency</span></div>
                    <div className="card-body">
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={scopeDrift}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="sprint" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(v) => `${v}%`} />
                                    <Bar dataKey="drift" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </AnimatedCard>

                {/* AI Summary Box */}
                <AnimatedCard delay={0.62}>
                    <div className="card-header">
                        <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Cpu size={16} style={{ color: '#8b5cf6' }} /> AI Alignment Summary
                        </span>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                                { text: 'Backend tasks show 18% higher deviation than frontend.', type: 'warning' },
                                { text: 'Sprint Alpha has the highest alignment consistency at 88%.', type: 'success' },
                                { text: 'Karan Joshi and Rahul Verma need alignment coaching — deviation > 15%.', type: 'danger' },
                                { text: 'Scope drift decreased by 3% compared to last quarter.', type: 'info' },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                                    background: item.type === 'success' ? '#f0fdf4' : item.type === 'warning' ? '#fffbeb' : item.type === 'danger' ? '#fef2f2' : '#eff6ff',
                                    border: `1px solid ${item.type === 'success' ? '#bbf7d0' : item.type === 'warning' ? '#fde68a' : item.type === 'danger' ? '#fecaca' : '#bfdbfe'}`,
                                    fontSize: '0.85rem', lineHeight: 1.5,
                                    color: item.type === 'success' ? '#166534' : item.type === 'warning' ? '#92400e' : item.type === 'danger' ? '#991b1b' : '#1e40af'
                                }}>
                                    {item.type === 'success' ? '✅' : item.type === 'warning' ? '⚠️' : item.type === 'danger' ? '🔴' : 'ℹ️'} {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedCard>
            </div>

            {/* Project Alignment */}
            <AnimatedCard delay={0.7} style={{ marginTop: 20 }}>
                <div className="card-header"><span className="card-title">🔹 Project Alignment Average</span></div>
                <div className="card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                        {projectAlignment.map(p => (
                            <div key={p.project} style={{ textAlign: 'center', padding: '20px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{p.project}</div>
                                <div style={{ fontWeight: 800, fontSize: '1.8rem', color: getColor(p.avg) }}>{p.avg}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedCard>
        </div>
    );
}
