import { useState } from 'react';
import { MapPin, Star, Calendar, ArrowRight, Users, Shield, Zap, BarChart3, Globe, Building2 } from 'lucide-react';
import LoginPage from './LoginPage';

const features = [
    { icon: <Shield size={28} />, title: 'Role-Based Access', desc: 'Tailored dashboards for CEO, HR, Sprint Master, Scrum Master, Developer & DevOps.' },
    { icon: <Zap size={28} />, title: 'Real-Time Insights', desc: 'Live KPIs, execution health, and sprint velocity metrics at your fingertips.' },
    { icon: <BarChart3 size={28} />, title: 'Advanced Analytics', desc: 'Interactive charts, trend analysis, and data-driven decision making.' },
    { icon: <Users size={28} />, title: 'Team Management', desc: 'Hierarchical task delegation, workload tracking, and performance reviews.' },
    { icon: <Globe size={28} />, title: 'Multi-Branch', desc: 'Seamlessly manage operations across multiple offices and regions.' },
    { icon: <Building2 size={28} />, title: 'Enterprise Ready', desc: 'Two-layer authentication, audit trails, and compliance-first design.' },
];

const events = [
    { title: 'Annual Tech Summit 2026', date: 'Jan 15, 2026', location: 'Hyderabad HQ', color: '#c0392b' },
    { title: 'Hackathon – Innovation Week', date: 'Feb 01, 2026', location: 'Bangalore Office', color: '#3b82f6' },
    { title: 'Employee Recognition Gala', date: 'Dec 20, 2025', location: 'Mumbai Office', color: '#10b981' },
    { title: 'Leadership Workshop', date: 'Nov 10, 2025', location: 'Delhi Office', color: '#f59e0b' },
];

const branches = [
    { city: 'Hyderabad', type: 'Headquarters', employees: 450, address: 'HITEC City, Madhapur' },
    { city: 'Bangalore', type: 'Engineering Hub', employees: 320, address: 'Electronic City, Phase 1' },
    { city: 'Mumbai', type: 'Regional Office', employees: 180, address: 'BKC, Bandra East' },
    { city: 'Delhi NCR', type: 'Regional Office', employees: 150, address: 'Cyber City, Gurgaon' },
    { city: 'Pune', type: 'Development Center', employees: 200, address: 'Hinjewadi IT Park' },
    { city: 'Chennai', type: 'Support Center', employees: 120, address: 'Tidel Park, Taramani' },
];

const institutionalImages = [
    { title: 'Modern Workspaces', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { title: 'Collaboration Zones', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { title: 'Innovation Labs', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { title: 'Training Centers', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
];

const eventPhotos = [
    { title: 'Tech Summit 2026', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { title: 'Hackathon Finals', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { title: 'Team Building', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { title: 'Award Ceremony', gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' },
    { title: 'Cultural Night', gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' },
    { title: 'Sports Day', gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)' },
];

export default function HomePage() {
    return (
        <div className="home-page">
            {/* ─── HERO SECTION ─── */}
            <section className="home-hero">
                {/* Left: Company Brand */}
                <div className="home-hero-left">
                    <div className="home-hero-logo">
                        <div className="home-logo-icon">EO</div>
                        <div>
                            <div className="home-logo-sub">Company Portal</div>
                            <div className="home-logo-name">Executable Org</div>
                        </div>
                    </div>
                    <h1 className="home-hero-heading">
                        Empowering Teams.<br />
                        <span className="home-hero-accent">Executing Excellence.</span>
                    </h1>
                    <p className="home-hero-desc">
                        A unified role-based platform for managing sprints, teams, and organizational intelligence.
                        Trusted by <strong>1,400+ professionals</strong> across 6 branches nationwide.
                    </p>
                    <div className="home-hero-stats">
                        <div className="home-hero-stat"><span className="home-stat-value">1,420</span><span className="home-stat-label">Employees</span></div>
                        <div className="home-hero-stat"><span className="home-stat-value">6</span><span className="home-stat-label">Offices</span></div>
                        <div className="home-hero-stat"><span className="home-stat-value">99.9%</span><span className="home-stat-label">Uptime</span></div>
                        <div className="home-hero-stat"><span className="home-stat-value">50+</span><span className="home-stat-label">Active Sprints</span></div>
                    </div>
                </div>

                {/* Right: Login */}
                <div className="home-hero-right">
                    <LoginPage />
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="home-section" id="features">
                <h2 className="home-section-title">Platform Features</h2>
                <p className="home-section-subtitle">Everything you need to manage your organization efficiently</p>
                <div className="home-features-grid">
                    {features.map((f, i) => (
                        <div key={i} className="home-feature-card" style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="home-feature-icon">{f.icon}</div>
                            <h3 className="home-feature-title">{f.title}</h3>
                            <p className="home-feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── INSTITUTIONAL IMAGES ─── */}
            <section className="home-section home-section-dark" id="campus">
                <h2 className="home-section-title">Our Workspaces</h2>
                <p className="home-section-subtitle">State-of-the-art facilities designed for collaboration and innovation</p>
                <div className="home-image-grid">
                    {institutionalImages.map((img, i) => (
                        <div key={i} className="home-image-card" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="home-image-placeholder" style={{ background: img.gradient }}>
                                <Building2 size={40} style={{ opacity: 0.4 }} />
                            </div>
                            <div className="home-image-label">{img.title}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── EVENT GALLERY ─── */}
            <section className="home-section" id="events">
                <h2 className="home-section-title">Events & Culture</h2>
                <p className="home-section-subtitle">Celebrating milestones and building community together</p>

                {/* Event Schedule */}
                <div className="home-events-list">
                    {events.map((ev, i) => (
                        <div key={i} className="home-event-item" style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="home-event-dot" style={{ background: ev.color }}></div>
                            <div className="home-event-info">
                                <div className="home-event-title">{ev.title}</div>
                                <div className="home-event-meta">
                                    <Calendar size={13} /> {ev.date} &nbsp;·&nbsp; <MapPin size={13} /> {ev.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Event Photos */}
                <h3 className="home-subsection-title">Event Gallery</h3>
                <div className="home-photo-grid">
                    {eventPhotos.map((p, i) => (
                        <div key={i} className="home-photo-card" style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="home-photo-placeholder" style={{ background: p.gradient }}>
                                <Star size={28} style={{ opacity: 0.3 }} />
                            </div>
                            <span className="home-photo-label">{p.title}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── BRANCHES ─── */}
            <section className="home-section home-section-dark" id="branches">
                <h2 className="home-section-title">Our Branches</h2>
                <p className="home-section-subtitle">Presence across major cities in India</p>
                <div className="home-branches-grid">
                    {branches.map((b, i) => (
                        <div key={i} className="home-branch-card" style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="home-branch-header">
                                <MapPin size={18} className="home-branch-pin" />
                                <div>
                                    <div className="home-branch-city">{b.city}</div>
                                    <div className="home-branch-type">{b.type}</div>
                                </div>
                            </div>
                            <div className="home-branch-details">
                                <span>{b.address}</span>
                                <span className="home-branch-emp">{b.employees} employees</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="home-footer">
                <div className="home-footer-inner">
                    <div className="home-footer-brand">
                        <span className="home-logo-icon" style={{ width: 36, height: 36, fontSize: '0.85rem' }}>EO</span>
                        <span style={{ fontWeight: 700 }}>Executable Org</span>
                    </div>
                    <div className="home-footer-copy">
                        © 2026 Executable Org Pvt. Ltd. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
