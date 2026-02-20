import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { MessageSquare, TrendingUp, Target, AlertTriangle, Cpu, CheckCircle } from 'lucide-react';

const retroData = {
    sprintName: 'Sprint Alpha',
    completionPct: 82,
    alignmentAvg: 84.2,
    behaviourAvg: 8.1,
    bottleneck: 'DevOps Pipeline',
};

const wentWell = [
    'Auth module delivered 2 days ahead of schedule.',
    'Code review turnaround improved by 40%.',
    'Team alignment increased by 3.2% compared to last sprint.',
    'Zero critical bugs in production deployment.',
];

const didntGoWell = [
    'CI/CD pipeline broke twice, causing 8 hours of downtime.',
    'Dashboard UI task delayed by 12 hours due to scope creep.',
    'Karan Joshi had 3 overdue tasks — workload imbalance.',
    'Sprint scoping was too aggressive — 18% spillover.',
];

const improvements = [
    { action: 'Add pipeline health check before deployments', owner: 'Ananya Reddy', due: 'Sprint Beta' },
    { action: 'Introduce daily standups for high-risk tasks', owner: 'Sneha Iyer', due: 'Sprint Beta' },
    { action: 'Redistribute workload for overloaded members', owner: 'PM', due: 'Immediate' },
    { action: 'Better sprint scoping with buffer for unknowns', owner: 'PM', due: 'Sprint Beta' },
];

const aiSuggestions = [
    'Reduce sprint scope by 15% to prevent spillover. Historical data shows 82% completion rate with current scoping.',
    'Assign Karan Joshi as pair-programming partner with Vikram Singh to improve velocity by estimated 20%.',
    'DevOps tasks should have a 2-hour buffer built into estimates based on pipeline instability patterns.',
    'Consider splitting the Dashboard UI task into 3 smaller stories for better tracking and faster delivery.',
];

const getColor = (v) => v >= 80 ? '#10b981' : v >= 60 ? '#f59e0b' : '#ef4444';

export default function PMRetrospective() {
    return (
        <div>
            {/* Sprint Summary KPIs */}
            <div className="stats-grid mb-lg">
                <StatsCard icon={<Target size={24} />} value={`${retroData.completionPct}%`} label="Sprint Completion" trend="18% spillover" trendDir="down" color="blue" delay={0} />
                <StatsCard icon={<TrendingUp size={24} />} value={`${retroData.alignmentAvg}%`} label="Alignment Avg" trend="+3.2%" trendDir="up" color="green" delay={0.08} />
                <StatsCard icon={<CheckCircle size={24} />} value={`${retroData.behaviourAvg}/10`} label="Behaviour Avg" color="purple" delay={0.16} />
                <StatsCard icon={<AlertTriangle size={24} />} value={retroData.bottleneck} label="Bottleneck Area" color="red" delay={0.24} />
            </div>

            <div className="grid-2 mb-lg">
                {/* What Went Well */}
                <AnimatedCard delay={0.3}>
                    <div className="card-header">
                        <span className="card-title" style={{ color: '#10b981' }}>✅ What Went Well</span>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {wentWell.map((item, i) => (
                                <div key={i} style={{ padding: '10px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#166534' }}>
                                    ✅ {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedCard>

                {/* What Didn't Go Well */}
                <AnimatedCard delay={0.38}>
                    <div className="card-header">
                        <span className="card-title" style={{ color: '#ef4444' }}>❌ What Didn't Go Well</span>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {didntGoWell.map((item, i) => (
                                <div key={i} style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#991b1b' }}>
                                    ❌ {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedCard>
            </div>

            {/* Improvement Actions */}
            <AnimatedCard delay={0.46}>
                <div className="card-header">
                    <span className="card-title">🔧 Improvement Actions</span>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead><tr><th>Action</th><th>Owner</th><th>Due</th></tr></thead>
                            <tbody>
                                {improvements.map((imp, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{imp.action}</td>
                                        <td style={{ fontSize: '0.85rem' }}>{imp.owner}</td>
                                        <td><span className="badge" style={{ background: imp.due === 'Immediate' ? '#ef444420' : '#3b82f620', color: imp.due === 'Immediate' ? '#ef4444' : '#3b82f6' }}>{imp.due}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AnimatedCard>

            {/* AI Improvement Suggestions */}
            <AnimatedCard delay={0.54} style={{ marginTop: 20 }}>
                <div className="card-header">
                    <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Cpu size={16} style={{ color: '#8b5cf6' }} /> 🧠 AI Improvement Suggestions
                    </span>
                </div>
                <div className="card-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {aiSuggestions.map((s, i) => (
                            <div key={i} style={{
                                padding: '14px 18px', background: 'linear-gradient(135deg, #ede9fe, #f5f3ff)',
                                borderRadius: 'var(--radius-sm)', border: '1px solid #c4b5fd',
                                fontSize: '0.85rem', lineHeight: 1.6, color: '#4c1d95'
                            }}>
                                💡 {s}
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedCard>
        </div>
    );
}
