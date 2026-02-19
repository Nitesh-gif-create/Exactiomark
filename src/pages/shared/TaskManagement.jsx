import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AnimatedCard from '../../components/AnimatedCard';
import { ClipboardList, Send, CheckCircle, Clock, AlertCircle, ChevronDown, Plus } from 'lucide-react';

/*
 * Hierarchical task delegation:
 *   CEO  →  assigns to  PM
 *   PM   →  assigns to  LEAD
 *   LEAD →  assigns to  DEVELOPER, DEVOPS, HR
 *
 * Everyone (except CEO) sees "Assigned to me" (tasks received from above).
 * Everyone who CAN delegate sees "Assigning" tab too.
 *
 * CEO only gets Assigning (no one assigns to CEO).
 */

const ROLE_CAN_ASSIGN = {
    CEO: ['PM'],
    PM: ['LEAD'],
    LEAD: ['DEVELOPER', 'DEVOPS', 'HR'],
    HR: [],
    DEVELOPER: [],
    DEVOPS: [],
};

const ROLE_NAMES = {
    CEO: 'CEO', PM: 'Sprint Master', LEAD: 'Scrum Master',
    HR: 'HR', DEVELOPER: 'Developer', DEVOPS: 'DevOps',
};

/* ── Mock task data per role ── */
const ASSIGNED_TO_ME = {
    PM: [
        { id: 'T-101', title: 'Finalize Q2 Sprint Roadmap', from: 'Rajesh Mehta (CEO)', priority: 'High', status: 'In Progress', due: 'Feb 22' },
        { id: 'T-102', title: 'Prepare Board Presentation', from: 'Rajesh Mehta (CEO)', priority: 'Critical', status: 'To Do', due: 'Feb 25' },
        { id: 'T-103', title: 'Review Resource Allocation', from: 'Rajesh Mehta (CEO)', priority: 'Medium', status: 'Done', due: 'Feb 18' },
    ],
    LEAD: [
        { id: 'T-201', title: 'Sprint Alpha – Feature Development', from: 'Arjun Patel (PM)', priority: 'High', status: 'In Progress', due: 'Feb 20' },
        { id: 'T-202', title: 'Code Review Standards Update', from: 'Arjun Patel (PM)', priority: 'Medium', status: 'To Do', due: 'Feb 23' },
        { id: 'T-203', title: 'Team Performance Assessment', from: 'Arjun Patel (PM)', priority: 'Low', status: 'In Progress', due: 'Feb 28' },
    ],
    DEVELOPER: [
        { id: 'T-301', title: 'Implement OAuth2 Login Flow', from: 'Sneha Iyer (Scrum Master)', priority: 'High', status: 'In Progress', due: 'Feb 19' },
        { id: 'T-302', title: 'Write Unit Tests for Payments', from: 'Sneha Iyer (Scrum Master)', priority: 'Medium', status: 'To Do', due: 'Feb 21' },
        { id: 'T-303', title: 'Fix Pagination Bug on Dashboard', from: 'Sneha Iyer (Scrum Master)', priority: 'Low', status: 'Done', due: 'Feb 17' },
    ],
    DEVOPS: [
        { id: 'T-401', title: 'Set Up CI/CD for Sprint Beta', from: 'Sneha Iyer (Scrum Master)', priority: 'High', status: 'In Progress', due: 'Feb 20' },
        { id: 'T-402', title: 'Configure Monitoring Alerts', from: 'Sneha Iyer (Scrum Master)', priority: 'Medium', status: 'To Do', due: 'Feb 22' },
    ],
    HR: [
        { id: 'T-501', title: 'Onboard 3 New Hires', from: 'Sneha Iyer (Scrum Master)', priority: 'High', status: 'In Progress', due: 'Feb 20' },
        { id: 'T-502', title: 'Update Employee Handbook', from: 'Sneha Iyer (Scrum Master)', priority: 'Low', status: 'To Do', due: 'Mar 01' },
    ],
};

const ASSIGNED_BY_ME = {
    CEO: [
        { id: 'T-101', title: 'Finalize Q2 Sprint Roadmap', to: 'Arjun Patel (PM)', priority: 'High', status: 'In Progress', due: 'Feb 22' },
        { id: 'T-102', title: 'Prepare Board Presentation', to: 'Arjun Patel (PM)', priority: 'Critical', status: 'To Do', due: 'Feb 25' },
        { id: 'T-103', title: 'Review Resource Allocation', to: 'Arjun Patel (PM)', priority: 'Medium', status: 'Done', due: 'Feb 18' },
    ],
    PM: [
        { id: 'T-201', title: 'Sprint Alpha – Feature Development', to: 'Sneha Iyer (Scrum Master)', priority: 'High', status: 'In Progress', due: 'Feb 20' },
        { id: 'T-202', title: 'Code Review Standards Update', to: 'Sneha Iyer (Scrum Master)', priority: 'Medium', status: 'To Do', due: 'Feb 23' },
        { id: 'T-203', title: 'Team Performance Assessment', to: 'Sneha Iyer (Scrum Master)', priority: 'Low', status: 'In Progress', due: 'Feb 28' },
    ],
    LEAD: [
        { id: 'T-301', title: 'Implement OAuth2 Login Flow', to: 'Vikram Singh (Dev)', priority: 'High', status: 'In Progress', due: 'Feb 19' },
        { id: 'T-302', title: 'Write Unit Tests for Payments', to: 'Vikram Singh (Dev)', priority: 'Medium', status: 'To Do', due: 'Feb 21' },
        { id: 'T-401', title: 'Set Up CI/CD for Sprint Beta', to: 'Ananya Reddy (DevOps)', priority: 'High', status: 'In Progress', due: 'Feb 20' },
        { id: 'T-501', title: 'Onboard 3 New Hires', to: 'Priya Sharma (HR)', priority: 'High', status: 'In Progress', due: 'Feb 20' },
    ],
};

const statusIcon = { 'To Do': <Clock size={14} />, 'In Progress': <AlertCircle size={14} />, 'Done': <CheckCircle size={14} /> };
const statusBadge = { 'To Do': 'badge-neutral', 'In Progress': 'badge-info', 'Done': 'badge-success' };
const priorityBadge = { 'Low': 'badge-neutral', 'Medium': 'badge-warning', 'High': 'badge-danger', 'Critical': 'badge-danger' };

export default function TaskManagement() {
    const { user } = useAuth();
    const role = user?.role;
    const canAssign = (ROLE_CAN_ASSIGN[role] || []).length > 0;
    const canReceive = role !== 'CEO';

    const defaultTab = canReceive ? 'assigned' : 'assigning';
    const [tab, setTab] = useState(defaultTab);

    const assignedTasks = ASSIGNED_TO_ME[role] || [];
    const assigningTasks = ASSIGNED_BY_ME[role] || [];

    /* New-task form state */
    const [showForm, setShowForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newPriority, setNewPriority] = useState('Medium');
    const [newAssignTo, setNewAssignTo] = useState('');

    const handleNewTask = (e) => {
        e.preventDefault();
        alert(`Task "${newTitle}" assigned to ${newAssignTo} (${newPriority} priority)`);
        setNewTitle(''); setNewPriority('Medium'); setNewAssignTo(''); setShowForm(false);
    };

    return (
        <div>
            {/* Tabs */}
            <div className="task-tabs mb-lg">
                {canReceive && (
                    <button className={`task-tab ${tab === 'assigned' ? 'active' : ''}`} onClick={() => setTab('assigned')}>
                        <ClipboardList size={16} /> Assigned to Me
                        <span className="task-tab-count">{assignedTasks.length}</span>
                    </button>
                )}
                {canAssign && (
                    <button className={`task-tab ${tab === 'assigning' ? 'active' : ''}`} onClick={() => setTab('assigning')}>
                        <Send size={16} /> Assigning Tasks
                        <span className="task-tab-count">{assigningTasks.length}</span>
                    </button>
                )}
            </div>

            {/* ─── ASSIGNED TO ME ─── */}
            {tab === 'assigned' && (
                <AnimatedCard delay={0}>
                    <div className="card-header">
                        <span className="card-title">Tasks Assigned to Me</span>
                        <span className="badge badge-info">{assignedTasks.length} tasks</span>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                        <table className="table">
                            <thead><tr><th>ID</th><th>Task</th><th>From</th><th>Priority</th><th>Status</th><th>Due</th></tr></thead>
                            <tbody>
                                {assignedTasks.map(t => (
                                    <tr key={t.id}>
                                        <td style={{ fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: '0.82rem' }}>{t.id}</td>
                                        <td style={{ fontWeight: 600 }}>{t.title}</td>
                                        <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t.from}</td>
                                        <td><span className={`badge ${priorityBadge[t.priority]}`}>{t.priority}</span></td>
                                        <td><span className={`badge ${statusBadge[t.status]}`} style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>{statusIcon[t.status]} {t.status}</span></td>
                                        <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t.due}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {assignedTasks.length === 0 && <p style={{ padding: 24, textAlign: 'center', color: 'var(--text-tertiary)' }}>No tasks assigned to you.</p>}
                    </div>
                </AnimatedCard>
            )}

            {/* ─── ASSIGNING TASKS ─── */}
            {tab === 'assigning' && (
                <>
                    {/* New task CTA */}
                    <div style={{ marginBottom: 16 }}>
                        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                            <Plus size={16} /> {showForm ? 'Close' : 'New Task'}
                        </button>
                    </div>

                    {showForm && (
                        <AnimatedCard delay={0} className="mb-lg">
                            <div className="card-header"><span className="card-title">Create & Assign New Task</span></div>
                            <div className="card-body">
                                <form onSubmit={handleNewTask} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                        <label className="form-label">Task Title</label>
                                        <input className="form-input" placeholder="Describe the task…" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Priority</label>
                                        <select className="form-select" value={newPriority} onChange={e => setNewPriority(e.target.value)}>
                                            <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Assign To</label>
                                        <select className="form-select" value={newAssignTo} onChange={e => setNewAssignTo(e.target.value)} required>
                                            <option value="">Select role…</option>
                                            {(ROLE_CAN_ASSIGN[role] || []).map(r => (
                                                <option key={r} value={r}>{ROLE_NAMES[r]}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <button className="btn btn-primary" type="submit"><Send size={16} /> Assign Task</button>
                                    </div>
                                </form>
                            </div>
                        </AnimatedCard>
                    )}

                    <AnimatedCard delay={0.1}>
                        <div className="card-header">
                            <span className="card-title">Tasks I've Assigned</span>
                            <span className="badge badge-info">{assigningTasks.length} tasks</span>
                        </div>
                        <div className="card-body" style={{ padding: 0 }}>
                            <table className="table">
                                <thead><tr><th>ID</th><th>Task</th><th>Assigned To</th><th>Priority</th><th>Status</th><th>Due</th></tr></thead>
                                <tbody>
                                    {assigningTasks.map(t => (
                                        <tr key={t.id}>
                                            <td style={{ fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: '0.82rem' }}>{t.id}</td>
                                            <td style={{ fontWeight: 600 }}>{t.title}</td>
                                            <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t.to}</td>
                                            <td><span className={`badge ${priorityBadge[t.priority]}`}>{t.priority}</span></td>
                                            <td><span className={`badge ${statusBadge[t.status]}`} style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>{statusIcon[t.status]} {t.status}</span></td>
                                            <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t.due}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {assigningTasks.length === 0 && <p style={{ padding: 24, textAlign: 'center', color: 'var(--text-tertiary)' }}>You have not assigned any tasks yet.</p>}
                        </div>
                    </AnimatedCard>
                </>
            )}
        </div>
    );
}
