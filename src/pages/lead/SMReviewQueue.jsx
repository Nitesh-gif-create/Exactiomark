import { useState } from 'react';
import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import ActionModal from '../../components/ActionModal';
import { Inbox, CheckCircle, AlertTriangle, MessageSquare } from 'lucide-react';

const initialReviews = [
    { id: 'ST-103', story: 'User Profile API', developer: 'Vikram Singh', alignment: 88, risk: 'Low', submittedAt: '2h ago', status: 'Pending', aiNote: 'Alignment 88% — Code matches scope. Minor documentation gaps detected.' },
    { id: 'ST-102', story: 'Setup CI/CD Pipeline', developer: 'Ananya Reddy', alignment: 78, risk: 'High', submittedAt: '4h ago', status: 'Pending', aiNote: 'Alignment 78% — Possible DevOps scope drift detected. Review pipeline configuration against sprint spec.' },
    { id: 'ST-104', story: 'Dashboard UI Redesign', developer: 'Rahul Verma', alignment: 65, risk: 'High', submittedAt: '6h ago', status: 'Changes Requested', aiNote: 'Alignment 42% — Significant scope drift. UI components do not match wireframe spec.' },
    { id: 'ST-109', story: 'API Rate Limiting', developer: 'Vikram Singh', alignment: 82, risk: 'Low', submittedAt: '1d ago', status: 'Pending', aiNote: 'Alignment 82% — Looks aligned with sprint backlog. Edge case handling could be improved.' },
    { id: 'ST-106', story: 'Database Migration Script', developer: 'Ananya Reddy', alignment: 72, risk: 'Medium', submittedAt: '1d ago', status: 'Escalated to PM', aiNote: 'Alignment 72% — Schema drift from original spec. PM review recommended before merge.' },
    { id: 'ST-107', story: 'Notification Service', developer: 'Karan Joshi', alignment: 58, risk: 'High', submittedAt: '2d ago', status: 'Rejected', aiNote: 'Alignment 42% — Possible scope drift detected. Implementation does not match story criteria.' },
];

const statusColors = { Pending: '#f59e0b', Approved: '#10b981', 'Changes Requested': '#3b82f6', 'Escalated to PM': '#8b5cf6', Rejected: '#ef4444' };
const riskColors = { Low: '#10b981', Medium: '#f59e0b', High: '#ef4444' };
const alignColor = v => v >= 80 ? '#10b981' : v >= 65 ? '#f59e0b' : '#ef4444';

export default function SMReviewQueue() {
    const [reviews, setReviews] = useState(initialReviews);
    const [expandedNote, setExpandedNote] = useState(null);
    const [modal, setModal] = useState(null); // { type, id, storyTitle }

    const handleConfirm = (data) => {
        const { type, id } = modal;
        const statusMap = { approve: 'Approved', review: 'Changes Requested', reject: 'Rejected' };
        setReviews(prev => prev.map(r => r.id === id ? { ...r, status: statusMap[type], actionData: data } : r));
        setModal(null);
    };

    return (
        <div>
            {modal && (
                <ActionModal
                    type={modal.type}
                    storyTitle={modal.storyTitle}
                    onConfirm={handleConfirm}
                    onClose={() => setModal(null)}
                />
            )}

            <div className="stats-grid mb-lg">
                <StatsCard icon={<Inbox size={24} />} value={reviews.filter(r => r.status === 'Pending').length} label="Pending Review" color="blue" delay={0} />
                <StatsCard icon={<CheckCircle size={24} />} value={reviews.filter(r => r.status === 'Approved').length} label="Approved" color="green" delay={0.08} />
                <StatsCard icon={<MessageSquare size={24} />} value={reviews.filter(r => r.status === 'Changes Requested').length} label="Changes Requested" color="orange" delay={0.16} />
                <StatsCard icon={<AlertTriangle size={24} />} value={reviews.filter(r => r.status === 'Escalated to PM').length} label="Escalated to PM" color="purple" delay={0.24} />
            </div>

            <AnimatedCard delay={0.3}>
                <div className="card-header"><span className="card-title">Review Queue</span></div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr><th>ID</th><th>Story</th><th>Developer</th><th>AI Align</th><th>Risk</th><th>Submitted</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {reviews.map(r => (
                                    <>
                                        <tr key={r.id}>
                                            <td style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.8rem', color: '#3b82f6' }}>{r.id}</td>
                                            <td style={{ fontWeight: 600 }}>
                                                {r.story}
                                                <button onClick={() => setExpandedNote(expandedNote === r.id ? null : r.id)}
                                                    style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', fontSize: '0.72rem', fontWeight: 600 }}>
                                                    {expandedNote === r.id ? '▲ AI' : '▼ AI'}
                                                </button>
                                            </td>
                                            <td style={{ fontSize: '0.82rem' }}>{r.developer}</td>
                                            <td><span style={{ fontWeight: 700, color: alignColor(r.alignment) }}>{r.alignment}%</span></td>
                                            <td><span style={{ color: riskColors[r.risk], fontWeight: 600 }}>{r.risk}</span></td>
                                            <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{r.submittedAt}</td>
                                            <td><span className="badge" style={{ background: (statusColors[r.status] || '#6b7280') + '20', color: statusColors[r.status] || '#6b7280' }}>{r.status}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', gap: 6 }}>
                                                    <button onClick={() => setModal({ type: 'approve', id: r.id, storyTitle: r.story })}
                                                        style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: '#10b98120', color: '#10b981', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>
                                                        Approve ✓
                                                    </button>
                                                    <button onClick={() => setModal({ type: 'review', id: r.id, storyTitle: r.story })}
                                                        style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: '#3b82f620', color: '#3b82f6', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>
                                                        Changes
                                                    </button>
                                                    <button onClick={() => setModal({ type: 'reject', id: r.id, storyTitle: r.story })}
                                                        style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: '#ef444420', color: '#ef4444', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedNote === r.id && (
                                            <tr key={`${r.id}-note`}>
                                                <td colSpan={8} style={{ padding: '0 16px 14px', background: '#fafafa' }}>
                                                    <div style={{ padding: '10px 14px', background: r.alignment < 65 ? '#fef2f2' : '#f0fdf4', borderRadius: 8, borderLeft: `3px solid ${alignColor(r.alignment)}`, fontSize: '0.83rem' }}>
                                                        <span style={{ fontWeight: 700, color: alignColor(r.alignment) }}>🤖 AI Suggestion: </span>{r.aiNote}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AnimatedCard>
        </div>
    );
}
