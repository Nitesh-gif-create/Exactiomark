import { useState } from 'react';
import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { CheckSquare, Filter, Search } from 'lucide-react';

/* ── Mock Stories ── */
const stories = [
    { id: 'US-101', title: 'OAuth2 integration', desc: 'Implement OAuth2 flow with Google and GitHub providers.', acceptance: '- User can sign in via OAuth\n- Tokens stored securely\n- Redirect flow works', module: 'Auth', type: 'Dev', assignee: 'Vikram S.', alignment: 92, status: 'Done', approval: 'Approved' },
    { id: 'US-102', title: 'JWT token refresh flow', desc: 'Auto-refresh expired JWT tokens without user interaction.', acceptance: '- Silent refresh works\n- Token rotation enabled\n- Logout on failure', module: 'Auth', type: 'Dev', assignee: 'Sneha I.', alignment: 88, status: 'Done', approval: 'Approved' },
    { id: 'US-103', title: 'Role permission matrix', desc: 'Define and enforce granular permissions per role.', acceptance: '- Matrix configurable\n- API enforces perms\n- UI reflects restrictions', module: 'Auth', type: 'Dev', assignee: 'Vikram S.', alignment: 85, status: 'In Review', approval: 'Pending Review' },
    { id: 'US-104', title: 'SSO provider config', desc: 'Configure enterprise SSO providers (SAML/OIDC).', acceptance: '- SAML config works\n- OIDC flow tested\n- Admin can manage providers', module: 'Auth', type: 'Dev', assignee: 'Ananya R.', alignment: 75, status: 'In Progress', approval: 'Not Started' },
    { id: 'US-105', title: 'Password policy enforcement', desc: 'Enforce password complexity and expiry policies.', acceptance: '- Min 8 chars\n- Forced reset after 90 days\n- History check', module: 'Auth', type: 'Dev', assignee: 'Vikram S.', alignment: 80, status: 'In Progress', approval: 'Not Started' },
    { id: 'US-106', title: 'MFA setup wizard', desc: 'Guide users through MFA enrollment (TOTP/SMS).', acceptance: '- QR code generation\n- SMS fallback\n- Recovery codes', module: 'Auth', type: 'Dev', assignee: 'Sneha I.', alignment: 0, status: 'To Do', approval: 'Not Started' },
    { id: 'US-107', title: 'Session management API', desc: 'API to list, revoke, and manage active sessions.', acceptance: '- List sessions\n- Remote logout\n- Device fingerprint', module: 'Auth', type: 'Dev', assignee: 'Ananya R.', alignment: 0, status: 'To Do', approval: 'Not Started' },
    { id: 'US-108', title: 'Audit log for auth events', desc: 'Log all authentication events for compliance.', acceptance: '- Login/logout logged\n- Searchable log\n- 90-day retention', module: 'Security', type: 'Dev', assignee: 'Vikram S.', alignment: 90, status: 'Done', approval: 'Approved' },
    { id: 'US-109', title: 'CI/CD pipeline staging', desc: 'Set up automated CI/CD for staging environment.', acceptance: '- Auto build on merge\n- Staging deploy\n- Rollback capability', module: 'DevOps', type: 'DevOps', assignee: 'Ananya R.', alignment: 68, status: 'In Progress', approval: 'Not Started' },
    { id: 'US-110', title: 'Automated regression suite', desc: 'Build automated regression tests for auth module.', acceptance: '- 80%+ coverage\n- CI integrated\n- Failure reports', module: 'QA', type: 'QA', assignee: 'Sneha I.', alignment: 0, status: 'To Do', approval: 'Not Started' },
];

const statusColors = { 'To Do': '#6b7280', 'In Progress': '#3b82f6', 'In Review': '#f59e0b', 'Done': '#10b981' };
const typeColors = { Dev: '#3b82f6', QA: '#8b5cf6', DevOps: '#10b981', Research: '#f59e0b' };
const approvalColors = { 'Approved': '#10b981', 'Pending Review': '#f59e0b', 'Not Started': '#6b7280' };

export default function BacklogStories() {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = stories.filter(s => {
        if (filter !== 'All' && s.status !== filter) return false;
        if (search && !s.title.toLowerCase().includes(search.toLowerCase()) && !s.id.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <div>
            {/* KPI Row */}
            <div className="stats-grid mb-lg">
                <StatsCard icon={<CheckSquare size={24} />} value={stories.length} label="Total Stories" trend="Sprint Alpha" trendDir="up" color="blue" delay={0} />
                <StatsCard icon={<CheckSquare size={24} />} value={stories.filter(s => s.status === 'Done').length} label="Completed" trend={`${((stories.filter(s => s.status === 'Done').length / stories.length) * 100).toFixed(0)}%`} trendDir="up" color="green" delay={0.08} />
                <StatsCard icon={<CheckSquare size={24} />} value={stories.filter(s => s.status === 'In Progress').length} label="In Progress" color="orange" delay={0.16} />
                <StatsCard icon={<CheckSquare size={24} />} value={stories.filter(s => s.status === 'To Do').length} label="To Do" color="gray" delay={0.24} />
            </div>

            <AnimatedCard delay={0.3}>
                <div className="card-header">
                    <span className="card-title">Backlog / Stories</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                            <input
                                type="text" placeholder="Search..." value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ paddingLeft: 30, padding: '6px 12px 6px 30px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.82rem', width: 160 }}
                            />
                        </div>
                        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}>
                            <option value="All">All Status</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="In Review">In Review</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Story</th>
                                    <th>Module</th>
                                    <th>Type</th>
                                    <th>Assignee</th>
                                    <th>Alignment</th>
                                    <th>Status</th>
                                    <th>Approval</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(s => (
                                    <tr key={s.id}>
                                        <td>
                                            <div style={{ fontWeight: 700, color: '#3b82f6', fontSize: '0.78rem' }}>{s.id}</div>
                                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.title}</div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{s.desc.substring(0, 60)}...</div>
                                        </td>
                                        <td><span className="badge badge-info">{s.module}</span></td>
                                        <td><span className="badge" style={{ background: typeColors[s.type], color: '#fff' }}>{s.type}</span></td>
                                        <td style={{ fontWeight: 500 }}>{s.assignee}</td>
                                        <td>
                                            {s.alignment > 0 ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 40, height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                                                        <div style={{ height: '100%', width: `${s.alignment}%`, background: s.alignment >= 80 ? '#10b981' : s.alignment >= 60 ? '#f59e0b' : '#ef4444', borderRadius: 3 }} />
                                                    </div>
                                                    <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{s.alignment}%</span>
                                                </div>
                                            ) : <span style={{ color: 'var(--text-tertiary)', fontSize: '0.78rem' }}>—</span>}
                                        </td>
                                        <td><span className="badge" style={{ background: statusColors[s.status], color: '#fff' }}>{s.status}</span></td>
                                        <td><span className="badge" style={{ background: `${approvalColors[s.approval]}20`, color: approvalColors[s.approval], fontWeight: 600 }}>{s.approval}</span></td>
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
