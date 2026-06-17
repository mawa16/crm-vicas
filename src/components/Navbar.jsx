import { NavLink } from 'react-router-dom';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { ALERTES } from '../data/mockData';

const TABS = [
  { to: "/",              label: "Tableau de bord", icon: "📊" },
  { to: "/chantiers",     label: "Chantiers",        icon: "🏗️" },
  { to: "/fiche",         label: "Fiche chantier",   icon: "📋" },
  { to: "/clients",       label: "Clients",          icon: "🤝" },
  { to: "/rapports",      label: "Rapports",         icon: "📄" },
  { to: "/alertes",       label: "Alertes",          icon: "🔔" },
  { to: "/galerie",       label: "Galerie photos",   icon: "🖼️" },
  { to: "/utilisateurs",  label: "Utilisateurs",     icon: "👥" },
  { to: "/parametres",    label: "Paramètres",       icon: "⚙️" },
];

const navStyle = {
  background: T.white,
  borderBottom: `1px solid ${T.border}`,
  display: "flex",
  alignItems: "center",
  padding: "0 1.25rem",
  height: 52,
  position: "sticky",
  top: 0,
  zIndex: 100,
  gap: 4,
  overflowX: "auto",
};
 
const tabStyle = (active) => ({
  padding: "0 12px",
  height: 52,
  display: "flex",
  alignItems: "center",
  fontSize: 13,
  fontWeight: active ? 500 : 400,
  color: active ? T.teal : T.textMuted,
  borderBottom: active ? `2px solid ${T.teal}` : "2px solid transparent",
  cursor: "pointer",
  gap: 6,
  background: "none",
  border: "none",
  whiteSpace: "nowrap",
  textDecoration: "none",
});

export default function Navbar() {
  const alertCount = ALERTES.filter(a => !a.lue).length;

  return (
    <nav style={navStyle} aria-label="Navigation principale">
      <div style={{
        fontWeight: 700, fontSize: 16, color: T.tealDark, letterSpacing: "-0.02em",
        marginRight: 12, paddingRight: 16, borderRight: `1px solid ${T.border}`, flexShrink: 0
      }}>
        VICAS <span style={{ color: T.teal, fontWeight: 400 }}>CRM</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        {TABS.map(t => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.to === "/"}
            style={({ isActive }) => tabStyle(isActive)}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            {t.to === "/alertes" && alertCount > 0 && (
              <span style={{ ...S.badge(T.white, T.red), fontSize: 10, padding: "1px 5px" }}>{alertCount}</span>
            )}
          </NavLink>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 12, flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: T.textMuted }}>Direction Générale</div>
        <div style={S.avatar(T.tealLight, T.tealDark)}>DG</div>
      </div>
    </nav>
  );
}
