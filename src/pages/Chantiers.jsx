import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { useAuth, can } from '../context/AuthContext';
import { CHANTIERS } from '../data/mockData';
import { chantiers as chantiersApi } from '../services/api';
import { useApi } from '../hooks/useApi';
import { Loading, ApiError } from '../components/ApiState';

const STATUT_STYLE = {
  retard:  { bg: T.redLight,   color: T.red,   label: 'Retard',    dot: T.red   },
  risque:  { bg: '#FFF7E0',    color: T.amber, label: 'À risque',  dot: T.amber },
  encours: { bg: T.blueLight,  color: T.blue,  label: 'En cours',  dot: T.blue  },
  termine: { bg: T.greenLight, color: T.green, label: 'Terminé',   dot: T.green },
};

export default function Chantiers() {
  const { user } = useAuth();
  const { data: apiChantiers, loading, error } = useApi(() => chantiersApi.list(), CHANTIERS);
  const allChantiers = apiChantiers || CHANTIERS;
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filtre, setFiltre] = useState('tous');

  // Filtrage par rôle
  const mesChantiers = can(user, 'voir_tous_chantiers')
    ? allChantiers
    : allChantiers.filter(c => c.chefId === user?.userId || c.chef_id === user?.userId);

  const filtered = mesChantiers.filter(c => {
    const matchSearch = c.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.localisation.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase());
    const matchFiltre = filtre === 'tous' || c.statut === filtre;
    return matchSearch && matchFiltre;
  });

  const peutModifier = can(user, 'modifier_chantier');

  if (loading) return <Loading message="Chargement des chantiers…" />;

  return (
    <div>
      <ApiError error={error} />
      <div style={S.sectionHeader}>
        <div>
          <div style={S.pageTitle}>
            {can(user, 'voir_tous_chantiers') ? 'Tous les chantiers' : 'Mes chantiers'}
          </div>
          <div style={S.pageSub}>
            {filtered.length} chantier{filtered.length > 1 ? 's' : ''}
            {!can(user, 'voir_tous_chantiers') && ` assigné${filtered.length > 1 ? 's' : ''} à vous`}
          </div>
        </div>
        {peutModifier && (
          <button style={S.btn('primary')}>+ Nouveau chantier</button>
        )}
      </div>

      {/* Filtres & recherche */}
      <div style={{ display:'flex', gap:10, marginBottom:'1.25rem', flexWrap:'wrap', alignItems:'center' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Rechercher un chantier…"
          style={{ ...S.input, maxWidth:280 }} />
        <div style={{ display:'flex', gap:6 }}>
          {['tous','encours','retard','risque','termine'].map(f => (
            <button key={f} onClick={() => setFiltre(f)} style={S.filterBtn(filtre === f)}>
              {f === 'tous' ? 'Tous' : STATUT_STYLE[f]?.label || f}
            </button>
          ))}
        </div>
      </div>

      {/* Grille chantiers */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'4rem', color:T.textMuted }}>
          <div style={{ fontSize:40, marginBottom:10 }}>🏗️</div>
          <div style={{ fontSize:14, fontWeight:500 }}>Aucun chantier trouvé</div>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'1rem' }}>
          {filtered.map(c => {
            const st = STATUT_STYLE[c.statut] || STATUT_STYLE.encours;
            return (
              <div key={c.id} onClick={() => navigate(`/chantiers/${c.id}`)}
                style={{ ...S.card, cursor:'pointer', transition:'box-shadow 0.15s, transform 0.15s', marginBottom:0 }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,43,91,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:T.navy, flex:1, paddingRight:8 }}>{c.nom}</div>
                  <span style={{ ...S.badge(st.color, st.bg), flexShrink:0 }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:st.dot, flexShrink:0 }} />
                    {st.label}
                  </span>
                </div>

                <div style={{ fontSize:12, color:T.textMuted, marginBottom:10, display:'flex', flexDirection:'column', gap:4 }}>
                  <span>📍 {c.localisation}</span>
                  <span>🏢 {c.client}</span>
                  <span>👷 {c.chef}</span>
                </div>

                {/* Barre progression */}
                <div style={{ marginBottom:10 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:T.textMuted, marginBottom:5 }}>
                    <span>Avancement</span>
                    <span style={{ fontWeight:700, color: c.pct >= 80 ? T.green : c.pct >= 50 ? T.blue : T.orange }}>{c.pct}%</span>
                  </div>
                  <div style={{ height:6, background:T.grayLight, borderRadius:3, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${c.pct}%`, borderRadius:3, background: c.pct >= 80 ? T.green : c.pct >= 50 ? T.blue : T.orange, transition:'width 0.5s' }} />
                  </div>
                </div>

                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:T.textMuted }}>
                  <span>📅 Fin : {c.fin}</span>
                  <span style={{ fontWeight:600, color:T.navy }}>{parseInt(c.montant).toLocaleString()} XOF</span>
                </div>

                {peutModifier && (
                  <div style={{ marginTop:12, paddingTop:10, borderTop:`1px solid ${T.border}`, display:'flex', gap:8 }}>
                    <button onClick={e => { e.stopPropagation(); navigate(`/chantiers/${c.id}`); }} style={{ ...S.btn('outline'), fontSize:12, padding:'5px 12px' }}>
                      {user?.role === 'Chef de chantier' ? '✏️ Mettre à jour' : '👁 Voir'}
                    </button>
                    {user?.role === 'Chef de chantier' && (
                      <button onClick={e => { e.stopPropagation(); }} style={{ ...S.btn('outline'), fontSize:12, padding:'5px 12px', color:T.red, borderColor:T.redLight }}>
                        🚨 Signaler blocage
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
