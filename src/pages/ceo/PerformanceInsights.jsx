import { useState } from 'react';
import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { TrendingUp, Award, Star, Users, ThumbsUp, MessageCircle, Heart, Zap } from 'lucide-react';

/* ── Member Performance Data ── */
const members = [
    { name: 'Vikram Singh', role: 'Developer', alignment: 91, onTime: 94, rejection: 5, behaviour: 8.5, overall: 89.2, promotion: true },
    { name: 'Sneha Iyer', role: 'Scrum Master', alignment: 87, onTime: 88, rejection: 8, behaviour: 9.0, overall: 86.8, promotion: true },
    { name: 'Ananya Reddy', role: 'DevOps', alignment: 78, onTime: 72, rejection: 15, behaviour: 7.5, overall: 74.3, promotion: false },
    { name: 'Arjun Patel', role: 'Sprint Master', alignment: 85, onTime: 90, rejection: 6, behaviour: 8.8, overall: 85.5, promotion: true },
    { name: 'Priya Sharma', role: 'HR', alignment: 82, onTime: 95, rejection: 3, behaviour: 9.2, overall: 88.1, promotion: true },
];

const behaviourCriteria = [
    { key: 'communication', label: 'Communication', icon: <MessageCircle size={16} />, desc: 'Clarity, frequency, and effectiveness' },
    { key: 'ownership', label: 'Ownership', icon: <ThumbsUp size={16} />, desc: 'Takes responsibility and follows through' },
    { key: 'teamwork', label: 'Teamwork', icon: <Heart size={16} />, desc: 'Collaboration and support for peers' },
    { key: 'adaptability', label: 'Adaptability', icon: <Zap size={16} />, desc: 'Handles change and uncertainty well' },
];

const getScoreColor = (score) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
};

export default function PerformanceInsights() {
    const [ratings, setRatings] = useState({});
    const [selectedMember, setSelectedMember] = useState(members[0].name);

    const updateRating = (criteria, value) => {
        setRatings(prev => ({
            ...prev,
            [selectedMember]: { ...(prev[selectedMember] || {}), [criteria]: value }
        }));
    };

    return (
        <div>
            {/* KPI Row */}
            <div className="stats-grid mb-lg">
                <StatsCard icon={<TrendingUp size={24} />} value="84.8%" label="Avg Performance" trend="+3.2%" trendDir="up" color="green" delay={0} />
                <StatsCard icon={<Award size={24} />} value="4" label="Promotion Eligible" trend="of 5 members" trendDir="up" color="blue" delay={0.08} />
                <StatsCard icon={<Star size={24} />} value="8.6" label="Avg Behaviour Score" trend="+0.4" trendDir="up" color="purple" delay={0.16} />
                <StatsCard icon={<Users size={24} />} value="7.4%" label="Avg Rejection Rate" trend="-2.1%" trendDir="down" color="orange" delay={0.24} />
            </div>

            {/* Member Performance Table */}
            <AnimatedCard delay={0.3}>
                <div className="card-header">
                    <span className="card-title">Member Performance Table</span>
                    <span className="badge badge-info">10% Behaviour Weight</span>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Alignment Avg</th>
                                    <th>On-time %</th>
                                    <th>Rejection %</th>
                                    <th>Behaviour</th>
                                    <th>Overall Index</th>
                                    <th>Promotion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(m => (
                                    <tr key={m.name}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{m.name}</div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{m.role}</div>
                                        </td>
                                        <td><span style={{ fontWeight: 700, color: getScoreColor(m.alignment) }}>{m.alignment}%</span></td>
                                        <td><span style={{ fontWeight: 700, color: getScoreColor(m.onTime) }}>{m.onTime}%</span></td>
                                        <td><span style={{ fontWeight: 700, color: m.rejection > 10 ? '#ef4444' : '#10b981' }}>{m.rejection}%</span></td>
                                        <td><span style={{ fontWeight: 700, color: getScoreColor(m.behaviour * 10) }}>{m.behaviour}/10</span></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 50, height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${m.overall}%`, background: getScoreColor(m.overall), borderRadius: 4 }} />
                                                </div>
                                                <span style={{ fontWeight: 700, color: getScoreColor(m.overall) }}>{m.overall}%</span>
                                            </div>
                                        </td>
                                        <td>
                                            {m.promotion
                                                ? <span className="badge badge-success">✓ Eligible</span>
                                                : <span className="badge badge-danger">✗ Not Yet</span>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AnimatedCard>

            {/* Behaviour Input Section */}
            <AnimatedCard delay={0.4} style={{ marginTop: 20 }}>
                <div className="card-header">
                    <span className="card-title">Behaviour Input (10% Weight)</span>
                    <select
                        value={selectedMember}
                        onChange={e => setSelectedMember(e.target.value)}
                        style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem', background: '#fff' }}
                    >
                        {members.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                    </select>
                </div>
                <div className="card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                        {behaviourCriteria.map(c => {
                            const val = ratings[selectedMember]?.[c.key] || 5;
                            return (
                                <div key={c.key} style={{ padding: '16px 20px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontWeight: 700, fontSize: '0.88rem' }}>
                                        {c.icon} {c.label}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 12 }}>{c.desc}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <input
                                            type="range" min="1" max="10" value={val}
                                            onChange={e => updateRating(c.key, Number(e.target.value))}
                                            style={{ flex: 1, accentColor: '#3b82f6' }}
                                        />
                                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: getScoreColor(val * 10), minWidth: 35, textAlign: 'center' }}>{val}/10</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn btn-primary btn-sm" onClick={() => alert(`Behaviour scores saved for ${selectedMember}`)}>
                            Save Behaviour Scores
                        </button>
                    </div>
                </div>
            </AnimatedCard>
        </div>
    );
}
