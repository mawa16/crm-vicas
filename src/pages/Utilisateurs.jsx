import { useState, useEffect } from 'react';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { useAuth } from '../context/AuthContext';
import { USERS } from '../data/mockData';
import { users as usersApi } from '../services/api';
import { Loading, ApiError } from '../components/ApiState';

const ROLES = ['Direction', 'Administrateur', 'Chef de chantier', 'Commercial'];

const ROLE_STYLE = {
  'Direction':        { bg: T.blueLight,   color: T.navy,    icon: '👑' },
  'Administrateur':   { bg: T.purpleLight,  color: T.purple,  icon: '🛡️' },
  'Chef de chantier': { bg: T.orangeLight,  color: '#8B3A06', icon: '🏗️' },
  'Commercial':       { bg: T.greenLight,   color: T.green,   icon: '🤝' },
};

export default function Utilisateurs() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState(USERS);
  const [apiError, setApiError] = useState(null);
  const [apiLoading, setApiLoading] = useState(true);

  useEffect(() => {
    usersApi.list()
      .then(data => setUsers(data))
      .catch(err => { setApiError(err.message); })
      .finally(() => setApiLoading(false));
  }, []);
  const [search, setSearch] = useState('');
  const [filtreRole, setFiltreRole] = useState('tous');
  const [modal, setModal] = useState(null); // null | 'create' | 'edit' | 'delete' | 'desactiver'
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ nom:'', email:'', role:'Chef de chantier', actif:true });
  const [saved, setSaved] = useState('');

  const filtered = users.filter(u => {
    const matchSearch = u.nom.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filtreRole === 'tous' || u.role === filtreRole;
    return matchSearch && matchRole;
  });

  const notif = (msg) => { setSaved(msg); setTimeout(() => setSaved(''), 3000); };

  const handleCreate = async () => {
    if (!form.nom || !form.email) return;
    try {
      const newUser = await usersApi.create({ name: form.nom, email: form.email, role: form.role, password: 'vicas2025' });
      setUsers(us => [...us, { ...newUser, nom: newUser.name || form.nom, initiales: form.nom.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(), actif: true }]);
      notif(`✅ Compte de ${form.nom} créé.`);
    } catch {
      const initiales = form.nom.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
      setUsers(us => [...us, { id: Date.now(), nom: form.nom, email: form.email, role: form.role, initiales, bg: T.blueLight, color: T.navy, actif: true }]);
      notif(`✅ Compte de ${form.nom} créé (mode démo).`);
    }
    setModal(null);
  };

  const handleEdit = async () => {
    try {
      await usersApi.update(selected.id, { name: form.nom, email: form.email, role: form.role });
    } catch (_) {}
    setUsers(us => us.map(u => u.id === selected.id ? { ...u, nom: form.nom, email: form.email, role: form.role } : u));
    setModal(null);
    notif(`✅ Compte de ${form.nom} mis à jour.`);
  };

  const handleDelete = async () => {
    try { await usersApi.delete(selected.id); } catch (_) {}
    setUsers(us => us.filter(u => u.id !== selected.id));
    setModal(null);
    notif(`🗑️ Compte de ${selected.nom} supprimé.`);
  };

  const toggleActif = async (u) => {
    try { await usersApi.toggleActive(u.id); } catch (_) {}
    setUsers(us => us.map(x => x.id === u.id ? { ...x, actif: !x.actif } : x));
    notif(`${!u.actif ? '✅ Activé' : '🔒 Désactivé'} : ${u.nom}`);
  };

  const setRole = async (u, role) => {
    try { await usersApi.update(u.id, { role }); } catch (_) {}
    setUsers(us => us.map(x => x.id === u.id ? { ...x, role } : x));
    notif(`✅ Rôle de ${u.nom} → ${role}`);
  };

  const openCreate = () => {
    setForm({ nom:'', email:'', role:'Chef de chantier', actif:true });
    setSelected(null); setModal('create');
  };

  const openEdit = (u) => {
    setForm({ nom: u.nom, email: u.email, role: u.role, actif: u.actif });
    setSelected(u); setModal('edit');
  };

  const openDelete = (u) => { setSelected(u); setModal('delete'); };

  const inpStyle = { width:'100%', padding:'10px 12px', fontSize:13, borderRadius:8, border:`1.5px solid ${T.border}`, background:T.white, color:T.textPrimary, outline:'none', boxSizing:'border-box' };

  if (apiLoading) return <Loading message="Chargement des utilisateurs…" />;

  return (
    <div>
      <ApiError error={apiError} />
      <div style={S.pageTitle}>Gestion des utilisateurs</div>
      <div style={S.pageSub}>Administration des comptes — {users.length} utilisateurs</div>

      {saved && (
        <div style={{ background:T.greenLight, border:`1px solid #B0DDB8`, borderRadius:9, padding:'10px 14px', marginBottom:14, fontSize:13, color:T.green, display:'flex', alignItems:'center', gap:8 }}>
          {saved}
        </div>
      )}

      {/* Stats */}
      <div style={{ ...S.grid4, marginBottom:'1.25rem' }}>
        {[
          { val: users.length,                                          lbl:'Total',       color:T.navy,   bg:T.blueLight   },
          { val: users.filter(u=>u.actif).length,                       lbl:'Actifs',      color:T.green,  bg:T.greenLight  },
          { val: users.filter(u=>!u.actif).length,                      lbl:'Désactivés',  color:T.red,    bg:T.redLight    },
          { val: users.filter(u=>u.role==='Chef de chantier').length,   lbl:'Chefs chant.',color:T.orange, bg:T.orangeLight },
        ].map((s,i) => (
          <div key={i} style={{ ...S.metric, borderLeft:`4px solid ${s.color}` }}>
            <div style={{ ...S.metricValue, color:s.color, fontSize:28 }}>{s.val}</div>
            <div style={S.metricLabel}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display:'flex', gap:10, marginBottom:'1rem', flexWrap:'wrap', alignItems:'center' }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Rechercher un utilisateur…" style={{ ...S.input, maxWidth:260 }} />
        <div style={{ display:'flex', gap:6 }}>
          {['tous', ...ROLES].map(r => (
            <button key={r} onClick={() => setFiltreRole(r)} style={S.filterBtn(filtreRole===r)}>
              {r === 'tous' ? 'Tous' : r}
            </button>
          ))}
        </div>
        <div style={{ flex:1 }} />
        <button onClick={openCreate} style={S.btn('primary')}>+ Créer un compte</button>
      </div>

      {/* Table */}
      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>
              {['Utilisateur','Email','Rôle','Statut','Actions'].map(h => (
                <th key={h} style={S.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const rs = ROLE_STYLE[u.role] || { bg:T.grayLight, color:T.textMuted, icon:'👤' };
              return (
                <tr key={u.id} style={{ opacity: u.actif ? 1 : 0.55 }}>
                  <td style={S.td}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ ...S.avatar(rs.bg, rs.color), fontSize:12 }}>{u.initiales}</div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:T.textPrimary }}>{u.nom}</div>
                        {u.id === currentUser?.userId && <span style={{ fontSize:10, color:T.blue }}>← vous</span>}
                      </div>
                    </div>
                  </td>
                  <td style={{ ...S.td, fontSize:12, color:T.textMuted }}>{u.email}</td>
                  <td style={S.td}>
                    <select value={u.role} onChange={e => setRole(u, e.target.value)}
                      disabled={u.id === currentUser?.userId}
                      style={{ fontSize:12, padding:'4px 8px', borderRadius:6, border:`1px solid ${T.border}`, background:rs.bg, color:rs.color, fontWeight:600, cursor:'pointer', outline:'none' }}>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                  <td style={S.td}>
                    <span style={S.badge(u.actif ? T.green : T.textMuted, u.actif ? T.greenLight : T.grayLight)}>
                      {u.actif ? '● Actif' : '○ Inactif'}
                    </span>
                  </td>
                  <td style={S.td}>
                    <div style={{ display:'flex', gap:6 }}>
                      <button onClick={() => openEdit(u)} style={{ ...S.btn('outline'), fontSize:11, padding:'4px 10px' }}>✏️ Modifier</button>
                      <button onClick={() => toggleActif(u)}
                        disabled={u.id === currentUser?.userId}
                        style={{ fontSize:11, padding:'4px 10px', borderRadius:6, border:'none', cursor: u.id === currentUser?.userId ? 'not-allowed' : 'pointer', background: u.actif ? T.orangeLight : T.greenLight, color: u.actif ? '#8B3A06' : T.green, fontWeight:500 }}>
                        {u.actif ? '🔒 Désactiver' : '✅ Activer'}
                      </button>
                      <button onClick={() => openDelete(u)}
                        disabled={u.id === currentUser?.userId}
                        style={{ fontSize:11, padding:'4px 10px', borderRadius:6, border:'none', cursor: u.id === currentUser?.userId ? 'not-allowed' : 'pointer', background:T.redLight, color:T.red, fontWeight:500 }}>
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Créer / Modifier */}
      {(modal === 'create' || modal === 'edit') && (
        <ModalOverlay onClose={() => setModal(null)}>
          <div style={{ fontSize:18, fontWeight:700, color:T.navy, marginBottom:20 }}>
            {modal === 'create' ? '➕ Créer un compte' : '✏️ Modifier le compte'}
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={S.label}>Nom complet *</label>
            <input value={form.nom} onChange={e=>setForm(f=>({...f,nom:e.target.value}))} placeholder="Prénom Nom" style={inpStyle} />
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={S.label}>Email *</label>
            <input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="prenom.nom@vicas.sn" style={inpStyle} />
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={S.label}>Rôle *</label>
            <select value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} style={{ ...inpStyle, padding:'10px 12px' }}>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
            <button onClick={() => setModal(null)} style={S.btn('outline')}>Annuler</button>
            <button onClick={modal==='create' ? handleCreate : handleEdit} style={S.btn('primary')}>
              {modal==='create' ? '✅ Créer' : '💾 Enregistrer'}
            </button>
          </div>
        </ModalOverlay>
      )}

      {/* Modal Supprimer */}
      {modal === 'delete' && (
        <ModalOverlay onClose={() => setModal(null)}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>⚠️</div>
            <div style={{ fontSize:16, fontWeight:700, color:T.navy, marginBottom:8 }}>Supprimer le compte ?</div>
            <div style={{ fontSize:13, color:T.textMuted, marginBottom:20, lineHeight:1.6 }}>
              Vous allez supprimer définitivement le compte de<br /><strong>{selected?.nom}</strong>. Cette action est irréversible.
            </div>
            <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
              <button onClick={() => setModal(null)} style={S.btn('outline')}>Annuler</button>
              <button onClick={handleDelete} style={{ ...S.btn('primary'), background:T.red, boxShadow:'0 4px 12px rgba(217,48,37,0.3)' }}>🗑️ Supprimer</button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(15,43,91,0.45)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background:T.white, borderRadius:16, padding:'2rem', width:'100%', maxWidth:440, boxShadow:'0 20px 60px rgba(15,43,91,0.2)', animation:'fadeDown 0.2s ease' }}>
        <style>{`@keyframes fadeDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}`}</style>
        {children}
      </div>
    </div>
  );
}
