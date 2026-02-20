import { useState } from 'react';
import AnimatedCard from '../../components/AnimatedCard';
import StatsCard from '../../components/StatsCard';
import { FolderPlus, Folder, Users, Clock, CheckCircle, Play, Pause, X, Filter, Edit2, Trash2 } from 'lucide-react';

const availablePMs = [
    { id: 1, name: 'Arjun Patel' },
    { id: 2, name: 'Neha Gupta' },
    { id: 3, name: 'Rohit Sharma' },
];

const sprintOptions = ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6'];

const initialProjects = [
    { id: 1, name: 'Sprint Alpha', description: 'Core platform features including authentication, user management, and role-based access control.', client: 'Exactiomark Internal', sprint: 'Sprint 4', assignedPM: 'Arjun Patel', status: 'Active', createdDate: 'Jan 15, 2026', members: 6 },
    { id: 2, name: 'Sprint Beta', description: 'Payment integration module with Stripe and Razorpay gateways for subscription management.', client: 'FinTech Solutions Pvt Ltd', sprint: 'Sprint 3', assignedPM: 'Neha Gupta', status: 'Active', createdDate: 'Jan 22, 2026', members: 5 },
    { id: 3, name: 'Sprint Gamma', description: 'DevOps automation pipeline — CI/CD, infrastructure-as-code, and monitoring dashboards.', client: 'CloudNine Enterprises', sprint: 'Sprint 2', assignedPM: 'Arjun Patel', status: 'On Hold', createdDate: 'Feb 01, 2026', members: 3 },
    { id: 4, name: 'Sprint Delta', description: 'Mobile-first responsive redesign of the customer-facing portal with PWA support.', client: 'RetailMax Corp', sprint: 'Sprint 1', assignedPM: 'Rohit Sharma', status: 'Completed', createdDate: 'Dec 10, 2025', members: 7 },
];

const statusColors = { Active: '#10b981', 'On Hold': '#f59e0b', Completed: '#3b82f6', Cancelled: '#ef4444' };

export default function CEOProjects() {
    const [projects, setProjects] = useState(initialProjects);
    const [showForm, setShowForm] = useState(false);
    const [statusFilter, setStatusFilter] = useState('All');
    const [newProject, setNewProject] = useState({ name: '', description: '', client: '', sprint: '', assignedPM: '' });

    const filteredProjects = statusFilter === 'All' ? projects : projects.filter(p => p.status === statusFilter);

    const handleAddProject = (e) => {
        e.preventDefault();
        const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const project = {
            id: Date.now(),
            ...newProject,
            status: 'Active',
            createdDate: today,
            members: 0,
        };
        setProjects(prev => [project, ...prev]);
        setNewProject({ name: '', description: '', client: '', sprint: '', assignedPM: '' });
        setShowForm(false);
    };

    const handleStatusChange = (id, newStatus) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    };

    const handleRemove = (id) => {
        setProjects(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div>
            <div className="stats-grid mb-lg">
                <StatsCard icon={<Folder size={24} />} value={projects.length} label="Total Projects" color="blue" delay={0} />
                <StatsCard icon={<Play size={24} />} value={projects.filter(p => p.status === 'Active').length} label="Active" color="green" delay={0.08} />
                <StatsCard icon={<Pause size={24} />} value={projects.filter(p => p.status === 'On Hold').length} label="On Hold" color="orange" delay={0.16} />
                <StatsCard icon={<CheckCircle size={24} />} value={projects.filter(p => p.status === 'Completed').length} label="Completed" color="purple" delay={0.24} />
            </div>

            <AnimatedCard delay={0.3}>
                <div className="card-header">
                    <span className="card-title">Projects</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Filter size={16} color="var(--text-tertiary)" />
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                            style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}>
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <button className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => setShowForm(!showForm)}>
                            {showForm ? <X size={14} /> : <FolderPlus size={14} />} {showForm ? 'Close' : 'New Project'}
                        </button>
                    </div>
                </div>

                {/* New Project Form */}
                {showForm && (
                    <div className="card-body" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <form onSubmit={handleAddProject} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div className="form-group">
                                <label className="form-label">Project Name *</label>
                                <input className="form-input" placeholder="e.g. Sprint Epsilon" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Client *</label>
                                <input className="form-input" placeholder="e.g. Acme Corp" value={newProject.client} onChange={e => setNewProject({ ...newProject, client: e.target.value })} required />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label className="form-label">Project Description *</label>
                                <textarea className="form-input" rows={3} placeholder="Describe the project scope, goals, and deliverables…" value={newProject.description}
                                    onChange={e => setNewProject({ ...newProject, description: e.target.value })} required
                                    style={{ resize: 'vertical', minHeight: 60 }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Sprint *</label>
                                <select className="form-select" value={newProject.sprint} onChange={e => setNewProject({ ...newProject, sprint: e.target.value })} required>
                                    <option value="">Select Sprint</option>
                                    {sprintOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Assign to Project Manager *</label>
                                <select className="form-select" value={newProject.assignedPM} onChange={e => setNewProject({ ...newProject, assignedPM: e.target.value })} required>
                                    <option value="">Select PM</option>
                                    {availablePMs.map(pm => <option key={pm.id} value={pm.name}>{pm.name}</option>)}
                                </select>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <button className="btn btn-primary" type="submit"><FolderPlus size={16} /> Create Project</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Projects Table */}
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Description</th>
                                    <th>Client</th>
                                    <th>Sprint</th>
                                    <th>Assigned PM</th>
                                    <th>Members</th>
                                    <th>Created</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map(p => (
                                    <tr key={p.id}>
                                        <td style={{ fontWeight: 700, fontSize: '0.85rem' }}>{p.name}</td>
                                        <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: 240 }}>{p.description}</td>
                                        <td style={{ fontSize: '0.82rem' }}>{p.client}</td>
                                        <td><span className="badge badge-info">{p.sprint}</span></td>
                                        <td style={{ fontWeight: 600, fontSize: '0.82rem' }}>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                                <Users size={12} color="var(--text-tertiary)" /> {p.assignedPM}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{p.members}</td>
                                        <td style={{ fontSize: '0.8rem' }}>{p.createdDate}</td>
                                        <td>
                                            <select value={p.status} onChange={e => handleStatusChange(p.id, e.target.value)}
                                                style={{
                                                    padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.78rem',
                                                    fontWeight: 600, color: statusColors[p.status], background: `${statusColors[p.status]}10`
                                                }}>
                                                <option value="Active">Active</option>
                                                <option value="On Hold">On Hold</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-secondary" title="Remove" onClick={() => handleRemove(p.id)} style={{ padding: '4px 8px', color: '#ef4444' }}>
                                                <Trash2 size={13} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProjects.length === 0 && (
                                    <tr><td colSpan={9} style={{ textAlign: 'center', padding: 32, color: 'var(--text-tertiary)' }}>No projects found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AnimatedCard>
        </div>
    );
}
