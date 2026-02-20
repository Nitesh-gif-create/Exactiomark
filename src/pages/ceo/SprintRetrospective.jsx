import AnimatedCard from '../../components/AnimatedCard';
import { ThumbsUp, ThumbsDown, Lightbulb, Brain, Star, MessageSquare } from 'lucide-react';

/* ── Retrospective Data ── */
const wentWell = [
    'OAuth2 integration completed ahead of schedule with zero defects.',
    'Cross-team collaboration between Dev and DevOps improved significantly.',
    'Code review turnaround time reduced from 24h to 6h avg.',
    'All acceptance criteria were well-defined before sprint start.',
];

const didntGoWell = [
    'SSO provider config was blocked by external dependency for 48+ hours.',
    'CI/CD pipeline staging delayed due to infrastructure provisioning gaps.',
    'MFA design spec changed mid-sprint, causing scope drift.',
    'Workload imbalance – Ananya R. had 3x more DevOps stories than planned.',
];

const improvements = [
    { action: 'Pre-provision staging environments before sprint start', assignee: 'Ananya R.', deadline: 'Sprint Beta', priority: 'High' },
    { action: 'Lock acceptance criteria 2 days before sprint planning', assignee: 'Arjun Patel', deadline: 'Next Sprint', priority: 'Medium' },
    { action: 'Add auto-assign for code reviews with 4h SLA', assignee: 'Sneha I.', deadline: 'Sprint Beta', priority: 'High' },
    { action: 'Weekly workload rebalancing check-in', assignee: 'Arjun Patel', deadline: 'Ongoing', priority: 'Medium' },
];

const aiSummary = `Sprint Alpha achieved an 81.7% completion rate with 98 of 120 story points delivered. Key highlights include the successful OAuth2 integration and improved code review times. However, two critical blockers — SSO external dependency and CI/CD infrastructure — caused 18.3% spillover. The sprint's alignment accuracy was strong at 87%, but workload distribution needs attention. Ananya Reddy's pipeline was disproportionately loaded. Recommend pre-provisioning infra and enforcing stricter scope locks for Sprint Beta.`;

const behaviourFeedback = [
    { name: 'Vikram Singh', communication: 9, ownership: 9, teamwork: 8, adaptability: 8, notes: 'Consistently delivers high-quality code. Excellent problem solver.' },
    { name: 'Sneha Iyer', communication: 9, ownership: 8, teamwork: 9, adaptability: 9, notes: 'Great facilitator. Improved review throughput significantly.' },
    { name: 'Ananya Reddy', communication: 7, ownership: 8, teamwork: 7, adaptability: 7, notes: 'Technically strong but workload management needs support.' },
];

const priorityColors = { High: '#ef4444', Medium: '#f59e0b', Low: '#10b981' };

export default function SprintRetrospective() {
    return (
        <div>
            <div className="grid-2 mb-lg">
                {/* What Went Well */}
                <AnimatedCard delay={0.1}>
                    <div className="card-header">
                        <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <ThumbsUp size={18} style={{ color: '#10b981' }} /> What Went Well
                        </span>
                        <span className="badge badge-success">{wentWell.length} items</span>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'grid', gap: 10 }}>
                            {wentWell.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: '#f0fdf4', borderRadius: 'var(--radius-sm)', border: '1px solid #bbf7d0' }}>
                                    <span style={{ color: '#10b981', fontWeight: 700, flexShrink: 0 }}>✓</span>
                                    <span style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedCard>

                {/* What Didn't Go Well */}
                <AnimatedCard delay={0.18}>
                    <div className="card-header">
                        <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <ThumbsDown size={18} style={{ color: '#ef4444' }} /> What Didn't Go Well
                        </span>
                        <span className="badge badge-danger">{didntGoWell.length} items</span>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'grid', gap: 10 }}>
                            {didntGoWell.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: '#fef2f2', borderRadius: 'var(--radius-sm)', border: '1px solid #fecaca' }}>
                                    <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>✗</span>
                                    <span style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedCard>
            </div>

            {/* Improvement Actions */}
            <AnimatedCard delay={0.26}>
                <div className="card-header">
                    <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Lightbulb size={18} style={{ color: '#f59e0b' }} /> Improvement Actions
                    </span>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Action Item</th>
                                    <th>Assignee</th>
                                    <th>Deadline</th>
                                    <th>Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {improvements.map((item, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 500 }}>{item.action}</td>
                                        <td>{item.assignee}</td>
                                        <td>{item.deadline}</td>
                                        <td><span className="badge" style={{ background: priorityColors[item.priority], color: '#fff' }}>{item.priority}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AnimatedCard>

            {/* AI Retrospective Summary */}
            <AnimatedCard delay={0.34} style={{ marginTop: 20 }}>
                <div className="card-header">
                    <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Brain size={18} style={{ color: '#8b5cf6' }} /> AI-Generated Retrospective Summary
                    </span>
                    <span className="badge" style={{ background: '#8b5cf620', color: '#8b5cf6' }}>AI Generated</span>
                </div>
                <div className="card-body">
                    <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', borderRadius: 'var(--radius-md)', border: '1px solid #c4b5fd', lineHeight: 1.8, fontSize: '0.9rem', color: '#3b0764' }}>
                        {aiSummary}
                    </div>
                </div>
            </AnimatedCard>

            {/* Behaviour Feedback */}
            <AnimatedCard delay={0.42} style={{ marginTop: 20 }}>
                <div className="card-header">
                    <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Star size={18} style={{ color: '#f59e0b' }} /> Behaviour Feedback
                    </span>
                </div>
                <div className="card-body">
                    <div style={{ display: 'grid', gap: 16 }}>
                        {behaviourFeedback.map((m, i) => (
                            <div key={i} style={{ padding: '18px 22px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 12 }}>{m.name}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
                                    {[
                                        { label: 'Communication', val: m.communication },
                                        { label: 'Ownership', val: m.ownership },
                                        { label: 'Teamwork', val: m.teamwork },
                                        { label: 'Adaptability', val: m.adaptability },
                                    ].map(c => (
                                        <div key={c.label} style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{c.label}</div>
                                            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: c.val >= 8 ? '#10b981' : c.val >= 6 ? '#f59e0b' : '#ef4444' }}>{c.val}/10</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', padding: '8px 12px', background: '#fff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                                    <MessageSquare size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                    {m.notes}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedCard>
        </div>
    );
}
