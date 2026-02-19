import { DollarSign, Briefcase, Activity, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import StatsCard from '../../components/StatsCard';
import AnimatedCard from '../../components/AnimatedCard';
import {
    LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const executionData = [
    { week: 'W1', health: 78, target: 85 },
    { week: 'W2', health: 82, target: 85 },
    { week: 'W3', health: 76, target: 85 },
    { week: 'W4', health: 89, target: 85 },
    { week: 'W5', health: 91, target: 85 },
    { week: 'W6', health: 85, target: 85 },
    { week: 'W7', health: 93, target: 85 },
    { week: 'W8', health: 88, target: 85 },
];

const sprintStatus = [
    { name: 'On Track', value: 12, color: '#10b981' },
    { name: 'At Risk', value: 4, color: '#f59e0b' },
    { name: 'Delayed', value: 2, color: '#ef4444' },
    { name: 'Completed', value: 8, color: '#3b82f6' },
];

const revenueData = [
    { month: 'Jan', revenue: 42, expenses: 28 },
    { month: 'Feb', revenue: 48, expenses: 30 },
    { month: 'Mar', revenue: 55, expenses: 32 },
    { month: 'Apr', revenue: 51, expenses: 29 },
    { month: 'May', revenue: 60, expenses: 34 },
    { month: 'Jun', revenue: 67, expenses: 36 },
];

const escalations = [
    { id: 1, title: 'Backend API latency spike', severity: 'High', project: 'Sprint Alpha', time: '2 hours ago', status: 'Open' },
    { id: 2, title: 'Client deliverable deadline at risk', severity: 'Critical', project: 'Sprint Beta', time: '5 hours ago', status: 'Escalated' },
    { id: 3, title: 'Resource conflict between teams', severity: 'Medium', project: 'Sprint Gamma', time: '1 day ago', status: 'Resolved' },
    { id: 4, title: 'Security vulnerability in auth module', severity: 'Critical', project: 'Sprint Alpha', time: '1 day ago', status: 'In Progress' },
];

export default function CEODashboard() {
    return (
        <div>
            {/* KPI Row */}
            <div className="stats-grid mb-lg">
                <StatsCard icon={<DollarSign size={24} />} value="$2.4M" label="Monthly Revenue" trend="+12.5%" trendDir="up" color="green" delay={0} />
                <StatsCard icon={<Briefcase size={24} />} value="26" label="Active Sprints" trend="+3 new" trendDir="up" color="blue" delay={0.08} />
                <StatsCard icon={<Activity size={24} />} value="91%" label="Execution Health" trend="+5.2%" trendDir="up" color="green" delay={0.16} />
                <StatsCard icon={<AlertTriangle size={24} />} value="6" label="Open Escalations" trend="-2 this week" trendDir="down" color="orange" delay={0.24} />
            </div>

            {/* Charts Row */}
            <div className="grid-2 mb-lg">
                <AnimatedCard delay={0.3}>
                    <div className="card-header">
                        <span className="card-title">Execution Health Trend</span>
                        <span className="badge badge-info">Last 8 Weeks</span>
                    </div>
                    <div className="card-body">
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={executionData}>
                                    <defs>
                                        <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} domain={[60, 100]} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="target" stroke="#d1d5db" strokeDasharray="5 5" dot={false} />
                                    <Area type="monotone" dataKey="health" stroke="#10b981" fill="url(#healthGrad)" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </AnimatedCard>

                <AnimatedCard delay={0.38}>
                    <div className="card-header">
                        <span className="card-title">Sprint Status Distribution</span>
                    </div>
                    <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="chart-container" style={{ display: 'flex', alignItems: 'center' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={sprintStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={3}>
                                        {sprintStatus.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </AnimatedCard>
            </div>

            {/* Revenue + Escalations */}
            <div className="grid-2">
                <AnimatedCard delay={0.46}>
                    <div className="card-header">
                        <span className="card-title">Revenue vs Expenses</span>
                        <span className="badge badge-success">6 Months</span>
                    </div>
                    <div className="card-body">
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(v) => `$${v}K`} />
                                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#revGrad)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#expGrad)" strokeWidth={2} />
                                    <Legend />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </AnimatedCard>

                <AnimatedCard delay={0.54}>
                    <div className="card-header">
                        <span className="card-title">Recent Escalations</span>
                        <button className="btn btn-sm btn-secondary">View All</button>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Issue</th>
                                        <th>Severity</th>
                                        <th>Status</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {escalations.map(esc => (
                                        <tr key={esc.id}>
                                            <td>
                                                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{esc.title}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{esc.project}</div>
                                            </td>
                                            <td>
                                                <span className={`badge ${esc.severity === 'Critical' ? 'badge-danger' : esc.severity === 'High' ? 'badge-warning' : 'badge-info'}`}>
                                                    {esc.severity}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${esc.status === 'Resolved' ? 'badge-success' : esc.status === 'Open' ? 'badge-warning' : 'badge-danger'}`}>
                                                    {esc.status}
                                                </span>
                                            </td>
                                            <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{esc.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </AnimatedCard>
            </div>
        </div>
    );
}
