import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import { S } from './styles/shared';
import { T } from './styles/tokens';

import Dashboard    from './pages/Dashboard';
import Chantiers    from './pages/Chantiers';
import ChantierDetail from './pages/ChantierDetail';
import FicheChantier  from './pages/FicheChantier';
import Clients      from './pages/Clients';
import Rapports     from './pages/Rapports';
import Alertes      from './pages/Alertes';
import Galerie      from './pages/Galerie';
import Utilisateurs from './pages/Utilisateurs';
import Parametres   from './pages/Parametres';
import MonProfil    from './pages/MonProfil';
import Notifications from './pages/Notifications';

// ─── USER MENU ───────────────────────────────────────────────────────────────
function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  if (!user) return null;
  const initiales = user.nom.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
  const go = (path) => { setOpen(false); navigate(path); };

  const roleColors = {
    'Direction':        { bg: T.blueLight,   color: T.navy    },
    'Administrateur':   { bg: T.purpleLight,  color: T.purple  },
    'Chef de chantier': { bg: T.orangeLight,  color: '#8B3A06' },
    'Commercial':       { bg: T.greenLight,   color: T.green   },
  };
  const rc = roleColors[user.role] || { bg: T.grayLight, color: T.textMuted };
  const roleIcon = { 'Direction':'👑','Administrateur':'🛡️','Chef de chantier':'🏗️','Commercial':'🤝' }[user.role] || '👤';

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display:'flex', alignItems:'center', gap:8,
        background: open ? T.bluePale : 'transparent',
        border:`1px solid ${open ? T.blue : T.border}`,
        borderRadius:9, padding:'5px 10px 5px 5px', cursor:'pointer', transition:'all 0.15s',
      }}>
        <div style={{ width:30, height:30, borderRadius:'50%', background:`linear-gradient(135deg,${T.navy},${T.blue})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff', border:`2px solid rgba(232,101,10,0.5)` }}>{initiales}</div>
        <div style={{ textAlign:'left', lineHeight:1 }}>
          <div style={{ fontSize:12, fontWeight:600, color:T.textPrimary }}>{user.nom.split(' ')[0]}</div>
          <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{user.role}</div>
        </div>
        <span style={{ fontSize:10, color:T.textMuted, marginLeft:2, transform:open?'rotate(180deg)':'none', transition:'transform 0.2s', display:'inline-block' }}>▾</span>
      </button>

      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:230, background:T.white, border:`1px solid ${T.border}`, borderRadius:12, boxShadow:'0 8px 32px rgba(15,43,91,0.14)', overflow:'hidden', zIndex:999, animation:'fadeDown 0.15s ease' }}>
          <style>{`@keyframes fadeDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}`}</style>

          {/* Header */}
          <div style={{ padding:'14px 16px', borderBottom:`1px solid ${T.border}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:`linear-gradient(135deg,${T.navy},${T.blue})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'#fff', border:`2px solid rgba(232,101,10,0.5)` }}>{initiales}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:T.textPrimary }}>{user.nom}</div>
                <div style={{ fontSize:11, color:T.textMuted, marginTop:1 }}>{user.email}</div>
              </div>
            </div>
            <div style={{ marginTop:10, display:'inline-flex', alignItems:'center', gap:4, background:rc.bg, color:rc.color, fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20 }}>
              {roleIcon} {user.role}
            </div>
          </div>

          {/* Links */}
          {[
            { icon:'👤', label:'Mon profil',    path:'/profil'         },
            { icon:'🔔', label:'Notifications', path:'/notifications'  },
            { icon:'⚙️', label:'Paramètres',    path:'/parametres'     },
          ].map((item,i) => (
            <button key={i} onClick={() => go(item.path)} style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px 16px', background:'none', border:'none', fontSize:13, color:T.textPrimary, cursor:'pointer', textAlign:'left', transition:'background 0.12s' }}
              onMouseEnter={e => e.currentTarget.style.background = T.bg}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              <span style={{ fontSize:15 }}>{item.icon}</span>{item.label}
            </button>
          ))}

          <div style={{ height:1, background:T.border, margin:'4px 0' }} />
          <button onClick={() => { setOpen(false); logout(); }} style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px 16px', background:'none', border:'none', fontSize:13, color:T.red, cursor:'pointer', textAlign:'left', fontWeight:500, transition:'background 0.12s' }}
            onMouseEnter={e => e.currentTarget.style.background = T.redLight}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <span style={{ fontSize:15 }}>🚪</span> Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}

// ─── APP LAYOUT ──────────────────────────────────────────────────────────────
function AppLayout() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:T.bg }}>
      <Sidebar />
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <header style={{ height:56, background:T.white, borderBottom:`1px solid ${T.border}`, display:'flex', alignItems:'center', padding:'0 1.5rem', gap:12, flexShrink:0, boxShadow:'0 1px 4px rgba(15,43,91,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:T.green, boxShadow:'0 0 0 2px rgba(30,125,58,0.2)' }} />
            <span style={{ fontSize:11, color:T.textMuted }}>En ligne</span>
          </div>
          <div style={{ flex:1 }} />
          <UserMenu />
        </header>

        <main style={S.main}>
          <Routes>
            <Route path="/" element={<ProtectedRoute action="voir_dashboard"><Dashboard /></ProtectedRoute>} />
            <Route path="/chantiers" element={<ProtectedRoute action="voir_chantiers"><Chantiers /></ProtectedRoute>} />
            <Route path="/chantiers/:id" element={<ProtectedRoute action="voir_chantiers"><ChantierDetail /></ProtectedRoute>} />
            <Route path="/fiche" element={<ProtectedRoute action="voir_fiche"><FicheChantier /></ProtectedRoute>} />
            <Route path="/clients" element={<ProtectedRoute action="voir_clients"><Clients /></ProtectedRoute>} />
            <Route path="/rapports" element={<ProtectedRoute action="voir_rapports"><Rapports /></ProtectedRoute>} />
            <Route path="/alertes" element={<ProtectedRoute action="voir_alertes"><Alertes /></ProtectedRoute>} />
            <Route path="/galerie" element={<ProtectedRoute action="voir_galerie"><Galerie /></ProtectedRoute>} />
            <Route path="/utilisateurs" element={<ProtectedRoute action="voir_utilisateurs"><Utilisateurs /></ProtectedRoute>} />
            <Route path="/parametres" element={<ProtectedRoute action="voir_parametres"><Parametres /></ProtectedRoute>} />
            <Route path="/profil" element={<MonProfil />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<ProtectedRoute action="voir_dashboard"><Dashboard /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
function Root() {
  const { user, login } = useAuth();
  if (!user) return <Login onLogin={login} />;
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
