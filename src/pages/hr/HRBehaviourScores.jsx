import { useState } from 'react';
import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { Star, MessageSquare, Clock, TrendingUp } from 'lucide-react';

const members = [
    { name: 'Vikram Singh', role: 'Developer' },
    { name: 'Sneha Iyer', role: 'Scrum Master' },
    { name: 'Ananya Reddy', role: 'DevOps' },
    { name: 'Arjun Patel', role: 'Sprint Master' },
    { name: 'Rahul Verma', role: 'Developer' },
    { name: 'Meera Nair', role: 'QA Engineer' },
    { name: 'Karan Joshi', role: 'Developer' },
];

const criteria = [
    { key: 'communication', label: 'Communication' },
    { key: 'ownership', label: 'Ownership' },
    { key: 'collaboration', label: 'Collaboration' },
    { key: 'leadership', label: 'Leadership' },
    { key: 'discipline', label: 'Discipline' },
];

const history = [
    { month: 'Jan 2026', member: 'Vikram Singh', score: 8.5, ratedBy: 'Sneha Iyer' },
    { month: 'Jan 2026', member: 'Ananya Reddy', score: 7.5, ratedBy: 'Arjun Patel' },
    { month: 'Dec 2025', member: 'Vikram Singh', score: 8.2, ratedBy: 'Sneha Iyer' },
    { month: 'Dec 2025', member: 'Sneha Iyer', score: 9.0, ratedBy: 'Arjun Patel' },
    { month: 'Dec 2025', member: 'Rahul Verma', score: 6.8, ratedBy: 'Sneha Iyer' },
];

export default function HRBehaviourScores() {
    const [selectedMember, setSelectedMember] = useState(members[0].name);
    const [ratings, setRatings] = useState({});
    const [comment, setComment] = useState('');

    const memberRatings = ratings[selectedMember] || {};
    const filledCount = Object.keys(memberRatings).length;
    const avgRating = filledCount > 0 ? (Object.values(memberRatings).reduce((a, b) => a + b, 0) / filledCount).toFixed(1) : '—';
    const behaviourScore = filledCount > 0 ? ((Object.values(memberRatings).reduce((a, b) => a + b, 0) / filledCount) * 10 / 5).toFixed(1) : '—';

    const updateRating = (key, value) => {
        setRatings(prev => ({ ...prev, [selectedMember]: { ...(prev[selectedMember] || {}), [key]: value } }));
    };

    return (
        <div>
            <div className="stats-grid mb-lg">
                <StatsCard icon={<Star size={24} />} value="8.2" label="Company Avg Score" trend="+0.3" trendDir="up" color="purple" delay={0} />
                <StatsCard icon={<TrendingUp size={24} />} value="82%" label="Behaviour Contribution" trend="10% weight" color="blue" delay={0.08} />
                <StatsCard icon={<Clock size={24} />} value="Monthly" label="Review Cycle" color="orange" delay={0.16} />
                <StatsCard icon={<MessageSquare size={24} />} value={history.length} label="Reviews Recorded" color="green" delay={0.24} />
            </div>

            {/* Rating Input */}
            <AnimatedCard delay={0.3}>
                <div className="card-header">
                    <span className="card-title">Rate Behaviour (1–5 Scale)</span>
                    <select value={selectedMember} onChange={e => setSelectedMember(e.target.value)}
                        style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                        {members.map(m => <option key={m.name} value={m.name}>{m.name} – {m.role}</option>)}
                    </select>
                </div>
                <div className="card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                        {criteria.map(c => (
                            <div key={c.key} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 10 }}>{c.label}</div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {[1, 2, 3, 4, 5].map(v => (
                                        <button key={v} onClick={() => updateRating(c.key, v)}
                                            style={{
                                                width: 36, height: 36, borderRadius: '50%', border: `2px solid ${(memberRatings[c.key] || 0) >= v ? '#3b82f6' : 'var(--border-color)'}`,
                                                background: (memberRatings[c.key] || 0) >= v ? '#3b82f6' : '#fff', color: (memberRatings[c.key] || 0) >= v ? '#fff' : 'var(--text-secondary)',
                                                fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.15s ease'
                                            }}>{v}</button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Auto-calculated score */}
                    <div style={{ marginTop: 16, padding: '16px 20px', background: 'linear-gradient(135deg, #ede9fe, #f5f3ff)', borderRadius: 'var(--radius-md)', border: '1px solid #c4b5fd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '1px' }}>Auto-Calculated</div>
                            <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: 2 }}>Behaviour Score = Avg({avgRating}/5) × 10% = <span style={{ color: '#7c3aed', fontSize: '1.2rem' }}>{behaviourScore}%</span></div>
                        </div>
                    </div>

                    {/* Comment */}
                    <div style={{ marginTop: 16 }}>
                        <textarea placeholder="Add comments about this member's behaviour..." value={comment} onChange={e => setComment(e.target.value)}
                            rows={3} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem', resize: 'vertical' }} />
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn btn-primary btn-sm" onClick={() => alert(`Behaviour scores saved for ${selectedMember}`)}>
                            Save Review
                        </button>
                    </div>
                </div>
            </AnimatedCard>

            {/* History */}
            <AnimatedCard delay={0.4} style={{ marginTop: 20 }}>
                <div className="card-header">
                    <span className="card-title">Review History</span>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead><tr><th>Month</th><th>Member</th><th>Score</th><th>Rated By</th></tr></thead>
                            <tbody>
                                {history.map((h, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{h.month}</td>
                                        <td>{h.member}</td>
                                        <td><span style={{ fontWeight: 700, color: h.score >= 8 ? '#10b981' : h.score >= 6 ? '#f59e0b' : '#ef4444' }}>{h.score}/10</span></td>
                                        <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{h.ratedBy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AnimatedCard>
        </div>
    );
}
