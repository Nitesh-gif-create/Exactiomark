import { useState } from 'react';
import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { MessageSquare, TrendingUp, TrendingDown, Star } from 'lucide-react';

const aiSummary = `Sprint 14 Summary:
• Backend tasks had high alignment (88%) — Auth and API modules delivered on spec.
• Frontend had 3 rejection loops — Dashboard Redesign (ST-104) flagged for scope drift.
• Approval delay increased by 12% — Database migration pending PM review.
• Karan Joshi missed sprint targets (58% alignment) — Requires 1:1 discussion and scope clarification.
• Meera Nair achieved 100% QA task completion — Strong performance highlight.`;

export default function SMRetrospective() {
    const [wellNotes, setWellNotes] = useState('- Auth module delivered early and within spec\n- QA team had 0 blocked stories\n- CI/CD pipeline stabilized in last 48h');
    const [didntNotes, setDidntNotes] = useState('- Dashboard redesign had 3 review rejections due to scope drift\n- Database migration delayed by approval bottleneck\n- Karan Joshi below 60% alignment for 3rd consecutive sprint');
    const [actionNotes, setActionNotes] = useState('- Schedule 1:1 with Karan Joshi on scope understanding\n- Clarify wireframe spec with PM before UI stories\n- Add mandatory schema review gate before migration PRs');
    const [saved, setSaved] = useState(false);

    return (
        <div>
            <div className="stats-grid mb-lg">
                <StatsCard icon={<TrendingUp size={24} />} value="88%" label="Backend Alignment" color="green" delay={0} />
                <StatsCard icon={<TrendingDown size={24} />} value="3" label="Rejection Loops" color="red" delay={0.08} />
                <StatsCard icon={<MessageSquare size={24} />} value="+12%" label="Approval Delay ↑" color="orange" delay={0.16} />
                <StatsCard icon={<Star size={24} />} value="14" label="Current Sprint" color="blue" delay={0.24} />
            </div>

            {/* AI Auto Summary */}
            <AnimatedCard delay={0.3}>
                <div className="card-header">
                    <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        🤖 AI Sprint Summary
                    </span>
                    <span className="badge badge-info">Auto-generated</span>
                </div>
                <div className="card-body">
                    <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: '16px 20px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.8, color: '#0c4a6e', whiteSpace: 'pre-wrap' }}>
                        {aiSummary}
                    </div>
                </div>
            </AnimatedCard>

            {/* Manual Notes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 20 }}>
                <AnimatedCard delay={0.38}>
                    <div className="card-header"><span className="card-title" style={{ color: '#10b981' }}>✅ What Went Well</span></div>
                    <div className="card-body">
                        <textarea value={wellNotes} onChange={e => setWellNotes(e.target.value)} rows={8}
                            style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1fae5', borderRadius: 8, fontSize: '0.85rem', resize: 'vertical', lineHeight: 1.6, boxSizing: 'border-box', background: '#f0fdf4' }} />
                    </div>
                </AnimatedCard>
                <AnimatedCard delay={0.42}>
                    <div className="card-header"><span className="card-title" style={{ color: '#ef4444' }}>❌ What Didn't Work</span></div>
                    <div className="card-body">
                        <textarea value={didntNotes} onChange={e => setDidntNotes(e.target.value)} rows={8}
                            style={{ width: '100%', padding: '10px 14px', border: '1px solid #fee2e2', borderRadius: 8, fontSize: '0.85rem', resize: 'vertical', lineHeight: 1.6, boxSizing: 'border-box', background: '#fef2f2' }} />
                    </div>
                </AnimatedCard>
            </div>

            <AnimatedCard delay={0.46} style={{ marginTop: 18 }}>
                <div className="card-header"><span className="card-title" style={{ color: '#3b82f6' }}>🚀 Improvement Actions</span></div>
                <div className="card-body">
                    <textarea value={actionNotes} onChange={e => setActionNotes(e.target.value)} rows={5}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #dbeafe', borderRadius: 8, fontSize: '0.85rem', resize: 'vertical', lineHeight: 1.6, boxSizing: 'border-box', background: '#eff6ff' }} />
                    <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                        <button onClick={() => setSaved(true)} className="btn btn-primary" style={{ padding: '8px 24px' }}>
                            💾 Save Retrospective
                        </button>
                        {saved && <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>✓ Saved successfully</span>}
                    </div>
                </div>
            </AnimatedCard>
        </div>
    );
}
