import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { T } from '../styles/tokens';
import { useAuth } from '../context/AuthContext';
import { ALERTES } from '../data/mockData';

const ALL_TABS = [
  { to: "/",             label: "Tableau de bord", icon: "📊", roles: ["Direction","Administrateur","Chef de chantier","Commercial"] },
  { to: "/chantiers",    label: "Chantiers",        icon: "🏗️", roles: ["Direction","Chef de chantier","Commercial"] },
  { to: "/clients",      label: "Clients",          icon: "🤝", roles: ["Direction","Commercial"] },
  { to: "/rapports",     label: "Rapports",         icon: "📄", roles: ["Direction","Chef de chantier"] },
  { to: "/alertes",      label: "Alertes",          icon: "🔔", roles: ["Direction","Chef de chantier"] },
  { to: "/galerie",      label: "Galerie photos",   icon: "🖼️", roles: ["Direction","Chef de chantier"] },
  { to: "/utilisateurs", label: "Utilisateurs",     icon: "👥", roles: ["Administrateur"] },
  { to: "/parametres",   label: "Paramètres",       icon: "⚙️", roles: ["Direction","Administrateur","Chef de chantier","Commercial"] },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const alertCount = ALERTES.filter(a => !a.lue).length;
  const W = collapsed ? 64 : 224;

  const tabs = ALL_TABS.filter(t => t.roles.includes(user?.role));

  return (
    <aside style={{
      width: W, minHeight: "100vh",
      background: T.sidebarBg,
      display: "flex", flexDirection: "column",
      transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
      overflow: "visible", flexShrink: 0,
      position: "relative", zIndex: 50,
      boxShadow: "2px 0 16px rgba(15,43,91,0.18)",
    }}>
      {/* Logo */}
      <div style={{
        height: 64, display: "flex", alignItems: "center",
        padding: collapsed ? "0 12px" : "0 16px",
        borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0, overflow: "hidden",
      }}>
        <img src="/logo-vicas.png" alt="VICAS" style={{ height: 38, width: "auto", flexShrink: 0, objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }} />
        <div style={{ marginLeft: 10, opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto", overflow: "hidden", transition: "opacity 0.2s ease, width 0.25s ease", whiteSpace: "nowrap" }}>
          <div style={{ fontSize: 10, color: T.orangeMid, fontWeight: 600, letterSpacing: "0.14em" }}>CRM</div>
        </div>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div style={{ padding: "10px 16px 4px", overflow: "hidden" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "rgba(232,101,10,0.15)", color: T.orangeMid,
            fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
            border: "1px solid rgba(232,101,10,0.25)", letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}>
            {user?.role === 'Direction' ? '👑' : user?.role === 'Chef de chantier' ? '🏗️' : user?.role === 'Commercial' ? '🤝' : '🛡️'}
            {' '}{user?.role}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto", overflowX: "clip" }}>
        {tabs.map(t => (
          <NavLink key={t.to} to={t.to} end={t.to === "/"} title={collapsed ? t.label : undefined}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: 10,
              padding: collapsed ? "10px 0" : "9px 10px",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius: 9, marginBottom: 2, textDecoration: "none",
              color: isActive ? "#FFFFFF" : T.sidebarText,
              background: isActive ? "linear-gradient(90deg, #1E5BB8 0%, #1A3F7A 100%)" : "transparent",
              borderLeft: isActive ? `3px solid ${T.orange}` : "3px solid transparent",
              fontWeight: isActive ? 600 : 400, fontSize: 13,
              transition: "all 0.15s", position: "relative", overflow: "hidden",
            })}>
            {({ isActive }) => (<>
              <span style={{ fontSize: 17, flexShrink: 0, opacity: isActive ? 1 : 0.75 }}>{t.icon}</span>
              <span style={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto", overflow: "hidden", transition: "opacity 0.18s ease, width 0.25s ease", whiteSpace: "nowrap" }}>{t.label}</span>
              {t.to === "/alertes" && alertCount > 0 && !collapsed && (
                <span style={{ marginLeft: "auto", background: T.orange, color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 10, flexShrink: 0 }}>{alertCount}</span>
              )}
              {t.to === "/alertes" && alertCount > 0 && collapsed && (
                <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: T.orange, border: `2px solid ${T.sidebarBg}` }} />
              )}
            </>)}
          </NavLink>
        ))}
      </nav>

      {/* User info bas */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: collapsed ? "14px 0" : "14px 12px",
        display: "flex", alignItems: "center", gap: 10,
        justifyContent: collapsed ? "center" : "flex-start", overflow: "hidden",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #1E5BB8, #0F2B5B)",
          border: "2px solid rgba(232,101,10,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0,
        }}>{user?.nom?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}</div>
        <div style={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto", overflow: "hidden", transition: "opacity 0.18s ease, width 0.25s ease", whiteSpace: "nowrap" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{user?.nom?.split(' ')[0]} {user?.nom?.split(' ')[1]}</div>
          <div style={{ fontSize: 10, color: T.sidebarText, marginTop: 1 }}>{user?.email}</div>
        </div>
      </div>

      {/* Toggle button */}
      <button onClick={() => setCollapsed(c => !c)} title={collapsed ? "Déployer" : "Réduire"}
        style={{
          position: "absolute", top: "50%", right: -14, transform: "translateY(-50%)",
          width: 28, height: 28, borderRadius: "50%",
          background: T.orange, border: `3px solid #ffffff`, color: "#fff",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 900,
          boxShadow: "0 2px 10px rgba(232,101,10,0.6), 0 0 0 1px rgba(232,101,10,0.3)",
          zIndex: 100, lineHeight: 1, padding: 0, transition: "background 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#F27C2A"}
        onMouseLeave={e => e.currentTarget.style.background = T.orange}
      >{collapsed ? "›" : "‹"}</button>
    </aside>
  );
}
