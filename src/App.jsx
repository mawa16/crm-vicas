import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import { S } from './styles/shared';
import { T } from './styles/tokens';

import Dashboard from './pages/Dashboard';
import Chantiers from './pages/Chantiers';
import ChantierDetail from './pages/ChantierDetail';
import FicheChantier from './pages/FicheChantier';
import Clients from './pages/Clients';
import Rapports from './pages/Rapports';
import Alertes from './pages/Alertes';
import Galerie from './pages/Galerie';
import Utilisateurs from './pages/Utilisateurs';
import Parametres from './pages/Parametres';

function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Fermer si clic extérieur
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initiales = user.nom.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const roleColor = {
    'Direction':        { bg: T.blueLight,   color: T.navy   },
    'Chef de chantier': { bg: T.orangeLight,  color: '#8B3A06'},
    'Commercial':       { bg: T.greenLight,   color: T.green  },
  }[user.role] || { bg: T.grayLight, color: T.textMuted };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Bouton avatar */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: open ? T.bluePale : 'transparent',
          border: `1px solid ${open ? T.blue : T.border}`,
          borderRadius: 9, padding: '5px 10px 5px 5px',
          cursor: 'pointer', transition: 'all 0.15s',
        }}
        onMouseEnter={e => { if (!open) { e.currentTarget.style.background = T.bg; e.currentTarget.style.borderColor = T.grayMid; }}}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = T.border; }}}
      >
        {/* Avatar */}
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: `linear-gradient(135deg, ${T.navy}, ${T.blue})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
          border: `2px solid rgba(232,101,10,0.5)`,
        }}>{initiales}</div>
        {/* Nom + rôle */}
        <div style={{ textAlign: 'left', lineHeight: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.textPrimary }}>{user.nom.split(' ')[0]}</div>
          <div style={{ fontSize: 10, color: T.textMuted, marginTop: 2 }}>{user.role}</div>
        </div>
        {/* Chevron */}
        <span style={{
          fontSize: 10, color: T.textMuted, marginLeft: 2,
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s', display: 'inline-block',
        }}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: 220, background: T.white,
          border: `1px solid ${T.border}`, borderRadius: 12,
          boxShadow: '0 8px 32px rgba(15,43,91,0.14)',
          overflow: 'hidden', zIndex: 999,
          animation: 'fadeDown 0.15s ease',
        }}>
          <style>{`@keyframes fadeDown { from { opacity:0; transform:translateY(-6px);} to { opacity:1; transform:none; } }`}</style>

          {/* En-tête utilisateur */}
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${T.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: `linear-gradient(135deg, ${T.navy}, ${T.blue})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0,
                border: `2px solid rgba(232,101,10,0.5)`,
              }}>{initiales}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{user.nom}</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 1 }}>{user.email}</div>
              </div>
            </div>
            {/* Badge rôle */}
            <div style={{
              marginTop: 10,
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: roleColor.bg, color: roleColor.color,
              fontSize: 11, fontWeight: 600, padding: '3px 10px',
              borderRadius: 20,
            }}>
              { user.role === 'Direction' ? '👑' : user.role === 'Chef de chantier' ? '🏗️' : '🤝' }
              {user.role}
            </div>
          </div>

          {/* Items menu */}
          {[
            { icon: '👤', label: 'Mon profil',       action: null  },
            { icon: '⚙️', label: 'Paramètres',       action: null  },
            { icon: '🔔', label: 'Notifications',    action: null  },
          ].map((item, i) => (
            <button key={i} onClick={() => setOpen(false)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px', background: 'none', border: 'none',
              fontSize: 13, color: T.textPrimary, cursor: 'pointer', textAlign: 'left',
              transition: 'background 0.12s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = T.bg}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Séparateur */}
          <div style={{ height: 1, background: T.border, margin: '4px 0' }} />

          {/* Déconnexion */}
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px', background: 'none', border: 'none',
              fontSize: 13, color: T.red, cursor: 'pointer', textAlign: 'left',
              transition: 'background 0.12s', fontWeight: 500,
            }}
            onMouseEnter={e => e.currentTarget.style.background = T.redLight}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <span style={{ fontSize: 15 }}>🚪</span>
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={(account) => setUser(account)} />;
  }

  return (
    <BrowserRouter>
      <div style={{ display: "flex", minHeight: "100vh", background: T.bg }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Top bar */}
          <header style={{
            height: 56,
            background: T.white,
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            padding: "0 1.5rem",
            gap: 12,
            flexShrink: 0,
            boxShadow: "0 1px 4px rgba(15,43,91,0.06)",
          }}>
            {/* Indicateur en ligne */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: T.green,
                boxShadow: "0 0 0 2px rgba(30,125,58,0.2)",
              }} />
              <span style={{ fontSize: 11, color: T.textMuted }}>En ligne</span>
            </div>

            <div style={{ flex: 1 }} />

            {/* Menu utilisateur */}
            <UserMenu user={user} onLogout={() => setUser(null)} />
          </header>

          <main style={S.main}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chantiers" element={<Chantiers />} />
              <Route path="/chantiers/:id" element={<ChantierDetail />} />
              <Route path="/fiche" element={<FicheChantier />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/rapports" element={<Rapports />} />
              <Route path="/alertes" element={<Alertes />} />
              <Route path="/galerie" element={<Galerie />} />
              <Route path="/utilisateurs" element={<Utilisateurs />} />
              <Route path="/parametres" element={<Parametres />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
