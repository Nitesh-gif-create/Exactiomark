import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

/* ── Company-wide password (same for all employees) ── */
const COMPANY_PASSWORD = 'execorg2026';

/* ── Mock Users (one per role) ── */
const MOCK_USERS = [
    { id: 'CEO001', password: 'ceo@123', name: 'Rajesh Mehta', role: 'CEO', email: 'rajesh@executableorg.com', department: 'Executive', avatar: 'RM' },
    { id: 'HR001', password: 'hr@123', name: 'Priya Sharma', role: 'HR', email: 'priya@executableorg.com', department: 'Human Resources', avatar: 'PS' },
    { id: 'PM001', password: 'pm@123', name: 'Arjun Patel', role: 'PM', email: 'arjun@executableorg.com', department: 'Sprint Mgmt', avatar: 'AP' },
    { id: 'LEAD001', password: 'lead@123', name: 'Sneha Iyer', role: 'LEAD', email: 'sneha@executableorg.com', department: 'Engineering', avatar: 'SI' },
    { id: 'DEV001', password: 'dev@123', name: 'Vikram Singh', role: 'DEVELOPER', email: 'vikram@executableorg.com', department: 'Engineering', avatar: 'VS' },
    { id: 'OPS001', password: 'ops@123', name: 'Ananya Reddy', role: 'DEVOPS', email: 'ananya@executableorg.com', department: 'Infrastructure', avatar: 'AR' },
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem('exec_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = (userId, companyPwd, personalPwd) => {
        /* Step 1 – validate company password */
        if (companyPwd !== COMPANY_PASSWORD) {
            return { success: false, error: 'Invalid company password.' };
        }
        /* Step 2 – find user by ID + personal password */
        const found = MOCK_USERS.find(
            u => u.id.toLowerCase() === userId.trim().toLowerCase() && u.password === personalPwd
        );
        if (!found) return { success: false, error: 'Invalid User ID or personal password.' };
        const { password: _, ...safeUser } = found;
        setUser(safeUser);
        sessionStorage.setItem('exec_user', JSON.stringify(safeUser));
        return { success: true, user: safeUser };
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('exec_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}

export { MOCK_USERS, COMPANY_PASSWORD };
