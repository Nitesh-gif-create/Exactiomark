import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS } from '../../data/navigation';
import AnimatedCard from '../../components/AnimatedCard';
import { Mail, Building, Shield, Calendar, MapPin, Phone } from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuth();
    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <AnimatedCard delay={0}>
                <div className="card-body" style={{ textAlign: 'center', padding: '48px 24px 24px' }}>
                    <div style={{
                        width: 90, height: 90, borderRadius: '50%', background: 'var(--brand-gradient)',
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.8rem', fontWeight: 800, margin: '0 auto 16px'
                    }}>{user?.avatar}</div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{user?.name}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{ROLE_LABELS[user?.role] || user?.role}</p>
                </div>
            </AnimatedCard>

            <div className="grid-2 mt-lg">
                <AnimatedCard delay={0.15}>
                    <div className="card-header"><span className="card-title">Contact Info</span></div>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Mail size={18} color="var(--text-tertiary)" /><div><div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Email</div><div style={{ fontWeight: 600 }}>{user?.email}</div></div></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Building size={18} color="var(--text-tertiary)" /><div><div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Department</div><div style={{ fontWeight: 600 }}>{user?.department}</div></div></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Shield size={18} color="var(--text-tertiary)" /><div><div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Role</div><div style={{ fontWeight: 600 }}>{user?.role}</div></div></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Phone size={18} color="var(--text-tertiary)" /><div><div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Phone</div><div style={{ fontWeight: 600 }}>+91 98765 43210</div></div></div>
                    </div>
                </AnimatedCard>
                <AnimatedCard delay={0.25}>
                    <div className="card-header"><span className="card-title">Activity</span></div>
                    <div className="card-body">
                        <div className="timeline">
                            <div className="timeline-item"><div className="timeline-item-title">Logged in</div><div className="timeline-item-time">Just now</div></div>
                            <div className="timeline-item"><div className="timeline-item-title">Updated profile settings</div><div className="timeline-item-time">2 days ago</div></div>
                            <div className="timeline-item"><div className="timeline-item-title">Completed security training</div><div className="timeline-item-time">1 week ago</div></div>
                            <div className="timeline-item"><div className="timeline-item-title">Joined Executable Org</div><div className="timeline-item-time">3 months ago</div></div>
                        </div>
                    </div>
                </AnimatedCard>
            </div>
        </div>
    );
}
